import type { Post } from "../../lib/posts";
import { calculateReadingTime } from "../../lib/blog-types";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <a href={`/blog/${post.slug}`} className="blog-card">
      <div className="blog-card-cover" style={{ position: "relative" }}>
        {post.category && (
          <span style={{ position: "absolute", top: "12px", left: "12px", zIndex: 10, background: "var(--primary)", color: "#fff", padding: "4px 10px", borderRadius: "100px", fontSize: "12px", fontWeight: 600, textTransform: "uppercase" }}>
            {post.category}
          </span>
        )}
        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover_image_url} alt={post.cover_image_alt || post.title} />
        )}
      </div>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          {post.published_at && (
            <span className="blog-card-date">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {formatDate(post.published_at)}
            </span>
          )}
          <span className="blog-card-readtime">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {calculateReadingTime(post.content)} min read
          </span>
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        <div style={{ marginTop: "auto", paddingTop: "16px" }}>
          <span className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "14px", borderRadius: "6px", display: "inline-block" }}>
            Read more
          </span>
        </div>
      </div>
    </a>
  );
}
