# ZHD Portfolio

Personal portfolio for Nguyen Van Hieu, built as a React + TypeScript application.

**Current status: Local Review / Not Published.** This local build contains personal information and must not be deployed, uploaded, or pushed to a public repository without explicit owner authorization.

## Tech stack

- React 18.3.1 and React DOM 18.3.1
- React Router DOM 6.30.1
- TypeScript 5.8.3 (strict mode)
- Vite 6.4.5 with `@vitejs/plugin-react` 4.7.0
- Vitest 3.2.4
- ESLint 9.28.0 with TypeScript ESLint 8.34.1 and React Hooks/Refresh plugins

## Prerequisites

- Node.js 18 or newer. Node.js 22.23.2 was used for the latest local verification.
- npm (included with Node.js).
- Git is optional. This handoff was delivered without an existing Git repository or remote.

## Getting started (Windows PowerShell)

Open PowerShell and run:

```powershell
Set-Location 'D:\SideProject\zhd-porfolio\zhd-portfolio'
npm ci
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173/`. Open it from the terminal output, or run:

```powershell
Start-Process 'http://localhost:5173/'
```

Stop the development server with `Ctrl+C` in the terminal where it is running.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run typecheck` | Check strict TypeScript without writing output. |
| `npm run lint` | Run ESLint with zero warnings allowed. |
| `npm run test` | Run the Vitest test suite once. |
| `npm run build` | Type-check, then create an optimized Vite build in `dist/`. |
| `npm run preview` | Serve the current production build locally. Run `npm run build` first. |
| `npm run visual:diff -- <reference.png> <react.png> <output-base>` | Compare matching PNGs and write JSON/PPM diff artifacts. |

## Folder structure

```text
zhd-portfolio/
├── public/       Static publishable files, including SPA redirect rules
├── src/          React application, components, features, styles and typed content
├── docs/         Specifications, phase reports, privacy notes and local QA evidence
├── scripts/      Developer tools, including the image-diff utility
├── reference/    Private immutable v8 baseline; ignored by Git and never published
├── AGENTS.md     Engineering rules for future contributors and Codex
└── package.json  Scripts and locked runtime/tooling dependencies
```

`node_modules/`, `dist/`, caches and local visual evidence are intentionally ignored. The `reference/` directory remains on disk for local visual comparison but is private and read-only.

## Architecture

- **React Router:** seven routes (`/`, `/about`, `/projects`, `/skills`, `/credentials`, `/guestbook`, `/contact`) support direct URLs and browser history.
- **AppShell:** `src/app/AppShell.tsx` composes the fixed outer frame, header, sidebar, footer and route canvas.
- **TransitionProvider:** serializes the black-grid staircase wipe and route swapping.
- **CursorProvider:** owns the dual-layer reticle, ghost pointer and modal-aware magnetic aim frame.
- **Feature components:** Projects Explorer, Skills Marquee, guestbook storage and Document Viewer are isolated under `src/features/` and `src/components/`.
- **Typed content:** `src/data/` contains profile, home, projects, skills, credentials, contact and navigation data rather than hard-coded professional content in JSX.
- **Styling:** `src/styles/tokens.css` supplies design tokens; component/page CSS Modules scope local layout rules.

## Editing content

Edit typed data, not page JSX, when updating approved content:

| Content | File |
| --- | --- |
| Profile and experience/education | `src/data/profile.ts` |
| Home copy and capability panel | `src/data/home.ts` |
| Projects Explorer records | `src/data/projects.ts` |
| Skills marquee lanes | `src/data/skills.ts` |
| Credentials/record viewer | `src/data/credentials.ts` |
| Local-review contact records | `src/data/contact.ts` |
| Provenance and publication status | `src/data/content-model.ts` |

Review [docs/CONTENT_GAPS.md](docs/CONTENT_GAPS.md) before adding any image, URL, CV asset, credential, metric, or contact destination.

## Animation system

The approved interaction engine is intentionally centralized:

- `TransitionProvider` and `TransitionOverlay` render the black-grid staircase page transition.
- `CursorProvider` renders the reticle, ghost dot and `data-aim` target frame only on supported fine-pointer devices.
- `GreetingLoader`, `RotatingHeadline` and `HomeCurves` provide the multilingual greeting, headline changes and time/pointer-driven SVG field.
- `SkillsMarquee` provides four continuous, alternating lanes with hover pause and reduced-motion fallback.

Do not add competing document listeners, timers, rAF loops or animation owners for these systems.

## Testing

Run the complete local quality gate from the project root:

```powershell
npm run typecheck
npm run lint
npm run test
npm run build
```

For visual comparison, use the dependency-free tool:

```powershell
npm run visual:diff -- <reference.png> <react.png> <output-base>
```

For manual QA, use 1918×906 and 1440×900 viewports. Check all routes, Back/Forward, rapid navigation, cursor targets, Home motion, Projects selection, Skills pause/loop, viewer keyboard controls, and guestbook persistence.

## Privacy

This is a local-review build. It includes owner-review personal content, while the original CV/PDF and preview remain only under `reference/`. No part of this project is approved for public deployment yet. Read [docs/PRIVACY_PUBLICATION_CHECKLIST.md](docs/PRIVACY_PUBLICATION_CHECKLIST.md) and [docs/CONTENT_GAPS.md](docs/CONTENT_GAPS.md) before any release work.

## Troubleshooting

| Problem | What to do |
| --- | --- |
| `npm` is not recognized | Install a current Node.js LTS release, close and reopen PowerShell, then run `node --version` and `npm --version`. |
| Dependencies are missing or corrupted | Delete only this project's `node_modules/` directory, then run `npm ci`. Do not delete `reference/`. |
| Port 5173 is busy | Stop the other Vite process, or use the alternative URL Vite prints after `npm run dev`. |
| Blank page | Check the terminal for compile errors; run `npm run typecheck` and `npm run lint`; confirm the browser URL points to the Vite server. |
| Direct-route refresh fails after deployment | Vite dev server handles SPA fallback. A production host must rewrite unknown app paths to `index.html`; `public/_redirects` covers Netlify-compatible hosts. |
| Production build fails | Run `npm ci`, then `npm run typecheck`, `npm run lint`, and `npm run build` to isolate the failing stage. |

## Development status

Phases 0–4 completed the React migration, interaction engine, feature parity and visual/performance QA. Phase 5A prepared content mapping; Phase 5B integrated owner-approved content for local review only. Phase 5C, publication, SEO work and redesign have not started.
