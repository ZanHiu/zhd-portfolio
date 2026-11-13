export interface SkillLane {
  title: string
  description: string
  reverse?: boolean
  items: readonly string[]
}

export const skillLanes: readonly SkillLane[] = [
  { title: 'Languages & Frontend', description: 'Interfaces, frameworks and UI systems', items: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'React', 'Next.js', 'Vite', 'Zustand', 'TanStack Query', 'React Hook Form', 'Chakra UI', 'Ant Design', 'Material UI', 'TailwindCSS'] },
  { title: 'Backend, API & Data', description: 'Application logic and integrations', reverse: true, items: ['Node.js', 'Express', 'GraphQL', 'Apollo Client', 'MongoDB', 'Mongoose', 'REST API'] },
  { title: 'AI & Workflow', description: 'Spec-driven development workflows', items: ['Claude Code', 'Claude Design', 'Claude Cowork', 'Spec-driven workflows'] },
  { title: 'Tools & Delivery', description: 'Daily development tools', reverse: true, items: ['Git', 'GitLab', 'Storybook', 'Figma', 'Postman', 'Vercel', 'Render'] },
] as const

export const deliveryGroups = [
  { title: 'DESIGN & UI', items: ['Figma', 'Storybook'] },
  { title: 'COLLABORATION', items: ['Git', 'GitLab'] },
  { title: 'API & REVIEW', items: ['Postman'] },
  { title: 'DEPLOYMENT', items: ['Vercel', 'Render'] },
] as const

export const coreDirectionNotes = [
  { label: 'CORE DIRECTION', value: 'Frontend systems' },
  { label: 'SUPPORT SKILL', value: 'APIs and data' },
  { label: 'DELIVERY MODE', value: 'Build and handoff' },
] as const
