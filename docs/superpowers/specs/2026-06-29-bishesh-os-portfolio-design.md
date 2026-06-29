# BISHESH/OS — Portfolio Redesign Design Spec

**Date:** 2026-06-29
**Branch:** `feat/bishesh-os`
**Owner:** Bishesh Sunam (Full Stack Developer, Auckland NZ)
**Status:** Approved direction (user delegated full autonomy)

---

## 1. Goal & success criteria

Rebuild the portfolio, ground-up, into the single most memorable, credible developer portfolio it can be — targeting **design-forward global product & startup teams**, while staying genuinely *hireable* (not just a flashy toy).

A reviewer should, in order:
1. **0–5s:** know who he is, that this is hand-built/bespoke, and feel "this person can build."
2. **5–30s:** reach proof — a real project with a demo/screenshots/outcome — and the CV, without getting lost.
3. **On exploration:** be delighted (the OS, terminal, easter eggs) and find depth (case studies, GitHub).

**Definition of done:** the redesign ships all "non-negotiables" (§10–12), passes the perf/a11y budget, and every project shows real proof.

### What the current site does well (preserve)
Hand-built interactive terminal with a real command parser; cohesive design-token system; strict TypeScript; thorough `prefers-reduced-motion`; the NetSuite/ERP moat. These survive into the rebuild.

### What the review proved we must fix (see `memory/portfolio-review-gaps.md`)
Zero project proof; missing `og.png`; no quantified outcomes; stale README; zero tests; modal focus traps + `role=dialog`; hero motion ignores reduced-motion; light-mode contrast fails AA; no error boundary / `<noscript>`; wasted per-project `hue`; ~18k px mobile scroll; dead deps; broken GitHub URL (`bisheshsunam` → `Bishesh58`); unreachable `bisheshsunam.dev`.

---

## 2. Concept — BISHESH/OS

The portfolio **is an interactive desktop operating system**. A boot sequence resolves into a desktop with a **menu bar**, a **dock**, an ambient **canvas wallpaper**, and **windowed "apps"** that hold the content. This is on-trend for 2026 (macOS-dock/OS-shell portfolios), and it makes the site itself the strongest possible proof of front-end engineering — window management, focus/z-order, drag/resize, persistence, and a responsive reimagining.

**Guiding principle — "delight the explorer, never trap the impatient."** The OS rewards play, but a time-pressed recruiter is never more than one obvious click from the info and the CV.

---

## 3. Information architecture (apps)

Content stays driven by a refactored `src/data/resume.ts` (single source of truth).

| App (dock + window) | Purpose | Content source |
|---|---|---|
| **Terminal** | Signature interactive proof; navigation power-tool | ported `Terminal.tsx` + new commands |
| **Projects** (Finder) | The proof surface — featured case studies | curated `projects` (~5) + archive |
| **About** (`readme.md`) | Who he is, the ownership story, stats | `profile`, `stats` |
| **Skills & Stack** (`system_monitor`) | Skills as live "processes"; experience timeline; AI-workflow reframed | `skills`, `experience`, AI content |
| **Contact** (`uplink`) | Email, CV, socials, LinkedIn, GitHub | `profile` |

**Curation (quality > quantity, per research):** ~5 **featured** projects get deep case files; the rest go in a `~/archive` folder with one-liners + GitHub link. Featured set (proposed): Subscription SaaS (flagship solo build), NetSuite SPA Dashboard, Admin Dashboard Portal, Marketing/Warehouse Analytics (one, noting multi), Credit Control (FinOps niche), and the Unity Māori game (range). "Custom Websites & Quote Systems" → archive/experience.

**Optional later:** a tiny `guestbook`/visit counter is explicitly **out of scope** (YAGNI).

---

## 4. Visual identity & motion

**Evolve, don't abandon, the green-terminal identity** — make it read *premium engineer*, not *gamer cliché*.

- **Palette:** keep dark + signature green, but introduce a real **neutral surface scale** (layered near-blacks/warm dark grays for window chrome vs. desktop) instead of pure `#000` everywhere — this creates depth and hierarchy. Reserve **bright ember green** for interactive/accent only; use a calmer green/bone for body text (fixes "everything glows" + contrast). Add **per-project accent hues spread across the wheel** (green/teal/amber/blue/violet/coral) using the existing `hue` field — each project gets a signature color; the OS chrome stays green.
- **Contrast:** all text meets **WCAG AA**, including light mode (darken light-mode green to ≥4.5:1; no `<0.7` opacity green text under ~14px).
- **Type — two families, self-hosted (fixes render-blocking + CLS):** drop Orbitron (cliché/heavy). Use **JetBrains Mono** for terminal, code, labels, window chrome, and the wordmark (keeps the OS/hacker identity), and a clean **Geist / Inter-class sans** for body & case-study prose (readability for long content). Self-host via `@fontsource` (no Google Fonts blocking request) and `font-display: swap` + size-adjust fallback.
- **Wallpaper:** reuse `FluxField` as an ambient desktop background, **toned down and optimized** (lower density, dimmer, delta-timed, paused when a window is maximized/focused or tab hidden). It finally has a natural home.
- **Motion vocabulary:** window open/close/minimize via GSAP (scale + subtle "genie"); **dock magnification on hover** (the 2026 darling, done tastefully); focus elevation; tasteful boot animation; toned-down CRT scanline/grain. **Reduced-motion:** snap to end-state, no transforms, static wallpaper frame.
- **Avoid (dated/nauseating):** scroll-jacking, heavy WebGL lens distortion, gratuitous parallax, autoplay sound (offer an optional mute-by-default UI blip only).

---

## 5. Shell architecture

Small, well-bounded units (each independently testable):

- **`os/store`** — a lightweight custom store via `useSyncExternalStore` (no new runtime dep; demonstrates React 19 fluency). Holds: open windows, focus/z-order stack, per-window geometry + minimized/maximized state, active app. Window geometry persisted to `localStorage` (with a reset).
- **`os/WindowManager`** — renders open `<Window>`s from store; handles focus, z-index, spawn position, bounds clamping.
- **`os/Window`** — title bar (traffic dots, path, label, status), drag (pointer events), resize (desktop), minimize/maximize/close, `role="dialog"` + focus management. Wraps an app component as children.
- **`os/MenuBar`** — wordmark/Apple-style menu, live AKL clock, status icons, and a **persistent `Résumé ↓`** + theme toggle. Always reachable.
- **`os/Dock`** — app launchers with magnification; indicates open/minimized apps.
- **`os/Desktop`** — wallpaper (FluxField) + optional desktop "icons"; boot orchestration.
- **`apps/*`** — Terminal, Projects, About, Skills, Contact (pure content components, unaware of window mechanics).

**Reuse:** `Terminal.tsx`, `matrixTypewriter`, `theme`, `CommandPalette` (becomes the OS "Spotlight"/launcher, ⌘K/Ctrl+K), `MagneticButton`, `Cursor`.
**Delete:** `Preloader.tsx`, `Marquee.tsx` (no long page), `Nav.tsx` + `matrix/MatrixScrollProgress`/`MatrixSection`/`SectionHeading` (scroll-page constructs), Lenis (no long page), `three`/`@react-three/fiber`/`@types/three` deps, unused assets, stale README.

---

## 6. First impression, boot & recruiter fast-path

- **Boot:** a short (~1.2s, once per session via `sessionStorage`, instant under reduced-motion) boot line sequence, then the desktop materializes with **windows pre-arranged** — `Projects` + an intro `Terminal` already open — so no one faces an empty desktop. The static hero wordmark + role + "open to work" is painted immediately under the boot.
- **Recruiter fast-path (non-negotiable):** `Résumé ↓` in the menu bar at all times; the Projects window opens to the strongest case study; `Ctrl/⌘K` launcher jumps anywhere; the terminal auto-runs one high-signal line ("4+ yrs · solo SaaS · NetSuite/ERP"). 

---

## 7. App specs (content)

- **Terminal:** port as-is; add intro signal line; add `open <app>` for all apps; keep easter eggs (`hire`, `sudo`, `rm`).
- **Projects (Finder):** list view → each project opens a **case-file window**: hero/screenshot, **role + timeframe + stack**, `// Problem → // Approach → // Outcome (with a real number)`, and action row (**Live ↗ / Source ↗ / Screenshots**). NDA work: labelled "Client work — NDA", anonymized screenshot/representative mockup, honest scope. Featured set carries the proof; archive folder lists the rest + `github.com/Bishesh58`.
- **About:** ownership narrative, stats reconciled (drop "100% ownership"; reconcile 12+/9+ honestly), 1–2 testimonial slots (user-supplied, marked).
- **Skills & Stack (system_monitor):** skills grouped as "processes"; experience timeline; AI-workflow reframed around **engineering judgment** (specs, typed contracts, review gates) with tools as detail — not four product names as a skill.
- **Contact:** mailto, **CV download**, LinkedIn, **corrected GitHub**, phone; the `hire` flourish.

---

## 8. Mobile — phone OS

No desktop-on-phone. Mobile renders a **phone home-screen**: status bar + grid of app icons. Tapping opens the app **full-screen** with a back affordance (and View Transitions where supported). Same content/data, thumb-reachable, native-feeling. Windows are non-draggable full-screen sheets below ~768px. This eliminates the 18k-px scroll.

---

## 9. Proof & content strategy

- Fix GitHub URL to **`Bishesh58`**; surface it prominently (51 repos = "I build constantly"). Link **this portfolio's own repo** as honest proof of the hand-built claim.
- **Featured ≠ clones:** do not feature gmail/amazon/spotify clones (junior signal). Optional clickable extras: `travel-log`, `woonuxt`, `nodejs-microservices`.
- **Metrics honesty:** I will not fabricate figures. Each outcome gets honest scope framing now, with a clearly-marked `TODO(metric)` for the user to drop a real number (users, hours saved, %, branches, volume). 
- **Screenshots:** NDA projects get tasteful "representative/redacted" preview treatments as placeholders, clearly marked, inviting real anonymized shots.
- Refresh the **GitHub profile README** recommendation (out-of-repo task, noted for the user).

---

## 10. Accessibility (WCAG 2.1 AA)

- Every `<Window>` and the launcher: `role="dialog"`, `aria-modal` where appropriate, `aria-labelledby`, **focus trap**, focus-return to launcher control, `Esc` to close; the rest of the UI `inert` when a modal-class window is foregrounded.
- **Skip-to-content**/skip-to-main link; correct heading hierarchy (one `h1`); landmarks.
- `prefers-reduced-motion` honored **everywhere incl. the boot/hero and dock** (the one gap today).
- Native cursor restored under reduced-motion; `cursor:none` gated behind `.cursor-ready`.
- Keyboard: full dock/menu/window operability; launcher uses `Ctrl/⌘K` (not bare keys); visible focus rings.
- Color contrast AA in both themes; smallest functional text ≥ ~11px.
- `text-stroke` wordmark gets a real `color` fallback.

## 11. Performance budget

Targets (mid-range mobile): **LCP < 2.5s, INP < 200ms, CLS < 0.1**, initial JS (gz) ≈ ≤ 150KB excluding lazily-loaded apps.
- Code-split each app; lazy-load on open. Canvas wallpaper: delta-timed, no per-frame `sort`/`Map` realloc, theme via ref (no full rebuild), paused when occluded/hidden, capped DPR, lower counts; `content-visibility` on off-screen content.
- Self-hosted fonts; preload the wordmark face. Remove Lenis + dead deps.

## 12. SEO / metadata / share

- Create **`public/og.png`** (1200×630, on-brand) + `og:image:width/height/alt`.
- Fix `sameAs` to include corrected GitHub; reconcile canonical/sitemap to the **real deploy URL** (confirm Vercel domain; `bisheshsunam.dev` currently down).
- Keep rich `<head>` + JSON-LD; add `<noscript>` fallback (name/role/email/CV link) and a top-level **`ErrorBoundary`** (degrades to a static "card" with the essentials) so a render throw or JS-off never yields a blank screen.
- Consider lightweight prerender of the static shell (optional, phase 3).

## 13. Tech stack & structure

Keep **React 19 + Vite + Tailwind v4 + GSAP**. Remove Lenis, Three, RTF. Add `@fontsource-variable/*`, **Vitest + @testing-library** (dev).

```
src/
  os/        store.ts, WindowManager, Window, MenuBar, Dock, Desktop, Boot, Launcher
  apps/      Terminal, Projects(+CaseFile), About, Skills, Contact, Archive
  components/ Cursor, MagneticButton, FluxField(wallpaper), shared UI
  data/      resume.ts (refactored: featured/archive, role, period, links, images, metrics)
  lib/       theme, os helpers, hooks, reduced-motion
  index.css  evolved tokens (neutrals, accents, AA)
```

## 14. Testing

Vitest + RTL. Cover pure logic + key behaviors: window store reducer (open/focus/close/z-order/persistence), terminal command dispatch, slugify, reduced-motion helper, Projects data integrity (every featured project has proof or an NDA flag), launcher keybinding. Makes "trust but verify" true.

## 15. Build phases (each shippable)

1. **Shell:** store, WindowManager/Window, MenuBar, Dock, Desktop+wallpaper, Boot, Launcher, identity/tokens, fonts. Skeleton apps.
2. **Apps & content:** Terminal port, Projects+case files (real proof/curation), About, Skills, Contact; resume.ts refactor; ErrorBoundary + noscript.
3. **Mobile phone-OS + fundamentals:** responsive app model, a11y pass, perf pass, og.png + meta fixes, tests, README rewrite, dead-code/deps cleanup.

## 16. Risks & mitigations

- **OS = unusable/gimmicky** → recruiter fast-path, pre-arranged boot, launcher, always-visible CV.
- **Mobile** (where OS portfolios fail) → dedicated phone-OS, not a shrunk desktop.
- **Perf of canvas + windows** → strict budget, lazy apps, optimized/occlusion-paused wallpaper.
- **Scope creep** → phased, YAGNI cuts (§17).

## 17. Out of scope (YAGNI)

Multi-window tiling/snapping, a real filesystem, draggable desktop icons with persistence, window resizing on mobile, sound design beyond an optional blip, blog/CMS, guestbook, theming beyond dark/light.

## 18. Open items needing Bishesh (non-blocking — placeholders meanwhile)

1. Real **metrics** per featured project (drop into `TODO(metric)` slots).
2. Which projects are strictly **NDA** vs. OK to screenshot/name the client.
3. The **live deploy URL** (Vercel) to reconcile canonical/OG/sitemap.
4. Optional **testimonial** quotes (LinkedIn recommendations).
