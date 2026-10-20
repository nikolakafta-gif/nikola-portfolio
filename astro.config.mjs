// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

/* Real publish dates per post, read straight from the Markdoc frontmatter.
   This used to be `new Date()` for every URL, so each build told Google that
   all fifteen pages had just changed. Google drops a lastmod it cannot trust,
   and an untrusted sitemap is worse than one without dates, so pages we never
   touched now carry their actual date and anything we cannot date carries none. */
const POSTS_DIR = fileURLToPath(new URL('./src/content/posts/', import.meta.url));
const publishedDates = new Map();
for (const slug of readdirSync(POSTS_DIR)) {
  try {
    const front = readFileSync(join(POSTS_DIR, slug, 'index.mdoc'), 'utf8').split(/^---\s*$/m)[1] ?? '';
    const date = front.match(/^publishedDate:\s*['"]?([0-9]{4}-[0-9]{2}-[0-9]{2})/m)?.[1];
    if (date) publishedDates.set(slug, new Date(`${date}T00:00:00Z`));
  } catch {
    // a folder without a readable index.mdoc simply gets no lastmod
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.nikolamiljkovic.live',
  adapter: vercel(),
  /* The canonical URL and the sitemap both carry a trailing slash, but the
     slashless form used to answer 200 with a canonical pointing elsewhere, so
     Google filed four of them under "Alternate page with proper canonical tag"
     and spent crawl budget on duplicates. The Vercel adapter turns this into a
     308 from /x to /x/, which is a rule rather than a hint. Keep every internal
     link written with the trailing slash: the dev server 404s without it. */
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [react(), markdoc(), keystatic(), sitemap({
    serialize(item) {
      const slug = item.url.match(/\/blog\/([^/]+)\/$/)?.[1];
      const date = slug && publishedDates.get(slug);
      if (date) item.lastmod = date;
      else delete item.lastmod;
      return item;
    },
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});
