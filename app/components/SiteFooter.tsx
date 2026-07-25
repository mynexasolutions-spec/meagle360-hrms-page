const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Modules", href: "/#modules" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Updates", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Small Business", href: "#" },
      { label: "Mid Size Business", href: "#" },
      { label: "Enterprises", href: "#" },
      { label: "Remote Teams", href: "#" },
      { label: "HR Consultants", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "#" },
      { label: "FAQ", href: "/#faq" },
      { label: "Webinars", href: "#" },
      { label: "Case Studies", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="brand">
              <img src="/logo.png" alt="Meagle 360 logo" className="brand-mark" />
              Meagle<span>360</span>
            </a>
            <p>
              Meagle 360 is an all-in-one HR management solution designed to
              simplify and empower your workforce.
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div className="footer-col" key={col.title}>
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">&copy; 2026 Meagle 360. All rights reserved.</div>
      </div>
    </footer>
  );
}
