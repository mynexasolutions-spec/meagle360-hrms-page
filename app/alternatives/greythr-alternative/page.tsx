import type { Metadata } from "next";
import { SiteChrome } from "../../components/SiteChrome";
import { FaqAccordion } from "../../components/FaqAccordion";

const TITLE = "Best greytHR Alternative in India (2026)";
const DESCRIPTION =
  "Comparing greytHR alternatives? See how Meagle 360 compares on price, modules and onboarding. Flat ₹149/user/month, no minimum seats, live in 5 days.";
const SITE_URL = "https://www.meagle360.com";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/alternatives/greythr-alternative",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/alternatives/greythr-alternative",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FAQS = [
  {
    q: "Is Meagle 360 really cheaper than greytHR?",
    a: "It depends on your headcount. greytHR's free tier covers up to 25 employees with restricted features, which is genuinely the cheapest option for very small teams. Once you need the paid plan, greytHR's base fee starts around ₹2,495/month for 50 users (≈₹50/user/month at full headcount). Meagle 360 is a flat ₹149/user/month with no base fee — more expensive per user at greytHR's bundled headcount, but with no 50-employee minimum and every module included from day one rather than gated by tier.",
  },
  {
    q: "Does Meagle 360 have all the same features as greytHR?",
    a: "greytHR has a strong, long-established payroll compliance engine with deep EPFO/ESIC integration built over many years — that's its core strength. Meagle 360 covers the same statutory compliance basics (PF, ESI, professional tax, TDS) plus attendance, leave, shift management, expense management and self-service in one flat-priced plan, with a more modern interface and stronger shift/roster management than greytHR currently offers.",
  },
  {
    q: "How long does switching from greytHR take?",
    a: "Most teams are fully onboarded onto Meagle 360, including migrating existing employee and payroll data, within 3 to 5 business days.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes, you can start a 14-day free trial with full access to every module, no credit card required.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "greytHR Alternative", item: `${SITE_URL}/alternatives/greythr-alternative` },
  ],
};

const COMPARISON_ROWS = [
  { capability: "Starting price", meagle: "₹149/user/month, flat", greythr: "Free ≤25 employees; ₹2,495/month base (paid)" },
  { capability: "Minimum seats (paid plan)", meagle: "None", greythr: "50-employee billing floor" },
  { capability: "Setup / implementation fee", meagle: "₹0", greythr: "₹0 (none published)" },
  { capability: "Shift & roster management", meagle: "Included", greythr: "Limited" },
  { capability: "EPFO / ESIC compliance", meagle: "Included", greythr: "Included — long-established strength" },
  { capability: "Mobile attendance", meagle: "Included", greythr: "Included" },
];

export default function GreytHRAlternativePage() {
  return (
    <SiteChrome>
      <section
        className="blog-post-banner"
        style={{ display: "flex", alignItems: "center", minHeight: "260px" }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
          <h1 className="blog-post-title" style={{ margin: "0 0 16px" }}>
            Looking for a greytHR Alternative? Here Is What to Consider.
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", margin: "0 0 28px" }}>
            An honest, side-by-side look at price, modules and onboarding — so you can
            decide with real numbers instead of a sales call.
          </p>
          <a href="/demo" className="btn btn-white">
            Book a 15-min demo
          </a>
        </div>
      </section>

      <section className="section" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>Why teams look for greytHR alternatives</h2>
          <p style={{ textAlign: "center", color: "var(--text-2)", marginBottom: 32, fontSize: 18 }}>
            greytHR is one of the oldest names in Indian payroll compliance, and its strengths are
            real — but a few things routinely come up when teams look elsewhere:
          </p>
          <ul className="check-list" style={{ maxWidth: 640, margin: "0 auto" }}>
            <li>
              <div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg></div>
              The free plan is capped at 25 employees with restricted features — teams that outgrow
              it move to a paid plan with a 50-employee billing minimum.
            </li>
            <li>
              <div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg></div>
              The interface is considered dated by some users compared to newer HRMS platforms.
            </li>
            <li>
              <div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg></div>
              Shift and roster management is more limited than dedicated modules on newer platforms.
            </li>
          </ul>
          <p style={{ textAlign: "center", color: "var(--text-2)", marginTop: 24, fontSize: 16 }}>
            To be fair to greytHR: it has long-established, deep EPFO/ESIC integration and a
            genuinely generous free tier for very small teams — real strengths that shouldn&apos;t
            be dismissed.
          </p>
        </div>
      </section>

      <section className="section section-alt" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>Meagle 360 vs greytHR — side by side</h2>
          <p style={{ textAlign: "center", color: "var(--text-2)", marginBottom: 32, fontSize: 18 }}>
            greytHR prices on a base-fee-plus-headcount model for its paid plan — figures below
            reflect greytHR&apos;s published pricing as of August 2026.
          </p>
          <div className="pricing-compare-scroll">
            <table className="pricing-compare-table">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th>Meagle 360</th>
                  <th>greytHR</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.capability} className={row.capability === "Starting price" ? "pricing-compare-highlight" : ""}>
                    <td data-label="Capability">{row.capability}</td>
                    <td data-label="Meagle 360">{row.meagle}</td>
                    <td data-label="greytHR">{row.greythr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 14, color: "var(--text-3)", marginTop: 16, textAlign: "center" }}>
            greytHR figures are drawn from greytHR&apos;s own published pricing pages as of
            August 2026 — verify current details on{" "}
            <a href="https://www.greythr.com" target="_blank" rel="noopener noreferrer">greythr.com</a>{" "}
            before making a decision, since SaaS pricing changes.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>Who Meagle 360 is the right choice for</h2>
          <ul className="check-list" style={{ maxWidth: 560, margin: "0 auto" }}>
            <li>
              <div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg></div>
              Teams past greytHR&apos;s free-tier headcount that don&apos;t want a 50-employee billing floor
            </li>
            <li>
              <div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg></div>
              Companies that need real shift and roster management, not just attendance and payroll
            </li>
            <li>
              <div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg></div>
              Teams that want every module included at one flat price, not gated by plan tier
            </li>
          </ul>
        </div>
      </section>

      <section className="section section-alt" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 32 }}>Frequently asked questions</h2>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <section className="section" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
          <h2 style={{ marginBottom: 24 }}>Related reading</h2>
          <ul className="feature-related-links">
            <li><a href="/alternatives/keka-alternative">Keka Alternative →</a></li>
            <li><a href="/pricing">See full pricing →</a></li>
            <li><a href="/features/payroll-software">Payroll Software →</a></li>
            <li><a href="/features/leave-management-software">Leave Management Software →</a></li>
          </ul>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center", padding: "48px 0" }}>
        <div className="container">
          <h2 style={{ marginBottom: 24 }}>See it running on your own data</h2>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/demo" className="btn btn-primary">
              Book a 15-min demo
            </a>
            <a href="/pricing" className="btn btn-outline">
              See pricing
            </a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </SiteChrome>
  );
}
