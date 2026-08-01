"use client";

import { usePathname } from "next/navigation";
import { triggerRipple } from "../lib/ripple";

const NAV_LINKS = [
  { href: "/", label: "Home", id: "home" },
  { href: "/#pricing", label: "Pricing", id: "pricing" },
  { href: "/blog", label: "Blog", id: "blog" },
  { href: "/careers", label: "Careers", id: "careers" },
  { href: "/contact", label: "Contact", id: "contact" },
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
  const isCareers = pathname?.startsWith("/careers");
  const isContact = pathname === "/contact";

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
            else if (link.id === "careers") isActive = !!isCareers;
            else if (link.id === "contact") isActive = isContact;
            else if (link.id === "home") isActive = isHome && !activeNav;
            else isActive = isHome && activeNav === link.id;

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
            href="/#demo"
            className="btn btn-primary nav-mobile-cta"
            onClick={(e) => { triggerRipple(e); onNavLinkClick(); }}
          >
            Request Demo
          </a>
        </div>

        <div className="nav-actions">
          <a
            href="/#demo"
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
