import { getAllJobs } from "../../lib/jobs";

import Link from "next/link";
import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";

const TITLE = "Careers";
const DESCRIPTION = "Join our team at Meagle 360. Explore our open positions and help us build the future of HR.";
const SITE_URL = "https://www.meagle360.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Careers", item: `${SITE_URL}/careers` },
  ],
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/careers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function CareersPage() {
  const jobs = await getAllJobs();

  return (
    <SiteChrome>
      <main>
        {/* BANNER — matches the blog / contact page header style */}
        <section
          className="blog-post-banner"
          style={{ display: "flex", alignItems: "center", minHeight: "260px" }}
        >
          <div className="container" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
            <div className="blog-post-badges" style={{ marginBottom: 16 }}>
              <span className="blog-meta-badge">Join the Team</span>
            </div>
            <h1 className="blog-post-title" style={{ margin: "0 0 16px" }}>
              Build the future of HR Management
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", margin: 0 }}>
              We&apos;re looking for passionate people to join us on our mission. If you&apos;re
              ready to do the best work of your career, we&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* JOBS LISTING SECTION */}
        <section className="section section-alt">
          <div className="container">
            <div className="section-head reveal in" style={{ marginBottom: 48, textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
              <h2>Open Positions</h2>
              <p>Explore our current openings across various departments.</p>
            </div>

            <div className="reveal-stagger in" style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
              {jobs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "64px 24px", background: "#fff", borderRadius: 16, border: "1px solid var(--border)" }}>
                  <h3 style={{ margin: "0 0 8px" }}>No open positions right now</h3>
                  <p style={{ margin: 0, color: "var(--text-2)" }}>Check back later or follow us on our socials for updates.</p>
                </div>
              ) : (
                jobs.map(job => (
                  <Link
                    key={job.id}
                    href={`/careers/${job.slug}`}
                    className="job-card"
                  >
                    <div className="job-card-icon">
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7h-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM10 5h4v2h-4V5z" />
                      </svg>
                    </div>
                    <div className="job-card-body">
                      <h3>{job.title}</h3>
                      <div className="job-card-meta">
                        {job.location && (
                          <span className="job-meta-pill">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.location}
                          </span>
                        )}
                        {job.job_type && (
                          <span className="job-meta-pill">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {job.job_type}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="job-card-cta">View Details</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </SiteChrome>
  );
}
