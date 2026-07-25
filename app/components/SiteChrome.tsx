"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingContact } from "./FloatingContact";
import { DemoPopup } from "./DemoPopup";
import { ToastProvider } from "./ToastProvider";

const NAV_SECTIONS = ["features", "modules", "pricing", "faq", "demo"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeNav, setActiveNav] = useState<string | null>(null);

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

  return (
    <ToastProvider>
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }}></div>

      <SiteHeader
        scrolled={scrolled}
        navOpen={navOpen}
        onToggleNav={() => setNavOpen((o) => !o)}
        onNavLinkClick={() => setNavOpen(false)}
        activeNav={activeNav}
      />

      {children}

      <SiteFooter />
      <FloatingContact />
      <DemoPopup />
    </ToastProvider>
  );
}
