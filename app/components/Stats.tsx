import Link from "next/link";
import { Reveal } from "./Reveal";
import { AnimatedCounter } from "./AnimatedCounter";

const STATS = [
  { tint: "stat-blue", count: 80, suffix: "%", label: "Time Saved", sub: "On HR Processes" },
  {
    tint: "stat-green",
    count: 99.9,
    decimals: 1,
    suffix: "%",
    label: "Data Accuracy",
    sub: "And Reliability",
  },
  { tint: "stat-amber", count: 60, suffix: "%", label: "Cost Reduction", sub: "In HR Operations" },
  { tint: "stat-violet", count: 100, suffix: "%", label: "Compliance", sub: "And Security" },
];

const POINTS = [
  "Attendance, leave and payroll run on one employee record, so there is no month-end merging.",
  "PF, ESI and TDS are calculated as part of every payroll run.",
  "Employees check payslips and leave balances themselves, from their phone.",
];

export function Stats() {
  return (
    <section className="section">
      <div className="container why-grid">
        <div className="why-copy">
          <Reveal as="span" className="eyebrow reveal">
            Why Choose Meagle 360
          </Reveal>
          <Reveal as="h2" className="why-title reveal">
            How Meagle 360 Saves You Time and Drives Business Success
          </Reveal>
          <Reveal as="p" className="why-lead reveal">
            Meagle 360 helps you automate HR processes, reduce manual work, and
            improve employee experience.
          </Reveal>

          <Reveal as="ul" className="why-points reveal">
            {POINTS.map((p) => (
              <li key={p}>
                <span className="why-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </Reveal>

          <Reveal className="why-actions reveal">
            <Link href="/demo" className="btn btn-primary">
              Book a free demo
            </Link>
            <Link href="/pricing" className="btn btn-outline">
              See pricing
            </Link>
          </Reveal>
        </div>

        <Reveal className="why-stats reveal-stagger">
          {STATS.map((s) => (
            <div className={`stat-card ${s.tint}`} key={s.label}>
              <AnimatedCounter
                as="div"
                className="num count"
                count={s.count}
                decimals={s.decimals}
                suffix={s.suffix}
              />
              <div className="label">{s.label}</div>
              <div className="sub">{s.sub}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
