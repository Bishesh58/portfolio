import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { profile, projects, experience, skills } from '../data/resume'
import { prefersReducedMotion } from '../lib/matrixTypewriter'
import { scrollToSection } from '../lib/scroll'

type Tone = 'cmd' | 'text' | 'dim' | 'ember' | 'accent' | 'link'
interface Line {
  text: string
  tone?: Tone
  href?: string
}
interface CommandResult {
  lines: Line[]
  clear?: boolean
  scrollTo?: string
}

const sectionMap: Record<string, string> = {
  about: '#about',
  projects: '#work',
  work: '#work',
  experience: '#experience',
  skills: '#skills',
  education: '#education',
  ai: '#ai',
  contact: '#contact',
}

const HELP: Line[] = [
  { text: 'Available commands', tone: 'dim' },
  { text: '  about         who I am' },
  { text: '  projects      what I’ve built' },
  { text: '  experience    where I’ve worked' },
  { text: '  skills        my toolkit' },
  { text: '  contact       get in touch' },
  { text: '  ls            list sections' },
  { text: '  open <name>   jump to a section' },
  { text: '  clear         clear the screen' },
]

function runCommand(raw: string): CommandResult {
  const input = raw.trim()
  if (!input) return { lines: [] }
  const [cmd, ...args] = input.split(/\s+/)
  const arg = (args[0] || '').toLowerCase()

  switch (cmd.toLowerCase()) {
    case 'help':
    case '--help':
    case '-h':
    case '?':
      return { lines: HELP }

    case 'ls':
    case 'dir':
      return { lines: [{ text: 'about/  projects/  experience/  skills/  education/  ai/  contact/', tone: 'ember' }] }

    case 'whoami':
      return { lines: [{ text: `${profile.name} · ${profile.role}` }] }

    case 'about':
      return {
        lines: [
          { text: profile.summary, tone: 'text' },
          { text: '' },
          { text: `↳ ${profile.location} · ${profile.yearsExperience} yrs experience`, tone: 'dim' },
        ],
      }

    case 'projects':
      return {
        lines: [
          { text: 'Selected work', tone: 'dim' },
          ...projects.map((p) => ({ text: `  ${p.index}  ${p.title}  ·  ${p.category}` })),
          { text: "↳ run 'open projects' to view", tone: 'dim' },
        ],
      }

    case 'experience':
      return { lines: experience.map((x) => ({ text: `  ${x.period}  ${x.role} @ ${x.company}` })) }

    case 'skills':
    case 'stack':
      return { lines: Object.entries(skills).map(([group, items]) => ({ text: `  ${group}: ${items.join(', ')}` })) }

    case 'contact':
    case 'socials':
      return {
        lines: [
          { text: `  email     ${profile.email}`, tone: 'link', href: `mailto:${profile.email}` },
          { text: `  github    ${profile.github}`, tone: 'link', href: profile.github },
          { text: `  linkedin  ${profile.linkedin}`, tone: 'link', href: profile.linkedin },
          { text: `  phone     ${profile.phone}`, tone: 'link', href: `tel:${profile.phone.replace(/-/g, '')}` },
        ],
      }

    case 'open':
    case 'cd':
    case 'goto': {
      const target = sectionMap[arg]
      if (target) return { lines: [{ text: `→ opening ${arg}…`, tone: 'ember' }], scrollTo: target }
      return { lines: [{ text: `${cmd}: no such section: ${arg || '∅'} — try 'ls'`, tone: 'dim' }] }
    }

    case 'clear':
    case 'cls':
      return { lines: [], clear: true }

    case 'sudo':
      return { lines: [{ text: "You're already the admin here.", tone: 'dim' }] }

    case 'hire':
    case 'hireme':
      return {
        lines: [
          { text: 'Excellent choice.', tone: 'ember' },
          { text: `  ${profile.email}`, tone: 'link', href: `mailto:${profile.email}` },
        ],
      }

    case 'rm':
      return { lines: [{ text: 'Nice try. Some things are sacred.', tone: 'dim' }] }

    default:
      return { lines: [{ text: `command not found: ${cmd} — type 'help'`, tone: 'dim' }] }
  }
}

function Prompt() {
  return (
    <>
      <span className="text-ember">➜</span> <span className="text-ember-soft">~</span>{' '}
    </>
  )
}

function TermLine({ line }: { line: Line }) {
  if (line.tone === 'cmd') {
    return (
      <p className="break-words whitespace-pre-wrap text-bone">
        <Prompt />
        {line.text}
      </p>
    )
  }
  if (line.tone === 'link' && line.href) {
    return (
      <p className="break-words whitespace-pre-wrap">
        <a
          href={line.href}
          target="_blank"
          rel="noreferrer"
          className="text-bone/90 underline decoration-bone/30 underline-offset-2 transition-colors hover:text-ember"
        >
          {line.text}
        </a>
      </p>
    )
  }
  const cls =
    line.tone === 'ember'
      ? 'text-ember-soft'
      : line.tone === 'dim'
        ? 'text-bone-dim'
        : line.tone === 'accent'
          ? 'text-ember'
          : 'text-bone/90'
  return <p className={`break-words whitespace-pre-wrap ${cls}`}>{line.text || '\u00a0'}</p>
}

const INTRO = ['whoami', 'ls']

type Phase = 'intro' | 'ready'

export default function Terminal() {
  const [history, setHistory] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [bootTyping, setBootTyping] = useState('')
  const [phase, setPhase] = useState<Phase>('intro')
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history, bootTyping, input, phase])

  useEffect(() => {
    const reduced = prefersReducedMotion()
    let cancelled = false
    const timers: number[] = []
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms)
        timers.push(id)
      })

    const runIntro = async () => {
      if (reduced) {
        const lines: Line[] = []
        INTRO.forEach((c) => {
          lines.push({ text: c, tone: 'cmd' }, ...runCommand(c).lines)
        })
        lines.push({ text: "↳ type 'help' to see what I can do", tone: 'dim' })
        setHistory((prev) => [...prev, ...lines])
        return
      }

      await wait(420)

      for (const cmd of INTRO) {
        if (cancelled) return
        for (let i = 1; i <= cmd.length; i++) {
          if (cancelled) return
          setBootTyping(cmd.slice(0, i))
          await wait(42 + Math.random() * 52)
        }
        await wait(240)
        if (cancelled) return
        setBootTyping('')
        setHistory((prev) => [...prev, { text: cmd, tone: 'cmd' }, ...runCommand(cmd).lines])
        await wait(380)
      }

      if (cancelled) return
      setHistory((prev) => [...prev, { text: "↳ type 'help' to see what I can do", tone: 'dim' }])
    }

    const run = async () => {
      await runIntro()
      if (cancelled) return
      setPhase('ready')
      requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
    }

    run()
    return () => {
      cancelled = true
      timers.forEach((id) => clearTimeout(id))
    }
  }, [])

  const submit = () => {
    const raw = input
    setInput('')
    const res = runCommand(raw)
    if (res.clear) {
      setHistory([])
      return
    }
    setHistory((prev) => [...prev, { text: raw, tone: 'cmd' }, ...res.lines])
    if (res.scrollTo) scrollToSection(res.scrollTo)
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
      className="flex h-[min(42svh,280px)] flex-col overflow-hidden rounded-xl border border-ember/20 bg-ink-2/90 shadow-[0_30px_80px_-30px_rgba(0,255,65,0.15)] backdrop-blur-md lg:h-[300px]"
    >
      <div className="flex items-center gap-2 border-b border-ember/15 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-ember/30" />
        <span className="h-3 w-3 rounded-full bg-ember/55" />
        <span className="h-3 w-3 rounded-full bg-ember" />
        <span className="ml-3 truncate font-mono text-[11px] tracking-wide text-bone-dim">
          bishesh@matrix: ~/portfolio
        </span>
      </div>

      <div
        ref={bodyRef}
        data-lenis-prevent
        className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-y-contain px-4 py-3 text-left font-mono text-xs leading-relaxed sm:px-5 sm:py-4 sm:text-[13px] [scrollbar-color:color-mix(in_srgb,var(--color-bone)_35%,transparent)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-bone/35 [&::-webkit-scrollbar-track]:bg-bone/5 [&::-webkit-scrollbar]:w-1.5"
      >
        {history.map((line, i) => (
          <TermLine key={i} line={line} />
        ))}

        {phase === 'intro' ? (
          <p className="text-bone">
            <Prompt />
            {bootTyping}
            <span className="term-caret" />
          </p>
        ) : phase === 'ready' ? (
          <div className="flex items-center text-bone">
            <Prompt />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoComplete="off"
              aria-label="Interactive terminal — type a command"
              className="term-input ml-1 min-h-[44px] flex-1 border-none bg-transparent text-base text-bone caret-ember lg:min-h-0 lg:text-[13px]"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
