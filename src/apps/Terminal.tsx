import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { experience, featuredProjects, profile, skills } from '../data/resume'
import { prefersReducedMotion } from '../lib/matrixTypewriter'
import { osStore } from '../os/store'
import type { AppId } from '../os/types'

type Tone = 'cmd' | 'text' | 'dim' | 'ember' | 'link'
export interface Line {
  text: string
  tone?: Tone
  href?: string
}

const APP_TARGETS: Record<string, AppId> = {
  about: 'about',
  projects: 'projects',
  work: 'projects',
  skills: 'skills',
  experience: 'skills',
  contact: 'contact',
  terminal: 'terminal',
}

export function runCommand(raw: string, open: (id: AppId) => void): { lines: Line[]; clear?: boolean } {
  const input = raw.trim()
  if (!input) return { lines: [] }
  const [cmd, ...args] = input.split(/\s+/)
  const arg = (args[0] || '').toLowerCase()

  switch (cmd.toLowerCase()) {
    case 'help':
    case '--help':
    case '-h':
    case '?':
      return {
        lines: [
          { text: 'commands', tone: 'dim' },
          { text: '  about        who I am' },
          { text: '  projects     selected work' },
          { text: '  skills       my toolkit' },
          { text: '  experience   where I’ve worked' },
          { text: '  contact      get in touch' },
          { text: '  open <app>   launch an app' },
          { text: '  clear        clear the screen' },
        ],
      }
    case 'ls':
    case 'dir':
      return { lines: [{ text: 'about  projects  skills  experience  contact', tone: 'ember' }] }
    case 'whoami':
      return { lines: [{ text: `${profile.name} · ${profile.role}` }] }
    case 'about':
      return {
        lines: [
          { text: profile.summary, tone: 'text' },
          { text: '' },
          { text: `↳ ${profile.location} · ${profile.yearsExperience} yrs · run \`open about\``, tone: 'dim' },
        ],
      }
    case 'projects':
    case 'work':
      return {
        lines: [
          { text: 'selected work', tone: 'dim' },
          ...featuredProjects.map((p) => ({ text: `  ${p.index}  ${p.title}  ·  ${p.category}` })),
          { text: '↳ run `open projects` to explore', tone: 'dim' },
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
        ],
      }
    case 'open':
    case 'cd':
    case 'goto': {
      const target = APP_TARGETS[arg]
      if (target) {
        open(target)
        return { lines: [{ text: `→ opening ${arg}…`, tone: 'ember' }] }
      }
      return { lines: [{ text: `${cmd}: no such app: ${arg || '∅'} — try \`ls\``, tone: 'dim' }] }
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
      return { lines: [{ text: `command not found: ${cmd} — type \`help\``, tone: 'dim' }] }
  }
}

function Prompt() {
  return (
    <>
      <span className="text-ember">➜</span> <span className="text-ember-dim">~</span>{' '}
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
    line.tone === 'ember' ? 'text-ember' : line.tone === 'dim' ? 'text-bone-dim' : 'text-bone/90'
  return <p className={`break-words whitespace-pre-wrap ${cls}`}>{line.text || ' '}</p>
}

const SIGNAL = '↳ 4+ yrs · solo SaaS shipped · NetSuite/ERP · open to work'
const INTRO = ['whoami', 'ls']
type Phase = 'intro' | 'ready'

export default function Terminal() {
  const open = (id: AppId) => osStore.openWindow(id)
  const [history, setHistory] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [bootTyping, setBootTyping] = useState('')
  const [phase, setPhase] = useState<Phase>('intro')
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [history, bootTyping, phase])

  useEffect(() => {
    const reduced = prefersReducedMotion()
    let cancelled = false
    const timers: number[] = []
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms))
      })

    const runIntro = async () => {
      if (reduced) {
        const lines: Line[] = []
        INTRO.forEach((c) => lines.push({ text: c, tone: 'cmd' }, ...runCommand(c, open).lines))
        lines.push({ text: SIGNAL, tone: 'dim' }, { text: "type 'help' to see what I can do", tone: 'dim' })
        setHistory((prev) => [...prev, ...lines])
        return
      }
      await wait(420)
      for (const cmd of INTRO) {
        if (cancelled) return
        for (let i = 1; i <= cmd.length; i++) {
          if (cancelled) return
          setBootTyping(cmd.slice(0, i))
          await wait(46 + Math.random() * 48)
        }
        await wait(220)
        if (cancelled) return
        setBootTyping('')
        setHistory((prev) => [...prev, { text: cmd, tone: 'cmd' }, ...runCommand(cmd, open).lines])
        if (cmd === 'whoami') setHistory((prev) => [...prev, { text: SIGNAL, tone: 'dim' }])
        await wait(360)
      }
      if (cancelled) return
      setHistory((prev) => [...prev, { text: "type 'help' to see what I can do", tone: 'dim' }])
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = () => {
    const raw = input
    setInput('')
    const res = runCommand(raw, open)
    if (res.clear) {
      setHistory([])
      return
    }
    setHistory((prev) => [...prev, { text: raw, tone: 'cmd' }, ...res.lines])
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
      className="min-h-full px-4 py-3 text-left font-mono text-[13px] leading-relaxed text-bone"
    >
      <div className="space-y-1">
        {history.map((line, i) => (
          <TermLine key={i} line={line} />
        ))}
        {phase === 'intro' ? (
          <p className="text-bone">
            <Prompt />
            {bootTyping}
            <span className="term-caret" />
          </p>
        ) : (
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
              className="term-input ml-1 flex-1 border-none bg-transparent text-[13px] text-bone caret-ember"
            />
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  )
}
