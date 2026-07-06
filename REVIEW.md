# Portfolio Review — bishesh58.com

**Date:** 7 July 2026
**Scope:** Full source review (every component) + live deployment audit of https://bishesh58.com/ (headers, redirects, network/console logs, desktop/mobile/dark-mode screenshots).

## TL;DR

The site is genuinely impressive — fast (579 ms full load, 51 ms TTFB from Vercel's Sydney edge), polished, no console errors, and the neo-brutalist design system is executed with unusual consistency. But two broken things every recruiter will hit need fixing today:

1. **"Download CV" 404s** — there is no `resume.pdf` in the repo.
2. **Five skill icons render as broken-image placeholders** in the Toolkit section.

Everything else below is ranked by priority.

---

## 🔴 Critical — visitors are hitting these right now

### 1. "Download CV" is a dead link

`src/data/resume.ts:9` points to `/resume.pdf`, but `public/` only contains `robot.png` and `favicon.svg`. The live URL returns **404**.

This link appears in three places — the hero, the contact section, and the command palette — and it is the single most-clicked thing on any portfolio. The command palette version is worse than a 404: it uses the `download` attribute, so some browsers will save the 404 HTML page *as* "resume.pdf".

**Fix:** drop the actual CV into `public/resume.pdf`.

### 2. Five broken icons in the Toolkit section

Icons load at runtime from `cdn.simpleicons.org`, and four slugs no longer exist there (Simple Icons has been removing brand icons). Confirmed live as 404s:

| Slug | Shown next to |
|---|---|
| `csharp` | C# |
| `oracle` (used twice) | SuiteScript, NetSuite |
| `microsoftsqlserver` | SQL Server |
| `openai` | ChatGPT |

Broken-image placeholders are visible on the live site for all five chips.

**Fix (right):** stop depending on the CDN entirely — download the SVGs once into `public/icons/` and update `src/lib/skillIcons.ts`. This also removes ~30 third-party requests and any future breakage.
**Fix (quick):** swap slugs in `src/data/resume.ts:143-220` (e.g. `dotnet` for C#) — but there is no simpleicons replacement for Oracle/SQL Server/OpenAI, so self-hosting is really the answer.

---

## 🟠 High — SEO and link sharing

### 3. Domain configuration and metadata disagree

- The apex `bishesh58.com` **308-redirects to `www.bishesh58.com`** (www is the serving host).
- But `src/app/layout.tsx:26` sets `metadataBase` to the apex — so the `og:image` URL in the HTML points at a redirect.
- No canonical URL is set.

**Fix:** pick one canonical host (recommended: flip Vercel's primary domain to the apex, since that's what's on the CV and in metadata), make `metadataBase` match, and add `alternates: { canonical: "/" }`. Also delete the stale comment above it ("Update metadataBase when the real domain is live" — it is live).

### 4. No robots.txt or sitemap.xml

Both return 404. In Next 15 this is two tiny files — `src/app/robots.ts` and `src/app/sitemap.ts` (~10 lines total).

### 5. OG image will look bad when the link is shared

`robot.png` is **992×1068 portrait, 1.3 MB**. LinkedIn/Twitter/iMessage cards want ~1200×630 landscape, so previews will crop the robot awkwardly, and some crawlers time out on heavy images.

**Fix:** make a dedicated `og.png` — name + "Full Stack Developer, Auckland" + the robot on the yellow/blue palette — under 300 KB. High ROI when sharing the link on LinkedIn while job hunting.

---

## 🟡 Performance

### 6. The hero image is a 1.3 MB PNG — the largest performance problem by far

`src/components/sections/RobotIllustration.tsx:142` embeds `/robot.png` inside the SVG, making it the LCP asset, and `images.unoptimized: true` in `next.config.ts` means nothing optimizes it.

**Fix:** `sharp` is already in devDependencies — a one-off script converting it to WebP at ~1000px would land around 80–150 KB (a ~90% cut). On mobile data this PNG is most of the page weight.

### What's already good

- Fonts self-hosted and preloaded via `next/font` (Anton, Archivo, Space Mono).
- Page is statically prerendered; total load measured at 579 ms.
- No console errors, no failed requests other than the four icon 404s.

---

## 🟡 Security & polish

### 7. No security headers

The response carries only HSTS (Vercel's default). Add via a `headers()` block in `next.config.ts`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera/mic/geolocation off)

Low effort, and security-header scanners are sometimes run by technical hiring managers.

### 8. Phone number is published in plain text

`src/components/sections/Contact.tsx:98` renders the phone number where scrapers harvest it. Consider keeping the phone only in the PDF CV (behind a deliberate click) — email and LinkedIn are enough on the page. Owner's call; flagged as a spam magnet.

### 9. Favicon is SVG-only

Add a PNG/ICO fallback and an `apple-touch-icon` (180×180) — iOS bookmarks and some crawlers don't take SVG.

### 10. No custom 404 page

Anyone hitting a bad URL gets Next's default black-and-white 404, jarring against the design. A small `not-found.tsx` in the neo-brutalist style (robot holding a wrench?) would be on-brand.

---

## 🔵 Minor code notes

Code quality is above what's typical for portfolios — typed data model, real reduced-motion handling everywhere, `inert` on the closed mobile menu, focus restoration in both dialogs. Small items:

- **Loader flashes for returning visitors** — `src/components/Loader.tsx` starts `visible=true` and only hides after hydration, so repeat visitors see the loader flash. Its `load` event listener and nested timeout also aren't cleaned up (harmless, but untidy).
- **Command palette a11y** — focus stays in the input while options are `role="option"`; add `aria-activedescendant` on the input so screen readers track the highlighted command.
- **Single-key shortcuts** (`X`, `?`, `g`, the `hire` buffer) can misfire for speech-input users (WCAG 2.1.4). Text fields are already guarded, which is most of the way there; a "disable shortcuts" toggle in the palette would fully cover it.
- **Mascot overlap** — on desktop the floating robot sits on top of the hero figure's "Status: shipping" caption, and in the contact section its speech bubble can cover the "Download CV" tile. A slightly smaller offset, or hiding the bubble over the contact grid, would clean this up.
- **Tooling gaps** — no `lint` or `start` script in `package.json` and no ESLint config; worth adding `eslint-config-next` since this repo is a work sample. No analytics either — Vercel Analytics is a one-liner and tells you whether recruiters actually visit.

---

## Content (quick take)

The copy is strong — "I build the tools teams run on" is a better positioning line than 90% of portfolios, and the Build Log framing handles the "it's all internal tools, no demos" problem gracefully. Two suggestions:

1. Several project impact lines are vague where numbers would bite ("boosted team efficiency" → "cut proposal turnaround from X to Y", even if approximate).
2. The site mentions building "fully custom public websites" for the Islington brands — link them; they're the only publicly verifiable work.

---

## Suggested order of attack

| # | Task | Effort | Impact |
|---|---|---|---|
| 1 | Add `public/resume.pdf` | 5 min | Highest — unbreaks the most-clicked link |
| 2 | Self-host skill icons | ~30 min | Fixes 5 broken images + removes CDN dependency |
| 3 | Domain/metadata alignment + robots + sitemap + OG image | ~30 min | SEO + social sharing |
| 4 | Compress robot.png → WebP | ~15 min | ~90% cut to largest asset (LCP) |
| 5 | Security headers, favicon fallbacks, custom 404, mascot overlap, misc | ~1 hr | Polish |

**Logistical note:** this folder (`~/Downloads/portfolio-main`) is not a git repository — it looks like a downloaded ZIP of the repo. Implement fixes in the actual clone, or make them here and copy over.
