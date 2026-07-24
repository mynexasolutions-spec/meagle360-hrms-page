"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatarSrc?: string;
  initials: string;
};

const SLIDES: Testimonial[][] = [
  [
    {
      quote:
        "Meagle 360 has transformed the way we manage HR. It's intuitive, powerful and the support is excellent.",
      name: "James Anderson",
      role: "HR Manager, TechCorp",
      avatarSrc: "/avatar-1.png",
      initials: "JA",
    },
    {
      quote:
        "The automation and insights we get from Meagle 360 have helped us make better HR decisions.",
      name: "Sarah Mitchell",
      role: "Head of HR, NovaTech",
      avatarSrc: "/avatar-2.png",
      initials: "SM",
    },
    {
      quote: "A complete HR solution that grows with our business. Highly recommended.",
      name: "Michael Brown",
      role: "CEO, NextWave",
      avatarSrc: "/avatar-3.png",
      initials: "MB",
    },
  ],
  [
    {
      quote: "Onboarding new hires used to take days. With Meagle 360 it now takes minutes.",
      name: "Riya Kapoor",
      role: "People Ops, InfiniteHub",
      initials: "RK",
    },
    {
      quote: "Payroll accuracy went from a monthly headache to a total non-issue.",
      name: "Dev Patel",
      role: "Finance Lead, AlphaX",
      initials: "DP",
    },
    {
      quote: "Our employees love the self-service app — support tickets dropped by half.",
      name: "Anita Shah",
      role: "HRBP, DigitalHub",
      initials: "AS",
    },
  ],
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideCount = SLIDES.length;

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    timerRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % slideCount);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToSlide(i: number) {
    setCurrent(((i % slideCount) + slideCount) % slideCount);
    resetAutoplay();
  }

  function resetAutoplay() {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (timerRef.current) clearInterval(timerRef.current);
    if (reduceMotion) return;
    timerRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % slideCount);
    }, 5000);
  }

  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <Reveal as="span" className="eyebrow reveal">
          What Our Clients Say
        </Reveal>
        <Reveal
          as="h2"
          className="reveal"
          style={{ fontSize: "clamp(26px, 3.2vw, 34px)", letterSpacing: "-0.02em", margin: "0 0 48px" }}
        >
          Trusted by HR Leaders Across Industries
        </Reveal>

        <Reveal className="testi-slider reveal">
          <div
            className="testi-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map((slide, idx) => (
              <div className="testi-slide" key={idx}>
                <div className="testi-grid">
                  {slide.map((t) => (
                    <div className="testi-card" key={t.name}>
                      <div className="stars">★★★★★</div>
                      <p>{t.quote}</p>
                      <div className="testi-person">
                        <div className="avatar">
                          {t.avatarSrc ? (
                            <img
                              src={t.avatarSrc}
                              alt=""
                              onError={(e) => {
                                e.currentTarget.parentElement!.textContent = t.initials;
                              }}
                            />
                          ) : (
                            t.initials
                          )}
                        </div>
                        <div>
                          <strong>{t.name}</strong>
                          <span>{t.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="testi-controls">
            <button
              className="testi-arrow"
              aria-label="Previous testimonials"
              onClick={() => goToSlide(current - 1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="testi-dots">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  className={idx === current ? "active" : ""}
                  aria-label={`Show testimonial set ${idx + 1}`}
                  onClick={() => goToSlide(idx)}
                ></button>
              ))}
            </div>
            <button
              className="testi-arrow"
              aria-label="Next testimonials"
              onClick={() => goToSlide(current + 1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
