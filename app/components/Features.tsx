import { Reveal } from "./Reveal";

const FEATURES = [
  {
    tint: "tint-indigo",
    title: "Employee Directory",
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
    desc: "Simplify leave requests, approvals, and balance management.",
    icon: <path d="M2 12l19-9-4 9 4 9z" />,
  },
  {
    tint: "tint-rose",
    title: "Expenses",
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
    desc: "Plan and rotate shifts so every team is covered at the right time.",
    icon: <path d="M17 2l4 4-4 4M3 11V9a4 4 0 014-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />,
  },
  {
    tint: "tint-teal",
    title: "Reports & Analytics",
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
            <div className="feature-card" key={f.title}>
              <div className={`icon-badge ${f.tint}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  );
}
