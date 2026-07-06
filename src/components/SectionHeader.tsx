"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Props {
  n: string;
  title: string;
  meta?: string;
  stamp?: string;
}

/** Bordered index bar: [nn] TITLE ..................... META, with an optional
 *  rubber stamp that slams onto the bar as it scrolls into view. */
export default function SectionHeader({ n, title, meta, stamp }: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.header
      className="sec-head"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="sec-head-num" aria-hidden="true">{n}</span>
      <h2 className="sec-head-title">{title}</h2>
      {meta ? <span className="sec-head-meta">{meta}</span> : null}
      {stamp ? (
        <motion.span
          className="sec-head-stamp"
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, scale: 2.6, rotate: 4 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1, rotate: -8 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {stamp}
        </motion.span>
      ) : null}
    </motion.header>
  );
}
