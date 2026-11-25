import type { Metadata } from "next";
import { SiteChrome } from "../../components/SiteChrome";
import { FaqAccordion } from "../../components/FaqAccordion";

const TITLE = "Cloud-Based HR Software & HRMS for India";
const DESCRIPTION =
  "Cloud-based HR software (SaaS HRMS) for Indian companies: attendance, leave, payroll and performance in one secure cloud app, hosted in India. ₹149/user/month.";
const SITE_URL = "https://www.meagle360.com";
const PATH = "/solutions/cloud-hr-software";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQS = [
  {
    q: "What is cloud-based HR software?",
    a: "Cloud-based HR software is an HRMS that runs on the vendor's servers and is used through a web browser or mobile app, instead of being installed on your own computers. You pay a subscription, updates happen automatically, and HR, managers and employees can use it from anywhere.",
  },
  {
    q: "Is Meagle 360 a cloud-based HRMS?",
    a: "Yes. Meagle 360 is a cloud HRMS delivered as software as a service (SaaS). There is nothing to install: HR and managers use it in the browser, and employees use the web or the iOS and Android app.",
  },
  {
    q: "Where is our data stored?",
    a: "Meagle 360's database, authentication and file storage are hosted on Supabase, running on AWS infrastructure in the Mumbai (ap-south-1) region in India. Traffic is encrypted in transit with HTTPS/TLS, and data at rest is encrypted by the infrastructure provider.",
  },
  {
    q: "What does SaaS HRMS mean?",
    a: "SaaS stands for software as a service. A SaaS HRMS is HR software you subscribe to rather than buy and install. The vendor hosts it, maintains it and releases updates, and you pay per user per month.",
  },
  {
    q: "How much does cloud HR software cost?",
    a: "Most cloud HR software in India is priced per employee per month, sometimes with a base fee. Meagle 360 is a flat ₹149 per user per month with every module included, no setup fee and no minimum seats. GST is extra.",
  },
  {
    q: "Is cloud HR software secure?",
    a: "It can be more secure than spreadsheets on shared drives, because access is controlled by role and every user signs in to their own account. Check where the vendor hosts data, how it is encrypted and who can access it. Meagle 360 publishes these details on its security page.",
  },
  {
    q: "What is the difference between a cloud HRIS and a cloud HRMS?",
    a: "An HRIS mainly stores employee information, while an HRMS also runs HR processes such as attendance, leave, payroll and performance. In practice the terms are often used interchangeably. Meagle 360 covers both the employee records and the processes built on them.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes, a 14-day free trial with every module included and no credit card required.",
  },
];

const MODULES = [
  { title: "Attendance", href: "/features/attendance-management-software", desc: "Geo-tagged mobile check-in and real-time attendance for office, field and remote teams." },
  { title: "Leave", href: "/features/leave-management-software", desc: "Apply and approve from the app, with balances that update automatically." },
  { title: "Payroll", href: "/features/payroll-software", desc: "Payroll within 1 click, with PF, ESI, PT, TDS and LWF calculated from attendance." },
  { title: "Shifts", href: "/features/shift-management-software", desc: "Plan rosters and rotate shifts across locations without a spreadsheet." },
  { title: "Performance", href: "/features/performance-management-software", desc: "Goals, KPIs, 360° reviews and ratings linked to increments." },
  { title: "Onboarding", href: "/features/employee-onboarding-software", desc: "New hires fill in their own details and documents before day one." },
  { title: "Employee database", href: "/features/employee-database-software", desc: "Records, documents and org chart in one searchable place." },
  { title: "Self-service app", href: "/features/employee-self-service", desc: "Employees see payslips, leave and attendance on web, iOS and Android." },
];

const COMPARE = [
  ["Setup", "Sign up and start; nothing to install", "Servers, installation and IT support needed"],
  ["Cost", "Monthly subscription per user", "Large upfront licence plus maintenance"],
  ["Updates", "Automatic, with no upgrade project", "Manual upgrades, often paid"],
  ["Access", "Browser and mobile app, from anywhere", "Usually office network only"],
  ["Mobile check-in", "Built in", "Usually not available"],
  ["Scaling", "Add or remove users any month", "Licence changes and hardware limits"],
];

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
    { "@type": "ListItem", position: 2, name: "Cloud-Based HR Software", item: `${SITE_URL}${PATH}` },
  ],
};

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function CloudHrSoftwarePage() {
  return (
    <SiteChrome>
      <section className="blog-post-banner" style={{ display: "flex", alignItems: "center", minHeight: "260px" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
          <h1 className="blog-post-title" style={{ margin: "0 0 16px" }}>
            Cloud-Based HR Software for Growing Indian Companies
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", margin: "0 0 28px" }}>
            Attendance, leave, payroll, performance and onboarding in one cloud HRMS. Nothing to install,
            data hosted in India, and one flat price of ₹149 per user per month.
          </p>
          <a href="/demo" className="btn btn-white">
            Book a 15-min demo
          </a>
        </div>
      </section>

      <section className="section" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>What is cloud-based HR software?</h2>
          <p style={{ color: "var(--text-2)", fontSize: 18, lineHeight: 1.7 }}>
            Cloud-based HR software is an HRMS that runs on the vendor&apos;s servers and is used through a
            browser or mobile app, instead of being installed on your own computers. It is usually sold as
            software as a service (SaaS): you pay per user per month, the vendor handles hosting, security
            and updates, and HR, managers and employees can use it from the office, from home or from the
            field.
          </p>
        </div>
      </section>

      <section className="section section-alt" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>Why companies move HR to the cloud</h2>
          <ul className="check-list" style={{ maxWidth: 640, margin: "0 auto" }}>
            <li><div className="ico">{CHECK}</div>No servers or installation: sign up, import your employees and start</li>
            <li><div className="ico">{CHECK}</div>Employees check in, apply for leave and download payslips from their phone</li>
            <li><div className="ico">{CHECK}</div>Updates and new features arrive automatically, with no upgrade project</li>
            <li><div className="ico">{CHECK}</div>Managers approve leave and attendance from anywhere, not only at their desk</li>
            <li><div className="ico">{CHECK}</div>One system of record instead of spreadsheets copied between laptops</li>
            <li><div className="ico">{CHECK}</div>A monthly subscription that grows with headcount instead of a large upfront licence</li>
          </ul>
        </div>
      </section>

      <section className="section" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>Everything in one cloud HRMS</h2>
          <p style={{ textAlign: "center", color: "var(--text-2)", marginBottom: 40, fontSize: 18 }}>
            Every module is included in the same ₹149 per user price. No add-ons.
          </p>
          <div className="feature-capability-grid">
            {MODULES.map((m) => (
              <div className="feature-capability-card" key={m.title}>
                <h3><a href={m.href}>{m.title}</a></h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>Cloud HR software vs on-premise HR software</h2>
          <div className="blog-content">
            <div className="blog-table-wrap">
              <table>
                <thead>
                  <tr><th></th><th>Cloud (SaaS)</th><th>On-premise</th></tr>
                </thead>
                <tbody>
                  {COMPARE.map(([k, cloud, onprem]) => (
                    <tr key={k}><td><strong>{k}</strong></td><td>{cloud}</td><td>{onprem}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>Your HR data, hosted in India</h2>
          <ul className="check-list" style={{ maxWidth: 640, margin: "0 auto" }}>
            <li><div className="ico">{CHECK}</div>Hosted on Supabase, running on AWS in the Mumbai (ap-south-1) region</li>
            <li><div className="ico">{CHECK}</div>All traffic encrypted in transit with HTTPS/TLS, and data encrypted at rest</li>
            <li><div className="ico">{CHECK}</div>Role-based access, so each person sees only what their role allows</li>
            <li><div className="ico">{CHECK}</div>Your data stays exportable, with no lock-in</li>
          </ul>
          <p style={{ textAlign: "center", color: "var(--text-2)", marginTop: 24 }}>
            Full details, including sub-processors, are on our <a href="/security">security page</a>.
          </p>
        </div>
      </section>

      <section className="section section-alt" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
          <h2 style={{ marginBottom: 12 }}>Simple SaaS pricing</h2>
          <p style={{ color: "var(--text-2)", marginBottom: 24, fontSize: 18 }}>
            ₹149 per user, per month, with every module included. No setup fee, no minimum seats, and
            you are billed only for active employees. GST extra.
          </p>
          <a href="/pricing" className="btn btn-primary">See full pricing →</a>
        </div>
      </section>

      <section className="section" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 32 }}>Frequently asked questions</h2>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <section className="section section-alt" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
          <h2 style={{ marginBottom: 24 }}>Related reading</h2>
          <ul className="feature-related-links">
            <li><a href="/solutions/hrms-for-startups">HRMS for startups and small businesses →</a></li>
            <li><a href="/blog/keka-vs-greythr-vs-meagle-360">Keka vs greytHR vs Meagle 360 →</a></li>
            <li><a href="/blog/hrms-cost-for-50-employees-india">HRMS cost for 50 employees →</a></li>
            <li><a href="/blog/hris-systems-examples-list">HRIS systems examples →</a></li>
          </ul>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center", padding: "48px 0" }}>
        <div className="container">
          <h2 style={{ marginBottom: 24 }}>See it running on your own data</h2>
          <a href="/demo" className="btn btn-primary">Book a 15-min demo</a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </SiteChrome>
  );
}
