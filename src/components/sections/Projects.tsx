"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { resume } from "@/data/resume";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionHeader from "@/components/SectionHeader";
import styles from "./Projects.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const reduced = usePrefersReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="section"
      id="projects"
      data-section="projects"
      data-note="Dossiers: height:auto accordion, one file open at a time, aria-expanded/aria-controls disclosure. Row hover inverts the full grid row — the signature move."
    >
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
          demos; real teams use these every day. Open a file for the work order.
        </motion.p>

        <div className={styles.ledger}>
          <div className={styles.ledgerHead} aria-hidden="true">
            <span>No.</span>
            <span>Tool</span>
            <span className={styles.ledgerHeadStack}>Stack</span>
          </div>
          {resume.projects.map((project, i) => {
            const open = openIndex === i;
            const dossier = project.dossier;
            return (
              <motion.article
                key={project.title}
                className={`${styles.row} ${open ? styles.rowOpen : ""}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05, ease: EASE }}
              >
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                <div className={styles.main}>
                  <h3 className={styles.title}>
                    {dossier ? (
                      <button
                        type="button"
                        className={styles.titleBtn}
                        aria-expanded={open}
                        aria-controls={`dossier-${i}`}
                        onClick={() => setOpenIndex(open ? null : i)}
                      >
                        {project.title}
                        <span className={styles.fileTag}>
                          {open ? "[ close file − ]" : "[ open file + ]"}
                        </span>
                      </button>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className={styles.impact}>{project.impact}</p>

                  {dossier && (
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={`dossier-${i}`}
                          className={styles.dossierWrap}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
                        >
                          <div className={styles.dossier}>
                            <div className={styles.dossierHead}>
                              <span>Work order № {String(i + 1).padStart(2, "0")}</span>
                              <span className={styles.dossierAccess}>Access: internal</span>
                            </div>
                            <dl className={styles.dossierBody}>
                              <div className={styles.dossierField}>
                                <dt className={styles.fieldLabel}>Problem</dt>
                                <dd className={styles.fieldText}>{dossier.problem}</dd>
                              </div>
                              <div className={styles.dossierField}>
                                <dt className={styles.fieldLabel}>Build</dt>
                                <dd className={styles.fieldText}>{dossier.build}</dd>
                              </div>
                              <div className={styles.dossierField}>
                                <dt className={styles.fieldLabel}>Outcome</dt>
                                <dd className={styles.fieldText}>{dossier.outcome}</dd>
                              </div>
                            </dl>
                            <div className={styles.dossierMeta}>
                              <span>
                                <strong>For:</strong> {dossier.users}
                              </span>
                              <span>
                                <strong>Status:</strong> {dossier.status}
                              </span>
                              <span className={styles.redacted}>
                                <strong>Figures:</strong>{" "}
                                <span className={styles.redactBar} aria-hidden="true" />
                                <span className={styles.redactNote}>ask me in person</span>
                              </span>
                            </div>
                            <span className={styles.dossierStamp} aria-hidden="true">
                              No public demo
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
                <div className={styles.tags}>
                  {project.tags.map((t) => (
                    <span className={styles.chip} key={t}>{t}</span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
