const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact Us", href: "/#demo" },
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
