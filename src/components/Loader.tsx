"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const VISITED_KEY = "portfolio-visited";

export default function Loader() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced || localStorage.getItem(VISITED_KEY)) {
      setVisible(false);
      return;
    }

    const finish = () => {
      localStorage.setItem(VISITED_KEY, "1");
      setVisible(false);
    };

    const timeouts = [setTimeout(finish, 1400)];
    const onLoad = () => timeouts.push(setTimeout(finish, 900));
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }
    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
    };
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
            <span className="loader-letter" style={{ background: "var(--yellow)", color: "var(--coal)" }}>B</span>
            <span className="loader-letter loader-letter--2" style={{ background: "var(--blue)", color: "var(--chalk)" }}>S</span>
          </div>
          <div className="loader-bar"><div className="loader-bar-fill" /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
