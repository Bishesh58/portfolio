"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { track } from "@vercel/analytics";
import { resume } from "@/data/resume";
import { BLUEPRINT_EVENT } from "@/components/wow/BlueprintMode";
import { TOUR_EVENT } from "@/components/RobotMascot/Mascot";
import { ARCADE_EVENT } from "@/components/wow/arcade/RobotArcade";
import { useTheme } from "@/hooks/useTheme";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./CommandPalette.module.css";

type Group = "Navigate" | "Actions" | "Links";

type Command = {
  id: string;
  group: Group;
  label: string;
  hint: string;
  run: () => void;
  keepOpen?: boolean;
};

const GROUP_ORDER: Group[] = ["Navigate", "Actions", "Links"];

export const PALETTE_EVENT = "open-palette";

export default function CommandPalette() {
  const reduced = usePrefersReducedMotion();
  const { toggle: toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    setCopied(false);
  }, []);

  const jump = useCallback(
    (hash: string) => {
      document.querySelector(hash)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    },
    [reduced],
  );

  const commands = useMemo<Command[]>(() => {
    const github = resume.socials.find((s) => s.icon === "github");
    const linkedin = resume.socials.find((s) => s.icon === "linkedin");
    return [
      { id: "top", group: "Navigate", label: "Go to top", hint: "hero", run: () => jump("#hero") },
      { id: "profile", group: "Navigate", label: "Profile", hint: "01", run: () => jump("#about") },
      { id: "experience", group: "Navigate", label: "Experience", hint: "02", run: () => jump("#journey") },
      { id: "buildlog", group: "Navigate", label: "Build log", hint: "03", run: () => jump("#projects") },
      { id: "toolkit", group: "Navigate", label: "Toolkit", hint: "04", run: () => jump("#skills") },
      { id: "contact", group: "Navigate", label: "Contact", hint: "05", run: () => jump("#contact") },
      { id: "theme", group: "Actions", label: "Toggle theme", hint: "light / dark", run: () => toggleTheme() },
      {
        id: "blueprint",
        group: "Actions",
        label: "Blueprint x-ray",
        hint: "or press X",
        run: () => window.dispatchEvent(new Event(BLUEPRINT_EVENT)),
      },
      {
        id: "tour",
        group: "Actions",
        label: "Guided tour",
        hint: "the robot narrates",
        run: () => window.dispatchEvent(new Event(TOUR_EVENT)),
      },
      {
        id: "arcade",
        group: "Actions",
        label: "Robot arcade",
        hint: "squash bugs before prod",
        run: () => window.dispatchEvent(new Event(ARCADE_EVENT)),
      },
      {
        id: "copy-email",
        group: "Actions",
        label: copied ? "Copied to clipboard ✓" : "Copy email address",
        hint: resume.email,
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText(resume.email).then(() => {
            setCopied(true);
            window.setTimeout(close, 900);
          });
        },
      },
      {
        id: "cv",
        group: "Actions",
        label: "Download CV",
        hint: "pdf",
        run: () => {
          track("cv_download", { source: "palette" });
          const a = document.createElement("a");
          a.href = resume.resumePdf;
          a.download = "";
          a.click();
        },
      },
      ...(github
        ? [{
            id: "github",
            group: "Links" as Group,
            label: "GitHub",
            hint: "open ↗",
            run: () => window.open(github.url, "_blank", "noopener,noreferrer"),
          }]
        : []),
      ...(linkedin
        ? [{
            id: "linkedin",
            group: "Links" as Group,
            label: "LinkedIn",
            hint: "open ↗",
            run: () => window.open(linkedin.url, "_blank", "noopener,noreferrer"),
          }]
        : []),
      {
        id: "email",
        group: "Links",
        label: "Send an email",
        hint: "mailto",
        run: () => {
          window.location.href = `mailto:${resume.email}`;
        },
      },
    ];
  }, [jump, toggleTheme, copied, close]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q) || c.group.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const runCommand = useCallback(
    (cmd: Command) => {
      cmd.run();
      if (!cmd.keepOpen) close();
    },
    [close],
  );

  // Global hotkey
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (v) {
            setQuery("");
            setActive(0);
            setCopied(false);
          }
          return !v;
        });
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, onOpen);
    };
  }, []);

  // Focus + scroll lock while open
  useEffect(() => {
    if (!open) {
      lastFocused.current?.focus?.();
      return;
    }
    lastFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      window.cancelAnimationFrame(id);
    };
  }, [open]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[active];
      if (cmd) runCommand(cmd);
    }
  };

  const animate = !reduced;
  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          onClick={close}
          initial={animate ? { opacity: 0 } : false}
          animate={animate ? { opacity: 1 } : undefined}
          exit={animate ? { opacity: 0 } : undefined}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
            initial={animate ? { opacity: 0, y: -16, scale: 0.98 } : false}
            animate={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
            exit={animate ? { opacity: 0, y: -12, scale: 0.98 } : undefined}
            transition={{ type: "spring", stiffness: 480, damping: 32 }}
          >
            <div className={styles.inputRow}>
              <span className={styles.prompt} aria-hidden="true">›</span>
              <input
                ref={inputRef}
                className={styles.input}
                type="text"
                placeholder="Type a command…"
                value={query}
                spellCheck={false}
                autoComplete="off"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-listbox"
                aria-activedescendant={filtered.length > 0 ? `palette-option-${active}` : undefined}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
              />
              <button type="button" className={styles.escChip} onClick={close}>esc</button>
            </div>

            <div className={styles.list} id="palette-listbox" role="listbox" aria-label="Commands">
              {filtered.length === 0 && (
                <p className={styles.empty}>No matches — try &quot;contact&quot;</p>
              )}
              {GROUP_ORDER.map((group) => {
                const items = filtered.filter((c) => c.group === group);
                if (items.length === 0) return null;
                return (
                  <div key={group}>
                    <p className={styles.groupLabel}>{group}</p>
                    {items.map((cmd) => {
                      flatIndex += 1;
                      const i = flatIndex;
                      return (
                        <button
                          key={cmd.id}
                          type="button"
                          id={`palette-option-${i}`}
                          role="option"
                          aria-selected={i === active}
                          className={`${styles.item} ${i === active ? styles.itemActive : ""}`}
                          onMouseEnter={() => setActive(i)}
                          onClick={() => runCommand(cmd)}
                        >
                          <span className={styles.itemLabel}>{cmd.label}</span>
                          <span className={styles.itemHint}>{cmd.hint}</span>
                          <span className={styles.itemEnter} aria-hidden="true">↵</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className={styles.foot} aria-hidden="true">
              <span>↑↓ navigate</span>
              <span>↵ run</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
