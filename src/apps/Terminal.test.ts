import { expect, test, vi } from 'vitest'
import { runCommand } from './Terminal'

test('help lists commands', () => {
  const { lines } = runCommand('help', vi.fn())
  expect(lines[0].text).toBe('commands')
  expect(lines.some((l) => l.text.includes('open <app>'))).toBe(true)
})

test('open projects invokes the open callback with the projects app id', () => {
  const open = vi.fn()
  const { lines } = runCommand('open projects', open)
  expect(open).toHaveBeenCalledWith('projects')
  expect(lines[0].tone).toBe('ember')
})

test('open with unknown target does not call open and reports an error', () => {
  const open = vi.fn()
  const { lines } = runCommand('open nope', open)
  expect(open).not.toHaveBeenCalled()
  expect(lines[0].text).toMatch(/no such app/)
})

test('clear returns the clear flag', () => {
  expect(runCommand('clear', vi.fn()).clear).toBe(true)
})

test('unknown command reports not found', () => {
  expect(runCommand('frobnicate', vi.fn()).lines[0].text).toMatch(/command not found/)
})

test('hire surfaces the email', () => {
  const { lines } = runCommand('hire', vi.fn())
  expect(lines.some((l) => l.href?.startsWith('mailto:'))).toBe(true)
})
