import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";
import { DemoRequestForm } from "../components/DemoRequestForm";
import { FaqAccordion } from "../components/FaqAccordion";

const TITLE = "Book a Free HRMS Demo | See Meagle 360 in 15 Minutes";
const DESCRIPTION =
  "See Meagle 360 in 15 minutes. A live, no-pressure walkthrough of attendance, leave, payroll and self-service tailored to your team.";
const SITE_URL = "https://www.meagle360.com";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/demo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const DEMO_FAQS = [
  {
    q: "Do I need to prepare anything?",
    a: "No preparation needed. It helps if you have a rough idea of your team size and the HR process that's causing you the most pain, but that's optional — we'll ask.",
  },
  {
    q: "Is this a sales call?",
    a: "It's a live product walkthrough tailored to your team, not a scripted pitch. If Meagle 360 isn't a good fit for you, we'll say so.",
  },
  {
    q: "Can I just start a trial instead?",
    a: "Yes. You don't need to book a call to try Meagle 360 — see the free trial option below.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DEMO_FAQS.map((item) => ({
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
    { "@type": "ListItem", position: 2, name: "Demo", item: `${SITE_URL}/demo` },
  ],
};

export default function DemoPage() {
  return (
    <SiteChrome>
      <section
        className="blog-post-banner"
        style={{ display: "flex", alignItems: "center", minHeight: "220px" }}
      >
        <div className="container">
          <h1 className="blog-post-title" style={{ textAlign: "center" }}>
            See Meagle 360 in 15 minutes
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container demo-grid">
          <div className="demo-info">
            <h2>What happens on the call</h2>
            <ul className="check-list">
              <li>
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                We learn about your team size and current HR process
              </li>
              <li>
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                We walk you through the modules relevant to you, live
              </li>
              <li>
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                You leave with a clear next-steps plan — no pressure, no hard sell
              </li>
            </ul>

            <div className="demo-host-card">
              <div className="demo-host-avatar">?</div>
              <div>
                <strong>REPLACE_WITH_HOST_NAME</strong>
                <span>REPLACE_WITH_HOST_ROLE</span>
              </div>
            </div>

            <p className="demo-response-time">
              Typical response time: REPLACE_WITH_RESPONSE_TIME
            </p>

            <p className="demo-secondary-path">
              Prefer to explore on your own first?{" "}
              <a href="/pricing">See pricing &amp; start a free trial →</a>
            </p>
          </div>

          <DemoRequestForm />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 32 }}>Demo FAQs</h2>
          <FaqAccordion items={DEMO_FAQS} />
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
