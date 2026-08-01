"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuillEditor } from "./QuillEditor";
import { createJob, updateJob, type JobInput } from "../../admin/jobs/actions";
import { slugify } from "../../../lib/blog-types";
import { type Job } from "../../../lib/jobs";

export function JobForm({ job }: { job?: Job }) {
  const router = useRouter();
  const isEdit = !!job;

  const [title, setTitle] = useState(job?.title ?? "");
  const [slug, setSlug] = useState(job?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [location, setLocation] = useState(job?.location ?? "");
  const [jobType, setJobType] = useState(job?.job_type ?? "Full-time");
  const [description, setDescription] = useState(job?.description ?? "");
  const [published, setPublished] = useState(job?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const input: JobInput = {
      title,
      slug: slugify(slug),
      location,
      job_type: jobType,
      description,
      published,
    };

    if (isEdit && job) {
      const res = await updateJob(job.id, input);
      setSaving(false);
      if (res.error) {
        setError(res.error);
        return;
      }
      router.push("/admin/jobs");
      router.refresh();
    } else {
      const res = await createJob(input);
      setSaving(false);
      if (res.error) {
        setError(res.error);
        return;
      }
      router.push("/admin/jobs");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {error && (
        <div style={{ padding: "14px 20px", background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: 12, fontSize: 15, fontWeight: 500 }}>
          {error}
        </div>
      )}

      {/* Basic Info Section */}
      <div style={{ background: "#fafafa", border: "1px solid #eaeaea", borderRadius: 16, padding: 32 }}>
        <h3 style={{ margin: "0 0 24px", fontSize: 20, color: "#111827", fontWeight: 700 }}>Basic Information</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label htmlFor="title" style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Job Title</label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Senior Frontend Developer"
              style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, transition: "border-color 0.2s" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label htmlFor="slug" style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>URL slug</label>
            <input
              id="slug"
              type="text"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, transition: "border-color 0.2s" }}
            />
            <span style={{ fontSize: 13, color: "#6b7280" }}>meagle360.com/careers/{slugify(slug) || "job-slug"}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label htmlFor="location" style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Location</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Remote, New York, Mumbai"
                style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, transition: "border-color 0.2s" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label htmlFor="jobType" style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Job Type</label>
              <select 
                id="jobType" 
                value={jobType} 
                onChange={(e) => setJobType(e.target.value)}
                style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, backgroundColor: "#fff", cursor: "pointer" }}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div style={{ background: "#fafafa", border: "1px solid #eaeaea", borderRadius: 16, padding: 32 }}>
        <h3 style={{ margin: "0 0 24px", fontSize: 20, color: "#111827", fontWeight: 700 }}>Job Description</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <QuillEditor value={description} onChange={setDescription} />
        </div>
      </div>

      {/* Publication & Actions Section */}
      <div style={{ background: "#fafafa", border: "1px solid #eaeaea", borderRadius: 16, padding: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            type="button"
            className={`admin-toggle${published ? " on" : ""}`}
            role="switch"
            aria-checked={published}
            onClick={() => setPublished((p) => !p)}
            style={{ transform: "scale(1.1)", margin: 0 }}
          >
            <span className="knob"></span>
          </button>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 600, color: "#111827", fontSize: 15 }}>{published ? "Published" : "Draft"}</span>
            <span style={{ fontSize: 13, color: "#6b7280" }}>{published ? "Visible to the public" : "Hidden from public view"}</span>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={saving}
          style={{ padding: "14px 28px", fontSize: 16, borderRadius: 10 }}
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Publish Job"}
        </button>
      </div>

    </form>
  );
}
