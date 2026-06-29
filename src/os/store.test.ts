import { beforeEach, expect, test } from 'vitest'
import { createOSStore } from './store'

let s: ReturnType<typeof createOSStore>
beforeEach(() => {
  localStorage.clear()
  s = createOSStore()
})

test('opens a window, focuses it, puts it top of order', () => {
  s.openWindow('projects')
  expect(s.getState().windows.projects).toBeTruthy()
  expect(s.getState().focused).toBe('projects')
  expect(s.getState().order.at(-1)).toBe('projects')
})

test('focus reorders z-stack to top', () => {
  s.openWindow('projects')
  s.openWindow('terminal')
  expect(s.getState().order.at(-1)).toBe('terminal')
  s.focusWindow('projects')
  expect(s.getState().order.at(-1)).toBe('projects')
  expect(s.getState().focused).toBe('projects')
})

test('opening an already-open window focuses + unminimizes it (no duplicate)', () => {
  s.openWindow('about')
  s.minimizeWindow('about')
  s.openWindow('about')
  expect(s.getState().windows.about!.minimized).toBe(false)
  expect(s.getState().order.filter((x) => x === 'about')).toHaveLength(1)
})

test('close removes from windows and order and clears focus to next', () => {
  s.openWindow('projects')
  s.openWindow('terminal')
  s.closeWindow('terminal')
  expect(s.getState().windows.terminal).toBeUndefined()
  expect(s.getState().order).toEqual(['projects'])
  expect(s.getState().focused).toBe('projects')
})

test('toggleMaximize stores and restores previous geometry', () => {
  s.openWindow('projects', { x: 10, y: 20, w: 300, h: 200 })
  s.toggleMaximize('projects')
  expect(s.getState().windows.projects!.maximized).toBe(true)
  s.toggleMaximize('projects')
  const w = s.getState().windows.projects!
  expect(w.maximized).toBe(false)
  expect({ x: w.x, y: w.y, w: w.w, h: w.h }).toEqual({ x: 10, y: 20, w: 300, h: 200 })
})

test('move and resize mutate geometry; subscribe fires', () => {
  let calls = 0
  s.subscribe(() => {
    calls++
  })
  s.openWindow('projects')
  s.moveWindow('projects', 50, 60)
  s.resizeWindow('projects', 400, 300)
  const w = s.getState().windows.projects!
  expect([w.x, w.y, w.w, w.h]).toEqual([50, 60, 400, 300])
  expect(calls).toBeGreaterThanOrEqual(3)
})

test('persists geometry across store instances', () => {
  s.openWindow('contact', { x: 12, y: 34, w: 360, h: 240 })
  const s2 = createOSStore()
  s2.openWindow('contact')
  const w = s2.getState().windows.contact!
  expect([w.x, w.y]).toEqual([12, 34])
})
