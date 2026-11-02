"use client";

import { triggerRipple } from "../lib/ripple";
import { ContactForm } from "./ContactForm";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-orb orb-1"></div>
      <div className="hero-bg-orb orb-2"></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="pulse-dot"></span>All-in-One HR Management Solution
          </span>
          <h1 className="hero-title">
            Still Managing
            <br />
            HR Manually?
            <br />
            <span className="accent">
              There&apos;s a Smarter Way.
              <svg viewBox="0 0 220 12" preserveAspectRatio="none">
                <path
                  d="M2 9C40 2 120 2 218 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity=".35"
                />
              </svg>
            </span>
          </h1>
          <p>
            Meagle 360 is a powerful HRMS (HRIS) software platform that automates your HR
            processes, empowers your people, and drives organizational
            success.
          </p>
          <div className="hero-actions">
            <a href="/contact" className="btn btn-primary" onClick={triggerRipple}>
              Request Demo
            </a>
            <a href="/features/attendance-management-software" className="btn btn-outline" onClick={triggerRipple}>
              Explore Features
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Same form (and same /thank-you redirect) as the one at the bottom of
            the page, in the same purple card. */}
        <div className="hero-form">
          <ContactForm title="Request a Free Demo" />
        </div>
      </div>
    </section>
  );
}
