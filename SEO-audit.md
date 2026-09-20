# Meagle 360 — SEO Audit & Action Plan
*Prepared: September 16, 2026 — based on a manual review of the live site*

## How to use this doc
This is a working checklist for whoever implements fixes. Each item is written as a task. Items marked **[VERIFY]** couldn't be confirmed from a browser-rendered view of the page and need to be checked directly in the code, Google Search Console (GSC), or a crawler (Screaming Frog / Ahrefs Site Audit) before fixing.

---

## Priority Summary

**P0 — Fix first (technical/structural, affects the whole site)**
- [ ] Confirm `meagle360.com` (no www) 301-redirects to `https://www.meagle360.com` sitewide **[VERIFY]** — canonicals consistently point to the www version, so the redirect needs to actually exist or you're splitting link equity.
- [ ] Make footer navigation identical across every page (see "Sitewide" below) — currently inconsistent between pages.
- [ ] Add FAQPage structured data to every page with an on-page FAQ accordion (Home, all Feature pages, both Alternative pages, Pricing) — you already have the content, you're just not getting the rich-result markup for it.
- [ ] Fix the two blog posts with broken category/taxonomy labels (listed under Blog section).

**P1 — High value, page-level**
- [ ] Rework Homepage H1 to include a core keyword ("HRMS" / "HR software").
- [ ] Resolve the duplicate "Leave Policy in India" blog posts (cannibalization).
- [ ] Fix inconsistent Twitter Card tags on `/pricing`.
- [ ] Add 3-5 more `/alternatives/` pages (Zoho People, Darwinbox, HROne, RazorpayX Payroll, Zimyo) — your existing template (Keka, greytHR) is strong, just under-built out.

**P2 — Growth / expansion**
- [ ] Add more `/solutions/` pages beyond "HRMS for Startups" (by industry, by company size, by city).
- [ ] Add supporting educational content + FAQ to the three `/tools/` pages so they're not thin utility pages.
- [ ] Strengthen About/Security pages for trust signals (E-E-A-T), since HR/payroll is a compliance-sensitive category.

---

## Sitewide / Technical SEO

- [ ] **Footer/nav consistency:** The Home and Payroll pages' footers link to all Feature pages, both Alternatives, the Solutions page, and all 3 Tools. The `/pricing` page's footer is missing "Hiring Management," both Alternatives, "HRMS for Startups," and all 3 Tools. Every page should carry the full footer link set — this is free internal linking to your highest-intent pages (alternatives, tools) and it's currently only reaching visitors on some pages.
- [ ] **Structured data (schema.org):** No JSON-LD was visible in the rendered pages I reviewed. Add:
  - `Organization` + `SoftwareApplication` (or `Product`) schema on the Homepage
  - `FAQPage` schema on every page with a visible FAQ block
  - `BreadcrumbList` schema on Feature/Alternative/Blog pages
  - `Article` schema on blog posts
  - Verify all of this with Google's Rich Results Test after implementation.
- [ ] **XML sitemap & robots.txt [VERIFY]:** Confirm a sitemap exists (`/sitemap.xml`), is submitted in GSC, and includes every page listed below. Confirm `robots.txt` isn't blocking anything you want indexed.
- [ ] **Google Search Console [VERIFY]:** If not already set up, verify the property, submit the sitemap, and check the Coverage report for any pages excluded/not indexed.
- [ ] **Social meta tag QA:** At least one page (`/pricing`) has Twitter Card title/description that don't match its OG/meta title. Audit all pages for this — it's an easy copy-paste error to repeat.
- [ ] **Core Web Vitals / page speed [VERIFY]:** Site is built on Next.js with optimized `_next/image` assets, which is a good sign, but run PageSpeed Insights on Home, a Feature page, and the Blog index to confirm real-world scores.
- [ ] **Canonical audit [VERIFY]:** Spot-checked pages all self-canonicalize correctly to the `www` version. Worth a full crawl to confirm no page is missing a canonical or pointing to the wrong URL.

---

## Page-by-Page Recommendations

### Homepage — `/`
- Title and meta description are well-written and appropriately sized — no change needed.
- **H1 ("Manage People. Simplify Processes. Grow Together.") doesn't contain a target keyword.** Revise to work in "HRMS" or "HR software" naturally, e.g. *"Manage People. Simplify HR & Payroll. Grow Together."*
- Image alt text is descriptive and good (keep doing this on every new image).
- FAQ section present but not marked up with FAQPage schema — see Sitewide.

### Features Hub — `/features`
- Not deep-audited here — confirm it has unique title/meta (not a duplicate of Homepage) and that it links out to all 9 module pages with descriptive anchor text.

### Feature Module Pages (9 pages)
`/features/attendance-management-software`, `/features/payroll-software`, `/features/leave-management-software`, `/features/shift-management-software`, `/features/employee-self-service`, `/features/employee-database-software`, `/features/expense-management`, `/features/hr-reports-analytics`, `/features/hiring-management-software`

- The Payroll page (sampled) is genuinely strong: unique title/meta, a real comparison table vs. Keka/greytHR, a full FAQ section, and "Related reading" internal links to blog posts and other feature pages. **Use this exact page as the template and confirm the other 8 all match this depth** — thin or templated-with-no-unique-content versions of these pages will underperform.
- Add FAQPage schema to each (content is already there).
- Make sure each page's comparison table and FAQ content is genuinely unique per module, not lightly reworded from the Payroll page.

### Pricing — `/pricing`
- Twitter Card title/description don't match the page's actual title/OG tags — fix for consistency.
- CTAs link to `/#demo` (an anchor) rather than `/demo` used elsewhere on the site — confirm this is intentional; if not, standardize the demo CTA link across the whole site so analytics/conversion tracking isn't split across two paths.
- Footer is missing several key links — see Sitewide footer note.
- Otherwise strong: clear comparison table vs. Keka/greytHR, interactive cost calculator, solid FAQ section.

### Alternatives — `/alternatives/keka-alternative`, `/alternatives/greythr-alternative`
- The Keka page (sampled) is one of the best pages on the site: honest comparison table, clearly dated competitor pricing with a source note, "who it's for" sections for both sides, and a real FAQ. Confirm the greytHR page matches this quality.
- **Expand this page type** — it's clearly your strongest content format. Add: Zoho People, Darwinbox, HROne, RazorpayX Payroll, Zimyo. Each is a realistic ranking opportunity for "[competitor] alternative" and "[competitor] vs Meagle 360" searches.
- Add FAQPage schema.

### Solutions — `/solutions/hrms-for-startups`
- Only one solutions page exists. Since your buyer persona is explicitly "10-100 employee teams," add parallel pages: by industry (manufacturing, retail, IT services, healthcare), by stage (SME vs. startup), or by city (Bangalore, Mumbai, Pune, Delhi NCR) where competition is lower than generic "HRMS software" searches.

### Blog — `/blog` + posts
You have **26 published posts** already — more content depth than most sites this size, which is a real asset. Specific issues found:
- [ ] **Duplicate/overlapping topic:** "Leave Policy in India: Types of Leaves Every Employee Should Know" (Aug 26) and "Leave Policy in India 2026: Types, Rules and What Companies Must Offer" (Aug 15) target the same keyword and will likely cannibalize each other in search. Either merge them into one authoritative post and 301-redirect the weaker one, or clearly differentiate their target keywords/angles.
- [ ] **Category/taxonomy bug:** The post "Best All-in-One HRMS Software for Growing Businesses in 2026" shows its raw slug (`best-hrms-software-for-growing-businesses`) as its category label on the blog index instead of a proper category name — a CMS data entry error to fix.
- [ ] **Missing category label:** "How to Build a Modern and Effective HR Management System" has no category badge on the blog index, unlike every other post — same kind of fix.
- [ ] Add `Article` schema to each post (headline, datePublished, author).
- [ ] Keep the current cadence — the compliance/how-to topics (PF, ESI, leave encashment, salary slip format, etc.) are exactly the kind of informational searches that build topical authority for an HR/payroll product.

### Tools — `/tools/payslip-generator`, `/tools/ctc-to-in-hand-calculator`, `/tools/quotation-maker`
- Not directly audited, but interactive calculator/generator pages are frequently thin on indexable text, which limits how well they rank. Add supporting content to each: what the tool does, how the calculation works, a short FAQ (e.g., "How is CTC different from in-hand salary?"), and a link to the related blog post (you already have "CTC vs In-Hand Salary" and "Salary Slip Format" posts — link them from the matching tool).
- Add `SoftwareApplication` or `HowTo` schema where appropriate.

### About, Careers, Contact, Security, Privacy, Terms
- Lower SEO priority, but for a payroll/compliance product, the **About** and **Security** pages double as trust signals (E-E-A-T) for both users and Google. Confirm About includes real company details (founding info, team, or at least a clear "who runs this" statement — you already surface "A product by Nexa Solutions" in the footer, so make sure that relationship and Nexa Solutions' credibility are clear on the About page itself).
- Confirm Contact page has a physical address/GSTIN if applicable — additional trust signal for an Indian B2B SaaS.

---

## Suggested Rollout Order
1. **Week 1:** Footer consistency, canonical/redirect check, Twitter tag fix, blog taxonomy bugs, submit sitemap to GSC if not done.
2. **Weeks 2-3:** FAQPage + Article schema rollout across existing pages.
3. **Weeks 3-4:** Homepage H1 rewrite, resolve duplicate leave-policy posts.
4. **Month 2:** Build out 3-5 new Alternatives pages.
5. **Month 2-3:** Add supporting content to the 3 Tools pages; build out 2-3 new Solutions pages.