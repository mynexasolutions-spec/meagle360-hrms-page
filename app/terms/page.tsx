import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";

const TITLE = "Terms of Service";
const DESCRIPTION =
  "The terms and conditions governing your use of Meagle 360's website and HRMS software.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <SiteChrome>
      <section
        className="blog-post-banner"
        style={{ display: "flex", alignItems: "center", minHeight: "220px" }}
      >
        <div className="container">
          <h1 className="blog-post-title" style={{ textAlign: "center" }}>
            Terms of Service
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
                These Terms of Service (&quot;Terms&quot;) govern your access to
                and use of the Meagle 360 website and HRMS software (the
                &quot;Service&quot;), operated by Nexa Solutions
                (&quot;Meagle 360&quot;, &quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;). By using the Service, you agree to these Terms.
              </p>

              <h2>1. Using the Service</h2>
              <p>
                You must be authorized to act on behalf of your organization to
                request a demo, sign up for, or otherwise use the Service. You
                agree to provide accurate information and to keep your account
                credentials secure.
              </p>

              <h2>2. Free Trial and Demo</h2>
              <p>
                We may offer a free trial or a personalized demo of the Service.
                We reserve the right to modify or discontinue trial access at any
                time.
              </p>

              <h2>3. Pricing and Payment</h2>
              <p>
                Paid plans are billed at the rate shown on our pricing page at
                the time of purchase, currently a flat ₹149 per user per month
                unless otherwise agreed in writing. Fees are billed in advance
                and are non-refundable except as required by law or as
                explicitly stated in a separate written agreement.
              </p>

              <h2>4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Service for any unlawful purpose</li>
                <li>
                  Attempt to gain unauthorized access to the Service or its
                  related systems
                </li>
                <li>Interfere with or disrupt the integrity of the Service</li>
                <li>
                  Upload content you do not have the right to upload, including
                  through the job application or contact forms
                </li>
              </ul>

              <h2>5. Intellectual Property</h2>
              <p>
                The Service, including its software, design, and content, is
                owned by Nexa Solutions and protected by applicable
                intellectual property laws. These Terms do not grant you any
                rights to our trademarks or branding.
              </p>

              <h2>6. Termination</h2>
              <p>
                We may suspend or terminate access to the Service if these Terms
                are violated, or discontinue the Service with reasonable notice.
                You may stop using the Service, or cancel a paid plan, at any
                time from your billing settings.
              </p>

              <h2>7. Disclaimer of Warranties</h2>
              <p>
                The Service is provided &quot;as is&quot; without warranties of
                any kind, express or implied, to the fullest extent permitted by
                law.
              </p>

              <h2>8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Nexa Solutions will not
                be liable for any indirect, incidental, or consequential damages
                arising from your use of the Service.
              </p>

              <h2>9. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India, and any disputes
                will be subject to the exclusive jurisdiction of the courts of
                REPLACE_WITH_JURISDICTION_CITY.
              </p>

              <h2>10. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. Continued use of
                the Service after changes take effect constitutes acceptance of
                the updated Terms.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                Questions about these Terms can be sent to{" "}
                <a href="mailto:info@meagle360.com">info@meagle360.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
