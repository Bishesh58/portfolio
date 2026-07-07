"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { track } from "@vercel/analytics";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./RobotArcade.module.css";

export const ARCADE_EVENT = "start-arcade";

const BEST_KEY = "portfolio-arcade-best";
const PLAYER_HALF = 34; // px, half the robot sprite width
const BUG_SIZE = 30;

type Phase = "start" | "playing" | "over";

type Bug = { x: number; y: number; v: number; el: HTMLDivElement };

type BoardEntry = { name: string; score: number };

type SubmitState = "idle" | "sending" | "done" | "error";

const pad = (n: number) => String(Math.min(n, 999999)).padStart(3, "0");

const BUG_SVG = `<svg viewBox="0 0 30 30" width="30" height="30" aria-hidden="true">
  <g stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round">
    <line x1="4" y1="10" x2="9" y2="13"/><line x1="2" y1="17" x2="8" y2="17"/><line x1="4" y1="24" x2="9" y2="21"/>
    <line x1="26" y1="10" x2="21" y2="13"/><line x1="28" y1="17" x2="22" y2="17"/><line x1="26" y1="24" x2="21" y2="21"/>
  </g>
  <ellipse cx="15" cy="17" rx="8" ry="9.5" fill="var(--lime)" stroke="var(--ink)" stroke-width="2.6"/>
  <line x1="15" y1="9" x2="15" y2="26" stroke="var(--ink)" stroke-width="2"/>
  <circle cx="15" cy="8" r="4" fill="var(--red)" stroke="var(--ink)" stroke-width="2.4"/>
</svg>`;

function PlayerRobot() {
  return (
    <svg viewBox="0 0 68 56" width="68" height="56" aria-hidden="true">
      <line x1="34" y1="10" x2="34" y2="3" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="34" cy="3" r="2.6" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="16" y="10" width="36" height="24" rx="7" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
      <rect x="21" y="15" width="26" height="13" rx="4.5" fill="var(--ink)" />
      <circle cx="29" cy="21.5" r="3.4" fill="var(--lime)" />
      <circle cx="39" cy="21.5" r="3.4" fill="var(--lime)" />
      <rect x="12" y="18" width="5" height="9" rx="2" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="51" y="18" width="5" height="9" rx="2" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="20" y="36" width="28" height="16" rx="6" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="3" />
      <path d="M29 40 h10 l-2 8 h-6 z" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  );
}

/** DEBUG MODE — the robot arcade. Bugs fall toward production; slide the
 *  robot to squash them. Three escapes and it's post-mortem time. The whole
 *  simulation runs imperatively (rAF + DOM transforms) inside fieldRef, so
 *  React only re-renders for HUD changes, never per frame. */
export default function RobotArcade() {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("start");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [best, setBest] = useState(0);
  const [isRecord, setIsRecord] = useState(false);
  const [board, setBoard] = useState<BoardEntry[] | null>(null);
  const [initials, setInitials] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const fieldRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const bugsRef = useRef<Bug[]>([]);
  const sim = useRef({
    playerX: 0,
    targetX: null as number | null,
    left: false,
    right: false,
    lastSpawn: 0,
    lastT: 0,
    raf: 0,
    running: false,
    score: 0,
    lives: 3,
  });
  const phaseRef = useRef<Phase>("start");
  phaseRef.current = phase;

  const clearBugs = useCallback(() => {
    bugsRef.current.forEach((b) => b.el.remove());
    bugsRef.current = [];
  }, []);

  const stopSim = useCallback(() => {
    sim.current.running = false;
    cancelAnimationFrame(sim.current.raf);
  }, []);

  const finish = useCallback(() => {
    stopSim();
    clearBugs();
    const finalScore = sim.current.score;
    setIsRecord(finalScore > 0 && finalScore > best);
    if (finalScore > best) {
      setBest(finalScore);
      try {
        localStorage.setItem(BEST_KEY, String(finalScore));
      } catch {}
    }
    setPhase("over");
  }, [best, clearBugs, stopSim]);

  const tick = useCallback(
    (t: number) => {
      const s = sim.current;
      const field = fieldRef.current;
      if (!s.running || !field) return;
      const W = field.clientWidth;
      const H = field.clientHeight;
      const dt = Math.min((t - s.lastT) / 1000, 0.05);
      s.lastT = t;

      // player — keys and pointer both steer, but never simultaneously:
      // the pointer lerp would otherwise drag the robot straight back to
      // the last mouse position while an arrow key is held
      const SPEED = 540;
      if (s.left) s.playerX -= SPEED * dt;
      if (s.right) s.playerX += SPEED * dt;
      if (s.targetX !== null && !s.left && !s.right) {
        s.playerX += (s.targetX - s.playerX) * 0.28;
      }
      s.playerX = Math.max(PLAYER_HALF, Math.min(W - PLAYER_HALF, s.playerX));
      if (playerRef.current) {
        playerRef.current.style.transform = `translateX(${s.playerX - PLAYER_HALF}px)`;
      }

      // spawn: quicker as the score climbs
      const spawnEvery = Math.max(430, 1050 - s.score * 14);
      if (t - s.lastSpawn > spawnEvery) {
        s.lastSpawn = t;
        const el = document.createElement("div");
        el.className = styles.bug;
        el.innerHTML = BUG_SVG;
        field.appendChild(el);
        const v = (125 + Math.min(s.score * 5, 290)) * (0.85 + Math.random() * 0.35);
        bugsRef.current.push({ x: 20 + Math.random() * (W - 40), y: -BUG_SIZE, v, el });
      }

      // bugs
      for (const bug of [...bugsRef.current]) {
        bug.y += bug.v * dt;
        bug.el.style.transform = `translate(${bug.x - BUG_SIZE / 2}px, ${bug.y}px)`;
        const caught = bug.y > H - 92 && bug.y < H - 26 && Math.abs(bug.x - s.playerX) < 44;
        if (caught) {
          bugsRef.current = bugsRef.current.filter((b) => b !== bug);
          bug.el.classList.add(styles.bugSquashed);
          window.setTimeout(() => bug.el.remove(), 260);
          s.score += 1;
          setScore(s.score);
        } else if (bug.y > H - 14) {
          bugsRef.current = bugsRef.current.filter((b) => b !== bug);
          bug.el.remove();
          s.lives -= 1;
          setLives(s.lives);
          field.classList.remove(styles.fieldHit);
          void field.offsetWidth; // restart the flash animation
          field.classList.add(styles.fieldHit);
          if (s.lives <= 0) {
            finish();
            return;
          }
        }
      }

      s.raf = requestAnimationFrame(tick);
    },
    [finish],
  );

  const begin = useCallback(() => {
    const field = fieldRef.current;
    if (!field) return;
    clearBugs();
    const s = sim.current;
    s.score = 0;
    s.lives = 3;
    s.playerX = field.clientWidth / 2;
    s.targetX = null;
    s.left = false;
    s.right = false;
    s.lastT = performance.now();
    s.lastSpawn = performance.now();
    s.running = true;
    setScore(0);
    setLives(3);
    setIsRecord(false);
    setSubmitState("idle");
    setSubmittedName(null);
    setInitials("");
    setPhase("playing");
    track("arcade_play");
    s.raf = requestAnimationFrame(tick);
  }, [clearBugs, tick]);

  const submitScore = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (submitState === "sending") return;
      setSubmitState("sending");
      setSubmitError("");
      fetch("/api/arcade", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: initials, score: sim.current.score }),
      })
        .then(async (res) => {
          const data = await res.json().catch(() => null);
          if (res.ok && data?.board) {
            setBoard(data.board);
            setSubmittedName(initials);
            setSubmitState("done");
          } else if (res.status === 429) {
            setSubmitState("error");
            setSubmitError("Too many submissions — take a breath.");
          } else {
            setSubmitState("error");
            setSubmitError("Three letters, keep it clean.");
          }
        })
        .catch(() => {
          setSubmitState("error");
          setSubmitError("Network hiccup — try again.");
        });
    },
    [initials, submitState],
  );

  const close = useCallback(() => {
    stopSim();
    clearBugs();
    setOpen(false);
    setPhase("start");
  }, [clearBugs, stopSim]);

  // Open on demand
  useEffect(() => {
    const onOpen = () => {
      try {
        setBest(Number(localStorage.getItem(BEST_KEY) ?? 0) || 0);
      } catch {}
      setScore(0);
      setLives(3);
      setSubmitState("idle");
      setSubmittedName(null);
      setInitials("");
      setPhase("start");
      setOpen(true);
      // Global board — null (store unconfigured / offline) hides it entirely
      fetch("/api/arcade")
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { board: BoardEntry[] | null } | null) => setBoard(data?.board ?? null))
        .catch(() => setBoard(null));
    };
    window.addEventListener(ARCADE_EVENT, onOpen);
    return () => window.removeEventListener(ARCADE_EVENT, onOpen);
  }, []);

  // Keys — capture phase so the site's other single-key listeners
  // (blueprint X, hire buffer, G-nav) never see gameplay input.
  useEffect(() => {
    if (!open) return;
    const setKey = (e: KeyboardEvent, down: boolean) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") sim.current.left = down;
      else if (k === "arrowright" || k === "d") sim.current.right = down;
      else return false;
      // keyboard takes the wheel — forget the last pointer position so the
      // lerp doesn't reclaim the robot the moment the key is released
      if (down) sim.current.targetX = null;
      return true;
    };
    const onDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
        return;
      }
      if (phaseRef.current === "playing" && setKey(e, true)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (setKey(e, false)) e.stopPropagation();
    };
    window.addEventListener("keydown", onDown, true);
    window.addEventListener("keyup", onUp, true);
    return () => {
      window.removeEventListener("keydown", onDown, true);
      window.removeEventListener("keyup", onUp, true);
    };
  }, [open, close]);

  // Scroll lock + focus management
  useEffect(() => {
    if (!open) {
      lastFocused.current?.focus?.();
      return;
    }
    lastFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const id = window.requestAnimationFrame(() => {
      startBtnRef.current?.focus();
      // park the robot mid-field until the first frame moves it
      const field = fieldRef.current;
      if (field && playerRef.current) {
        sim.current.playerX = field.clientWidth / 2;
        playerRef.current.style.transform = `translateX(${field.clientWidth / 2 - PLAYER_HALF}px)`;
      }
    });
    return () => {
      document.body.style.overflow = "";
      window.cancelAnimationFrame(id);
    };
  }, [open]);

  // Full teardown if the component ever unmounts mid-game
  useEffect(() => () => stopSim(), [stopSim]);

  const onPointer = (e: React.PointerEvent) => {
    if (phaseRef.current !== "playing") return;
    const rect = fieldRef.current?.getBoundingClientRect();
    if (rect) sim.current.targetX = e.clientX - rect.left;
  };

  const animate = !reduced;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          onClick={() => phaseRef.current !== "playing" && close()}
          initial={animate ? { opacity: 0 } : false}
          animate={animate ? { opacity: 1 } : undefined}
          exit={animate ? { opacity: 0 } : undefined}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className={styles.cabinet}
            role="dialog"
            aria-modal="true"
            aria-label="Robot arcade — debug mode"
            onClick={(e) => e.stopPropagation()}
            initial={animate ? { opacity: 0, y: 24, scale: 0.97 } : false}
            animate={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
            exit={animate ? { opacity: 0, y: 18, scale: 0.98 } : undefined}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
          >
            <div className={styles.head}>
              <span className={styles.headTitle}>Debug mode</span>
              <span className={styles.headHint}>
                {phase === "playing" ? "← → move" : "// unscheduled maintenance"}
              </span>
              <button type="button" className={styles.escChip} onClick={close}>
                esc
              </button>
            </div>

            <div className={styles.hud}>
              <span className={styles.hudItem}>
                Squashed <b className={styles.hudValue}>{pad(score)}</b>
              </span>
              <span className={styles.hudItem}>
                Best <b className={styles.hudValue}>{pad(best)}</b>
              </span>
              <span className={styles.livesWrap} aria-label={`${lives} of 3 production shields left`}>
                {[0, 1, 2].map((i) => (
                  <span key={i} className={i < lives ? styles.life : styles.lifeLost}>
                    prod
                  </span>
                ))}
              </span>
            </div>

            <div
              ref={fieldRef}
              className={styles.field}
              onPointerMove={onPointer}
              onPointerDown={onPointer}
            >
              {phase === "start" && (
                <div className={styles.card}>
                  <p className={styles.cardEyebrow}>{"//"} incident report</p>
                  <h2 className={styles.cardTitle}>Bugs headed for production</h2>
                  <p className={styles.cardText}>
                    Squash them before they ship. Move with <kbd>←</kbd> <kbd>→</kbd> (or
                    A/D), or drag on touch. Three escapes and we&apos;re writing a
                    post-mortem.
                  </p>
                  <button ref={startBtnRef} type="button" className="btn" onClick={begin}>
                    Start debugging<span aria-hidden="true">→</span>
                  </button>
                  {board && board.length > 0 && (
                    <p className={styles.topLine}>
                      Top debuggers:{" "}
                      {board.slice(0, 3).map((e, i) => (
                        <span key={e.name}>
                          {i > 0 && " · "}
                          <b>{e.name}</b> {e.score}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              )}

              {phase === "over" && (() => {
                const qualifies =
                  board !== null &&
                  score > 0 &&
                  (board.length < 10 || score > board[board.length - 1].score);
                return (
                  <div className={styles.card}>
                    <p className={styles.cardEyebrow}>{"//"} post-mortem</p>
                    <h2 className={styles.cardTitle}>
                      {isRecord ? "New personal best" : "Production is down"}
                    </h2>
                    <p className={styles.cardScore}>
                      Bugs squashed: <b>{score}</b> · Best: <b>{best}</b>
                    </p>
                    {isRecord && (
                      <span className={styles.recordStamp} aria-hidden="true">
                        New record
                      </span>
                    )}

                    {qualifies && submitState !== "done" && (
                      <form className={styles.initialsForm} onSubmit={submitScore}>
                        <label className={styles.initialsLabel} htmlFor="arcade-initials">
                          Top-10 score — sign the board
                        </label>
                        <div className={styles.initialsRow}>
                          <input
                            id="arcade-initials"
                            className={styles.initialsInput}
                            type="text"
                            inputMode="text"
                            autoComplete="off"
                            spellCheck={false}
                            maxLength={3}
                            placeholder="AAA"
                            value={initials}
                            onChange={(e) =>
                              setInitials(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))
                            }
                          />
                          <button
                            type="submit"
                            className="btn"
                            disabled={initials.length !== 3 || submitState === "sending"}
                          >
                            {submitState === "sending" ? "Filing…" : "Sign"}
                          </button>
                        </div>
                        {submitState === "error" && (
                          <p className={styles.initialsError} role="alert">{submitError}</p>
                        )}
                      </form>
                    )}

                    {board && board.length > 0 && (
                      <ol className={styles.board} aria-label="Global high scores">
                        {board.map((e, i) => (
                          <li
                            key={`${e.name}-${e.score}`}
                            className={`${styles.boardRow} ${
                              e.name === submittedName ? styles.boardMine : ""
                            }`}
                          >
                            <span className={styles.boardRank}>{String(i + 1).padStart(2, "0")}</span>
                            <span className={styles.boardName}>{e.name}</span>
                            <span className={styles.boardScore}>{e.score}</span>
                          </li>
                        ))}
                      </ol>
                    )}

                    <div className={styles.cardActions}>
                      <button ref={startBtnRef} type="button" className="btn" onClick={begin}>
                        Debug again<span aria-hidden="true">↺</span>
                      </button>
                      <button type="button" className="btn btn--ghost" onClick={close}>
                        Back to work
                      </button>
                    </div>
                  </div>
                );
              })()}

              <div ref={playerRef} className={styles.player} aria-hidden="true">
                <PlayerRobot />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
