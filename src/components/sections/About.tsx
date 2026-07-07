"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { resume } from "@/data/resume";
import type { AboutSegment } from "@/data/types";
import SectionHeader from "@/components/SectionHeader";
import styles from "./About.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Paragraph whose highlights sweep in like a marker when scrolled into view */
function Statement({ paragraph }: { paragraph: AboutSegment[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  let markIndex = -1;
  return (
    <p ref={ref} className={`${styles.text} ${inView ? styles.textInView : ""}`}>
      {paragraph.map((seg, si) => {
        if (!seg.highlight) return <span key={si}>{seg.text}</span>;
        markIndex += 1;
        return (
          <mark
            className={styles.mark}
            key={si}
            style={{ transitionDelay: inView ? `${0.2 + markIndex * 0.22}s` : "0s" }}
          >
            {seg.text}
          </mark>
        );
      })}
    </p>
  );
}

const facts = [
  { label: "Base", value: "Auckland, New Zealand" },
  { label: "Experience", value: "4+ years" },
  { label: "Focus", value: "Internal platforms, ERP & dashboards" },
  { label: "Daily stack", value: "Vue · React · Node.js · Laravel" },
  { label: "Certified", value: "ICAgile Professional (ICP)" },
  { label: "Award", value: "Top Capstone Project — Unitec" },
];

export default function About() {
  return (
    <section
      className="section"
      id="about"
      data-section="about"
      data-note="Marker highlights: <mark> sweep via transition-delay stagger, 0.22s per mark, fires at 60% in view. Copy lives in typed resume.ts — one source of truth."
    >
      <div className="container">
        <SectionHeader n="01" title="Profile" meta="The short version" stamp="Verified" />
        <div className={styles.grid}>
          <motion.div
            className={styles.statement}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {resume.about.map((paragraph, pi) => (
              <Statement paragraph={paragraph} key={pi} />
            ))}
          </motion.div>

          <motion.aside
            className={styles.spec}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
          >
            <h3 className={styles.specTitle}>Spec sheet</h3>
            <dl className={styles.specList}>
              {facts.map((f) => (
                <div className={styles.specRow} key={f.label}>
                  <dt className={styles.specLabel}>{f.label}</dt>
                  <dd className={styles.specValue}>{f.value}</dd>
                </div>
              ))}
            </dl>
            <span className={styles.stamp} aria-hidden="true">Open to work</span>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
