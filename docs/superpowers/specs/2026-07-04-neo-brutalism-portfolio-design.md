# Neo-Brutalist Portfolio — Design Spec

**Date:** 2026-07-04
**Owner:** Bishesh Sunam
**Status:** Approved pending user review

## 1. Overview

A single-page neo-brutalist portfolio website for Bishesh Sunam (Full Stack Developer, Auckland NZ, 4+ years experience). Structurally inspired by marjoballabani.me but visually and interactively distinct: robot-anchored palette, an animated "living robot mascot" companion, and an awwwards-grade motion system.

**Deliverable:** a fully static site (Next.js static export) deployable to Vercel/Netlify/GitHub Pages.

## 2. Stack & Architecture

- **Next.js 15** (App Router, TypeScript), `output: 'export'` — no server runtime.
- **Framer Motion** (`motion`) for scroll-linked animation, staggers, marquees, and the mascot.
- **Styling:** global CSS custom properties (design tokens) + CSS Modules per component. No Tailwind, no UI kit.
- **Content:** all resume copy in one typed data file `src/data/resume.ts` (types in `src/data/types.ts`). Components never hard-code copy.
- **Fonts:** Space Grotesk (headings) + Space Mono (labels/code accents) via `next/font/google`.
- **Assets:** robot avatar from `C:\Users\bishe\Downloads\robot.png` (hero panel). Mascot is a separate hand-built layered SVG React component (not the PNG) so parts can animate.

### Component layout

```
src/
  app/               layout.tsx (fonts, meta, JSON-LD), page.tsx, globals.css (tokens)
  components/
    Loader.tsx           intro loading screen
    Navbar.tsx           fixed nav + theme toggle
    ProgressBar.tsx      scroll progress + section checkpoints
    Cursor.tsx           custom cursor (desktop only)
    Marquee.tsx          ticker strip section divider
    MagneticButton.tsx   shared magnetic/stamp-press button
    RobotMascot/         layered SVG robot + behavior hook + speech bubbles
    sections/            Hero, About, Journey, Projects, Skills, Contact, Footer
  data/                resume.ts, quips.ts
  hooks/               useReveal (IntersectionObserver), useTheme, useSectionSpy
```

Each section component consumes `resume.ts` data and owns its CSS Module. The mascot subscribes to the active section (via a section-spy hook) to pick pose + quips.

## 3. Visual Language

- **Neo-brutalism:** off-white paper background (`#f5f2ea`-ish), ink-black 3–4px solid borders, hard offset shadows (`6px 6px 0 #000`), zero blur, zero gradients on structural elements, chunky geometric shapes.
- **Palette (robot-anchored):** cobalt blue `#3b6fd4`, lime green `#5ce65c`, teal `#4fb3a9`, marker yellow `#ffd93d`, ink `#111`, paper `#f5f2ea`. Dark mode: near-black paper `#141414`, borders/shadows flip to pale ink, accents stay saturated.
- **Backgrounds:** dot-grid and checkerboard pattern panels instead of plain paper; sections alternate.
- **Type scale:** giant display headings (clamp-based), Space Mono for eyebrow labels, tags, and timeline dates.
- **Differentiators from inspiration:** no paper-tear dividers (marquee tickers instead), asymmetric overlapping hero (not 50/50), ghost outlined section numbers (01–05), sticker-sheet skills, stamped/barcode footer.

## 4. Sections (single page, in order)

1. **Loader** — brief (~1.5s, or until fonts/hero image load) animated "BS" letters + stacked SVG shapes, progress bar. Skipped for `prefers-reduced-motion`.
2. **Hero** — eyebrow greeting, "I'm Bishesh Sunam." display heading, Full Stack Developer intro (Auckland, NZ), robot avatar panel with tape-sticker frame + floating deco stickers, social chips (GitHub `github.com/bishesh58`, LinkedIn `linkedin.com/in/bishesh-sunam-89a807115`, email), "Get in Touch" magnetic CTA, tech badge strip: Vue, React, Node.js, TypeScript, Laravel, C#, GCP, MySQL. Name column overlaps the robot panel (asymmetric).
3. **About** — brutalist card, marker-highlighted phrases animating in on scroll: 4+ years; scalable web & enterprise apps; ERP/NetSuite integrations; dashboards & data visualisation; Agile.
4. **Journey** — vertical timeline. Work: Islington Group — Web Developer (01/2023–present, Auckland); Attainate — Software Engineer, contract (03/2022–07/2022); Aspire2 International — Software Developer, contract (01/2020–06/2020). Education as compact stops: Bachelor of Computing Systems, Unitec (2021–2023); NTEC Diplomas L7/L6/L5 (2014–2020, grouped). Each entry: role @ company, dates, 1–2 line summary, tech chips.
5. **Projects** — 2-column brutalist card grid, 8 featured projects (NetSuite SPA Dashboard, Admin Dashboard Portal, Marketing Analytics Dashboard, Credit Control App, Order Tracking App, Warehouse Metrics Dashboard, NPS Dashboard, Exception Management System). Each card: title, one-line impact, tech tags. No external links — cards are self-contained (internal tools).
6. **Skills** — sticker-sheet clusters: Frontend (JS/TS, Vue, Nuxt, React, Tailwind, HTML/CSS), Backend (Node.js, Laravel/PHP, C#/.NET, SuiteScript), Data & Cloud (MySQL, MongoDB, SQL Server, GCP, Firebase, CI/CD), Tools (Git/GitHub, Jira, WordPress, Unity). Peel-on-hover corner effect.
7. **Contact** — big CTA card: email button (bishesh.sunam@gmail.com), phone (022-405-0486), LinkedIn, GitHub. Certifications line (ICAgile Certified Professional; Top Capstone Project winner).
8. **Footer** — stamped/barcode aesthetic, "built with Next.js" sticky note, copyright.

**Chrome:** fixed navbar (logo "BS", section links, theme toggle), scroll progress bar with labelled section checkpoints.

## 5. Signature Feature: Living Robot Mascot

A fixed-position companion robot (layered SVG, ~90–120px, bottom-right; above content, below nav overlays):

- **Eye tracking:** pupils follow the cursor (lerped, clamped radius). On touch devices, pupils idle-wander instead.
- **Section reactions** (driven by section-spy): waves in Hero, reading pose in About/Journey, "typing" mime at Projects, wrench at Skills, raises envelope at Contact.
- **Speech bubbles:** short quips per section from `data/quips.ts` (e.g. "I built 8 dashboards. I count them in my sleep."), shown once per section visit, dismissible, cooldown so it never spams.
- **Micro-idle:** occasional blink + antenna bob.
- **Reduced motion:** static robot, no tracking, no bubbles auto-popping.
- **Mobile:** smaller, tucked to corner; bubbles suppressed on very small viewports.

## 6. Motion System

All motion respects `prefers-reduced-motion` (falls back to opacity-only or none).

- **Marquee tickers** between sections: `FULL STACK ★ VUE ★ REACT ★ LARAVEL ★ NETSUITE ★ …` — velocity/direction reacts to scroll direction.
- **Section titles:** staggered per-letter reveal on first scroll into view.
- **Ghost numbers:** giant outlined 01–05 behind sections, slow parallax drift via scroll-linked transform.
- **Magnetic buttons:** CTAs/social chips translate toward cursor within a radius; on click the hard shadow collapses and the element shifts into it (stamp press).
- **Project cards:** enter rotated/offset (alternating tilt), snap straight on reveal; hover lifts shadow.
- **Custom cursor:** crosshair dot; grows to outlined box over interactive elements. Desktop/fine-pointer only; native cursor never hidden on touch.

## 7. Theming, SEO, Accessibility

- **Dark/light toggle** in navbar; preference persisted to `localStorage`, respects `prefers-color-scheme` on first visit; implemented as `data-theme` attribute + token swap. No flash (inline script in layout head).
- **SEO:** full meta (title/description/OG/Twitter), JSON-LD Person schema (name, jobTitle, address Auckland NZ, sameAs GitHub/LinkedIn, knowsAbout), sitemap not needed (single page), favicon derived from robot.
- **Accessibility:** semantic landmarks, skip-to-content link, focus-visible styles matching the brutalist language (thick outline), all interactive elements keyboard-reachable, contrast-checked palette in both themes, `aria-hidden` on decorative SVG/marquees, mascot bubbles `role="status"`.

## 8. Error Handling & Edge Cases

- Static site — no runtime data fetching, no forms, so no network error states.
- Loader has a hard timeout (~2.5s) so a slow font/image never traps the user.
- Mascot and cursor are progressive enhancements: rendered only after mount (no hydration mismatch), and skipped entirely under reduced motion / coarse pointers respectively.
- All external links `rel="noopener noreferrer"`.

## 9. Testing & Verification

- `npm run build` (static export) must pass with zero type errors.
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on the exported build.
- Manual verification checklist: both themes, mobile (~375px) through desktop (~1440px), reduced-motion mode, keyboard-only pass, mascot behavior per section.

## 10. Out of Scope (YAGNI)

- Contact form / any backend
- Blog, CMS, analytics
- Multi-theme engine (from the earlier master-prompt doc) — this is one polished theme
- Terminal/command palette, OS-style gimmicks, draggable physics stickers
- i18n
