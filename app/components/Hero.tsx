"use client";

import { useRef } from "react";
import { triggerRipple } from "../lib/ripple";

export function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !visualRef.current || !wrapperRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = (y / (rect.height / 2)) * -14;
    const ry = (x / (rect.width / 2)) * 14;
    wrapperRef.current.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.02)`;
    wrapperRef.current.style.animation = "none";
  }

  function handleMouseLeave() {
    if (!wrapperRef.current) return;
    wrapperRef.current.style.transform = "";
    wrapperRef.current.style.animation = "heroFloat3D 8s ease-in-out infinite";
  }

  return (
    <section className="hero">
      <div className="hero-bg-orb orb-1"></div>
      <div className="hero-bg-orb orb-2"></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="pulse-dot"></span>All-in-One HR Management Solution
          </span>
          <h1>
            Manage People.
            <br />
            Simplify Processes.
            <br />
            <span className="accent">
              Grow Together.
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
            Meagle 360 is a powerful HRMS platform that automates your HR
            processes, empowers your people, and drives organizational
            success.
          </p>
          <div className="hero-actions">
            <a href="#demo" className="btn btn-primary" onClick={triggerRipple}>
              Request Demo
            </a>
            <a href="#features" className="btn btn-outline" onClick={triggerRipple}>
              Explore Features
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-visual" ref={visualRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="hero-3d-wrapper" ref={wrapperRef}>
            <div className="hero-float-badge hb-1">
              <div
                className="dot tint-emerald"
                style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div>
                Payroll Synced
                <small>Auto-processed on time</small>
              </div>
            </div>
            <div className="dashboard-frame">
              <img src="/hrms-image.png" alt="Meagle 360 dashboard preview" />
            </div>
            <div className="hero-float-badge hb-2">
              <div
                className="dot tint-sky"
                style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                </svg>
              </div>
              <div>
                Live in 5 Days
                <small>Average time to first payroll run</small>
              </div>
            </div>
            <div className="hero-float-badge hb-3">
              <div
                className="dot tint-violet"
                style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                99.9% Attendance
                <small>Real-time AI tracking</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
