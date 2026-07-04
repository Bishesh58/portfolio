"use client";

import { useTheme } from "@/hooks/useTheme";

const links = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="navbar" aria-label="Main">
      <div className="container">
        <div className="navbar-inner">
          <a href="#hero" className="nav-brand">BS</a>
        <div className="nav-mid">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </div>
        <a href="#contact" className="nav-cta">Get in touch</a>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {theme === "dark" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <line x1="12" y1="2" x2="12" y2="4.5" /><line x1="12" y1="19.5" x2="12" y2="22" />
                <line x1="2" y1="12" x2="4.5" y2="12" /><line x1="19.5" y1="12" x2="22" y2="12" />
                <line x1="4.9" y1="4.9" x2="6.7" y2="6.7" /><line x1="17.3" y1="17.3" x2="19.1" y2="19.1" />
                <line x1="4.9" y1="19.1" x2="6.7" y2="17.3" /><line x1="17.3" y1="6.7" x2="19.1" y2="4.9" />
              </g>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          )}
          </button>
        </div>
      </div>
    </nav>
  );
}
