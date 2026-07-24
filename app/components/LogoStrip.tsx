const LOGOS = [
  {
    name: "Invoice2go",
    path: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    linecap: true,
  },
  {
    name: "techcorp",
    icon: (
      <>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
  },
  {
    name: "novatech",
    path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    name: "infinite",
    icon: (
      <>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
        <path d="M12 8v8M8 12h8" />
      </>
    ),
  },
  { name: "nextwave", path: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
  {
    name: "digitalhub",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </>
    ),
  },
  {
    name: "alphaX",
    icon: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    ),
  },
];

function LogoRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="logo-row" aria-hidden={ariaHidden}>
      {LOGOS.map((logo) => (
        <span className="integration-pill" key={logo.name}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap={logo.linecap ? "round" : undefined}
            strokeLinejoin={logo.linecap ? "round" : undefined}
          >
            {logo.path ? <path d={logo.path} /> : logo.icon}
          </svg>
          {logo.name}
        </span>
      ))}
    </div>
  );
}

export function LogoStrip() {
  return (
    <div className="logo-strip">
      <div className="container">
        <p>TRUSTED BY 500+ BUSINESSES WORLDWIDE</p>
      </div>
      <div className="logo-marquee">
        <LogoRow />
        <LogoRow ariaHidden />
        <LogoRow ariaHidden />
        <LogoRow ariaHidden />
      </div>
    </div>
  );
}
