import { expect, test } from 'vitest'
import { archiveProjects, featuredProjects, projects } from './resume'

test('featured projects have a complete case-study arc', () => {
  expect(featuredProjects.length).toBeGreaterThanOrEqual(4)
  for (const p of featuredProjects) {
    expect(p.problem.length, `${p.title} problem`).toBeGreaterThan(0)
    expect(p.approach.length, `${p.title} approach`).toBeGreaterThan(0)
    expect(p.outcome.length, `${p.title} outcome`).toBeGreaterThan(0)
    expect(p.role.length, `${p.title} role`).toBeGreaterThan(0)
    expect(p.period.length, `${p.title} period`).toBeGreaterThan(0)
  }
})

test('every featured project is verifiable: has proof (link/repo/image) OR is flagged NDA', () => {
  for (const p of featuredProjects) {
    const hasProof = Boolean(p.link || p.repo || p.image)
    expect(hasProof || p.nda === true, `${p.title} must be provable or NDA-flagged`).toBe(true)
  }
})

test('project accent hues are unique for visual hierarchy', () => {
  const accents = projects.map((p) => p.accent)
  expect(new Set(accents).size).toBe(accents.length)
})

test('featured + archive partition all projects', () => {
  expect(featuredProjects.length + archiveProjects.length).toBe(projects.length)
})
