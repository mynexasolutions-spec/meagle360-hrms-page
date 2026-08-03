"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

export function AnimatedCounter({
  count,
  decimals = 0,
  suffix = "",
  className,
  as,
}: {
  count: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  as?: ElementType;
}) {
  const Component = as ?? "span";
  const ref = useRef<HTMLElement>(null);
  // Seed state with the real final value so it's what gets server-rendered
  // and what crawlers/no-JS visitors see. The count-up animation, when it
  // runs, temporarily overwrites this client-side after hydration.
  const finalValue = count.toFixed(decimals) + suffix;
  const [value, setValue] = useState(finalValue);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    function animate() {
      const duration = 1400;
      let start: number | null = null;
      function step(ts: number) {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = count * eased;
        setValue(val.toFixed(decimals) + suffix);
        if (progress < 1) requestAnimationFrame(step);
        else setValue(finalValue);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      animate();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            animate();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Component ref={ref} className={className}>
      {value}
    </Component>
  );
}
