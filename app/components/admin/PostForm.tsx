"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QuillEditor } from "./QuillEditor";
import { createPost, updatePost, type PostInput } from "../../admin/actions";
import { slugify, type Post } from "../../../lib/blog-types";
import { uploadImage } from "../../lib/uploadImage";

export function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [category, setCategory] = useState(post?.category ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.cover_image_url ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(post?.cover_image_alt ?? "");
  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(post?.seo_description ?? "");
  const [seoKeywords, setSeoKeywords] = useState(post?.seo_keywords ?? "");
  const [canonicalUrl, setCanonicalUrl] = useState(post?.canonical_url ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const coverFileInputRef = useRef<HTMLInputElement>(null);

  async function handleCoverFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadingCover(true);
    setError("");
    try {
      const url = await uploadImage(file);
      setCoverImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingCover(false);
    }
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const input: PostInput = {
      title,
      slug: slugify(slug),
      category,
      content,
      cover_image_url: coverImageUrl,
      cover_image_alt: coverImageAlt,
      seo_title: seoTitle,
      seo_description: seoDescription,
      seo_keywords: seoKeywords,
      canonical_url: canonicalUrl,
      published,
    };

    if (isEdit) {
      const res = await updatePost(post.id, input);
      setSaving(false);
      if (res.error) {
        setError(res.error);
        return;
      }
      router.push("/admin");
      router.refresh();
    } else {
      const res = await createPost(input);
      setSaving(false);
      if (res.error) {
        setError(res.error);
        return;
      }
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>

      <div className="admin-field">
        <label htmlFor="slug">URL slug</label>
        <input
          id="slug"
          type="text"
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
        />
        <span className="hint">meagle360.com/blog/{slugify(slug) || "your-post-slug"}</span>
      </div>

      <div className="admin-field">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. HR Management, Product Updates, Company Culture"
        />
      </div>

      <div className="admin-field">
        <label htmlFor="cover">Cover image</label>
        <div className="admin-cover-row">
          {coverImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverImageUrl} alt="" className="admin-cover-preview" />
          )}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              id="cover"
              type="url"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://... or upload a file"
            />
            <div>
              <input
                type="file"
                accept="image/*"
                ref={coverFileInputRef}
                onChange={handleCoverFileSelected}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="btn btn-outline"
                style={{ padding: "8px 16px", fontSize: 13.5 }}
                onClick={() => coverFileInputRef.current?.click()}
                disabled={uploadingCover}
              >
                {uploadingCover ? "Uploading..." : "Upload image"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="cover_image_alt">Image alt text (for accessibility and SEO)</label>
        <input
          id="cover_image_alt"
          type="text"
          value={coverImageAlt}
          onChange={(e) => setCoverImageAlt(e.target.value)}
          placeholder="Describe the image (e.g. A team working on HR software)"
        />
      </div>

      <div className="admin-field">
        <label>Content</label>
        <QuillEditor value={content} onChange={setContent} />
      </div>

      <div className="admin-seo-box">
        <h3>SEO</h3>
        <p className="hint">
          Controls how this post appears in Google search results and when shared on social
          media. Leave blank to fall back to the title and excerpt above.
        </p>
        <div className="admin-field">
          <label htmlFor="seo_title">SEO title</label>
          <input
            id="seo_title"
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder={title || "Defaults to post title"}
          />
        </div>
        <div className="admin-field">
          <label htmlFor="seo_description">Meta description</label>
          <textarea
            id="seo_description"
            rows={2}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="A short SEO description of the post..."
          />
        </div>
        <div className="admin-field">
          <label htmlFor="seo_keywords">Keywords</label>
          <input
            id="seo_keywords"
            type="text"
            value={seoKeywords}
            onChange={(e) => setSeoKeywords(e.target.value)}
            placeholder="hr software, payroll automation, hrms"
          />
        </div>
        <div className="admin-field">
          <label htmlFor="canonical_url">Canonical URL</label>
          <input
            id="canonical_url"
            type="url"
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            placeholder="e.g. https://medium.com/your-post (if originally published elsewhere)"
          />
        </div>
      </div>

      <div className="admin-toggle-row">
        <button
          type="button"
          className={`admin-toggle${published ? " on" : ""}`}
          role="switch"
          aria-checked={published}
          onClick={() => setPublished((p) => !p)}
        >
          <span className="knob"></span>
        </button>
        <span>{published ? "Published (visible on the public blog)" : "Draft (hidden from the public blog)"}</span>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : isEdit ? "Save changes" : "Create post"}
        </button>
      </div>
    </form>
  );
}
