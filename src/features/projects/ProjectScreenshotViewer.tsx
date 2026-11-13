import { useEffect, useState } from 'react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2'
import { ViewerShell } from '../../components/modals/ViewerShell'
import styles from '../../components/modals/modal.module.css'
import type { ProjectRecord } from '../../data/projects'
import { ProjectPreview } from './ProjectPreview'

interface ProjectScreenshotViewerProps {
  isOpen: boolean
  onClose: () => void
  project: ProjectRecord
}

export function ProjectScreenshotViewer({ isOpen, onClose, project }: ProjectScreenshotViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (isOpen) setActiveIndex(0)
  }, [isOpen, project.id])

  if (!isOpen) return null

  const screenshots = project.screenshots
  const activeScreenshot = screenshots[activeIndex]
  const hasPrevious = activeIndex > 0
  const hasNext = activeIndex < screenshots.length - 1

  return (
    <ViewerShell
      closeLabel="Close visual viewer"
      footer={<><span>LOCAL VISUAL PLACEHOLDER — NO APPROVED PROJECT SCREENSHOT</span><span>LOCAL REVIEW ONLY</span></>}
      onClose={onClose}
      title={`VISUAL VIEWER / ${project.title.toUpperCase()}`}
      toolbar={<div className={styles.toolbar}>
        <span>{activeScreenshot.label}</span>
        <div className={styles.tools}>
          <button aria-label="Previous screenshot" data-aim disabled={!hasPrevious} onClick={() => setActiveIndex((value) => value - 1)} type="button"><HiArrowLeft /></button>
          <output aria-live="polite">{activeIndex + 1} / {screenshots.length}</output>
          <button aria-label="Next screenshot" data-aim disabled={!hasNext} onClick={() => setActiveIndex((value) => value + 1)} type="button"><HiArrowRight /></button>
        </div>
      </div>}
      visual
    >
      <div className={styles.visualPreview}>
        {activeScreenshot.src
          ? <img alt={`${project.title}: ${activeScreenshot.label}`} className={styles.visualImage} src={activeScreenshot.src} />
          : <ProjectPreview project={project} />}
      </div>
    </ViewerShell>
  )
}
