import { useState } from 'react'
import { HiArrowLeft, HiArrowRight, HiLockClosed } from 'react-icons/hi2'
import { SectionHeader } from '../components/sections/SectionHeader'
import styles from '../components/sections/sections.module.css'
import { projectIndexAfter, projects } from '../data/projects'
import { ProjectPreview } from '../features/projects/ProjectPreview'
import { ProjectScreenshotViewer } from '../features/projects/ProjectScreenshotViewer'
import { TechnologyIcon } from '../features/skills/TechnologyIcon'

function stackEntries(stack: string) {
  return stack.split('\u00b7').map((entry) => entry.trim()).filter(Boolean)
}

function repositoryAccess(repositoryUrl?: string) {
  return repositoryUrl ? 'PUBLIC' : 'PRIVATE'
}

export function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isViewerOpen, setViewerOpen] = useState(false)
  const project = projects[activeIndex]
  const projectCount = projects.length
  const stack = stackEntries(project.stack)
  const access = repositoryAccess(project.repositoryUrl)

  const select = (index: number) => setActiveIndex(projectIndexAfter(index, 0))
  const selectPrevious = () => select(activeIndex - 1)
  const selectNext = () => select(activeIndex + 1)

  return <section className={styles.page} aria-labelledby="projects-title">
    <SectionHeader eyebrow="2025–2026 / SELECTED SYSTEMS" id="projects" index="03" title="Project archive." />
    <div className={styles.projectsLayout}>
      <aside className={styles.projectListPanel} aria-label="Project list">
        <header className={styles.projectPanelHeader}>
          <p className={styles.miniLabel}>PROJECT LIST</p>
          <strong>{String(projectCount).padStart(2, '0')} projects</strong>
        </header>
        <div className={styles.tabs}>
          {projects.map((item, index) => <button aria-pressed={index === activeIndex} data-aim data-selected={index === activeIndex ? 'true' : 'false'} key={item.id} onClick={() => select(index)} type="button">
            <span>{item.number} / {item.type}</span>
            <b>{item.title}</b>
            <small>{item.subtitle}</small>
          </button>)}
        </div>
      </aside>

      <section className={styles.projectDossierPanel} aria-label={`${project.title} project dossier`}>
        <header className={styles.projectDossierHeader}>
          <p className={styles.miniLabel}>PROJECT DOSSIER</p>
          <div className={styles.dossierHeaderControls}>
            <span className={styles.dossierTag}>{project.status.toUpperCase()}</span>
            <span className={styles.dossierTag}>LOCAL PLACEHOLDER</span>
            <div className={styles.dossierNavigation} aria-label="Project navigation">
              <button aria-label="Previous project" data-aim onClick={selectPrevious} type="button"><HiArrowLeft /></button>
              <output>Project {activeIndex + 1} of {projectCount}</output>
              <button aria-label="Next project" data-aim onClick={selectNext} type="button"><HiArrowRight /></button>
            </div>
          </div>
        </header>

        <div className={styles.dossierBody}>
          <article className={styles.projectDetail}>
            <header className={styles.projectIdentity}>
              <p className={styles.projectYear}>{project.year}</p>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <p className={styles.projectKicker}>{project.kicker}</p>
            </header>
            <section className={styles.projectVisual}>
              <div className={styles.projectVisualLabel}><span>SCREENSHOTS</span><small>LOCAL PLACEHOLDER</small></div>
              <ProjectPreview onOpen={() => setViewerOpen(true)} project={project} />
            </section>
            <div className={styles.projectDetailLower}>
              <section className={styles.projectDetailSection}>
                <p className={styles.miniLabel}>PROJECT SUMMARY</p>
                <p className={styles.projectDescription}>{project.description}</p>
              </section>
              <section className={styles.projectDetailSection}>
                <p className={styles.miniLabel}>SCOPE</p>
                <ul className={styles.projectScope}>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              </section>
            </div>
          </article>

          <aside className={styles.projectProgress} aria-label="Project information">
            <div className={styles.projectProgressBody}>
              <section className={styles.projectProgressState}>
                <p className={styles.miniLabel}>PROGRESS</p>
                <strong>{project.status}</strong>
                <span>LOCAL REVIEW RECORD</span>
              </section>
              <section className={styles.projectInfoSection}>
                <p className={styles.miniLabel}>PROJECT INFO</p>
                <dl className={styles.projectInfoGrid}>
                  <div><dt>TYPE</dt><dd>{project.type}</dd></div>
                  <div><dt>PERIOD</dt><dd>{project.period}</dd></div>
                </dl>
              </section>
              <section className={styles.stackSection}>
                <div className={styles.stackLabel}><small>STACK</small><span>CONTINUOUS</span></div>
                <div className={styles.stackViewport}>
                  <div className={styles.stackTrack}>
                    {[0, 1].map((group) => <div aria-hidden={group === 1} className={styles.stackGroup} key={group}>{stack.map((item) => <span className={styles.chip} key={`${group}-${item}`}><TechnologyIcon technology={item} />{item}</span>)}</div>)}
                  </div>
                </div>
              </section>
              <section className={styles.projectAccess}>
                <p className={styles.miniLabel}>ACCESS</p>
                <span aria-label={`${access.toLowerCase()} repository access`} className={styles.accessBadge} data-access={access}><HiLockClosed aria-hidden="true" />{access}</span>
                <small>{project.highlight}</small>
              </section>
            </div>
          </aside>
        </div>
      </section>
    </div>
    <ProjectScreenshotViewer isOpen={isViewerOpen} onClose={() => setViewerOpen(false)} project={project} />
  </section>
}
