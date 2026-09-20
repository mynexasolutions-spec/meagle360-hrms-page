import type { Metadata } from "next";
import { SiteChrome } from "../../components/SiteChrome";

export const metadata: Metadata = {
  title: "Application Received",
  description: "Your job application has been received.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ApplicationSubmittedPage() {
  return (
    <SiteChrome>
      <section className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ maxWidth: 560, textAlign: "center" }}>
          <div className="thank-you-check">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 style={{ margin: "0 0 12px" }}>Application received</h1>
          <p style={{ color: "var(--text-2)", fontSize: 18, marginBottom: 32 }}>
            Thank you for applying. We&apos;ll review your application and be in touch if your
            profile matches the role.
          </p>
          <a href="/careers" className="btn btn-primary">
            Back to open positions
          </a>
        </div>
      </section>
    </SiteChrome>
  );
}
