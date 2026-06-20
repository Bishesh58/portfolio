import { useRef, useState } from 'react'

import { gsap, useGSAP } from '../lib/gsap'

import SectionHeading from './SectionHeading'

import MatrixFrame from './matrix/MatrixFrame'

import MatrixSection from './matrix/MatrixSection'

import ProjectCaseModal from './ProjectCaseModal'

import { projects, type Project } from '../data/resume'

import { useTheme, type Theme } from '../lib/theme'



function slugify(text: string) {

  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

}



function cardStyles(hue: number, theme: Theme) {

  if (theme === 'light') {

    return {

      glow: `hsl(${hue} 80% 60%)`,

      glowOpacity: 0.22,

      index: `hsl(${hue} 72% 40%)`,

      accent: `hsl(${hue} 70% 45%)`,

    }

  }

  return {

    glow: `hsl(${hue} 95% 55%)`,

    glowOpacity: 0.2,

    index: `hsl(${hue} 95% 65%)`,

    accent: `hsl(${hue} 95% 55%)`,

  }

}



function ProjectCard({

  p,

  i,

  theme,

  onOpenCase,

}: {

  p: Project

  i: number

  theme: Theme

  onOpenCase: (project: Project) => void

}) {

  const s = cardStyles(p.hue, theme)

  const slug = slugify(p.title)



  return (

    <div

      className="project-card max-md:relative max-md:!top-auto sticky overflow-hidden"

      style={{ top: `calc(12vh + ${i * 1.6}rem)` }}

      data-cursor

    >

      <MatrixFrame

        variant="module"

        path={`~/work/${p.index}_${slug}.exe`}

        label={`MOD_${p.index}`}

        status="LOADED"

        className="overflow-hidden"

      >

        <div

          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-[100px]"

          style={{ background: s.glow, opacity: s.glowOpacity }}

        />

        <div className="relative grid gap-6 sm:gap-8 md:grid-cols-[1fr_1.4fr] md:gap-14">

          <div>

            <span className="font-mono text-sm" style={{ color: s.index }}>

              /{p.index}

            </span>

            <h3 className="mt-4 font-display text-2xl leading-[1.02] font-bold tracking-[0.04em] uppercase sm:text-3xl md:text-5xl">

              {p.title}

            </h3>

            <p className="mt-3 font-mono text-base text-bone-dim italic">{p.category}</p>

          </div>

          <div className="flex flex-col justify-between gap-8">

            <div>

              <p className="matrix-log-prefix mb-3">[ EXEC ] running module…</p>

              <p className="text-base leading-relaxed text-bone/80 md:text-lg">{p.description}</p>

              <p className="mt-5 border-l-2 pl-4 text-sm text-bone-dim md:text-base" style={{ borderColor: s.accent }}>

                <span className="text-ember-soft">→ </span>

                {p.impact}

              </p>

            </div>

            <ul className="flex flex-wrap gap-2">

              {p.tech.map((t) => (

                <li key={t}>

                  <span className="matrix-token">{t}</span>

                </li>

              ))}

            </ul>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.2em] uppercase">

              {(p.link || p.repo) && (

                <>

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

                      className="text-bone-dim transition-colors hover:text-ember"

                    >

                      Source ↗

                    </a>

                  )}

                </>

              )}

              <button

                type="button"

                data-cursor

                onClick={() => onOpenCase(p)}

                className="tap-target border border-ember/25 px-4 py-3 text-[10px] text-bone-dim transition-colors hover:border-ember hover:text-ember sm:py-2"

              >

                Open case file ↵

              </button>

            </div>

          </div>

        </div>

      </MatrixFrame>

    </div>

  )

}



export default function Projects() {

  const ref = useRef<HTMLElement>(null)

  const { theme } = useTheme()

  const [caseProject, setCaseProject] = useState<Project | null>(null)



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

    <MatrixSection ref={ref} id="work" program="BUILD.MODULES" index="0x02">

      <SectionHeading kicker="Selected Work — 2020 → 2026" title="Things I've Built" />

      <div className="flex flex-col gap-10">

        {projects.map((p, i) => (

          <ProjectCard key={p.index} p={p} i={i} theme={theme} onOpenCase={setCaseProject} />

        ))}

      </div>

      <ProjectCaseModal project={caseProject} theme={theme} onClose={() => setCaseProject(null)} />

    </MatrixSection>

  )

}


