#!/usr/bin/env node
/**
 * Google Search Console URL Inspection API — report what is actually indexed.
 *
 * This is the counterpart to google-index.cjs. That script only *submits*
 * notifications (scope auth/indexing) and its 200 response means "Google
 * received the ping", never "the page is indexed". This one reads real index
 * status (scope auth/webmasters.readonly).
 *
 * Requires, in addition to the Indexing API setup:
 *   - "Google Search Console API" enabled in the same Cloud project
 *   - the service account still added as an Owner in Search Console
 *
 * Usage:
 *   node .claude/scripts/google-index-status.cjs                 # every URL in the sitemap
 *   node .claude/scripts/google-index-status.cjs <url> [url...]  # specific URLs
 *
 * Quota: 2000 inspections/day, 600/minute.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const SITES_API = 'https://www.googleapis.com/webmasters/v3/sites';
const INSPECT_API = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';
const SITEMAP_URL = 'https://www.nikolamiljkovic.live/sitemap-0.xml';

function loadServiceAccount() {
  const keyPath =
    process.env.GOOGLE_INDEXING_KEY_PATH ||
    path.join(process.cwd(), '.google-indexing-key.json');

  if (!fs.existsSync(keyPath)) {
    console.error('Service account key not found at ' + keyPath);
    console.error('Run this from the project root, or set GOOGLE_INDEXING_KEY_PATH.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(keyPath, 'utf8'));
}

function base64url(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(JSON.stringify(input));
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function createJWT(sa) {
  const now = Math.floor(Date.now() / 1000);
  const unsigned =
    base64url({ alg: 'RS256', typ: 'JWT' }) +
    '.' +
    base64url({ iss: sa.client_email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 });
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsigned);
  return unsigned + '.' + base64url(sign.sign(sa.private_key));
}

function request(url, options, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      url,
      { hostname: u.hostname, path: u.pathname + u.search, ...options },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function getAccessToken(sa) {
  const body =
    'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + createJWT(sa);
  const res = await request(
    TOKEN_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    },
    body
  );
  const parsed = JSON.parse(res.body);
  if (!parsed.access_token) throw new Error('Token error: ' + res.body);
  return parsed.access_token;
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve(d));
      })
      .on('error', reject);
  });
}

async function listSites(token) {
  const res = await request(SITES_API, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });
  if (res.status !== 200) {
    throw new Error('sites.list failed (' + res.status + '): ' + res.body);
  }
  return JSON.parse(res.body).siteEntry || [];
}

async function inspect(url, siteUrl, token) {
  const body = JSON.stringify({ inspectionUrl: url, siteUrl, languageCode: 'en-US' });
  const res = await request(
    INSPECT_API,
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    },
    body
  );
  if (res.status !== 200) {
    return { url, error: 'HTTP ' + res.status + ': ' + res.body.slice(0, 300) };
  }
  const r = JSON.parse(res.body).inspectionResult || {};
  const i = r.indexStatusResult || {};
  return {
    url,
    verdict: i.verdict || '-',
    coverage: i.coverageState || '-',
    lastCrawl: i.lastCrawlTime ? i.lastCrawlTime.slice(0, 10) : 'never',
    googleCanonical: i.googleCanonical || '-',
    userCanonical: i.userCanonical || '-',
    robots: i.robotsTxtState || '-',
    fetch: i.pageFetchState || '-',
    inSitemap: (i.sitemap || []).length > 0,
  };
}

async function main() {
  let urls = process.argv.slice(2).filter((a) => a.startsWith('http'));

  if (urls.length === 0) {
    const xml = await fetchText(SITEMAP_URL);
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    console.log('Read ' + urls.length + ' URL(s) from the sitemap\n');
  }

  const sa = loadServiceAccount();
  const token = await getAccessToken(sa);

  const sites = await listSites(token);
  if (sites.length === 0) {
    console.error('The service account has no Search Console properties.');
    process.exit(1);
  }

  // Prefer the property that actually prefixes the URLs we are inspecting.
  const siteUrl =
    sites.map((s) => s.siteUrl).find((s) => urls[0] && urls[0].startsWith(s)) ||
    sites.map((s) => s.siteUrl).find((s) => s.startsWith('sc-domain:')) ||
    sites[0].siteUrl;

  console.log('Property: ' + siteUrl);
  console.log('Permission: ' + (sites.find((s) => s.siteUrl === siteUrl) || {}).permissionLevel);
  console.log('');

  const results = [];
  for (const u of urls) {
    results.push(await inspect(u, siteUrl, token));
  }

  const indexed = [];
  const notIndexed = [];
  const errored = [];

  for (const r of results) {
    if (r.error) errored.push(r);
    else if (r.verdict === 'PASS') indexed.push(r);
    else notIndexed.push(r);
  }

  const pad = (s, n) => String(s).padEnd(n);

  if (indexed.length) {
    console.log('INDEXED (' + indexed.length + ')');
    for (const r of indexed) {
      console.log('  ' + pad(r.lastCrawl, 12) + r.url.replace('https://www.nikolamiljkovic.live', ''));
    }
    console.log('');
  }

  if (notIndexed.length) {
    console.log('NOT INDEXED (' + notIndexed.length + ')');
    for (const r of notIndexed) {
      console.log('  ' + r.url.replace('https://www.nikolamiljkovic.live', ''));
      console.log('      verdict: ' + r.verdict + '   coverage: ' + r.coverage);
      console.log('      last crawl: ' + r.lastCrawl + '   fetch: ' + r.fetch + '   robots: ' + r.robots);
      if (r.googleCanonical !== r.userCanonical && r.googleCanonical !== '-') {
        console.log('      CANONICAL MISMATCH');
        console.log('        you say:    ' + r.userCanonical);
        console.log('        Google says: ' + r.googleCanonical);
      }
    }
    console.log('');
  }

  if (errored.length) {
    console.log('ERRORS (' + errored.length + ')');
    for (const r of errored) console.log('  ' + r.url + '\n      ' + r.error);
    console.log('');
  }

  console.log(
    'Summary: ' +
      indexed.length +
      ' indexed, ' +
      notIndexed.length +
      ' not indexed, ' +
      errored.length +
      ' errors, of ' +
      results.length +
      ' checked'
  );
}

main().catch((err) => {
  console.error('Fatal: ' + err.message);
  if (/accessNotConfigured|has not been used|disabled/i.test(err.message)) {
    console.error('');
    console.error('Enable "Google Search Console API" for the Cloud project, wait a minute, retry.');
  }
  process.exit(1);
});
