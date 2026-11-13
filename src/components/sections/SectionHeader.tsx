import styles from './sections.module.css'

interface SectionHeaderProps {
  id: string
  eyebrow: string
  index: string
  title: string
  about?: boolean
}

export function SectionHeader({ id, eyebrow, index, title, about = false }: SectionHeaderProps) {
  return (
    <>
      <div className={styles.meta}><span>{eyebrow}</span><span>{about ? `${index} / 07` : `${index} — 07`}</span></div>
      <h1 className={`${styles.heading}${about ? ` ${styles.aboutHeading}` : ''}`} id={`${id}-title`}>{title}</h1>
    </>
  )
}
