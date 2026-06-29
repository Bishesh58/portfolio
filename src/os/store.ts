import { useSyncExternalStore } from 'react'
import type { AppId, Geom, OSState, WinState } from './types'

const DEFAULT_GEOM: Geom = { x: 80, y: 80, w: 720, h: 480 }
const LS_KEY = 'bishesh-os-layout-v1'

export function createOSStore(initial?: Partial<OSState>) {
  let state: OSState = { windows: {}, order: [], focused: null, ...initial }
  const listeners = new Set<() => void>()
  const emit = () => listeners.forEach((l) => l())

  const persist = () => {
    try {
      const geom: Record<string, Geom> = {}
      for (const id of Object.keys(state.windows) as AppId[]) {
        const w = state.windows[id]!
        geom[id] = { x: w.x, y: w.y, w: w.w, h: w.h }
      }
      localStorage.setItem(LS_KEY, JSON.stringify(geom))
    } catch {
      /* storage unavailable — non-fatal */
    }
  }

  const set = (next: OSState) => {
    state = next
    persist()
    emit()
  }

  const savedGeom = (id: AppId): Geom | undefined => {
    try {
      return (JSON.parse(localStorage.getItem(LS_KEY) || '{}') as Record<string, Geom>)[id]
    } catch {
      return undefined
    }
  }

  const toTop = (order: AppId[], id: AppId): AppId[] => [...order.filter((x) => x !== id), id]

  return {
    getState: () => state,
    subscribe(fn: () => void) {
      listeners.add(fn)
      return () => {
        listeners.delete(fn)
      }
    },
    openWindow(id: AppId, geom?: Partial<Geom>) {
      const existing = state.windows[id]
      const base: WinState =
        existing ?? { id, ...DEFAULT_GEOM, ...savedGeom(id), ...geom, minimized: false, maximized: false }
      const win: WinState = { ...base, minimized: false }
      set({ windows: { ...state.windows, [id]: win }, order: toTop(state.order, id), focused: id })
    },
    closeWindow(id: AppId) {
      const windows = { ...state.windows }
      delete windows[id]
      const order = state.order.filter((x) => x !== id)
      set({ windows, order, focused: order.at(-1) ?? null })
    },
    focusWindow(id: AppId) {
      if (!state.windows[id]) return
      set({ ...state, order: toTop(state.order, id), focused: id })
    },
    minimizeWindow(id: AppId) {
      const w = state.windows[id]
      if (!w) return
      const order = state.order.filter((x) => x !== id)
      set({ windows: { ...state.windows, [id]: { ...w, minimized: true } }, order, focused: order.at(-1) ?? null })
    },
    toggleMaximize(id: AppId) {
      const w = state.windows[id]
      if (!w) return
      const next: WinState = w.maximized
        ? { ...w, maximized: false, ...(w.prev ?? {}), prev: undefined }
        : { ...w, maximized: true, prev: { x: w.x, y: w.y, w: w.w, h: w.h } }
      set({ ...state, windows: { ...state.windows, [id]: next }, order: toTop(state.order, id), focused: id })
    },
    moveWindow(id: AppId, x: number, y: number) {
      const w = state.windows[id]
      if (!w) return
      set({ ...state, windows: { ...state.windows, [id]: { ...w, x, y } } })
    },
    resizeWindow(id: AppId, width: number, height: number) {
      const w = state.windows[id]
      if (!w) return
      set({ ...state, windows: { ...state.windows, [id]: { ...w, w: width, h: height } } })
    },
    resetLayout() {
      try {
        localStorage.removeItem(LS_KEY)
      } catch {
        /* ignore */
      }
      set({ windows: {}, order: [], focused: null })
    },
  }
}

export type OSStore = ReturnType<typeof createOSStore>
export const osStore = createOSStore()

export const isTopMost = (s: OSState, id: AppId) => s.order.at(-1) === id

export function useOS<T>(selector: (s: OSState) => T): T {
  return useSyncExternalStore(
    osStore.subscribe,
    () => selector(osStore.getState()),
    () => selector(osStore.getState()),
  )
}
