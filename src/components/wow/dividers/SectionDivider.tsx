"use client";

/**
 * SectionDivider — bold, full-bleed neo-brutalist dividers.
 *
 * A single typed component with hard-edged `variant`s that snap one
 * section into the next. Rendered as inline SVG using design tokens
 * (var(--ink) stroke, var(--paper)/accents fill) so it reads correctly in
 * both light and dark mode. Full-bleed via CSS (breaks out of .container),
 * decorative (aria-hidden), and reduced-motion safe.
 *
 * Usage:
 *   <SectionDivider variant="torn" />                       // top edge
 *   <SectionDivider variant="zigzag" accent="cobalt" flip /> // bottom edge
 */

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./SectionDivider.module.css";

export type DividerVariant = "torn" | "zigzag";
export type DividerAccent =
  | "paper"
  | "panel"
  | "cobalt"
  | "lime"
  | "teal"
  | "yellow";

interface Props {
  /** Shape of the break. Defaults to "torn". */
  variant?: DividerVariant;
  /** Band fill colour token. Defaults to "paper" (blends into the page). */
  accent?: DividerAccent;
  /** Mirror vertically — use when the divider caps the BOTTOM of a section. */
  flip?: boolean;
  /** Band height in px. Defaults to 48. */
  height?: number;
  /** Scroll-reveal wipe (skipped under prefers-reduced-motion). Default true. */
  reveal?: boolean;
  className?: string;
}

/* Fixed viewBox — stretched to full width via preserveAspectRatio="none".
   Shapes tile across it and simply widen on ultrawide screens. */
const VBW = 1440;
const VBH = 48;

/* --- deterministic path geometry (computed once, SSR-stable) --- */

function zigzagPath(): string {
  const teeth = 22;
  const w = VBW / teeth;
  const peak = 5;
  const valley = 27;
  let d = `M0 ${valley}`;
  for (let i = 0; i < teeth; i++) {
    const x = i * w;
    d += ` L ${(x + w / 2).toFixed(1)} ${peak} L ${(x + w).toFixed(1)} ${valley}`;
  }
  return d + ` L ${VBW} ${VBH} L 0 ${VBH} Z`;
}

/* Small seeded PRNG so the "random" torn edge is identical on server + client
   (no hydration mismatch) yet still looks irregular. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function tornPath(): string {
  const steps = 46;
  const w = VBW / steps;
  const rand = mulberry32(0x9e37);
  let d = `M0 ${(8 + rand() * 18).toFixed(1)}`;
  for (let i = 1; i <= steps; i++) {
    const x = (i * w).toFixed(1);
    const y = (6 + rand() * 22).toFixed(1);
    // Occasional sharp inward nick for a paper-fibre "tear" feel.
    if (rand() > 0.72) {
      const nx = (i * w - w * 0.4).toFixed(1);
      d += ` L ${nx} ${(4 + rand() * 8).toFixed(1)} L ${x} ${y}`;
    } else {
      d += ` L ${x} ${y}`;
    }
  }
  return d + ` L ${VBW} ${VBH} L 0 ${VBH} Z`;
}

const PATHS: Record<DividerVariant, string> = {
  torn: tornPath(),
  zigzag: zigzagPath(),
};

const ACCENT_VAR: Record<DividerAccent, string> = {
  paper: "var(--paper)",
  panel: "var(--panel)",
  cobalt: "var(--cobalt)",
  lime: "var(--lime)",
  teal: "var(--teal)",
  yellow: "var(--yellow)",
};

export default function SectionDivider({
  variant = "torn",
  accent = "paper",
  flip = false,
  height = 48,
  reveal = true,
  className,
}: Props) {
  const reduced = usePrefersReducedMotion();

  const style = {
    ["--divider-h" as string]: `${height}px`,
    ["--divider-fill" as string]: ACCENT_VAR[accent],
  } as React.CSSProperties;

  const rootClass = [styles.divider, flip ? styles.flip : "", className]
    .filter(Boolean)
    .join(" ");

  const svg = (
    <svg
      className={styles.svg}
      viewBox={`0 0 ${VBW} ${VBH}`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
    >
      <path className={styles.fill} d={PATHS[variant]} />
      <path
        className={styles.edge}
        vectorEffect="non-scaling-stroke"
        d={edgeOnly(PATHS[variant])}
      />
    </svg>
  );

  // Reduced motion (or reveal disabled): render statically, no animation.
  if (reduced || !reveal) {
    return (
      <div className={rootClass} style={style} aria-hidden="true" role="presentation">
        {svg}
      </div>
    );
  }

  return (
    <motion.div
      className={rootClass}
      style={style}
      aria-hidden="true"
      role="presentation"
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {svg}
    </motion.div>
  );
}

/* Strip the closing band rectangle so only the shaped edge gets the ink
   stroke (the band's off-screen sides and flush bottom stay unstroked). */
function edgeOnly(d: string): string {
  return d.replace(/ L \d+ 48 L 0 48 Z$/, "");
}

