import { notFound } from "next/navigation";
import { getJobBySlug } from "../../../lib/jobs";
import { JobApplicationForm } from "../../components/careers/JobApplicationForm";
import type { Metadata } from "next";
import { SiteChrome } from "../../components/SiteChrome";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await getJobBySlug(params.slug);
  if (!job) return { title: "Job Not Found" };

  return {
    title: `${job.title} | Careers`,
    description: `Apply for the ${job.title} position.`,
  };
}

export default async function JobDetailsPage({ params }: { params: { slug: string } }) {
  const job = await getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  return (
    <SiteChrome>
      <main style={{ padding: "120px 0 80px", background: "var(--bg-gray)", minHeight: "100vh" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ marginBottom: 32 }}>
            <a href="/careers" style={{ color: "var(--primary)", display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to all jobs
            </a>
          </div>

          <div style={{ display: "grid", gap: 32 }}>
            <div style={{ background: "#fff", padding: "40px", borderRadius: 24, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 36px)", margin: "0 0 16px", lineHeight: 1.2 }}>{job.title}</h1>
              
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", color: "var(--text-2)", fontSize: 15, fontWeight: 500, paddingBottom: 24, borderBottom: "1px solid var(--border)", marginBottom: 24 }}>
                {job.location && (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </span>
                )}
                {job.job_type && (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.job_type}
                  </span>
                )}
              </div>

              <div 
                className="blog-content" 
                dangerouslySetInnerHTML={{ __html: job.description }}
                style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-1)" }}
              />
            </div>

            <div id="apply" style={{ background: "#fff", padding: "40px", borderRadius: 24, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
              <h2 style={{ fontSize: 24, margin: "0 0 24px" }}>Apply for this role</h2>
              <JobApplicationForm jobId={job.id} />
            </div>
          </div>
        </div>
      </main>
    </SiteChrome>
  );
}
