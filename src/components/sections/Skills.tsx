"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { resume } from "@/data/resume";
import { skillIconUrl } from "@/lib/skillIcons";
import SectionHeader from "@/components/SectionHeader";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section className="section" id="skills" data-section="skills">
      <div className="container">
        <SectionHeader n="04" title="SKILLS" />
        <div className={styles.grid}>
          {resume.skillGroups.map((group, gi) => (
            <motion.article
              key={group.label}
              className={styles.card}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (gi % 3) * 0.06 }}
            >
              <header className={styles.cardHead}>
                <h3 className={styles.catTitle}>{group.label}</h3>
              </header>
              <div className={styles.tags}>
                {group.skills.map((skill) => (
                  <span key={skill.name} className={styles.tag}>
                    <Image
                      src={skillIconUrl(skill.icon)}
                      alt=""
                      width={18}
                      height={18}
                      className={styles.tagIcon}
                      aria-hidden="true"
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
