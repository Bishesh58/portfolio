"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionHeader from "@/components/SectionHeader";
import styles from "./Projects.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "08", label: "Tools shipped" },
  { value: "04", label: "Brands served" },
  { value: "100%", label: "In production" },
];

export default function Projects() {
  return (
    <section className="section" id="projects" data-section="projects">
      <div className="container">
        <SectionHeader n="03" title="Build Log" meta="Internal platform work" stamp="Shipped" />

        <motion.p
          className={styles.note}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          {"//"} Built for the Islington Group — four brands, one platform. No public
          demos; real teams use these every day.
        </motion.p>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {stats.map((s) => (
            <div className={styles.stat} key={s.label}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        <div className={styles.ledger}>
          <div className={styles.ledgerHead} aria-hidden="true">
            <span>No.</span>
            <span>Tool</span>
            <span className={styles.ledgerHeadStack}>Stack</span>
          </div>
          {resume.projects.map((project, i) => (
            <motion.article
              key={project.title}
              className={styles.row}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05, ease: EASE }}
            >
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <div className={styles.main}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.impact}>{project.impact}</p>
              </div>
              <div className={styles.tags}>
                {project.tags.map((t) => (
                  <span className={styles.chip} key={t}>{t}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
