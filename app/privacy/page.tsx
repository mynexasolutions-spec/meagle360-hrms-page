import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Meagle 360 collects, uses, and protects your personal data across our website, demo requests, and job applications.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/privacy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <section
        className="blog-post-banner"
        style={{ display: "flex", alignItems: "center", minHeight: "220px" }}
      >
        <div className="container">
          <h1 className="blog-post-title" style={{ textAlign: "center" }}>
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="section blog-post-body-section">
        <div className="container blog-post-container">
          <div className="blog-article-wrapper">
            <div className="blog-content">
              <p>
                <strong>Last updated:</strong> August 2, 2026
              </p>
              <p>
                This Privacy Policy explains how Meagle 360, a product by Nexa
                Solutions (&quot;Meagle 360&quot;, &quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;), collects, uses, and protects information when you
                visit meagle360.com, request a demo, apply for a job with us, or
                otherwise interact with our website (the &quot;Site&quot;).
              </p>

              <h2>1. Information We Collect</h2>
              <p>We collect information you provide directly to us, including:</p>
              <ul>
                <li>
                  <strong>Demo and contact requests:</strong> name, phone number,
                  approximate number of users, and any message you send us.
                </li>
                <li>
                  <strong>Job applications:</strong> name, email address, phone
                  number, expected salary, and the resume/CV file you upload.
                </li>
                <li>
                  <strong>Blog and site usage:</strong> standard technical data
                  such as IP address, browser type, and pages visited, collected
                  automatically when you use the Site.
                </li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <ul>
                <li>To respond to demo requests and general enquiries</li>
                <li>To evaluate job applications and contact candidates</li>
                <li>To operate, maintain, and improve the Site</li>
                <li>To comply with legal obligations</li>
              </ul>
              <p>We do not sell your personal data.</p>

              <h2>3. How We Share Your Information</h2>
              <p>
                We share information only with service providers who help us run
                the Site and our business — for example, our hosting, database,
                file storage, and email-delivery providers — solely to perform
                those services on our behalf. We do not share your information
                with third parties for their own marketing purposes.
              </p>

              <h2>4. Data Retention</h2>
              <p>
                We retain personal data for as long as necessary to fulfill the
                purposes described in this policy, including responding to your
                enquiry, evaluating your job application, or as required by
                applicable law.
              </p>

              <h2>5. Your Rights</h2>
              <p>
                Depending on your location, you may have the right to access,
                correct, or request deletion of your personal data, including
                under India&apos;s Digital Personal Data Protection Act, 2023. To
                exercise these rights, contact us using the details below.
              </p>

              <h2>6. Cookies</h2>
              <p>
                The Site may use cookies or similar technologies necessary for
                basic functionality. We do not currently use third-party
                advertising cookies.
              </p>

              <h2>7. Security</h2>
              <p>
                We use reasonable technical and organizational measures to
                protect the personal data we hold, including encryption in
                transit and access controls. No method of transmission or
                storage is 100% secure, and we cannot guarantee absolute
                security.
              </p>

              <h2>8. Children&apos;s Privacy</h2>
              <p>
                The Site is not directed at children, and we do not knowingly
                collect personal data from children.
              </p>

              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Material
                changes will be reflected by updating the &quot;Last updated&quot;
                date above.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or wish to
                exercise your data rights, contact us at{" "}
                <a href="mailto:info@meagle360.com">info@meagle360.com</a>.
              </p>
              <p>
                Grievance Officer contact:{" "}
                <a href="tel:+918077313241">+91 80773 13241</a>
                <br />
                Registered address: New Delhi, India
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
