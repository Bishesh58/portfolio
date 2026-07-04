"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function GhostNumber({ n }: { n: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <div ref={ref} className="ghost-number-wrap" aria-hidden="true">
      <motion.span className="ghost-number" style={{ y }}>
        {n}
      </motion.span>
    </div>
  );
}
