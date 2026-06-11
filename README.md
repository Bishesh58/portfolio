# Bishesh Sunam — Portfolio

A cinematic, award-style portfolio for Bishesh Sunam, Full Stack Developer.

## Stack

- **React 19 + TypeScript** on **Vite 8**
- **Tailwind CSS v4** — design tokens via `@theme`
- **GSAP 3.15** — ScrollTrigger, SplitText, ScrambleText
- **Lenis** — buttery smooth scrolling
- **Three.js + React Three Fiber** — custom GLSL shader particle hero (26k particles, mouse-reactive)

## Features

- Multilingual preloader with progress counter
- WebGL particle field hero with noise-driven motion and mouse repulsion
- Custom cursor (dot + trailing ring, magnetic hover states)
- Scroll-scrubbed manifesto text reveal + animated stat counters
- Sticky stacking project card deck, each with its own hue
- Scroll-drawn experience timeline
- Film-grain overlay, marquee, magnetic CTA button
- Full SEO: meta/OG/Twitter tags, JSON-LD Person schema, sitemap, robots.txt
- `prefers-reduced-motion` respected

## Commands

```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  data/resume.ts        # all content — edit this to update the site
  lib/gsap.ts           # GSAP plugin registration
  components/
    three/ParticleField.tsx   # GLSL shader hero
    Preloader, Cursor, Nav, Hero, Marquee, About,
    Projects, ExperienceSection, Skills, Education, Contact
```

Update `src/data/resume.ts` to change any content — no component edits needed.
