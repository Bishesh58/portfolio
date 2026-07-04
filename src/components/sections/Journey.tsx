"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionHeader from "@/components/SectionHeader";
import styles from "./Journey.module.css";

export default function Journey() {
  return (
    <section className="section" id="journey" data-section="journey">
      <div className="container">
        <SectionHeader n="02" title="MY JOURNEY" />
        <div className={styles.timeline}>
          {resume.timeline.map((entry, i) => (
            <motion.article
              key={`${entry.org}-${entry.start}`}
              className={`${styles.entry} ${entry.kind === "education" ? styles.entryEdu : ""}`}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            >
              <span className={styles.dot} aria-hidden="true" />
              <div className={`card ${styles.entryCard}`}>
                <span className={styles.kind}>{entry.kind === "work" ? "WORK" : "STUDY"}</span>
                <h3 className={styles.title}>
                  {entry.title} <span className={styles.org}>@ {entry.org}</span>
                </h3>
                <p className={styles.date}>
                  {entry.start} — {entry.end}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
                <p className={styles.summary}>{entry.summary}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
