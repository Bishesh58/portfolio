"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./BlueprintMode.module.css";

export const BLUEPRINT_EVENT = "toggle-blueprint";

/**
 * Blueprint mode — press X (or run it from the command palette) to strip the
 * site down to its construction lines: dashed outlines on every box, faded
 * artwork, and section annotations. The portfolio literally shows its own
 * build sheet.
 */
export default function BlueprintMode() {
  const reduced = usePrefersReducedMotion();
  const [on, setOn] = useState(false);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-blueprint", on);
    return () => document.documentElement.removeAttribute("data-blueprint");
  }, [on]);

  useEffect(() => {
    const isEditable = (el: EventTarget | null) => {
      const t = el as HTMLElement | null;
      return (
        !!t &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
      );
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable(e.target)) return;
      if (e.key.toLowerCase() === "x") setOn((v) => !v);
    };
    const onToggle = () => setOn((v) => !v);
    window.addEventListener("keydown", onKey);
    window.addEventListener(BLUEPRINT_EVENT, onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(BLUEPRINT_EVENT, onToggle);
    };
  }, []);

  const animate = !reduced;

  return (
    <AnimatePresence>
      {on && (
        <motion.button
          type="button"
          className={styles.badge}
          onClick={() => setOn(false)}
          initial={animate ? { opacity: 0, y: 16 } : false}
          animate={animate ? { opacity: 1, y: 0 } : undefined}
          exit={animate ? { opacity: 0, y: 16 } : undefined}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
        >
          <span className={styles.dot} aria-hidden="true" />
          Blueprint mode — press X to exit
        </motion.button>
      )}
    </AnimatePresence>
  );
}
