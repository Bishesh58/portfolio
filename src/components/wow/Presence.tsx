"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Presence.module.css";

const HEARTBEAT_MS = 10_000;

function tabId(): string {
  try {
    const existing = sessionStorage.getItem("presence-id");
    if (existing) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem("presence-id", id);
    return id;
  } catch {
    return `anon-${Math.random().toString(36).slice(2, 12)}`;
  }
}

/** Other visitors, live. Tiny robot markers hang off the progress rail at
 *  each reader's scroll position, plus a count chip bottom-left. Renders
 *  nothing when alone, when the tab is hidden, or when no store exists. */
export default function Presence() {
  const [peers, setPeers] = useState<number[]>([]);
  const [count, setCount] = useState(0);
  const disabled = useRef(false);

  useEffect(() => {
    const id = tabId();
    let timer: number | undefined;

    const beat = async () => {
      if (disabled.current) return;
      if (document.hidden) {
        timer = window.setTimeout(beat, HEARTBEAT_MS);
        return;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pos = max > 0 ? (window.scrollY / max) * 100 : 0;
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id, pos }),
        });
        const data = res.ok ? await res.json() : null;
        if (!data || data.peers === null) {
          disabled.current = true; // no store configured — stand down for good
          return;
        }
        setPeers(data.peers as number[]);
        setCount(data.count as number);
      } catch {
        // transient network issue — try again next beat
      }
      timer = window.setTimeout(beat, HEARTBEAT_MS);
    };

    const first = window.setTimeout(beat, 1200);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(timer);
    };
  }, []);

  if (count < 1) return null;

  return (
    <>
      <div className={styles.rail} aria-hidden="true">
        {peers.map((pos, i) => (
          <span key={i} className={styles.marker} style={{ left: `${pos}%` }}>
            <svg viewBox="0 0 16 15" width="16" height="15">
              <line x1="8" y1="4" x2="8" y2="1" stroke="var(--ink)" strokeWidth="1.6" />
              <circle cx="8" cy="1.4" r="1.3" fill="var(--red)" />
              <rect x="2" y="4" width="12" height="10" rx="3" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2" />
              <circle cx="5.8" cy="9" r="1.5" fill="var(--lime)" />
              <circle cx="10.2" cy="9" r="1.5" fill="var(--lime)" />
            </svg>
          </span>
        ))}
      </div>
      <div className={styles.chip} role="status">
        <i className={styles.dot} aria-hidden="true" />
        {count} other {count === 1 ? "reader" : "readers"} on this sheet
      </div>
    </>
  );
}
