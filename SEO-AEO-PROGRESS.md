# SEO & AEO Progress

**Route:** New site
**Site:** https://www.nikolamiljkovic.live
**About:** Portfolio site for web development services — full website builds, redesigns, landing pages, Webflow development. Targeting international clients.
**Started:** 2026-06-21
**Current phase:** 04

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
- [ ] 04 — Link Building Foundation
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

**Current phase:** 04
