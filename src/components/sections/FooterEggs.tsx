"use client";

import { PALETTE_EVENT } from "@/components/CommandPalette";
import { TOUR_EVENT } from "@/components/RobotMascot/Mascot";
import { ARCADE_EVENT } from "@/components/wow/arcade/RobotArcade";
import { BLUEPRINT_EVENT } from "@/components/wow/BlueprintMode";
import { HIRE_EVENT } from "@/components/wow/HireSignal";
import { KONAMI_EVENT } from "@/components/wow/microdelights/KonamiConfetti";
import { SHORTCUTS_EVENT } from "@/components/wow/microdelights/ShortcutHint";
import styles from "./FooterEggs.module.css";

type Egg = {
  id: string;
  keys: string[];
  label: string;
  event: string;
};

const EGGS: Egg[] = [
  { id: "palette", keys: ["Ctrl", "K"], label: "Command palette", event: PALETTE_EVENT },
  { id: "tour", keys: ["G", "T"], label: "Guided tour", event: TOUR_EVENT },
  { id: "arcade", keys: ["🐛"], label: "Robot arcade", event: ARCADE_EVENT },
  { id: "blueprint", keys: ["X"], label: "Blueprint x-ray", event: BLUEPRINT_EVENT },
  { id: "hire", keys: ["H", "I", "R", "E"], label: "Type it anywhere", event: HIRE_EVENT },
  { id: "konami", keys: ["↑↑", "↓↓", "←→", "←→", "B", "A"], label: "Old-school cheat", event: KONAMI_EVENT },
  { id: "shortcuts", keys: ["?"], label: "All shortcuts", event: SHORTCUTS_EVENT },
];

/** Footer index of the site's hidden controls — every entry is clickable, so
 *  visitors without a keyboard (or the patience to guess) can fire them too. */
export default function FooterEggs() {
  return (
    <div className={`container ${styles.panel}`}>
      <div className={styles.head}>
        <span>Field notes — hidden controls</span>
        <span className={styles.headHint}>Press the keys, or click to fire</span>
      </div>
      <div className={styles.grid}>
        {EGGS.map((egg) => (
          <button
            key={egg.id}
            type="button"
            className={styles.egg}
            onClick={() => window.dispatchEvent(new Event(egg.event))}
          >
            <span className={styles.keys} aria-hidden="true">
              {egg.keys.map((k, i) => (
                <kbd key={i} className={styles.kbd}>{k}</kbd>
              ))}
            </span>
            <span className={styles.label}>{egg.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
