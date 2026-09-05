"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { triggerRipple } from "../lib/ripple";

const NAV_LINKS = [
  { href: "/", label: "Home", id: "home" },
  { href: "/pricing", label: "Pricing", id: "pricing" },
  { href: "/blog", label: "Blog", id: "blog" },
  { href: "/contact", label: "Contact", id: "contact" },
  { href: "/careers", label: "Careers", id: "careers" },
];

const TOOL_LINKS = [
  { href: "/tools/payslip-generator", label: "Payslip Generator" },
  { href: "/tools/ctc-to-in-hand-calculator", label: "CTC to In-Hand Calculator" },
  { href: "/tools/quotation-maker", label: "Quotation Maker" },
];

export function SiteHeader({
  scrolled,
  navOpen,
  onToggleNav,
  onNavLinkClick,
  activeNav,
}: {
  scrolled: boolean;
  navOpen: boolean;
  onToggleNav: () => void;
  onNavLinkClick: () => void;
  activeNav: string | null;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlog = pathname?.startsWith("/blog");
  const isContact = pathname === "/contact";
  const isPricing = pathname === "/pricing";
  const isCareers = pathname?.startsWith("/careers");
  const isTools = pathname?.startsWith("/tools");

  const [toolsOpen, setToolsOpen] = useState(false);

  // Keep the Tools submenu from staying open when the mobile nav itself closes.
  useEffect(() => {
    if (!navOpen) setToolsOpen(false);
  }, [navOpen]);

  function handleToolLinkClick() {
    setToolsOpen(false);
    onNavLinkClick();
  }

  return (
    <header id="siteHeader" className={scrolled ? "scrolled" : ""}>
      <nav className={`nav${navOpen ? " open" : ""}`} id="mainNav">
        <a href="/" className="brand">
          <img src="/logo.png" alt="Meagle 360 logo" className="brand-mark" />
          Meagle<span>360</span>
        </a>

        <div className="nav-links" id="navLinks">
          <a
            href="/"
            className={`nav-link${isHome && !activeNav ? " active" : ""}`}
            data-nav
            onClick={onNavLinkClick}
          >
            Home
          </a>
          <a
            href="/pricing"
            className={`nav-link${isPricing ? " active" : ""}`}
            data-nav
            onClick={onNavLinkClick}
          >
            Pricing
          </a>

          <div className={`nav-item${toolsOpen ? " open" : ""}`}>
            <button
              type="button"
              className={`nav-link${isTools ? " active" : ""}`}
              onClick={() => setToolsOpen((o) => !o)}
              aria-expanded={toolsOpen}
              aria-haspopup="true"
            >
              Tools
              <svg className="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="dropdown">
              {TOOL_LINKS.map((tool) => (
                <a key={tool.href} href={tool.href} onClick={handleToolLinkClick}>
                  {tool.label}
                </a>
              ))}
            </div>
          </div>

          {NAV_LINKS.filter((l) => l.id !== "home" && l.id !== "pricing").map((link) => {
            let isActive = false;
            if (link.id === "blog") isActive = !!isBlog;
            else if (link.id === "contact") isActive = isContact;
            else if (link.id === "careers") isActive = !!isCareers;

            return (
              <a
                key={link.id}
                href={link.href}
                className={`nav-link${isActive ? " active" : ""}`}
                data-nav
                onClick={onNavLinkClick}
              >
                {link.label}
              </a>
            );
          })}

          <a
            href="/contact"
            className="btn btn-primary nav-mobile-cta"
            onClick={(e) => { triggerRipple(e); onNavLinkClick(); }}
          >
            Request Demo
          </a>
        </div>

        <div className="nav-actions">
          <a
            href="/contact"
            className="btn btn-primary"
            style={{ borderRadius: 999, padding: "10px 22px" }}
            onClick={triggerRipple}
          >
            Request Demo
          </a>
          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle menu"
            aria-expanded={navOpen}
            aria-controls="navLinks"
            onClick={onToggleNav}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
