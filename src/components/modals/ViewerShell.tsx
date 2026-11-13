import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiArrowsPointingOut, HiXMark } from 'react-icons/hi2'
import styles from './modal.module.css'

interface ViewerShellProps {
  title: string
  closeLabel: string
  onClose: () => void
  toolbar?: ReactNode
  children: ReactNode
  footer: ReactNode
  visual?: boolean
}

export function ViewerShell({ title, closeLabel, onClose, toolbar, children, footer, visual = false }: ViewerShellProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(document.activeElement instanceof HTMLElement ? document.activeElement : null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    const opener = openerRef.current
    const focusables = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])') ?? [])
    const frame = window.requestAnimationFrame(() => focusables()[0]?.focus())
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const nodes = focusables()
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      opener?.focus()
    }
  }, [onClose])

  return createPortal(
    <div className={styles.modal} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section aria-labelledby="viewer-title" aria-modal="true" className={styles.window} data-expanded={expanded} ref={dialogRef} role="dialog">
        <header className={styles.topbar}>
          <span id="viewer-title">{title}</span>
          <div className={styles.headerActions}>
            <button aria-label={expanded ? 'Restore viewer' : 'Expand viewer'} data-aim onClick={() => setExpanded((value) => !value)} type="button"><HiArrowsPointingOut /></button>
            <button aria-label={closeLabel} data-aim onClick={onClose} type="button"><HiXMark /></button>
          </div>
        </header>
        <div className={styles.content}>
          {toolbar}
          <div className={`${styles.stage}${visual ? ` ${styles.visualStage}` : ''}`}>{children}</div>
        </div>
        <footer className={styles.bottom}>{footer}</footer>
      </section>
    </div>,
    document.body,
  )
}
