"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useActiveSection } from "@/lib/sectionStore";
import { quips, type SectionId } from "@/data/quips";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./mascot.module.css";

type Pose = "wave" | "idle" | "type" | "wrench" | "mail";

const poseBySection: Record<SectionId, Pose> = {
  hero: "wave",
  about: "idle",
  journey: "idle",
  projects: "type",
  skills: "wrench",
  contact: "mail",
};

export default function Mascot() {
  const reduced = usePrefersReducedMotion();
  const section = useActiveSection();
  const pose: Pose = reduced ? "idle" : poseBySection[section];

  const [mounted, setMounted] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const shownSections = useRef(new Set<SectionId>());
  const lastBubbleAt = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // Pupil tracking
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springPx = useSpring(px, { stiffness: 150, damping: 18 });
  const springPy = useSpring(py, { stiffness: 150, damping: 18 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const el = svgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.3;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const r = Math.min(dist / 60, 3.5);
      px.set((dx / dist) * r);
      py.set((dy / dist) * r);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, px, py]);

  // Quips: once per section, 8s cooldown, 4.5s auto-dismiss
  useEffect(() => {
    if (reduced || !mounted) return;
    if (window.innerWidth < 480) return;
    if (shownSections.current.has(section)) return;
    const now = Date.now();
    if (now - lastBubbleAt.current < 8000) return;
    const options = quips[section];
    const text = options[shownSections.current.size % options.length];
    shownSections.current.add(section);
    lastBubbleAt.current = now;
    setBubble(text);
    const t = setTimeout(() => setBubble(null), 4500);
    return () => clearTimeout(t);
  }, [section, reduced, mounted]);

  if (!mounted) return null;

  const leftArmAnimate =
    pose === "wave"
      ? { rotate: [0, -35, 0, -35, 0], transition: { duration: 1.6, repeat: Infinity, repeatDelay: 2.2 } }
      : pose === "type"
        ? { rotate: 28, y: [0, 2, 0], transition: { y: { duration: 0.35, repeat: Infinity } } }
        : { rotate: 0 };

  const rightArmAnimate =
    pose === "type"
      ? { rotate: -28, y: [0, -2, 0], transition: { y: { duration: 0.35, repeat: Infinity, delay: 0.15 } } }
      : pose === "wrench" || pose === "mail"
        ? { rotate: -55 }
        : { rotate: 0 };

  return (
    <div className={styles.mascot}>
      <AnimatePresence>
        {bubble && (
          <motion.div
            className={styles.bubble}
            role="status"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
          >
            {bubble}
            <button
              type="button"
              className={styles.bubbleClose}
              onClick={() => setBubble(null)}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <svg
        ref={svgRef}
        className={styles.svg}
        viewBox="0 0 120 140"
        width="110"
        height="128"
        aria-label={`Robot mascot, currently ${pose === "idle" ? "watching" : pose === "wave" ? "waving" : pose === "type" ? "typing" : pose === "wrench" ? "holding a wrench" : "holding an envelope"}`}
        role="img"
      >
        {/* antenna */}
        <motion.g animate={reduced ? undefined : { y: [0, -2, 0] }} transition={{ duration: 2.4, repeat: Infinity }}>
          <line x1="60" y1="22" x2="60" y2="10" stroke="var(--ink)" strokeWidth="3.5" />
          <circle cx="60" cy="8" r="5" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="3" />
        </motion.g>

        {/* head */}
        <rect x="30" y="20" width="60" height="46" rx="14" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3.5" />
        <rect x="38" y="30" width="44" height="26" rx="9" fill="var(--ink)" />
        {/* eyes */}
        <circle cx="52" cy="43" r="6.5" fill="var(--lime)" />
        <circle cx="68" cy="43" r="6.5" fill="var(--lime)" />
        <motion.g style={{ x: springPx, y: springPy }}>
          <circle cx="52" cy="43" r="2.6" fill="#111" />
          <circle cx="68" cy="43" r="2.6" fill="#111" />
        </motion.g>
        {/* blink eyelid */}
        {!reduced && (
          <motion.rect
            x="42" y="33" width="36" height="20" rx="8" fill="var(--ink)"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            style={{ originY: "33px" }}
            transition={{ duration: 0.28, repeat: Infinity, repeatDelay: 3.8 }}
          />
        )}
        {/* ear cups */}
        <rect x="24" y="36" width="8" height="16" rx="3" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="3" />
        <rect x="88" y="36" width="8" height="16" rx="3" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="3" />

        {/* body */}
        <rect x="36" y="70" width="48" height="44" rx="12" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="3.5" />
        <path d="M52 84 h16 l-3 14 h-10 z" fill="var(--lime)" stroke="var(--ink)" strokeWidth="3" />

        {/* left arm (viewer's left) — shoulder pivot at (36,78) */}
        <motion.g animate={leftArmAnimate} style={{ originX: "36px", originY: "78px" }}>
          <rect x="18" y="74" width="20" height="9" rx="4.5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
          <circle cx="16" cy="78" r="6" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
        </motion.g>

        {/* right arm — shoulder pivot at (84,78) */}
        <motion.g animate={rightArmAnimate} style={{ originX: "84px", originY: "78px" }}>
          <rect x="82" y="74" width="20" height="9" rx="4.5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
          <circle cx="104" cy="78" r="6" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
          {pose === "wrench" && (
            <g>
              <rect x="100" y="62" width="6" height="18" rx="2" fill="var(--teal)" stroke="var(--ink)" strokeWidth="2.5" />
              <circle cx="103" cy="60" r="5" fill="none" stroke="var(--ink)" strokeWidth="3" />
            </g>
          )}
          {pose === "mail" && (
            <g>
              <rect x="96" y="58" width="20" height="14" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2.5" />
              <path d="M96 58 l10 8 l10 -8" fill="none" stroke="var(--ink)" strokeWidth="2" />
            </g>
          )}
        </motion.g>

        {/* laptop for typing pose */}
        {pose === "type" && (
          <g>
            <rect x="40" y="106" width="40" height="6" rx="2" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.5" />
            <rect x="44" y="90" width="32" height="18" rx="2" fill="var(--teal)" stroke="var(--ink)" strokeWidth="2.5" />
          </g>
        )}

        {/* base */}
        <rect x="42" y="114" width="36" height="10" rx="5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
      </svg>
    </div>
  );
}
