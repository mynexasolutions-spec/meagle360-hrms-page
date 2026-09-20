import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteChrome } from "../components/SiteChrome";
import { Reveal } from "../components/Reveal";
import { FaqAccordion } from "../components/FaqAccordion";
import { FEATURES } from "../components/Features";

const SITE_URL = "https://www.meagle360.com";

const PAGE_TITLE = "HR Software Features: Attendance, Leave & Payroll";
const PAGE_DESCRIPTION =
  "Explore Meagle 360's HR software (HRMS/HRIS) features — attendance, leave, payroll and more, all in one platform for growing teams.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/features",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const FAQS = [
  {
    q: "What is HR software?",
    a: "HR software is a system that manages employee-related processes — typically attendance, leave, payroll and employee records — in one place instead of spreadsheets or manual paperwork. Modern HR software like Meagle 360 also gives employees self-service access to their own information.",
  },
  {
    q: "What is the difference between HRMS and HRIS?",
    a: "HRIS (Human Resource Information System) is the older term for software that stores employee data. HRMS (Human Resource Management System) usually implies the platform also runs processes on top of that data, like payroll and attendance. Most vendors, including Meagle 360, use the two terms interchangeably today.",
  },
  {
    q: "What features should good HR software include?",
    a: "At minimum, HR software should cover attendance tracking, leave management, payroll processing and a central employee database. Beyond that, look for self-service access for employees, shift and roster management, expense tracking, and reports that don't require exporting to a spreadsheet to make sense of.",
  },
  {
    q: "Does Meagle 360 include payroll, attendance and leave management in one platform?",
    a: "Yes. Attendance, leave and payroll all run on the same platform and the same employee data, so a leave approval or attendance record flows directly into that cycle's payroll run instead of needing to be reconciled by hand across separate tools.",
  },
  {
    q: "Is Meagle 360 good HR software for small businesses?",
    a: "Yes. Meagle 360 is built for small businesses and startups alike — flat pricing per user with no minimum seats, every module included from day one, and no dedicated HR hire required to run it.",
  },
  {
    q: "How much does HR software cost?",
    a: "Pricing varies widely — small-business-focused platforms often charge a flat monthly fee per employee, while enterprise suites are typically quote-based. Meagle 360 charges a flat ₹149 per user, per month, with every module included and no setup fee.",
  },
  {
    q: "How long does it take to set up Meagle 360?",
    a: "Most teams are fully onboarded, including data migration and configuration, within 3 to 5 business days — not the multi-week implementation projects common with larger enterprise HR systems.",
  },
  {
    q: "Can I try Meagle 360 before I buy?",
    a: "Yes, you can start a 14-day free trial with full access to every module, with no credit card required to begin.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Features", item: `${SITE_URL}/features` },
  ],
};



export default function FeaturesPage() {
  return (
    <SiteChrome>
      {/* Hero Section */}
      <section className="hero" style={{ paddingTop: "20px", paddingBottom: "40px" }}>
        <div className="hero-bg-orb orb-1"></div>
        <div className="hero-bg-orb orb-2"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>
              Everything you need to manage{" "}
              <span className="accent">
                your people
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
              From attendance to payroll, Meagle 360 brings all your HR operations into one simple, powerful platform.
            </p>
            <div className="hero-actions">
              <Link href="/pricing" className="btn btn-primary">
                Start Free Trial
              </Link>
              <Link href="/pricing" className="btn btn-outline">
                Explore Pricing
              </Link>
            </div>
          </div>
          <div className="hero-visual" style={{ transform: "scale(1.15)", transformOrigin: "left center" }}>
            <Image
              src="/banner.webp"
              alt="Meagle 360 Dashboard"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 900px) 90vw, 560px"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="section section-alt" style={{ padding: "60px 0" }}>
        <div className="container">
          <Reveal className="section-head-row reveal" style={{ justifyContent: "center", textAlign: "center", marginBottom: "64px" }}>
            <div className="section-head" style={{ margin: "0 auto" }}>
              <span className="eyebrow">OUR FEATURES</span>
              <h2>A complete HRMS for modern teams</h2>
              <p style={{ fontSize: "18px" }}>Powerful modules, built to simplify every part of your HR journey.</p>
            </div>
          </Reveal>

          <Reveal className="feature-grid reveal-stagger">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title}>
                <div className={`icon-badge ${f.tint}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Attendance Section */}
      <section className="section" style={{ padding: "60px 0" }}>
        <div className="container centric-grid" style={{ alignItems: "center" }}>
          <div>
            <Reveal className="reveal">
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 34px)", letterSpacing: "-0.02em", margin: "0 0 14px" }}>
                Attendance Management
              </h2>
              <p style={{ fontWeight: 600, fontSize: "18px", color: "var(--text-1)", marginBottom: "16px" }}>Accurate, real-time attendance from anywhere.</p>
              <p style={{ color: "var(--text-2)", marginBottom: "32px", fontSize: "18px", lineHeight: 1.6 }}>
                Track attendance with geo-location, mobile check-ins, shift management and real-time insights. Say goodbye to manual registers and buddy punching.
              </p>
              <ul className="check-list" style={{ marginBottom: "32px" }}>
                <li><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg></div>Mobile & web check-ins</li>
                <li><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg></div>Geo-location and IP restriction</li>
                <li><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg></div>Shift and roster management</li>
                <li><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg></div>Real-time attendance reports</li>
              </ul>
              <Link href="/pricing" className="btn btn-primary" style={{ display: "inline-flex" }}>
                Learn More
              </Link>
            </Reveal>
          </div>
          <div style={{ position: "relative", margin: "0 auto", padding: "0 24px", width: "100%", maxWidth: "700px", transform: "scale(1.15)", transformOrigin: "center right" }}>
            <div className="hero-bg-orb orb-1" style={{ top: "-20%", left: "-20%", width: "400px", height: "400px", opacity: 0.7 }}></div>
            <div className="hero-bg-orb orb-2" style={{ bottom: "-20%", right: "-20%", width: "350px", height: "350px", opacity: 0.7 }}></div>
            <Image
              src="/attendance-tracking.webp"
              alt="Attendance Management dashboard interface showing employee check-ins and team presence"
              width={800}
              height={600}
              sizes="(max-width: 900px) 90vw, 700px"
              style={{ width: "100%", height: "auto", position: "relative", zIndex: 1 }}
            />
          </div>
        </div>
      </section>

      {/* Leaves Section */}
      <section className="section section-alt" style={{ padding: "60px 0" }}>
        <div className="container centric-grid" style={{ alignItems: "center" }}>
          <div style={{ position: "relative", margin: "0 auto", padding: "0 24px", width: "100%", maxWidth: "700px", transform: "scale(1.15)", transformOrigin: "center left" }}>
            <div className="hero-bg-orb orb-1" style={{ top: "-20%", left: "-20%", width: "400px", height: "400px", opacity: 0.7, background: "radial-gradient(circle, #34d399, transparent 70%)" }}></div>
            <div className="hero-bg-orb orb-2" style={{ bottom: "-20%", right: "-20%", width: "350px", height: "350px", opacity: 0.7, background: "radial-gradient(circle, #6ee7b7, transparent 70%)" }}></div>
            <Image
              src="/leave-management.webp"
              alt="Leave Management dashboard showing employee leave requests and approvals"
              width={800}
              height={600}
              sizes="(max-width: 900px) 90vw, 700px"
              style={{ width: "100%", height: "auto", position: "relative", zIndex: 1 }}
            />
          </div>
          <div>
            <Reveal className="reveal">
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 34px)", letterSpacing: "-0.02em", margin: "0 0 14px" }}>
                Leave Management
              </h2>
              <p style={{ fontWeight: 600, fontSize: "18px", color: "var(--text-1)", marginBottom: "16px" }}>Make leave requests and approvals effortless.</p>
              <p style={{ color: "var(--text-2)", marginBottom: "32px", fontSize: "18px", lineHeight: 1.6 }}>
                Employees can apply for leave in seconds, while managers get full visibility and control. Automatic balance tracking keeps everyone informed.
              </p>
              <ul className="check-list" style={{ marginBottom: "32px" }}>
                <li><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg></div>Custom leave policies</li>
                <li><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg></div>Multi-level approvals</li>
                <li><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg></div>Leave balance tracking</li>
                <li><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg></div>Calendar view</li>
              </ul>
              <Link href="/pricing" className="btn btn-primary" style={{ display: "inline-flex" }}>
                Learn More
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Payroll Section */}
      <section className="section" style={{ padding: "60px 0" }}>
        <div className="container centric-grid" style={{ alignItems: "center" }}>
          <div>
            <Reveal className="reveal">
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 34px)", letterSpacing: "-0.02em", margin: "0 0 14px" }}>
                Payroll Processing
              </h2>
              <p style={{ fontWeight: 600, fontSize: "18px", color: "var(--text-1)", marginBottom: "16px" }}>Accurate payroll, every time.</p>
              <p style={{ color: "var(--text-2)", marginBottom: "32px", fontSize: "18px", lineHeight: 1.6 }}>
                Automate your entire payroll process, from earnings and deductions to PF, ESI, TDS and gratuity. Generate payslips, file compliance, and avoid errors.
              </p>
              <ul className="check-list" style={{ marginBottom: "32px" }}>
                <li><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg></div>Automated salary calculations</li>
                <li><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg></div>PF, ESI, TDS and gratuity</li>
                <li><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg></div>Payslip generation</li>
                <li><div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg></div>Compliance-ready reports</li>
              </ul>
              <Link href="/pricing" className="btn btn-primary" style={{ display: "inline-flex" }}>
                Learn More
              </Link>
            </Reveal>
          </div>
          <div style={{ position: "relative", margin: "0 auto", padding: "0 24px", width: "100%", maxWidth: "700px", transform: "scale(1.15)", transformOrigin: "center right" }}>
            <div className="hero-bg-orb orb-1" style={{ top: "-20%", left: "-20%", width: "400px", height: "400px", opacity: 0.7, background: "radial-gradient(circle, #fbbf24, transparent 70%)" }}></div>
            <div className="hero-bg-orb orb-2" style={{ bottom: "-20%", right: "-20%", width: "350px", height: "350px", opacity: 0.7, background: "radial-gradient(circle, #fcd34d, transparent 70%)" }}></div>
            <Image
              src="/payroll.webp"
              alt="Payroll Processing dashboard showing salary calculations and payslips"
              width={800}
              height={600}
              sizes="(max-width: 900px) 90vw, 700px"
              style={{ width: "100%", height: "auto", position: "relative", zIndex: 1 }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-alt" style={{ padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 32 }}>Frequently asked questions</h2>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ padding: "0 0 96px" }}>
        <div className="container">
          <div className="payslip-cta">
            <h2>Need every one of these features running for your team?</h2>
            <p style={{ fontSize: '1.1rem' }}>Meagle 360 brings attendance, leave, payroll and more into one platform, live in as little as 5 days.</p>
            <Link href="/demo" className="btn btn-white">Book a free demo</Link>
          </div>
        </div>
      </section>

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
