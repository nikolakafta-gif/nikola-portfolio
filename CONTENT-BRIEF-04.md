# Content Brief: Do You Need a Custom Website or a Template

**Status:** Ready to write
**Calendar slot:** Month 3, Week 1-2 (nominally September 2026, running late, written 2026-10-21)
**Target URL:** `/blog/custom-website-vs-template`
**Created:** 2026-10-21

---

## Overview

| Field | Value |
|---|---|
| **Target keyword** | do i need a custom website or a template (880/mo, low difficulty) |
| **Secondary keywords** | is a custom website worth the investment (390), ai website builder vs custom development (480), custom website vs template cost comparison (260) |
| **Search intent** | Commercial investigation. The reader has decided they need a website and is choosing how to get one, with a number in mind |
| **Funnel stage** | Middle |
| **Target word count** | 1,800–2,200 |
| **Target audience** | Small business owners and founders weighing a $49 template subscription against a one-time build, usually after a bad experience with one or the other |
| **Content type** | Comparison / decision guide |
| **Tone** | Direct, first-person, plain language. Same voice as the four published guides |
| **AEO priority** | Yes. The primary keyword is a question, and the answer is a rule rather than a number, which is what AI assistants paraphrase |

---

## Suggested Title Options

1. **Do You Need a Custom Website or a Template?** (43 chars) ← recommended
2. Custom Website vs Template: How to Choose (41 chars)
3. When a Template Is Enough, and When It Is Not (45 chars)

> Template appends ` | Nikola Miljković` (19 chars). Option 1 lands at ~62 chars total. Do not exceed 50 chars raw.

## Meta Description

> A template is the right call more often than developers admit. Here is the line where it stops paying off, with real costs over three years.

(139 chars, under the 155 cap the `metaDescription()` helper enforces.)

## Summary field (frontmatter)

> A template is the right call more often than developers admit. Here is exactly where it stops paying off, and what a custom build does that it cannot.

(150 chars. The summary **is** the meta description on this site, so keep it a complete sentence under 155.)

---

## Article Outline

### H1: Do You Need a Custom Website or a Template?

### Answer-first intro (no heading, 90–120 words)
Lead with the rule, not with "it depends". A template is the right choice when the website's job is to exist and be found: hours, location, a phone number, a few photos, one service. A custom build earns its money when the website is doing the selling, when the content has a shape no template was designed for, or when speed and search are actually bringing in customers. Then the honest framing: I build custom sites for a living and I still tell people to use a template roughly as often as not, because the wrong answer here is expensive in both directions.

### H2: Do You Need a Custom Website or a Template?
The extractable answer block. Two grouped bullet lists (no tables, see format notes).

**A template is enough when:** the site is under five pages, the content is standard (about, services, contact), nobody competes with you on search, you update it yourself occasionally, your budget genuinely stops under a few hundred, you need it live this week.

**Custom pays for itself when:** the site has to convert rather than inform, your content has its own structure (a menu in two languages, a property catalogue, programmes with dates), you compete on search for terms that bring money, speed matters because your audience is on phones with bad signal, you want to own the thing rather than rent it.

Close with the sentence AI engines can lift: the question is not which is better, it is whether your website is a business card or a salesperson.

### H2: What Does Each One Actually Cost Over Three Years?
The section nobody writes honestly. Template subscriptions are a recurring cost and custom is a one-time one, so compare them over the same window.

- Template: the subscription (name the real 2026 range for Wix and Squarespace business plans), plus premium template, plus paid plugins or apps, plus the domain, multiplied by 36 months. Plus the unpriced item: your own hours.
- Custom, my own numbers: **$500 to $1,000 for a one-page site, $1,000 to $2,000 for a 3 to 5 page business site** (link to the cost guide, do not restate the whole breakdown), then hosting that is free or close to it on Vercel or Netlify, and a domain.
- The honest conclusion: over three years these two numbers land closer together than either side admits. Template is not automatically cheaper, and custom is not automatically an indulgence. What actually differs is what you own at the end and what happens when you want to change something.
- Keep every figure consistent with the published cost guide. Do not invent a new scale.

### H2: Can a Template Website Rank on Google?
The myth-killing section, and the trust centre of the article. Answer: yes, it can, and most of the articles telling you otherwise are selling custom development.

Use Google's own words rather than my opinion:
- [Google's SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) puts content first: "Creating content that people find compelling and useful will likely influence your website's presence in search results", described as more influential than the technical items in the same guide. Nothing in it ranks a platform.
- Where the platform does bite is speed. [Google's page experience documentation](https://developers.google.com/search/docs/appearance/page-experience) states plainly that "Core Web Vitals are used by our ranking systems", while also saying "There is no single signal".

Then the real mechanism, which is specific and checkable: a template is not slow because it is a template, it is slow because of what accumulates on top of it, unoptimised images, four plugins doing the work of one, and a theme that ships code for features you never use. My own example: [Casera](/blog/casera/) was loading 20 to 30 unoptimised images and taking 5 to 8 seconds. The rebuild loads in about 2 seconds with the same photography.

### H2: What Can a Custom Build Do That a Template Cannot?
Concrete, drawn from live work, not adjectives. Each item names a project the reader can open.

- **Content shaped like your business.** [Porta Brzi Brod](/blog/porta-brzi-brod/) keeps the menu, prices, hours and both languages in structured data, so one edit updates the page, the schema markup and the Serbian and English versions at once. A template would make that four separate edits and let them drift apart.
- **An image pipeline built for your photos.** [Casera](/blog/casera/), as above.
- **Schema markup that matches reality**, rather than whatever the theme emits.
- **A site you own.** Export a template site and you get HTML that does not run anywhere else. Leave a custom build and you take the repository.
- **Design that is not shared with your competitor.** W3Techs put Wix at 4.2% and Squarespace at 2.4% of all websites on 20 October 2026. Those are millions of sites drawing from the same few hundred layouts, and in a small market your competitor is often on the same one.
- A touristic example worth naming: [Zvonačka Banja](/blog/zvonacka-banja/) is image heavy in the way a template handles worst.

### H2: Are AI Website Builders Good Enough Now?
The 2026 question the older comparison articles do not answer. Be fair and specific.

Where they genuinely work: a first landing page, validating an idea, a one-off campaign page, anything where speed to live beats everything else.

Where they still fall down, stated as limits rather than scare stories: migrating a site that already ranks (URLs change, redirects break, schema disappears), anything with real structure behind it, accessibility, and lock-in. Say plainly that the output is a good first draft of a website and a poor final one, and that this is roughly where templates were ten years ago.

Avoid the statistics floating around on agency blogs about how many AI-builder users hire a developer within a year. No methodology, no citation.

### H2: When Is a Template the Right Choice?
The against-my-own-interest section. This is the same move that earned trust in the freelancer vs agency guide, and it is the reason this article can be cited.

Name the cases specifically: a brand new business testing whether there is a market at all, a side project, a single event, a business that gets every customer from Instagram or word of mouth and needs an address on the internet, a budget that genuinely stops at a few hundred, somebody who wants to drag boxes around themselves on a Sunday. Say that I turn these projects down and point people at a template, because a $900 site that exists to show a phone number is a bad use of their money.

### H2: How Do You Decide for Your Own Project?
Practical close, 5 steps: write down what the site must make happen (a call, a booking, an order, or just being findable) → check whether your content has a shape a template supports → price both over three years, not month one → look at whether anyone searches for what you sell → pick the reversible option when you are unsure, which usually means starting with a template and rebuilding once it is earning. Link the timeline guide for how long the custom route actually takes.

### H2: Frequently Asked Questions
8 questions, 40–60 words each, self-contained.

### Closing (no "Conclusion" heading, match existing posts)
One short paragraph restating the rule, then the CTA to `/contact/`, framed honestly: tell me what the site has to do, and if the answer is a template I will say so.

---

## FAQ Questions (for the `faqs` frontmatter array)

1. Do I need a custom website or a template?
2. Is a custom website worth the investment?
3. Can a template website rank on Google?
4. Is a template actually cheaper than a custom website?
5. Are AI website builders good enough for a small business?
6. Can I start with a template and move to a custom site later?
7. What does a custom website give me that a template does not?
8. How do I know if my content is too complex for a template?

> These generate FAQPage JSON-LD automatically via the `faqs` field in Keystatic. No manual schema.

---

## Keywords to Include Naturally

| Keyword | Usage | Where |
|---|---|---|
| do i need a custom website or a template | 3–4x | H1, first H2, intro, FAQ #1 |
| is a custom website worth the investment | 2x | Cost section, FAQ #2 |
| ai website builder vs custom development | 1–2x | AI section, FAQ #5 |
| custom website vs template cost | 2x | Cost section heading area, FAQ #4 |

## Internal Links (required)

| Target | Anchor text | Placed in |
|---|---|---|
| `/blog/web-developer-cost/` | what a custom site actually costs | Cost section |
| `/blog/how-long-to-build-a-website/` | how long the build takes | Decision close |
| `/blog/freelance-developer-vs-agency/` | who should build it | Decision close |
| `/blog/casera/` | Casera | Speed section and capability section |
| `/blog/porta-brzi-brod/` | Porta Brzi Brod | Capability section |
| `/blog/zvonacka-banja/` | Zvonačka Banja | Capability section |
| `/contact/` | — | Closing CTA |

**Why Porta and Zvonačka specifically:** both were indexed in August and dropped out of Google's
index in late September, and Porta has the fewest inbound internal links on the whole site (two).
They are also genuinely the right examples here, a bilingual structured menu and an image-heavy
tourism site. Do not force any other link.

**Reciprocal links to add after publishing:**
- `web-developer-cost`: the "Custom design vs. template" paragraph points here as the full comparison.
- `casera`: the "Should a hotel use a template or a custom website?" FAQ stays short and points here.

**Every internal link must carry the trailing slash.** The dev server 404s without it since 2026-10-21.

## External Links (2 required, both verified live 2026-10-21)

- [Google, SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) — "Creating content that people find compelling and useful will likely influence your website's presence in search results", and it is called out as more influential than the technical items in the guide.
- [Google, page experience](https://developers.google.com/search/docs/appearance/page-experience) — "Core Web Vitals are used by our ranking systems" and "There is no single signal".

Third factual anchor, not a required link: W3Techs, 20 October 2026, Wix 4.2% and Squarespace 2.4% of
all websites, WordPress 39.6%.

> Rule carried over from briefs 02 and 03: re-fetch every citation on the day of writing. Two of
> brief 02's planned sources turned out to be a 404 and a 403.

## Format Notes

- **No markdown tables in the post body.** `[slug].astro` and global.css have zero table styling.
- **No em dashes anywhere in the article**, including the FAQ answers and the summary field.
- Pricing must match the published cost guide exactly: $500 to $1,000 one page, $1,000 to $2,000 for
  3 to 5 pages, $1,500 to $2,500 content-rich, $2,000+ complex. `CONTENT-BRIEF-01.md` carries dead
  figures from before the guide was written, ignore it.
- Name the template subscription prices only after checking them on the day of writing. Do not
  publish a 2025 price in a 2026 article.

## Image Requirements

Cover: reuse `/assets/images/guide-blog.webp`, the same one every guide carries. Variants `-400` and
`-700` already exist beside it. Do not add to the `projects` array in `Work.astro`, that is client
work only.

## Schema Markup

- **Article** and **BreadcrumbList**: generated by `[slug].astro`
- **FAQPage**: auto-generated from the `faqs` array
- No hand-written JSON-LD in the body.

---

## Competitive Notes

Page one splits cleanly into two groups that both have something to sell:

- **Agencies** writing "custom vs template", quoting $5,000 to $50,000 for custom and 8 to 16 weeks,
  and warning about template technical debt over 2 to 5 years. Their numbers describe their own
  market, not a small business hiring one developer.
- **Builders and AI builder vendors** answering that a template or an AI draft is enough for anyone.

Typical length 1,500 to 3,000 words. Common structure: pros and cons, a cost table, a hybrid
suggestion, an "it depends" ending.

What none of them do: give a figure for what the custom route costs at the small end, admit when a
template is the correct answer, or cite Google rather than themselves on whether a template can rank.

## Differentiation

1. **Written against my own interest, explicitly.** A full section on when to use a template, from
   someone who sells custom builds, with the specific project types I turn away.
2. **Three year cost comparison with real numbers**, mine on one side and current subscription prices
   on the other, instead of the $5,000 to $50,000 agency bracket that does not apply to this reader.
3. **Google's own documentation** on whether the platform ranks, rather than a developer's assertion.
   Then the honest mechanism, speed, backed by a real before and after from Casera.
4. **The AI builder question answered in 2026 terms**, which the older page-one articles predate.

## Cannibalisation Warning

Two published pages already touch this query:
- `web-developer-cost` has the FAQ "Is a custom website worth the extra cost over a template?" and a
  "Custom design vs. template" paragraph in the cost-drivers section.
- `casera` has the FAQ "Should a hotel use a template or a custom website?".

**This article must own the query.** Keep both existing mentions short, do not expand them, point both
at this article, and do not reuse whole sentences between posts.

## Pre-Publish Checklist

- [ ] Direct answer with the rule within the first 100 words
- [ ] All content H2s in question format
- [ ] 8-question FAQ, each 40–60 words, self-contained
- [ ] 6+ internal links, all with trailing slashes, 2 verified external citations
- [ ] Porta Brzi Brod and Zvonačka Banja both linked
- [ ] Title ≤ 50 chars, summary ≤ 155 chars, no em dashes, no tables
- [ ] Subscription prices checked on the day of writing
- [ ] `publishedDate` set, `draft: false`, cover set to `guide-blog.webp`
- [ ] Reciprocal links added to `web-developer-cost` and `casera`
- [ ] `npm run build` passes, page verified locally (schema, meta length, FAQ count, console)
- [ ] After deploy: Request Indexing manually in the Search Console UI for
      `https://www.nikolamiljkovic.live/blog/custom-website-vs-template/` (trailing slash, from the
      sitemap `<loc>`). The Indexing API is a no-op for blog posts.
