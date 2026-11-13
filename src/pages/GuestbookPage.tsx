import { useEffect, useState, type FormEvent } from 'react'
import { SectionHeader } from '../components/sections/SectionHeader'
import styles from '../components/sections/sections.module.css'
import { appendGuestbook, readGuestbook, writeGuestbook, type GuestbookEntry } from '../features/guestbook/guestbookStorage'

export function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [storageNotice, setStorageNotice] = useState('')
  useEffect(() => setEntries(readGuestbook()), [])
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next = appendGuestbook(entries, String(data.get('name') ?? ''), String(data.get('message') ?? ''), new Intl.DateTimeFormat('en-GB').format(new Date()))
    if (next.length === entries.length) return
    setEntries(next)
    setStorageNotice(writeGuestbook(next) ? '' : 'Saved for this session only; local storage is unavailable.')
    event.currentTarget.reset()
  }
  return <section className={styles.page} aria-labelledby="guestbook-title"><SectionHeader eyebrow="GUESTBOOK / MESSAGES" id="guestbook" index="06" title="Leave a note, critique, or suggestion." /><div className={styles.guestbookGrid}><div className={styles.guestForm}><p className={styles.miniLabel}>PUBLIC NOTES</p><h2>Write something<br />useful, sharp, or kind.</h2><p>This guestbook is an interactive local demo. Messages remain in this browser and are not transmitted to a server.</p><form onSubmit={submit}><label>YOUR NAME<input maxLength={60} name="name" placeholder="Your name" required /></label><label>YOUR MESSAGE<textarea maxLength={500} name="message" placeholder="Your thoughts..." required rows={4} /></label><button className={styles.guestSubmit} data-aim type="submit">ADD MESSAGE ↗</button>{storageNotice && <small role="status">{storageNotice}</small>}</form></div><div><div className={styles.guestTotals}><div><small>MESSAGE BOARD</small><b>{entries.length} {entries.length === 1 ? 'message' : 'messages'}</b></div><div><small>LOCAL ENTRIES</small><b>{entries.length}</b></div></div><div className={styles.messageList}>{entries.length === 0 ? <p className={styles.emptyMessage}>No notes yet. Be the first to leave a message.</p> : entries.slice().reverse().map((entry, index) => <article className={styles.message} key={`${entry.date}-${entry.name}-${index}`}><h3>{entry.name}</h3><p>{entry.message}</p><small>{entry.date}</small></article>)}</div></div></div></section>
}
