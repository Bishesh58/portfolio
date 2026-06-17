import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import { projects, type Project } from '../data/resume'
import { useTheme, type Theme } from '../lib/theme'

function cardStyles(hue: number, theme: Theme) {
  if (theme === 'light') {
    return {
      background: `linear-gradient(135deg, #ffffff 0%, hsl(${hue} 64% 95%) 100%)`,
      glow: `hsl(${hue} 80% 60%)`,
      glowOpacity: 0.22,
      index: `hsl(${hue} 72% 40%)`,
      accent: `hsl(${hue} 70% 45%)`,
    }
  }
  return {
    background: `linear-gradient(135deg, #0c0c10 0%, hsl(${hue} 60% 7%) 100%)`,
    glow: `hsl(${hue} 95% 55%)`,
    glowOpacity: 0.25,
    index: `hsl(${hue} 95% 65%)`,
    accent: `hsl(${hue} 95% 55%)`,
  }
}

function ProjectCard({ p, i, theme }: { p: Project; i: number; theme: Theme }) {
  const s = cardStyles(p.hue, theme)
  return (
    <div
      className="project-card sticky overflow-hidden rounded-3xl border border-bone/10"
      style={{ top: `calc(12vh + ${i * 1.6}rem)`, background: s.background }}
      data-cursor
    >
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-[100px]"
        style={{ background: s.glow, opacity: s.glowOpacity }}
      />
      <div className="relative grid gap-8 p-8 md:grid-cols-[1fr_1.4fr] md:gap-14 md:p-14">
        <div>
          <span className="font-mono text-sm" style={{ color: s.index }}>
            /{p.index}
          </span>
          <h3 className="mt-4 font-display text-3xl leading-[1.02] font-bold tracking-tight uppercase md:text-5xl">
            {p.title}
          </h3>
          <p className="mt-3 font-serif text-lg text-bone-dim italic">{p.category}</p>
        </div>
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="text-base leading-relaxed text-bone/80 md:text-lg">{p.description}</p>
            <p className="mt-5 border-l-2 pl-4 text-sm text-bone-dim md:text-base" style={{ borderColor: s.accent }}>
              {p.impact}
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-bone/15 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-bone-dim uppercase"
              >
                {t}
              </li>
            ))}
          </ul>

          {(p.link || p.repo) && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.2em] uppercase">
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="transition-colors hover:opacity-70"
                  style={{ color: s.accent }}
                >
                  View live ↗
                </a>
              )}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="text-bone-dim transition-colors hover:text-bone"
                >
                  Source ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const { theme } = useTheme()

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%' },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="work" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Selected Work — 2020 → 2026" title="Things I've Built" />
        <div className="flex flex-col gap-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.index} p={p} i={i} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  )
}
