import type { Metadata } from "next";
import { SiteChrome } from "../../components/SiteChrome";
import { FaqAccordion } from "../../components/FaqAccordion";
import { CtcInHandCalculator } from "../../components/CtcInHandCalculator";

const TITLE = "CTC to In-Hand Salary Calculator — Free & Instant";
const DESCRIPTION =
  "Convert your CTC to in-hand salary instantly. Enter your annual CTC and get a full breakdown of Basic, HRA, PF, deductions, and your actual monthly take-home.";
const SITE_URL = "https://www.meagle360.com";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/tools/ctc-to-in-hand-calculator",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/tools/ctc-to-in-hand-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  keywords: [
    "CTC to in-hand salary calculator",
    "in hand salary calculator",
    "CTC calculator India",
    "take home salary calculator",
    "salary breakup calculator",
  ],
};

const STEPS = [
  { 
    title: "Enter your annual CTC", 
    desc: "The total cost-to-company figure from your offer letter",
    tint: "tint-primary",
    icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>
  },
  { 
    title: "It splits into components", 
    desc: "Basic, HRA, Special Allowance, employer PF, and gratuity, using standard structuring ratios",
    tint: "tint-emerald",
    icon: <><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></>
  },
  { 
    title: "Deductions are applied", 
    desc: "Employee PF (12% of Basic), Professional Tax, and estimated TDS",
    tint: "tint-rose",
    icon: <><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></>
  },
  { 
    title: "See your in-hand salary", 
    desc: "Both monthly and annual, alongside the full breakup",
    tint: "tint-amber",
    icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>
  },
];

const WHY_LOWER = [
  {
    tint: "tint-sky",
    title: "Employer's PF contribution",
    desc: "Goes into your retirement account, not your salary account — it never shows up in your monthly credit.",
    icon: <><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></>,
  },
  {
    tint: "tint-amber",
    title: "Gratuity",
    desc: "Accrues annually but is only paid out when you leave after 5+ years of service.",
    icon: <><path d="M20 6L9 17l-5-5" /></>,
  },
  {
    tint: "tint-violet",
    title: "Insurance & other benefits",
    desc: "Added to CTC as value, never paid out as cash in your monthly salary.",
    icon: <><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /></>,
  },
];

const USE_CASES = [
  {
    tint: "tint-indigo",
    title: "Job seekers",
    desc: "Compare two job offers on actual take-home pay, not just the headline CTC number, before deciding.",
    icon: <><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>,
  },
  {
    tint: "tint-emerald",
    title: "HR teams",
    desc: "Explain CTC breakups to candidates instantly during offer discussions, instead of building a spreadsheet each time.",
    icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
  },
  {
    tint: "tint-rose",
    title: "Founders & small business owners",
    desc: "Understand the real monthly cash outflow of a hire, and reverse-calculate the CTC needed to hit a target in-hand figure.",
    icon: <><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9v.01M9 13v.01M9 17v.01M15 9v.01M15 13v.01M15 17v.01" /></>,
  },
];

const FAQS = [
  {
    q: "How do I calculate in-hand salary from CTC?",
    a: "Subtract employer contributions (PF, gratuity, insurance) from your CTC to get gross salary, divide by 12 for the monthly figure, then subtract employee deductions like PF, professional tax, and TDS to get your in-hand salary.",
  },
  {
    q: "Why is my in-hand salary so much lower than my CTC?",
    a: "Because CTC includes components like employer PF contribution, gratuity, and insurance that are never paid out as monthly cash — only your actual gross salary minus deductions reaches your bank account.",
  },
  {
    q: "Is this calculator accurate for every company?",
    a: "It provides a close estimate based on standard salary structuring practices. Exact figures can vary slightly since companies structure CTC components (Basic %, HRA %, allowances) differently.",
  },
  {
    q: "Can HR teams use this to structure an offer?",
    a: "Yes, HR teams can use it to quickly show candidates what a given CTC translates to in monthly take-home, speeding up offer discussions.",
  },
  {
    q: "Does this calculator account for tax regime (old vs new)?",
    a: "It estimates TDS using the New Tax Regime slabs, which is the default regime since FY 2023-24. For an exact comparison against the Old Regime, see our dedicated income tax guide.",
  },
];

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Meagle 360 CTC to In-Hand Salary Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description: "Free online calculator to convert annual CTC into monthly in-hand salary with a full component breakdown.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools/ctc-to-in-hand-calculator` },
    { "@type": "ListItem", position: 3, name: "CTC to In-Hand Salary Calculator", item: `${SITE_URL}/tools/ctc-to-in-hand-calculator` },
  ],
};

export default function CtcToInHandCalculatorPage() {
  return (
    <SiteChrome>
      <section className="payslip-hero-v3" style={{ background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f9f0 100%)', textAlign: 'center' }}>
        <div className="container payslip-hero-v3-inner">
          <div className="payslip-hero-v3-card">
            <div className="hero-v3-card-content" style={{ flex: 1 }}>
              <h1 className="payslip-hero-v3-title" style={{ marginBottom: '24px' }}>
                CTC to In-Hand Salary Calculator
              </h1>
              <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.5 }}>
                Convert your CTC to in-hand salary instantly.<br/>Get a full breakdown of your actual monthly take-home.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <a href="#generator" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                  Calculate Now
                </a>
                <svg viewBox="0 0 100 50" fill="none" style={{ width: '60px', height: '30px', color: 'var(--primary)' }}>
                  <path d="M10 10 Q 50 10, 80 40 M 80 40 L 70 30 M 80 40 L 60 45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className="hero-v3-card-img" style={{ flex: 1 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ctc-to-in-hand.webp" alt="CTC Calculator Interface" style={{ width: '100%', maxWidth: '400px', display: 'block', margin: '0 auto' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section payslip-tool-section-v2" id="generator">
        <div className="container">
          <CtcInHandCalculator />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head" style={{ textAlign: "center", marginBottom: 48, marginLeft: "auto", marginRight: "auto" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>How It Works</span>
            <h2>How This Calculator Works</h2>
          </div>
          <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {STEPS.map((step, i) => (
              <div className="feature-card" key={step.title} style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 24, right: 24, fontSize: '4rem', fontWeight: 800, color: '#f1f5f9', zIndex: 0, lineHeight: 1 }}>{i + 1}</div>
                <div className={`icon-badge ${step.tint}`} style={{ position: 'relative', zIndex: 1, marginBottom: 20 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{step.icon}</svg>
                </div>
                <h3 style={{ position: 'relative', zIndex: 1, marginBottom: 12 }}>{step.title}</h3>
                <p style={{ position: 'relative', zIndex: 1, flex: 1 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" style={{ textAlign: "center", marginBottom: 48, marginLeft: "auto", marginRight: "auto" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>The Real Numbers</span>
            <h2>Why In-Hand Salary Is Always Lower Than CTC</h2>
            <p>Three components inflate CTC without ever touching your monthly bank credit.</p>
          </div>
          <div className="feature-grid feature-grid-3">
            {WHY_LOWER.map((item) => (
              <div className="feature-card" key={item.title}>
                <div className={`icon-badge ${item.tint}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", color: "var(--text-2)", fontSize: 16, maxWidth: 760, margin: "40px auto 0" }}>
            This is why a ₹9,00,000 CTC often results in roughly ₹54,000/month in-hand, not ₹75,000
            (₹9L ÷ 12) as many people initially assume. For the full formula and a worked example, see our{" "}
            <a href="/blog/ctc-vs-in-hand-salary">CTC vs In-Hand Salary guide</a>.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head" style={{ textAlign: "center", marginBottom: 48, marginLeft: "auto", marginRight: "auto" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Who It's For</span>
            <h2>What This Calculator Is Useful For</h2>
          </div>
          <div className="feature-grid feature-grid-3">
            {USE_CASES.map((item) => (
              <div className="feature-card" key={item.title}>
                <div className={`icon-badge ${item.tint}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.icon}</svg>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="section-head" style={{ textAlign: "center", marginBottom: 40, marginLeft: "auto", marginRight: "auto" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>The Math</span>
            <h2>Formula Used</h2>
          </div>
          <div style={{ background: '#1e293b', color: '#fff', padding: '32px', borderRadius: '16px', fontFamily: 'monospace', fontSize: '16px', lineHeight: 1.8 }}>
            Gross Monthly Salary = (Basic + HRA + Special Allowance) ÷ 12
            <br />
            In-Hand Salary = Gross Monthly Salary − (Employee PF + Professional Tax + TDS)
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" style={{ textAlign: "center", marginBottom: 40, marginLeft: "auto", marginRight: "auto" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <section className="section" style={{ padding: "0 0 96px" }}>
        <div className="container">
          <div className="payslip-cta">
            <h2>Explaining CTC breakups manually to every new hire doesn&apos;t scale</h2>
            <p>Meagle 360 generates clear, automatic CTC-to-in-hand breakdowns for every employee on your team.</p>
            <a href="/demo" className="btn btn-white">Book a free demo</a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </SiteChrome>
  );
}
