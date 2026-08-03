"use client";

import { useState } from "react";
import { submitApplication } from "../../careers/actions";

export function JobApplicationForm({ jobId }: { jobId: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    
    const formData = new FormData(e.currentTarget);
    formData.append("job_id", jobId);

    const res = await submitApplication(formData);
    
    if (res.error) {
      setErrorMessage(res.error);
      setStatus("error");
    } else {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    }
  }

  if (status === "success") {
    return (
      <div style={{ padding: "40px 24px", textAlign: "center", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 16, color: "#166534" }}>
        <h3 style={{ margin: "0 0 12px" }}>Application Submitted!</h3>
        <p style={{ margin: 0 }}>Thank you for applying. We have received your application and will review it shortly. We'll be in touch if your profile matches our requirements.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {status === "error" && (
        <div style={{ padding: "12px 16px", background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: 8, fontSize: 14 }}>
          {errorMessage}
        </div>
      )}

      <div className="job-apply-form-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label htmlFor="name" style={{ fontSize: 14, fontWeight: 600 }}>Full Name *</label>
          <input 
            id="name" 
            name="name" 
            type="text" 
            required 
            style={{ padding: "12px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 15 }}
            placeholder="John Doe"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label htmlFor="email" style={{ fontSize: 14, fontWeight: 600 }}>Email Address *</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            style={{ padding: "12px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 15 }}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="job-apply-form-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label htmlFor="phone" style={{ fontSize: 14, fontWeight: 600 }}>Phone Number</label>
          <input 
            id="phone" 
            name="phone" 
            type="tel" 
            style={{ padding: "12px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 15 }}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label htmlFor="expected_salary" style={{ fontSize: 14, fontWeight: 600 }}>Expected Salary/Stipend (Monthly) *</label>
          <input
            id="expected_salary"
            name="expected_salary"
            type="text"
            required
            style={{ padding: "12px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 15 }}
            placeholder="e.g. X INR/month"
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label htmlFor="cv" style={{ fontSize: 14, fontWeight: 600 }}>Upload CV (PDF only, max 5MB) *</label>
        <input 
          id="cv" 
          name="cv" 
          type="file" 
          accept="application/pdf"
          required
          style={{ 
            padding: "12px", 
            borderRadius: 8, 
            border: "2px dashed var(--border)", 
            fontSize: 15,
            background: "var(--bg-gray)",
            cursor: "pointer"
          }}
        />
      </div>

      <p className="form-consent-line">
        By submitting, you agree to our{" "}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>{" "}
        and consent to us processing your CV and application details to
        evaluate your application.
      </p>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "submitting"}
        style={{ marginTop: 8, justifyContent: "center", padding: "14px 24px", fontSize: 16 }}
      >
        {status === "submitting" ? "Submitting Application..." : "Submit Application"}
      </button>
    </form>
  );
}
