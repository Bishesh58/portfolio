"use client";

import { useCallback, useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useTheme } from "@/hooks/useTheme";
import styles from "./Navbar.module.css";

const links = [
  { href: "#about", label: "Profile" },
  { href: "#journey", label: "Experience" },
  { href: "#projects", label: "Build log" },
  { href: "#skills", label: "Toolkit" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  // Scroll odometer — how much of the sheet has been read
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPct(Math.min(100, Math.max(0, Math.round(v * 100))));
  });

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar-inner">
        <a href="#hero" className="nav-brand" onClick={close}>
          BS/
        </a>
        <div className="nav-mid">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>
        <span className="nav-status">
          <i className="nav-status-dot" aria-hidden="true" /> Open to work
        </span>
        <span className="nav-odo" aria-hidden="true">
          <span className="nav-odo-label">Read</span>
          {String(pct).padStart(3, "0")}%
        </span>
        <a href="#contact" className="nav-cta nav-cta--desktop">
          Get in touch
        </a>
          <button
            type="button"
            className={`${styles.menuBtn} ${open ? styles.menuBtnOpen : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
          </button>
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
                  <line x1="12" y1="2" x2="12" y2="4.5" />
                  <line x1="12" y1="19.5" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="4.5" y2="12" />
                  <line x1="19.5" y1="12" x2="22" y2="12" />
                  <line x1="4.9" y1="4.9" x2="6.7" y2="6.7" />
                  <line x1="17.3" y1="17.3" x2="19.1" y2="19.1" />
                  <line x1="4.9" y1="19.1" x2="6.7" y2="17.3" />
                  <line x1="17.3" y1="6.7" x2="19.1" y2="4.9" />
                </g>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
      </div>

      <div
        id="mobile-nav"
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={close}
        />
        <div className={styles.mobileSheet} inert={!open ? true : undefined}>
          <ul className={styles.mobileLinks}>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={styles.mobileLink}
                  tabIndex={open ? 0 : -1}
                  onClick={close}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className={`btn ${styles.mobileCta}`}
            tabIndex={open ? 0 : -1}
            onClick={close}
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}
