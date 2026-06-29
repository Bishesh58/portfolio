import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/matrixTypewriter'

export const BOOT_KEY = 'bishesh-os-booted'

const LINES = [
  '> bishesh/os — cold boot',
  '> mounting /apps … ok',
  '> establishing uplink … ok',
  '> ready. press ⌘K to navigate',
]

export default function Boot({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    const reduced = prefersReducedMotion()
    let cancelled = false
    const timers: number[] = []
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms))
      })

    const run = async () => {
      if (reduced) {
        setLines(LINES)
        await wait(280)
        if (!cancelled) onDone()
        return
      }
      for (let i = 0; i < LINES.length; i++) {
        await wait(i === 0 ? 220 : 320)
        if (cancelled) return
        setLines((prev) => [...prev, LINES[i]])
      }
      await wait(520)
      if (!cancelled) onDone()
    }

    run()
    return () => {
      cancelled = true
      timers.forEach((id) => clearTimeout(id))
    }
  }, [onDone])

  return (
    <div className="os-boot" role="status" aria-live="polite" aria-label="System boot sequence">
      <div className="os-boot-inner">
        <p className="os-boot-brand">
          BISHESH<span className="text-ember">/</span>OS
        </p>
        {lines.map((l, i) => (
          <p key={i} className="os-boot-line">
            {l}
          </p>
        ))}
      </div>
    </div>
  )
}
