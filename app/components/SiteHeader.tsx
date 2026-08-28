"use client";

import { usePathname } from "next/navigation";
import { triggerRipple } from "../lib/ripple";

const NAV_LINKS = [
  { href: "/", label: "Home", id: "home" },
  { href: "/pricing", label: "Pricing", id: "pricing" },
  { href: "/tools/payslip-generator", label: "Tools", id: "tools" },
  { href: "/blog", label: "Blog", id: "blog" },
  { href: "/contact", label: "Contact", id: "contact" },
  { href: "/careers", label: "Careers", id: "careers" },
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

  return (
    <header id="siteHeader" className={scrolled ? "scrolled" : ""}>
      <nav className={`nav${navOpen ? " open" : ""}`} id="mainNav">
        <a href="/" className="brand">
          <img src="/logo.png" alt="Meagle 360 logo" className="brand-mark" />
          Meagle<span>360</span>
        </a>

        <div className="nav-links" id="navLinks">
          {NAV_LINKS.map((link) => {
            let isActive = false;
            if (link.id === "blog") isActive = !!isBlog;
            else if (link.id === "contact") isActive = isContact;
            else if (link.id === "pricing") isActive = isPricing;
            else if (link.id === "careers") isActive = !!isCareers;
            else if (link.id === "tools") isActive = !!isTools;
            else if (link.id === "home") isActive = isHome && !activeNav;

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
