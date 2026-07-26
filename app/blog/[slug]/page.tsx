import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "../../components/SiteChrome";
import { getPublishedPostBySlug, getRelatedPosts } from "../../../lib/posts";
import { BlogCard } from "../../components/BlogCard";
import { sanitizePostContent } from "../../../lib/sanitize";

export const revalidate = 60;

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};

  const title = post.seo_title || post.title;
  const description = post.seo_description || undefined;

  return {
    title: `${title} | Meagle 360 Blog`,
    description,
    keywords: post.seo_keywords || undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.published_at || undefined,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
    alternates: {
      canonical: post.canonical_url || undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const cleanContent = sanitizePostContent(post.content);
  const relatedPosts = await getRelatedPosts(post.category, post.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo_description || undefined,
    image: post.cover_image_url || undefined,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "Meagle 360" },
  };

  return (
    <SiteChrome>
      <section className="blog-post-banner" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, var(--primary-dark) 100%)", color: "#fff", padding: "60px 0 40px", minHeight: "260px", display: "flex", alignItems: "center" }}>
        <div className="container blog-post-banner-inner" style={{ width: "100%" }}>
          <header className="blog-post-header">
            <h1 className="blog-post-title" style={{ color: "#fff", margin: "0", fontSize: "clamp(28px, 3.4vw, 38px)", letterSpacing: "-0.02em", fontWeight: 800, lineHeight: "1.2" }}>{post.title}</h1>
          </header>
        </div>
      </section>

      <section className="section blog-post-body-section">
        <div className="container">
          {post.cover_image_url && (
            <div className="blog-post-cover" style={{ marginBottom: "40px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover_image_url} alt={post.cover_image_alt || post.title} style={{ width: "100%", borderRadius: "14px" }} />
            </div>
          )}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: cleanContent }} />
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="section blog-grid-section section-alt">
          <div className="container">
            <div className="section-head" style={{ marginBottom: "40px", margin: "0 auto 40px", textAlign: "center" }}>
              <h2>You might also like</h2>
              <p>More articles in {post.category}</p>
            </div>
            <div className="blog-grid">
              {relatedPosts.map((related) => (
                <BlogCard post={related} key={related.id} />
              ))}
            </div>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </SiteChrome>
  );
}
