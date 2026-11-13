import { describe, expect, it } from 'vitest'
import { projectIndexAfter, projects } from '../data/projects'
import { appendGuestbook, readGuestbook, writeGuestbook, type GuestbookEntry } from '../features/guestbook/guestbookStorage'

class MemoryStorage {
  private values = new Map<string, string>()
  getItem(key: string) { return this.values.get(key) ?? null }
  setItem(key: string, value: string) { this.values.set(key, value) }
}

describe('Phase 3 fixtures and state helpers', () => {
  it('wraps project previous and next navigation', () => {
    expect(projectIndexAfter(0, -1)).toBe(projects.length - 1)
    expect(projectIndexAfter(projects.length - 1, 1)).toBe(0)
  })

  it('bounds and safely persists local guestbook entries', () => {
    const storage = new MemoryStorage()
    let entries: GuestbookEntry[] = []
    for (let index = 0; index < 31; index += 1) entries = appendGuestbook(entries, `Name ${index}`, `<script>${index}</script>`, '01/01/2026')
    expect(entries).toHaveLength(30)
    expect(writeGuestbook(entries, storage)).toBe(true)
    expect(readGuestbook(storage)).toHaveLength(30)
    expect(readGuestbook(storage)[0].message).toContain('<script>')
  })
})
