"use client";

import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { Features } from "./components/Features";
import { Modules } from "./components/Modules";
import { Stats } from "./components/Stats";
import { EmployeeCentric } from "./components/EmployeeCentric";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { CtaBanner } from "./components/CtaBanner";
import { SiteFooter } from "./components/SiteFooter";
import { Toast } from "./components/Toast";
import { DemoPopup } from "./components/DemoPopup";
import { FloatingContact } from "./components/FloatingContact";

const NAV_SECTIONS = ["features", "modules", "pricing", "faq", "demo"];

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0);

      const scrollPos = window.scrollY + 140;
      let activeId: string | null = null;
      NAV_SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) activeId = id;
      });
      setActiveNav(activeId);
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  function showToast(message: string) {
    setToast({ show: true, message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 3200);
  }

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }}></div>

      <SiteHeader
        scrolled={scrolled}
        navOpen={navOpen}
        onToggleNav={() => setNavOpen((o) => !o)}
        onNavLinkClick={() => setNavOpen(false)}
        activeNav={activeNav}
      />

      <Hero />
      <LogoStrip />
      <Features />
      <Modules />
      <Stats />
      <EmployeeCentric />
      <Pricing />
      <Testimonials />
      <Faq />
      <CtaBanner
        onDemoSubmitted={() => showToast("Thanks! Our team will reach out shortly.")}
      />
      <SiteFooter />

      <FloatingContact />
      <Toast show={toast.show} message={toast.message} />
      <DemoPopup
        onSuccess={() => showToast("Thanks! Our team will reach out shortly.")}
      />
    </>
  );
}
