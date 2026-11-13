import { useMemo } from 'react'
import { SectionHeader } from '../components/sections/SectionHeader'
import styles from '../components/sections/sections.module.css'
import { education, experience, profile } from '../data/profile'

function cells() {
  let seed = 43
  return Array.from({ length: 150 }, () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    const value = seed / 4294967296
    return value > 0.81 ? '4' : value > 0.62 ? '3' : value > 0.46 ? '2' : value > 0.28 ? '1' : '0'
  })
}

export function AboutPage() {
  const activity = useMemo(cells, [])

  return (
    <section className={styles.page} aria-labelledby="about-title">
      <SectionHeader about eyebrow="ABOUT / BACKGROUND." id="about" index="02" title="Frontend interfaces, complex workflows, and products that ship." />
      <div className={styles.aboutGrid}>
        <div className={styles.aboutIntroStack}>
          <section className={`${styles.aboutBlock} ${styles.aboutMain}`} data-aim aria-label="Current direction">
            <p className={styles.miniLabel}>CURRENT DIRECTION</p>
            <h2>{profile.title}.</h2>
            <p>{profile.focus}</p>
          </section>
          <section className={styles.aboutBlock} data-aim aria-label="Decorative contribution map">
            <p className={styles.miniLabel}>GITHUB CONTRIBUTIONS / DEMO</p>
            <div aria-label="Decorative contribution grid" className={styles.cells}>{activity.map((level, index) => <i data-level={level} key={index} />)}</div>
            <div className={styles.legend}>DEMO <span>▪ ▪ ▪ ▪ ▪</span> ACTIVITY</div>
          </section>
        </div>

        <section className={styles.aboutColumn} aria-label="Professional work">
          <div className={styles.scrollHeader}>
            <p className={styles.blockTitle}>WORK</p>
            <span>PROFESSIONAL RECORD</span>
          </div>
          <div className={styles.cardList}>
            {experience.map((item) => (
              <article className={styles.infoCard} data-aim key={item.title}>
                <small>{item.period}</small>
                <b>{item.title}</b>
                <p>{item.role} · {item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.aboutColumn} aria-label="Education">
          <div className={styles.scrollHeader}>
            <p className={styles.blockTitle}>EDUCATION</p>
            <span>EDUCATION RECORD</span>
          </div>
          <div className={styles.cardList}>
            {education.map((item) => (
              <article className={styles.infoCard} data-aim key={item.title}>
                <small>{item.period}</small>
                <b>{item.title}</b>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
