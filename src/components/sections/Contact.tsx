"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionTitle from "@/components/SectionTitle";
import GhostNumber from "@/components/GhostNumber";
import styles from "./Contact.module.css";

export default function Contact() {
  const github = resume.socials.find((s) => s.icon === "github");
  const linkedin = resume.socials.find((s) => s.icon === "linkedin");

  return (
    <section className="section" id="contact" data-section="contact">
      <div className="container">
        <GhostNumber n="05" />
        <SectionTitle text="CONTACT" />
        <motion.div
          className={`card ${styles.contactCard}`}
          initial={{ opacity: 0, y: 40, rotate: 1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <h3 className={styles.heading}>Let&apos;s build something.</h3>
          <p className={styles.sub}>
            Open to interesting full-stack work, collaborations, and good coffee in {resume.location}.
          </p>
          <div className={styles.actions}>
            <a className="btn" href={`mailto:${resume.email}`}>{resume.email}</a>
            <a className="btn btn--ghost" href={resume.resumePdf} download>
              Download résumé
            </a>
            {linkedin && (
              <a className="btn btn--ghost" href={linkedin.url} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {github && (
              <a className="btn btn--ghost" href={github.url} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
          </div>
          <p className={styles.phone}>
            or call <a href={`tel:+64${resume.phone.replace(/[^0-9]/g, "").replace(/^0/, "")}`}>{resume.phone}</a>
          </p>
          <div className={styles.certs}>
            {resume.certifications.map((c) => (
              <span key={c} className="tag">{c}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
