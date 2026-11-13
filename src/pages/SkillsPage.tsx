import { SectionHeader } from '../components/sections/SectionHeader'
import styles from '../components/sections/sections.module.css'
import { coreDirectionNotes, deliveryGroups } from '../data/skills'
import { SkillsMarquee } from '../features/skills/SkillsMarquee'
import { TechnologyIcon } from '../features/skills/TechnologyIcon'

export function SkillsPage() {
  return <section className={styles.page} aria-labelledby="skills-title">
    <SectionHeader eyebrow="SKILLS / CAPABILITY MAP" id="skills" index="04" title="Skills, kept practical." />
    <div className={styles.skillsLayout}>
      <section className={styles.skillsCore} aria-labelledby="core-direction-title">
        <p className={styles.miniLabel}>CORE DIRECTION</p>
        <h2 id="core-direction-title">Frontend engineering for interfaces, products, and workflows.</h2>
        <p>Production React and TypeScript, complemented by backend services, data modelling and AI-assisted workflows.</p>
        <div className={styles.coreNotes}>
          {coreDirectionNotes.map((note) => <div key={note.label}><small>{note.label}</small><strong>{note.value}</strong></div>)}
        </div>
      </section>

      <section className={styles.projectDelivery} aria-labelledby="project-delivery-title">
        <div className={styles.deliveryHeader}><p className={styles.miniLabel} id="project-delivery-title">PROJECT DELIVERY</p><span>TOOLS / HANDOFF</span></div>
        <div className={styles.deliveryGrid} aria-label="Project delivery skills">
          {deliveryGroups.map((group) => <section className={styles.deliveryGroup} key={group.title}>
            <p>{group.title}</p>
            <div className={styles.deliveryChips}>{group.items.map((item) => <span className={styles.chip} key={item}><TechnologyIcon technology={item} />{item}</span>)}</div>
          </section>)}
        </div>
      </section>

      <section className={styles.taxonomy} aria-label="Skill map">
        <header className={styles.skillMapHeader}><p className={styles.miniLabel}>SKILL MAP</p><span>ACTIVE</span></header>
        <SkillsMarquee />
      </section>
    </div>
  </section>
}
