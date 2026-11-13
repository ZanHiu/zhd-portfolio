/**
 * Content provenance contract. The React UI consumes the focused typed modules
 * beside this file; this model records the Phase 5B local-review decision.
 */
export type ContentSource = 'approved-owner-information' | 'private-cv' | 'existing-safe-fixture' | 'missing'
export type PublicationStatus = 'safe-fixture' | 'local-review-only' | 'private' | 'missing'

export interface ContentField<T> {
  value: T
  source: ContentSource
  status: PublicationStatus
  destination: string
  note?: string
}

export interface PreparedProject {
  title: ContentField<string>
  role: ContentField<string>
  period: ContentField<string>
  summary: ContentField<string>
  stack: ContentField<readonly string[]>
  image: ContentField<null>
  liveUrl: ContentField<string | null>
  repositoryUrl: ContentField<string | null>
}

const field = <T>(value: T, source: ContentSource, status: PublicationStatus, destination: string, note?: string): ContentField<T> => ({ value, source, status, destination, note })
const local = 'local-review-only' as const

export const preparedContent = {
  home: {
    displayName: field('Nguyen Van Hieu', 'approved-owner-information', local, 'HomePage > homeContent.name'),
    role: field('Frontend Developer', 'approved-owner-information', local, 'HomePage > homeContent.lead'),
    summary: field('React, TypeScript, complex frontend interfaces, and full-stack side projects.', 'approved-owner-information', local, 'HomePage > homeContent.summary'),
  },
  about: {
    work: field(['Riskoa Ltd / Emvide'], 'private-cv', local, 'AboutPage > experience rows'),
    education: field(['University of Information Technology (UIT)', 'FPT Polytechnic College'], 'private-cv', local, 'AboutPage > education rows'),
  },
  projects: [
    {
      title: field('Emvide', 'approved-owner-information', local, 'ProjectsPage > projects[0]'),
      role: field('Frontend Developer', 'private-cv', local, 'ProjectsPage > dossier role'),
      period: field('Aug 2025 - Oct 2026', 'private-cv', local, 'ProjectsPage > dossier period'),
      summary: field('B2B SaaS platform for Life Cycle Assessment and carbon-footprint analysis.', 'private-cv', local, 'ProjectsPage > description'),
      stack: field(['React', 'TypeScript', 'Vite', 'Chakra UI', 'Zustand', 'TanStack Query', 'React Flow', 'ELK.js', 'Dagre', 'Apollo Client', 'GraphQL', 'Storybook'], 'private-cv', local, 'ProjectsPage > stack'),
      image: field(null, 'missing', 'missing', 'ProjectsPage > ProjectPreview', 'Use the local visual placeholder only.'),
      liveUrl: field(null, 'missing', 'missing', 'ProjectsPage > liveUrl'),
      repositoryUrl: field(null, 'missing', 'missing', 'ProjectsPage > repositoryUrl'),
    },
    {
      title: field('ZHD Studio', 'approved-owner-information', local, 'ProjectsPage > projects[1]'),
      role: field('Full-stack Side Project', 'private-cv', local, 'ProjectsPage > dossier role'),
      period: field('Jun 2026 - Present', 'private-cv', local, 'ProjectsPage > dossier period'),
      summary: field('Video localization from Douyin/TikTok links or uploads, with an asynchronous processing pipeline.', 'private-cv', local, 'ProjectsPage > description'),
      stack: field(['Vue 3', 'TypeScript', 'Vite', 'FastAPI', 'Python', 'PostgreSQL/Supabase', 'FFmpeg', 'Cloudflare R2'], 'private-cv', local, 'ProjectsPage > stack'),
      image: field(null, 'missing', 'missing', 'ProjectsPage > ProjectPreview', 'Use the local visual placeholder only.'),
      liveUrl: field(null, 'missing', 'missing', 'ProjectsPage > liveUrl'),
      repositoryUrl: field(null, 'missing', 'missing', 'ProjectsPage > repositoryUrl'),
    },
    {
      title: field('Electro Ecommerce', 'approved-owner-information', local, 'ProjectsPage > projects[2]'),
      role: field('Full-stack Team Project', 'private-cv', local, 'ProjectsPage > dossier role'),
      period: field('Mar 2025 - Aug 2025', 'private-cv', local, 'ProjectsPage > dossier period'),
      summary: field('Consumer electronics e-commerce platform with admin/seller dashboard and VNPay integration.', 'private-cv', local, 'ProjectsPage > description'),
      stack: field(['Next.js', 'React', 'TailwindCSS', 'Material UI', 'Node.js', 'Express', 'MongoDB', 'Clerk', 'VNPay'], 'private-cv', local, 'ProjectsPage > stack'),
      image: field(null, 'missing', 'missing', 'ProjectsPage > ProjectPreview', 'Use the local visual placeholder only.'),
      liveUrl: field(null, 'missing', 'missing', 'ProjectsPage > liveUrl'),
      repositoryUrl: field(null, 'missing', 'missing', 'ProjectsPage > repositoryUrl'),
    },
  ] satisfies readonly PreparedProject[],
  credentials: {
    cvAsset: field(null, 'private-cv', 'private', 'DocumentViewer > CV preview/download', 'Never copy the CV PDF or preview into application assets.'),
    certificates: field([], 'missing', 'missing', 'CredentialsPage > credential list', 'No verified certificate metadata or asset was supplied.'),
  },
  guestbook: {
    seededEntries: field([], 'missing', 'missing', 'GuestbookPage > message list', 'No testimonials or approved visitor messages supplied.'),
  },
  contact: {
    channels: field(['email', 'phone', 'location', 'LinkedIn'], 'private-cv', local, 'ContactPage > local-only records', 'Displayed without external navigation; publication remains unapproved.'),
  },
} as const
