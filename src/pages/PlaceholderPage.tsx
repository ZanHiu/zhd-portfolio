import { sectionForPath } from '../data/navigation'
import styles from './placeholder.module.css'

interface PlaceholderPageProps {
  path: string
  title: string
  eyebrow: string
}

export function PlaceholderPage({ path, title, eyebrow }: PlaceholderPageProps) {
  const section = sectionForPath(path)

  return (
    <section className={styles.page} aria-labelledby={`${section.id}-title`}>
      <div className={styles.meta}>
        <span>{eyebrow}</span>
        <span>{section.index} — 07</span>
      </div>
      <h1 id={`${section.id}-title`}>{title}</h1>
      <div className={styles.placeholder}>
        <span>PHASE 1 / STRUCTURAL PLACEHOLDER</span>
        <p>This route is intentionally limited to its shell until its approved feature-parity phase.</p>
      </div>
    </section>
  )
}
