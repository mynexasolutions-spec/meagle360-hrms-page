import type { Post } from "../../lib/posts";

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
          <img src={post.cover_image_url} alt="" />
        )}
      </div>
      <div className="blog-card-body">
        {post.published_at && (
          <span className="blog-card-date">{formatDate(post.published_at)}</span>
        )}
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
