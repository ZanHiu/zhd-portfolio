import type { KeyboardEvent } from 'react'
import type { ProjectRecord } from '../../data/projects'
import styles from '../../components/sections/sections.module.css'

interface ProjectPreviewProps {
  project: ProjectRecord
  onOpen?: () => void
}

export function ProjectPreview({ project, onOpen }: ProjectPreviewProps) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onOpen || (event.key !== 'Enter' && event.key !== ' ')) return
    event.preventDefault()
    onOpen()
  }

  return (
    <div
      aria-label={onOpen ? `View ${project.title} visual placeholder` : undefined}
      className={styles.preview}
      data-aim
      data-aim-contrast="dark"
      data-interactive={Boolean(onOpen)}
      data-theme={project.theme}
      onClick={onOpen}
      onKeyDown={onKeyDown}
      role={onOpen ? 'button' : undefined}
      tabIndex={onOpen ? 0 : undefined}
    >
      {onOpen && <span className={styles.previewOpenAction}>VIEW ↗</span>}
      <div className={styles.previewWindow}>
        <div className={styles.previewToolbar}><span>● ● ●</span><span>LOCAL VISUAL PLACEHOLDER / NO APPROVED SCREENSHOT</span></div>
        <div className={styles.previewBody}>
          <div className={styles.mockSidebar}>{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</div>
          <div className={styles.mockMain}><div className={styles.mockHead} /><div className={styles.mockLines}>{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</div><div className={styles.mockBottom} /></div>
        </div>
      </div>
    </div>
  )
}
