"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { resume } from "@/data/resume";
import styles from "./Hero.module.css";

const icons: Record<string, React.ReactNode> = {
  github: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0.3a12 12 0 0 0-3.8 23.4c0.6 0.1 0.8-0.3 0.8-0.6v-2c-3.3 0.7-4-1.6-4-1.6-0.6-1.4-1.4-1.8-1.4-1.8-1.1-0.7 0.1-0.7 0.1-0.7 1.2 0.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 0.1-0.8 0.4-1.3 0.8-1.6-2.7-0.3-5.5-1.3-5.5-5.9 0-1.3 0.5-2.4 1.2-3.2-0.1-0.3-0.5-1.5 0.1-3.2 0 0 1-0.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2 0.6 1.7 0.2 2.9 0.1 3.2 0.8 0.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9 0.4 0.4 0.8 1.1 0.8 2.2v3.3c0 0.3 0.2 0.7 0.8 0.6A12 12 0 0 0 12 0.3z"/>
    </svg>
  ),
  linkedin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.2V9h3.4v1.6h0.1c0.5-0.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.2 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7 20.4H3.4V9H7v11.4zM22.2 0H1.8C0.8 0 0 0.8 0 1.7v20.6c0 0.9 0.8 1.7 1.8 1.7h20.4c1 0 1.8-0.8 1.8-1.7V1.7c0-0.9-0.8-1.7-1.8-1.7z"/>
    </svg>
  ),
  email: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  ),
};

export default function Hero() {
  return (
    <section className={styles.hero} id="hero" data-section="hero">
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="eyebrow">// {resume.location}</p>
          <h1 className={styles.name}>
            I&apos;m <span className={styles.nameMark}>{resume.name}</span>.
          </h1>
          <p className={styles.tagline}>{resume.tagline}</p>
          <p className={styles.intro}>{resume.intro}</p>
          <div className={styles.socials}>
            {resume.socials.map((s) => (
              <a
                key={s.label}
                className={styles.socialBtn}
                href={s.url}
                target={s.icon === "email" ? undefined : "_blank"}
                rel={s.icon === "email" ? undefined : "noopener noreferrer"}
                aria-label={s.label}
              >
                {icons[s.icon]}
              </a>
            ))}
            <a className="btn" href="#contact">Get in touch</a>
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, rotate: 4, y: 30 }}
          animate={{ opacity: 1, rotate: 2, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.portrait}>
            <span className={styles.tape} aria-hidden="true" />
            <Image src="/robot.png" alt="Illustrated robot working on a laptop — Bishesh's mascot" width={420} height={452} priority />
            <span className={styles.portraitLabel}>full-stack unit #58</span>
          </div>
          <motion.span
            className={`${styles.sticker} ${styles.stickerCode}`}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            {"</>"}
          </motion.span>
          <motion.span
            className={`${styles.sticker} ${styles.stickerBolt}`}
            animate={{ y: [0, 10, 0], rotate: [-6, 4, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            ⚡
          </motion.span>
        </motion.div>
      </div>

      <div className={`container ${styles.badges}`}>
        {resume.techBadges.map((t, i) => (
          <motion.span
            key={t}
            className="tag"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.06 }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
