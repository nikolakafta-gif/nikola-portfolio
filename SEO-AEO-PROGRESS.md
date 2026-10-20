# SEO & AEO Progress

**Route:** New site
**Site:** https://www.nikolamiljkovic.live
**About:** Portfolio site for web development services — full website builds, redesigns, landing pages, Webflow development. Targeting international clients.
**Started:** 2026-06-21
**Current phase:** 05

## Pre-existing SEO work

- [x] robots.txt with AI bot access (GPTBot, ClaudeBot, PerplexityBot, etc.)
- [x] llms.txt with brand info, services, FAQ
- [x] JSON-LD schema (ProfessionalService + Person) on all pages
- [x] Sitemap via Astro integration
- [x] Canonical URLs on all pages
- [x] OG + Twitter meta tags
- [x] Google Search Console verified
- [x] Meta descriptions per page
- [x] Accessibility: skip-to-content link

## Phases

- [x] 00 — Foundation Audit
- [x] 01 — Technical SEO
- [x] 02 — Keyword Strategy
- [x] 03 — AEO Content
- [x] 04 — Link Building Foundation
- [ ] 05 — Content Production
- [ ] 06 — Brand & Entity
- [ ] 07 — Schema & AI Access
- [ ] 08 — Link Building at Scale
- [ ] 09 — UX & Conversion
- [ ] 10 — Measurement

## Notes

### Phase 00 (2026-06-21)
- CRITICAL: Site not indexed by Google at all — no results for site:nikolamiljkovic.live
- Mobile performance score 62 (LCP 5.5s) — render-blocking Google Fonts + gtag.js
- Desktop performance 93 — solid
- AEO visibility: 0% — no AI engine cites the site
- No knowledge panel, brand confused with photographer on .com
- Competitors (Ilja van Eck, Cubic Dev) have no blog/SEO content — content gap opportunity
- Technical SEO foundation strong: schema, robots.txt, llms.txt, sitemap, canonical URLs
- H2 grammar issues on homepage need fixing
- Sitemap missing lastmod dates

### Phase 01 (2026-06-21)
- Google Fonts async preload pattern applied (removes render-blocking CSS)
- Google Analytics deferred via dynamic script injection (removes 65KB render-blocking JS)
- H2 grammar fixes: Work.astro ("small business's" -> "small business into an"), Testimonials.astro ("our satisfied customers" -> "my clients")
- Sitemap lastmod dates added via Astro serialize callback
- Broken Dribbble 404 link removed from schema markup and llms.txt
- CollectionPage + ItemList schema added to blog index page
- Custom 404 page created with "Back to homepage" CTA
- Footer internal links added: Work, About, Case Studies, Contact
- Related case studies section added to case study pages (cross-linking)
- Title tag and meta description optimized for /contact and /blog pages
- Case study cover images now lazy-loaded
- DONE: Sitemap submitted in GSC — status Success, 8 pages discovered (confirmed 2026-06-21)
- DONE: Site deployed to production

### Phase 02 (2026-06-21)
- 30 seed keywords brainstormed across 3 intent categories (informational, commercial, AEO question-based)
- Expanded to 112 keywords via search volume research and competitor gap analysis
- Clustered into 15 topical clusters across 5 pillars:
  - Pillar 1: Hiring a Freelance Web Developer (Clusters 1-4)
  - Pillar 2: Web Development Services (Clusters 5-8)
  - Pillar 3: Web Development Technology (Clusters 9-12)
  - Pillar 4: Website Planning & Process (Clusters 13-14)
  - Pillar 5: Modern Web Development & AI (Cluster 15)
- 12 of 15 clusters tagged as AEO priority (question-based keywords for AI search)
- Content roadmap prioritized: pricing guide, buyer's guide, and comparison articles first
- Existing pages mapped to clusters (homepage, /blog, /contact)
- Full report saved to KEYWORD-CLUSTERS.md
- Full content strategy created with topic authority map (4 pillars, 15+ subtopics)
- 12-month content calendar built: 2 articles/month, starting with quick wins (pricing guide, buyer's guide)
- Existing content mapped to clusters: 5 case studies assigned to relevant keyword clusters
- Content gaps identified: zero educational/informational content, 10 gap topics prioritized
- AEO content guidelines established for all future articles
- Quick wins flagged: Casera/Vistal/Doorly need descriptive SEO titles (currently brand-name only)
- No ranking data available (site not indexed) -- "content to update" step deferred to Month 9
- Deliverables: KEYWORD-CLUSTERS.md, CONTENT-STRATEGY.md

### Phase 03 (2026-06-21)
- AEO audit of all 5 case studies: all failed on 5/8 criteria (intro, headings, FAQ, citations, internal links)
- Casera title: "Casera" -> "How I Built a Custom Hotel Website That Drives Direct Bookings"
- Doorly title: "Doorly" -> "How I Built a Product Landing Page That Competes With the Big Brands"
- Vistal title: "Vistal" -> "How I Redesigned a Business Website That Actually Helps Close Deals"
- All 5 case studies rewritten: answer-first intros, question-format H2s, updated summaries
- FAQ sections added to all 5 case studies (6 questions each, 40-60 word answers)
- FAQPage JSON-LD schema auto-generated from Keystatic faqs field
- Keystatic config updated with faqs array field for structured FAQ data
- [slug].astro template updated: FAQ rendering + FAQPage schema generation
- Content brief generated for #1 priority article: "How Much Does a Freelance Web Developer Cost in 2026" (CONTENT-BRIEF-01.md)
- Author bio: homepage serves as author page (ProfessionalService + Person schema already in place)
- AEO visibility recheck: site:nikolamiljkovic.live still returns 0 Google results, brand confused with photographer at .com
- No AI engine citations yet (expected -- site just indexed Jun 19)

### Phase 04 (2026-06-21)
- Competitor analysis: Ilja van Eck and Cubic Dev do zero link building, no blog, no directories
- 15 niche directories identified for submission (Awwwards, Clutch, Dribbble, Behance, Contra, DesignRush, Astro Showcase, dev.to, Hashnode, etc.)
- 20 link building prospects found: portfolio roundup sites, developer publications, Astro ecosystem
- 3 outreach email templates written (broken link, resource page, guest post)
- 5 linkable asset ideas: Website Cost Calculator (#1 priority), process infographic, cost guide, Astro vs Next.js benchmarks, free audit checklist
- 4-week action plan created with weekly tasks
- Deliverable: LINK-BUILDING-PLAN.md

### Phase 05 (2026-07-21)
- GSC review: "web-developer-cost" post getting impressions (1-5/query) for pricing-intent queries but 0 clicks — diagnosed title (78 chars) and meta description (224 chars) both exceeding Google's truncation limits
- Fixed globally in `src/pages/blog/[slug].astro`: removed redundant "— Blog"/"— Case Study" title suffix, added `metaDescription()` helper to smart-truncate descriptions at 155 chars (word-boundary safe) — applies to all posts and case studies
- Published Month 1 Week 3-4 article: "What to Look for in a Web Developer Before You Hire" at `/blog/what-to-look-for-in-a-web-developer` (Cluster 3, 1926 words, 8-question FAQ, answer-first intro, question-format H2s, 2 verified external citations)
- Added reciprocal internal link from Advisia case study back to the new article (per CONTENT-STRATEGY.md internal linking plan)
- Note for Phase 09: several case study titles (e.g. Advisia) are long even without the removed suffix — revisit for CTR when GSC has more position/CTR data
- Google Indexing API fully configured: GCP project `level-hallway-450015-f6`, service account `indexing-bot@level-hallway-450015-f6.iam.gserviceaccount.com` added as Owner in GSC. Key stored at `.google-indexing-key.json` (gitignored). Fixed `.claude/scripts/google-index.js` -> renamed to `.cjs` (project's `"type": "module"` broke the CommonJS `require()` calls)
- Submitted `/blog/what-to-look-for-in-a-web-developer` via Indexing API (2026-07-25) — use `node .claude/scripts/google-index.cjs <url>` for all future posts going forward
- Submitted all 11 sitemap URLs via Indexing API (2026-07-25) after GSC showed 8 not indexed / 3 indexed

### Phase 05 — Month 2 Week 1-2 (2026-08-01)
- Brief written: `CONTENT-BRIEF-02.md` (Cluster 2, commercial investigation, primary keyword "should i hire a freelance developer or an agency", 720/mo, low difficulty)
- Article written: "Freelance Developer vs Agency: Which Should You Hire?" at `/blog/freelance-developer-vs-agency` — 1948 words, 8-question FAQ, answer-first intro, all 7 content H2s in question format
- Differentiator vs SERP: a full "When Should You Not Hire a Freelancer?" section. Page one is all marketplaces (Upwork, Arc.dev, lemon.io) and agencies, none of which name where their own model is the wrong choice
- Citation hygiene: the two sources planned in the brief both failed verification (Clutch's freelance-vs-agency resource is a hard **404**, Upwork's returns **403** to crawlers). Replaced with two verified-live sources: [Clutch web development pricing](https://clutch.co/web-developers/pricing) (US agency rates $100-$149/hr, avg project ~$66k) and [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/work/) (13.9% independent/freelance). **Always re-fetch a citation before writing it in** — search snippets surface dead URLs
- Cannibalisation fixed: `what-to-look-for-in-a-web-developer` had a freelancer-vs-agency section competing for this exact query. Shortened it and pointed it at the new article. `web-developer-cost` got a reciprocal link from its agency-pricing section
- Format note: **no markdown tables in posts.** `[slug].astro` and global.css have zero table styling, and no existing post uses one. The brief's decision table was rendered as grouped bullet lists instead
- Pricing stays consistent with the rest of the site ($500-$2,000 for my own work); higher market figures are attributed to agencies only, so the cost guide is not contradicted
- Verified locally: Article + BreadcrumbList + FAQPage schema all present, meta description 153 chars, canonical correct, no console errors, post appears first on `/blog`
### CORRECTION — the Indexing API does nothing for this site (2026-08-01)

Google's own docs: *"The Indexing API can only be used to crawl pages with either `JobPosting` or
`BroadcastEvent` embedded in a `VideoObject`."* Blog posts and case studies are **not** supported.
A `200` from `urlNotifications:publish` only means the request was accepted, never that Google will
crawl. Every submission logged below (2026-07-25, 2026-08-01) was a no-op.

Confirmed by URL Inspection on 2026-08-01: 5 of 14 sitemap URLs indexed, 9 not, and seven of the
nine submitted on 2026-07-25 still read `URL is unknown to Google` with `last crawl: never`.

Not a technical fault. robots.txt allows all, the pages return 200 to Googlebot, no `noindex`, and
canonicals are self-referencing. It is crawl budget on a low-authority domain.

**Do instead:** request indexing manually in the Search Console UI for priority URLs (small daily
quota, but it genuinely works), and treat Phase 04/08 link building as the actual fix. Keep
`google-index.cjs` only if JobPosting content is ever added.

Check status any time with `node .claude/scripts/google-index-status.cjs` (reads the sitemap, reports
verdict, coverage state, last crawl and canonical mismatches). Needs the Search Console API enabled
in Cloud project `level-hallway-450015-f6` — enabled 2026-08-01.

### Index status snapshot (2026-08-01)
- Indexed (5): `/`, `/blog/`, `/blog/casera/`, `/blog/web-developer-cost/`, `/blog/zvonacka-banja/`
- Discovered but not indexed (2): `/blog/doorly/`, `/contact/`
- Unknown to Google (7): `advisia`, `comira`, `victoria`, `vistal`, `porta-brzi-brod`,
  `what-to-look-for-in-a-web-developer`, `freelance-developer-vs-agency`

---

- Deployed 2026-08-01 (commit `162a0c1`) and submitted to the Indexing API as
  `https://www.nikolamiljkovic.live/blog/freelance-developer-vs-agency/` — **with the trailing slash**,
  matching the sitemap and canonical. Submitting the slashless form would point Google at a URL the
  site does not consider canonical. Check the exact `<loc>` in the sitemap before every submission.
### Phase 05 — Month 2 Week 3-4 (2026-08-12)
- Brief written: `CONTENT-BRIEF-03.md` (Cluster 13, informational, primary keyword "how long does it take
  to build a website", 3,600/mo, medium difficulty)
- Article written: "How Long Does It Take to Build a Website?" at `/blog/how-long-to-build-a-website` —
  1,799 words, 8-question FAQ, answer-first intro with numbers in the first sentence, all 7 content H2s
  in question format
- URL choice: Cluster 13's recommended `/blog/web-development-process` stays reserved for the Month 8
  pillar hub page, so this took the timeline-specific slug. The hub links down to it later
- Differentiator vs SERP: **eight named live projects with their actual durations** (Comira 3 days,
  Porta Brzi Brod 4 days, Doorly 1 week, Victoria 1 week, Casera/Advisia/Vistal/Zvonačka Banja 2 weeks
  each), pulled from the `duration` field of the case studies. Page one is hosting companies and site
  builders answering "a weekend" and agencies answering 8-16 weeks, all with hypothetical ranges only
- Also reconciles that contradiction in its own section ("Why Do Agencies Quote 2 to 3 Months...")
  instead of ignoring it, and closes with the post-launch indexing wait, which no page-one result covers
- Citations verified live on the day of writing: [Google Search Central, ask Google to recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
  ("Crawling can take anywhere from a few days to a few weeks") and [web.dev LCP](https://web.dev/articles/lcp)
  (good LCP is 2.5s at the 75th percentile)
- Cannibalisation fixed in all three older posts: `web-developer-cost` (build-time section),
  `what-to-look-for-in-a-web-developer` (the "realistic timeline" bullet, shortened), and
  `freelance-developer-vs-agency` ("Which One Is Faster?") each now link out to this article
- Timeline numbers kept identical to what was already published (3-7 days, 1-3 weeks, 2-4 weeks,
  4-8+ weeks). Do not introduce a second scale in future posts
- Format rules held: no markdown tables, no em dashes anywhere in the file
- Verified locally: Article + BreadcrumbList + FAQPage schema present, meta description 150 chars,
  title 60 chars with the suffix, 8 FAQ items rendered, 13 internal links, 2 external, no console
  errors, post appears first on `/blog`, `npm run build` passes
- Deployed 2026-08-12 (commit `bc4f841`). Live page verified in production: canonical
  `https://www.nikolamiljkovic.live/blog/how-long-to-build-a-website/` (trailing slash, matches the
  sitemap `<loc>`), title 60 chars, meta description 150 chars, Article + BreadcrumbList + FAQPage
  with 8 Question blocks all present
- **Manual action left for Nikola:** Search Console UI, Request Indexing for
  `https://www.nikolamiljkovic.live/blog/how-long-to-build-a-website/` and, more urgently,
  `https://www.nikolamiljkovic.live/blog/freelance-developer-vs-agency/`

### Index status snapshot (2026-08-12) — big improvement
`node .claude/scripts/google-index-status.cjs`: **13 indexed of 15**, up from 5 of 14 on 2026-08-01.
Everything submitted manually through the Search Console UI got crawled within days, which confirms
the correction above: the UI request works, the Indexing API does not.

Still unknown to Google (2):
- `/blog/freelance-developer-vs-agency/` — live since 2026-08-01, still `last crawl: never`. It is the
  only commercial article not indexed, so it goes first in the next Request Indexing round.
- `/blog/how-long-to-build-a-website/` — expected, published today.
- Next on the calendar: Month 3 Week 1-2, "Do You Need a Custom Website or a Template"
  (Cluster 14, comparison, 1800+ words)

### Phase 05 — Month 3 Week 1-2 (2026-10-21, slot ran two months late)
- Brief written: `CONTENT-BRIEF-04.md` (Cluster 14, commercial investigation, primary keyword "do i
  need a custom website or a template", 880/mo, low difficulty)
- Article written: "Do You Need a Custom Website or a Template?" at `/blog/custom-website-vs-template`
  — 1,918 words, 8-question FAQ, answer-first intro, all 7 content H2s in question format
- Differentiators, in order of how much they matter:
  1. A full section on **when a template is the right choice**, naming the project types I turn away.
     Same against-my-own-interest move that carried the freelancer vs agency guide.
  2. **Three year cost comparison with real figures.** Wix $17.77 to $39.77/mo and Squarespace $12 to
     $36/mo, both checked on the day of writing, against my own one-time $500 to $2,000. Over 36
     months the two land close together, which neither side of the SERP admits.
  3. **Google's own words on whether a template can rank**, instead of a developer's assertion. The
     SERP is agencies claiming templates cannot rank; the starter guide ranks content, not platforms.
  4. The **AI builder** question, which the older page-one articles predate.
- Citations verified live on the day of writing: [Google SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
  (useful content is called more influential than the guide's own technical items) and
  [Google page experience](https://developers.google.com/search/docs/appearance/page-experience)
  ("Core Web Vitals are used by our ranking systems", "There is no single signal"). Third anchor,
  W3Techs on 2026-10-20: Wix 4.2% and Squarespace 2.4% of all websites.
- **Porta Brzi Brod and Zvonačka Banja are linked on purpose.** Both fell out of the index in late
  September and Porta had the fewest inbound internal links on the site. They are also the honest
  examples for this topic, a bilingual structured menu and an image-heavy tourism site.
- Cannibalisation fixed: the "Custom design vs. template" paragraph in `web-developer-cost` and the
  closing paragraph of `casera` now point here. The Casera FAQ was left alone because FAQ answers
  render as plain text, so a markdown link there would print as source.
- Verified locally: Article + BreadcrumbList + FAQPage, 8 FAQ items, title 62 chars, meta description
  150, canonical with the trailing slash, 8 internal links all slashed, 2 external, cover set to the
  shared `guide-blog.webp`, related posts correctly stay inside the guides, `npm run build` passes,
  sitemap entry carries the real publish date.
- Next on the calendar: Month 3 Week 3-4, "How to Prepare for a Website Redesign: Complete Guide"
  (Cluster 5, planning guide, 2000+ words)

### Trailing slash cleanup (2026-10-21)

GSC Page indexing on 2026-10-12 read **12 indexed, 7 not indexed, 19 known pages**. The site only has
15 real URLs, and the numbers reconcile exactly:

- 4 "Alternate page with proper canonical tag" = the slashless twin of 4 real pages. Not an error,
  Google honoured the canonical, but it is crawl budget spent on duplicates.
- 2 "Crawled, currently not indexed" and 1 "Discovered, currently not indexed" = 3 of the 15 sitemap
  URLs. 12 + 3 = 15.

Cause: the canonical and the sitemap carry a trailing slash, but `/blog/x` answered **200** (not a
redirect) with a canonical pointing at `/blog/x/`, and every internal link in the content and on the
blog cards was written slashless. Google followed those links and filed each twin as an alternate.
The grey band in the GSC chart steps up on 2026-08-13 and again in late September, matching the two
rounds of internal links we added.

Fixed:
- `trailingSlash: 'always'` in `astro.config.mjs`. The Vercel adapter turns this into a **308** from
  `/x` to `/x/` in `.vercel/output/config.json`, so the duplicate stops being a page at all. A rule
  instead of a hint. Note the dev server now 404s on a slashless URL, which is the intended warning.
- 58 internal links rewritten with the trailing slash: 36 markdown links to posts, 4 to `/contact`,
  6 href attributes, 9 href properties (Navbar, the 8 Work slider cards), 3 template literals (blog
  cards and related cards).
- Verified: no slashless `/blog` or `/contact` link left in any built HTML file, sitemap still 15 URLs
  all with the slash, build passes, dev server clean after a restart.

Do not write an internal link without the trailing slash again, in content or in components.

**Still the real problem, unchanged since August:** the 2 pages Google crawled and declined are an
authority call, not a markup fault. Only external links move that. Which 3 URLs they are can be read
from the GSC reason rows, or from `node .claude/scripts/google-index-status.cjs`.

### Lighthouse remediation (2026-07-26)
Baseline: Performance 75, Accessibility 91, Best Practices 96, SEO 100, Agentic Browsing 1/3.
- A11y: mobile menu used `aria-hidden="true"` while its links stayed keyboard-focusable — switched to `inert` (toggled in Navbar.astro's open/close handlers). Do not revert to aria-hidden.
- A11y: `--color-primary-60` measured 4.47:1 on white, just under WCAG AA 4.5:1 — raised alpha `99` -> `a6` (5.28:1). One token fixed all three reported contrast failures (hero text, footer description, footer links). Comment in global.css explains why; don't "restore" 99.
- Perf: added `srcset`/`sizes` to work cards (400/700/1120w) and about photo (500/600/800w). Mobile image payload ~442KB -> ~211KB. Variant files live beside originals as `<name>-<width>.webp`; regenerate them if a source image is replaced.
- Perf: work-zvonacka-banja was the only 1440px source (141KB) -> downscaled to 1120px (63KB); about photo recompressed at q78.
- Perf: `build.inlineStylesheets: 'always'` in astro.config.mjs removes three render-blocking CSS requests (~1s blocking on mobile).
- Perf: gtag.js injection moved to `requestIdleCallback` after the load event (was injected during head parse).
- Best practices: Behance icon source is square 512x512 but CSS stretched it to 2x2.2em — now 32x32 like LinkedIn. About photo width/height attrs corrected (were 890x800, actual 800x1067).
- Agentic browsing: llms.txt had bare URLs only and failed the link check — rewritten with markdown links to pages, guides and case studies.
- Not fixable without tradeoffs: gtag.js still ships ~73KB unused JS (inherent to GA); "Agentic Browsing" is an experimental Lighthouse category.

**Current phase:** 05
