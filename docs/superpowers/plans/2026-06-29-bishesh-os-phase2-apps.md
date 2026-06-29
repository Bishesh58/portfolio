# BISHESH/OS — Phase 2: Real Apps & Proof — Implementation Plan

> REQUIRED SUB-SKILL: superpowers:executing-plans (inline). Checkbox steps.

**Goal:** Replace placeholder apps with real content: a ported interactive Terminal, a Projects "Finder" with case files (problem→approach→outcome + proof slots), and real About / Skills / Contact — all driven by a refactored `resume.ts`, with honest placeholders for metrics and graceful screenshot placeholders (no broken images).

**Decision (from user):** use honest placeholders; render representative/NDA "preview" panels where screenshots are absent; wire `image`/`link`/`repo` so real assets drop in later.

## Global Constraints
- React 19, strict TS (no `any`), reduced-motion paths, WCAG-AA, commit per task.
- Apps stay window-agnostic (rendered inside `<Window>`); no double chrome.
- Per-project accent hues spread across the wheel (use `accent`).

## Tasks

### T1 — Refactor `resume.ts` content model
- Extend `Project`: add `role`, `period`, `featured`, `problem`, `approach`, `outcome`, `metric?` (placeholder), `accent`, `nda?`, keep `link?`/`repo?`/`image?`.
- Convert all 8 projects: derive problem/approach/outcome from existing copy (honest), add `metric: 'TODO: add a real figure'` placeholders, mark employer work `nda: true`, spread `accent` hues, set ~5–6 `featured: true`.
- Reconcile stats: drop "100% Ownership" as a metric; keep 4+/12+/15+ but make 12+ honest (career-wide); fix any 12 vs 9 tension in copy.
- Reframe AI section: capability-first (specs, typed contracts, review gates), tools as detail.
- Add `featuredProjects`/`archiveProjects` selectors.
- Test: `resume.test.ts` — every `featured` project has problem+approach+outcome and either proof (link/repo/image) or `nda:true`; accents unique.

### T2 — Projects "Finder" + Case file
- `apps/Projects.tsx`: list featured projects (accent dot, title, role, period, category) + an "archive" disclosure (titles + GitHub link). Clicking a row opens the case file.
- `apps/ProjectCase.tsx`: in-app detail panel (back button) showing screenshot/preview-placeholder, role+period, `// problem / // approach / // outcome (+ metric)`, stack tokens, action row (Live ↗ / Source ↗ when present; "Client work — NDA" badge otherwise).
- Graceful image: if `image` missing, render a stylized accent "preview unavailable" panel.

### T3 — Port the real Terminal
- Move command-parser logic into `apps/Terminal.tsx` (from the retained `components/Terminal.tsx` / git history). Replace `scrollToSection` with `osStore.openWindow(appId)` for `open <app>`. Drop its own window chrome (OS provides it). Keep boot-typing + easter eggs (`hire`,`sudo`,`rm`); add one high-signal intro line.
- Test: command dispatch (`help`, `open projects`, `whoami`, unknown).

### T4 — About / Skills / Contact (real)
- About: ownership narrative + reconciled stats (animated counters optional, reduced-motion safe).
- Skills (system monitor): skills as "processes"; experience timeline; AI reframed.
- Contact: email, CV, LinkedIn, corrected GitHub, phone; `hire` flourish; reuse `MagneticButton`.

### T5 — Wire accents + cleanup
- Ensure window/titlebar accent reflects project accent where relevant.
- Remove now-unused retained components if fully superseded; prune dead matrix CSS.

## Out of scope (Phase 3)
Mobile phone-OS, og.png, README rewrite, full a11y/perf audit, real screenshots.
