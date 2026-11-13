import type { RefObject } from 'react'
import type { TransitionPhase } from './TransitionProvider'
import styles from './transition.module.css'

interface TransitionOverlayProps {
  overlayRef: RefObject<HTMLDivElement>
  phase: TransitionPhase
  index: string
  title: string
}

export function TransitionOverlay({ overlayRef, phase, index, title }: TransitionOverlayProps) {
  const active = phase !== 'idle'

  return (
    <div
      aria-hidden="true"
      className={`${styles.overlay}${active ? ` ${styles.active}` : ''}${phase === 'titleHold' ? ` ${styles.titleHold}` : ''}`}
      ref={overlayRef}
    >
      <div className={styles.label}>
        <small>NGUYEN VAN HIEU / 2026</small>
        <strong>{title}</strong>
        <i>— {index} / 07</i>
      </div>
    </div>
  )
}
