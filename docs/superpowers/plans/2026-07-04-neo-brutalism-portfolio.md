# Neo-Brutalist Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Bishesh Sunam's single-page neo-brutalist portfolio (Next.js 15 static export) with a living robot mascot and awwwards-grade motion system, per the approved spec at `docs/superpowers/specs/2026-07-04-neo-brutalism-portfolio-design.md`.

**Architecture:** One static route composed of section components that consume a single typed data file. Global CSS custom properties provide the design-token system (light/dark via `data-theme`); CSS Modules style sections; the `motion` library drives scroll-linked animation. A tiny external store (`useSyncExternalStore`) publishes the active section to the progress bar and mascot.

**Tech Stack:** Next.js 15 (App Router, TypeScript, `output: 'export'`), React 19, `motion` v12 (`motion/react` imports), CSS Modules + global tokens, Space Grotesk / Space Mono via `next/font/google`.

## Global Constraints

- Static export only: `output: 'export'`, `images: { unoptimized: true }`. No server runtime, no API routes, no forms.
- No Tailwind, no UI kits, no icon libraries — inline SVG icons only.
- All colors come from CSS custom properties defined in `globals.css`; never hard-code hex values in components or modules (exception: `#111` text on fixed-yellow/lime elements, which stays dark in both themes).
- All resume copy lives in `src/data/resume.ts` — components never hard-code copy (mascot quips live in `src/data/quips.ts`).
- Every animation respects `prefers-reduced-motion: reduce` (global CSS kill-switch + JS guards for mascot/cursor/loader).
- Neo-brutalist language everywhere: `3px` solid `var(--ink)` borders, hard offset shadows (`6px 6px 0`), no blur, no gradients (solid-color `linear-gradient()` fills used as rendering tricks for marker highlights/barcodes are allowed).
- Testing = `npm run build` (includes type-check) per task + visual dev-server check. No unit-test framework (YAGNI for a static visual site).
- External links: `target="_blank" rel="noopener noreferrer"`.
- Windows/PowerShell commands; project root is `C:\Users\bishe\Desktop\portfolio`.

---

### Task 1: Scaffold, design tokens, fonts, layout shell

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`
- Create: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`
- Create: `public/robot.png` (copied), `public/favicon.svg`

**Interfaces:**
- Produces: CSS tokens (`--paper --panel --ink --muted --cobalt --lime --teal --yellow --bw --shadow --shadow-sm --radius`), shared classes (`.container .section .card .btn .tag .eyebrow .skip-link`), font vars (`--font-grotesk`, `--font-mono-sp`), `data-theme` attribute contract on `<html>`.

- [ ] **Step 1: Write config files**

`package.json`:

```json
{
  "name": "bishesh-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "motion": "^12.0.0",
    "next": "^15.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.5.0"
  }
}
```

`next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`.gitignore`:

```
node_modules/
.next/
out/
*.tsbuildinfo
BISHESH_RESUME.pdf
```

(The resume PDF stays out of git so the repo can be published without shipping the source document.)

- [ ] **Step 2: Copy robot asset and create favicon**

Run: `Copy-Item "C:\Users\bishe\Downloads\robot.png" "public\robot.png"` (create `public/` first).

`public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="6" y="6" width="88" height="88" rx="16" fill="#ffd93d" stroke="#111" stroke-width="6"/>
  <rect x="24" y="30" width="52" height="34" rx="10" fill="#111"/>
  <circle cx="40" cy="47" r="6" fill="#5ce65c"/>
  <circle cx="60" cy="47" r="6" fill="#5ce65c"/>
  <line x1="50" y1="30" x2="50" y2="16" stroke="#111" stroke-width="6"/>
  <circle cx="50" cy="14" r="5" fill="#3b6fd4" stroke="#111" stroke-width="4"/>
  <path d="M38 74 Q50 82 62 74" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 3: Write `src/app/globals.css`** (tokens, base, shared classes)

```css
:root {
  --paper: #f5f2ea;
  --panel: #ffffff;
  --ink: #111111;
  --muted: #55524a;
  --dot: rgba(17, 17, 17, 0.12);
  --cobalt: #3b6fd4;
  --lime: #5ce65c;
  --teal: #4fb3a9;
  --yellow: #ffd93d;
  --bw: 3px;
  --shadow: 6px 6px 0 var(--ink);
  --shadow-sm: 4px 4px 0 var(--ink);
  --radius: 10px;
}

[data-theme="dark"] {
  --paper: #151412;
  --panel: #1f1e1b;
  --ink: #f0ede4;
  --muted: #b5b0a4;
  --dot: rgba(240, 237, 228, 0.1);
  --cobalt: #6292f0;
  --teal: #58c7bb;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background-color: var(--paper);
  background-image: radial-gradient(var(--dot) 1.5px, transparent 1.5px);
  background-size: 28px 28px;
  color: var(--ink);
  font-family: var(--font-grotesk), system-ui, sans-serif;
  overflow-x: hidden;
  transition: background-color 0.25s, color 0.25s;
}

img { max-width: 100%; display: block; }
a { color: inherit; }

::selection { background: var(--yellow); color: #111; }

:focus-visible { outline: 4px solid var(--cobalt); outline-offset: 3px; border-radius: 2px; }

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

.section { padding: 110px 0; position: relative; }

.card {
  background: var(--panel);
  border: var(--bw) solid var(--ink);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono-sp), monospace;
  font-weight: 700;
  font-size: 1rem;
  padding: 14px 26px;
  background: var(--yellow);
  color: #111;
  border: var(--bw) solid var(--ink);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 var(--ink); }
.btn:active { transform: translate(6px, 6px); box-shadow: 0 0 0 var(--ink); }
.btn--ghost { background: var(--panel); color: var(--ink); }

.tag {
  display: inline-block;
  font-family: var(--font-mono-sp), monospace;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 4px 10px;
  background: var(--panel);
  border: 2px solid var(--ink);
  border-radius: 6px;
  box-shadow: 3px 3px 0 var(--ink);
}

.eyebrow {
  font-family: var(--font-mono-sp), monospace;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.skip-link {
  position: fixed;
  top: -60px;
  left: 16px;
  z-index: 300;
  padding: 10px 18px;
  background: var(--yellow);
  color: #111;
  border: var(--bw) solid var(--ink);
  border-radius: var(--radius);
  font-weight: 700;
  transition: top 0.2s;
}
.skip-link:focus { top: 16px; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Write `src/app/layout.tsx`** (fonts, theme no-flash script, metadata, JSON-LD)

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-grotesk",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-sp",
});

// Update metadataBase when the real domain is live.
export const metadata: Metadata = {
  metadataBase: new URL("https://bisheshsunam.vercel.app"),
  title: "Bishesh Sunam | Full Stack Developer",
  description:
    "Full Stack Developer in Auckland, NZ with 4+ years building scalable web and enterprise applications — Vue, React, Node.js, TypeScript, Laravel, NetSuite, and Google Cloud.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    title: "Bishesh Sunam | Full Stack Developer",
    description:
      "Full Stack Developer in Auckland, NZ — scalable web apps, ERP integrations, and dashboards teams actually use.",
    images: ["/robot.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bishesh Sunam | Full Stack Developer",
    description:
      "Full Stack Developer in Auckland, NZ — scalable web apps, ERP integrations, and dashboards teams actually use.",
    images: ["/robot.png"],
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="light";}})();`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bishesh Sunam",
  jobTitle: "Full Stack Developer",
  email: "mailto:bishesh.sunam@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Auckland",
    addressCountry: "New Zealand",
  },
  sameAs: [
    "https://github.com/bishesh58",
    "https://linkedin.com/in/bishesh-sunam-89a807115",
  ],
  knowsAbout: [
    "Full-Stack Development", "JavaScript", "TypeScript", "Vue.js", "Nuxt",
    "React", "Node.js", "Laravel", "C# .NET", "NetSuite", "SuiteScript",
    "MySQL", "Google Cloud Platform",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body className={`${grotesk.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Write placeholder `src/app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main id="main">
      <div className="container section">
        <p className="eyebrow">Scaffold OK</p>
        <h1>Bishesh Sunam</h1>
      </div>
    </main>
  );
}
```

- [ ] **Step 6: Install and build**

Run: `npm install` then `npm run build`
Expected: build succeeds; route `/` listed as static (`○`); `out/index.html` exists.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "feat: scaffold Next.js static export with design tokens and layout shell"
```

---

### Task 2: Typed resume data layer

**Files:**
- Create: `src/data/types.ts`, `src/data/resume.ts`, `src/data/quips.ts`

**Interfaces:**
- Produces:
  - `types.ts`: `Accent = "cobalt" | "lime" | "teal" | "yellow"`, `SocialLink { label; url; icon: "github"|"linkedin"|"email" }`, `AboutSegment { text: string; highlight?: Accent }`, `TimelineEntry { kind: "work"|"education"; title; org; start; end; location?; summary; tech?: string[] }`, `Project { title; impact; tags: string[]; accent: Accent }`, `SkillGroup { label; accent: Accent; skills: string[] }`, `Resume` aggregating all of the above plus `name, role, location, email, phone, tagline, intro, techBadges: string[], certifications: string[]`.
  - `resume.ts`: `export const resume: Resume`.
  - `quips.ts`: `export const quips: Record<SectionId, string[]>` and `export type SectionId = "hero"|"about"|"journey"|"projects"|"skills"|"contact"`.

- [ ] **Step 1: Write `src/data/types.ts`**

```ts
export type Accent = "cobalt" | "lime" | "teal" | "yellow";

export interface SocialLink {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "email";
}

export interface AboutSegment {
  text: string;
  highlight?: Accent;
}

export interface TimelineEntry {
  kind: "work" | "education";
  title: string;
  org: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  tech?: string[];
}

export interface Project {
  title: string;
  impact: string;
  tags: string[];
  accent: Accent;
}

export interface SkillGroup {
  label: string;
  accent: Accent;
  skills: string[];
}

export interface Resume {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  tagline: string;
  intro: string;
  socials: SocialLink[];
  techBadges: string[];
  about: AboutSegment[][];
  timeline: TimelineEntry[];
  projects: Project[];
  skillGroups: SkillGroup[];
  certifications: string[];
}
```

- [ ] **Step 2: Write `src/data/resume.ts`**

```ts
import type { Resume } from "./types";

export const resume: Resume = {
  name: "Bishesh Sunam",
  role: "Full Stack Developer",
  location: "Auckland, New Zealand",
  email: "bishesh.sunam@gmail.com",
  phone: "022-405-0486",
  tagline: "I build the tools teams run on.",
  intro:
    "Based in Auckland, New Zealand, I'm a Full Stack Developer with 4+ years of experience building scalable web and enterprise applications — from NetSuite ERP integrations and role-based admin portals to real-time dashboards people actually enjoy using.",
  socials: [
    { label: "GitHub", url: "https://github.com/bishesh58", icon: "github" },
    { label: "LinkedIn", url: "https://linkedin.com/in/bishesh-sunam-89a807115", icon: "linkedin" },
    { label: "Email", url: "mailto:bishesh.sunam@gmail.com", icon: "email" },
  ],
  techBadges: ["Vue", "React", "Node.js", "TypeScript", "Laravel", "C#", "GCP", "MySQL"],
  about: [
    [
      { text: "Full Stack Developer with " },
      { text: "4+ years of experience", highlight: "yellow" },
      { text: " building scalable web and enterprise applications. I work across the " },
      { text: "JavaScript ecosystem", highlight: "cobalt" },
      { text: " (Vue, React, Node.js, TypeScript) and backend stacks like " },
      { text: "Laravel PHP and C# .NET", highlight: "teal" },
      { text: ", with solid SQL database design and cloud deployments." },
    ],
    [
      { text: "At the Islington group I build and integrate " },
      { text: "ERP systems and third-party APIs", highlight: "lime" },
      { text: " — NetSuite SPAs, admin portals, and " },
      { text: "dashboards and data visualisation", highlight: "yellow" },
      { text: " that turn scattered data into decisions for sales, marketing, and operations teams." },
    ],
    [
      { text: "I'm recognised for " },
      { text: "problem-solving", highlight: "teal" },
      { text: ", cross-functional collaboration, and thriving in " },
      { text: "Agile environments", highlight: "cobalt" },
      { text: ". ICAgile Certified Professional and Top Capstone Project winner." },
    ],
  ],
  timeline: [
    {
      kind: "work",
      title: "Web Developer",
      org: "Islington Group (Boundaryline, Heritage, BTI & Fentec)",
      start: "Jan 2023",
      end: "Present",
      location: "Auckland, New Zealand",
      summary:
        "Building the group's internal platform: NetSuite SPA with Kanban proposal pipeline, role-based admin portal, marketing analytics, credit control, order tracking, and warehouse KPI dashboards — plus fully custom public websites.",
      tech: ["Vue", "Nuxt", "Laravel", "SuiteScript", "MySQL", "WordPress", "GCP"],
    },
    {
      kind: "work",
      title: "Software Engineer (Contract)",
      org: "Attainate",
      start: "Mar 2022",
      end: "Jul 2022",
      location: "Remote, New Zealand",
      summary:
        "Took a subscription SaaS platform from wireframes to production: auth, subscription management, real-time data, and SendGrid transactional email — delivered ahead of deadline in an Agile workflow.",
      tech: ["Vue", "Node.js", "Firebase", "Firestore", "Cloud Functions", "GCP"],
    },
    {
      kind: "work",
      title: "Software Developer (Contract)",
      org: "Aspire2 International",
      start: "Jan 2020",
      end: "Jun 2020",
      location: "Auckland, New Zealand",
      summary:
        "Designed and built a Unity 2D educational game introducing Māori culture to international students — mechanics, animation, and cross-device performance.",
      tech: ["Unity", "C#", "GitHub"],
    },
    {
      kind: "education",
      title: "Bachelor of Computing Systems (Software)",
      org: "Unitec Institute of Technology",
      start: "2021",
      end: "2023",
      summary:
        "Full-stack coursework with Python, Django, React, Node.js, MongoDB, and MapBox. Winner — Top Capstone Project (Web App Development).",
    },
    {
      kind: "education",
      title: "Diplomas in Computing (Levels 5–7, Software)",
      org: "NTEC",
      start: "2014",
      end: "2020",
      summary:
        "From IT systems and networking foundations to database design, security, and a C# .NET restaurant management system with POS, inventory, and reporting.",
    },
  ],
  projects: [
    {
      title: "NetSuite SPA Dashboard",
      impact: "Single-page NetSuite app with a Kanban proposal pipeline that streamlined sales workflows and boosted team efficiency.",
      tags: ["SuiteScript", "Vue", "NetSuite"],
      accent: "cobalt",
    },
    {
      title: "Admin Dashboard Portal",
      impact: "Role-based portal with KPIs and NetSuite, AskNicely & BWare integrations — one home for every internal tool.",
      tags: ["Vue", "Laravel", "MySQL"],
      accent: "lime",
    },
    {
      title: "Marketing Analytics Dashboard",
      impact: "Google Analytics, Search Console, and website leads aggregated into one KPI view for marketing decisions.",
      tags: ["Nuxt", "GCP", "Charts"],
      accent: "yellow",
    },
    {
      title: "Credit Control Application",
      impact: "Internal credit workflow system that sharpened financial tracking and reporting efficiency.",
      tags: ["Laravel", "Vue", "MySQL"],
      accent: "teal",
    },
    {
      title: "Order Tracking Application",
      impact: "Mobile-friendly tool for internal teams to monitor order progress in real time.",
      tags: ["Vue", "REST APIs"],
      accent: "yellow",
    },
    {
      title: "Warehouse Metrics Dashboard",
      impact: "Multi-branch KPI dashboards tracking operational performance across warehouses.",
      tags: ["Vue", "MySQL", "Charts"],
      accent: "cobalt",
    },
    {
      title: "NPS Dashboard",
      impact: "Customer satisfaction tracking with real-time insights from external NPS APIs.",
      tags: ["Vue", "Node.js", "AskNicely"],
      accent: "teal",
    },
    {
      title: "Exception Management System",
      impact: "Operational exception handling that cut resolution time and errors.",
      tags: ["Laravel", "Vue"],
      accent: "lime",
    },
  ],
  skillGroups: [
    {
      label: "Frontend",
      accent: "cobalt",
      skills: ["JavaScript", "TypeScript", "Vue", "Nuxt", "React", "HTML/CSS", "Tailwind CSS"],
    },
    {
      label: "Backend",
      accent: "lime",
      skills: ["Node.js", "Laravel (PHP)", "C# .NET", "SuiteScript"],
    },
    {
      label: "Data & Cloud",
      accent: "teal",
      skills: ["MySQL", "SQL Server", "MongoDB", "Firebase", "Google Cloud", "CI/CD"],
    },
    {
      label: "Tools",
      accent: "yellow",
      skills: ["Git & GitHub", "Jira", "WordPress", "Unity"],
    },
  ],
  certifications: [
    "ICAgile Certified Professional",
    "Winner — Top Capstone Project (Web App Development)",
  ],
};
```

- [ ] **Step 3: Write `src/data/quips.ts`**

```ts
export type SectionId = "hero" | "about" | "journey" | "projects" | "skills" | "contact";

export const quips: Record<SectionId, string[]> = {
  hero: ["Beep boop. Welcome aboard!", "He codes. I supervise."],
  about: ["4+ years. I was there for most of the commits."],
  journey: ["Unity games to NetSuite ERPs — quite the road trip."],
  projects: ["I built 8 dashboards. I count them in my sleep.", "Kanban boards? We ship those."],
  skills: ["Vue by day, Laravel by night.", "Yes, he really does write SuiteScript."],
  contact: ["Say hi — he replies faster than a cron job."],
};
```

- [ ] **Step 4: Verify types**

Run: `npm run typecheck`
Expected: exits 0, no errors.

- [ ] **Step 5: Commit**

```powershell
git add src/data
git commit -m "feat: add typed resume data layer and mascot quips"
```

---

### Task 3: Section store + core hooks

**Files:**
- Create: `src/lib/sectionStore.ts`, `src/hooks/useSectionSpy.ts`, `src/hooks/useTheme.ts`, `src/hooks/usePrefersReducedMotion.ts`, `src/components/SectionSpy.tsx`

**Interfaces:**
- Consumes: `SectionId` from `src/data/quips.ts`.
- Produces:
  - `sectionStore.ts`: `setActiveSection(id: SectionId): void`, `useActiveSection(): SectionId` (React hook via `useSyncExternalStore`, server snapshot `"hero"`).
  - `useSectionSpy.ts`: `useSectionSpy(): void` — observes all `[data-section]` elements, publishes to the store.
  - `useTheme.ts`: `useTheme(): { theme: "light" | "dark" | null; toggle: () => void }` (null until mounted).
  - `usePrefersReducedMotion.ts`: `usePrefersReducedMotion(): boolean`.
  - `SectionSpy.tsx`: client component rendering `null`, runs the spy (mount once in the page).

- [ ] **Step 1: Write `src/lib/sectionStore.ts`**

```ts
import { useSyncExternalStore } from "react";
import type { SectionId } from "@/data/quips";

let activeSection: SectionId = "hero";
const listeners = new Set<() => void>();

export function setActiveSection(id: SectionId) {
  if (id === activeSection) return;
  activeSection = id;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useActiveSection(): SectionId {
  return useSyncExternalStore(subscribe, () => activeSection, () => "hero" as SectionId);
}
```

- [ ] **Step 2: Write `src/hooks/useSectionSpy.ts`**

```ts
"use client";

import { useEffect } from "react";
import { setActiveSection } from "@/lib/sectionStore";
import type { SectionId } from "@/data/quips";

export function useSectionSpy() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section as SectionId);
          }
        }
      },
      // A horizontal band around 40% viewport height decides the active section.
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}
```

- [ ] **Step 3: Write `src/components/SectionSpy.tsx`**

```tsx
"use client";

import { useSectionSpy } from "@/hooks/useSectionSpy";

export default function SectionSpy() {
  useSectionSpy();
  return null;
}
```

- [ ] **Step 4: Write `src/hooks/useTheme.ts`**

```ts
"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) ?? "light");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      return next;
    });
  }, []);

  return { theme, toggle };
}
```

- [ ] **Step 5: Write `src/hooks/usePrefersReducedMotion.ts`**

```ts
"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
```

- [ ] **Step 6: Verify and commit**

Run: `npm run build`
Expected: build passes.

```powershell
git add src/lib src/hooks src/components
git commit -m "feat: add section store, section spy, theme and reduced-motion hooks"
```

---

### Task 4: Motion primitives (Marquee, MagneticButton, SectionTitle, GhostNumber)

**Files:**
- Create: `src/components/Marquee.tsx`, `src/components/MagneticButton.tsx`, `src/components/SectionTitle.tsx`, `src/components/GhostNumber.tsx`
- Modify: `src/app/globals.css` (append primitive styles)

**Interfaces:**
- Consumes: `usePrefersReducedMotion` from Task 3; `Accent` from Task 2.
- Produces:
  - `<Marquee items={string[]} accent?: Accent baseVelocity?: number />` — full-width ticker divider.
  - `<MagneticButton>{children}</MagneticButton>` — wrapper adding cursor attraction (children keep their own classes, e.g. `.btn`).
  - `<SectionTitle text="ABOUT" />` — h2 with staggered letter reveal.
  - `<GhostNumber n="01" />` — parallax outlined number, absolutely positioned inside a `.section` (section needs `position: relative`, which `.section` has).

- [ ] **Step 1: Write `src/components/Marquee.tsx`**

Scroll-velocity-reactive infinite ticker. The track holds 4 copies of the item row; x wraps between -25% and 0 so the loop is seamless.

```tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import type { Accent } from "@/data/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface Props {
  items: string[];
  accent?: Accent;
  baseVelocity?: number;
}

export default function Marquee({ items, accent = "yellow", baseVelocity = 2.5 }: Props) {
  const reduced = usePrefersReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-4, 0, 4], {
    clamp: false,
  });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  const row = items.map((item, i) => (
    <span key={i}>
      {item} <span className="marquee-star">★</span>
    </span>
  ));

  return (
    <div className="marquee" style={{ background: `var(--${accent})` }} aria-hidden="true">
      <motion.div className="marquee-track" style={{ x }}>
        {row}{row}{row}{row}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Write `src/components/MagneticButton.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Props {
  children: React.ReactNode;
  strength?: number;
}

export default function MagneticButton({ children, strength = 0.35 }: Props) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Write `src/components/SectionTitle.tsx`**

```tsx
"use client";

import { motion } from "motion/react";

const letterVariants = {
  hidden: { y: "110%", rotate: 6 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function SectionTitle({ text }: { text: string }) {
  return (
    <motion.h2
      className="section-title"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.04 }}
    >
      {Array.from(text).map((char, i) => (
        <span className="section-title-mask" key={i} aria-hidden={char === " "}>
          <motion.span className="section-title-letter" variants={letterVariants}>
            {char === " " ? " " : char}
          </motion.span>
        </span>
      ))}
      <span className="visually-hidden">{text}</span>
    </motion.h2>
  );
}
```

Note: letters are `aria-hidden` fragments; the `.visually-hidden` span carries the accessible name. Add `.visually-hidden` in Step 5. Set `aria-hidden` on every mask span — change the mask span line to `<span className="section-title-mask" key={i} aria-hidden="true">`.

- [ ] **Step 4: Write `src/components/GhostNumber.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function GhostNumber({ n }: { n: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <div ref={ref} className="ghost-number-wrap" aria-hidden="true">
      <motion.span className="ghost-number" style={{ y }}>
        {n}
      </motion.span>
    </div>
  );
}
```

- [ ] **Step 5: Append primitive styles to `src/app/globals.css`**

```css
/* --- motion primitives --- */
.marquee {
  overflow: hidden;
  border-top: var(--bw) solid var(--ink);
  border-bottom: var(--bw) solid var(--ink);
  padding: 12px 0;
  position: relative;
  z-index: 2;
}
.marquee-track { display: flex; white-space: nowrap; width: max-content; }
.marquee-track span {
  font-family: var(--font-mono-sp), monospace;
  font-weight: 700;
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #111;
  padding: 0 14px;
}
.marquee-star { padding: 0 !important; }

.section-title {
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 48px;
  display: flex;
  flex-wrap: wrap;
}
.section-title-mask { display: inline-block; overflow: hidden; }
.section-title-letter { display: inline-block; will-change: transform; }

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.ghost-number-wrap {
  position: absolute;
  top: 40px;
  right: 0;
  pointer-events: none;
  z-index: 0;
}
.ghost-number {
  display: block;
  font-family: var(--font-mono-sp), monospace;
  font-size: clamp(8rem, 20vw, 16rem);
  font-weight: 700;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 2px var(--ink);
  opacity: 0.14;
}
```

- [ ] **Step 6: Smoke-test on the placeholder page**

Temporarily render in `src/app/page.tsx` (will be replaced in Task 6–8):

```tsx
import Marquee from "@/components/Marquee";
import SectionTitle from "@/components/SectionTitle";
import GhostNumber from "@/components/GhostNumber";

export default function Home() {
  return (
    <main id="main">
      <div className="container section">
        <GhostNumber n="01" />
        <SectionTitle text="SCAFFOLD" />
      </div>
      <Marquee items={["Full Stack", "Vue", "React", "Laravel", "NetSuite"]} />
      <div style={{ height: "150vh" }} />
    </main>
  );
}
```

Run: `npm run build` → passes. Then `npm run dev`, open http://localhost:3000: title letters stagger in, marquee scrolls and reverses with scroll direction, ghost number drifts.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "feat: add marquee, magnetic button, section title, ghost number primitives"
```

---

### Task 5: Chrome — Navbar, ProgressBar, Loader

**Files:**
- Create: `src/components/Navbar.tsx`, `src/components/ProgressBar.tsx`, `src/components/Loader.tsx`
- Modify: `src/app/globals.css` (append chrome styles)

**Interfaces:**
- Consumes: `useTheme`, `useActiveSection`, `usePrefersReducedMotion` (Task 3).
- Produces: `<Navbar />`, `<ProgressBar />`, `<Loader />` — all self-contained, mounted once in the page. Nav links target section ids: `#hero #about #journey #projects #skills #contact`.

- [ ] **Step 1: Write `src/components/Navbar.tsx`**

```tsx
"use client";

import { useTheme } from "@/hooks/useTheme";

const links = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar-inner container">
        <a href="#hero" className="nav-brand">BS</a>
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href="#contact" className="btn nav-cta">Get in touch</a>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="5" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <line x1="12" y1="2" x2="12" y2="4.5" /><line x1="12" y1="19.5" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="4.5" y2="12" /><line x1="19.5" y1="12" x2="22" y2="12" />
                  <line x1="4.9" y1="4.9" x2="6.7" y2="6.7" /><line x1="17.3" y1="17.3" x2="19.1" y2="19.1" />
                  <line x1="4.9" y1="19.1" x2="6.7" y2="17.3" /><line x1="17.3" y1="6.7" x2="19.1" y2="4.9" />
                </g>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Write `src/components/ProgressBar.tsx`**

```tsx
"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useActiveSection } from "@/lib/sectionStore";
import type { SectionId } from "@/data/quips";

const checkpoints: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const active = useActiveSection();

  return (
    <div className="progress" aria-hidden="true">
      <motion.div className="progress-fill" style={{ scaleX }} />
      <div className="progress-checkpoints">
        {checkpoints.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={`checkpoint${active === c.id ? " checkpoint--active" : ""}`}
            tabIndex={-1}
          >
            <span className="checkpoint-dot" />
            <span className="checkpoint-label">{c.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write `src/components/Loader.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Loader() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return;
    }
    const finish = () => setVisible(false);
    const timeout = setTimeout(finish, 2500);
    if (document.readyState === "complete") {
      setTimeout(finish, 1400);
    } else {
      window.addEventListener("load", () => setTimeout(finish, 1400), { once: true });
    }
    return () => clearTimeout(timeout);
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
            <span className="loader-letter" style={{ background: "var(--yellow)" }}>B</span>
            <span className="loader-letter loader-letter--2" style={{ background: "var(--lime)" }}>S</span>
          </div>
          <div className="loader-bar"><div className="loader-bar-fill" /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Append chrome styles to `src/app/globals.css`**

```css
/* --- navbar --- */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: var(--panel);
  border-bottom: var(--bw) solid var(--ink);
}
.navbar-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.nav-brand {
  font-family: var(--font-mono-sp), monospace;
  font-weight: 700;
  font-size: 1.15rem;
  text-decoration: none;
  background: var(--yellow);
  color: #111;
  border: var(--bw) solid var(--ink);
  border-radius: 8px;
  padding: 4px 10px;
  box-shadow: var(--shadow-sm);
}
.nav-links { display: flex; align-items: center; gap: 22px; }
.nav-link {
  font-weight: 600;
  text-decoration: none;
  position: relative;
}
.nav-link:hover::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -6px;
  height: 4px;
  background: var(--cobalt);
}
.nav-cta { padding: 8px 16px; font-size: 0.85rem; box-shadow: var(--shadow-sm); }
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px; height: 38px;
  background: var(--panel);
  color: var(--ink);
  border: var(--bw) solid var(--ink);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}
.theme-toggle:hover { transform: translate(-1px, -1px); box-shadow: 5px 5px 0 var(--ink); }
.theme-toggle:active { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--ink); }
@media (max-width: 760px) {
  .nav-link { display: none; }
}

/* --- progress bar --- */
.progress {
  position: fixed;
  top: 64px;
  left: 0; right: 0;
  z-index: 190;
  height: 6px;
  background: var(--panel);
  border-bottom: 2px solid var(--ink);
}
.progress-fill {
  height: 100%;
  background: var(--lime);
  transform-origin: left;
}
.progress-checkpoints {
  position: absolute;
  top: 0;
  left: 0; right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
}
.checkpoint { position: relative; text-decoration: none; }
.checkpoint-dot {
  display: block;
  width: 14px; height: 14px;
  margin-top: -4px;
  background: var(--panel);
  border: 2.5px solid var(--ink);
  border-radius: 4px;
  transition: background 0.2s, transform 0.2s;
}
.checkpoint--active .checkpoint-dot { background: var(--yellow); transform: rotate(45deg); }
.checkpoint-label {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono-sp), monospace;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  background: var(--panel);
  border: 2px solid var(--ink);
  border-radius: 4px;
  padding: 1px 6px;
  opacity: 0;
  transition: opacity 0.2s;
  white-space: nowrap;
}
.checkpoint--active .checkpoint-label, .checkpoint:hover .checkpoint-label { opacity: 1; }
@media (max-width: 760px) { .progress-checkpoints { display: none; } }

/* --- loader --- */
.loader {
  position: fixed;
  inset: 0;
  z-index: 400;
  background: var(--paper);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
}
.loader-letters { display: flex; gap: 16px; }
.loader-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 76px; height: 76px;
  font-family: var(--font-mono-sp), monospace;
  font-size: 2.4rem;
  font-weight: 700;
  color: #111;
  border: var(--bw) solid var(--ink);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  animation: loader-bounce 0.9s ease-in-out infinite;
}
.loader-letter--2 { animation-delay: 0.15s; }
@keyframes loader-bounce {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-18px) rotate(2deg); }
}
.loader-bar {
  width: 220px;
  height: 14px;
  border: var(--bw) solid var(--ink);
  border-radius: 7px;
  background: var(--panel);
  overflow: hidden;
}
.loader-bar-fill {
  height: 100%;
  background: var(--cobalt);
  animation: loader-fill 1.3s ease-out forwards;
}
@keyframes loader-fill { from { width: 0; } to { width: 100%; } }
```

- [ ] **Step 5: Mount chrome in the page**

Update `src/app/page.tsx` (keeping Task 4's demo content below the chrome):

```tsx
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import SectionSpy from "@/components/SectionSpy";
```

Render `<Loader />`, `<Navbar />`, `<ProgressBar />`, `<SectionSpy />` at the top of `<main>`'s parent fragment, before `<main id="main">`. Add `<a className="skip-link" href="#main">Skip to content</a>` as the very first element. Add `style={{ paddingTop: 70 }}` to main via a `main { padding-top: 70px; }` rule appended to globals.css instead of inline style.

Run: `npm run dev` → loader plays then slides up; navbar fixed; progress fills on scroll; theme toggle flips palette and persists on reload.

- [ ] **Step 6: Build and commit**

Run: `npm run build` → passes.

```powershell
git add -A
git commit -m "feat: add navbar with theme toggle, scroll progress checkpoints, intro loader"
```

---

### Task 6: Hero + About sections

**Files:**
- Create: `src/components/sections/Hero.tsx`, `src/components/sections/Hero.module.css`, `src/components/sections/About.tsx`, `src/components/sections/About.module.css`
- Modify: `src/app/page.tsx` (assemble real page start)

**Interfaces:**
- Consumes: `resume` (Task 2), `MagneticButton`, `SectionTitle`, `GhostNumber`, `Marquee` (Task 4).
- Produces: `<Hero />`, `<About />`. Sections carry `id` + `data-section` (`hero`, `about`).

- [ ] **Step 1: Write `src/components/sections/Hero.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { resume } from "@/data/resume";
import MagneticButton from "@/components/MagneticButton";
import styles from "./Hero.module.css";

const icons: Record<string, React.ReactNode> = {
  github: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0.3a12 12 0 0 0-3.8 23.4c0.6 0.1 0.8-0.3 0.8-0.6v-2c-3.3 0.7-4-1.6-4-1.6-0.6-1.4-1.4-1.8-1.4-1.8-1.1-0.7 0.1-0.7 0.1-0.7 1.2 0.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 0.1-0.8 0.4-1.3 0.8-1.6-2.7-0.3-5.5-1.3-5.5-5.9 0-1.3 0.5-2.4 1.2-3.2-0.1-0.3-0.5-1.5 0.1-3.2 0 0 1-0.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2 0.6 1.7 0.2 2.9 0.1 3.2 0.8 0.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9 0.4 0.4 0.8 1.1 0.8 2.2v3.3c0 0.3 0.2 0.7 0.8 0.6A12 12 0 0 0 12 0.3z"/>
    </svg>
  ),
  linkedin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.2V9h3.4v1.6h0.1c0.5-0.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.2 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7 20.4H3.4V9H7v11.4zM22.2 0H1.8C0.8 0 0 0.8 0 1.7v20.6c0 0.9 0.8 1.7 1.8 1.7h20.4c1 0 1.8-0.8 1.8-1.7V1.7c0-0.9-0.8-1.7-1.8-1.7z"/>
    </svg>
  ),
  email: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  ),
};

export default function Hero() {
  return (
    <section className={styles.hero} id="hero" data-section="hero">
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="eyebrow">// {resume.location}</p>
          <h1 className={styles.name}>
            I&apos;m <span className={styles.nameMark}>{resume.name}</span>.
          </h1>
          <p className={styles.tagline}>{resume.tagline}</p>
          <p className={styles.intro}>{resume.intro}</p>
          <div className={styles.socials}>
            {resume.socials.map((s) => (
              <MagneticButton key={s.label}>
                <a
                  className={styles.socialBtn}
                  href={s.url}
                  target={s.icon === "email" ? undefined : "_blank"}
                  rel={s.icon === "email" ? undefined : "noopener noreferrer"}
                  aria-label={s.label}
                >
                  {icons[s.icon]}
                </a>
              </MagneticButton>
            ))}
            <MagneticButton>
              <a className="btn" href="#contact">Get in touch</a>
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, rotate: 4, y: 30 }}
          animate={{ opacity: 1, rotate: 2, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.portrait}>
            <span className={styles.tape} aria-hidden="true" />
            <Image src="/robot.png" alt="Illustrated robot working on a laptop — Bishesh's mascot" width={420} height={452} priority />
            <span className={styles.portraitLabel}>full-stack unit #58</span>
          </div>
          <motion.span
            className={`${styles.sticker} ${styles.stickerCode}`}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            {"</>"}
          </motion.span>
          <motion.span
            className={`${styles.sticker} ${styles.stickerBolt}`}
            animate={{ y: [0, 10, 0], rotate: [-6, 4, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            ⚡
          </motion.span>
        </motion.div>
      </div>

      <div className={`container ${styles.badges}`}>
        {resume.techBadges.map((t, i) => (
          <motion.span
            key={t}
            className="tag"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.06 }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/sections/Hero.module.css`**

```css
.hero { padding: 150px 0 60px; position: relative; overflow: hidden; }
.grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 0;
}
.left { position: relative; z-index: 2; margin-right: -70px; }
.name {
  font-size: clamp(2.8rem, 6.5vw, 5rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 14px 0 18px;
}
.nameMark {
  background: var(--yellow);
  color: #111;
  border: var(--bw) solid var(--ink);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  padding: 0 12px;
  display: inline-block;
  transform: rotate(-1deg);
}
.tagline {
  font-family: var(--font-mono-sp), monospace;
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 14px;
}
.intro { max-width: 46ch; color: var(--muted); font-size: 1.05rem; line-height: 1.65; margin-bottom: 28px; }
.socials { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.socialBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px; height: 48px;
  background: var(--panel);
  color: var(--ink);
  border: var(--bw) solid var(--ink);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
}
.socialBtn:hover { background: var(--teal); color: #111; transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--ink); }
.socialBtn:active { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--ink); }
.right { position: relative; z-index: 1; }
.portrait {
  position: relative;
  background: var(--panel);
  border: var(--bw) solid var(--ink);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 18px 18px 40px;
}
.tape {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%) rotate(-3deg);
  width: 120px; height: 28px;
  background: var(--yellow);
  border: 2.5px solid var(--ink);
  z-index: 3;
}
.portraitLabel {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%) rotate(1deg);
  font-family: var(--font-mono-sp), monospace;
  font-size: 0.75rem;
  font-weight: 700;
  background: var(--lime);
  color: #111;
  border: 2px solid var(--ink);
  border-radius: 6px;
  padding: 2px 10px;
  white-space: nowrap;
}
.sticker {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 62px; height: 62px;
  font-family: var(--font-mono-sp), monospace;
  font-size: 1.3rem;
  font-weight: 700;
  color: #111;
  border: var(--bw) solid var(--ink);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  z-index: 3;
}
.stickerCode { top: -26px; right: -10px; background: var(--cobalt); transform: rotate(8deg); }
.stickerBolt { bottom: 30px; left: -26px; background: var(--teal); transform: rotate(-8deg); }
.badges { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 54px; }
@media (max-width: 900px) {
  .hero { padding-top: 120px; }
  .grid { grid-template-columns: 1fr; gap: 48px; }
  .left { margin-right: 0; }
  .right { max-width: 380px; margin: 0 auto; }
}
```

- [ ] **Step 3: Write `src/components/sections/About.tsx`**

Marker-highlight reveal: solid-color background image scales from 0% to 100% width when in view.

```tsx
"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionTitle from "@/components/SectionTitle";
import GhostNumber from "@/components/GhostNumber";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className="section" id="about" data-section="about">
      <div className="container">
        <GhostNumber n="01" />
        <SectionTitle text="ABOUT" />
        <motion.div
          className={`card ${styles.aboutCard}`}
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          {resume.about.map((paragraph, pi) => (
            <p className={styles.text} key={pi}>
              {paragraph.map((seg, si) =>
                seg.highlight ? (
                  <motion.span
                    key={si}
                    className={styles.hl}
                    style={{ backgroundImage: `linear-gradient(var(--${seg.highlight}), var(--${seg.highlight}))` }}
                    initial={{ backgroundSize: "0% 88%" }}
                    whileInView={{ backgroundSize: "100% 88%" }}
                    viewport={{ once: true, amount: 0.9 }}
                    transition={{ duration: 0.6, delay: 0.15 + si * 0.05 }}
                  >
                    {seg.text}
                  </motion.span>
                ) : (
                  <span key={si}>{seg.text}</span>
                )
              )}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write `src/components/sections/About.module.css`**

```css
.aboutCard { max-width: 820px; }
.text { font-size: 1.12rem; line-height: 1.9; }
.text + .text { margin-top: 18px; }
.hl {
  font-weight: 600;
  color: #111;
  background-repeat: no-repeat;
  background-position: 0 60%;
  padding: 0 4px;
  border-radius: 4px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
[data-theme="dark"] .hl { color: #111; }
```

Note: highlighted text is always `#111` because highlight fills are the saturated accents; in dark mode the unfilled initial state briefly shows dark-on-dark — acceptable because the fill animates in at 90% viewport visibility. If it reads poorly in the visual check, change initial to `backgroundSize: "100% 0%"` + final `"100% 88%"` so color contrast never depends on fill width.

- [ ] **Step 5: Assemble page**

`src/app/page.tsx` becomes:

```tsx
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import SectionSpy from "@/components/SectionSpy";
import Marquee from "@/components/Marquee";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

const tickerA = ["Full Stack", "Vue", "React", "Node.js", "TypeScript", "Laravel", "NetSuite"];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Loader />
      <Navbar />
      <ProgressBar />
      <SectionSpy />
      <main id="main">
        <Hero />
        <Marquee items={tickerA} />
        <About />
      </main>
    </>
  );
}
```

- [ ] **Step 6: Verify and commit**

Run: `npm run build` → passes. `npm run dev` → hero staggers in, robot panel tilted with tape + floating stickers, badges cascade; marquee divides hero/about; about highlights sweep in.

```powershell
git add -A
git commit -m "feat: add hero and about sections with marker highlights"
```

---

### Task 7: Journey timeline + Projects grid

**Files:**
- Create: `src/components/sections/Journey.tsx`, `src/components/sections/Journey.module.css`, `src/components/sections/Projects.tsx`, `src/components/sections/Projects.module.css`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `resume.timeline`, `resume.projects` (Task 2), `SectionTitle`, `GhostNumber`, `Marquee` (Task 4).
- Produces: `<Journey />` (`data-section="journey"`), `<Projects />` (`data-section="projects"`).

- [ ] **Step 1: Write `src/components/sections/Journey.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionTitle from "@/components/SectionTitle";
import GhostNumber from "@/components/GhostNumber";
import styles from "./Journey.module.css";

export default function Journey() {
  return (
    <section className="section" id="journey" data-section="journey">
      <div className="container">
        <GhostNumber n="02" />
        <SectionTitle text="MY JOURNEY" />
        <div className={styles.timeline}>
          {resume.timeline.map((entry, i) => (
            <motion.article
              key={`${entry.org}-${entry.start}`}
              className={`${styles.entry} ${entry.kind === "education" ? styles.entryEdu : ""}`}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            >
              <span className={styles.dot} aria-hidden="true" />
              <div className={`card ${styles.entryCard}`}>
                <span className={styles.kind}>{entry.kind === "work" ? "WORK" : "STUDY"}</span>
                <h3 className={styles.title}>
                  {entry.title} <span className={styles.org}>@ {entry.org}</span>
                </h3>
                <p className={styles.date}>
                  {entry.start} — {entry.end}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
                <p className={styles.summary}>{entry.summary}</p>
                {entry.tech && (
                  <div className={styles.tech}>
                    {entry.tech.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/sections/Journey.module.css`**

```css
.timeline {
  position: relative;
  padding-left: 36px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  max-width: 780px;
}
.timeline::before {
  content: "";
  position: absolute;
  left: 8px;
  top: 8px;
  bottom: 8px;
  width: 4px;
  background: var(--ink);
}
.entry { position: relative; }
.dot {
  position: absolute;
  left: -36px;
  top: 26px;
  width: 20px; height: 20px;
  background: var(--yellow);
  border: var(--bw) solid var(--ink);
  border-radius: 6px;
  transform: rotate(45deg);
  z-index: 1;
}
.entryEdu .dot { background: var(--teal); border-radius: 50%; transform: none; }
.entryCard { padding: 24px 28px; }
.entryEdu .entryCard { background: var(--paper); }
.kind {
  font-family: var(--font-mono-sp), monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  background: var(--ink);
  color: var(--paper);
  border-radius: 4px;
  padding: 2px 8px;
}
.title { font-size: 1.25rem; margin: 10px 0 4px; line-height: 1.35; }
.org { color: var(--cobalt); }
.date {
  font-family: var(--font-mono-sp), monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--muted);
  margin-bottom: 10px;
}
.summary { line-height: 1.7; }
.tech { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
```

- [ ] **Step 3: Write `src/components/sections/Projects.tsx`**

Cards enter with alternating tilt and snap straight (spec §6).

```tsx
"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionTitle from "@/components/SectionTitle";
import GhostNumber from "@/components/GhostNumber";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section className="section" id="projects" data-section="projects">
      <div className="container">
        <GhostNumber n="03" />
        <SectionTitle text="PROJECTS" />
        <p className={`eyebrow ${styles.note}`}>
          // internal tools shipped at the Islington group — no public links, real impact
        </p>
        <div className={styles.grid}>
          {resume.projects.map((project, i) => (
            <motion.article
              key={project.title}
              className={`card ${styles.projectCard}`}
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.cardTop} style={{ background: `var(--${project.accent})` }}>
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.dots} aria-hidden="true">
                  <i /><i /><i />
                </span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.impact}>{project.impact}</p>
                <div className={styles.tags}>
                  {project.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write `src/components/sections/Projects.module.css`**

```css
.note { margin: -28px 0 36px; }
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}
.projectCard {
  padding: 0;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.projectCard:hover { transform: translate(-4px, -4px); box-shadow: 10px 10px 0 var(--ink); }
.cardTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  border-bottom: var(--bw) solid var(--ink);
}
.index {
  font-family: var(--font-mono-sp), monospace;
  font-weight: 700;
  font-size: 1rem;
  color: #111;
}
.dots { display: flex; gap: 6px; }
.dots i {
  width: 12px; height: 12px;
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 50%;
}
.cardBody { padding: 22px 24px 26px; }
.title { font-size: 1.3rem; margin-bottom: 10px; }
.impact { color: var(--muted); line-height: 1.65; margin-bottom: 16px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
@media (max-width: 820px) { .grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 5: Wire into page and verify**

In `src/app/page.tsx` add after `<About />`:

```tsx
<Marquee items={tickerB} accent="lime" />
<Journey />
<Marquee items={tickerA} accent="teal" />
<Projects />
```

with `const tickerB = ["Dashboards", "ERP Integrations", "Kanban Pipelines", "Data Viz", "APIs", "SEO"];` and the imports for `Journey` and `Projects`.

Run: `npm run build` → passes. Visual check: timeline line + rotated dots, education entries visually distinct; project cards tilt in and straighten, window-chrome top strips in accent colors.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: add journey timeline and projects grid"
```

---

### Task 8: Skills sticker sheet + Contact + Footer

**Files:**
- Create: `src/components/sections/Skills.tsx`, `src/components/sections/Skills.module.css`, `src/components/sections/Contact.tsx`, `src/components/sections/Contact.module.css`, `src/components/sections/Footer.tsx`, `src/components/sections/Footer.module.css`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `resume.skillGroups`, `resume.certifications`, `resume.email/phone/socials` (Task 2), `SectionTitle`, `GhostNumber`, `Marquee`, `MagneticButton` (Task 4).
- Produces: `<Skills />` (`data-section="skills"`), `<Contact />` (`data-section="contact"`), `<Footer />`.

- [ ] **Step 1: Write `src/components/sections/Skills.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionTitle from "@/components/SectionTitle";
import GhostNumber from "@/components/GhostNumber";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section className="section" id="skills" data-section="skills">
      <div className="container">
        <GhostNumber n="04" />
        <SectionTitle text="SKILLS" />
        <div className={styles.groups}>
          {resume.skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              className={`card ${styles.group}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: gi * 0.08 }}
            >
              <h3 className={styles.groupLabel} style={{ background: `var(--${group.accent})` }}>
                {group.label}
              </h3>
              <div className={styles.sheet}>
                {group.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className={styles.sticker}
                    style={{ transform: `rotate(${((si % 5) - 2) * 1.6}deg)` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/sections/Skills.module.css`**

```css
.groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}
.group { padding: 24px; }
.groupLabel {
  display: inline-block;
  font-size: 1.05rem;
  color: #111;
  border: var(--bw) solid var(--ink);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  padding: 6px 16px;
  margin-bottom: 22px;
  transform: rotate(-1.5deg);
}
.sheet { display: flex; flex-wrap: wrap; gap: 12px; }
.sticker {
  font-family: var(--font-mono-sp), monospace;
  font-size: 0.88rem;
  font-weight: 700;
  background: var(--paper);
  border: 2.5px solid var(--ink);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  padding: 8px 14px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  transform-origin: bottom left;
}
.sticker:hover {
  transform: rotate(0deg) scale(1.08) translateY(-3px) !important;
  box-shadow: 6px 6px 0 var(--ink);
}
@media (max-width: 820px) { .groups { grid-template-columns: 1fr; } }
```

(`!important` overrides the inline per-sticker rotation on hover — the "peel flat" effect.)

- [ ] **Step 3: Write `src/components/sections/Contact.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { resume } from "@/data/resume";
import SectionTitle from "@/components/SectionTitle";
import GhostNumber from "@/components/GhostNumber";
import MagneticButton from "@/components/MagneticButton";
import styles from "./Contact.module.css";

export default function Contact() {
  const github = resume.socials.find((s) => s.icon === "github");
  const linkedin = resume.socials.find((s) => s.icon === "linkedin");

  return (
    <section className="section" id="contact" data-section="contact">
      <div className="container">
        <GhostNumber n="05" />
        <SectionTitle text="CONTACT" />
        <motion.div
          className={`card ${styles.contactCard}`}
          initial={{ opacity: 0, y: 40, rotate: 1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <h3 className={styles.heading}>Let&apos;s build something.</h3>
          <p className={styles.sub}>
            Open to interesting full-stack work, collaborations, and good coffee in {resume.location}.
          </p>
          <div className={styles.actions}>
            <MagneticButton>
              <a className="btn" href={`mailto:${resume.email}`}>{resume.email}</a>
            </MagneticButton>
            {linkedin && (
              <MagneticButton>
                <a className="btn btn--ghost" href={linkedin.url} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </MagneticButton>
            )}
            {github && (
              <MagneticButton>
                <a className="btn btn--ghost" href={github.url} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </MagneticButton>
            )}
          </div>
          <p className={styles.phone}>
            or call <a href={`tel:+64${resume.phone.replace(/[^0-9]/g, "").replace(/^0/, "")}`}>{resume.phone}</a>
          </p>
          <div className={styles.certs}>
            {resume.certifications.map((c) => (
              <span key={c} className="tag">{c}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write `src/components/sections/Contact.module.css`**

```css
.contactCard {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
  padding: 56px 40px;
  background: var(--panel);
}
.heading { font-size: clamp(1.9rem, 4.5vw, 3rem); letter-spacing: -0.02em; margin-bottom: 12px; }
.sub { color: var(--muted); font-size: 1.05rem; margin-bottom: 32px; }
.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 24px;
}
.phone { font-family: var(--font-mono-sp), monospace; font-weight: 700; margin-bottom: 28px; }
.phone a { text-decoration-thickness: 3px; text-decoration-color: var(--lime); }
.certs { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; }
@media (max-width: 600px) {
  .contactCard { padding: 40px 20px; }
  .actions .btn { font-size: 0.85rem; padding: 12px 16px; }
}
```

- [ ] **Step 5: Write `src/components/sections/Footer.tsx`**

```tsx
import { resume } from "@/data/resume";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.barcode} aria-hidden="true" />
        <p className={styles.stamp}>
          © {new Date().getFullYear()} {resume.name} · {resume.location}
        </p>
        <span className={styles.note}>Built with Next.js + too much coffee</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Write `src/components/sections/Footer.module.css`**

```css
.footer { border-top: var(--bw) solid var(--ink); background: var(--panel); padding: 36px 0; }
.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}
.barcode {
  display: inline-block;
  width: 110px;
  height: 34px;
  background: repeating-linear-gradient(
    90deg,
    var(--ink) 0 3px, transparent 3px 6px,
    var(--ink) 6px 11px, transparent 11px 13px,
    var(--ink) 13px 15px, transparent 15px 20px
  );
}
.stamp { font-family: var(--font-mono-sp), monospace; font-size: 0.85rem; font-weight: 700; }
.note {
  font-family: var(--font-mono-sp), monospace;
  font-size: 0.78rem;
  font-weight: 700;
  background: var(--yellow);
  color: #111;
  border: 2.5px solid var(--ink);
  border-radius: 6px;
  box-shadow: var(--shadow-sm);
  padding: 8px 14px;
  transform: rotate(-2deg);
}
```

- [ ] **Step 7: Wire into page, verify, commit**

Add after `<Projects />` in `src/app/page.tsx`:

```tsx
<Marquee items={tickerB} accent="yellow" baseVelocity={-2.5} />
<Skills />
<Marquee items={tickerA} accent="cobalt" />
<Contact />
```

and `<Footer />` after `</main>`'s last section, inside main. (Order: … `<Contact /></main><Footer />`.)

Run: `npm run build` → passes. Visual: full page scroll works end to end, checkpoints track sections, both themes look right.

```powershell
git add -A
git commit -m "feat: add skills sticker sheet, contact card, stamped footer"
```

---

### Task 9: Living robot mascot

**Files:**
- Create: `src/components/RobotMascot/Mascot.tsx`, `src/components/RobotMascot/mascot.module.css`
- Modify: `src/app/page.tsx` (mount `<Mascot />` after `<Footer />`)

**Interfaces:**
- Consumes: `useActiveSection` (Task 3), `quips` + `SectionId` (Task 2), `usePrefersReducedMotion` (Task 3).
- Produces: `<Mascot />` — fixed bottom-right companion. No props.

**Behavior contract (spec §5):**
- Pupils track cursor (springed, clamped ±3.5px); idle wander on touch devices (no mousemove events).
- Poses by section: hero → left arm waves; about/journey → neutral; projects → both arms "type" (small y oscillation) with a laptop visible; skills → right hand holds a wrench; contact → right hand raises an envelope.
- One quip per section visit (first visit only), auto-dismisses after 4.5s, dismiss button, 8s cooldown between bubbles, `role="status"`.
- Blink every ~4s (eyelid scaleY). Antenna bobs.
- Reduced motion → static robot, no bubbles, no tracking. Hidden below 480px viewport width.

- [ ] **Step 1: Write `src/components/RobotMascot/Mascot.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useActiveSection } from "@/lib/sectionStore";
import { quips, type SectionId } from "@/data/quips";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./mascot.module.css";

type Pose = "wave" | "idle" | "type" | "wrench" | "mail";

const poseBySection: Record<SectionId, Pose> = {
  hero: "wave",
  about: "idle",
  journey: "idle",
  projects: "type",
  skills: "wrench",
  contact: "mail",
};

export default function Mascot() {
  const reduced = usePrefersReducedMotion();
  const section = useActiveSection();
  const pose: Pose = reduced ? "idle" : poseBySection[section];

  const [mounted, setMounted] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const shownSections = useRef(new Set<SectionId>());
  const lastBubbleAt = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // Pupil tracking
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springPx = useSpring(px, { stiffness: 150, damping: 18 });
  const springPy = useSpring(py, { stiffness: 150, damping: 18 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const el = svgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.3;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const r = Math.min(dist / 60, 3.5);
      px.set((dx / dist) * r);
      py.set((dy / dist) * r);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, px, py]);

  // Quips: once per section, 8s cooldown, 4.5s auto-dismiss
  useEffect(() => {
    if (reduced || !mounted) return;
    if (window.innerWidth < 480) return;
    if (shownSections.current.has(section)) return;
    const now = Date.now();
    if (now - lastBubbleAt.current < 8000) return;
    const options = quips[section];
    const text = options[shownSections.current.size % options.length];
    shownSections.current.add(section);
    lastBubbleAt.current = now;
    setBubble(text);
    const t = setTimeout(() => setBubble(null), 4500);
    return () => clearTimeout(t);
  }, [section, reduced, mounted]);

  if (!mounted) return null;

  const leftArmAnimate =
    pose === "wave"
      ? { rotate: [0, -35, 0, -35, 0], transition: { duration: 1.6, repeat: Infinity, repeatDelay: 2.2 } }
      : pose === "type"
        ? { rotate: 28, y: [0, 2, 0], transition: { y: { duration: 0.35, repeat: Infinity } } }
        : { rotate: 0 };

  const rightArmAnimate =
    pose === "type"
      ? { rotate: -28, y: [0, -2, 0], transition: { y: { duration: 0.35, repeat: Infinity, delay: 0.15 } } }
      : pose === "wrench" || pose === "mail"
        ? { rotate: -55 }
        : { rotate: 0 };

  return (
    <div className={styles.mascot}>
      <AnimatePresence>
        {bubble && (
          <motion.div
            className={styles.bubble}
            role="status"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
          >
            {bubble}
            <button
              type="button"
              className={styles.bubbleClose}
              onClick={() => setBubble(null)}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <svg
        ref={svgRef}
        className={styles.svg}
        viewBox="0 0 120 140"
        width="110"
        height="128"
        aria-label={`Robot mascot, currently ${pose === "idle" ? "watching" : pose === "wave" ? "waving" : pose === "type" ? "typing" : pose === "wrench" ? "holding a wrench" : "holding an envelope"}`}
        role="img"
      >
        {/* antenna */}
        <motion.g animate={reduced ? undefined : { y: [0, -2, 0] }} transition={{ duration: 2.4, repeat: Infinity }}>
          <line x1="60" y1="22" x2="60" y2="10" stroke="var(--ink)" strokeWidth="3.5" />
          <circle cx="60" cy="8" r="5" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="3" />
        </motion.g>

        {/* head */}
        <rect x="30" y="20" width="60" height="46" rx="14" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3.5" />
        <rect x="38" y="30" width="44" height="26" rx="9" fill="var(--ink)" />
        {/* eyes */}
        <circle cx="52" cy="43" r="6.5" fill="var(--lime)" />
        <circle cx="68" cy="43" r="6.5" fill="var(--lime)" />
        <motion.g style={{ x: springPx, y: springPy }}>
          <circle cx="52" cy="43" r="2.6" fill="#111" />
          <circle cx="68" cy="43" r="2.6" fill="#111" />
        </motion.g>
        {/* blink eyelid */}
        {!reduced && (
          <motion.rect
            x="42" y="33" width="36" height="20" rx="8" fill="var(--ink)"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            style={{ originY: "33px" }}
            transition={{ duration: 0.28, repeat: Infinity, repeatDelay: 3.8 }}
          />
        )}
        {/* ear cups */}
        <rect x="24" y="36" width="8" height="16" rx="3" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="3" />
        <rect x="88" y="36" width="8" height="16" rx="3" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="3" />

        {/* body */}
        <rect x="36" y="70" width="48" height="44" rx="12" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="3.5" />
        <path d="M52 84 h16 l-3 14 h-10 z" fill="var(--lime)" stroke="var(--ink)" strokeWidth="3" />

        {/* left arm (viewer's left) — shoulder pivot at (36,78) */}
        <motion.g animate={leftArmAnimate} style={{ originX: "36px", originY: "78px" }}>
          <rect x="18" y="74" width="20" height="9" rx="4.5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
          <circle cx="16" cy="78" r="6" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
        </motion.g>

        {/* right arm — shoulder pivot at (84,78) */}
        <motion.g animate={rightArmAnimate} style={{ originX: "84px", originY: "78px" }}>
          <rect x="82" y="74" width="20" height="9" rx="4.5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
          <circle cx="104" cy="78" r="6" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
          {pose === "wrench" && (
            <g>
              <rect x="100" y="62" width="6" height="18" rx="2" fill="var(--teal)" stroke="var(--ink)" strokeWidth="2.5" />
              <circle cx="103" cy="60" r="5" fill="none" stroke="var(--ink)" strokeWidth="3" />
            </g>
          )}
          {pose === "mail" && (
            <g>
              <rect x="96" y="58" width="20" height="14" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2.5" />
              <path d="M96 58 l10 8 l10 -8" fill="none" stroke="var(--ink)" strokeWidth="2" />
            </g>
          )}
        </motion.g>

        {/* laptop for typing pose */}
        {pose === "type" && (
          <g>
            <rect x="40" y="106" width="40" height="6" rx="2" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.5" />
            <rect x="44" y="90" width="32" height="18" rx="2" fill="var(--teal)" stroke="var(--ink)" strokeWidth="2.5" />
          </g>
        )}

        {/* base */}
        <rect x="42" y="114" width="36" height="10" rx="5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Write `src/components/RobotMascot/mascot.module.css`**

```css
.mascot {
  position: fixed;
  bottom: 18px;
  right: 20px;
  z-index: 180;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  pointer-events: none;
}
.svg { filter: drop-shadow(4px 4px 0 rgba(17, 17, 17, 0.35)); }
.bubble {
  pointer-events: auto;
  position: relative;
  max-width: 230px;
  background: var(--panel);
  border: var(--bw) solid var(--ink);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  padding: 12px 30px 12px 14px;
  font-family: var(--font-mono-sp), monospace;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.5;
}
.bubble::after {
  content: "";
  position: absolute;
  bottom: -12px;
  right: 34px;
  width: 16px; height: 16px;
  background: var(--panel);
  border-right: var(--bw) solid var(--ink);
  border-bottom: var(--bw) solid var(--ink);
  transform: rotate(45deg) skew(8deg, 8deg);
}
.bubbleClose {
  position: absolute;
  top: 4px;
  right: 6px;
  background: none;
  border: none;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ink);
  cursor: pointer;
  line-height: 1;
}
@media (max-width: 760px) {
  .mascot { transform: scale(0.72); transform-origin: bottom right; bottom: 10px; right: 10px; }
}
@media (max-width: 479px) {
  .mascot { display: none; }
}
```

- [ ] **Step 3: Mount, verify, commit**

Add `<Mascot />` after `<Footer />` in `src/app/page.tsx` (`import Mascot from "@/components/RobotMascot/Mascot";`).

Run: `npm run build` → passes. Visual: robot bottom-right; pupils follow mouse; waves on hero; typing pose + laptop at projects; wrench at skills; envelope at contact; a quip bubble appears once per section and can be dismissed; robot hidden on a ~400px-wide window; static under reduced motion (emulate via DevTools rendering settings).

```powershell
git add -A
git commit -m "feat: add living robot mascot with eye tracking, poses, and quips"
```

---

### Task 10: Custom cursor + final polish pass

**Files:**
- Create: `src/components/Cursor.tsx`
- Modify: `src/app/globals.css` (cursor styles + `main` padding if missed), `src/app/page.tsx` (mount cursor)

**Interfaces:**
- Consumes: `usePrefersReducedMotion` (Task 3).
- Produces: `<Cursor />` — desktop-only crosshair cursor. Interactive elements are detected via `closest("a, button, [data-cursor]")`.

- [ ] **Step 1: Write `src/components/Cursor.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Cursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let bx = x;
    let by = y;
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as Element | null;
      hovering = !!target?.closest("a, button, [data-cursor]");
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const loop = () => {
      bx += (x - bx) * 0.18;
      by += (y - by) * 0.18;
      if (boxRef.current) {
        boxRef.current.style.transform = `translate(${bx}px, ${by}px) rotate(45deg) scale(${hovering ? 1.6 : 1})`;
        boxRef.current.style.background = hovering ? "var(--yellow)" : "transparent";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={boxRef} className="cursor-box" aria-hidden="true" />
    </>
  );
}
```

- [ ] **Step 2: Append cursor styles to `src/app/globals.css`**

```css
/* --- custom cursor --- */
.has-custom-cursor, .has-custom-cursor a, .has-custom-cursor button { cursor: none; }
.cursor-dot, .cursor-box {
  position: fixed;
  top: 0; left: 0;
  z-index: 500;
  pointer-events: none;
}
.cursor-dot {
  width: 8px; height: 8px;
  margin: -4px 0 0 -4px;
  background: var(--ink);
}
.cursor-box {
  width: 34px; height: 34px;
  margin: -17px 0 0 -17px;
  border: 2.5px solid var(--ink);
  opacity: 0.85;
  transition: background 0.15s;
}
main { padding-top: 70px; }
```

(The `main` rule belongs in Task 5 Step 5; keep it here if it was not added there — do not duplicate.)

- [ ] **Step 3: Mount `<Cursor />`** in `src/app/page.tsx` next to `<SectionSpy />`.

- [ ] **Step 4: Full verification pass**

1. `npm run build` → zero errors, static export in `out/`.
2. `npm run dev` and check: both themes (toggle + reload persistence); mobile 375px (no horizontal scroll, nav collapses, mascot hidden <480px); desktop 1440px; DevTools "emulate prefers-reduced-motion" (no loader animation, static mascot, no marquee movement); keyboard-only tab pass (skip link appears first, focus rings visible everywhere, bubble dismiss reachable).
3. Fix anything found before committing.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: add custom cursor and final polish pass"
```

---

## Self-Review Notes

- **Spec coverage:** loader (T5), hero/about (T6), journey/projects (T7), skills/contact/footer (T8), mascot (T9), cursor + a11y pass (T10), tokens/dark mode/SEO/JSON-LD (T1), data layer (T2), section spy/progress (T3, T5), marquee/magnetic/titles/ghost numbers (T4). Lighthouse targets from spec §9 are checked manually post-launch — not blocking.
- **Type consistency:** `Accent`, `SectionId`, `Resume` shapes defined once (T2) and imported everywhere; store API is `setActiveSection`/`useActiveSection` in all consumers.
- **Known simplifications vs spec:** checkpoints are evenly spaced (not scroll-position-proportional); "reading pose" for about/journey is the neutral pose; both are within spec intent.


