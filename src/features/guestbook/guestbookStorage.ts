export interface GuestbookEntry { name: string; message: string; date: string }

export const guestbookStorageKey = 'zhd-portfolio-guestbook-local'
const limit = 30

function isEntry(value: unknown): value is GuestbookEntry {
  if (!value || typeof value !== 'object') return false
  const entry = value as Record<string, unknown>
  return typeof entry.name === 'string' && typeof entry.message === 'string' && typeof entry.date === 'string'
}

export function readGuestbook(storage: Pick<Storage, 'getItem'> = window.localStorage): GuestbookEntry[] {
  try {
    const value: unknown = JSON.parse(storage.getItem(guestbookStorageKey) ?? '[]')
    return Array.isArray(value) ? value.filter(isEntry).map((entry) => ({ name: entry.name.slice(0, 60), message: entry.message.slice(0, 500), date: entry.date.slice(0, 32) })).slice(-limit) : []
  } catch { return [] }
}

export function writeGuestbook(entries: readonly GuestbookEntry[], storage: Pick<Storage, 'setItem'> = window.localStorage) {
  try { storage.setItem(guestbookStorageKey, JSON.stringify(entries.slice(-limit))); return true } catch { return false }
}

export function appendGuestbook(entries: readonly GuestbookEntry[], name: string, message: string, date: string) {
  return [...entries, { name: name.trim().slice(0, 60), message: message.trim().slice(0, 500), date }].filter((entry) => entry.name && entry.message).slice(-limit)
}
