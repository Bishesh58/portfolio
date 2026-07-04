"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Loader() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return;
    }
    const finish = () => setVisible(false);
    const timeout = setTimeout(finish, 2500);
    if (document.readyState === "complete") {
      setTimeout(finish, 1400);
    } else {
      window.addEventListener("load", () => setTimeout(finish, 1400), { once: true });
    }
    return () => clearTimeout(timeout);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          exit={{ y: "-100%", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden="true"
        >
          <div className="loader-letters">
            <span className="loader-letter" style={{ background: "var(--yellow)" }}>B</span>
            <span className="loader-letter loader-letter--2" style={{ background: "var(--lime)" }}>S</span>
          </div>
          <div className="loader-bar"><div className="loader-bar-fill" /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
