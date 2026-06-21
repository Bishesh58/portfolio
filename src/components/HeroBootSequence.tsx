import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/matrixTypewriter'

export const BOOT_STORAGE_KEY = 'matrix-boot-done'

const SYS_BOOT = [
  '> initializing portfolio…',
  '> loading modules [████████░░] 82%',
  '> syncing identity.core…',
  '> connection established',
]

export default function HeroBootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    const reduced = prefersReducedMotion()
    let cancelled = false
    const timers: number[] = []
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms)
        timers.push(id)
      })

    const finish = () => {
      try {
        sessionStorage.setItem(BOOT_STORAGE_KEY, '1')
      } catch {
        /* ignore */
      }
      onComplete()
    }

    const run = async () => {
      if (reduced) {
        setLines(SYS_BOOT)
        await wait(320)
        if (!cancelled) finish()
        return
      }

      for (let i = 0; i < SYS_BOOT.length; i++) {
        if (cancelled) return
        if (i === 0) await wait(280)
        else await wait(360)
        setLines((prev) => [...prev, SYS_BOOT[i]])
      }

      if (cancelled) return
      await wait(480)
      finish()
    }

    run()
    return () => {
      cancelled = true
      timers.forEach((id) => clearTimeout(id))
    }
  }, [onComplete])

  return (
    <div
      className="flex h-[min(42svh,280px)] flex-col justify-end px-1 pb-1 font-mono text-xs leading-relaxed sm:text-[13px] lg:h-[300px] lg:justify-center lg:pb-0"
      aria-live="polite"
      aria-label="System boot sequence"
    >
      <div className="space-y-1 text-left">
        {lines.map((text, i) => (
          <p key={i} className="whitespace-pre-wrap text-ember">
            {text}
          </p>
        ))}
      </div>
    </div>
  )
}
