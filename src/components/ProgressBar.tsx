"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useActiveSection } from "@/lib/sectionStore";
import type { SectionId } from "@/data/quips";

const checkpoints: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const active = useActiveSection();

  return (
    <div className="progress" aria-hidden="true">
      <motion.div className="progress-fill" style={{ scaleX }} />
      <div className="progress-checkpoints">
        {checkpoints.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={`checkpoint${active === c.id ? " checkpoint--active" : ""}`}
            tabIndex={-1}
          >
            <span className="checkpoint-dot" />
            <span className="checkpoint-label">{c.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
