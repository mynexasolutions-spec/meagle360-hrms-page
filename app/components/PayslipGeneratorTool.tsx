"use client";

import { useRef, useState } from "react";

type LineItem = { id: string; label: string; amount: string };

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `item-${idCounter}-${Date.now()}`;
}

const DEFAULT_EARNINGS: LineItem[] = [
  { id: nextId(), label: "Basic", amount: "0" },
  { id: nextId(), label: "House Rent Allowance", amount: "0" },
];

const DEFAULT_DEDUCTIONS: LineItem[] = [
  { id: nextId(), label: "Income Tax", amount: "0" },
  { id: nextId(), label: "Provident Fund", amount: "0" },
];

function toNumber(v: string): number {
  if (!v) return 0;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

function formatINR(n: number): string {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

function formatPayPeriod(monthValue: string): string {
  if (!monthValue) return "";
  const [year, month] = monthValue.split("-").map(Number);
  if (!year || !month) return monthValue;
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatDate(dateValue: string): string {
  if (!dateValue) return "";
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return dateValue;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function PayslipGeneratorTool() {
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [cityPincode, setCityPincode] = useState("");
  const [country, setCountry] = useState("India");
  const [logo, setLogo] = useState<string | null>(null);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [payPeriod, setPayPeriod] = useState(() => new Date().toISOString().slice(0, 7));
  const [paidDays, setPaidDays] = useState("");
  const [lopDays, setLopDays] = useState("0");
  const [paymentDate, setPaymentDate] = useState("");

  const [earnings, setEarnings] = useState<LineItem[]>(DEFAULT_EARNINGS);
  const [deductions, setDeductions] = useState<LineItem[]>(DEFAULT_DEDUCTIONS);

  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const employeeNameRef = useRef<HTMLInputElement>(null);

  const totalEarnings = earnings.reduce((sum, e) => sum + toNumber(e.amount), 0);
  const totalDeductions = deductions.reduce((sum, d) => sum + toNumber(d.amount), 0);
  const netPay = totalEarnings - totalDeductions;

  function updateItem(
    list: LineItem[],
    setList: (v: LineItem[]) => void,
    id: string,
    field: "label" | "amount",
    value: string,
  ) {
    setList(list.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  }

  function addItem(list: LineItem[], setList: (v: LineItem[]) => void) {
    setList([...list, { id: nextId(), label: "", amount: "0" }]);
  }

  function handleLogoUpload(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Logo must be an image file.");
      return;
    }
    if (file.size > 1024 * 1024) {
      setError("Logo must be under 1MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleReset() {
    setCompanyName("");
    setCompanyAddress("");
    setCityPincode("");
    setCountry("India");
    setLogo(null);
    setEmployeeName("");
    setEmployeeId("");
    setPayPeriod("");
    setPaidDays("");
    setLopDays("0");
    setPaymentDate("");
    setEarnings(DEFAULT_EARNINGS);
    setDeductions(DEFAULT_DEDUCTIONS);
    setError("");
  }

  async function handleDownload() {
    if (!companyName.trim()) {
      setError("Company name is required before downloading.");
      companyNameRef.current?.focus();
      return;
    }
    if (!employeeName.trim()) {
      setError("Employee name is required before downloading.");
      employeeNameRef.current?.focus();
      return;
    }
    if (!previewRef.current) return;
    setDownloading(true);
    setError("");
    
    // Make the hidden preview briefly visible for html2canvas
    const el = previewRef.current;
    el.style.display = "block";

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new jsPDF({
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
      const fileName = `payslip-${employeeName.trim().replace(/\s+/g, "-").toLowerCase()}-${payPeriod || "slip"}.pdf`;
      pdf.save(fileName);
    } catch {
      setError("Couldn't generate the PDF. Please try again.");
    } finally {
      el.style.display = "none";
      setDownloading(false);
    }
  }

  return (
    <div className="payslip-tool-v3">
      {/* Header section */}
      <div className="payslip-header-info-v3">
        <div className="payslip-header-text-v3">
          <h2>Payslip Information</h2>
          <p style={{ fontSize: '1.1rem' }}>Enter the details below to generate professional payslips instantly.</p>
        </div>
      </div>

      <div className="payslip-card-wrapper-v3">
        {/* Card 1: Company Details */}
        <div className="payslip-card-v3">
          <div className="company-top-row-v3">
            <div className="upload-logo-box-v3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoUpload(e.target.files?.[0])}
                id="logo-upload-v3"
              />
              {logo ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo} alt="Company Logo" style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 8, border: '1px solid #e2e8f0' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>Logo Uploaded</span>
                    <label htmlFor="logo-upload-v3" style={{ fontSize: 13, color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }}>
                      Change Logo
                    </label>
                  </div>
                </div>
              ) : (
                <label htmlFor="logo-upload-v3" className="upload-logo-label-v3">
                  <span className="upload-icon-circle-v3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                  </span>
                  <div className="upload-text-v3">
                    <strong>Upload Logo</strong>
                    <span>240 x 240 pixels @ 72 DPI,<br />Maximum size of 1MB.</span>
                  </div>
                </label>
              )}
            </div>
            <div className="payslip-month-box-v3">
              <span className="month-label-v3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                Payslip For the Month
              </span>
              <div 
                className="month-input-wrapper-v3" 
                style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', position: 'relative' }}
                onClick={() => {
                  try {
                    document.getElementById('month-picker-hidden')?.showPicker();
                  } catch (e) {
                    document.getElementById('month-picker-hidden')?.focus();
                  }
                }}
              >
                <strong style={{ fontSize: '20px', color: 'var(--primary)' }}>
                  {payPeriod ? formatPayPeriod(payPeriod) : "Select Month"}
                </strong>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, color: 'var(--primary)' }}><polyline points="6 9 12 15 18 9"/></svg>
                <input
                  id="month-picker-hidden"
                  type="month"
                  value={payPeriod}
                  onChange={(e) => setPayPeriod(e.target.value)}
                  style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
                />
              </div>
            </div>
          </div>
          <div className="company-form-grid-v3">
            <div className="input-group-v3">
              <label>Company Name <span className="req-star">*</span></label>
              <input ref={companyNameRef} type="text" className="input-box-v3" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter company name" />
            </div>
            <div className="input-group-v3">
              <label>Company Address</label>
              <input type="text" className="input-box-v3" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} placeholder="Enter company address" />
            </div>
            <div className="input-group-v3">
              <label>City, Pincode</label>
              <input type="text" className="input-box-v3" value={cityPincode} onChange={(e) => setCityPincode(e.target.value)} placeholder="Enter city and pincode" />
            </div>
            <div className="input-group-v3 select-wrapper-v3">
              <div className="country-select-v3">
                <span>🇮🇳 India</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, color: '#999' }}><path d="M6 9l6 6 6-6" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Employee Pay Summary */}
        <div className="payslip-card-v3">
          <div className="card-header-v3">
            <div className="icon-square-v3 tint-primary-light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            </div>
            <h3>Employee Pay Summary <span className="req-star">*</span></h3>
          </div>
          <div className="employee-grid-v3">
            <div className="input-group-v3">
              <label>Employee Name</label>
              <div className="input-with-icon-v3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                <input ref={employeeNameRef} type="text" className="input-box-v3" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} placeholder="Eg: Meera Krishnan" />
              </div>
            </div>
            <div className="input-group-v3">
              <label>Employee ID</label>
              <div className="input-with-icon-v3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                <input type="text" className="input-box-v3" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Eg: 1234" />
              </div>
            </div>
            <div className="input-group-v3">
              <label>Pay Period</label>
              <div className="input-with-icon-v3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <input type="month" className="input-box-v3" value={payPeriod} onChange={(e) => setPayPeriod(e.target.value)} placeholder="---------, ----" />
              </div>
            </div>
            <div className="input-group-v3">
              <label>Paid Days</label>
              <div className="input-with-icon-v3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <input type="number" className="input-box-v3" value={paidDays} onChange={(e) => setPaidDays(e.target.value)} placeholder="Eg: 22" />
              </div>
            </div>
            <div className="input-group-v3">
              <label>Loss of Pay Days</label>
              <div className="input-with-icon-v3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /><path d="M12 7l4-4" /></svg>
                <input type="number" className="input-box-v3" value={lopDays} onChange={(e) => setLopDays(e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="input-group-v3">
              <label>Pay Date</label>
              <div className="input-with-icon-v3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <input type="date" className="input-box-v3" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} placeholder="dd-mm-yyyy" />
              </div>
            </div>
          </div>
          <button type="button" className="btn-link-v3" style={{ marginTop: 16 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
            Add another field
          </button>
        </div>

        {/* Card 3: Income Details */}
        <div className="payslip-card-v3">
          <div className="card-header-v3">
            <div className="icon-square-v3 tint-primary-light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <h3>Income Details <span className="req-star">*</span></h3>
          </div>
          
          <div className="income-grid-v3">
            <div className="income-col-box-v3">
              <div className="income-col-header-v3">
                <div className="income-title-v3">
                  <div className="icon-circle-sm-v3 tint-emerald-light">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                  </div>
                  <h4>Earnings</h4>
                </div>
                <span className="income-amount-label">Amount</span>
              </div>
              <div className="income-col-body-v3">
                {earnings.map(item => (
                  <div className="income-row-v3" key={item.id}>
                    <input type="text" className="input-noborder-v3" value={item.label} onChange={(e) => updateItem(earnings, setEarnings, item.id, "label", e.target.value)} />
                    <input type="number" className="input-box-v3 text-right" value={item.amount} onChange={(e) => updateItem(earnings, setEarnings, item.id, "amount", e.target.value)} />
                  </div>
                ))}
                <button type="button" className="btn-dashed-v3" onClick={() => addItem(earnings, setEarnings)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                  Add Earnings
                </button>
              </div>
              <div className="income-col-footer-v3 tint-primary-lightest">
                <span>Gross Earnings</span>
                <strong>₹{formatINR(totalEarnings)}</strong>
              </div>
            </div>

            <div className="income-col-box-v3">
              <div className="income-col-header-v3">
                <div className="income-title-v3">
                  <div className="icon-circle-sm-v3 tint-rose-light">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                  </div>
                  <h4>Deductions</h4>
                </div>
                <span className="income-amount-label">Amount</span>
              </div>
              <div className="income-col-body-v3">
                {deductions.map(item => (
                  <div className="income-row-v3" key={item.id}>
                    <input type="text" className="input-noborder-v3" value={item.label} onChange={(e) => updateItem(deductions, setDeductions, item.id, "label", e.target.value)} />
                    <input type="number" className="input-box-v3 text-right" value={item.amount} onChange={(e) => updateItem(deductions, setDeductions, item.id, "amount", e.target.value)} />
                  </div>
                ))}
                <button type="button" className="btn-dashed-v3" onClick={() => addItem(deductions, setDeductions)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                  Add Deductions
                </button>
              </div>
              <div className="income-col-footer-v3 tint-primary-lightest">
                <span>Total Deductions</span>
                <strong>₹{formatINR(totalDeductions)}</strong>
              </div>
            </div>
          </div>

          <div className="net-payable-box-v3">
            <div className="net-payable-text-v3">
              <h4>Total Net Payable</h4>
              <p>Gross Earnings - Total Deductions</p>
            </div>
            <div className="net-payable-amount-v3">
              ₹{formatINR(netPay)}
            </div>
          </div>
          <div className="amount-in-words-v3">
            Amount in words : 
          </div>
        </div>
      </div>

      {error && <p className="payslip-error-v3">{error}</p>}

      <div className="payslip-actions-v3">
        <button type="button" className="btn btn-primary" onClick={handleDownload} disabled={downloading}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, marginRight: 8 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
          {downloading ? "Generating..." : "Generate Payslip"}
        </button>
        <button type="button" className="btn btn-outline" onClick={handleReset} style={{ background: '#fff', border: '1px solid #e2e8f0', color: '#111', fontWeight: 600 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, marginRight: 8 }}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
          Reset
        </button>
      </div>

      {/* Hidden layout for PDF generation */}
      <div className="payslip-preview-hidden-v2" ref={previewRef} style={{ display: 'none' }}>
        <div className="payslip-preview" style={{ padding: "40px", backgroundColor: "#fff", width: "800px" }}>
          <div className="payslip-preview-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="Company logo" style={{ maxHeight: "60px", maxWidth: "200px" }} />
            ) : (
              <div style={{ width: "60px", height: "60px", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "bold" }}>
                {(companyName || "C").charAt(0).toUpperCase()}
              </div>
            )}
            <div style={{ textAlign: "right" }}>
              <strong style={{ fontSize: "18px", display: "block" }}>{companyName || "Your Company Name"}</strong>
              {companyAddress && <p style={{ margin: "4px 0 0", color: "#666" }}>{companyAddress}</p>}
              {cityPincode && <p style={{ margin: "4px 0 0", color: "#666" }}>{cityPincode}</p>}
              {country && <p style={{ margin: "4px 0 0", color: "#666" }}>{country}</p>}
            </div>
          </div>
          <h4 style={{ textAlign: "center", fontSize: "20px", margin: "0 0 20px" }}>Payslip{payPeriod ? ` for ${formatPayPeriod(payPeriod)}` : ""}</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "30px", background: "#f9fafb", padding: "20px", borderRadius: "8px" }}>
            <div><span style={{ color: "#666", width: "120px", display: "inline-block" }}>Employee Name</span><strong>{employeeName || "—"}</strong></div>
            {employeeId && <div><span style={{ color: "#666", width: "120px", display: "inline-block" }}>Employee ID</span><strong>{employeeId}</strong></div>}
            {paidDays && <div><span style={{ color: "#666", width: "120px", display: "inline-block" }}>Paid Days</span><strong>{paidDays}</strong></div>}
            {lopDays && <div><span style={{ color: "#666", width: "120px", display: "inline-block" }}>LOP Days</span><strong>{lopDays}</strong></div>}
            {paymentDate && <div><span style={{ color: "#666", width: "120px", display: "inline-block" }}>Payment Date</span><strong>{formatDate(paymentDate)}</strong></div>}
          </div>

          <div style={{ display: "flex", gap: "24px", marginBottom: "30px" }}>
            <div style={{ flex: 1 }}>
              <h5 style={{ borderBottom: "2px solid #eee", paddingBottom: "8px", margin: "0 0 12px" }}>Earnings</h5>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {earnings.filter(e => e.label || toNumber(e.amount) > 0).map((e) => (
                    <tr key={e.id}><td style={{ padding: "8px 0" }}>{e.label || "Untitled"}</td><td style={{ textAlign: "right", padding: "8px 0" }}>₹{formatINR(toNumber(e.amount))}</td></tr>
                  ))}
                  <tr style={{ fontWeight: "bold", borderTop: "1px solid #eee" }}><td style={{ padding: "12px 0 0" }}>Gross Earnings</td><td style={{ textAlign: "right", padding: "12px 0 0" }}>₹{formatINR(totalEarnings)}</td></tr>
                </tbody>
              </table>
            </div>
            <div style={{ flex: 1 }}>
              <h5 style={{ borderBottom: "2px solid #eee", paddingBottom: "8px", margin: "0 0 12px" }}>Deductions</h5>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {deductions.filter(d => d.label || toNumber(d.amount) > 0).map((d) => (
                    <tr key={d.id}><td style={{ padding: "8px 0" }}>{d.label || "Untitled"}</td><td style={{ textAlign: "right", padding: "8px 0" }}>₹{formatINR(toNumber(d.amount))}</td></tr>
                  ))}
                  <tr style={{ fontWeight: "bold", borderTop: "1px solid #eee" }}><td style={{ padding: "12px 0 0" }}>Total Deductions</td><td style={{ textAlign: "right", padding: "12px 0 0" }}>₹{formatINR(totalDeductions)}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f9fafb", padding: "20px", borderRadius: "8px" }}>
            <span style={{ fontSize: "16px", fontWeight: "600" }}>Net Pay</span>
            <strong style={{ fontSize: "24px" }}>₹{formatINR(netPay)}</strong>
          </div>
          <p style={{ textAlign: "center", color: "#888", fontSize: "12px", marginTop: "40px" }}>This is a computer-generated payslip and does not require a signature.</p>
        </div>
      </div>
    </div>
  );
}
