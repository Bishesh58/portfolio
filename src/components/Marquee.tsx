"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface Props {
  items: string[];
  variant?: "blue" | "yellow";
  baseVelocity?: number;
}

export default function Marquee({ items, variant = "blue", baseVelocity = 2.5 }: Props) {
  const reduced = usePrefersReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-4, 0, 4], {
    clamp: false,
  });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  const row = items.map((item, i) => (
    <span key={i}>
      {item} <span className="marquee-star">★</span>
    </span>
  ));

  return (
    <div className={`marquee marquee--${variant}`} aria-hidden="true">
      <motion.div className="marquee-track" style={{ x }}>
        {row}{row}{row}{row}
      </motion.div>
    </div>
  );
}
