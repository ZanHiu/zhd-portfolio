import { useEffect, useState, type KeyboardEvent } from 'react'
import { FaEnvelope, FaGithub, FaLinkedinIn, FaMoon, FaSlack, FaSun } from 'react-icons/fa'
import { HiChevronDown, HiLanguage } from 'react-icons/hi2'
import { greetingOptions } from '../../data/greetings'
import { profile } from '../../data/profile'
import { useGreeting } from '../motion/GreetingProvider'
import { RouteLink } from '../transitions/RouteLink'
import styles from './shell.module.css'

type ToolName = 'mail' | 'github' | 'linkedin' | 'slack'

const tools: readonly { label: string; name: ToolName }[] = [
  { label: 'Email / local review only', name: 'mail' },
  { label: 'GitHub / local review only', name: 'github' },
  { label: 'LinkedIn / local review only', name: 'linkedin' },
  { label: 'Slack / local review only', name: 'slack' },
]

function ToolIcon({ name }: { name: ToolName }) {
  const Icon = name === 'mail' ? FaEnvelope : name === 'github' ? FaGithub : name === 'linkedin' ? FaLinkedinIn : FaSlack
  return <Icon aria-hidden="true" />
}

export function Header() {
  const { selectedCode, selectLanguage, t } = useGreeting()
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => window.localStorage.getItem('zhd-theme') === 'dark' ? 'dark' : 'light')
  const selectedLanguage = greetingOptions.find((option) => option.code === selectedCode) ?? greetingOptions[0]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('zhd-theme', theme)
  }, [theme])

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      setMenuOpen(false)
    }
  }

  return (
    <header className={styles.header}>
      <RouteLink className={styles.monogram} to="/" aria-label="Home">
        ZHD. <span>{profile.name.toUpperCase()} / 2026</span>
      </RouteLink>
      <div className={styles.tools} aria-label="Portfolio tools">
        {tools.map((tool) => (
          <span className={styles.tool} aria-label={tool.label} data-aim key={tool.label}>
            <ToolIcon name={tool.name} />
          </span>
        ))}
        <div className={styles.languagePicker} onKeyDown={handleMenuKeyDown}>
          <button
            aria-controls="greeting-language-menu"
            aria-expanded={menuOpen}
            aria-haspopup="listbox"
            className={styles.language}
            data-aim
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            <HiLanguage aria-hidden="true" />
            <span className={styles.languageName}>{selectedLanguage.label.toUpperCase()}</span>
            <span className={styles.languageCode}>{selectedLanguage.code}</span>
            <HiChevronDown aria-hidden="true" />
          </button>
          {menuOpen && (
            <ul className={styles.languageMenu} id="greeting-language-menu" role="listbox" aria-label="Greeting language">
              {greetingOptions.map((option) => (
                <li key={option.code}>
                  <button
                    aria-selected={option.code === selectedCode}
                    data-aim
                    onClick={() => {
                      selectLanguage(option.code)
                      setMenuOpen(false)
                    }}
                    role="option"
                    type="button"
                  >
                    <span>{option.label}</span>
                    <small>{option.greeting}</small>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          aria-label={theme === 'light' ? t('theme.dark') : t('theme.light')}
          aria-pressed={theme === 'dark'}
          className={styles.tool}
          data-aim
          onClick={() => setTheme((value) => value === 'light' ? 'dark' : 'light')}
          type="button"
        >
          {theme === 'light' ? <FaMoon aria-hidden="true" /> : <FaSun aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}
