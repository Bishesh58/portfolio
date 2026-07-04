"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./RobotIllustration.module.css";

type Props = {
  className?: string;
  priority?: boolean;
};

/** Eye regions sampled from robot.png (viewBox 0 0 557 600) */
const EYES = {
  visor: "#080f2b",
  left: { x: 290.29, y: 217.42, width: 13.48, height: 25.84 },
  right: { x: 325.1, y: 209.55, width: 16.28, height: 26.97 },
} as const;

/** Laptop screen text — left teal display (sampled from robot.png) */
const SCREEN_TEXT = {
  x: 174,
  y: 284,
  rotate: -2.3,
} as const;

export default function RobotIllustration({ className }: Props) {
  const reduced = usePrefersReducedMotion();
  const pad = 1.5;

  return (
    <svg
      className={`${styles.svg} ${className ?? ""}`}
      viewBox="0 0 557 600"
      width="557"
      height="600"
      role="img"
      aria-label="Illustrated robot working on a laptop — Bishesh's mascot"
    >
      <image href="/robot.png" x="0" y="0" width="557" height="600" preserveAspectRatio="xMidYMid meet" />
      <text
        className={styles.screenText}
        x={SCREEN_TEXT.x}
        y={SCREEN_TEXT.y}
        transform={`rotate(${SCREEN_TEXT.rotate}, ${SCREEN_TEXT.x}, ${SCREEN_TEXT.y})`}
        textAnchor="middle"
        aria-hidden="true"
      >
        Open to work
      </text>
      {[EYES.left, EYES.right].map((eye, i) => (
        <rect
          key={i}
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
