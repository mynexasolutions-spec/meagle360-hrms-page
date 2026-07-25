import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";
import { BlogCard } from "../components/BlogCard";
import { getPublishedPosts } from "../../lib/posts";

export const metadata: Metadata = {
  title: "Blog | Meagle 360",
  description:
    "Insights, product updates, and HR best practices from the Meagle 360 team.",
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <SiteChrome>
      <section className="blog-index-banner" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, var(--primary-dark) 100%)", color: "#fff", padding: "60px 0 40px", minHeight: "260px", display: "flex", alignItems: "center" }}>
        <div className="container blog-index-banner-inner" style={{ width: "100%" }}>
          <div className="blog-index-banner-content reveal in">
            <h1 className="blog-index-title hero-copy" style={{ color: "#fff", margin: 0 }}>
              Insights &amp; <span className="accent" style={{ color: "#fff", position: "relative", display: "inline-block" }}>
                Updates
                <svg viewBox="0 0 220 12" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: "-6px", width: "100%", height: "auto" }}>
                  <path
                    d="M2 9C40 2 120 2 218 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity=".85"
                  />
                </svg>
              </span>
            </h1>
            <p className="blog-index-subtitle" style={{ color: "rgba(255,255,255,0.9)", marginTop: "24px" }}>
              Discover the latest trends, tips, and best practices in HR management and team productivity from the Meagle 360 team.
            </p>
          </div>
        </div>
      </section>
      <section className="section blog-grid-section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="blog-empty">No posts published yet. Check back soon.</div>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard post={post} key={post.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteChrome>
  );
}
