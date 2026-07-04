"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionTitle from "@/components/SectionTitle";
import GhostNumber from "@/components/GhostNumber";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section className="section" id="projects" data-section="projects">
      <div className="container">
        <GhostNumber n="03" />
        <SectionTitle text="PROJECTS" />
        <p className={`eyebrow ${styles.note}`}>
          // internal tools shipped at the Islington group — no public links, real impact
        </p>
        <div className={styles.grid}>
          {resume.projects.map((project, i) => (
            <motion.article
              key={project.title}
              className={`card ${styles.projectCard}`}
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.cardTop} style={{ background: `var(--${project.accent})` }}>
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.dots} aria-hidden="true">
                  <i /><i /><i />
                </span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.impact}>{project.impact}</p>
                <div className={styles.tags}>
                  {project.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
