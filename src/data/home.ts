import { profile } from './profile'

export const homeContent = {
  eyebrow: 'FRONTEND DEVELOPER / REACT + TYPESCRIPT + FULL-STACK SIDE PROJECTS',
  name: profile.name,
  lead: 'I build',
  highlight: 'complex frontend interfaces',
  headlines: ['complex frontend interfaces', 'React + TypeScript products', 'full-stack side projects', 'workflow systems'],
  summary: 'Frontend Developer focused on React, TypeScript, complex frontend interfaces, and full-stack side projects.',
  capabilities: [
    {
      label: '01 / FRONTEND',
      title: 'Complex frontend interfaces',
      description: 'Interactive canvases, hierarchical structures and reusable component systems.',
    },
    {
      label: '02 / FULLSTACK',
      title: 'Full-stack side projects',
      description: 'Product interfaces paired with API, data and processing workflows.',
    },
    {
      label: '03 / WORKFLOW',
      title: 'Workflow systems',
      description: 'Spec-driven workflows and asynchronous processing pipelines.',
    },
    {
      label: '04 / PRODUCT',
      title: 'Product interfaces',
      description: 'B2B SaaS workflows, forms, dashboards and portals.',
    },
  ],
} as const
