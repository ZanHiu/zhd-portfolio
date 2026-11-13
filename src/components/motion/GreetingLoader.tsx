import { useEffect, useMemo, useState } from 'react'
import { orderedGreetings } from '../../data/greetings'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './motion.module.css'

export function GreetingLoader({ run, startCode }: { run: number; startCode: string }) {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const greetings = useMemo(() => orderedGreetings(startCode), [startCode])

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false)
      return undefined
    }

    setVisible(true)
    setWordIndex(0)
    const total = run === 0 ? 2650 : 1100
    const step = Math.max(65, Math.floor(total / greetings.length))
    let index = 0
    const interval = window.setInterval(() => {
      index += 1
      if (index >= greetings.length) {
        window.clearInterval(interval)
        setVisible(false)
        return
      }
      setWordIndex(index)
    }, step)
    const fallback = window.setTimeout(() => {
      window.clearInterval(interval)
      setVisible(false)
    }, Math.max(total + 900, 4500))

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(fallback)
    }
  }, [greetings, reducedMotion, run])

  return (
    <div aria-hidden="true" className={visible ? styles.loader : `${styles.loader} ${styles.loaderDone}`}>
      <div className={styles.greetingSlot}>
        <span className={styles.greetingDot}>·</span>
        <span className={styles.greetingWord} key={`${run}-${startCode}-${wordIndex}`}>{greetings[wordIndex].greeting}</span>
        <span className={styles.greetingDot}>·</span>
      </div>
      <span className={styles.loaderRule} />
    </div>
  )
}
