import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";

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
              <h2>Why we built Meagle 360</h2>
              <p>REPLACE_WITH_FOUNDER_STORY</p>

              <h2>Who&apos;s behind it</h2>
              <div className="about-person-card">
                <div className="about-person-avatar">
                  <img src="REPLACE_WITH_FOUNDER_PHOTO" alt="REPLACE_WITH_FOUNDER_NAME" />
                </div>
                <div>
                  <strong>REPLACE_WITH_FOUNDER_NAME</strong>
                  <span>REPLACE_WITH_FOUNDER_TITLE</span>
                  <p>REPLACE_WITH_FOUNDER_BACKGROUND</p>
                  <a
                    href="REPLACE_WITH_FOUNDER_LINKEDIN"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn →
                  </a>
                </div>
              </div>
              <p>REPLACE_WITH_TEAM_MEMBERS</p>

              <h2>Nexa Solutions</h2>
              <p>
                Meagle 360 is a product built and operated by Nexa Solutions,
                the registered entity behind the platform.
              </p>
              <p>
                <strong>Registered entity name:</strong>{" "}
                REPLACE_WITH_REGISTERED_ENTITY_NAME
              </p>

              <h2>Where we are</h2>
              <p>REPLACE_WITH_REGISTERED_ADDRESS</p>
              <p>REPLACE_WITH_MAP_EMBED</p>

              <h2>How to reach us</h2>
              <ul>
                <li>
                  Email:{" "}
                  <a href="mailto:info@meagle360.com">info@meagle360.com</a>
                </li>
                <li>
                  Phone: <a href="tel:+918077313241">+91 80773 13241</a>
                </li>
                <li>Business hours: REPLACE_WITH_BUSINESS_HOURS</li>
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
