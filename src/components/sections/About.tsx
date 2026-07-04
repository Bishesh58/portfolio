"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionHeader from "@/components/SectionHeader";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className="section" id="about" data-section="about">
      <div className="container">
        <SectionHeader n="01" title="ABOUT" />
        <motion.div
          className={`card ${styles.aboutCard}`}
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          {resume.about.map((paragraph, pi) => (
            <p className={styles.text} key={pi}>
              {paragraph.map((seg, si) =>
                seg.highlight ? (
                  <motion.span
                    key={si}
                    className={styles.hl}
                    style={{ backgroundImage: `linear-gradient(var(--${seg.highlight}), var(--${seg.highlight}))` }}
                    initial={{ backgroundSize: "0% 88%" }}
                    whileInView={{ backgroundSize: "100% 88%" }}
                    viewport={{ once: true, amount: 0.9 }}
                    transition={{ duration: 0.6, delay: 0.15 + si * 0.05 }}
                  >
                    {seg.text}
                  </motion.span>
                ) : (
                  <span key={si}>{seg.text}</span>
                )
              )}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
