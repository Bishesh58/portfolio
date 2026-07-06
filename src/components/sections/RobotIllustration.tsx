"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./RobotIllustration.module.css";

type Props = {
  className?: string;
  priority?: boolean;
};

/** Eye regions sampled from robot.png (viewBox 0 0 557 600) */
const EYES = {
  visor: "#080f2b",
  glow: "#85f56f",
  left: { x: 290.29, y: 217.42, width: 13.48, height: 25.84 },
  right: { x: 325.1, y: 209.55, width: 16.28, height: 26.97 },
} as const;

/** Laptop screen text — left teal display (sampled from robot.png) */
const SCREEN_TEXT = {
  x: 120, // left edge; anchored start so typing grows rightward
  y: 284,
  rotate: -2.3,
  pivotX: 174,
} as const;

/** What the robot is typing on its laptop, on loop */
const SCREEN_PHRASES = [
  "Open to work",
  "npm run ship",
  "✓ tests pass",
  "deploying…",
  "0 bugs today",
] as const;

const TYPE_MS = 68;
const DELETE_MS = 34;
const HOLD_MS = 2200;
const GAP_MS = 420;

/** How far pupils may wander from centre, in viewBox units */
const PUPIL_RANGE = 5.5;

export default function RobotIllustration({ className }: Props) {
  const reduced = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const pad = 1.5;

  // Typewriter on the laptop screen
  const [screenTxt, setScreenTxt] = useState<string>(SCREEN_PHRASES[0]);

  useEffect(() => {
    if (reduced) {
      setScreenTxt(SCREEN_PHRASES[0]);
      return;
    }
    let phrase = 0;
    let char = SCREEN_PHRASES[0].length;
    let deleting = true;
    let timer: number;

    const tick = () => {
      const full = SCREEN_PHRASES[phrase];
      if (deleting) {
        char -= 1;
        setScreenTxt(full.slice(0, char));
        if (char === 0) {
          deleting = false;
          phrase = (phrase + 1) % SCREEN_PHRASES.length;
          timer = window.setTimeout(tick, GAP_MS);
        } else {
          timer = window.setTimeout(tick, DELETE_MS);
        }
      } else {
        char += 1;
        setScreenTxt(full.slice(0, char));
        if (char === full.length) {
          deleting = true;
          timer = window.setTimeout(tick, HOLD_MS);
        } else {
          timer = window.setTimeout(tick, TYPE_MS);
        }
      }
    };

    timer = window.setTimeout(tick, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  // Pupil tracking — same spring feel as the mascot
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springPx = useSpring(px, { stiffness: 150, damping: 18 });
  const springPy = useSpring(py, { stiffness: 150, damping: 18 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const el = svgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // aim from between the eyes (~38% down the illustration)
      const cx = rect.left + rect.width * 0.56;
      const cy = rect.top + rect.height * 0.38;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const r = Math.min(dist / 60, PUPIL_RANGE);
      px.set((dx / dist) * r);
      py.set((dy / dist) * r);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, px, py]);

  return (
    <svg
      ref={svgRef}
      className={`${styles.svg} ${className ?? ""}`}
      viewBox="0 0 557 600"
      width="557"
      height="600"
      role="img"
      aria-label="Illustrated robot working on a laptop — Bishesh's mascot"
    >
      <defs>
        {[EYES.left, EYES.right].map((eye, i) => (
          <clipPath key={i} id={`op-eye-${i}`}>
            <rect
              x={eye.x - pad}
              y={eye.y - pad}
              width={eye.width + pad * 2}
              height={eye.height + pad * 2}
              rx={4}
            />
          </clipPath>
        ))}
      </defs>

      <image href="/robot.webp" x="0" y="0" width="557" height="600" preserveAspectRatio="xMidYMid meet" />
      <text
        className={styles.screenText}
        x={SCREEN_TEXT.x}
        y={SCREEN_TEXT.y}
        transform={`rotate(${SCREEN_TEXT.rotate}, ${SCREEN_TEXT.pivotX}, ${SCREEN_TEXT.y})`}
        textAnchor="start"
        aria-hidden="true"
      >
        {screenTxt}
        {!reduced && <tspan className={styles.screenCursor}>▍</tspan>}
      </text>

      {/* eye sockets — cover the painted eyes so the live pupils replace them */}
      {[EYES.left, EYES.right].map((eye, i) => (
        <rect
          key={`socket-${i}`}
          fill={EYES.visor}
          x={eye.x - pad}
          y={eye.y - pad}
          width={eye.width + pad * 2}
          height={eye.height + pad * 2}
          rx={4}
        />
      ))}

      {/* pupils — glow blocks that follow the cursor, clipped to their sockets */}
      {[EYES.left, EYES.right].map((eye, i) => (
        <g key={`pupil-${i}`} clipPath={`url(#op-eye-${i})`}>
          <motion.rect
            fill={EYES.glow}
            x={eye.x + 1}
            y={eye.y + 2}
            width={eye.width - 2}
            height={eye.height - 4}
            rx={4}
            style={reduced ? undefined : { x: springPx, y: springPy }}
          />
        </g>
      ))}

      {/* blink eyelids on top */}
      {[EYES.left, EYES.right].map((eye, i) => (
        <rect
          key={`lid-${i}`}
          className={reduced ? undefined : styles.eyelid}
          fill={EYES.visor}
          x={eye.x - pad}
          y={eye.y - pad}
          width={eye.width + pad * 2}
          height={eye.height + pad * 2}
          rx={3}
        />
      ))}
    </svg>
  );
}
