import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";
import { COMPANY_ADDRESS_INLINE, COMPANY_ADDRESS_LINES } from "../../lib/company";

const TITLE = "About Meagle 360 — Built by Nexa Solutions, Noida";
const DESCRIPTION =
  "Meagle 360 is built by Nexa Solutions for companies that outgrew spreadsheets. Meet the team and learn how to reach us.";
const SITE_URL = "https://www.meagle360.com";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
  ],
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <section
        className="blog-post-banner"
        style={{ display: "flex", alignItems: "center", minHeight: "220px" }}
      >
        <div className="container">
          <h1 className="blog-post-title" style={{ textAlign: "center" }}>
            We build HR software for companies that outgrew spreadsheets
          </h1>
        </div>
      </section>

      <section className="section blog-post-body-section">
        <div className="container blog-post-container">
          <div className="blog-article-wrapper">
            <div className="blog-content">
              <h2>Who&apos;s behind it</h2>
              <div className="about-person-card">
                <div>
                  <strong>Abdul Bari</strong>
                  <span>Director</span>
                </div>
              </div>

              <h2>Nexa Solutions</h2>
              <p>
                Meagle 360 is a product built by Nexa Solutions and operated by
                Meagle360 Private Limited, the registered entity behind the
                platform.
              </p>
              <p>
                <strong>Registered entity name:</strong>{" "}
                Meagle360 Private Limited
              </p>

              <h2>Where we are</h2>
              <p>
                {COMPANY_ADDRESS_LINES[0]}
                <br />
                {COMPANY_ADDRESS_LINES[1]}
              </p>
              <div className="about-map">
                <iframe
                  title="Meagle 360 office location on Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(COMPANY_ADDRESS_INLINE)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <h2>How to reach us</h2>
              <ul>
                <li>
                  Email:{" "}
                  <a href="mailto:info@meagle360.com">info@meagle360.com</a>
                </li>
                <li>
                  Phone: <a href="tel:+918077313241">+91 80773 13241</a>
                </li>
                <li>Business hours: Mon–Sat, 10:00 AM – 10:00 PM IST</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </SiteChrome>
  );
}
