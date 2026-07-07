"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { resume } from "@/data/resume";
import styles from "./Contact.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Live wall clock in my timezone — visitors see when I'm actually awake. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-NZ", {
      timeZone: "Pacific/Auckland",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span>Local time {time ?? "--:--:--"} NZT</span>;
}

export default function Contact() {
  const github = resume.socials.find((s) => s.icon === "github");
  const linkedin = resume.socials.find((s) => s.icon === "linkedin");

  const actions = [
    { label: "Email me", hint: "Fastest route", href: `mailto:${resume.email}`, mark: "→" },
    ...(linkedin
      ? [{ label: "LinkedIn", hint: "Connect", href: linkedin.url, mark: "↗", external: true }]
      : []),
    ...(github
      ? [{ label: "GitHub", hint: "View repos", href: github.url, mark: "↗", external: true }]
      : []),
    { label: "Download CV", hint: "PDF, one page", href: resume.resumePdf, mark: "↓", download: true },
  ];

  return (
    <section
      className={styles.band}
      id="contact"
      data-section="contact"
      data-note="Inverted band: background var(--ink) — flips itself in dark mode for free. Clock: Intl.DateTimeFormat, Pacific/Auckland, 1s tick, SSR-safe null first paint."
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className={styles.eyebrow}>{"//"} 05 — Final page of the spec</p>
          <h2 className={styles.headline}>
            <span className={styles.headlineLine}>Let&apos;s build</span>
            <span className={`${styles.headlineLine} ${styles.headlineAlt}`}>something.</span>
          </h2>
          <p className={styles.pitch}>
            Full-stack roles, contract work, or a hard problem worth talking through —
            my inbox is open.
          </p>
          <a className={styles.email} href={`mailto:${resume.email}`}>
            {resume.email}
          </a>
        </motion.div>

        <motion.nav
          className={styles.actions}
          aria-label="Contact links"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
        >
          {actions.map((a) => (
            <a
              key={a.label}
              className={styles.action}
              href={a.href}
              {...("download" in a && a.download ? { download: true } : {})}
              {...("external" in a && a.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className={styles.actionLabel}>
                {a.label} <span aria-hidden="true">{a.mark}</span>
              </span>
              <span className={styles.actionHint}>{a.hint}</span>
            </a>
          ))}
        </motion.nav>

        <div className={styles.meta}>
          <span>{resume.location}</span>
          <LocalTime />
          <span>{resume.phone}</span>
          <span>Replies faster than a cron job</span>
        </div>
      </div>
    </section>
  );
}
