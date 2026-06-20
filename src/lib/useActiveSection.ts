import { useEffect, useState } from 'react'
import type { SectionId } from './sections'

export function useActiveSection(sectionIds: readonly SectionId[]) {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null)

    if (!elements.length) return

    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio)
        }

        let bestId: SectionId | null = null
        let bestRatio = 0

        for (const id of sectionIds) {
          const ratio = ratios.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }

        if (bestId && bestRatio > 0) setActive(bestId)
      },
      { rootMargin: '-42% 0px -48% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    )

    for (const el of elements) observer.observe(el)

    return () => observer.disconnect()
  }, [sectionIds])

  return active
}
