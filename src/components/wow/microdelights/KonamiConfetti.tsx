"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./KonamiConfetti.module.css";

/**
 * KonamiConfetti — a hidden easter egg.
 *
 * Type the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) anywhere on the page and a burst
 * of neo-brutalist "sticker confetti" — bordered flat-colour shapes with hard
 * offset shadows — rains down, scatters and clears itself.
 *
 * Performance: pieces are plain DOM nodes animated purely with CSS keyframes
 * (transform/opacity only, GPU-friendly). They are generated once per trigger,
 * live in a fixed pointer-events:none overlay, and the whole batch is torn down
 * with a single timeout when the animation finishes — no per-frame React work.
 *
 * Reduced motion: the falling animation is skipped entirely; instead a single,
 * brief, static "cheat unlocked" sticker is shown so the egg is still
 * acknowledged without any motion.
 */

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const COLORS = ["var(--cobalt)", "var(--lime)", "var(--teal)", "var(--yellow)"];
const SHAPES = ["square", "circle", "triangle", "diamond", "star"] as const;

type Piece = {
  id: number;
  left: number; // vw
  color: string;
  shape: (typeof SHAPES)[number];
  size: number; // px
  delay: number; // s
  duration: number; // s
  drift: number; // px horizontal drift
  spin: number; // deg total rotation
};

const PIECE_COUNT = 64;
const FALL_MS = 3200; // must comfortably exceed longest (delay + duration)

let batchSeed = 0;

function makePieces(): Piece[] {
  const pieces: Piece[] = [];
  for (let i = 0; i < PIECE_COUNT; i++) {
    pieces.push({
      id: batchSeed * PIECE_COUNT + i,
      left: Math.random() * 100,
      color: COLORS[i % COLORS.length],
      shape: SHAPES[i % SHAPES.length],
      size: 14 + Math.round(Math.random() * 20),
      delay: Math.random() * 0.5,
      duration: 1.9 + Math.random() * 0.9,
      drift: (Math.random() - 0.5) * 260,
      spin: (Math.random() - 0.5) * 900,
    });
  }
  batchSeed++;
  return pieces;
}

export default function KonamiConfetti() {
  const reduced = usePrefersReducedMotion();
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [flash, setFlash] = useState(false);
  const progressRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const trigger = useCallback(() => {
    clearTimer();
    if (reduced) {
      // Minimal, motion-free acknowledgement.
      setFlash(true);
      timerRef.current = window.setTimeout(() => setFlash(false), 1400);
      return;
    }
    setPieces(makePieces());
    timerRef.current = window.setTimeout(() => setPieces([]), FALL_MS);
  }, [reduced]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onKeyDown = (e: KeyboardEvent) => {
      // Ignore typing inside form fields.
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const expected = SEQUENCE[progressRef.current];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        progressRef.current += 1;
        if (progressRef.current === SEQUENCE.length) {
          progressRef.current = 0;
          trigger();
        }
      } else {
        // Restart, but allow the mismatched key to be a fresh first step.
        progressRef.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimer();
    };
  }, [trigger]);

  if (reduced) {
    return flash ? (
      <div className={styles.overlay} aria-hidden="true">
        <span className={styles.flashSticker}>Cheat unlocked ✦</span>
      </div>
    ) : null;
  }

  if (pieces.length === 0) return null;

  return (
    <div className={styles.overlay} aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={`${styles.piece} ${styles[p.shape]}`}
          style={
            {
              left: `${p.left}vw`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              "--piece-color": p.color,
              "--drift": `${p.drift}px`,
              "--spin": `${p.spin}deg`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
