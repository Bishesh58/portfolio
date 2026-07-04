"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionHeader from "@/components/SectionHeader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./Contact.module.css";

type NoteAccent = "yellow" | "paper" | "cobalt" | "teal" | "lime" | "pink";

const contactLinks = (
  github: { url: string } | undefined,
  linkedin: { url: string } | undefined,
) => [
  {
    label: "Email",
    value: resume.email,
    href: `mailto:${resume.email}`,
    icon: "@",
    accent: "yellow" as NoteAccent,
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: resume.resumePdf,
    icon: "PDF",
    download: true,
    accent: "paper" as NoteAccent,
  },
  ...(linkedin
    ? [{
        label: "LinkedIn",
        value: "Connect",
        href: linkedin.url,
        icon: "in",
        external: true,
        accent: "cobalt" as NoteAccent,
      }]
    : []),
  ...(github
    ? [{
        label: "GitHub",
        value: "View repos",
        href: github.url,
        icon: "GH",
        external: true,
        accent: "teal" as NoteAccent,
      }]
    : []),
];

export default function Contact() {
  const reduced = usePrefersReducedMotion();
  const github = resume.socials.find((s) => s.icon === "github");
  const linkedin = resume.socials.find((s) => s.icon === "linkedin");
  const links = contactLinks(github, linkedin);

  return (
    <section className="section" id="contact" data-section="contact">
      <div className="container">
        <SectionHeader n="05" title="CONTACT" />

        <motion.div
          className={styles.book}
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.spread}>
            <article className={`${styles.page} ${styles.pageLeft}`}>
              <span className={styles.pageNum} aria-hidden="true">05</span>

              <div className={styles.noteBoard}>
                <div
                  className={`${styles.stickyNote} ${styles.introNote} ${styles["note--pink"]}`}
                >
                  <span className={styles.tape} aria-hidden="true" />
                  <span className={styles.noteIcon}>Hi</span>
                  <h3 className={styles.noteTitle}>Let&apos;s build something.</h3>
                  <p className={styles.noteBody}>
                    Full-stack work, collaborations, and good coffee in {resume.location}.
                  </p>
                </div>

                <nav className={styles.contactNotes} aria-label="Contact links">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      className={`${styles.stickyNote} ${styles.actionNote} ${styles[`note--${link.accent}`]}`}
                      href={link.href}
                      {...("download" in link && link.download ? { download: true } : {})}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <span className={styles.tape} aria-hidden="true" />
                      <span className={styles.noteIcon}>{link.icon}</span>
                      <span className={styles.handLabel}>{link.label}</span>
                      <span className={styles.noteValue}>{link.value}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </article>

            <div className={styles.spine} aria-hidden="true">
              <span className={styles.spineText}>{resume.name}</span>
            </div>

            <article className={`${styles.page} ${styles.pageRight}`}>
              <span className={styles.pageNum} aria-hidden="true">06</span>

              <div className={styles.noteBoard}>
                <div
                  className={`${styles.stickyNote} ${styles.roleNote} ${styles["note--lime"]}`}
                >
                  <span className={styles.tape} aria-hidden="true" />
                  <span className={styles.noteIcon}>FS</span>
                  <span className={styles.handLabel}>{resume.role}</span>
                  <span className={styles.noteValue}>{resume.location}</span>
                </div>

                <ul className={styles.badgeNotes}>
                  {resume.certifications.map((cert, i) => (
                    <li
                      key={cert}
                      className={`${styles.stickyNote} ${styles.badgeNote} ${i % 2 === 0 ? styles["note--yellow"] : styles["note--paper"]}`}
                    >
                      <span className={styles.tape} aria-hidden="true" />
                      <span className={styles.noteIcon}>{i === 0 ? "ICP" : "TOP"}</span>
                      <span className={styles.handLabel}>{i === 0 ? "Certified" : "Award"}</span>
                      <span className={styles.noteValue}>{cert}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`${styles.stickyNote} ${styles.footNote} ${styles["note--teal"]}`}
                >
                  <span className={styles.tape} aria-hidden="true" />
                  <span className={styles.noteIcon}>//</span>
                  <p className={styles.noteBody}>
                    Shipped internal tools at scale - happy to talk architecture, ERP, and dashboards.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
