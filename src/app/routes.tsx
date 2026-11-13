import { Route, Routes } from 'react-router-dom'
import { AboutPage } from '../pages/AboutPage'
import { ContactPage } from '../pages/ContactPage'
import { CredentialsPage } from '../pages/CredentialsPage'
import { GuestbookPage } from '../pages/GuestbookPage'
import { HomePage } from '../pages/HomePage'
import { ProjectsPage } from '../pages/ProjectsPage'
import { SkillsPage } from '../pages/SkillsPage'
import { useTransition } from '../components/transitions/TransitionProvider'

export function AppRoutes() {
  const { renderedPath } = useTransition()

  return (
    <Routes location={renderedPath}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/credentials" element={<CredentialsPage />} />
      <Route path="/guestbook" element={<GuestbookPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
