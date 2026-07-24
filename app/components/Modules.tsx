import { Reveal } from "./Reveal";
import { imageFallback } from "../lib/ripple";

const MODULES = [
  {
    tint: "tint-indigo",
    title: "Organization Management",
    desc: "Manage departments, designations, and hierarchy.",
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
    tint: "tint-sky",
    title: "Document Management",
    desc: "Store, manage & access important documents.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
      </>
    ),
  },
  {
    tint: "tint-emerald",
    title: "Training & Development",
    desc: "Plan, track and evaluate employee training.",
    icon: (
      <>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 2 9 2 12 0v-5" />
      </>
    ),
  },
  {
    tint: "tint-amber",
    title: "Asset Management",
    desc: "Track and manage company assets & inventory.",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </>
    ),
  },
  {
    tint: "tint-rose",
    title: "Exit Management",
    desc: "Streamline exit process and final settlements.",
    icon: (
      <>
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <path d="M16 17l5-5-5-5M21 12H9" />
      </>
    ),
  },
];

export function Modules() {
  return (
    <section className="section section-alt" id="modules">
      <div className="container">
        <Reveal as="span" className="eyebrow reveal">
          Complete HR Modules
        </Reveal>
        <Reveal
          as="h2"
          className="reveal"
          style={{
            fontSize: "clamp(28px, 3.4vw, 38px)",
            letterSpacing: "-0.02em",
            maxWidth: 600,
            margin: "0 0 12px",
          }}
        >
          A Complete Suite of HR Management Modules
        </Reveal>

        <div className="modules-grid">
          <Reveal as="ul" className="module-list reveal-stagger">
            {MODULES.map((m) => (
              <li key={m.title}>
                <div className={`icon-badge ${m.tint}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {m.icon}
                  </svg>
                </div>
                <div>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <Reveal
            className="dashboard-frame reveal"
            style={{ maxWidth: 460, margin: "0 auto", width: "100%" }}
          >
            <img
              src="/complete-hr-modules.png"
              alt="Meagle 360 modules overview"
              onError={imageFallback}
            />
            <div className="frame-fallback" style={{ display: "none" }}>
              Meagle 360
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
