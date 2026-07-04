"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./ScrollToTop.module.css";

/**
 * ScrollToTop — a brutalist "back to top" button.
 *
 * Appears once the user has scrolled roughly one viewport down and smooth-
 * scrolls back to the top when pressed. Fixed to the bottom-LEFT so it never
 * collides with the robot mascot (bottom-right), the header (top) or the
 * scroll-progress line (top). Fully self-contained: it owns its own scroll
 * listener (rAF-throttled, passive) and cleans it up on unmount.
 *
 * Motion is gated behind usePrefersReducedMotion(): the enter/exit springs are
 * dropped and the scroll becomes an instant jump when reduced motion is on.
 */
export default function ScrollToTop() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    const evaluate = () => {
      ticking = false;
      // Show after ~1 viewport of scrolling.
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const animate = !reduced;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className={styles.button}
          aria-label="Scroll back to top"
          onClick={scrollToTop}
          initial={animate ? { opacity: 0, y: 24, scale: 0.85 } : false}
          animate={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
          exit={animate ? { opacity: 0, y: 24, scale: 0.85 } : undefined}
          transition={{ type: "spring", stiffness: 460, damping: 26 }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={styles.icon}
          >
            <path
              d="M12 19V5M12 5l-7 7M12 5l7 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
          <span className={styles.label}>Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
