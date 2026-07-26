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

function calculateReadingTime(content: string): number {
  if (!content) return 1;
  const words = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
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
  const readingTime = calculateReadingTime(post.content);
  const formattedDate = formatDate(post.published_at || post.created_at);

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
      {/* Blog Detail Hero Banner */}
      <section className="blog-post-banner">
        <div className="blog-post-banner-bg" />
        <div className="blog-post-banner-overlay" />
        <div className="container blog-post-banner-inner">
          <header className="blog-post-header">
            <div className="blog-post-badges">
              {post.category && (
                <span className="blog-category-badge">{post.category}</span>
              )}
              {formattedDate && (
                <span className="blog-meta-badge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {formattedDate}
                </span>
              )}
              <span className="blog-meta-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {readingTime} min read
              </span>
            </div>

            <h1 className="blog-post-title">{post.title}</h1>

            {post.seo_description && (
              <p className="blog-post-subtitle">{post.seo_description}</p>
            )}
          </header>
        </div>
      </section>

      {/* Main Article Body */}
      <section className="section blog-post-body-section">
        <div className="container blog-post-container">
          <div className="blog-article-wrapper">
            {post.cover_image_url && (
              <div className="blog-post-cover-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.cover_image_url}
                  alt={post.cover_image_alt || post.title}
                  className="blog-post-cover-img"
                />
              </div>
            )}

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section blog-related-section">
          <div className="container">
            <div className="blog-related-head">
              <h2>You might also like</h2>
              <p>Explore more articles in {post.category || "HR Insights"}</p>
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
