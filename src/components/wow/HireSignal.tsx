"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./HireSignal.module.css";

const WORD = "hire";
const SHOW_MS = 1400;

export const HIRE_EVENT = "trigger-hire";

/**
 * Hidden recruiter easter egg — type "hire" anywhere and a big red stamp
 * slams down, then the page rolls to the contact section.
 */
export default function HireSignal() {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(false);
  const bufferRef = useRef("");

  useEffect(() => {
    const isEditable = (el: EventTarget | null) => {
      const t = el as HTMLElement | null;
      return (
        !!t &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
      );
    };

    let hideTimer: number | undefined;
    let scrollTimer: number | undefined;

    const fire = () => {
      setShow(true);
      scrollTimer = window.setTimeout(() => {
        document.querySelector("#contact")?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
      }, 650);
      hideTimer = window.setTimeout(() => setShow(false), SHOW_MS);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable(e.target)) return;
      if (e.key.length !== 1 || !/[a-z]/i.test(e.key)) return;

      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-WORD.length);
      if (bufferRef.current !== WORD) return;

      bufferRef.current = "";
      fire();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener(HIRE_EVENT, fire);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(HIRE_EVENT, fire);
      window.clearTimeout(hideTimer);
      window.clearTimeout(scrollTimer);
    };
  }, [reduced]);

  const animate = !reduced;

  return (
    <AnimatePresence>
      {show && (
        <div className={styles.overlay} aria-hidden="true">
          <motion.span
            className={styles.stamp}
            initial={animate ? { opacity: 0, scale: 3, rotate: 6 } : false}
            animate={animate ? { opacity: 1, scale: 1, rotate: -7 } : undefined}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            Good call.
          </motion.span>
        </div>
      )}
    </AnimatePresence>
  );
}
