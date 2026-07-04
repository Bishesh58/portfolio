"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { resume } from "@/data/resume";
import RobotIllustration from "./RobotIllustration";
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
  const [photoTilted, setPhotoTilted] = useState(false);
  const [photoHover, setPhotoHover] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 5) setPhotoTilted(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showTilt = photoTilted && !photoHover;

  return (
    <section className={styles.hero} id="hero" data-section="hero">
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="eyebrow">// {resume.role} · {resume.location}</p>
          <h1 className={styles.name}>
            <p>I&apos;m</p>
            <p> {resume.name}</p>
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
          <div
            className={styles.portrait}
            onMouseEnter={() => setPhotoHover(true)}
            onMouseLeave={() => setPhotoHover(false)}
          >
            <span className={styles.tape} aria-hidden="true" />
            <RobotIllustration
              className={`${styles.robotImg} ${showTilt ? styles.robotTilted : ""}`}
            />
            <div className={styles.cvCta}>
              <div className={styles.cvArrowGroup}>
                <span className={styles.cvArrowText}>Download a CV</span>
                <Image
                  src="/arrow.png"
                  alt=""
                  width={120}
                  height={80}
                  className={styles.cvArrowImg}
                  aria-hidden="true"
                />
              </div>
              <a
                href={resume.resumePdf}
                download
                className={styles.cvBtn}
                aria-label="Download CV"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="18" x2="12" y2="12" stroke="currentColor" strokeWidth="2" />
                  <polyline points="9 15 12 18 15 15" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>
            </div>
          </div>
          <motion.span
            className={`${styles.sticker} ${styles.stickerCode}`}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            {"</>"}
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
