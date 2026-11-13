export type ProjectTheme = 'emvide' | 'zhd' | 'electro'

export interface ProjectScreenshot {
  id: string
  label: string
  /** Add a local approved image path here when it is available. */
  src?: string
}

export interface ProjectRecord {
  id: string
  number: string
  type: string
  title: string
  subtitle: string
  year: string
  kicker: string
  description: string
  status: string
  role: string
  period: string
  stack: string
  details: readonly string[]
  highlight: string
  theme: ProjectTheme
  screenshots: readonly ProjectScreenshot[]
  previewStatus: 'local-placeholder'
  liveUrl?: string
  repositoryUrl?: string
}

export const projects: readonly ProjectRecord[] = [
  {
    id: 'emvide', number: '01', type: 'PROFESSIONAL / B2B SAAS', title: 'Emvide', subtitle: 'Life Cycle Assessment / carbon-footprint platform',
    year: '2025 — 2026 / B2B SAAS', kicker: 'Complex frontend interfaces for Life Cycle Assessment workflows.',
    description: 'Frontend work on a core-module rebuild, including workspace and workflow interfaces, an interactive BOM material-tree canvas, and a shared component library.',
    status: 'Professional record', role: 'Frontend Developer', period: 'Aug 2025 — Oct 2026',
    stack: 'React · TypeScript · Vite · Chakra UI · Zustand · TanStack Query · React Flow · ELK.js · Dagre · Apollo Client · GraphQL · Storybook',
    details: ['Core frontend module rebuild.', 'Interactive BOM material-tree canvas.', 'Workspace and workflow interfaces.', 'Shared component library.'],
    highlight: 'Internal company materials', theme: 'emvide', screenshots: [{ id: 'overview', label: 'OVERVIEW / LOCAL PLACEHOLDER' }], previewStatus: 'local-placeholder',
  },
  {
    id: 'zhd-studio', number: '02', type: 'FULL-STACK SIDE PROJECT', title: 'ZHD Studio', subtitle: 'Video localization web app',
    year: '2026 — PRESENT / FULL-STACK', kicker: 'Video localization from Douyin/TikTok links or uploads.',
    description: 'A web app for transcript extraction and translation, voiceover generation, Vietnamese subtitles and audio, coordinated through an asynchronous processing pipeline.',
    status: 'Side project record', role: 'Fullstack Developer', period: 'Jun 2026 — Present',
    stack: 'Vue 3 · TypeScript · Vite · FastAPI · Python · PostgreSQL/Supabase · FFmpeg · Cloudflare R2',
    details: ['Douyin/TikTok links or video uploads.', 'Transcript extraction and translation.', 'Vietnamese subtitles, voiceover and audio.', 'Asynchronous processing pipeline.'],
    highlight: 'No approved public screenshot', theme: 'zhd', screenshots: [{ id: 'overview', label: 'OVERVIEW / LOCAL PLACEHOLDER' }], previewStatus: 'local-placeholder',
  },
  {
    id: 'electro-ecommerce', number: '03', type: 'FULL-STACK TEAM PROJECT', title: 'Electro Ecommerce', subtitle: 'Consumer electronics e-commerce platform',
    year: '2025 / FULL-STACK TEAM PROJECT', kicker: 'Consumer electronics commerce with admin and seller workflows.',
    description: 'A consumer-electronics e-commerce platform with admin/seller dashboards, dynamic product attributes and variants, VNPay payment integration, and revenue, order and product analytics.',
    status: 'Team project record', role: 'Fullstack Developer', period: 'Mar 2025 — Aug 2025',
    stack: 'Next.js · React · TailwindCSS · Material UI · Node.js · Express · MongoDB · Clerk · VNPay',
    details: ['Admin and seller dashboard.', 'Dynamic product attributes and variants.', 'VNPay payment integration.', 'Revenue, order and product analytics.'],
    highlight: 'No approved public screenshot', theme: 'electro', screenshots: [{ id: 'overview', label: 'OVERVIEW / LOCAL PLACEHOLDER' }], previewStatus: 'local-placeholder',
  },
] as const

export function projectIndexAfter(index: number, offset: number) {
  return (index + offset + projects.length) % projects.length
}
