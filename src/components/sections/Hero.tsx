"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { track } from "@vercel/analytics";
import { resume } from "@/data/resume";
import { useNZNight } from "@/hooks/useNZNight";
import RobotIllustration from "./RobotIllustration";
import styles from "./Hero.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Assembly-line intro: on a visitor's first ever load the robot figure is
 *  manufactured — frame craned in, illustration plotted top-to-bottom behind
 *  a print head, spec plate fitted, QC stamp slammed, sticker applied.
 *  Returning visitors get the regular entrance; ?assemble=1 replays it. */
type AsmPhase = "wait" | "drop" | "print" | "plate" | "stamp" | "done";
const ASM_ORDER: AsmPhase[] = ["wait", "drop", "print", "plate", "stamp", "done"];

const icons: Record<string, React.ReactNode> = {
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0.3a12 12 0 0 0-3.8 23.4c0.6 0.1 0.8-0.3 0.8-0.6v-2c-3.3 0.7-4-1.6-4-1.6-0.6-1.4-1.4-1.8-1.4-1.8-1.1-0.7 0.1-0.7 0.1-0.7 1.2 0.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 0.1-0.8 0.4-1.3 0.8-1.6-2.7-0.3-5.5-1.3-5.5-5.9 0-1.3 0.5-2.4 1.2-3.2-0.1-0.3-0.5-1.5 0.1-3.2 0 0 1-0.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2 0.6 1.7 0.2 2.9 0.1 3.2 0.8 0.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9 0.4 0.4 0.8 1.1 0.8 2.2v3.3c0 0.3 0.2 0.7 0.8 0.6A12 12 0 0 0 12 0.3z"/>
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.2V9h3.4v1.6h0.1c0.5-0.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.2 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7 20.4H3.4V9H7v11.4zM22.2 0H1.8C0.8 0 0 0.8 0 1.7v20.6c0 0.9 0.8 1.7 1.8 1.7h20.4c1 0 1.8-0.8 1.8-1.7V1.7c0-0.9-0.8-1.7-1.8-1.7z"/>
    </svg>
  ),
  email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="0" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  ),
};

/** Per-letter spans so each glyph can react to a cursor sweep */
function Letters({ word }: { word: string }) {
  return (
    <>
      {word.split("").map((ch, i) => (
        <span key={i} className={styles.letter}>
          {ch}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const night = useNZNight();
  const [first, last] = resume.name.split(" ");

  const [asm, setAsm] = useState<"pending" | "run" | "off">("pending");
  const [phase, setPhase] = useState<AsmPhase>("wait");
  const idx = ASM_ORDER.indexOf(phase);

  useEffect(() => {
    const reducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const forced = new URLSearchParams(window.location.search).get("assemble") === "1";
    let firstVisit = false;
    try {
      firstVisit = !localStorage.getItem("portfolio-visited");
    } catch {}
    if (reducedNow || (!forced && !firstVisit)) {
      setAsm("off");
      setPhase("done");
      return;
    }
    setAsm("run");
    // On a true first visit the loader owns the first ~1.9s of screen time
    const t0 = firstVisit ? 1900 : 400;
    const steps: Array<[AsmPhase, number]> = [
      ["drop", t0],
      ["print", t0 + 700],
      ["plate", t0 + 2250],
      ["stamp", t0 + 2600],
      ["done", t0 + 3100],
    ];
    const ts = steps.map(([p, ms]) => window.setTimeout(() => setPhase(p), ms));
    return () => ts.forEach(clearTimeout);
  }, []);

  const asideMotion =
    asm === "run"
      ? {
          initial: { opacity: 0, y: -300, rotate: -5 },
          animate:
            idx >= 1
              ? { opacity: 1, y: 0, rotate: 1.5 }
              : { opacity: 0, y: -300, rotate: -5 },
          transition: { type: "spring" as const, stiffness: 200, damping: 15 },
        }
      : asm === "off"
        ? {
            initial: { opacity: 0, y: 40, rotate: 4 },
            animate: { opacity: 1, y: 0, rotate: 1.5 },
            transition: { duration: 0.7, delay: 0.5, ease: EASE },
          }
        : { initial: { opacity: 0 }, animate: { opacity: 0 }, transition: { duration: 0 } };

  return (
    <section
      className={styles.hero}
      id="hero"
      data-section="hero"
      data-note="Nameplate: per-letter spans, mask-revealed y:110%→0, ease [0.22,1,0.36,1]. Sticker: pointer drag with snap-back spring, stiffness 420."
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.body}>
          <div className={styles.copy}>
            <h1 className={styles.nameplate}>
              <span className={styles.lineMask}>
                <motion.span
                  className={styles.line}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                >
                  <Letters word={first} />
                </motion.span>
              </span>
              <span className={styles.lineMask}>
                <motion.span
                  className={`${styles.line} ${styles.lineOutline}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.34, ease: EASE }}
                >
                  <Letters word={last} />
                </motion.span>
              </span>
            </h1>

            <motion.div
              className={styles.copyBlock}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: EASE }}
            >
              <p className={styles.tagline}>
                I build <mark className={styles.mark}>the tools teams run on</mark>.
              </p>
              <p className={styles.intro}>{resume.intro}</p>
              <div className={styles.ctas}>
                <a className="btn" href="#contact">Get in touch<span aria-hidden="true">→</span></a>
                <a
                  className="btn btn--ghost"
                  href={resume.resumePdf}
                  download
                  onClick={() => track("cv_download", { source: "hero" })}
                >
                  Download CV<span aria-hidden="true">↓</span>
                </a>
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
                </div>
              </div>
            </motion.div>
          </div>

          <motion.aside className={styles.unit} {...asideMotion}>
            <figure className={styles.frame}>
              <div className={styles.printArea}>
                <motion.div
                  initial={false}
                  animate={{
                    clipPath:
                      asm === "run" && idx < 2
                        ? "inset(0% 0% 100% 0%)"
                        : "inset(0% 0% 0% 0%)",
                  }}
                  transition={{ duration: phase === "print" ? 1.5 : 0, ease: "linear" }}
                >
                  <RobotIllustration className={styles.robotImg} />
                </motion.div>
                {asm === "run" && phase === "print" && (
                  <motion.div
                    className={styles.printHead}
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    aria-hidden="true"
                  />
                )}
              </div>
              <motion.figcaption
                className={styles.plate}
                initial={false}
                animate={
                  asm !== "run" || idx >= 3
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.3, ease: EASE }}
              >
                <span>Fig. 01 — The Operator</span>
                <span className={styles.plateStatus}>
                  {night ? "Status: recharging" : "Status: shipping"}
                </span>
              </motion.figcaption>
              <motion.span
                className={styles.qcStamp}
                initial={false}
                animate={
                  asm !== "run" || idx >= 4
                    ? { opacity: 0.9, scale: 1, rotate: -8 }
                    : { opacity: 0, scale: 2.4, rotate: 2 }
                }
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              >
                QC passed
              </motion.span>
            </figure>
            {(asm !== "run" || idx >= 5) && (
              <motion.span
                className={styles.sticker}
                initial={asm === "run" ? { scale: 0 } : false}
                animate={{ scale: 1, y: [0, -8, 0] }}
                transition={{
                  scale: { type: "spring", stiffness: 380, damping: 16 },
                  y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                }}
                drag
                dragSnapToOrigin
                dragElastic={0.25}
                dragTransition={{ bounceStiffness: 420, bounceDamping: 14 }}
                whileDrag={{ scale: 1.12, rotate: -6, cursor: "grabbing" }}
                aria-hidden="true"
              >
                {"</>"}
              </motion.span>
            )}
          </motion.aside>
        </div>

        <motion.div
          className={styles.scrollCue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          aria-hidden="true"
        >
          <span>Scroll for the spec</span>
          <span className={styles.scrollArrow}>↓</span>
          <span className={styles.cueDivider} />
          <span className={styles.cueKeys}>
            <kbd className={styles.kbd}>Ctrl</kbd>
            <kbd className={styles.kbd}>K</kbd>
          </span>
          <span>for commands</span>
        </motion.div>
      </div>
    </section>
  );
}
