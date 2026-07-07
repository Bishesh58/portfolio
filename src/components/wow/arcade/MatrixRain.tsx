"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./RobotArcade.module.css";

/** Code rain for DEBUG MODE — a quiet column drizzle of dev glyphs behind
 *  the playfield. Deliberately faint (max ~0.18 alpha) so the bugs stay the
 *  focus; skipped entirely under prefers-reduced-motion. */
const GLYPHS = "01{}[]<>/=+*;:$#&%!?~^".split("");
const CELL = 18;
const TRAIL = 9;

export default function MatrixRain() {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let cols: { y: number; v: number }[] = [];

    const resize = () => {
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Array.from({ length: Math.ceil(W / CELL) }, () => ({
        y: Math.random() * H,
        v: 45 + Math.random() * 55, // px/s — a drizzle, not a storm
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let raf = 0;
    let last = performance.now();
    let frames = 0;
    let green = "#1f9d4d";

    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      // theme can flip mid-game; re-read the token occasionally
      if (frames++ % 120 === 0) {
        green =
          getComputedStyle(document.documentElement).getPropertyValue("--green").trim() ||
          green;
      }
      ctx.clearRect(0, 0, W, H);
      ctx.font = "700 13px monospace";
      ctx.fillStyle = green;
      for (let i = 0; i < cols.length; i++) {
        const col = cols[i];
        col.y += col.v * dt;
        if (col.y - TRAIL * CELL > H) {
          col.y = -Math.random() * H * 0.5;
          col.v = 45 + Math.random() * 55;
        }
        const headRow = Math.floor(col.y / CELL);
        for (let k = 0; k < TRAIL; k++) {
          const row = headRow - k;
          const y = row * CELL;
          if (y < -CELL || y > H + CELL) continue;
          ctx.globalAlpha = 0.18 * (1 - k / TRAIL);
          // glyphs are stable per grid cell — the light sweeps, the code stays
          ctx.fillText(GLYPHS[(i * 31 + row * 7) % GLYPHS.length], i * CELL + 4, y);
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduced]);

  if (reduced) return null;
  return <canvas ref={canvasRef} className={styles.rain} aria-hidden="true" />;
}
