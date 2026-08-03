import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";

const TITLE = "Security";
const DESCRIPTION =
  "How Meagle 360 protects your data: encryption, access controls, data residency, sub-processors, and how to report a security issue.";
const SITE_URL = "https://www.meagle360.com";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/security",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/security",
    type: "website",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Security", item: `${SITE_URL}/security` },
  ],
};

export default function SecurityPage() {
  return (
    <SiteChrome>
      <section
        className="blog-post-banner"
        style={{ display: "flex", alignItems: "center", minHeight: "220px" }}
      >
        <div className="container">
          <h1 className="blog-post-title" style={{ textAlign: "center" }}>
            Security &amp; Data Protection
          </h1>
        </div>
      </section>

      <section className="section blog-post-body-section">
        <div className="container blog-post-container">
          <div className="blog-article-wrapper">
            <div className="blog-content">
              <p>
                We&apos;re early-stage and believe in saying exactly what we do
                — no vague &quot;bank-grade security&quot; claims. Here&apos;s
                what actually protects your data today.
              </p>

              <h2>Encryption</h2>
              <p>
                All traffic between your browser and Meagle 360 is encrypted
                in transit via HTTPS/TLS. Data at rest in our database and
                file storage is encrypted by our infrastructure provider,
                Supabase, which builds on Postgres and AWS.
              </p>

              <h2>Access controls</h2>
              <p>
                Application data is protected by row-level security policies
                at the database level, scoped per table and, for
                administrative actions, restricted to a specific verified
                admin account rather than being open to any authenticated
                user.
              </p>

              <h2>Where your data lives</h2>
              <p>
                Our database, authentication, and file storage are hosted on
                Supabase, running on AWS infrastructure in the{" "}
                <strong>ap-south-1 (Mumbai, India)</strong> region.
              </p>

              <h2>Sub-processors</h2>
              <p>We rely on the following third-party services to run Meagle 360:</p>
              <ul>
                <li>
                  <strong>Supabase</strong> — database, authentication, and
                  file storage (job applicant CVs, blog media)
                </li>
                <li>
                  <strong>Vercel</strong> — application hosting and delivery
                </li>
                <li>
                  <strong>Cloudinary</strong> — image hosting and delivery for
                  blog content
                </li>
                <li>
                  <strong>Hostinger</strong> — outbound transactional email
                  (contact form and demo request notifications)
                </li>
              </ul>

              <h2>Backups &amp; recovery</h2>
              <p>REPLACE_WITH_BACKUP_POLICY</p>

              <h2>Certifications</h2>
              <p>
                We do not currently hold SOC 2, ISO 27001, or any other
                third-party security certification. REPLACE_WITH_CERTIFICATION_ROADMAP
              </p>

              <h2>Report a security issue</h2>
              <p>
                If you believe you&apos;ve found a security vulnerability,
                please report it to{" "}
                <a href="mailto:REPLACE_WITH_SECURITY_CONTACT_EMAIL">
                  REPLACE_WITH_SECURITY_CONTACT_EMAIL
                </a>
                . We&apos;ll acknowledge reports and keep you updated as we
                investigate.
              </p>
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
