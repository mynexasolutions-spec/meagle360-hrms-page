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

export function Stats() {
  return (
    <section className="section">
      <div className="container">
        <Reveal as="span" className="eyebrow reveal">
          Why Choose Meagle 360
        </Reveal>
        <Reveal
          as="h2"
          className="reveal"
          style={{ fontSize: "clamp(28px, 3.4vw, 38px)", letterSpacing: "-0.02em", maxWidth: 520 }}
        >
          Benefits That Drive Business Success
        </Reveal>
        <Reveal
          as="p"
          className="reveal"
          style={{ color: "var(--text-2)", fontSize: 18, maxWidth: 560, margin: "12px 0 48px" }}
        >
          Meagle 360 helps you automate HR processes, reduce manual work, and
          improve employee experience.
        </Reveal>

        <Reveal className="stats-grid reveal-stagger">
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
