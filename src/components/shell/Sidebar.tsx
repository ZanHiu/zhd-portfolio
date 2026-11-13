import { navigationItems } from '../../data/navigation'
import { useGreeting } from '../motion/GreetingProvider'
import { RouteLink } from '../transitions/RouteLink'
import { useTransition } from '../transitions/TransitionProvider'
import styles from './shell.module.css'

export function Sidebar() {
  const { renderedPath } = useTransition()
  const { t } = useGreeting()

  return (
    <aside className={styles.sidebar} aria-label="Sections">
      <nav className={styles.navigation}>
        {navigationItems.filter((item) => item.id !== 'guestbook').map((item) => (
          <RouteLink
            className={`${styles.navigationLink}${renderedPath === item.path ? ` ${styles.active}` : ''}`}
            key={item.id}
            to={item.path}
          >
            <span aria-hidden="true">—</span>
            {t(`nav.${item.id}` as 'nav.home' | 'nav.about' | 'nav.projects' | 'nav.skills' | 'nav.credentials' | 'nav.contact')}
          </RouteLink>
        ))}
      </nav>
      <span className={styles.availability}>{t('available')} / 2026</span>
    </aside>
  )
}
