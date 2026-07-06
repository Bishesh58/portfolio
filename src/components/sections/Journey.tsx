"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionHeader from "@/components/SectionHeader";
import styles from "./Journey.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Journey() {
  return (
    <section className="section" id="journey" data-section="journey">
      <div className="container">
        <SectionHeader n="02" title="Experience" meta="2014 — Present" stamp="Logged" />
        <div className={styles.ledger}>
          {resume.timeline.map((entry, i) => (
            <motion.article
              key={`${entry.org}-${entry.start}`}
              className={styles.row}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.07, ease: EASE }}
            >
              <div className={styles.when}>
                <span className={styles.dates}>
                  {entry.start} — {entry.end}
                </span>
                <span className={styles.badges}>
                  <span
                    className={`${styles.kind} ${entry.kind === "education" ? styles.kindEdu : ""}`}
                  >
                    {entry.kind === "work" ? "Work" : "Study"}
                  </span>
                  {entry.end === "Present" && (
                    <span className={styles.current}>Current</span>
                  )}
                </span>
              </div>
              <div className={styles.what}>
                <h3 className={styles.title}>{entry.title}</h3>
                <p className={styles.org}>
                  {entry.org}
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
