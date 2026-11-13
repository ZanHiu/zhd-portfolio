import { skillLanes } from '../../data/skills'
import styles from '../../components/sections/sections.module.css'
import { TechnologyIcon } from './TechnologyIcon'

export function SkillsMarquee() {
  return <div className={styles.marqueeBoard} aria-label="Animated technology stacks">
    {skillLanes.map((lane) => <div className={styles.lane} key={lane.title}>
      <div className={styles.laneTitle}><b>{lane.title}</b><small>{lane.description}</small></div>
      <div className={styles.viewport}>
        <div className={styles.track} data-reverse={lane.reverse ? 'true' : 'false'}>
          {[...lane.items, ...lane.items].map((item, index) => <span aria-hidden={index >= lane.items.length ? 'true' : undefined} className={styles.chip} key={`${item}-${index}`}><TechnologyIcon technology={item} />{item}</span>)}
        </div>
      </div>
    </div>)}
  </div>
}
