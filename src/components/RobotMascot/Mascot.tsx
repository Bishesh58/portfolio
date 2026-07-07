"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useActiveSection } from "@/lib/sectionStore";
import { quips, type SectionId } from "@/data/quips";
import { tourStops } from "@/data/tour";
import { ARCADE_EVENT } from "@/components/wow/arcade/RobotArcade";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./mascot.module.css";

export const TOUR_EVENT = "start-tour";

const TOUR_STOP_MS = 4200;

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
  const [hasScrolled, setHasScrolled] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [touring, setTouring] = useState(false);
  const shownSections = useRef(new Set<SectionId>());
  const lastBubbleAt = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const touringRef = useRef(false);
  const tourTimers = useRef<number[]>([]);

  const stopTour = useCallback((farewell: string | null = null) => {
    touringRef.current = false;
    setTouring(false);
    tourTimers.current.forEach((t) => window.clearTimeout(t));
    tourTimers.current = [];
    setBubble(farewell);
    if (farewell) {
      tourTimers.current.push(window.setTimeout(() => setBubble(null), 5000));
    }
  }, []);

  // Guided tour: walk every section, narrating via the quip bubble. The
  // engine lives here because the mascot owns the bubble and its pose
  // already follows the active section as the page scrolls past.
  useEffect(() => {
    const start = () => {
      if (touringRef.current) return;
      touringRef.current = true;
      setTouring(true);
      setHasScrolled(true);
      // The tour narrates every section, so retire the ambient quips.
      tourStops.forEach((s) => shownSections.current.add(s.id));
      let i = 0;
      const step = () => {
        if (!touringRef.current) return;
        if (i >= tourStops.length) {
          stopTour("End of tour. Ctrl+K has the rest of the controls.");
          return;
        }
        const stop = tourStops[i];
        i += 1;
        document.querySelector(`#${stop.id}`)?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
        setBubble(stop.text);
        tourTimers.current.push(window.setTimeout(step, TOUR_STOP_MS));
      };
      // Small head start so a closing command palette can release its
      // body scroll lock before the first scrollIntoView.
      tourTimers.current.push(window.setTimeout(step, 350));
    };
    window.addEventListener(TOUR_EVENT, start);
    return () => window.removeEventListener(TOUR_EVENT, start);
  }, [reduced, stopTour]);

  // The visitor stays in charge: any scroll intent or Escape ends the tour.
  useEffect(() => {
    if (!touring) return;
    const cancel = () => stopTour();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") stopTour();
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchmove", cancel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchmove", cancel);
      window.removeEventListener("keydown", onKey);
    };
  }, [touring, stopTour]);

  useEffect(() => {
    return () => tourTimers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  // Pupil tracking
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springPx = useSpring(px, { stiffness: 150, damping: 18 });
  const springPy = useSpring(py, { stiffness: 150, damping: 18 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const SCROLL_THRESHOLD = 24;

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setHasScrolled(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    if (window.scrollY > SCROLL_THRESHOLD) {
      setHasScrolled(true);
      return;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reduced || !hasScrolled) return;
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
  }, [reduced, hasScrolled, px, py]);

  // Quips: once per section, 8s cooldown, 4.5s auto-dismiss
  useEffect(() => {
    if (reduced || !mounted || !hasScrolled) return;
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
  }, [section, reduced, mounted, hasScrolled]);

  if (!mounted || !hasScrolled) return null;

  const leftShoulderAnimate =
    pose === "type"
      ? {
          rotate: 28,
          y: [0, 2, 0],
          transition: { y: { duration: 0.35, repeat: Infinity } },
        }
      : { rotate: 0 };

  const leftHandAnimate = { rotate: 0 };

  const rightShoulderAnimate =
    pose === "wave"
      ? {
          rotate: [-92, -80, -92, -104, -92],
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatDelay: 1.4,
            ease: "easeInOut" as const,
          },
        }
      : pose === "idle"
        ? {
            rotate: [0, 0, -92, -80, -92, -104, -92, 0],
            transition: {
              duration: 5,
              repeat: Infinity,
              times: [0, 0.6, 0.66, 0.72, 0.78, 0.84, 0.9, 1],
              ease: "easeInOut" as const,
            },
          }
      : pose === "type"
        ? {
            rotate: -28,
            y: [0, -2, 0],
            transition: { y: { duration: 0.35, repeat: Infinity, delay: 0.15 } },
          }
        : pose === "wrench" || pose === "mail"
          ? { rotate: -55 }
          : { rotate: 0 };

  const rightHandAnimate = { rotate: 0 };

  return (
    <motion.div
      className={`${styles.mascot} ${touring ? styles.touring : ""}`}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
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
              onClick={() => (touringRef.current ? stopTour() : setBubble(null))}
              aria-label={touring ? "End tour" : "Dismiss message"}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className={styles.hitbox}
        title="Psst — click me"
        aria-label="Play the robot arcade"
        onClick={() => {
          if (touringRef.current) stopTour();
          window.dispatchEvent(new Event(ARCADE_EVENT));
        }}
      >
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
        <motion.g
          animate={leftShoulderAnimate}
          style={{ transformOrigin: "36px 78px", transformBox: "fill-box" }}
        >
          <rect x="18" y="74" width="20" height="9" rx="4.5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
          <motion.g
            animate={leftHandAnimate}
            style={{ transformOrigin: "18px 78px", transformBox: "fill-box" }}
          >
            <circle cx="16" cy="78" r="6" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
          </motion.g>
        </motion.g>

        {/* right arm — shoulder pivot at (84,78) */}
        <motion.g
          animate={rightShoulderAnimate}
          style={{ transformOrigin: "84px 78px", transformBox: "fill-box" }}
        >
          <rect x="82" y="74" width="20" height="9" rx="4.5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
          <motion.g
            animate={rightHandAnimate}
            style={{ transformOrigin: "104px 78px", transformBox: "fill-box" }}
          >
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
      </button>
    </motion.div>
  );
}
