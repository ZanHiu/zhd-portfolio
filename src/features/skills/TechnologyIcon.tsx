import type { IconType } from 'react-icons'
import { FaCode, FaCodeBranch, FaDatabase, FaServer } from 'react-icons/fa'
import {
  SiAntdesign, SiApollographql, SiChakraui, SiClerk, SiCloudflare, SiCss3, SiExpress,
  SiFastapi, SiFfmpeg, SiFigma, SiGit, SiGitlab, SiGraphql, SiHtml5,
  SiJavascript, SiMongodb, SiMongoose, SiMui, SiNextdotjs, SiNodedotjs, SiPostman,
  SiPostgresql, SiPython, SiReact, SiReacthookform, SiReactquery, SiRender,
  SiStorybook, SiSupabase, SiTailwindcss, SiTypescript, SiVercel, SiVite,
} from 'react-icons/si'

const icons: Record<string, IconType> = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss3,
  React: SiReact,
  'Next.js': SiNextdotjs,
  Vite: SiVite,
  'TanStack Query': SiReactquery,
  'React Hook Form': SiReacthookform,
  'Chakra UI': SiChakraui,
  'Ant Design': SiAntdesign,
  'Material UI': SiMui,
  TailwindCSS: SiTailwindcss,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  GraphQL: SiGraphql,
  'Apollo Client': SiApollographql,
  MongoDB: SiMongodb,
  Mongoose: SiMongoose,
  'PostgreSQL/Supabase': SiSupabase,
  PostgreSQL: SiPostgresql,
  Python: SiPython,
  FastAPI: SiFastapi,
  FFmpeg: SiFfmpeg,
  'Cloudflare R2': SiCloudflare,
  Storybook: SiStorybook,
  Git: SiGit,
  GitLab: SiGitlab,
  Figma: SiFigma,
  Postman: SiPostman,
  Vercel: SiVercel,
  Render: SiRender,
  Clerk: SiClerk,
  Zustand: FaCode,
  'React Flow': FaCodeBranch,
  'ELK.js': FaCodeBranch,
  Dagre: FaCodeBranch,
  'REST API': FaServer,
  VNPay: FaDatabase,
}

export function TechnologyIcon({ technology }: { technology: string }) {
  const Icon = icons[technology] ?? FaCode
  return <Icon aria-hidden="true" />
}
