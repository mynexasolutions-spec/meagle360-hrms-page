"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { triggerRipple } from "../lib/ripple";

type Status = "idle" | "loading" | "error";

export function DemoRequestForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      work_email: formData.get("work_email"),
      employees: formData.get("employees"),
      phone: formData.get("phone"),
    };

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      router.push("/thank-you");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="demo-form" onSubmit={handleSubmit}>
      <h3 className="demo-form-title">Book your demo</h3>

      {status === "error" && <div className="demo-form-error">{error}</div>}

      <div className="demo-form-field">
        <label htmlFor="demo-name">Full Name *</label>
        <input id="demo-name" name="name" type="text" required placeholder="John Doe" />
      </div>

      <div className="demo-form-field">
        <label htmlFor="demo-work-email">Work Email *</label>
        <input
          id="demo-work-email"
          name="work_email"
          type="email"
          required
          placeholder="john@company.com"
        />
      </div>

      <div className="demo-form-field">
        <label htmlFor="demo-employees">Employees *</label>
        <input
          id="demo-employees"
          name="employees"
          type="text"
          required
          placeholder="e.g. 25"
        />
      </div>

      <div className="demo-form-field">
        <label htmlFor="demo-phone">Phone *</label>
        <input id="demo-phone" name="phone" type="tel" required placeholder="+91 98765 43210" />
      </div>

      <p className="form-consent-line">
        By submitting, you agree to our{" "}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        .
      </p>

      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={status === "loading"}
        onClick={triggerRipple}
      >
        {status === "loading" ? "Booking..." : "Book My Demo"}
      </button>
    </form>
  );
}
