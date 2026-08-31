"use client";

import { useState } from "react";

const STANDARD_DEDUCTION = 75000;
const PT_MONTHLY = 200;

// New Tax Regime slabs, FY 2025-26 / FY 2026-27 (unchanged) — same figures used
// in the site's income-tax-on-salary-new-vs-old-regime blog post, kept in sync.
const SLABS: [number, number][] = [
  [400000, 0],
  [800000, 0.05],
  [1200000, 0.1],
  [1600000, 0.15],
  [2000000, 0.2],
  [2400000, 0.25],
  [Infinity, 0.3],
];

function formatINR(n: number): string {
  return Math.round(n).toLocaleString("en-IN");
}

function estimateAnnualTax(taxableIncome: number): number {
  if (taxableIncome <= 1200000) return 0; // Section 87A rebate
  let tax = 0;
  let prevLimit = 0;
  for (const [limit, rate] of SLABS) {
    if (taxableIncome <= prevLimit) break;
    const slabAmount = Math.min(taxableIncome, limit) - prevLimit;
    tax += slabAmount * rate;
    prevLimit = limit;
  }
  return tax * 1.04; // 4% Health & Education Cess
}

function computeBreakdown(ctc: number, basicPct: number, ptEnabled: boolean) {
  const basic = ctc * (basicPct / 100);
  const hra = basic * 0.5;
  const employerPF = basic * 0.12;
  const gratuity = basic * (15 / (26 * 12)); // statutory accrual: 15 days' basic per year, 26-day month
  const specialAllowance = Math.max(ctc - basic - hra - employerPF - gratuity, 0);

  const grossAnnual = basic + hra + specialAllowance;
  const grossMonthly = grossAnnual / 12;
  const employeePfMonthly = (basic * 0.12) / 12;
  const professionalTaxMonthly = ptEnabled ? PT_MONTHLY : 0;

  const taxableIncome = Math.max(grossAnnual - STANDARD_DEDUCTION, 0);
  const annualTax = estimateAnnualTax(taxableIncome);
  const monthlyTds = annualTax / 12;

  const totalMonthlyDeductions = employeePfMonthly + professionalTaxMonthly + monthlyTds;
  const inHandMonthly = grossMonthly - totalMonthlyDeductions;
  const inHandAnnual = inHandMonthly * 12;

  return {
    basic,
    hra,
    employerPF,
    gratuity,
    specialAllowance,
    grossAnnual,
    grossMonthly,
    employeePfMonthly,
    professionalTaxMonthly,
    monthlyTds,
    totalMonthlyDeductions,
    inHandMonthly,
    inHandAnnual,
  };
}

const DEFAULT_CTC = 600000;
const DEFAULT_BASIC_PCT = 40;

export function CtcInHandCalculator() {
  const [ctcInput, setCtcInput] = useState(String(DEFAULT_CTC));
  const [basicPct, setBasicPct] = useState(DEFAULT_BASIC_PCT);
  const [ptEnabled, setPtEnabled] = useState(true);

  const ctc = Math.max(parseFloat(ctcInput) || 0, 0);
  const b = computeBreakdown(ctc, basicPct, ptEnabled);

  function handleReset() {
    setCtcInput(String(DEFAULT_CTC));
    setBasicPct(DEFAULT_BASIC_PCT);
    setPtEnabled(true);
  }

  return (
    <div className="payslip-tool-v3">
      <div className="payslip-header-info-v3">
        <div className="payslip-header-text-v3">
          <h2>CTC to In-Hand Salary Calculator</h2>
          <p style={{ fontSize: "1.1rem" }}>
            Enter your annual CTC to see your estimated monthly take-home — updates instantly as you adjust.
          </p>
        </div>
      </div>

      <div className="payslip-card-wrapper-v3">
        {/* Card 1: CTC Input */}
        <div className="payslip-card-v3">
          <div className="card-header-v3">
            <div className="icon-square-v3 tint-primary-light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
            </div>
            <h3>Your CTC Details</h3>
          </div>

          <div className="input-group-v3">
            <label>Annual CTC (₹) <span className="req-star">*</span></label>
            <input
              type="number"
              min="0"
              className="input-box-v3"
              value={ctcInput}
              onChange={(e) => setCtcInput(e.target.value)}
              placeholder="e.g. 900000"
            />
          </div>

          <div className="pricing-calc-slider-row" style={{ marginTop: 24 }}>
            <label htmlFor="basic-pct">Basic Salary (% of CTC)</label>
            <div className="pricing-calc-slider-value">{basicPct}%</div>
          </div>
          <input
            id="basic-pct"
            type="range"
            min={30}
            max={60}
            step={1}
            value={basicPct}
            onChange={(e) => setBasicPct(Number(e.target.value))}
            className="pricing-calc-slider"
            aria-label="Basic salary as a percentage of CTC"
          />
          <div className="pricing-calc-slider-scale">
            <span>30%</span>
            <span>60%</span>
          </div>

          <label className="pricing-calc-gst-toggle" style={{ marginTop: 24 }}>
            <input
              type="checkbox"
              checked={ptEnabled}
              onChange={(e) => setPtEnabled(e.target.checked)}
            />
            <span className="pricing-calc-gst-switch" aria-hidden="true"></span>
            Professional Tax applies (₹200/month)
          </label>
        </div>

        {/* Card 2: CTC Breakdown */}
        <div className="payslip-card-v3">
          <div className="card-header-v3">
            <div className="icon-square-v3 tint-primary-light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>
            </div>
            <h3>Annual CTC Breakdown</h3>
          </div>
          <div className="income-col-box-v3">
            <div className="income-col-header-v3">
              <div className="income-title-v3">
                <div className="icon-circle-sm-v3 tint-emerald-light">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                </div>
                <h4>Components</h4>
              </div>
              <span className="income-amount-label">Annual Amount</span>
            </div>
            <div className="income-col-body-v3">
              <div className="ctc-result-row"><span>Basic Salary</span><strong>₹{formatINR(b.basic)}</strong></div>
              <div className="ctc-result-row"><span>House Rent Allowance (HRA)</span><strong>₹{formatINR(b.hra)}</strong></div>
              <div className="ctc-result-row"><span>Special Allowance</span><strong>₹{formatINR(b.specialAllowance)}</strong></div>
              <div className="ctc-result-row"><span>Employer PF Contribution</span><strong>₹{formatINR(b.employerPF)}</strong></div>
              <div className="ctc-result-row"><span>Gratuity (accrued)</span><strong>₹{formatINR(b.gratuity)}</strong></div>
            </div>
            <div className="income-col-footer-v3 tint-primary-lightest">
              <span>Total CTC</span>
              <strong>₹{formatINR(ctc)}</strong>
            </div>
          </div>
        </div>

        {/* Card 3: Monthly In-Hand */}
        <div className="payslip-card-v3">
          <div className="card-header-v3">
            <div className="icon-square-v3 tint-primary-light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>
            </div>
            <h3>Monthly In-Hand Breakdown</h3>
          </div>
          <div className="income-col-box-v3">
            <div className="income-col-header-v3">
              <div className="income-title-v3">
                <div className="icon-circle-sm-v3 tint-rose-light">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                </div>
                <h4>Deductions</h4>
              </div>
              <span className="income-amount-label">Monthly Amount</span>
            </div>
            <div className="income-col-body-v3">
              <div className="ctc-result-row"><span>Gross Monthly Salary</span><strong>₹{formatINR(b.grossMonthly)}</strong></div>
              <div className="ctc-result-row"><span>Employee PF (12% of Basic)</span><strong>− ₹{formatINR(b.employeePfMonthly)}</strong></div>
              <div className="ctc-result-row"><span>Professional Tax</span><strong>− ₹{formatINR(b.professionalTaxMonthly)}</strong></div>
              <div className="ctc-result-row"><span>Estimated TDS (New Regime)</span><strong>− ₹{formatINR(b.monthlyTds)}</strong></div>
            </div>
            <div className="income-col-footer-v3 tint-primary-lightest">
              <span>Total Deductions</span>
              <strong>₹{formatINR(b.totalMonthlyDeductions)}</strong>
            </div>
          </div>

          <div className="net-payable-box-v3" style={{ marginTop: 20 }}>
            <div className="net-payable-text-v3">
              <h4>Monthly In-Hand Salary</h4>
              <p>Gross Monthly − Total Deductions</p>
            </div>
            <div className="net-payable-amount-v3">₹{formatINR(b.inHandMonthly)}</div>
          </div>
          <div className="amount-in-words-v3">
            Annual in-hand: ₹{formatINR(b.inHandAnnual)}
          </div>
        </div>
      </div>

      <div className="payslip-actions-v3">
        <button type="button" className="btn btn-outline" onClick={handleReset} style={{ background: "#fff", border: "1px solid #e2e8f0", color: "var(--text-1)", fontWeight: 600 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, marginRight: 8 }}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
          Reset
        </button>
      </div>
      <p className="ctc-calc-disclaimer">
        Estimates use standard salary-structuring assumptions (Basic {basicPct}% of CTC, HRA 50% of Basic,
        employer PF 12% of Basic, statutory gratuity accrual) and New Tax Regime slabs for FY 2025-26. Actual
        figures depend on your employer&apos;s specific salary structure — see our{" "}
        <a href="/blog/ctc-vs-in-hand-salary">CTC vs In-Hand Salary guide</a> for the full formula.
      </p>
    </div>
  );
}
