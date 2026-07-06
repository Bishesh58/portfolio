"use client";

import { useEffect, useState } from "react";
import styles from "./VisitorCounter.module.css";

const COUNTED_KEY = "portfolio-counted";

/** Retro hit counter in the footer. Each browser increments the tally once
 *  (localStorage-flagged); returning visitors just read the current figure.
 *  Renders nothing until a real count arrives, so a missing/unconfigured
 *  store leaves the footer untouched. */
export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    let counted = true;
    try {
      counted = !!localStorage.getItem(COUNTED_KEY);
    } catch {}

    fetch("/api/visits", { method: counted ? "GET" : "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count: number | null } | null) => {
        if (cancelled || typeof data?.count !== "number") return;
        setCount(data.count);
        if (!counted) {
          try {
            localStorage.setItem(COUNTED_KEY, "1");
          } catch {}
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <span className={styles.counter} title="Counted once per browser — old-school guestbook rules">
      <span className={styles.label}>Visitor №</span>
      <span className={styles.digits}>{String(Math.min(count, 999999)).padStart(6, "0")}</span>
    </span>
  );
}
