import { SiteChrome } from "./SiteChrome";
import { BlogCard } from "./BlogCard";
import { BlogCtaSection } from "./BlogCtaSection";
import { getPublishedPostsPage, POSTS_PER_PAGE } from "../../lib/posts";

const SITE_URL = "https://www.meagle360.com";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
  ],
};

function pageHref(n: number) {
  return n === 1 ? "/blog" : `/blog/page/${n}`;
}

// Numbered pagination: first, last, and a window around the current page.
function pageItems(current: number, totalPages: number): (number | "gap")[] {
  const keep = new Set<number>([1, totalPages, current - 1, current, current + 1]);
  const nums = [...keep].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
  const items: (number | "gap")[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) items.push("gap");
    items.push(n);
  });
  return items;
}

export async function BlogIndexView({ page }: { page: number }) {
  const { posts, total } = await getPublishedPostsPage(page);
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

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
          {totalPages > 1 && (
            <nav className="blog-pagination" aria-label="Blog pagination">
              {page > 1 ? (
                <a href={pageHref(page - 1)} rel="prev" className="blog-page-link">
                  &larr; Previous
                </a>
              ) : (
                <span className="blog-page-link is-disabled" aria-hidden="true">
                  &larr; Previous
                </span>
              )}
              {pageItems(page, totalPages).map((item, i) =>
                item === "gap" ? (
                  <span key={`gap-${i}`} className="blog-page-gap" aria-hidden="true">
                    &hellip;
                  </span>
                ) : item === page ? (
                  <span key={item} className="blog-page-link is-current" aria-current="page">
                    {item}
                  </span>
                ) : (
                  <a key={item} href={pageHref(item)} className="blog-page-link" aria-label={`Page ${item}`}>
                    {item}
                  </a>
                ),
              )}
              {page < totalPages ? (
                <a href={pageHref(page + 1)} rel="next" className="blog-page-link">
                  Next &rarr;
                </a>
              ) : (
                <span className="blog-page-link is-disabled" aria-hidden="true">
                  Next &rarr;
                </span>
              )}
            </nav>
          )}
        </div>
      </section>
      <BlogCtaSection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </SiteChrome>
  );
}
