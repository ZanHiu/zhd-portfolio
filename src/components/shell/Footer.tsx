import styles from './shell.module.css'

interface FooterProps {
  left: string
  middle: string
  right: string
}

export function Footer({ left, middle, right }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <span>{left}</span>
      <span>{middle}</span>
      <span>{right}</span>
    </footer>
  )
}
