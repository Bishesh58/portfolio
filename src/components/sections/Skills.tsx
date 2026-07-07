"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { resume } from "@/data/resume";
import { skillIconUrl } from "@/lib/skillIcons";
import SectionHeader from "@/components/SectionHeader";
import styles from "./Skills.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  return (
    <section
      className="section"
      id="skills"
      data-section="skills"
      data-note="Icons: 32 SVGs self-hosted in /icons — the CDN deleted four brands mid-2026, so everything is vendored. Zero third-party requests."
    >
      <div className="container">
        <SectionHeader n="04" title="Toolkit" meta="Daily drivers" stamp="Battle-tested" />
        <motion.div
          className={styles.table}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {resume.skillGroups.map((group) => (
            <div className={styles.row} key={group.label}>
              <h3 className={styles.label}>{group.label}</h3>
              <ul className={styles.cells}>
                {group.skills.map((skill) => (
                  <li key={skill.name} className={styles.chip}>
                    <Image
                      src={skillIconUrl(skill.icon)}
                      alt=""
                      width={18}
                      height={18}
                      className={styles.chipIcon}
                      aria-hidden="true"
                    />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
