import type { Metadata } from "next";
import { SiteChrome } from "../../components/SiteChrome";
import { FaqAccordion } from "../../components/FaqAccordion";

const TITLE = "HRMS for Startups — HR Software That Grows With You";
const DESCRIPTION =
  "HR software built for startups: attendance, payroll and leave from day one. No minimum seats, flat ₹149/user/month, live in 5 days.";
const SITE_URL = "https://www.meagle360.com";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/solutions/hrms-for-startups",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/solutions/hrms-for-startups",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FAQS = [
  {
    q: "Is Meagle 360 suitable for a 10-person startup?",
    a: "Yes. There's no minimum seat count — you pay ₹149/user/month for exactly the employees you have today, whether that's 10 or 100, and every module is included from the first user.",
  },
  {
    q: "What happens to our data if we grow and need to switch later?",
    a: "Your employee records, attendance history and payroll data stay exportable at any time. There's no lock-in format forcing you to stay — but most teams that reach this stage tend to stay because the flat pricing keeps working as they scale, not because switching is hard.",
  },
  {
    q: "Do we need an HR manager to set this up?",
    a: "No. Most early-stage teams set up Meagle 360 with a founder or an ops generalist handling it, not a dedicated HR hire. Onboarding is handled by our team, not left as a self-serve implementation project.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes, a 14-day free trial with full access to every module, no credit card required.",
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
    { "@type": "ListItem", position: 2, name: "HRMS for Startups", item: `${SITE_URL}/solutions/hrms-for-startups` },
  ],
};

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function HrmsForStartupsPage() {
  return (
    <SiteChrome>
      <section
        className="blog-post-banner"
        style={{ display: "flex", alignItems: "center", minHeight: "260px" }}
      >
        <div className="container" style={{ textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
          <h1 className="blog-post-title" style={{ margin: "0 0 16px" }}>
            HRMS for Startups — HR Software That Grows With You
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", margin: "0 0 28px" }}>
            Attendance, payroll and leave running properly from your first hire, without a
            multi-week implementation project or a per-seat pricing surprise as you grow.
          </p>
          <a href="/demo" className="btn btn-white">
            Book a 15-min demo
          </a>
        </div>
      </section>

      <section className="section" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>When spreadsheets stop working</h2>
          <p style={{ textAlign: "center", color: "var(--text-2)", marginBottom: 32, fontSize: 18 }}>
            Most startups run HR informally for as long as they can — until somewhere around
            the 10 to 30 employee mark, the cracks start showing:
          </p>
          <ul className="check-list" style={{ maxWidth: 640, margin: "0 auto" }}>
            <li>
              <div className="ico">{CHECK}</div>
              Attendance tracked in WhatsApp groups, with no real record when someone asks
              "who was actually in the office that day?"
            </li>
            <li>
              <div className="ico">{CHECK}</div>
              Leave requests buried in email threads nobody can find when a balance is disputed
            </li>
            <li>
              <div className="ico">{CHECK}</div>
              Payroll calculated manually every month, by whoever has the spreadsheet formula memorized
            </li>
            <li>
              <div className="ico">{CHECK}</div>
              The first compliance mistakes start showing up — PF or ESI missed or miscalculated
            </li>
            <li>
              <div className="ico">{CHECK}</div>
              No dedicated HR hire yet — founders or an ops generalist doing it all on top of everything else
            </li>
          </ul>
        </div>
      </section>

      <section className="section section-alt" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>What startups actually need from HR software</h2>
          <ul className="check-list" style={{ maxWidth: 640, margin: "0 auto" }}>
            <li>
              <div className="ico">{CHECK}</div>
              Attendance and payroll that just works from week one — not a multi-week setup project
            </li>
            <li>
              <div className="ico">{CHECK}</div>
              Leave management that doesn't require a separate tool bolted on the side
            </li>
            <li>
              <div className="ico">{CHECK}</div>
              Compliance built in, so PF and ESI aren't something a founder has to learn to calculate by hand
            </li>
            <li>
              <div className="ico">{CHECK}</div>
              An employee self-service app so the team isn't pinging HR (or the founder) for payslips
            </li>
            <li>
              <div className="ico">{CHECK}</div>
              No implementation project — a startup doesn't have 6 weeks to spare setting up software
            </li>
          </ul>
        </div>
      </section>

      <section className="section" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>How Meagle 360 is built for startup pace</h2>
          <p style={{ textAlign: "center", color: "var(--text-2)", marginBottom: 40, fontSize: 18 }}>
            Four modules matter most at this stage — and all four are included from day one, at no extra cost.
          </p>
          <div className="feature-capability-grid">
            <div className="feature-capability-card">
              <h3>Attendance</h3>
              <p>Geo-tagged mobile check-in that works for an office team or a founder working from three different cafes this week — no hardware, no register.</p>
            </div>
            <div className="feature-capability-card">
              <h3>Payroll</h3>
              <p>Runs directly from attendance and leave data, with PF, ESI and TDS calculated automatically — no spreadsheet rebuilt from scratch every month.</p>
            </div>
            <div className="feature-capability-card">
              <h3>Leave</h3>
              <p>Self-service requests and real-time balances, so leave stops living in an email thread nobody can search.</p>
            </div>
            <div className="feature-capability-card">
              <h3>Employee Self-Service</h3>
              <p>Payslips, leave balance and attendance history in one app, so routine questions stop landing on whoever's running HR informally.</p>
            </div>
          </div>
          <p style={{ textAlign: "center", color: "var(--text-2)", marginTop: 32, fontSize: 16 }}>
            Most teams are fully onboarded, including data migration, within <strong>3 to 5 business days</strong> —
            and there's <strong>no minimum seat count</strong>, which matters most exactly at the 10–20
            employee stage most HRMS pricing isn't built for.
          </p>
        </div>
      </section>

      <section className="section section-alt" style={{ padding: "48px 0" }}>
        <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
          <h2 style={{ marginBottom: 12 }}>Pricing that makes sense at every stage</h2>
          <p style={{ color: "var(--text-2)", marginBottom: 24, fontSize: 18 }}>
            ₹149 flat per user, per month. You pay for exactly the employees you have today — no
            minimum seat commitment, no bundle you're not using, no setup fee.
          </p>
          <a href="/pricing" className="btn btn-primary">
            See full pricing →
          </a>
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
            <li><a href="/features/payroll-software">Payroll Software →</a></li>
            <li><a href="/features/attendance-management-software">Attendance Management Software →</a></li>
            <li><a href="/alternatives/keka-alternative">Keka Alternative →</a></li>
          </ul>
        </div>
      </section>

      <section className="section" style={{ textAlign: "center", padding: "48px 0" }}>
        <div className="container">
          <h2 style={{ marginBottom: 24 }}>See it running on your own data</h2>
          <a href="/demo" className="btn btn-primary">
            Book a 15-min demo
          </a>
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
