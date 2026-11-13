import type { PropsWithChildren } from 'react'
import { profile } from '../data/profile'
import { Footer } from '../components/shell/Footer'
import { Header } from '../components/shell/Header'
import { OuterFrame } from '../components/shell/OuterFrame'
import { Sidebar } from '../components/shell/Sidebar'
import { useTransition } from '../components/transitions/TransitionProvider'
import styles from '../components/shell/shell.module.css'

export function AppShell({ children }: PropsWithChildren) {
  const { phase } = useTransition()
  const pageReady = phase === 'idle'

  return (
    <div className={styles.application}>
      <OuterFrame />
      <Header />
      <Sidebar />
      <main className={styles.canvas} aria-live="polite">
        <div className={styles.routeViewport} data-page-ready={pageReady}>{children}</div>
        <Footer
          left={profile.title.toUpperCase()}
          middle="REACT / TYPESCRIPT / PRODUCT INTERFACES"
          right="ZHD."
        />
      </main>
    </div>
  )
}
