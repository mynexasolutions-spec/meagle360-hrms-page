import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";
import { ThankYouTracking } from "../components/ThankYouTracking";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your demo request has been received.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return (
    <SiteChrome>
      <ThankYouTracking />
      <section className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ maxWidth: 560, textAlign: "center" }}>
          <div className="thank-you-check">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 style={{ margin: "0 0 12px" }}>You&apos;re all set</h1>
          <p style={{ color: "var(--text-2)", fontSize: 17, marginBottom: 32 }}>
            Thanks for booking a demo with Meagle 360. We&apos;ve received your
            details and will reach out shortly to confirm a time.
          </p>
          <a
            href="REPLACE_WITH_CALENDAR_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Schedule a Time on Our Calendar
          </a>
          <p style={{ marginTop: 24 }}>
            <a href="/" style={{ color: "var(--primary)", fontWeight: 600 }}>
              ← Back to homepage
            </a>
          </p>
        </div>
      </section>
    </SiteChrome>
  );
}
