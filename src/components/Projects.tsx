import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import SectionHeading from './SectionHeading'
import { projects, type Project } from '../data/resume'

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <div
      className="project-card sticky overflow-hidden rounded-3xl border border-bone/10"
      style={{ top: `calc(12vh + ${i * 1.6}rem)`, background: `linear-gradient(135deg, #0c0c10 0%, hsl(${p.hue} 60% 7%) 100%)` }}
      data-cursor
    >
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-25 blur-[100px]"
        style={{ background: `hsl(${p.hue} 95% 55%)` }}
      />
      <div className="relative grid gap-8 p-8 md:grid-cols-[1fr_1.4fr] md:gap-14 md:p-14">
        <div>
          <span className="font-mono text-sm" style={{ color: `hsl(${p.hue} 95% 65%)` }}>
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
            <p className="mt-5 border-l-2 pl-4 text-sm text-bone-dim md:text-base" style={{ borderColor: `hsl(${p.hue} 95% 55%)` }}>
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
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)

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
            <ProjectCard key={p.index} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
