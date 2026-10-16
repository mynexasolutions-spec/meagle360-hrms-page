import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";
import { CtaBanner } from "../components/CtaBanner";
import { COMPANY_ADDRESS_INLINE, COMPANY_ADDRESS_LINES } from "../../lib/company";

const TITLE = "Contact Us";
const DESCRIPTION =
  "Get in touch with the Meagle 360 team to request a demo, ask a question, or talk to us about your HR needs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ContactPage() {
  return (
    <SiteChrome>
      <section
        className="blog-post-banner"
        style={{ display: "flex", alignItems: "center", minHeight: "220px" }}
      >
        <div className="container">
          <h1 className="blog-post-title" style={{ textAlign: "center" }}>
            Get in Touch
          </h1>
        </div>
      </section>
      <section className="contact-office-section">
        <div className="container">
          <div className="contact-office">
            <div className="contact-office-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="contact-office-body">
              <h2>Our office</h2>
              <address>
                {COMPANY_ADDRESS_LINES[0]}
                <br />
                {COMPANY_ADDRESS_LINES[1]}
              </address>
              <a
                className="contact-office-link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_ADDRESS_INLINE)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions →
              </a>
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </SiteChrome>
  );
}
