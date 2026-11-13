import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from '../../pages/home.module.css'

export function RotatingHeadline({ initial, descriptors }: { initial: string; descriptors: readonly string[] }) {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(Math.max(0, descriptors.indexOf(initial)))
  const [state, setState] = useState<'idle' | 'leaving' | 'entering'>('idle')

  useEffect(() => {
    if (reducedMotion) return undefined
    const pending = new Set<number>()
    const interval = window.setInterval(() => {
      setState('leaving')
      const timeout = window.setTimeout(() => {
        pending.delete(timeout)
        setIndex((value) => (value + 1) % descriptors.length)
        setState('entering')
      }, 285)
      pending.add(timeout)
    }, 3200)

    return () => {
      window.clearInterval(interval)
      pending.forEach((timeout) => window.clearTimeout(timeout))
    }
  }, [descriptors, reducedMotion])

  const className = `${styles.headline}${state === 'leaving' ? ` ${styles.headlineLeaving}` : ''}${state === 'entering' ? ` ${styles.headlineEntering}` : ''}`
  return <span className={className} onAnimationEnd={() => setState('idle')}>{descriptors[index]}</span>
}
