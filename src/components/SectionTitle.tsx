"use client";

import { motion } from "motion/react";

const letterVariants = {
  hidden: { y: "110%", rotate: 6 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function SectionTitle({ text }: { text: string }) {
  return (
    <motion.h2
      className="section-title"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.04 }}
    >
      {Array.from(text).map((char, i) => (
        <span className="section-title-mask" key={i} aria-hidden="true">
          <motion.span className="section-title-letter" variants={letterVariants}>
            {char === " " ? " " : char}
          </motion.span>
        </span>
      ))}
      <span className="visually-hidden">{text}</span>
    </motion.h2>
  );
}
