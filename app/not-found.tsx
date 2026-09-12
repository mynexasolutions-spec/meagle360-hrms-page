import type { Metadata } from "next";
import { SiteChrome } from "./components/SiteChrome";
import { FEATURE_PAGES } from "../lib/features-data";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const POPULAR_LINKS = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
  { href: "/demo", label: "Book a Free Trial" },
  { href: "/careers", label: "Careers" },
];

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="section" style={{ padding: "96px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <span className="eyebrow" style={{ margin: "0 auto 12px" }}>
            Error 404
          </span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-0.02em", margin: "0 0 16px" }}>
            We couldn&apos;t find that page
          </h1>
          <p style={{ color: "var(--text-2)", fontSize: 18, marginBottom: 40 }}>
            The page you&apos;re looking for may have moved or no longer exists.
            Here are some helpful links to get you back on track with Meagle 360&apos;s
            HR, payroll and employee management software.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
            <a href="/" className="btn btn-primary">
              Go to Homepage
            </a>
            <a href="/demo" className="btn btn-outline">
              Start Free Trial
            </a>
          </div>

          <div style={{ textAlign: "left" }}>
            <h2 style={{ fontSize: 20, marginBottom: 16, textAlign: "center" }}>
              Popular pages
            </h2>
            <ul className="feature-related-links" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px 24px", listStyle: "none", padding: 0, margin: "0 0 32px" }}>
              {POPULAR_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label} →</a>
                </li>
              ))}
            </ul>

            <h2 style={{ fontSize: 20, marginBottom: 16, textAlign: "center" }}>
              HR management features
            </h2>
            <ul className="feature-related-links" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px 24px", listStyle: "none", padding: 0, margin: 0 }}>
              {FEATURE_PAGES.map((f) => (
                <li key={f.slug}>
                  <a href={`/features/${f.slug}`}>{f.navLabel} →</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
