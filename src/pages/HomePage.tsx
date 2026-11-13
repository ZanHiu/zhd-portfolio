import { HomeCurves } from '../components/motion/HomeCurves'
import { RotatingHeadline } from '../components/motion/RotatingHeadline'
import { RouteLink } from '../components/transitions/RouteLink'
import { homeContent } from '../data/home'
import { credentials } from '../data/credentials'
import { useModal } from '../components/modals/ModalProvider'
import styles from './home.module.css'

export function HomePage() {
  const { openDocument } = useModal()
  return (
    <section className={styles.home} aria-labelledby="home-title">
      <div className={styles.orbitArt} aria-hidden="true">
        <HomeCurves />
      </div>

      <div className={styles.homeInner}>
        <p className={styles.eyebrow}>{homeContent.eyebrow}</p>
        <h1 id="home-title">{homeContent.name}</h1>
        <h2>
          {homeContent.lead} <RotatingHeadline descriptors={homeContent.headlines} initial={homeContent.highlight} />
        </h2>
        <p className={styles.summary}>{homeContent.summary}</p>
        <div className={styles.actions}>
          <RouteLink className={styles.primaryAction} to="/projects">
            VIEW PROJECTS <span aria-hidden="true">↗</span>
          </RouteLink>
          <button className={styles.secondaryAction} data-aim onClick={() => openDocument(credentials[3])} type="button">OPEN RESUME <span aria-hidden="true">↗</span></button>
        </div>
      </div>

      <div className={styles.capabilityPanel}>
        <div className={styles.capabilityLabel}>
          <span>CAPABILITY MAP</span>
          <p>These are the areas I combine inside projects. A quick summary, not page shortcuts.</p>
        </div>
        {homeContent.capabilities.map((capability) => (
          <article className={styles.capability} data-aim key={capability.label}>
            <span>{capability.label}</span>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
