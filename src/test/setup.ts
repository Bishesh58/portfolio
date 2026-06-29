import { vi } from 'vitest'

if (!window.matchMedia) {
  window.matchMedia = (q: string) =>
    ({
      matches: false,
      media: q,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList
}

class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(globalThis as unknown as { ResizeObserver: typeof RO }).ResizeObserver = RO

const mem: Record<string, string> = {}
vi.stubGlobal('localStorage', {
  getItem: (k: string) => (k in mem ? mem[k] : null),
  setItem: (k: string, v: string) => {
    mem[k] = String(v)
  },
  removeItem: (k: string) => {
    delete mem[k]
  },
  clear: () => {
    for (const k in mem) delete mem[k]
  },
})
