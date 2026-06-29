import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Window from './Window'
import type { AppMeta } from './apps'
import type { WinState } from './types'

const meta: AppMeta = {
  id: 'projects',
  title: 'Projects',
  path: '~/projects',
  status: 'LOADED',
  accent: 'var(--accent-1)',
  icon: 'folder',
  Component: (() => <div>body content</div>) as unknown as AppMeta['Component'],
}
const win: WinState = { id: 'projects', x: 10, y: 10, w: 400, h: 300, minimized: false, maximized: false }

test('renders window path, body, and accessible dialog + close control', () => {
  render(<Window meta={meta} win={win} z={1} focused={true} />)
  expect(screen.getByRole('dialog', { name: /projects window/i })).toBeTruthy()
  expect(screen.getByText(/~\/projects/)).toBeTruthy()
  expect(screen.getByText('body content')).toBeTruthy()
  expect(screen.getByRole('button', { name: /close projects/i })).toBeTruthy()
})
