# Meagle 360 — Complete SEO & Growth Audit
**Domain:** meagle360.com (serves on `www.`) · **Audited:** 2 August 2026 · **Auditor brief:** SaaS SEO / B2B HR Tech

---

## 0. Executive Summary — Read This First

I crawled every reachable URL. The site is **12 pages total**: homepage, /blog, 6 blog posts, /careers, 3 job posts, /contact. That is the entire index footprint.

**Overall SEO Score: 29 / 100.**

Meagle 360 does not have an SEO problem. It has a **"there is no website to rank" problem**, compounded by **four canonical bugs that actively de-index the pages that do exist**, and a **trust layer built entirely on fabricated social proof** that will not survive contact with a real B2B buyer or a Google quality rater.

The five things that matter more than everything else in this document combined:

1. **Every canonical on the site points to the non-`www` host while the site serves `www`.** Sitewide broken self-canonicalisation.
2. **`/careers` and every job page canonicalise to the homepage.** You are telling Google those pages do not exist.
3. **Blog articles have no canonical tag at all.**
4. **You have zero commercial landing pages.** Pricing and demo are `#anchors` on the homepage. There is nothing to rank for "attendance management software", "payroll software", "leave management software" — the actual money terms.
5. **The trust section is fake**, including a real third-party company's logo (Invoice2go) in a "trusted by" strip, and template testimonials ("James Anderson, HR Manager, TechCorp"). This is a legal risk, a conversion risk, and an EEAT catastrophe.

There is also **unshipped placeholder text live in production** — "Drop your dashboard screenshot here (hrms-image.png)" and "Employee app preview (left.png)". Fix that today, before anything else in this document.

---

# PART 1 — Website Analysis

## 1.1 Full URL inventory (complete crawl)

| # | URL | Type | Score |
|---|-----|------|-------|
| 1 | `/` | Homepage (everything lives here) | **4.5 / 10** |
| 2 | `/blog` | Blog index | **5.0 / 10** |
| 3 | `/blog/7-must-have-hiring-processes-every-company-needs` | Article | **4.0 / 10** |
| 4 | `/blog/best-all-in-one-hrms-software-for-growing-businesses-in-2026` | Article | **4.0 / 10** |
| 5 | `/blog/how-to-build-a-modern-and-effective-hr-management-system` | Article (1 min read) | **2.0 / 10** |
| 6 | `/blog/streamline-payroll-process-2026` | Article (2 min) | **3.0 / 10** |
| 7 | `/blog/complete-guide-employee-onboarding` | Article (2 min) | **3.0 / 10** |
| 8 | `/blog/ai-transforming-attendance-tracking` | Article (2 min) | **3.5 / 10** |
| 9 | `/careers` | Careers index | **4.0 / 10** |
| 10 | `/careers/product-marketing-associate` | Job post | **3.5 / 10** |
| 11 | `/careers/hr-operations-executive` | Job post | **3.5 / 10** |
| 12 | `/careers/senior-frontend-engineer` | Job post | **3.5 / 10** |
| — | `/pricing` | **DOES NOT EXIST** (`/#pricing`) | **0 / 10** |
| — | `/demo` | **DOES NOT EXIST** (`/#demo`) | **0 / 10** |
| — | `/about` | **DOES NOT EXIST** | **0 / 10** |
| — | `/privacy` | **DOES NOT EXIST** | **0 / 10** |
| — | `/terms` | **DOES NOT EXIST** | **0 / 10** |
| — | `/security` | **DOES NOT EXIST** | **0 / 10** |
| — | Any feature page | **DOES NOT EXIST** | **0 / 10** |

**Site-wide average of live pages: 3.6 / 10.**

---

## 1.2 Homepage — 4.5 / 10

### What is good
- Meta title and description are genuinely well written: `Meagle 360: HRMS Software | All-in-One HR Management System` with a benefit-led description. This is above average for an early-stage SaaS site.
- Open Graph is complete on the homepage — `og:image`, `og:image:width/height`, `og:image:alt`, `og:locale`, `og:site_name`, `twitter:card`. Someone knew what they were doing here.
- Feature naming uses real search language: Attendance, Leave, Payroll, Shifts, Expenses, Reports. That vocabulary matches how buyers actually search.
- FAQ copy is specific and answers real objections (3–5 day implementation, 14-day trial, no card required).
- Single-price positioning ("One Plan. Everything Included.") is a legitimate differentiator against Keka's three-tier + hidden-fee model.

### What is bad
- **Placeholder text is live in production.** Two instances: `Drop your dashboard screenshot here (hrms-image.png)` and `Employee app preview (left.png)`. Every visitor and Googlebot sees this. It says "abandoned template" louder than any copy on the page.
- **The stat counters render as `0`.** The DOM ships `0 / Time Saved`, `0 / Data Accuracy`, `0 / Cost Reduction`, `0 / Compliance`. These are client-side count-up animations with no server-rendered value. Google indexes "0% time saved". Your headline proof points are literally zeros.
- **Fabricated social proof.** "TRUSTED BY 500+ BUSINESSES WORLDWIDE" over a logo strip containing `Invoice2go` — a real, unaffiliated fintech company — plus `techcorp`, `novatech`, `nextwave`, `digitalhub`, `alphaX`, which are stock template names. Six testimonials attributed to invented people at those same invented companies. Using Invoice2go's name is trademark misuse. The rest is a false-advertising exposure and, under Google's Search Quality Rater Guidelines, a textbook "deceptive page" signal.
- **The testimonial block is duplicated verbatim in the DOM** (marquee loop). Same for the logo strip, which appears four times. Google sees the same 6 testimonials twice and 7 logos four times — self-duplicated body content.
- **No `/pricing` URL.** `#pricing` cannot rank, cannot be linked to by a review site, cannot appear in a sitelink, and cannot be tracked as a separate conversion step. "Keka pricing" style queries are among the highest-intent terms in this category and you have no target for yours.
- **Pricing is logically incoherent**: `₹149/user/mo` sold as "Unlimited employees". Per-user pricing and unlimited employees are mutually exclusive. A CFO will notice in four seconds.
- **Currency/geography mismatch**: "worldwide" + INR-only pricing + an Indian mobile number. Nothing tells a UAE or German buyer whether they can buy.
- No mention of **AI anywhere in the meta or hero** despite "AI-powered HRMS" being your stated positioning. The only AI reference is "99.9% Attendance — Real-time AI tracking" in a floating card. You are not claiming the category you say you own.

### What is confusing
- Hero H1 "Manage People. Simplify Processes. Grow Together." contains **zero keywords and zero product category**. A visitor 1.5 seconds in does not know this is HR software.
- The `<title>` element and the page's rendered title disagree: the head serves `Meagle 360: HRMS Software | All-in-One HR Management System` while `HRMS Software for Modern HR Teams` also appears as a title value. This is a Next.js metadata conflict — two title sources.
- "Complete HR Modules" section lists only 3 of ~10 modules (Organization, Document, Exit Management) and then stops. Reads like an unfinished component.
- Performance Management, Recruitment, and Onboarding are named in the employee-benefits list and in blog copy but **absent from the feature grid**. Buyers cannot tell what is actually in the product.

### What Google may dislike
- Broken sitewide canonical host (see Part 2.1) — the single most damaging technical issue on the site.
- Fabricated testimonials + real third-party logos = deceptive-design signal, directly relevant to the "Lowest" quality rating criteria for YMYL-adjacent commercial pages.
- `meta keywords` tag present — ignored since 2009, but a reliable amateur-site fingerprint.
- Body text containing `0` where numbers should be, plus the `.png` placeholder strings.
- Total absence of Organization / SoftwareApplication / FAQPage schema despite having ideal content for all three.
- No About, Privacy, Terms, or Security pages — Google's rater guidelines explicitly weight "contact/about/customer service information" for commercial sites.

### What users may dislike
- No screenshots of the actual product. `hrms-image.png` sits behind a "drop your screenshot here" caption. B2B software buyers will not book a demo without seeing the UI.
- No company address, no founder, no team, no legal entity name beyond "A product by Nexa Solutions".
- Demo form asks "Number of users" but no field explanation, no calendar, no instant booking. Compare Keka/Rippling: instant Calendly-style slot selection.
- WhatsApp + personal-format mobile as primary contact reads consumer/freelance, not enterprise SaaS.

---

## 1.3 `/blog` index — 5.0 / 10

**Good:** clean URLs, category tags, dates, read times, dedicated meta title/description that is actually keyword-relevant (`HR Blog: HRMS Tips, Payroll & HR Best Practices`).

**Bad:**
- `twitter:title` and `twitter:description` on this page are **inherited from the homepage** — the Twitter card for /blog advertises the homepage.
- Only 6 posts. Below critical mass for topical authority in a category where greytHR and Keka each publish 500+ URLs.
- No category archive pages (`/blog/category/payroll`), no tag pages, no pagination, no author pages, no search.
- One post has **no category assigned** ("How to Build a Modern and Effective HR Management System").
- Canonical is `https://meagle360.com/blog` while the page serves at `www.` — same host bug.

---

## 1.4 Blog articles — average 3.5 / 10

Audited in depth: `/blog/best-all-in-one-hrms-software-for-growing-businesses-in-2026`.

- **No canonical tag at all.** Articles are the only page type on the site with zero canonical.
- **Title tag brand-stacking bug**: the rendered title is `Best All-in-One HRMS Software for Growing Businesses | Meagle 360 | Meagle 360 Blog | Meagle 360`. The brand appears **three times**; the string is ~92 characters and will truncate in SERPs mid-brand. This is a template concatenating `title` + section + siteName.
- **Broken internal link**: the CTA links to `https://www.meagle360.com/blog/meagle360.com` — a relative-URL bug producing a 404 inside your highest-intent article.
- **Search intent mismatch, and this one is expensive.** The post targets "best all-in-one HRMS software" — a comparison/listicle SERP. Every ranking result for that query is a multi-vendor list. Your post is a single-product pitch with a "Introducing Meagle 360" H2. It will never rank. You have spent your best keyword on a page structurally incapable of winning it.
- **No author entity.** `meta-author` is "Nexa Solutions", a company. No byline, no bio, no photo, no credentials, no `Person` schema, no author archive. In HR Tech — where content touches statutory compliance, PF/ESI, TDS — anonymous authorship is an EEAT dead end.
- **No Article / BlogPosting schema**, no `dateModified`, no breadcrumbs.
- FAQ block is well written but **not marked up as FAQPage schema** — free rich-result real estate discarded.
- Content is thin against the SERP: ~900 words vs 2,500–4,000 for ranking competitors.
- Phone CTA links to a WhatsApp API URL while displaying a phone number — mismatched affordance.
- The 1-minute-read post ("How to Build a Modern and Effective HR Management System") is thin enough to be a Helpful Content liability. Expand or `noindex` it.

---

## 1.5 `/contact` — 3.0 / 10

- Canonical is correct in path (`/contact`) but **wrong in host** (non-`www`).
- **`og:url` points to the homepage.** `og:title` and `og:description` are the homepage's. Every share of your contact page renders as the homepage.
- Content is a **near-duplicate of the homepage demo block** — same H3, same "Join 500+ organizations" line, same form. Two URLs, one block of content.
- **No physical address, no legal entity, no business hours, no map, no support email tiers, no NAP consistency.** No `Organization` or `ContactPage` schema.
- H1 "Get in Touch" is fine; everything under it is a copy-paste.

---

## 1.6 `/careers` + job pages — 4.0 / 10 and 3.5 / 10

- **Canonical on `/careers` and every job page is `https://meagle360.com` — the homepage.** These four URLs are instructing Google to consolidate them into the homepage. They will not be indexed.
- **No `JobPosting` schema.** You are an HR software company with three open roles and you are not eligible for Google Jobs. This is the single most on-brand miss on the site — and Google Jobs is a free, high-intent traffic source that also generates brand searches.
- `og:*` and `twitter:*` all inherited from the homepage.
- Job descriptions are short (3 bullets each) — below the depth Google Jobs and Indeed reward.
- Upload-CV form with no privacy notice on a page collecting name, email, phone, salary expectation and a PDF. That is a GDPR/DPDP Act problem, not just an SEO one.

---

## 1.7 Navigation, footer, internal links

**Navigation:** Home · Pricing (#anchor) · Blog · Careers · Contact · Request Demo (#anchor).

- Two of six nav items are homepage anchors. Your primary navigation passes **no link equity to any page**, because there are no other pages.
- No Features, no Solutions, no Industries, no Integrations, no Customers, no Resources — the six menu items every ranking HRMS competitor uses to distribute PageRank.
- Careers occupies a top-nav slot on a 12-page site. Careers should be in the footer; that slot belongs to Features or Solutions.

**Footer:** 4 links total (Pricing, Blog, Careers, Contact) across three columns. A site-wide footer is your highest-leverage internal linking surface and it is carrying four links.

**Internal links:** effectively zero. No blog post links to another blog post. No post links to a feature page (none exist). Every CTA points to `/#demo`. The link graph is a star with the homepage at the centre and no edges between leaves.

---

# PART 2 — Technical SEO Audit

## 2.1 CRITICAL: canonicalisation is broken sitewide

Verified state:

| URL served | Canonical declared | Verdict |
|---|---|---|
| `https://www.meagle360.com/` | `https://meagle360.com` | Cross-host — wrong |
| `https://www.meagle360.com/blog` | `https://meagle360.com/blog` | Cross-host — wrong |
| `https://www.meagle360.com/contact` | `https://meagle360.com/contact` | Cross-host — wrong |
| `https://www.meagle360.com/careers` | `https://meagle360.com` | **Points to homepage** |
| `https://www.meagle360.com/careers/senior-frontend-engineer` | `https://meagle360.com` | **Points to homepage** |
| `https://www.meagle360.com/blog/[slug]` | *(none)* | **Missing entirely** |

Three separate failures. Fix in this order:

**Step 1 — pick one host and be consistent.** The site 301s `meagle360.com` → `www.meagle360.com`. So `www` is canonical. Every `<link rel="canonical">` must therefore use `www`.

**Step 2 — Next.js implementation.** In `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://www.meagle360.com'),
  alternates: { canonical: './' },   // self-referencing per route
  title: {
    default: 'Meagle 360: HRMS Software | All-in-One HR Management System',
    template: '%s | Meagle 360',      // ONE template, applied once
  },
};
```

Then in each route (`app/careers/page.tsx`, `app/blog/[slug]/page.tsx`) set only `title` and `alternates: { canonical: '/careers' }` etc. **Remove the manual `| Meagle 360` suffixes from every page title** — the template is what is producing `... | Meagle 360 | Meagle 360 Blog | Meagle 360`.

**Step 3 — blog articles** need `alternates: { canonical: \`/blog/${slug}\` }` in `generateMetadata`.

**Impact:** until this is fixed, nothing else in this document will produce results. Careers pages are actively excluded and blog articles are canonically ambiguous.

---

## 2.2 Priority-ordered technical fix list

### P0 — do this week

| # | Issue | Fix |
|---|---|---|
| 1 | Canonical host mismatch sitewide | `metadataBase` + self-referencing canonicals on `www` |
| 2 | `/careers/*` canonical → homepage | Per-route canonical |
| 3 | Blog articles have no canonical | Add in `generateMetadata` |
| 4 | Placeholder copy live: "Drop your dashboard screenshot here", "Employee app preview (left.png)" | Delete; ship real product screenshots |
| 5 | Stat counters render `0` in HTML | Server-render the final value; animate from it. Use `<span>85%</span>` in markup, animate via CSS/JS on top |
| 6 | Fabricated testimonials + Invoice2go logo | Remove immediately. Replace with real logos/quotes or an honest "Early access — join our first customers" block |
| 7 | Broken link `/blog/meagle360.com` | Fix relative-URL bug in MDX/CMS link handling |
| 8 | Title-stacking bug (`\| Meagle 360` ×3) | Single `template` in root metadata only |
| 9 | No `robots.txt` / `sitemap.xml` verified | Ship both (spec below) |
| 10 | No Privacy Policy / Terms | Publish `/privacy`, `/terms` — also required for Google Ads and for the CV-upload form |

### P1 — this month

| # | Issue | Fix |
|---|---|---|
| 11 | No `/pricing` URL | Build a real page; keep `#pricing` as a 301-free anchor on home but make `/pricing` the canonical target |
| 12 | No `/demo` URL | Build it; it is your highest-converting page and should be independently rankable and ad-linkable |
| 13 | Zero structured data | Organization, SoftwareApplication, FAQPage, BlogPosting, BreadcrumbList, JobPosting (schemas below) |
| 14 | `og:url` wrong on `/contact`, `/careers` | Per-route `openGraph.url` |
| 15 | `twitter:*` inherited on `/blog` | Per-route Twitter metadata |
| 16 | No `/about` | Publish with founder, team, entity, address |
| 17 | Homepage PNGs (`hrms-image.png`, `complete-hr-modules.png`, `left.png`, `logo.png`) | Convert to AVIF/WebP, serve via `next/image` with explicit width/height, `priority` on LCP image only |
| 18 | Empty `alt` on testimonial avatars | Descriptive alt or `alt=""` + `aria-hidden` if decorative (correct choice for avatars is `alt=""`, but the *content* images need real alt) |
| 19 | `meta keywords` on every page | Delete |
| 20 | No breadcrumbs | Add visible breadcrumbs + `BreadcrumbList` on blog and careers |

### P2 — quarter

| # | Issue | Fix |
|---|---|---|
| 21 | Duplicated testimonial/logo DOM (marquee ×4) | Render once, clone via CSS `content` or mark clones `aria-hidden` + exclude from indexable text |
| 22 | No hreflang despite multi-country ambition | Add only once you build `/in/`, `/ae/` variants — not before |
| 23 | No `dateModified` on articles | Add; drives freshness for "2026" queries |
| 24 | No 404 page audit | Custom 404 with search + top links |
| 25 | No RSS feed | `/blog/rss.xml` — feeds aggregators and AI crawlers |

---

## 2.3 Heading hierarchy

Homepage current structure is broken:

- H1: "Manage People. Simplify Processes. Grow Together." ✅ (one H1, but keyword-free)
- Then H2s: "Everything You Need to Manage Your Workforce", "A Complete Suite of HR Management Modules", "Benefits That Drive Business Success", "Empower Your Employees Every Step of the Way", "One Plan. Everything Included.", "Trusted by HR Leaders Across Industries", "Frequently Asked Questions"
- **H3s used for feature names** (Employee Directory, Attendance, Payroll…) — correct
- **H4s used for module names** inside a section whose parent is H2 — skips H3. Invalid nesting.
- The final CTA "Ready to Transform Your HR Management?" is an **H3 with no H2 parent** at the end of the page.

**Rewritten homepage outline:**

```
H1  HRMS Software That Automates Attendance, Leave & Payroll
H2  Everything you need to manage your workforce
    H3  Attendance Management
    H3  Leave Management
    H3  Payroll Automation
    H3  Shift & Roster Management
    H3  Expense Management
    H3  Employee Self-Service
    H3  Reports & Analytics
    H3  Employee Directory & Org Chart
H2  A complete suite of HR modules
    H3  Organization Management
    H3  Document Management
    H3  Exit Management
H2  Why growing companies choose Meagle 360
H2  Built for your employees, not just your HR team
H2  Simple pricing: one plan, everything included
H2  What our customers say
H2  Frequently asked questions about HRMS software
H2  Ready to automate your HR?
```

---

## 2.4 robots.txt (ship exactly this)

```
User-agent: *
Allow: /

Disallow: /api/
Disallow: /*?*utm_
Disallow: /thank-you

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://www.meagle360.com/sitemap.xml
```

Allowing AI crawlers is deliberate: for a new HRMS brand, citation inside ChatGPT/Perplexity answers to "best HRMS for startups in India" is now a meaningful acquisition channel and you have no brand equity to protect.

## 2.5 sitemap.xml (Next.js `app/sitemap.ts`)

```ts
import type { MetadataRoute } from 'next';
import { getAllPosts, getAllJobs } from '@/lib/content';

const BASE = 'https://www.meagle360.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const statics = [
    { url: `${BASE}/`,         priority: 1.0, changeFrequency: 'weekly'  as const },
    { url: `${BASE}/pricing`,  priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/demo`,     priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/about`,    priority: 0.6, changeFrequency: 'yearly'  as const },
    { url: `${BASE}/contact`,  priority: 0.6, changeFrequency: 'yearly'  as const },
    { url: `${BASE}/blog`,     priority: 0.8, changeFrequency: 'daily'   as const },
    { url: `${BASE}/careers`,  priority: 0.5, changeFrequency: 'weekly'  as const },
  ];

  const posts = (await getAllPosts()).map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updatedAt ?? p.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const jobs = (await getAllJobs()).map(j => ({
    url: `${BASE}/careers/${j.slug}`,
    lastModified: j.updatedAt,
    priority: 0.4,
  }));

  return [...statics, ...posts, ...jobs];
}
```

## 2.6 Structured data — copy-paste implementations

**Organization + SoftwareApplication (homepage, one `@graph`):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.meagle360.com/#organization",
      "name": "Meagle 360",
      "url": "https://www.meagle360.com/",
      "logo": "https://www.meagle360.com/logo.png",
      "parentOrganization": { "@type": "Organization", "name": "Nexa Solutions", "url": "https://nexa-solutions.in" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "REPLACE_WITH_REGISTERED_ADDRESS",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "REPLACE",
        "addressCountry": "IN"
      },
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+91-80773-13241",
        "email": "info@meagle360.com",
        "contactType": "sales",
        "areaServed": ["IN","AE","SA","SG","GB","DE"],
        "availableLanguage": ["en","hi"]
      }],
      "sameAs": [
        "https://www.linkedin.com/company/REPLACE",
        "https://x.com/REPLACE",
        "https://www.youtube.com/@REPLACE"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.meagle360.com/#software",
      "name": "Meagle 360",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Human Resource Management System",
      "operatingSystem": "Web, iOS, Android",
      "url": "https://www.meagle360.com/",
      "publisher": { "@id": "https://www.meagle360.com/#organization" },
      "featureList": [
        "Attendance management","Leave management","Payroll automation",
        "Shift and roster management","Expense management",
        "Employee self-service","Reports and analytics","Exit management"
      ],
      "offers": {
        "@type": "Offer",
        "price": "149",
        "priceCurrency": "INR",
        "unitText": "per user per month",
        "availability": "https://schema.org/InStock",
        "url": "https://www.meagle360.com/pricing"
      }
    }
  ]
}
</script>
```

**Do not add `aggregateRating` until you have real, verifiable reviews.** Fake rating markup is a manual-action trigger.

**FAQPage (homepage + every article with an FAQ block):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How long does HRMS implementation take?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Most teams are fully onboarded on Meagle 360 within 3 to 5 business days, including data migration, payroll setup and employee app rollout."
    }
  }]
}
</script>
```

**BlogPosting (articles) — note the `author` must be a `Person`:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.meagle360.com/blog/SLUG" },
  "headline": "Best All-in-One HRMS Software for Growing Businesses in 2026",
  "image": ["https://res.cloudinary.com/.../image.webp"],
  "datePublished": "2026-07-26T21:33:43Z",
  "dateModified": "2026-08-02T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "FOUNDER_NAME",
    "jobTitle": "Founder, Meagle 360",
    "url": "https://www.meagle360.com/authors/FOUNDER_SLUG",
    "sameAs": ["https://www.linkedin.com/in/REPLACE"]
  },
  "publisher": { "@id": "https://www.meagle360.com/#organization" },
  "wordCount": 900
}
</script>
```

**JobPosting (each `/careers/[slug]`) — unlocks Google Jobs:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Senior Frontend Engineer",
  "description": "<p>Full HTML job description here — Google requires HTML, not plain text.</p>",
  "datePosted": "2026-07-20",
  "validThrough": "2026-10-20",
  "employmentType": "FULL_TIME",
  "hiringOrganization": { "@id": "https://www.meagle360.com/#organization" },
  "jobLocationType": "TELECOMMUTE",
  "applicantLocationRequirements": { "@type": "Country", "name": "India" },
  "directApply": true
}
</script>
```

## 2.7 Core Web Vitals — likely issues and fixes

I could not run a lab test from here, so run PageSpeed Insights on `/` and `/blog/[slug]` and check these specific suspects:

- **LCP**: `hrms-image.png` is the hero image and is a PNG. A 1200×630+ dashboard PNG is typically 400 KB–1.5 MB. Convert to AVIF with WebP fallback, serve with `next/image priority sizes="(max-width: 768px) 100vw, 50vw"`. Target: LCP < 2.0 s.
- **CLS**: the marquee logo strip and the testimonial carousel are classic CLS sources if they mount client-side. Reserve height with `min-height` on the container.
- **INP**: four simultaneous marquee animations + count-up animations + carousel = main-thread contention on mid-range Android, which is exactly what an Indian SME buyer uses. Use CSS `transform` animations only, `will-change: transform`, and `prefers-reduced-motion` guards.
- **JS SEO**: the `0` counters prove at least some above-fold content is client-only. Audit with `view-source:` — if a section's text is absent from raw HTML, it is at risk. Everything in the feature grid, pricing, and FAQ must be in the server-rendered HTML.
- **Font loading**: use `next/font` with `display: swap` and preload only the weights used.

## 2.8 URL structure

Current URLs are clean and correct — `/blog/streamline-payroll-process-2026`, `/careers/senior-frontend-engineer`. No parameters, no dates, no trailing-slash inconsistency observed. **This is the one part of the technical setup that needs no work.**

Recommended structure as you scale:

```
/pricing
/demo
/features/attendance-management-software
/features/payroll-software
/features/leave-management-software
/features/shift-management-software
/features/employee-self-service
/features/expense-management
/features/hr-reports-analytics
/solutions/hrms-for-startups
/solutions/hrms-for-manufacturing
/industries/[industry]
/compare/meagle-360-vs-keka
/alternatives/keka-alternative
/tools/salary-calculator
/templates/offer-letter-format
/blog/[slug]
/authors/[slug]
/about  /security  /privacy  /terms  /dpa
```

Rule: **one URL segment per intent tier.** Do not nest `/features/attendance/geo-fencing` — it dilutes.

---

# PART 3 — Keyword Research

**Method note, and I want to be honest about it:** volume and difficulty figures below are directional estimates based on category knowledge and SERP structure, not pulled from Ahrefs/Semrush. Treat them as a prioritisation framework, then validate the top 40 in your own tool before committing budget. What is *not* an estimate is the intent classification and the SERP-type analysis — those come from how these queries actually resolve.

**KD** = keyword difficulty (0–100). **BV** = business value (1–5). **Vol** = est. monthly searches, India-weighted.

## 3.1 Tier 1 — Highest business value, buy-now intent (build these first)

| Keyword | Intent | Vol (IN) | KD | BV | Target URL |
|---|---|---|---|---|---|
| hrms software | Commercial | 12,000 | 68 | 5 | `/` |
| hr software india | Commercial | 8,000 | 62 | 5 | `/` |
| payroll software | Commercial | 22,000 | 72 | 5 | `/features/payroll-software` |
| attendance management system | Commercial | 14,000 | 55 | 5 | `/features/attendance-management-software` |
| leave management system | Commercial | 6,500 | 45 | 5 | `/features/leave-management-software` |
| hrms software for small business | Commercial | 2,400 | 38 | 5 | `/solutions/hrms-for-small-business` |
| keka alternatives | Transactional | 900 | 22 | 5 | `/alternatives/keka-alternative` |
| greythr alternatives | Transactional | 700 | 20 | 5 | `/alternatives/greythr-alternative` |
| zoho people alternatives | Transactional | 600 | 24 | 5 | `/alternatives/zoho-people-alternative` |
| hrms software price | Transactional | 1,300 | 30 | 5 | `/pricing` |
| best hrms software in india | Commercial | 3,600 | 58 | 5 | `/blog/best-hrms-software-india-2026` |
| hr payroll software for startups | Commercial | 800 | 28 | 5 | `/solutions/hrms-for-startups` |

**The two you must not skip:** `keka alternatives` and `greythr alternatives`. KD ~20–24, buyers actively churning from a competitor, and — as my SERP check confirmed — those results are currently owned by *rival vendors* (HROne, EZHRM, aidukan, SaaSrat, HRSuggest) writing about Keka. Those are the cheapest qualified leads in the category and you are absent from every one.

## 3.2 Grouped keyword clusters

### Cluster: HRMS (hub)
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| hrms | Informational | 40,000 | 74 | 3 |
| hrms full form | Informational | 18,000 | 20 | 1 |
| what is hrms | Informational | 6,000 | 30 | 2 |
| hrms software | Commercial | 12,000 | 68 | 5 |
| cloud hrms software | Commercial | 1,100 | 44 | 4 |
| hrms for sme | Commercial | 500 | 26 | 5 |
| hrms implementation checklist | Informational | 300 | 18 | 4 |
| hrms vs hris vs hcm | Informational | 900 | 25 | 3 |

### Cluster: HR Software
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| hr software | Commercial | 15,000 | 70 | 5 |
| hr management software | Commercial | 5,000 | 60 | 5 |
| hr software for small companies | Commercial | 1,200 | 34 | 5 |
| free hr software | Commercial | 2,000 | 42 | 3 |
| hr software comparison | Commercial | 700 | 36 | 4 |
| best hr software 2026 | Commercial | 1,800 | 55 | 4 |

### Cluster: Payroll (highest volume, highest value)
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| payroll software | Commercial | 22,000 | 72 | 5 |
| payroll software india | Commercial | 4,400 | 55 | 5 |
| payroll management system | Commercial | 6,600 | 58 | 5 |
| salary slip format | Informational | 33,000 | 24 | 3 |
| payroll process in india | Informational | 2,900 | 30 | 4 |
| pf esi calculation | Informational | 5,400 | 28 | 4 |
| ctc calculator | Transactional | 27,000 | 35 | 4 |
| gratuity calculator | Transactional | 60,000 | 40 | 3 |
| form 16 explained | Informational | 12,000 | 32 | 2 |
| payroll software for small business | Commercial | 1,600 | 40 | 5 |

`salary slip format`, `ctc calculator` and `gratuity calculator` are the **backlink engines** of this category — see Part 11.

### Cluster: Attendance
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| attendance management system | Commercial | 14,000 | 55 | 5 |
| attendance software | Commercial | 5,000 | 50 | 5 |
| employee attendance app | Commercial | 3,000 | 40 | 5 |
| biometric attendance system | Commercial | 9,000 | 52 | 4 |
| gps attendance app | Commercial | 1,400 | 32 | 5 |
| face recognition attendance system | Commercial | 4,000 | 46 | 5 |
| attendance sheet excel template | Informational | 22,000 | 18 | 3 |
| geofencing attendance app | Commercial | 500 | 24 | 5 |
| attendance software for construction site | Commercial | 300 | 18 | 5 |

### Cluster: Leave Management
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| leave management system | Commercial | 6,500 | 45 | 5 |
| leave management software | Commercial | 2,400 | 42 | 5 |
| leave policy india | Informational | 4,400 | 26 | 4 |
| earned leave calculation | Informational | 3,600 | 22 | 3 |
| leave application format | Informational | 40,000 | 15 | 2 |
| comp off policy | Informational | 1,900 | 20 | 3 |
| leave tracker excel | Informational | 2,900 | 20 | 3 |

### Cluster: Employee Management
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| employee management software | Commercial | 4,400 | 52 | 5 |
| employee database software | Commercial | 1,000 | 34 | 5 |
| employee records management | Informational | 800 | 28 | 4 |
| org chart software | Commercial | 3,600 | 55 | 3 |
| employee onboarding software | Commercial | 2,400 | 50 | 4 |
| employee offboarding checklist | Informational | 900 | 22 | 4 |

### Cluster: Performance Management
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| performance management system | Commercial | 8,100 | 58 | 4 |
| performance appraisal software | Commercial | 1,300 | 44 | 4 |
| okr software | Commercial | 2,900 | 56 | 3 |
| 360 degree feedback template | Informational | 1,600 | 25 | 3 |
| kpi template for employees | Informational | 2,400 | 22 | 3 |

*Caution: performance management is not on your feature grid. Do not build this cluster until the module ships — ranking for software you do not have wrecks conversion rate and creates refund churn.*

### Cluster: Recruitment
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| recruitment software | Commercial | 3,600 | 58 | 3 |
| applicant tracking system india | Commercial | 1,300 | 45 | 3 |
| offer letter format | Informational | 49,000 | 18 | 3 |
| interview feedback form | Informational | 2,400 | 20 | 2 |
| job description template | Informational | 14,000 | 30 | 2 |

### Cluster: AI HR (your stated differentiator — currently unclaimed on the site)
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| ai hr software | Commercial | 1,900 | 40 | 5 |
| ai in hr | Informational | 6,600 | 45 | 3 |
| ai attendance system | Commercial | 700 | 30 | 5 |
| ai payroll software | Commercial | 400 | 28 | 5 |
| ai hr assistant | Commercial | 900 | 35 | 5 |
| ai recruitment tools | Commercial | 2,400 | 48 | 3 |

A genuine land-grab window: KD is low because incumbents are slow to reposition. You describe yourself as an AI-powered HRMS and the word "AI" appears **once** on your homepage, inside a floating decorative card. Claim the category or drop the claim.

### Cluster: Employee Tracking
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| employee tracking software | Commercial | 3,000 | 48 | 4 |
| remote employee monitoring software | Commercial | 1,600 | 45 | 4 |
| field employee tracking app | Commercial | 1,300 | 32 | 5 |
| employee location tracking app | Commercial | 900 | 30 | 5 |
| sales team tracking app | Commercial | 700 | 28 | 5 |

Handle deliberately: "monitoring" queries attract surveillance-intent buyers. Position around *field-force attendance and safety*, not employee surveillance — it is better for brand, better for review scores, and avoids app-store and privacy-law friction.

### Cluster: Shift Management
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| shift management software | Commercial | 1,300 | 38 | 5 |
| employee scheduling software | Commercial | 6,600 | 58 | 4 |
| roster management software | Commercial | 900 | 32 | 5 |
| shift roster format excel | Informational | 1,900 | 18 | 3 |
| rotational shift schedule | Informational | 1,000 | 22 | 3 |

### Cluster: Timesheets
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| timesheet software | Commercial | 4,400 | 55 | 4 |
| online timesheet | Commercial | 2,400 | 48 | 4 |
| timesheet template excel | Informational | 18,000 | 20 | 3 |
| project time tracking software | Commercial | 3,600 | 60 | 3 |

### Cluster: Employee Self Service
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| employee self service portal | Commercial | 2,900 | 42 | 5 |
| ess portal | Informational | 8,100 | 38 | 3 |
| employee app for payslip | Commercial | 500 | 22 | 5 |
| payslip download app | Commercial | 1,300 | 28 | 4 |

### Cluster: Compliance
| Keyword | Intent | Vol | KD | BV |
|---|---|---|---|---|
| statutory compliance in hr | Informational | 4,400 | 30 | 5 |
| pf esi compliance | Informational | 2,900 | 28 | 5 |
| professional tax slab | Informational | 22,000 | 32 | 3 |
| labour law compliance checklist | Informational | 1,300 | 25 | 5 |
| posh compliance | Informational | 3,600 | 30 | 4 |
| minimum wages act india | Informational | 9,900 | 35 | 2 |
| shops and establishment act registration | Informational | 6,600 | 34 | 2 |

Compliance is where an Indian HRMS earns EEAT. These queries are read by exactly your buyer, and the competition is beatable.

## 3.3 Build order — sorted by (Business Value × Intent) ÷ Difficulty

1. **Competitor alternative + comparison pages** — KD 18–26, BV 5. Fastest ROI on the entire site.
2. **Feature pages** — KD 38–58, BV 5. Necessary regardless; they double as internal-link hubs.
3. **Long-tail solution pages** (`hrms for startups`, `attendance software for construction`) — KD 18–34, BV 5.
4. **Free tools and calculators** — KD 24–40, BV 3, backlink value 5.
5. **Compliance informational** — KD 25–35, BV 4–5, builds the topical authority the money terms require.
6. **Head terms** (`payroll software`, `hrms software`) — KD 68–72. These are a *consequence* of steps 1–5, not a starting point. Do not attack them directly in year one.

---

# PART 4 — Competitor Analysis

## 4.1 Where each competitor beats you

| Competitor | SEO strength | Content play | Where Meagle 360 loses |
|---|---|---|---|
| **Keka** | Dominant Indian brand SERP, thousands of URLs, huge branded search volume | Deep India compliance library (PF, ESI, TDS, Form 16), HR glossary, templates | Everything. They own the term Indian buyers search. Their weakness — opaque pricing, a 25-employee billing floor, implementation fees — is your entire opening |
| **greytHR** | Oldest domain authority in Indian payroll; free tier for ≤25 employees | Enormous statutory-compliance moat, payroll calendars, webinars | You have zero compliance pages; they have hundreds. Their free tier also undercuts ₹149 in exactly the segment you target |
| **Zoho People** | Zoho's domain authority is effectively unassailable; ecosystem interlinking | Product docs, comparison pages, huge integration surface | You will not outrank Zoho on head terms. Compete on specificity and support, never on breadth |
| **BambooHR** | Massive US DR; brand-as-category | Best-in-class HR glossary and template library | Their EEAT is human-first: named practitioners, credentials. Yours is anonymous |
| **Rippling** | Enormous paid + organic budget | Programmatic at scale: per-state, per-country, per-integration | Thousands of programmatic pages vs your twelve URLs |
| **Deel** | Global payroll SERP dominance; country-hub programmatic | 150+ country guides — the textbook pSEO execution in HR tech | This is the exact model to copy in Part 9 |
| **Darwinbox** | Enterprise APAC authority; analyst mentions | CHRO-level thought leadership, research reports | Zero third-party validation on your side — no Gartner, no G2, no Capterra |
| **Workday** | Untouchable enterprise authority | Analyst- and event-led | Irrelevant to your segment. Do not write "Meagle vs Workday" — it wastes a page and signals delusion |
| **Gusto** | US SMB payroll authority; excellent CRO | Best pricing-page design in the category | Their pricing page alone converts better than your whole site |
| **HiBob** | Strong mid-market EU/US brand and design | Culture and engagement angle | Their design signals "funded and real." Yours signals "template" |

## 4.2 The three questions you fail

Open any competitor homepage next to yours:

1. **Can I see the product?** All of them show real UI. You show a caption reading "Drop your dashboard screenshot here."
2. **Can I verify the company exists?** All of them have an About page, leadership, registered address, security page, and a G2/Capterra profile. You have a WhatsApp number.
3. **Can I self-serve to a price?** Gusto, BambooHR, Deel, greytHR all can. So can you (₹149) — **and this is your single genuine advantage, currently buried behind a homepage anchor with no URL of its own.**

## 4.3 Specific gaps

- **Domain authority:** effectively zero vs DR 55–90.
- **Indexed pages:** 12 vs 500–5,000+.
- **Backlinks:** near zero. No linkable asset exists on the site.
- **Third-party validation:** not listed on G2, Capterra, GetApp, TrustRadius, SoftwareSuggest, Techjockey or SaaSworthy. In India, **Techjockey and SoftwareSuggest rank on page one for most HRMS commercial queries** — claiming those profiles is an afternoon's work with immediate visibility return.
- **Product proof:** no screenshots, no video, no interactive tour, no sandbox.
- **Author/entity trust:** no named humans anywhere.

## 4.4 Where you can actually win

"We're cheaper and friendlier" is not a strategy. These four are:

1. **Price transparency as a wedge.** Keka, Darwinbox and Rippling hide pricing. You publish it. Build `/pricing` into a weapon: a total-cost calculator plus an explicit "no implementation fee, no minimum seats, GST shown" comparison. This targets `keka pricing`, `hrms software price`, `hrms cost per employee` — all high intent, all currently answered by third parties.
2. **Speed to value.** 3–5 day onboarding versus the 6–10 week migration windows competitors document for enterprise HRMS. Make it a page and a guarantee.
3. **No minimum seats.** Keka's 25-employee floor prices out sub-25 teams entirely. That segment searches `hrms for 10 employees`, `hr software for small team`, `payroll software for 20 employees` — and nobody is courting them properly.
4. **Long-tail industry pages.** `attendance software for construction sites`, `hrms for restaurants india`, `payroll for staffing agencies` — KD under 25 across the board, and genuinely under-served.

---

# PART 5 — Landing Page Improvements

## 5.1 Homepage hero — rewritten

**Current:**
> Manage People. Simplify Processes. Grow Together.
> Meagle 360 is a powerful HRMS platform that automates your HR processes, empowers your people, and drives organizational success.

Three abstract verbs, no category, no differentiator, no keyword. Any competitor could paste this on their own site without changing a word — which is the definition of a failed headline.

**Rewrite A — clarity-led (recommended default):**

```html
<p class="eyebrow">HRMS Software for Growing Businesses</p>
<h1>Run attendance, leave and payroll on one platform. Live in 5 days.</h1>
<p class="subhead">
  Meagle 360 replaces spreadsheets, WhatsApp approvals and manual payroll with
  one HRMS your whole team actually uses. Flat ₹149 per user per month —
  no setup fee, no minimum seats, no surprises at renewal.
</p>
<div class="cta-row">
  <a class="btn-primary" href="/demo">Book a 15-min demo</a>
  <a class="btn-secondary" href="/pricing">See pricing →</a>
</div>
<p class="microcopy">14-day free trial · No credit card · Onboarding included</p>
```

**Rewrite B — differentiator-led (A/B test against A):**
> **H1:** The HRMS that doesn't make you pay for 25 employees you don't have.
> **Sub:** Flat ₹149/user/month. No seat minimum. No implementation fee. Attendance, leave, payroll, shifts and self-service — live in 5 business days.

**Rewrite C — AI-led (only if the product genuinely does this):**
> **H1:** AI-powered HRMS for attendance, leave and payroll
> **Sub:** Meagle 360 flags attendance anomalies before payroll closes, drafts your payroll run, and answers routine employee HR questions so your team doesn't have to.

**Recommended homepage meta:**
```html
<title>HRMS Software for Growing Businesses | Meagle 360</title>
<meta name="description" content="All-in-one HRMS for attendance, leave, payroll and employee self-service. Flat ₹149/user/month, no setup fee, live in 5 days. Book a free demo.">
```

## 5.2 Social proof — replace, do not repair

**Delete today:** the "TRUSTED BY 500+ BUSINESSES WORLDWIDE" strip (it contains **Invoice2go**, a real unaffiliated company) and all six template testimonials with their stock avatars.

**Replace with the honest version, which converts better than fake proof anyway:**

```html
<section class="proof">
  <h2>Early customers, real results</h2>
  <div class="metric-row">
    <div><strong>5 days</strong><span>Average time to first payroll run</span></div>
    <div><strong>₹149</strong><span>Flat per user, per month — every module</span></div>
    <div><strong>₹0</strong><span>Implementation and setup fees</span></div>
  </div>
  <blockquote>
    <p>"REAL QUOTE FROM A REAL PILOT CUSTOMER."</p>
    <cite>Full Name · Role · Company — used with permission</cite>
  </blockquote>
  <p class="trust-line">
    Built and supported in India by <a href="https://nexa-solutions.in">Nexa Solutions</a>.
    <a href="/security">See how we protect your data →</a>
  </p>
</section>
```

One named quote with a real face beats six fabricated ones by an order of magnitude — and it does not expose you to a consumer-protection complaint or a trademark notice.

## 5.3 Feature grid — rewrite each card

Each card should carry the head keyword in the H3, state an outcome rather than a capability, and link to a real feature page.

| Current | Rewritten H3 → URL | Rewritten body |
|---|---|---|
| Attendance | **Attendance Management** → `/features/attendance-management-software` | Geo-tagged check-ins from the mobile app. Late marks, half-days and missing punches flagged automatically before payroll closes. |
| Leave | **Leave Management** → `/features/leave-management-software` | Your own leave types, accrual rules and approval chains. Balances update the moment a request is approved. |
| Payroll | **Payroll Automation** → `/features/payroll-software` | Run payroll in minutes with PF, ESI, PT and TDS calculated automatically. Payslips land in every employee's app. |
| Shifts | **Shift & Roster Management** → `/features/shift-management-software` | Build rotating rosters, approve swaps, and see coverage gaps before they become no-shows. |
| Expenses | **Expense & Reimbursement** → `/features/expense-management-software` | Employees upload a receipt, managers approve on mobile, finance reimburses in the same payroll cycle. |
| Employee Directory | **Employee Database & Org Chart** → `/features/employee-database-software` | One record per employee — documents, salary history, reporting line — searchable in two clicks. |
| Reports & Analytics | **HR Reports & Analytics** → `/features/hr-analytics-software` | Attrition, attendance trends and payroll cost per department, exportable to Excel. |
| *(missing)* | **Employee Self-Service App** → `/features/employee-self-service-portal` | Payslips, tax documents, leave balances and attendance — in the employee's pocket, not HR's inbox. |

## 5.4 Feature page template (use for all eight)

```
H1        Attendance Management Software for Growing Teams
Hero      One-sentence outcome + primary CTA + REAL product screenshot
H2        The real cost of manual attendance
          → 3 pain bullets quantified in ₹ or hours
H2        How Meagle 360 handles attendance
          H3  Geo-tagged mobile check-in
          H3  Biometric and device integration
          H3  Regularisation and approval workflows
          H3  Attendance-to-payroll sync
          (each with a screenshot or 5-second loop)
H2        Built for field teams, factories and offices
H2        Attendance software pricing        → flat ₹149, link to /pricing
H2        How Meagle 360 compares            → module-level table vs Keka / greytHR
H2        Frequently asked questions         [+ FAQPage schema]
CTA       Book a 15-min demo
Length    1,400–1,800 words
Links     → /pricing, /demo, /features/payroll-software, 2 blog posts, 1 industry page
```

## 5.5 `/pricing` — build it

```
H1   Simple HRMS pricing. One plan. ₹149 per user, per month.
Sub  Every module included. No setup fee. No minimum seats. Cancel anytime.

[Slider: employees → monthly cost → annual cost, with a GST toggle]

H2   What's included            → keep your current module checklist, it's good
H2   What you don't pay for
     | Implementation fee        | ₹0      |
     | Minimum seat commitment   | None    |
     | Per-module add-ons        | ₹0      |
     | API access                | Included|
     | Onboarding and migration  | Included|
     | Support                   | Included|
H2   How this compares          → publicly listed competitor prices only, cited and dated
H2   Pricing FAQs               [+ FAQPage schema]
     Is GST included? What if headcount changes mid-month?
     Do inactive employees get billed? What's in the 14-day trial?
CTA  Start free trial | Talk to sales
```

**Meta:**
```html
<title>HRMS Software Pricing — ₹149/User/Month, All Modules | Meagle 360</title>
<meta name="description" content="Transparent HRMS pricing: flat ₹149 per user per month with attendance, leave, payroll, shifts and self-service included. No setup fee, no minimum seats.">
```

**Fix the contradiction first.** "₹149/user/mo" and "Unlimited employees" cannot both be true. Pick one and say only that. A CFO spots this in four seconds and it costs you the deal.

## 5.6 `/demo` — build it

- **H1:** See Meagle 360 in 15 minutes
- **Left:** what happens on the call (3 bullets), who you'll speak to (named person, photo), typical response time
- **Right:** the form — Name, Work Email, Company, Employees, Phone. **Five fields, hard maximum.**
- **Below fold:** three FAQs ("Do I need to prepare anything?", "Is this a sales call?", "Can I just start a trial?") plus a secondary "skip the call, start the trial" path
- **On submit:** a real `/thank-you` page with a calendar link — not an inline alert. This is also your GA4 and Google Ads conversion destination, which you currently cannot track at all.

## 5.7 `/about` — highest EEAT return per hour of work

```
H1   We build HR software for companies that outgrew spreadsheets
H2   Why we built Meagle 360   → the founder's actual story, first person
H2   Who's behind it           → founder photo, name, LinkedIn, background; every
                                 team member you have, named
H2   Nexa Solutions            → parent company, registered entity name
H2   Where we are              → Noida office, full postal address, map
H2   How to reach us           → email, phone, business hours
```

Founder-led is the correct play. You have no brand, no reviews and no funding announcement — a named, credible human is the only trust asset available to you, and it costs nothing.

## 5.8 Blog fixes

Every post needs: a named author with bio, photo and LinkedIn; `dateModified`; a table of contents above 1,200 words; 3–5 contextual internal links; one real product screenshot; an FAQ block with schema; a related-posts module.

**Then fix the mis-targeted post.** `best-all-in-one-hrms-software-for-growing-businesses-in-2026` pitches only Meagle 360 into a comparison SERP where every ranking result is a multi-vendor list. It cannot rank. Split it:

- New: `/blog/best-hrms-software-in-india-2026` — a genuine 10-vendor table (Keka, greytHR, Zoho People, Darwinbox, factoHR, HROne, Asanify, Pocket HRMS, BambooHR, Meagle 360) with honest pros, cons, price and best-for. Place yourself *in* the list, not at the top of it. Balanced comparisons rank; brochures do not.
- Move the product pitch to `/features/` where it belongs, and 301 the old URL to the new comparison post.

---

# PART 6 — EEAT Audit

**Current EEAT score: 12 / 100.** Weakest dimension on the site — and the cheapest to fix.

## Experience — 1/10
Nothing demonstrates that anyone at Meagle 360 has run a payroll cycle, handled a PF filing, or managed a shift roster. No case studies, no implementation stories, no product screenshots. The testimonials that would have shown experience are fabricated, which is worse than having none.

**Fix:** publish one real implementation story — even an internal Nexa Solutions deployment — as "How we ran payroll for a 40-person team on Meagle 360," with real screenshots and real numbers. Add field-level content: a factory shift-roster example, attendance edge cases for field staff.

## Expertise — 2/10
No named author anywhere. `meta-author` is a company. No HR or payroll credentials cited. Content asserts statutory compliance without ever citing a statute.

**Fix:**
- `/authors/[slug]` pages with `Person` schema, photo, bio, LinkedIn, article list.
- Recruit one guest contributor who is a practising HR professional or a CA for the compliance posts, credited by name.
- In compliance content, link out to primary sources (EPFO, ESIC, Income Tax Department, Ministry of Labour). Outbound citation to authorities is an expertise signal, not a leak.

## Authoritativeness — 2/10
No backlinks, no directory listings, no mentions, no press, no G2/Capterra profile, no LinkedIn page linked from the site. Your schema has no `sameAs` because there is nothing to point at.

**Fix, fastest first:**
1. **This week:** claim listings on Techjockey, SoftwareSuggest, Capterra, GetApp, G2, SaaSworthy, Crozdesk, TrustRadius. Free, one afternoon, and several already rank page one for your target queries.
2. **This week:** LinkedIn company page + founder posting weekly. Founder-led distribution is your only zero-cost channel.
3. **Month 1:** Product Hunt, BetaList, SaaSHub, Indian SaaS communities.
4. **Month 2+:** the linkable assets in Part 11.

## Trustworthiness — 1/10 — this is the emergency

**Missing entirely:**
- Privacy Policy — **while collecting CVs, phone numbers and salary expectations on `/careers/[slug]`.** Under India's DPDP Act and GDPR (you have German-market ambitions), that is a legal exposure, not merely an SEO gap.
- Terms of Service
- Security page (encryption, access control, backups, data residency, sub-processors)
- DPA / GDPR statement
- Refund and cancellation policy
- Registered company name and address
- Any SLA or uptime commitment
- Any certification: ISO 27001, SOC 2, or at minimum an honest roadmap toward one

**Present and actively damaging:**
- Fabricated testimonials with stock avatars
- A third party's trademark (Invoice2go) in a "trusted by" strip
- "500+ organizations" / "500+ businesses worldwide" with no substantiation
- The FAQ claims "regular independent security audits." If that is not literally true, it is the most dangerous sentence on your website — delete it today.
- Contact is a personal-format mobile plus WhatsApp only

**Fix list, ranked:**

| # | Asset | Effort |
|---|---|---|
| 1 | Remove all fabricated proof and unsubstantiated claims | 1 hour |
| 2 | `/privacy` + `/terms` | 1 day |
| 3 | `/about` with founder, entity, registered address | 1 day |
| 4 | `/security` — honest description of what you actually do | 1 day |
| 5 | Organization schema with real address + `sameAs` | 2 hours |
| 6 | Eight directory listings | 1 day |
| 7 | Author pages and bylines | 1 day |
| 8 | First real case study | 1 week |
| 9 | Trust signals: hosting provider, payment processor, data-residency statement | 2 hours |
| 10 | Honest certification roadmap ("SOC 2 Type I in progress, target Q2 2027") | 1 hour |

Say only what is true. An honest "we're early, here's exactly how we protect your data, here's the founder's direct number" page outperforms enterprise cosplay with every buyer who actually signs a contract.

---

# PART 7 — Conversion Rate Optimization

**Current CRO score: 42 / 100.** The layout fundamentals are fine. The content inside them is what kills conversion.

## 7.1 Hero section

| Issue | Fix | Est. impact |
|---|---|---|
| H1 has no product category — a visitor cannot tell this is HR software | Rewrite per 5.1 | **+15–25% scroll-past-hero** |
| Placeholder text where the product screenshot belongs | Ship a real annotated dashboard screenshot or a 20-second loop | **+20–35% demo-request rate** |
| Two CTAs of near-equal weight ("Request Demo" / "Explore Features") | One primary (Book demo), one text-link secondary (See pricing) | +5–10% |
| No risk-reversal microcopy under the CTA | "14-day free trial · No credit card · Onboarding included" | **+8–12% CTA click** |
| Price not visible above the fold | Put ₹149 flat in the subhead — transparent pricing is your wedge | +10–15% qualified leads |

## 7.2 CTA buttons

- Every CTA on the site says "Request Demo." That is the highest-friction possible ask, offered to visitors at every stage of awareness.
- **Add a low-friction path:** "Start free trial" as a co-primary. Some proportion of your traffic will self-serve and never wants a call.
- **Specify the commitment:** "Book a 15-min demo" outperforms "Request Demo" consistently, because it prices the ask in time.
- **Add a third path for the not-ready:** "Watch a 2-min product tour" — captures the 60%+ who will not book but will convert later.
- Sticky mobile CTA bar with a single primary action. Currently mobile users must scroll to the demo form.

**Est. combined impact: +25–40% on total conversion events.**

## 7.3 Pricing

| Issue | Fix | Impact |
|---|---|---|
| No `/pricing` URL | Build it | **+high** — captures `hrms pricing` search intent that currently has no landing target |
| "₹149/user/mo" contradicts "Unlimited employees" | Resolve the offer, state one thing | +10–20% (removes a credibility hit at the decision moment) |
| No cost calculator | Slider: headcount → monthly + annual, GST toggle | **+15–25% pricing→demo** |
| No annual discount shown | "Pay annually, get 2 months free" — improves cash and LTV | +5–10% |
| GST not addressed | State explicitly whether ₹149 includes 18% GST. Indian buyers will assume the worst | +5% |
| No competitor cost comparison | Table using published prices only, cited and dated | +10–15% |
| Single CTA "Get Started" going to `#demo` | Split: "Start free trial" and "Talk to sales" | +8% |

## 7.4 Contact and demo forms

- Form fields are unlabelled in the markup I can see ("Number of users" appears as bare text). **Every input needs a `<label>`** — for accessibility, for autofill, and because unlabelled forms measurably reduce completion.
- No inline validation, no error states, no submit-in-progress state.
- No `/thank-you` page — so you cannot fire a GA4 conversion, a Google Ads conversion, or a Meta CAPI event. **You are currently unable to measure or optimise anything.** Fix this before spending a rupee on ads.
- No privacy note next to the submit button ("We'll only use this to contact you about your demo. See our Privacy Policy.") — this lifts form completion by a few points and is legally necessary.
- CV upload form on job pages collects salary expectation with no consent checkbox.

**Est. impact of form fixes: +12–20% form completion.**

## 7.5 Navigation

- Add: **Features** (dropdown listing all 8), **Solutions** (by size and by industry), **Customers**, **Resources** (blog, templates, calculators).
- Move **Careers** to the footer.
- Make **Pricing** point to `/pricing`, not `#pricing`.
- Keep the demo CTA visually distinct in the nav — it already is, which is correct.

## 7.6 Feature pages

They do not exist, so this is greenfield. Build each with: real screenshot above the fold, a quantified problem statement, module-level comparison to a named competitor, an FAQ block, and a demo CTA at both 40% and 100% scroll depth.

## 7.7 Priority CRO experiments (run in this order)

| # | Test | Hypothesis | Est. lift |
|---|---|---|---|
| 1 | Replace placeholder image with real dashboard screenshot | Product visibility drives demo intent | +20–35% |
| 2 | Rewrite H1 to name the category and the outcome | Clarity beats aspiration | +15–25% |
| 3 | Remove fake testimonials; add one real quote or an honest early-access frame | Credibility beats volume of proof | +10–20% |
| 4 | Add "Start free trial" alongside "Book a demo" | Captures self-serve segment | +15–30% total conversions |
| 5 | Build `/pricing` with a cost calculator | Pricing transparency is the wedge | +15–25% |
| 6 | Add `/thank-you` + full GA4/Ads conversion tracking | Enables every future optimisation | Infrastructure — mandatory |
| 7 | Sticky mobile CTA | Mobile-dominant traffic in India | +8–15% mobile |
| 8 | Add product tour video | Low-friction third path | +10% |

**Realistic aggregate: today's conversion rate roughly doubles** if 1–5 all land. On a site with near-zero traffic, that is theoretical — which is exactly why Parts 8–11 matter more right now.

---

# PART 8 — Content Strategy (path to 100,000+ organic visits)

## 8.1 The arithmetic

100,000 monthly organic sessions in this category requires roughly **600–900 indexed, ranking URLs** averaging 120–170 sessions each. You have 12 URLs. This is a 24-month program, not a 3-month one. Realistic trajectory:

| Month | URLs live | Est. monthly organic sessions |
|---|---|---|
| 3 | 45 | 800 |
| 6 | 120 | 5,000 |
| 12 | 320 | 25,000 |
| 18 | 600 | 60,000 |
| 24 | 900 | 100,000+ |

That assumes the Part 2 technical fixes ship first. Without them, the curve is flat regardless of content volume.

## 8.2 Pillar → cluster architecture

**Pillar 1 — HRMS Software** (`/features/hrms-software` or the homepage)
Clusters: what is HRMS · HRMS vs HRIS vs HCM · HRMS implementation guide · HRMS pricing in India · HRMS for SMEs · HRMS checklist · HRMS ROI · HRMS migration guide

**Pillar 2 — Payroll** (`/features/payroll-software`)
Clusters: payroll process in India · PF calculation · ESI calculation · TDS on salary · Form 16 · professional tax by state · gratuity calculation · payroll compliance calendar · salary structure and CTC breakup · payroll for startups · payroll errors that cost you

**Pillar 3 — Attendance** (`/features/attendance-management-software`)
Clusters: biometric vs mobile attendance · geofencing attendance · attendance policy template · attendance regularisation · overtime calculation · attendance for field staff · attendance for factories · attendance sheet templates

**Pillar 4 — Leave** (`/features/leave-management-software`)
Clusters: leave policy India · types of leave · earned leave calculation · comp-off policy · maternity leave rules · leave encashment · sandwich leave rule · leave tracker template

**Pillar 5 — Compliance** (`/resources/hr-compliance-india`)
Clusters: statutory compliance checklist · labour codes 2026 · POSH compliance · shops & establishment · minimum wages by state · EPF rules · ESIC rules · Form 16 / 24Q filing

**Pillar 6 — Shifts & Workforce** (`/features/shift-management-software`)
Clusters: rotating shift schedules · night shift allowance rules · roster templates · shift-swap policy · workforce scheduling for retail/hospitals/manufacturing

## 8.3 Page specifications — first 30 pages

Format for each: **Primary KW | Secondary KWs | Intent | URL | Internal links | CTA | Length**

### Money pages (build weeks 1–6)

1. **Attendance Management Software** | attendance system, employee attendance software, attendance tracking software | Commercial | `/features/attendance-management-software` | → pricing, payroll feature, attendance-for-construction, blog/ai-attendance | Book a demo | 1,600w
2. **Payroll Software** | payroll management system, payroll software India, automated payroll | Commercial | `/features/payroll-software` | → pricing, compliance pillar, PF/ESI posts | Book a demo | 1,800w
3. **Leave Management Software** | leave management system, online leave tracker | Commercial | `/features/leave-management-software` | → leave policy post, attendance feature | Book a demo | 1,400w
4. **Shift Management Software** | roster management software, employee scheduling | Commercial | `/features/shift-management-software` | → attendance, retail/hospital industry pages | Book a demo | 1,400w
5. **Employee Self-Service Portal** | ESS portal, employee app payslip | Commercial | `/features/employee-self-service-portal` | → payroll, mobile app | Book a demo | 1,200w
6. **Employee Database Software** | employee records software, HR database, org chart | Commercial | `/features/employee-database-software` | → onboarding post, exit management | Book a demo | 1,200w
7. **Expense Management Software** | reimbursement software, expense claim system | Commercial | `/features/expense-management-software` | → payroll, pricing | Book a demo | 1,200w
8. **HR Reports & Analytics** | HR analytics software, HR dashboard | Commercial | `/features/hr-analytics-software` | → all features | Book a demo | 1,200w
9. **Pricing** | HRMS pricing, HR software cost, HRMS price per employee | Transactional | `/pricing` | → demo, all features, comparison pages | Start free trial | 1,000w + calculator
10. **Book a Demo** | HRMS demo, HR software demo | Transactional | `/demo` | → pricing, features | Submit | 600w

### Comparison and alternative pages (weeks 4–10) — fastest ROI on the site

11. **Keka Alternative** | keka alternatives, keka competitors | Transactional | `/alternatives/keka-alternative` | → pricing, features | Book a demo | 1,800w
12. **greytHR Alternative** | greythr alternatives | Transactional | `/alternatives/greythr-alternative` | → pricing | Book a demo | 1,600w
13. **Zoho People Alternative** | zoho people alternatives | Transactional | `/alternatives/zoho-people-alternative` | → pricing | Book a demo | 1,600w
14. **Meagle 360 vs Keka** | keka vs, keka comparison | Commercial | `/compare/meagle-360-vs-keka` | → alternative page, pricing | Book a demo | 1,600w
15. **Meagle 360 vs greytHR** | greythr vs | Commercial | `/compare/meagle-360-vs-greythr` | → pricing | Book a demo | 1,400w
16. **Meagle 360 vs Zoho People** | — | Commercial | `/compare/meagle-360-vs-zoho-people` | → pricing | Book a demo | 1,400w
17. **Best HRMS Software in India 2026** | best HR software India, top HRMS | Commercial | `/blog/best-hrms-software-in-india-2026` | → all compare pages | Book a demo | 3,000w
18. **Best Payroll Software in India 2026** | top payroll software | Commercial | `/blog/best-payroll-software-india-2026` | → payroll feature | Book a demo | 2,800w
19. **Best Attendance Software 2026** | top attendance apps | Commercial | `/blog/best-attendance-management-software-2026` | → attendance feature | Book a demo | 2,500w
20. **Keka Pricing Explained** | keka pricing, keka cost | Commercial | `/blog/keka-pricing-india` | → your pricing, keka alternative | See our pricing | 2,000w

*Write #20 honestly and accurately, using only published figures with dates. Competitor-pricing content ranks because buyers cannot get the number anywhere else — but if you get it wrong you lose the credibility the page exists to build.*

### Solution / segment pages (weeks 8–16)

21. **HRMS for Startups** | HR software for startups | Commercial | `/solutions/hrms-for-startups` | 1,400w
22. **HRMS for Small Business** | HR software small business | Commercial | `/solutions/hrms-for-small-business` | 1,400w
23. **HRMS for SMEs** | HR software for SME | Commercial | `/solutions/hrms-for-sme` | 1,200w
24. **HRMS for 50 Employees** | HR software 50 employees | Commercial | `/solutions/hrms-for-50-employees` | 1,000w
25. **HRMS for 100 Employees** | — | Commercial | `/solutions/hrms-for-100-employees` | 1,000w
26. **HRMS for 500 Employees** | — | Commercial | `/solutions/hrms-for-500-employees` | 1,000w
27. **HRMS for Manufacturing** | HR software factory, manufacturing payroll | Commercial | `/industries/hrms-for-manufacturing` | 1,400w
28. **HRMS for IT Companies** | — | Commercial | `/industries/hrms-for-it-companies` | 1,200w
29. **Attendance Software for Construction** | construction site attendance | Commercial | `/industries/attendance-software-for-construction` | 1,200w
30. **HRMS for Retail** | retail workforce management | Commercial | `/industries/hrms-for-retail` | 1,200w

All solution and industry pages share one template: audience-specific pain → the 3 modules that matter most for them → a mini case or scenario → module-level pricing → FAQ → demo CTA. Internal links: → the 2–3 relevant feature pages, → `/pricing`, → 1 comparison page, → 2 blog posts.

## 8.4 Blog cadence

- **Months 1–3:** 8 posts/month, weighted to compliance and templates (cheap, high-authority, backlink-attracting)
- **Months 4–12:** 12 posts/month, adding comparison, industry and tool content
- Every post: named author, FAQ schema, 3+ internal links, one product screenshot, a clear next step

---

# PART 9 — Programmatic SEO (100+ scalable page ideas)

## 9.1 The mechanics before the list

Programmatic only works if each page has **genuinely differentiated content**, not a find-and-replace of one template. For every page below, vary at minimum: the audience pain paragraph, one industry- or country-specific compliance fact, one relevant statistic, the module emphasis, and the FAQ set. Pages that differ only in the `[variable]` get classified as doorway pages and will be removed from the index — this is the number one way HR-tech pSEO fails.

**Ship in batches of 20–30, verify indexation and rankings for 3 weeks, then ship the next batch.** Never publish 300 at once from a new domain.

## 9.2 Template A — HRMS for [Industry] (`/industries/hrms-for-[industry]`)

1. Manufacturing · 2. IT & Software · 3. Retail · 4. Hospitals & Healthcare · 5. Construction · 6. Restaurants & QSR · 7. Hotels & Hospitality · 8. Schools · 9. Colleges & Universities · 10. Logistics & Transport · 11. Warehousing · 12. E-commerce · 13. BPO & Call Centres · 14. Staffing & Recruitment Agencies · 15. NGOs & Non-Profits · 16. Banks & NBFCs · 17. Insurance · 18. Real Estate · 19. Pharma · 20. Textile & Apparel · 21. Automotive · 22. Food Processing · 23. Security Services · 24. Facility Management · 25. Agencies (marketing/design) · 26. Law Firms · 27. CA & Accounting Firms · 28. Clinics & Diagnostics · 29. Gyms & Fitness Chains · 30. Salons & Spas

## 9.3 Template B — Payroll Software in [Country/State]

**Countries** (`/payroll-software/[country]`): 31. India · 32. UAE · 33. Saudi Arabia · 34. Qatar · 35. Oman · 36. Bahrain · 37. Kuwait · 38. Singapore · 39. Malaysia · 40. Indonesia · 41. Philippines · 42. Vietnam · 43. Germany · 44. UK · 45. Netherlands · 46. Poland · 47. Nigeria · 48. Kenya · 49. South Africa · 50. Egypt

**Indian states** (`/payroll-software/india/[state]` — professional tax and minimum wage genuinely differ by state, so these pages have real substance): 51. Maharashtra · 52. Karnataka · 53. Tamil Nadu · 54. Delhi NCR · 55. Uttar Pradesh · 56. Telangana · 57. Gujarat · 58. West Bengal · 59. Haryana · 60. Kerala

## 9.4 Template C — Attendance Software for [Business Type]

61. Factories · 62. Construction Sites · 63. Field Sales Teams · 64. Remote Teams · 65. Hybrid Teams · 66. Retail Stores · 67. Multi-Location Businesses · 68. Hospitals · 69. Schools · 70. Warehouses · 71. Security Guards · 72. Delivery Fleets · 73. Contract Workers · 74. Shift Workers · 75. Small Offices

## 9.5 Template D — [Module] for [Company Size]

76. HRMS for 10 employees · 77. for 25 · 78. for 50 · 79. for 100 · 80. for 200 · 81. for 500 · 82. for 1000 · 83. Payroll software for 50 employees · 84. Payroll for 100 · 85. Leave management for 50 · 86. Attendance for 100 · 87. HRMS for teams under 25 · 88. HRMS for companies scaling past 100

## 9.6 Template E — Competitor alternatives (`/alternatives/[competitor]-alternative`)

89. Keka · 90. greytHR · 91. Zoho People · 92. Darwinbox · 93. factoHR · 94. HROne · 95. Pocket HRMS · 96. sumHR · 97. Asanify · 98. Kredily · 99. BambooHR · 100. Gusto · 101. Rippling · 102. Deel · 103. HiBob · 104. Freshteam · 105. Zimyo

## 9.7 Template F — Head-to-head comparisons (`/compare/[a]-vs-[b]`)

106. Meagle 360 vs Keka · 107. vs greytHR · 108. vs Zoho People · 109. vs Darwinbox · 110. vs factoHR · 111. vs HROne · 112. vs Kredily · 113. vs sumHR · 114. Keka vs greytHR · 115. Keka vs Zoho People · 116. greytHR vs Zoho People · 117. Darwinbox vs Keka · 118. BambooHR vs Zoho People

*The A-vs-B pages where you are not a participant (114–118) are the sleeper play: high-intent, moderate competition, and they establish you as a neutral authority before you pitch. Include a tasteful "also consider" module, not a hard sell.*

## 9.8 Template G — Free tools (`/tools/[tool]`)

119. CTC / in-hand salary calculator · 120. Gratuity calculator · 121. PF calculator · 122. ESI calculator · 123. Professional tax calculator (by state) · 124. HRA exemption calculator · 125. Overtime pay calculator · 126. Leave encashment calculator · 127. Notice-period recovery calculator · 128. Attrition-rate calculator · 129. Cost-per-hire calculator · 130. HRMS ROI calculator · 131. Payroll cost forecaster · 132. Shift-roster generator

## 9.9 Template H — Templates & policies (`/templates/[doc]`)

133. Offer letter format · 134. Appointment letter format · 135. Experience letter format · 136. Relieving letter format · 137. Salary slip format (Excel) · 138. Attendance sheet template · 139. Leave tracker template · 140. Timesheet template · 141. Employee handbook template · 142. Leave policy template · 143. Attendance policy template · 144. Work-from-home policy · 145. POSH policy template · 146. Employee onboarding checklist · 147. Exit interview form · 148. Performance review template · 149. Job description templates (by role) · 150. HR compliance calendar (India)

**That is 150 scalable pages across 8 templates.** At a 60% indexation-and-ranking rate averaging 120 sessions/month, that alone is ~10,800 monthly sessions — before the blog, before the feature pages, before brand search.

---

# PART 10 — Internal Linking Architecture

## 10.1 The intended PageRank flow

```
                        HOMEPAGE
                    (all external equity)
                            │
        ┌───────────────┬───┴────┬──────────────┬─────────────┐
        ▼               ▼        ▼              ▼             ▼
   FEATURE HUB     SOLUTIONS  PRICING      COMPARE HUB    RESOURCES
   /features/      /solutions/ /pricing    /compare/      (blog, tools,
        │               │        ▲              │          templates)
        │               │        │              │             │
   8 feature       size + industry             alternatives    │
    pages          pages                       pages           │
        │               │        ▲              │             │
        └───────────────┴────────┼──────────────┴─────────────┘
                                 │
                                 ▼
                              /demo
                         (conversion sink)
```

**Rules that make this work:**

1. **The homepage links down to hubs, not to leaves.** Homepage → 8 feature pages, 3 solution hubs, `/pricing`, `/compare`, `/blog`, `/tools`. That is ~15 links, each carrying meaningful equity.
2. **`/pricing` is the single most-linked internal page.** Every feature page, every industry page, every comparison page links to it. It is your highest-intent commercial URL and it should have the strongest internal PageRank after the homepage.
3. **`/demo` is a sink, not a hub.** It receives from everywhere and links out only to `/pricing`. Do not leak equity from your conversion page.
4. **Blog links up, never sideways only.** Every post links to at least one feature page and one solution page. Blog posts are equity *collectors* (they attract links) and equity *distributors* (they pass it to money pages). A post that links only to other posts is wasted.
5. **Feature pages cross-link laterally** — attendance ↔ payroll ↔ shifts, because those modules genuinely relate. This builds a semantic cluster Google can read as topical authority.
6. **Comparison and alternative pages link to `/pricing` and the relevant feature page, and to each other.** `/alternatives/keka-alternative` ↔ `/compare/meagle-360-vs-keka` is the natural pair.
7. **Free tools link up to their parent feature.** `/tools/gratuity-calculator` → `/features/payroll-software`. Tools attract the backlinks; the links must flow somewhere commercial.
8. **Programmatic pages link to their template parent, never to each other en masse.** `/industries/hrms-for-retail` → `/features/attendance-management-software`, `/pricing`, and 2 related industry pages. Do not build a 150-page footer link farm — that is the fastest route to a doorway-page classification.

## 10.2 Anchor text discipline

- Use descriptive, varied anchors: "attendance management software", "how Meagle 360 handles attendance", "see attendance pricing".
- Never "click here", never bare URLs.
- Do not use the identical exact-match anchor sitewide — vary naturally.
- Contextual in-body links pass more weight than nav/footer links. Prioritise them.

## 10.3 Immediate internal-linking fixes (do these regardless of the rest)

- Fix `/blog/meagle360.com` (broken relative link).
- Add contextual links from all 6 existing blog posts to each other and to `/pricing`.
- Expand the footer from 4 links to ~24, grouped: Product (8 features + pricing + demo), Solutions (6), Resources (blog, templates, tools, compliance guide), Company (about, careers, contact, security, privacy, terms).
- Add a "Related articles" module to blog posts.
- Add breadcrumbs sitewide with `BreadcrumbList` schema.

---

# PART 11 — Backlink Strategy

## 11.1 The problem

You have approximately zero backlinks and no asset on the site that anyone would link to. In this category, links come from three places: **free tools**, **downloadable templates**, and **original data**. Guest posting and directories are supporting acts, not the strategy.

## 11.2 Linkable assets, ranked by backlink potential

| Asset | Why it earns links | Est. referring domains (12 mo) | Effort |
|---|---|---|---|
| **CTC / in-hand salary calculator** | Highest-volume HR calculation query in India; cited by finance blogs, Quora answers, career sites | **80–150** | Medium |
| **Gratuity calculator** | Enormous evergreen volume; linked by legal and finance sites | **60–120** | Low |
| **HR compliance calendar for India (2027)** | Updated annually; HR communities and consultants share it every December | **50–100** | Medium |
| **Salary slip format (Excel + Google Sheets)** | Template downloads attract links from HR forums and how-to sites | **40–80** | Low |
| **Employee handbook template** | Long-lived, high-authority link magnet; startup accelerators link to these | **40–70** | Medium |
| **PF / ESI calculators** | Statutory calculators get cited by CA and payroll blogs | **30–60** | Low |
| **State-wise professional tax table** | Genuinely useful reference nobody maintains well | **30–60** | Medium |
| **Offer letter generator** (fills and downloads a PDF) | Interactive beats static; gets shared in founder communities | **30–50** | Medium |
| **Attendance / leave / timesheet Excel templates** | Volume play; each earns a handful, collectively material | **40–80** | Low |
| **Annual "State of HR in Indian SMEs" survey report** | Original data is the single most linkable asset type; journalists cite statistics | **50–120** | High |
| **HRMS ROI calculator** | Linked by consultants and comparison sites | **20–40** | Medium |
| **HR glossary (150+ terms)** | Slow burn, compounding; BambooHR built enormous authority this way | **30–80** | High |

**Realistic 12-month total: 350–700 referring domains** if six or more of these ship and get distributed properly. That is enough to compete for KD 40–55 terms.

## 11.3 Distribution — assets do not earn links passively

- **Free tools:** submit to tool directories, answer the relevant Quora/Reddit questions with the tool as the resource, get listed in "best free HR tools" roundups.
- **Templates:** distribute through HR communities (LinkedIn HR groups, PeopleMatters comments, HR subreddits), and pitch to sites already ranking for the template term with an offer to replace their inferior version.
- **Survey report:** pitch to PeopleMatters, YourStory, Inc42, Entrepreneur India, and HR newsletters. Original data is the only thing that gets an unsolicited press link for an unknown brand.
- **Founder-led:** weekly LinkedIn posts from a named founder, plus podcast guesting on Indian SaaS and HR shows. This generates both links and brand search, and brand search is the strongest ranking signal you can manufacture honestly.

## 11.4 Foundation links (week 1, all free)

Techjockey · SoftwareSuggest · Capterra · GetApp · G2 · SaaSworthy · Crozdesk · TrustRadius · Product Hunt · SaaSHub · BetaList · AlternativeTo · Slashdot Software · Crunchbase · LinkedIn company page · Indian startup directories (StartupIndia, YourStory profiles).

**Do not buy links.** In a category Google watches for spam, with a brand-new domain and no real trust signals, a paid-link footprint is the fastest way to a manual action you cannot recover from at your size.

---

# PART 12 — Prioritised Action Plan

## CRITICAL — this week

| Action | SEO impact | Traffic impact | Difficulty | Time |
|---|---|---|---|---|
| Fix canonical host across all pages (`www`) | **Very high** | High | Low | 2 h |
| Fix `/careers/*` canonicals pointing to homepage | High | Medium | Low | 1 h |
| Add canonicals to blog articles | High | Medium | Low | 1 h |
| Delete placeholder text ("Drop your dashboard screenshot here", "left.png") | Low SEO / **very high** trust | High conversion | Trivial | 15 min |
| Remove fabricated testimonials + Invoice2go logo | Medium | **Very high** (legal + trust) | Trivial | 30 min |
| Remove or substantiate "500+ businesses" and "independent security audits" | Medium | High | Trivial | 30 min |
| Server-render stat counters (currently `0`) | Medium | Medium | Low | 2 h |
| Fix title-stacking bug (`\| Meagle 360` ×3) | High | Medium | Low | 1 h |
| Fix broken `/blog/meagle360.com` link | Low | Low | Trivial | 10 min |
| Ship `robots.txt` + `sitemap.xml`; submit to GSC + Bing | **Very high** | High | Low | 3 h |
| Set up Google Search Console + GA4 + a real `/thank-you` page | **Foundational** | — | Low | 4 h |
| Publish `/privacy` and `/terms` | Medium SEO / **critical** legal | Medium | Low | 1 day |

## HIGH PRIORITY — weeks 2–6

| Action | SEO | Traffic | Difficulty | Time |
|---|---|---|---|---|
| Build `/pricing` as a real page with calculator | Very high | High | Medium | 3 days |
| Build `/demo` as a real page | High | High | Low | 2 days |
| Build `/about` with founder, entity, address | High (EEAT) | Medium | Low | 1 day |
| Build `/security` | High (EEAT) | Medium | Low | 1 day |
| Ship 8 feature pages | **Very high** | Very high | Medium | 3 weeks |
| Add Organization + SoftwareApplication + FAQPage schema | High | Medium | Low | 1 day |
| Add JobPosting schema to careers | Medium | Medium (free Google Jobs traffic) | Low | 3 h |
| Real product screenshots throughout | Medium | **Very high** conversion | Medium | 1 week |
| Claim 8 software directory listings | High (authority) | Medium | Low | 1 day |
| Rewrite homepage H1, hero, feature copy | Medium | High | Low | 2 days |
| Expand nav + footer; fix internal links | High | Medium | Low | 1 day |
| Author pages + bylines on all posts | High (EEAT) | Low | Low | 1 day |
| Convert images to AVIF/WebP, fix LCP | Medium | Medium | Medium | 2 days |

## MEDIUM PRIORITY — months 2–6

| Action | SEO | Traffic | Difficulty | Time |
|---|---|---|---|---|
| 6 comparison + alternative pages | Very high | **Very high** (highest intent) | Medium | 4 weeks |
| 3 "best HRMS/payroll/attendance software 2026" roundups | Very high | Very high | High | 3 weeks |
| First 4 free calculators (CTC, gratuity, PF, ESI) | High (links) | High | Medium | 4 weeks |
| 10 template downloads | Medium (links) | Medium | Low | 2 weeks |
| 10 solution/size pages | High | High | Medium | 3 weeks |
| 10 industry pages | High | High | Medium | 3 weeks |
| Blog cadence to 8–12 posts/month | High | High | Medium | Ongoing |
| First real case study | High (EEAT) | Medium | Medium | 2 weeks |
| LinkedIn founder-led content programme | Medium | Medium + brand search | Low | Ongoing |
| Breadcrumbs + BlogPosting schema | Medium | Low | Low | 1 day |

## LOW PRIORITY — months 6–12

| Action | SEO | Traffic | Difficulty | Time |
|---|---|---|---|---|
| Programmatic batches (20–30 at a time) | High at scale | Very high at scale | High | Ongoing |
| Country/state payroll pages + hreflang | High for target markets | Medium | High | 2 months |
| HR glossary (150 terms) | Medium, compounding | Medium | High | 2 months |
| Annual "State of HR in Indian SMEs" report | High (links + PR) | Medium | High | 6 weeks |
| Video / YouTube channel | Medium | Medium | High | Ongoing |
| Integration pages | Medium | Low–Medium | Medium | 1 month |
| Multi-language (Hindi) | Medium | Medium | High | 2 months |

---

# PART 13 — Final Report

## 13.1 Scores

| Dimension | Score | Comment |
|---|---|---|
| **Overall SEO** | **29 / 100** | Twelve URLs, four canonical bugs, zero commercial landing pages |
| Technical SEO | 38 / 100 | Clean URLs and good OG on the homepage; canonicals, schema, and rendering are broken |
| Content | 18 / 100 | Six thin posts, one targeting a SERP it structurally cannot win |
| Keyword coverage | 15 / 100 | Homepage targets everything, therefore nothing. No page owns any commercial term |
| UX | 55 / 100 | Layout and information design are actually competent — the best thing about the site |
| CRO | 42 / 100 | Structure fine; placeholders, fake proof and a single high-friction CTA sink it |
| Trust / EEAT | 12 / 100 | Fabricated testimonials, a third party's trademark, no privacy policy, no named humans |
| Brand positioning | 25 / 100 | "AI-powered HRMS" claimed nowhere on the site; hero says nothing a competitor couldn't say |

## 13.2 The honest summary

The site is well-designed and technically competently built by someone who understood metadata — the homepage OG implementation is better than most funded startups ship. Then it was published with placeholder text, fake testimonials, a canonical configuration that points at the wrong host, and no commercial pages at all.

That combination is actually good news: **the hard part (design, build, product) is done, and the broken part is almost all configuration and content.** Most of the Critical list in Part 12 is a single working day.

The thing I would push back on hardest: **the fabricated social proof is not a growth shortcut, it is a liability.** Using Invoice2go's name in a "trusted by" strip is trademark misuse. Claiming 500+ organisations and independent security audits you may not have is a consumer-protection exposure in India and a straightforward disqualifier in any enterprise procurement review. It also does not work — B2B buyers pattern-match "TechCorp / NovaTech / NextWave" as template names within seconds. Remove it today, before the canonical fixes, before anything else.

## 13.3 Top 25 actions for maximum organic growth over 12 months

**Foundation (weeks 1–2)**
1. Fix the canonical host to `www` across every page.
2. Fix `/careers/*` canonicals that currently point to the homepage.
3. Add canonicals to all blog articles.
4. Delete every placeholder string from production.
5. Remove all fabricated testimonials, the logo strip, and the unsubstantiated 500+ / security-audit claims.
6. Ship `robots.txt` and `sitemap.xml`; verify in Search Console and Bing Webmaster Tools.
7. Fix the title-template bug producing triple brand suffixes.
8. Set up GA4 + Google Ads conversion tracking with a real `/thank-you` page.
9. Publish `/privacy` and `/terms` (also a legal requirement given the CV-upload form).

**Commercial surface (weeks 2–8)**
10. Build `/pricing` with a cost calculator and a "what you don't pay for" table.
11. Build `/demo` with a five-field form and a named human on the page.
12. Build `/about` with the founder, the registered entity and a real address.
13. Build `/security`, honestly.
14. Ship all 8 feature pages at 1,200–1,800 words each with real screenshots.
15. Rewrite the homepage H1, subhead and feature copy to name the category and the price.
16. Add Organization, SoftwareApplication, FAQPage, BlogPosting and JobPosting schema.
17. Replace every placeholder image with real annotated product screenshots.

**Authority and intent capture (months 2–6)**
18. Publish `/alternatives/keka-alternative` and `/alternatives/greythr-alternative` — lowest difficulty, highest intent on the entire keyword map.
19. Publish 4 head-to-head `/compare/` pages.
20. Publish 3 genuine multi-vendor "best software 2026" roundups, with yourself listed honestly among competitors.
21. Claim all 8 software directory profiles and start collecting real reviews.
22. Ship 4 free calculators (CTC, gratuity, PF, ESI) — your primary link acquisition engine.
23. Add author pages, bylines and credentials to every article; publish one real case study.

**Scale (months 6–12)**
24. Ship 10 solution/size pages and 10 industry pages, then begin programmatic batches of 20–30 with genuinely differentiated content per page.
25. Run a founder-led LinkedIn and podcast programme to generate brand search and editorial links — the one channel where being small and new is an advantage rather than a handicap.

---

## What I could not verify

In the interest of not overstating certainty:

- **`robots.txt` and `sitemap.xml`** — I could not reach these directly. Confirm both exist and match the specs in 2.4–2.5.
- **Structured data** — no JSON-LD appeared in the markup I retrieved, but rendered-HTML extraction can miss late-injected scripts. Verify with Google's Rich Results Test before assuming it is absent.
- **Core Web Vitals** — no lab data available from here. Run PageSpeed Insights on `/` and one blog post; the specific suspects are listed in 2.7.
- **Index status** — a `site:` check returned nothing, which is consistent with a very new or unindexed domain, but the search engine I used may not honour the operator. Check the Pages report in Google Search Console for the authoritative answer. Given the canonical bugs, I would expect several pages to be reported as "Alternate page with proper canonical tag."
- **Keyword volumes** — directional estimates, not tool data. Validate the top 40 before committing budget.
