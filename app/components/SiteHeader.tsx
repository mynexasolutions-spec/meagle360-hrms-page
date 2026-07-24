"use client";

import { triggerRipple } from "../lib/ripple";

const NAV_LINKS = [
  { href: "#", label: "Home", id: "home" },
  { href: "#features", label: "Features", id: "features" },
  { href: "#modules", label: "Modules", id: "modules" },
  { href: "#pricing", label: "Pricing", id: "pricing" },
  { href: "#faq", label: "FAQ", id: "faq" },
  { href: "#demo", label: "Contact", id: "demo" },
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
  return (
    <header id="siteHeader" className={scrolled ? "scrolled" : ""}>
      <nav className={`nav${navOpen ? " open" : ""}`} id="mainNav">
        <a href="#" className="brand">
          <img src="/logo.png" alt="Meagle 360 logo" className="brand-mark" />
          Meagle<span>360</span>
        </a>

        <div className="nav-links" id="navLinks">
          {NAV_LINKS.map((link) => {
            const isActive = link.id === "home" ? !activeNav : activeNav === link.id;
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
        </div>

        <div className="nav-actions">
          <a
            href="#demo"
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
