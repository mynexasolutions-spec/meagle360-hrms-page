"use client";

import { useState } from "react";
import { triggerRipple } from "../lib/ripple";
import { Select } from "./Select";

type Status = "idle" | "loading" | "success" | "error";

const USER_RANGE_OPTIONS = ["1-10", "11-20", "21-50", "50+"].map((range) => ({
  value: range,
  label: `${range} users`,
}));

export function ContactForm({
  title,
  onSuccess,
}: {
  title?: string;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!users) {
      setStatus("error");
      setError("Please select the number of users.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, users, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setName("");
      setPhone("");
      setUsers("");
      setMessage("");
      onSuccess();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="cta-form" onSubmit={handleSubmit}>
      {title && <h3 className="cta-form-title">{title}</h3>}
      <div className="cta-form-row">
        <input
          type="text"
          placeholder="Full name"
          aria-label="Full name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone number"
          aria-label="Phone number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Select
          ariaLabel="Number of users"
          placeholder="Number of users"
          value={users}
          onChange={setUsers}
          options={USER_RANGE_OPTIONS}
        />
      </div>
      <textarea
        placeholder="Tell us a bit about what you need..."
        aria-label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <p className="form-consent-line">
        By submitting, you agree to our{" "}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        .
      </p>

      <div className="cta-form-footer">
        <button
          type="submit"
          className="btn btn-white cta-form-submit"
          disabled={status === "loading"}
          onClick={triggerRipple}
        >
          {status === "loading" ? "Sending..." : "Request Demo"}
        </button>
        {status === "error" && <span className="cta-form-status error">{error}</span>}
        {status === "success" && (
          <span className="cta-form-status">Thanks! Our team will reach out shortly.</span>
        )}
      </div>
    </form>
  );
}
