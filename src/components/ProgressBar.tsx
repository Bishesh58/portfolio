"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <div className="progress" aria-hidden="true">
      <motion.div className="progress-fill" style={{ scaleX }} />
    </div>
  );
}
