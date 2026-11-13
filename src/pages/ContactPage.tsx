import { FaEnvelope, FaGithub, FaLinkedinIn, FaSlack } from 'react-icons/fa6'
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2'
import { useTransition } from '../components/transitions/TransitionProvider'
import { useGreeting } from '../components/motion/GreetingProvider'
import { contactContent } from '../data/contact'
import sectionStyles from '../components/sections/sections.module.css'
import styles from './contact.module.css'

const contactItems = [
  { label: 'Email', value: contactContent.email, Icon: HiOutlineEnvelope },
  { label: 'Phone', value: contactContent.phone, Icon: HiOutlinePhone },
  { label: 'Location', value: contactContent.location, Icon: HiOutlineMapPin },
] as const

const linkIcons = {
  LINKEDIN: FaLinkedinIn,
  GITHUB: FaGithub,
  EMAIL: FaEnvelope,
  SLACK: FaSlack,
} as const

export function ContactPage() {
  const { phase } = useTransition()
  const { t } = useGreeting()

  return (
    <section className={`${sectionStyles.page} ${styles.page}`} aria-labelledby="contact-title">
      <div className={styles.grid}>
        <div className={styles.pitch}>
          <p className={styles.pageEyebrow}>CONTACT</p>
          <h1 data-revealed={phase === 'idle'} id="contact-title">
            <span>Let's build</span>
            <span>something</span>
            <span>sharper.</span>
          </h1>
        </div>

        <section className={styles.info} aria-label="Contact information">
          <div className={styles.details}>
            {contactItems.map(({ label, value, Icon }) => (
              <div aria-label={label} className={styles.detail} data-aim key={label}>
                <Icon aria-hidden="true" />
                <b>{value}</b>
              </div>
            ))}
          </div>
          <div className={styles.actions} aria-label="Local contact actions">
            {contactContent.links.map((link) => {
              const Icon = linkIcons[link.label]
              const content = <><Icon aria-hidden="true" />{t(`contact.${link.label.toLowerCase()}` as 'contact.email' | 'contact.github' | 'contact.linkedin' | 'contact.slack')}</>
              return link.href
                ? <a className={styles.action} data-aim href={link.href} key={link.label} title={link.value}>{content}</a>
                : <span className={styles.action} data-aim key={link.label} title={link.value}>{content}</span>
            })}
          </div>
        </section>
      </div>
    </section>
  )
}
