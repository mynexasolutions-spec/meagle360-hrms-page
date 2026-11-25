import { Reveal } from "./Reveal";

export const FEATURES = [
  {
    tint: "tint-indigo",
    title: "Employee Directory",
    href: "/features/employee-database-software",
    desc: "Centralize employee data and contact info in one place.",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </>
    ),
  },
  {
    tint: "tint-violet",
    title: "Organization",
    href: "/features/workforce-management-software",
    desc: "Manage departments, designations, and reporting hierarchy.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </>
    ),
  },
  {
    tint: "tint-emerald",
    title: "Attendance",
    href: "/features/attendance-management-software",
    desc: "Track attendance in real-time with smart check-ins and geo-location.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14l2 2 4-4" />
      </>
    ),
  },
  {
    tint: "tint-sky",
    title: "Leave",
    href: "/features/leave-management-software",
    desc: "Simplify leave requests, approvals, and balance management.",
    icon: <path d="M2 12l19-9-4 9 4 9z" />,
  },
  {
    tint: "tint-rose",
    title: "Expenses",
    href: "/features/expense-management",
    desc: "Submit, approve, and reimburse expenses without the paperwork.",
    icon: (
      <>
        <rect x="2" y="6" width="20" height="13" rx="2" />
        <path d="M2 10h20M6 15h4" />
      </>
    ),
  },
  {
    tint: "tint-amber",
    title: "Payroll",
    href: "/features/payroll-software",
    desc: "Automate payroll processing with accuracy and full compliance.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  },
  {
    tint: "tint-fuchsia",
    title: "Shifts",
    href: "/features/shift-management-software",
    desc: "Plan and rotate shifts so every team is covered at the right time.",
    icon: <path d="M17 2l4 4-4 4M3 11V9a4 4 0 014-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />,
  },
  {
    tint: "tint-teal",
    title: "Reports & Analytics",
    href: "/features/hr-reports-analytics",
    desc: "Make data-driven decisions with powerful insights & reports.",
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
    tint: "tint-violet",
    title: "Performance",
    href: "/features/performance-management-software",
    desc: "Goals, KPIs and 360° reviews, with ratings linked to increments.",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  },
  {
    tint: "tint-emerald",
    title: "Onboarding",
    href: "/features/employee-onboarding-software",
    desc: "New hires submit their details and documents before day one.",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M20 8v6M23 11h-6" />
      </>
    ),
  },
  {
    tint: "tint-indigo",
    title: "Hiring",
    href: "/features/hiring-management-software",
    desc: "Track every applicant in one pipeline, from job post to offer.",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </>
    ),
  },
  {
    tint: "tint-sky",
    title: "Mobile Self-Service",
    href: "/features/employee-self-service",
    desc: "Payslips, leave and attendance from any phone browser.",
    icon: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </>
    ),
  },
];

export function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <Reveal className="section-head-row reveal">
          <div className="section-head">
            <span className="eyebrow">Powerful Features</span>
            <h2>Everything You Need to Manage Your Workforce</h2>
          </div>
        </Reveal>

        <Reveal className="feature-grid reveal-stagger">
          {FEATURES.map((f) => (
            <a className="feature-card" key={f.title} href={f.href}>
              <div className={`icon-badge ${f.tint}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {f.icon}
                </svg>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
