"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionTitle from "@/components/SectionTitle";
import GhostNumber from "@/components/GhostNumber";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section className="section" id="skills" data-section="skills">
      <div className="container">
        <GhostNumber n="04" />
        <SectionTitle text="SKILLS" />
        <div className={styles.groups}>
          {resume.skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              className={`card ${styles.group}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: gi * 0.08 }}
            >
              <h3 className={styles.groupLabel} style={{ background: `var(--${group.accent})` }}>
                {group.label}
              </h3>
              <div className={styles.sheet}>
                {group.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className={styles.sticker}
                    style={{ transform: `rotate(${((si % 5) - 2) * 1.6}deg)` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
