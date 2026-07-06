"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./ShortcutHint.module.css";

/**
 * ShortcutHint — a tasteful, on-demand keyboard-shortcuts card.
 *
 * Press "?" anywhere (outside a text field) to reveal a brutalist cheat-sheet
 * of navigation shortcuts; it also winks at the hidden Konami easter egg.
 * Because it is summoned on demand and centred as a modal, it never sits
 * permanently over the header, mascot, cursor or progress line — there is no
 * persistent chrome to collide with.
 *
 * Accessibility: it is a labelled modal dialog (role="dialog", aria-modal),
 * moves focus into the panel on open, restores focus to the previously focused
 * element on close, and closes on Escape or backdrop click. Motion is gated by
 * usePrefersReducedMotion().
 *
 * The listed section shortcuts jump to the matching page anchors, so they work
 * with the site's existing #hero/#about/#projects/#contact structure.
 */

type Shortcut = { keys: string[]; label: string; href?: string };

const SHORTCUTS: Shortcut[] = [
  { keys: ["Ctrl", "K"], label: "Command palette" },
  { keys: ["X"], label: "Blueprint x-ray" },
  { keys: ["H", "I", "R", "E"], label: "Type it anywhere" },
  { keys: ["G", "H"], label: "Go to top / hero", href: "#hero" },
  { keys: ["G", "A"], label: "Go to About", href: "#about" },
  { keys: ["G", "P"], label: "Go to Projects", href: "#projects" },
  { keys: ["G", "C"], label: "Go to Contact", href: "#contact" },
  { keys: ["?"], label: "Toggle this panel" },
  { keys: ["Esc"], label: "Close" },
];

export const SHORTCUTS_EVENT = "open-shortcuts";

// "G then <key>" jump targets.
const GOTO: Record<string, string> = {
  h: "#hero",
  a: "#about",
  p: "#projects",
  c: "#contact",
};

export default function ShortcutHint() {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const awaitingGoto = useRef(false);
  const gotoTimer = useRef<number | null>(null);

  const isEditable = (el: EventTarget | null) => {
    const t = el as HTMLElement | null;
    return (
      !!t &&
      (t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA" ||
        t.isContentEditable)
    );
  };

  const jumpTo = useCallback(
    (hash: string) => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
      }
    },
    [reduced],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        return;
      }
      if (isEditable(e.target)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // "G then letter" navigation.
      if (awaitingGoto.current) {
        awaitingGoto.current = false;
        if (gotoTimer.current) window.clearTimeout(gotoTimer.current);
        const dest = GOTO[e.key.toLowerCase()];
        if (dest) {
          e.preventDefault();
          jumpTo(dest);
          return;
        }
      }

      if (e.key === "?") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }

      if (e.key.toLowerCase() === "g") {
        awaitingGoto.current = true;
        if (gotoTimer.current) window.clearTimeout(gotoTimer.current);
        gotoTimer.current = window.setTimeout(() => {
          awaitingGoto.current = false;
        }, 900);
      }
    };

    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(SHORTCUTS_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(SHORTCUTS_EVENT, onOpen);
      if (gotoTimer.current) window.clearTimeout(gotoTimer.current);
    };
  }, [open, jumpTo]);

  // Focus management: capture prior focus, move focus in, restore on close.
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      // Defer so the panel is mounted.
      const id = window.requestAnimationFrame(() => panelRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
    lastFocused.current?.focus?.();
  }, [open]);

  const animate = !reduced;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          onClick={() => setOpen(false)}
          initial={animate ? { opacity: 0 } : false}
          animate={animate ? { opacity: 1 } : undefined}
          exit={animate ? { opacity: 0 } : undefined}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            initial={animate ? { opacity: 0, y: 18, rotate: -1 } : false}
            animate={animate ? { opacity: 1, y: 0, rotate: 0 } : undefined}
            exit={animate ? { opacity: 0, y: 18, rotate: -1 } : undefined}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            <div className={styles.head}>
              <span className="eyebrow">Keyboard</span>
              <button
                type="button"
                className={styles.close}
                aria-label="Close shortcuts"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <h2 className={styles.title}>Shortcuts</h2>

            <ul className={styles.list}>
              {SHORTCUTS.map((s) => (
                <li key={s.label} className={styles.row}>
                  <span className={styles.keys}>
                    {s.keys.map((k, i) => (
                      <kbd key={i} className={styles.kbd}>
                        {k}
                      </kbd>
                    ))}
                  </span>
                  {s.href ? (
                    <a
                      className={styles.rowLabel}
                      href={s.href}
                      onClick={() => setOpen(false)}
                    >
                      {s.label}
                    </a>
                  ) : (
                    <span className={styles.rowLabel}>{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
