"use client";

import { useState } from "react";
import { triggerRipple } from "../lib/ripple";

const PRICE_PER_USER = 149;
const GST_RATE = 0.18;

function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function PricingCalculator() {
  const [employees, setEmployees] = useState(25);
  const [includeGst, setIncludeGst] = useState(true);

  const monthlyBase = employees * PRICE_PER_USER;
  const annualBase = monthlyBase * 12;
  const monthlyTotal = includeGst ? monthlyBase * (1 + GST_RATE) : monthlyBase;
  const annualTotal = includeGst ? annualBase * (1 + GST_RATE) : annualBase;

  return (
    <div className="pricing-calc">
      <div className="pricing-calc-head">
        <span className="eyebrow" style={{ margin: "0 auto 12px" }}>
          Cost Calculator
        </span>
        <h2>How much will Meagle 360 cost you?</h2>
        <p style={{ fontSize: 18 }}>Drag the slider to match your team size.</p>
      </div>

      <div className="pricing-calc-slider-row">
        <label htmlFor="employee-count">Number of employees</label>
        <div className="pricing-calc-slider-value">{employees}</div>
      </div>
      <input
        id="employee-count"
        type="range"
        min={1}
        max={500}
        step={1}
        value={employees}
        onChange={(e) => setEmployees(Number(e.target.value))}
        className="pricing-calc-slider"
        aria-label="Number of employees"
      />
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
          <span className="pricing-calc-result-label">Annual cost</span>
          <span className="pricing-calc-result-value">
            <span className="cur">₹</span>
            {formatINR(annualTotal)}
          </span>
          <span className="pricing-calc-result-note">
            {includeGst ? "Incl. 18% GST" : "Excl. GST"}
          </span>
        </div>
      </div>

      <a href="/#demo" className="btn btn-primary btn-block" onClick={triggerRipple}>
        Start Free Trial
      </a>
    </div>
  );
}
