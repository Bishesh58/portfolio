# BISHESH/OS — Phase 1: The Shell — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a working desktop-OS shell — boot → desktop → menu bar + dock + draggable/focusable windows holding placeholder apps — with a custom window store, optimized canvas wallpaper, an error boundary, the evolved identity tokens/fonts, and passing store/logic tests.

**Architecture:** A lightweight custom store (`useSyncExternalStore`) holds window state (open set, z-order, geometry, min/max). `WindowManager` renders open windows by z-order; `Window` handles drag/focus/controls and non-modal `role="dialog"` semantics; `MenuBar`, `Dock`, `Desktop` form the chrome; `Boot` gates first paint; `Launcher` (Ctrl/⌘K, modal) is the command surface. Apps are lazy-loaded content components registered in `apps/registry.ts`, unaware of window mechanics.

**Tech Stack:** React 19, Vite 8, Tailwind v4, GSAP, Vitest + @testing-library (new), @fontsource-variable/inter + @fontsource-variable/jetbrains-mono (new, self-hosted). Remove: lenis, three, @react-three/fiber, @types/three.

## Global Constraints

- React 19 function components; effects must clean up all listeners/rAF/timers.
- Strict TypeScript — no `any`, no `@ts-ignore`.
- `prefers-reduced-motion`: every animation has a reduced path (snap to end / static).
- WCAG AA contrast in both themes; visible `:focus-visible` rings; smallest functional text ≥ 11px.
- No new runtime state-management dependency (custom store only).
- Keyboard-operable: dock, menu, windows, launcher; launcher = Ctrl/⌘K (no bare-key global shortcuts).
- Commit after each task with a `feat:`/`test:`/`chore:` message.

---

### Task 1: Project cleanup + dependencies + Vitest

**Files:**
- Modify: `package.json` (remove lenis/three/@react-three/fiber/@types/three; add @fontsource-variable/inter, @fontsource-variable/jetbrains-mono; add -D vitest, @testing-library/react, @testing-library/dom, jsdom, @vitejs/plugin-react already present; add `"test": "vitest run"`, `"test:watch": "vitest"`)
- Modify: `vite.config.ts` (remove dead `three` manualChunk; add vitest `test` config with jsdom env + setup file)
- Create: `src/test/setup.ts` (`import '@testing-library/jest-dom'` optional; jsdom matchMedia + ResizeObserver polyfills)
- Delete: `src/components/Preloader.tsx`, `src/assets/hero.png`, `src/assets/vite.svg`
- Modify: `src/lib/gsap.ts` (drop `ScrambleTextPlugin` registration — unused)

**Interfaces:**
- Produces: working `npm run test`, `npm run dev`, `npm run build`; fonts importable.

- [ ] **Step 1: Remove dead deps + add new ones**

```bash
npm uninstall lenis three @react-three/fiber @types/three
npm i @fontsource-variable/inter @fontsource-variable/jetbrains-mono
npm i -D vitest jsdom @testing-library/react @testing-library/dom
```

- [ ] **Step 2: Delete dead files**

```bash
git rm src/components/Preloader.tsx src/assets/hero.png src/assets/vite.svg
```

- [ ] **Step 3: Add Vitest config to `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: { output: { manualChunks(id) { if (id.includes('gsap')) return 'gsap' } } },
  },
  test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'], globals: true },
})
```

- [ ] **Step 4: Create `src/test/setup.ts`**

```ts
import { vi } from 'vitest'

if (!window.matchMedia) {
  window.matchMedia = (q: string) =>
    ({ matches: false, media: q, onchange: null, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false }) as MediaQueryList
}
class RO { observe() {} unobserve() {} disconnect() {} }
;(globalThis as unknown as { ResizeObserver: typeof RO }).ResizeObserver = RO
const store: Record<string, string> = {}
vi.stubGlobal('localStorage', { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => { store[k] = v }, removeItem: (k: string) => { delete store[k] }, clear: () => { for (const k in store) delete store[k] } })
```

- [ ] **Step 5: Drop ScrambleText from `src/lib/gsap.ts`** — remove the import and remove `ScrambleTextPlugin` from `registerPlugin(...)`.

- [ ] **Step 6: Verify build + empty test run**

Run: `npm run build` → Expected: success, no `three` chunk.
Run: `npx vitest run` → Expected: "No test files found" (exit 0) or passes.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: remove dead deps/files, add fonts + vitest"
```

---

### Task 2: Window store (TDD core)

**Files:**
- Create: `src/os/types.ts`, `src/os/store.ts`
- Test: `src/os/store.test.ts`

**Interfaces:**
- Produces:
  - `type AppId = 'terminal'|'projects'|'about'|'skills'|'contact'`
  - `interface WinState { id: AppId; x:number; y:number; w:number; h:number; minimized:boolean; maximized:boolean; prev?: {x,y,w,h} }`
  - `interface OSState { windows: Partial<Record<AppId, WinState>>; order: AppId[]; focused: AppId|null }`
  - store API: `openWindow(id, geom?)`, `closeWindow(id)`, `focusWindow(id)`, `minimizeWindow(id)`, `toggleMaximize(id)`, `moveWindow(id,x,y)`, `resizeWindow(id,w,h)`, `resetLayout()`, `getState()`, `subscribe(fn)`
  - hook: `useOS<T>(selector:(s:OSState)=>T): T` (via `useSyncExternalStore`)
  - `isTopMost(s, id): boolean`

- [ ] **Step 1: Write failing tests** (`src/os/store.test.ts`)

```ts
import { beforeEach, expect, test } from 'vitest'
import { createOSStore } from './store'

let s: ReturnType<typeof createOSStore>
beforeEach(() => { s = createOSStore() })

test('opens a window, focuses it, puts it top of order', () => {
  s.openWindow('projects')
  expect(s.getState().windows.projects).toBeTruthy()
  expect(s.getState().focused).toBe('projects')
  expect(s.getState().order.at(-1)).toBe('projects')
})

test('focus reorders z-stack to top', () => {
  s.openWindow('projects'); s.openWindow('terminal')
  expect(s.getState().order.at(-1)).toBe('terminal')
  s.focusWindow('projects')
  expect(s.getState().order.at(-1)).toBe('projects')
  expect(s.getState().focused).toBe('projects')
})

test('opening an already-open window focuses + unminimizes it (no duplicate)', () => {
  s.openWindow('about'); s.minimizeWindow('about'); s.openWindow('about')
  expect(s.getState().windows.about!.minimized).toBe(false)
  expect(s.getState().order.filter((x) => x === 'about')).toHaveLength(1)
})

test('close removes from windows and order and clears focus to next', () => {
  s.openWindow('projects'); s.openWindow('terminal')
  s.closeWindow('terminal')
  expect(s.getState().windows.terminal).toBeUndefined()
  expect(s.getState().order).toEqual(['projects'])
  expect(s.getState().focused).toBe('projects')
})

test('toggleMaximize stores and restores previous geometry', () => {
  s.openWindow('projects', { x: 10, y: 20, w: 300, h: 200 })
  s.toggleMaximize('projects')
  expect(s.getState().windows.projects!.maximized).toBe(true)
  s.toggleMaximize('projects')
  const w = s.getState().windows.projects!
  expect(w.maximized).toBe(false)
  expect({ x: w.x, y: w.y, w: w.w, h: w.h }).toEqual({ x: 10, y: 20, w: 300, h: 200 })
})

test('move and resize mutate geometry; subscribe fires', () => {
  let calls = 0; s.subscribe(() => { calls++ })
  s.openWindow('projects'); s.moveWindow('projects', 50, 60); s.resizeWindow('projects', 400, 300)
  const w = s.getState().windows.projects!
  expect([w.x, w.y, w.w, w.h]).toEqual([50, 60, 400, 300])
  expect(calls).toBeGreaterThanOrEqual(3)
})
```

- [ ] **Step 2: Run → fail**

Run: `npx vitest run src/os/store.test.ts` → Expected: FAIL (`createOSStore` not found).

- [ ] **Step 3: Implement `src/os/types.ts`**

```ts
export type AppId = 'terminal' | 'projects' | 'about' | 'skills' | 'contact'
export interface Geom { x: number; y: number; w: number; h: number }
export interface WinState extends Geom { id: AppId; minimized: boolean; maximized: boolean; prev?: Geom }
export interface OSState { windows: Partial<Record<AppId, WinState>>; order: AppId[]; focused: AppId | null }
```

- [ ] **Step 4: Implement `src/os/store.ts`**

```ts
import { useSyncExternalStore } from 'react'
import type { AppId, Geom, OSState, WinState } from './types'

const DEFAULT_GEOM: Geom = { x: 80, y: 80, w: 720, h: 480 }
const LS_KEY = 'bishesh-os-layout-v1'

export function createOSStore(initial?: Partial<OSState>) {
  let state: OSState = { windows: {}, order: [], focused: null, ...initial }
  const listeners = new Set<() => void>()
  const emit = () => listeners.forEach((l) => l())
  const set = (next: OSState) => { state = next; persist(); emit() }

  const persist = () => {
    try {
      const geom: Record<string, Geom> = {}
      for (const id of Object.keys(state.windows) as AppId[]) {
        const w = state.windows[id]!; geom[id] = { x: w.x, y: w.y, w: w.w, h: w.h }
      }
      localStorage.setItem(LS_KEY, JSON.stringify(geom))
    } catch { /* ignore */ }
  }
  const savedGeom = (id: AppId): Geom | undefined => {
    try { return (JSON.parse(localStorage.getItem(LS_KEY) || '{}') as Record<string, Geom>)[id] } catch { return undefined }
  }

  const toTop = (order: AppId[], id: AppId) => [...order.filter((x) => x !== id), id]

  return {
    getState: () => state,
    subscribe(fn: () => void) { listeners.add(fn); return () => { listeners.delete(fn) } },
    openWindow(id: AppId, geom?: Partial<Geom>) {
      const existing = state.windows[id]
      const base = existing ?? { id, ...DEFAULT_GEOM, ...savedGeom(id), ...geom, minimized: false, maximized: false }
      const win: WinState = { ...base, minimized: false }
      set({ windows: { ...state.windows, [id]: win }, order: toTop(state.order, id), focused: id })
    },
    closeWindow(id: AppId) {
      const windows = { ...state.windows }; delete windows[id]
      const order = state.order.filter((x) => x !== id)
      set({ windows, order, focused: order.at(-1) ?? null })
    },
    focusWindow(id: AppId) {
      if (!state.windows[id]) return
      set({ ...state, order: toTop(state.order, id), focused: id })
    },
    minimizeWindow(id: AppId) {
      const w = state.windows[id]; if (!w) return
      const order = state.order.filter((x) => x !== id)
      set({ windows: { ...state.windows, [id]: { ...w, minimized: true } }, order, focused: order.at(-1) ?? null })
    },
    toggleMaximize(id: AppId) {
      const w = state.windows[id]; if (!w) return
      const next: WinState = w.maximized
        ? { ...w, maximized: false, ...(w.prev ?? {}), prev: undefined }
        : { ...w, maximized: true, prev: { x: w.x, y: w.y, w: w.w, h: w.h } }
      set({ ...state, windows: { ...state.windows, [id]: next }, order: toTop(state.order, id), focused: id })
    },
    moveWindow(id: AppId, x: number, y: number) {
      const w = state.windows[id]; if (!w) return
      set({ ...state, windows: { ...state.windows, [id]: { ...w, x, y } } })
    },
    resizeWindow(id: AppId, width: number, height: number) {
      const w = state.windows[id]; if (!w) return
      set({ ...state, windows: { ...state.windows, [id]: { ...w, w: width, h: height } } })
    },
    resetLayout() { try { localStorage.removeItem(LS_KEY) } catch { /* ignore */ }; set({ windows: {}, order: [], focused: null }) },
  }
}

export type OSStore = ReturnType<typeof createOSStore>
export const osStore = createOSStore()
export const isTopMost = (s: OSState, id: AppId) => s.order.at(-1) === id
export function useOS<T>(selector: (s: OSState) => T): T {
  return useSyncExternalStore(osStore.subscribe, () => selector(osStore.getState()), () => selector(osStore.getState()))
}
```

- [ ] **Step 5: Run → pass**

Run: `npx vitest run src/os/store.test.ts` → Expected: PASS (6 tests).

- [ ] **Step 6: Commit**

```bash
git add src/os && git commit -m "feat: window store with z-order, min/max, persistence (TDD)"
```

---

### Task 3: Identity tokens + fonts (`index.css`)

**Files:**
- Modify: `src/index.css` (rewrite `@theme` + token layer: neutral surface scale, AA-correct accents, per-project accent vars; import fonts; set Inter as UI font, JetBrains Mono as mono; keep reduced-motion + focus blocks)
- Modify: `src/main.tsx` (import the two fontsource variable CSS files)

**Interfaces:**
- Produces CSS vars: `--os-bg, --surface-1, --surface-2, --surface-3, --border-soft, --border, --ember, --ember-dim, --bone, --bone-dim`, `--font-sans, --font-mono, --font-display`, project accents `--accent-1..6`.

- [ ] **Step 1: Add font imports to `src/main.tsx`** (top):

```ts
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
```

- [ ] **Step 2: Rewrite the token layer in `src/index.css`** `@theme` block (dark default) — surfaces as layered near-blacks, ember reserved for accent, AA text:

```css
@theme {
  --color-os-bg: #04060a;
  --color-surface-1: #0a0f0c;
  --color-surface-2: #0d140f;
  --color-surface-3: #111a13;
  --color-ember: #00ff66;
  --color-ember-dim: #19b257;
  --color-bone: #d6ffe0;
  --color-bone-dim: #74a585;
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono Variable', ui-monospace, monospace;
  --font-display: 'JetBrains Mono Variable', ui-monospace, monospace;
}
:root {
  --border-soft: rgba(0,255,102,0.10);
  --border: rgba(0,255,102,0.22);
  --accent-1:#00ff66; --accent-2:#37e0c8; --accent-3:#ffb347; --accent-4:#5aa9ff; --accent-5:#b98cff; --accent-6:#ff7a8a;
}
html.light {
  --color-os-bg:#eef4ee; --color-surface-1:#ffffff; --color-surface-2:#f3f8f3; --color-surface-3:#e8f0e9;
  --color-ember:#0a7d2c; --color-ember-dim:#0a7d2c; --color-bone:#0a1a0f; --color-bone-dim:#37613f;
  --border-soft: rgba(10,125,44,0.14); --border: rgba(10,125,44,0.28);
}
```
(Keep the existing `:focus-visible`, reduced-motion, and `::selection` blocks. Remove scroll-page-only classes incrementally as their components are deleted.)

- [ ] **Step 3: Verify dev renders with new fonts/colors** — Run `npm run dev`, load page (will still show old App until Task 8). Expected: no console errors; fonts load.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/main.tsx && git commit -m "feat: evolved OS identity tokens + self-hosted fonts"
```

---

### Task 4: App registry + icons + skeleton apps

**Files:**
- Create: `src/os/apps.tsx` (registry: id, title, path, status, lazy component, defaultGeom, accent, icon)
- Create: `src/os/Icon.tsx` (small inline-SVG icon set: terminal, folder, user, activity, mail, github, cv, search, close, minus, square)
- Create: `src/apps/Terminal.tsx` (placeholder re-export wrapper for now), `src/apps/Projects.tsx`, `src/apps/About.tsx`, `src/apps/Skills.tsx`, `src/apps/Contact.tsx` — each a simple placeholder returning its title + a line of copy (real content in Phase 2).

**Interfaces:**
- Produces: `export const APPS: AppMeta[]`; `interface AppMeta { id:AppId; title:string; path:string; status:string; accent:string; Icon:FC; Component: LazyExoticComponent<FC> }`

- [ ] **Step 1: Create `src/os/Icon.tsx`** with a `name` prop switching over inline `<svg>` paths (stroke=currentColor, 1.6, sized by `size` prop default 20). Include: `terminal, folder, user, activity, mail, brand-github, file-text, search, x, minus, square, sun, moon`.

- [ ] **Step 2: Create the five placeholder apps** (example `src/apps/About.tsx`):

```tsx
export default function About() {
  return <div className="p-6 font-mono text-sm text-bone-dim">about — coming in phase 2</div>
}
```

- [ ] **Step 3: Create `src/os/apps.tsx`**

```tsx
import { lazy } from 'react'
import type { AppId } from './types'
import Icon from './Icon'
export interface AppMeta { id: AppId; title: string; path: string; status: string; accent: string; icon: string; Component: ReturnType<typeof lazy> }
export const APPS: AppMeta[] = [
  { id: 'projects', title: 'Projects', path: '~/projects', status: 'LOADED', accent: 'var(--accent-1)', icon: 'folder', Component: lazy(() => import('../apps/Projects')) },
  { id: 'terminal', title: 'Terminal', path: 'bishesh@os: ~', status: 'READY', accent: 'var(--accent-2)', icon: 'terminal', Component: lazy(() => import('../apps/Terminal')) },
  { id: 'about', title: 'About', path: '~/readme.md', status: 'OPEN', accent: 'var(--accent-4)', icon: 'user', Component: lazy(() => import('../apps/About')) },
  { id: 'skills', title: 'Skills', path: '~/system/monitor', status: 'LIVE', accent: 'var(--accent-3)', icon: 'activity', Component: lazy(() => import('../apps/Skills')) },
  { id: 'contact', title: 'Contact', path: '~/comms/uplink', status: 'LISTENING', accent: 'var(--accent-6)', icon: 'mail', Component: lazy(() => import('../apps/Contact')) },
]
export const appById = (id: AppId) => APPS.find((a) => a.id === id)!
export { Icon }
```

- [ ] **Step 4: Commit**

```bash
git add src/os src/apps && git commit -m "feat: app registry, icon set, skeleton apps"
```

---

### Task 5: Window component (drag/focus/controls, a11y)

**Files:**
- Create: `src/os/Window.tsx`
- Modify: `src/index.css` (window/titlebar classes)

**Interfaces:**
- Consumes: `osStore`, `useOS`, `appById`, `WinState`.
- Produces: `<Window meta={AppMeta} win={WinState} z={number} />` — desktop, non-modal `role="dialog"` `aria-label={title}`; titlebar drags (pointer events, clamps to viewport); buttons minimize/maximize/close; pointerdown focuses; `Esc` closes when focused; on mount moves focus to the window; on close returns focus to the dock button (`#dock-<id>`).

- [ ] **Step 1: Implement `Window.tsx`** — drag via `onPointerDown` on titlebar → `setPointerCapture`, track delta, `osStore.moveWindow`; maximize sets full-area geometry via CSS (use `maximized` to switch to inset-0 style); body renders `<Suspense fallback>{<meta.Component/>}</Suspense>`; window root `style={{ left,top,width,height, zIndex:z }}`; reduced-motion disables open scale animation.

- [ ] **Step 2: Add window CSS** (`.os-window`, `.os-titlebar`, traffic-dot buttons reusing matrix-dot styles, `.os-window--max`).

- [ ] **Step 3: Manual verify deferred to Task 8** (Window has no standalone route). Add a focused render smoke test:

`src/os/Window.test.tsx` — render a Window with a stub meta + win, assert the title text and that the close button has an accessible name. Run `npx vitest run src/os/Window.test.tsx` → PASS.

- [ ] **Step 4: Commit**

```bash
git add src/os/Window.tsx src/os/Window.test.tsx src/index.css && git commit -m "feat: draggable focusable Window with a11y dialog semantics"
```

---

### Task 6: WindowManager + MenuBar + Dock

**Files:**
- Create: `src/os/WindowManager.tsx`, `src/os/MenuBar.tsx`, `src/os/Dock.tsx`
- Modify: `src/index.css` (menubar/dock classes, dock magnification)

**Interfaces:**
- `WindowManager`: subscribes `useOS(s=>s.order)`, renders a `<Window>` per non-minimized window with `z = order.indexOf(id)`.
- `MenuBar`: wordmark `BISHESH/OS`, live AKL clock (`Pacific/Auckland`), `Résumé ↓` (`<a href="/Bishesh-Sunam-CV.pdf" download>`), theme toggle (reuse `useTheme`), launcher trigger button (opens Launcher — Task 7).
- `Dock`: maps `APPS` → button `id="dock-<id>"`; click → `openWindow`/`focusWindow`/un-minimize; magnification via pointer x distance scaling (reduced-motion: no scale); open/min indicator dot.

- [ ] **Step 1: Implement the three components** per interfaces. Clock uses `setInterval` cleaned up on unmount. Dock magnification computes scale from pointer distance, capped; gated by reduced-motion.

- [ ] **Step 2: Commit**

```bash
git add src/os && git commit -m "feat: window manager, menu bar, magnifying dock"
```

---

### Task 7: Launcher (Ctrl/⌘K, modal) + Boot + Desktop + optimized wallpaper

**Files:**
- Create: `src/os/Launcher.tsx` (adapt `CommandPalette.tsx` → opens apps + theme + contact; modal: focus trap + return), `src/os/Boot.tsx`, `src/os/Desktop.tsx`
- Modify: `src/components/FluxField.tsx` (delta-time; precompute draw order once; theme via ref so no rebuild on toggle; pause when tab hidden or a window is maximized; lower counts + dim for wallpaper)
- Delete: `src/components/CommandPalette.tsx` (superseded by Launcher), `src/components/Nav.tsx`, `src/components/Marquee.tsx`, `src/components/matrix/MatrixScrollProgress.tsx`, `src/components/matrix/MatrixSection.tsx`, `src/components/SectionHeading.tsx` (scroll-page constructs not used by the OS)

**Interfaces:**
- `Launcher`: `Ctrl/⌘K` toggles; modal `role="dialog" aria-modal`; focus trap; Esc closes; lists apps + "Toggle theme" + "Download CV"; arrow/enter or click.
- `Boot`: `onDone()`; sessionStorage `bishesh-os-booted`; reduced-motion → instant.
- `Desktop`: renders `<FluxField/>` wallpaper, `<MenuBar/>`, `<WindowManager/>`, `<Dock/>`, `<Launcher/>`; on first mount after boot, `osStore.openWindow('projects')` then `openWindow('terminal')` (pre-arranged).

- [ ] **Step 1: Optimize `FluxField.tsx`** — change `loop` to accept `requestAnimationFrame` timestamp; compute `dt = clamp((t-last)/16.67, 0, 2)`; multiply `time`, velocity integration, `col.y += col.speed*dt`; precompute `drawOrder` after `spawn()` (sort once) and reuse; read palette via a `themeRef` updated by a separate small effect (deps `[theme]`), main setup effect deps `[]`; pause draw when `document.hidden`; add `dim` opacity prop for wallpaper use; reduce desktop count (e.g. 110).

- [ ] **Step 2: Implement Launcher, Boot, Desktop.** Launcher reuses palette CSS. Boot reuses `HeroBootSequence` line style.

- [ ] **Step 3: Delete superseded scroll-page components** (listed above).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: launcher, boot, desktop; optimize FluxField as wallpaper"
```

---

### Task 8: App shell wiring + ErrorBoundary + noscript + boot integration

**Files:**
- Rewrite: `src/App.tsx` (Boot gate → Desktop; remove old section imports; keep Cursor)
- Create: `src/components/ErrorBoundary.tsx` (class; fallback static card: name/role/email/CV link)
- Modify: `src/main.tsx` (wrap `<App/>` in `<ErrorBoundary>`)
- Modify: `index.html` (add `<noscript>` fallback with name/role/email/CV; fix og.png reference handled in Phase 3)

**Interfaces:**
- `App`: `const [booted,setBooted]=useState(sessionStorage check)`; renders `<Boot onDone>` then `<Desktop/>`; `<Cursor/>` retained.
- `ErrorBoundary`: `getDerivedStateFromError` + `componentDidCatch`; renders fallback with `profile` data.

- [ ] **Step 1: Implement ErrorBoundary** with a clean static fallback (name, role, email mailto, CV link) styled with tokens.

- [ ] **Step 2: Rewrite App.tsx** to the boot→desktop flow; remove Lenis effect and all section imports; keep the keydown handler only for launcher (now inside Launcher).

- [ ] **Step 3: Add `<noscript>`** to `index.html` body: a styled block with name, "Full Stack Developer — Auckland", email mailto, and CV link.

- [ ] **Step 4: Manual verify in browser** — Run `npm run dev`; expect boot → desktop with Projects + Terminal windows open, dock works, drag/focus/min/max/close work, Ctrl/K launcher opens, theme toggles, no console errors. Capture a screenshot (desktop + mobile viewport — mobile will be rough; Phase 3 fixes it).

- [ ] **Step 5: Run full test + build**

Run: `npm run test` → PASS. Run: `npm run build` → success.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: boot→desktop shell wiring, ErrorBoundary, noscript fallback"
```

---

## Self-Review

- **Spec coverage (Phase 1 scope):** shell architecture §5 → Tasks 2,5,6,7,8; identity/fonts §4 → Task 3; boot/fast-path §6 → Tasks 7,8 (CV in MenuBar, pre-arranged windows); error states §12 → Task 8; perf wallpaper §11 → Task 7; dead-code/deps §5,§13 → Tasks 1,7. Apps content §7, mobile §8, full proof/SEO §9/§12, README/tests-of-content → **deferred to Phase 2/3 plans** (intentional).
- **Placeholder scan:** apps are intentionally placeholder in Phase 1 (real content = Phase 2); no TODO/“handle errors” hand-waving in steps.
- **Type consistency:** `AppId`, `WinState`, `Geom`, store method names (`openWindow/closeWindow/focusWindow/minimizeWindow/toggleMaximize/moveWindow/resizeWindow/resetLayout`), `AppMeta`, `appById`, `useOS`, `isTopMost` used consistently across Tasks 2,4,5,6,7,8.

## Phase 2 (apps & content) and Phase 3 (mobile + fundamentals) get their own plans after Phase 1 lands.
