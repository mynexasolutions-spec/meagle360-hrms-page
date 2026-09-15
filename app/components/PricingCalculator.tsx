"use client";

import { useState } from "react";
import { triggerRipple } from "../lib/ripple";

const PRICE_PER_USER = 149;
const GST_RATE = 0.18;
const MIN_EMPLOYEES = 1;
const MAX_EMPLOYEES = 500;

const PLATFORM_ITEMS = [
  {
    tint: "tint-emerald",
    title: "Attendance Management",
    desc: "Track attendance with geo-location",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
  {
    tint: "tint-violet",
    title: "Leave Management",
    desc: "Apply, approve and track leaves",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </>
    ),
  },
  {
    tint: "tint-amber",
    title: "Payroll Processing",
    desc: "PF, ESI, TDS and gratuity, automated",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  },
  {
    tint: "tint-sky",
    title: "Employee Database",
    desc: "Centralized and searchable records",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
      </>
    ),
  },
  {
    tint: "tint-rose",
    title: "Reports & Analytics",
    desc: "Insights for smarter decisions",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <rect x="7" y="12" width="3" height="5" />
        <rect x="12" y="8" width="3" height="9" />
        <rect x="17" y="5" width="3" height="12" />
      </>
    ),
  },
  {
    tint: "tint-indigo",
    title: "Compliance Made Simple",
    desc: "Stay audit-ready always",
    icon: (
      <>
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
];

function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function PricingCalculator() {
  const [employees, setEmployees] = useState(25);
  const [includeGst, setIncludeGst] = useState(true);

  function clamp(value: number): number {
    if (Number.isNaN(value)) return MIN_EMPLOYEES;
    return Math.min(Math.max(Math.round(value), MIN_EMPLOYEES), MAX_EMPLOYEES);
  }

  const monthlyBase = employees * PRICE_PER_USER;
  const annualBase = monthlyBase * 12;
  const monthlyTotal = includeGst ? monthlyBase * (1 + GST_RATE) : monthlyBase;
  const annualTotal = includeGst ? annualBase * (1 + GST_RATE) : annualBase;
  const annualSavings = Math.max(monthlyTotal * 12 - annualTotal, 0);

  return (
    <div className="pricing-calc-v2">
      <div className="pricing-calc-v2-doodle pricing-calc-v2-doodle-right">
        Smarter HR
        <br />
        Happier Teams
      </div>

      <div className="pricing-calc-v2-head">
        <span className="eyebrow" style={{ margin: "0 auto 16px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
          </svg>
          Cost Calculator
        </span>
        <h2 style={{ fontSize: "clamp(28px, 3.6vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 12px" }}>
          How much will <span className="accent">Meagle 360</span> cost you?
        </h2>
        <p style={{ fontSize: 18 }}>
          Drag the slider or enter the number of employees to get an instant estimate.
          <br />
          Simple pricing. Everything included.
        </p>
      </div>

      <div className="pricing-calc-v2-card">
        <div className="pricing-calc-v2-doodle pricing-calc-v2-doodle-left">
          Right
          <br />
          Size
          <br />
          Right
          <br />
          Price
          <svg className="pricing-calc-v2-doodle-arrow" width="60" height="50" viewBox="0 0 60 50" fill="none">
            <path d="M4 4C10 24 24 38 52 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M40 40l14 4-6-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        <div className="pricing-calc-v2-left">
          <div className="pricing-calc-slider-row">
            <label htmlFor="employee-count">
              Number of employees
              <span className="pricing-calc-info-ico" title="Move the slider or type a number directly">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </span>
            </label>
          </div>

          <div className="pricing-calc-input-row">
            <input
              type="range"
              min={MIN_EMPLOYEES}
              max={MAX_EMPLOYEES}
              step={1}
              value={employees}
              onChange={(e) => setEmployees(clamp(Number(e.target.value)))}
              className="pricing-calc-slider"
              aria-label="Number of employees"
            />
            <input
              type="number"
              min={MIN_EMPLOYEES}
              max={MAX_EMPLOYEES}
              value={employees}
              onChange={(e) => setEmployees(clamp(Number(e.target.value)))}
              onBlur={(e) => setEmployees(clamp(Number(e.target.value)))}
              className="pricing-calc-number-input"
              aria-label="Enter number of employees"
            />
          </div>
          <div className="pricing-calc-slider-scale">
            <span>1</span>
            <span>500+</span>
          </div>

          <label className="pricing-calc-gst-toggle">
            <input
              type="checkbox"
              checked={includeGst}
              onChange={(e) => setIncludeGst(e.target.checked)}
            />
            <span className="pricing-calc-gst-switch" aria-hidden="true"></span>
            Include GST (18%)
          </label>

          <div className="pricing-calc-results">
            <div className="pricing-calc-result-card">
              <div className="pricing-calc-result-icon tint-indigo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <span className="pricing-calc-result-label">Monthly cost</span>
              <span className="pricing-calc-result-value">
                <span className="cur">₹</span>
                {formatINR(monthlyTotal)}
              </span>
              <span className="pricing-calc-result-note">
                {includeGst ? "Incl. 18% GST" : "Excl. GST"}
              </span>
            </div>
            <div className="pricing-calc-result-card">
              <div className="pricing-calc-result-icon tint-indigo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <rect x="7" y="12" width="3" height="5" />
                  <rect x="12" y="8" width="3" height="9" />
                  <rect x="17" y="5" width="3" height="12" />
                </svg>
              </div>
              <span className="pricing-calc-result-label">Annual cost</span>
              <span className="pricing-calc-result-value">
                <span className="cur">₹</span>
                {formatINR(annualTotal)}
              </span>
              <span className="pricing-calc-result-note">
                {includeGst ? "Incl. 18% GST" : "Excl. GST"}
              </span>
              <span className="pricing-calc-savings-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20.59 13.41L11 3.83A2 2 0 009.59 3.24L3 3v6.59a2 2 0 00.59 1.42l9.58 9.58a2 2 0 002.83 0l4.59-4.59a2 2 0 000-2.83z" />
                  <circle cx="7.5" cy="7.5" r="1.5" />
                </svg>
                You save ₹{formatINR(annualSavings)} vs monthly
              </span>
            </div>
          </div>

          <a href="/demo" className="btn btn-primary btn-block" onClick={triggerRipple}>
            Start Free Trial
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <p className="pricing-calc-trust-line">
            No credit card required&nbsp;&nbsp;|&nbsp;&nbsp;Full access&nbsp;&nbsp;|&nbsp;&nbsp;Setup in minutes
          </p>
        </div>

        <div className="pricing-calc-v2-right">
          <h3>One Platform for All Your HR Needs</h3>
          <p>Transparent pricing. No hidden charges.</p>
          <ul className="pricing-calc-feature-list">
            {PLATFORM_ITEMS.map((item) => (
              <li key={item.title}>
                <div className={`icon-badge ${item.tint}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
