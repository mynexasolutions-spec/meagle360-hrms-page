"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { imageFallback } from "../lib/ripple";

const CHECKLIST = [
  "Self-service portal for personal information",
  "Easy leave and attendance tracking",
  "Access to payslips and tax documents",
  "Performance feedback and goal tracking",
  "Training and development opportunities",
];

export function EmployeeCentric() {
  const mockRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const el = mockRef.current;
    if (!el) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      setIsIn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIn(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !mockRef.current || !shellRef.current) return;
    const rect = mockRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = (y / (rect.height / 2)) * -12;
    const ry = (x / (rect.width / 2)) * 12;
    shellRef.current.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.02)`;
    shellRef.current.style.animation = "none";
  }

  function handleMouseLeave() {
    if (!shellRef.current) return;
    shellRef.current.style.transform = "";
    shellRef.current.style.animation = "frame3DFloat 8s ease-in-out infinite";
  }

  return (
    <section className="section section-alt">
      <div className="container centric-grid">
        <div
          className={`phone-mock reveal${isIn ? " in" : ""}`}
          ref={mockRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="phone-shell" ref={shellRef}>
            <img
              src="/left.png"
              alt="Meagle 360 employee self-service app"
              onError={imageFallback}
            />
            <div
              className="frame-fallback"
              style={{ display: "none", alignItems: "center", justifyContent: "center" }}
            >
              Employee app preview (left.png)
            </div>
          </div>
          <div className="float-card float-1">
            <div className="dot tint-emerald">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div>
              Leave Approved
              <small>Your leave has been approved</small>
            </div>
          </div>
          <div className="float-card float-2">
            <div className="dot tint-sky">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            <div>
              Payroll Processed
              <small>May payroll has been generated</small>
            </div>
          </div>
          <div className="float-card float-3">
            <div className="dot tint-amber">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              Performance Review
              <small>Your review is scheduled</small>
            </div>
          </div>
        </div>

        <Reveal className="reveal">
          <span className="eyebrow">Employee Centric</span>
          <h2
            style={{
              fontSize: "clamp(26px, 3.2vw, 34px)",
              letterSpacing: "-0.02em",
              margin: "0 0 14px",
            }}
          >
            Empower Your Employees Every Step of the Way
          </h2>
          <ul className="check-list">
            {CHECKLIST.map((item) => (
              <li key={item}>
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
