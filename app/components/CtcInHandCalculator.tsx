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
    <div className="ctc-calc-v4-container">
      <div className="ctc-calc-v4-grid-top">
        {/* Top Left: Inputs */}
        <div className="ctc-calc-v4-card">
          <div className="card-header-v3" style={{ marginBottom: 24 }}>
            <div className="icon-square-v3 tint-primary-light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0f172a' }}>Your CTC Details</h3>
          </div>

          <div className="ctc-v4-inputs-row">
            <div className="input-group-v3" style={{ flex: 1 }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Annual CTC (₹) <span className="req-star" style={{ color: '#ef4444' }}>*</span></label>
              <input
                type="number"
                min="0"
                className="input-box-v3"
                value={ctcInput}
                onChange={(e) => setCtcInput(e.target.value)}
                placeholder="e.g. 600000"
                style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1' }}
              />
            </div>
            
            <div className="input-group-v3" style={{ flex: 1 }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Basic Salary (% of CTC)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="input-box-v3"
                  value={basicPct}
                  onChange={(e) => setBasicPct(Number(e.target.value))}
                  style={{ padding: '10px 12px', paddingRight: 32, borderRadius: 6, border: '1px solid #cbd5e1', width: '100%' }}
                />
                <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>%</span>
              </div>
            </div>
          </div>

          <label className="pricing-calc-gst-toggle" style={{ marginTop: 24, fontSize: '0.9rem', color: '#1e293b' }}>
            <input
              type="checkbox"
              checked={ptEnabled}
              onChange={(e) => setPtEnabled(e.target.checked)}
            />
            <span className="pricing-calc-gst-switch" aria-hidden="true" style={{ zoom: 0.9 }}></span>
            Professional Tax applies (₹200/month)
          </label>
        </div>

        {/* Top Right: Summary */}
        <div className="ctc-calc-v4-card ctc-v4-summary-card">
          <div className="ctc-v4-summary-left">
            <div className="ctc-v4-summary-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>
            </div>
            <div>
              <div className="ctc-v4-summary-label" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>Annual CTC</div>
              <div className="ctc-v4-summary-value" style={{ color: 'var(--primary)', fontSize: '1.8rem', fontWeight: 700 }}>₹{formatINR(ctc)}</div>
            </div>
          </div>
          <div className="ctc-v4-summary-divider"></div>
          <div className="ctc-v4-summary-right">
            <div className="ctc-v4-summary-label" style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500, marginBottom: 2 }}>Basic Salary ({basicPct}% of CTC)</div>
            <div className="ctc-v4-summary-value" style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 600, marginBottom: 12 }}>₹{formatINR(b.basic)}</div>
            
            <div className="ctc-v4-summary-label" style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500, marginBottom: 2 }}>Monthly In-Hand Salary</div>
            <div className="ctc-v4-summary-value" style={{ color: 'var(--primary)', fontSize: '1.4rem', fontWeight: 700 }}>₹{formatINR(b.inHandMonthly)}</div>
            
            <div style={{ color: 'var(--primary)', fontSize: '0.8rem', marginTop: 8, fontWeight: 600 }}>See breakdown below ↓</div>
          </div>
        </div>
      </div>

      <div className="ctc-calc-v4-grid-bottom">
        {/* Bottom Left: CTC Breakdown */}
        <div className="ctc-calc-v4-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          <div className="card-header-v3" style={{ padding: '24px 24px 20px' }}>
            <div className="icon-square-v3 tint-primary-light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0f172a' }}>Annual CTC Breakdown</h3>
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 24px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" style={{ width: 14, height: 14 }}><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a' }}>Components</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Annual Amount</span>
            </div>
            
            <div style={{ padding: '0 24px', flex: 1 }}>
              <div className="ctc-result-row" style={{ fontSize: '0.95rem', padding: '16px 0', borderBottom: '1px dashed #e2e8f0' }}><span style={{ color: '#475569' }}>Basic Salary</span><strong style={{ color: '#0f172a' }}>₹{formatINR(b.basic)}</strong></div>
              <div className="ctc-result-row" style={{ fontSize: '0.95rem', padding: '16px 0', borderBottom: '1px dashed #e2e8f0' }}><span style={{ color: '#475569' }}>House Rent Allowance (HRA)</span><strong style={{ color: '#0f172a' }}>₹{formatINR(b.hra)}</strong></div>
              <div className="ctc-result-row" style={{ fontSize: '0.95rem', padding: '16px 0', borderBottom: '1px dashed #e2e8f0' }}><span style={{ color: '#475569' }}>Special Allowance</span><strong style={{ color: '#0f172a' }}>₹{formatINR(b.specialAllowance)}</strong></div>
              <div className="ctc-result-row" style={{ fontSize: '0.95rem', padding: '16px 0', borderBottom: '1px dashed #e2e8f0' }}><span style={{ color: '#475569' }}>Employer PF Contribution</span><strong style={{ color: '#0f172a' }}>₹{formatINR(b.employerPF)}</strong></div>
              <div className="ctc-result-row" style={{ fontSize: '0.95rem', padding: '16px 0' }}><span style={{ color: '#475569' }}>Gratuity (accrued)</span><strong style={{ color: '#0f172a' }}>₹{formatINR(b.gratuity)}</strong></div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 600 }}>Total CTC</span>
              <strong style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 700 }}>₹{formatINR(ctc)}</strong>
            </div>
          </div>
        </div>

        {/* Bottom Right: In-Hand Breakdown */}
        <div className="ctc-calc-v4-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          <div className="card-header-v3" style={{ padding: '24px 24px 20px' }}>
            <div className="icon-square-v3 tint-primary-light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0f172a' }}>Monthly In-Hand Breakdown</h3>
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 24px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" style={{ width: 14, height: 14 }}><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a' }}>Deductions</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Monthly Amount</span>
            </div>
            
            <div style={{ padding: '0 24px', flex: 1 }}>
              <div className="ctc-result-row" style={{ fontSize: '0.95rem', padding: '16px 0', borderBottom: '1px dashed #e2e8f0' }}><span style={{ color: '#475569' }}>Gross Monthly Salary</span><strong style={{ color: '#0f172a' }}>₹{formatINR(b.grossMonthly)}</strong></div>
              <div className="ctc-result-row" style={{ fontSize: '0.95rem', padding: '16px 0', borderBottom: '1px dashed #e2e8f0' }}><span style={{ color: '#64748b' }}>Employee PF (12% of Basic)</span><strong style={{ color: '#0f172a' }}>− ₹{formatINR(b.employeePfMonthly)}</strong></div>
              <div className="ctc-result-row" style={{ fontSize: '0.95rem', padding: '16px 0', borderBottom: '1px dashed #e2e8f0' }}><span style={{ color: '#64748b' }}>Professional Tax</span><strong style={{ color: '#0f172a' }}>− ₹{formatINR(b.professionalTaxMonthly)}</strong></div>
              <div className="ctc-result-row" style={{ fontSize: '0.95rem', padding: '16px 0' }}><span style={{ color: '#64748b' }}>Estimated TDS (New Regime)</span><strong style={{ color: '#0f172a' }}>− ₹{formatINR(b.monthlyTds)}</strong></div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 600 }}>Total Deductions</span>
              <strong style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 700 }}>₹{formatINR(b.totalMonthlyDeductions)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="ctc-calc-v4-footer">
        <div className="ctc-calc-v4-footer-inner" style={{ background: '#f5f3ff', borderRadius: 12, padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 700, margin: 0, marginBottom: 4 }}>Monthly In-Hand Salary</h4>
            <p style={{ color: 'var(--primary)', opacity: 0.8, fontSize: '0.85rem', margin: 0 }}>Gross Monthly - Total Deductions</p>
          </div>
          <div style={{ color: 'var(--primary)', fontSize: '2.5rem', fontWeight: 700 }}>
            ₹{formatINR(b.inHandMonthly)}
          </div>
        </div>
        <div style={{ textAlign: 'right', marginTop: 12, fontSize: '0.85rem', color: '#64748b', fontWeight: 500, paddingRight: 8 }}>
          Annual In-hand: ₹{formatINR(b.inHandAnnual)}
        </div>
      </div>
    </div>
  );
}
