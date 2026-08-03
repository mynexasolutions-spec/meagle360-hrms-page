import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";
import { PricingCalculator } from "../components/PricingCalculator";
import { FaqAccordion } from "../components/FaqAccordion";
import { PRICING_FEATURES, NOT_PAY_FOR, PRICING_FAQS } from "../../lib/pricing-data";

const TITLE = "HRMS Software Pricing — ₹149/User/Month, All Modules";
const DESCRIPTION =
  "Transparent HRMS pricing: flat ₹149 per user per month with attendance, leave, payroll, shifts and self-service included. No setup fee, no minimum seats.";
const SITE_URL = "https://www.meagle360.com";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/pricing",
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQS.map((item) => ({
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
    { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE_URL}/pricing` },
  ],
};

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function PricingPage() {
  return (
    <SiteChrome>
      <section
        className="blog-post-banner"
        style={{ display: "flex", alignItems: "center", minHeight: "260px" }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
          <h1 className="blog-post-title" style={{ margin: "0 0 16px" }}>
            Simple HRMS pricing. One plan. ₹149 per user, per month.
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", margin: 0 }}>
            Every module included. No setup fee. No minimum seats. Cancel anytime.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "48px 0" }}>
        <div className="container">
          <PricingCalculator />
        </div>
      </section>

      <section className="section section-alt" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 48 }}>
            <div>
              <h2 style={{ marginBottom: 32 }}>What&apos;s included</h2>
              <ul className="check-list">
                {PRICING_FEATURES.map((f) => (
                  <li key={f}>
                    <div className="ico">{CHECK}</div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 style={{ marginBottom: 32 }}>What you don&apos;t pay for</h2>
              <table className="pricing-not-pay-table">
                <tbody>
                  {NOT_PAY_FOR.map((row) => (
                    <tr key={row.item}>
                      <td>{row.item}</td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>How this compares</h2>
          <p style={{ textAlign: "center", fontSize: 18, color: "var(--text-2)", marginBottom: 32, maxWidth: 800, margin: "0 auto 32px auto" }}>
            Keka and greytHR both price on a base fee plus employees model rather
            than a flat per user rate, the &quot;starting price&quot; below is
            each vendor&apos;s cheapest published plan, converted to an
            effective per user rate at that plan&apos;s included headcount.
          </p>
          <div className="pricing-compare-scroll">
            <table className="pricing-compare-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Starting price</th>
                  <th>Minimum seats</th>
                  <th>Setup fee</th>
                </tr>
              </thead>
              <tbody>
                <tr className="pricing-compare-highlight">
                  <td data-label="Vendor">Meagle 360</td>
                  <td data-label="Starting price">₹149/user/mo flat</td>
                  <td data-label="Minimum seats">None</td>
                  <td data-label="Setup fee">₹0</td>
                </tr>
                <tr>
                  <td data-label="Vendor">Keka</td>
                  <td data-label="Starting price">₹9,999/mo base (≈₹100/user/mo at 100 seats)</td>
                  <td data-label="Minimum seats">Base fee bundles up to 100 employees</td>
                  <td data-label="Setup fee">≈₹20,000 (2× monthly fee)</td>
                </tr>
                <tr>
                  <td data-label="Vendor">greytHR</td>
                  <td data-label="Starting price">₹2,495/mo base (≈₹50/user/mo at 50 seats)</td>
                  <td data-label="Minimum seats">Base fee bundles up to 50 employees</td>
                  <td data-label="Setup fee">₹0 (none published)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 32 }}>Pricing FAQs</h2>
          <FaqAccordion items={PRICING_FAQS.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <section className="section section-alt" style={{ textAlign: "center", padding: "48px 0" }}>
        <div className="container">
          <h2 style={{ marginBottom: 24 }}>Ready to get started?</h2>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/#demo" className="btn btn-primary">
              Start Free Trial
            </a>
            <a href="/contact" className="btn btn-outline">
              Talk to Sales
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
