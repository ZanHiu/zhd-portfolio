# Phase 1 report — React foundation

**Status:** complete. Phase 2 has not started.

## Delivered

- Created `app/` as a Vite 6 + React 18 + strict TypeScript project with React Router 6.
- Implemented the desktop fixed shell as separate React components: `AppShell`, `OuterFrame`, `Header`, `Sidebar`, and `Footer`.
- Added seven real browser routes: `/`, `/about`, `/projects`, `/skills`, `/credentials`, `/guestbook`, and `/contact`. Sidebar navigation uses `NavLink`, so it creates normal browser history entries instead of v8's `replaceState` behavior.
- Migrated Home's static frame, hero, SVG spline artwork, actions and capability panel into JSX and typed fixture data. It deliberately has no cursor, greeting loader, animated headline, spline motion, route wipe, modal, or marquee yet.
- Added shell tokens and scoped CSS Modules instead of carrying over the legacy layered cascade. Desktop measurements retained from v8 are: 14 px outer inset, 72 px header, 213 px sidebar, 86 px main top, 227 px main left, and 21 px dot grid.
- Added typed navigation and home fixtures under `src/data/`. No private CV/PDF, private preview image, or broken Resume link was copied into `app/public` or application code.
- Added a local SVG favicon to remove the initial browser 404.
- Added scripts for typecheck, lint, test and production build, plus unit coverage for navigation order and unknown-path fallback.

## Files and boundaries

| Area | Files |
| --- | --- |
| Application / routing | `app/src/main.tsx`, `app/src/app/{App,AppShell,routes}.tsx` |
| Shell | `app/src/components/shell/` |
| Typed fixtures | `app/src/data/{navigation,home}.ts` |
| Home | `app/src/pages/HomePage.tsx`, `app/src/pages/home.module.css` |
| Route placeholders | `app/src/pages/*Page.tsx`, `PlaceholderPage.tsx` |
| Tokens / reset | `app/src/styles/{tokens,global}.css` |
| Tooling / test | `app/{package.json,eslint.config.js,vite.config.ts}`, `app/src/tests/navigation.test.ts` |

The six non-Home pages deliberately render phase-labelled structural placeholders. Their full information architecture and interactions remain reserved for the approved Phase 3 scope.

## Verification

Commands run from `app/` after the final source change:

| Command | Result |
| --- | --- |
| `npm ci --cache .npm-cache --no-audit --no-fund` | PASS — 233 packages installed from `package-lock.json`. |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run test` | PASS — 1 file, 2 tests |
| `npm run build` | PASS — Vite production build completed |

Browser QA used Vite at `http://127.0.0.1:5174`, Chrome headless, DPR 1. Evidence: [browser-checks.json](phase-1-screenshots/browser-checks.json).

| Scenario | Result |
| --- | --- |
| Direct load for all seven paths | PASS — each route rendered its expected H1 and active sidebar item. |
| History | PASS — Home -> Projects -> Back -> Forward produced `/projects`, `/`, `/projects`. |
| Desktop frame at 1918 x 906 | PASS — measured header `14,14,1890x72`, sidebar `14,86,213x806`, main `227,86,1677x806`. |
| Body scroll at 1918 x 906 | PASS — `overflow: hidden`; scroll height 906 equals viewport. |
| Body scroll at 1440 x 900 | PASS — `overflow: hidden`; scroll height 900 equals viewport. |
| Browser console errors | PASS — none in final route/history/screenshot flow. |
| Private-CV asset scan | PASS — no `Nguyen-Van-Hieu`, `reference-placeholder`, or `.pdf` reference in `src`, `public`, or production `dist`. |

## Screenshot index

| State | File |
| --- | --- |
| React Home, 1918 x 906 / DPR 1 | [home-react-1918x906-dpr1.png](phase-1-screenshots/home-react-1918x906-dpr1.png) |
| React Home, 1440 x 900 / DPR 1 | [home-react-1440x900-dpr1.png](phase-1-screenshots/home-react-1440x900-dpr1.png) |

## Visual comparison and deviations

At 1918 x 906, the outer frame, topbar, sidebar, main-canvas bounds, dot density, hero offset, type scale, capability-panel position and panel proportions follow the baseline measurements. The Home action row was corrected after the first comparison to restore v8's 48 px H1-to-heading gap. Toolbar icons use local inline SVG rather than external assets.

Known and intentional Phase 1 deviations:

1. Spline artwork is static. The geometry is present, but v8's time/pointer deformation is not included until Phase 2.
2. The highlighted descriptor is fixed to `full-stack web apps`; the greeting loader and headline rotation are deferred to Phase 2.
3. The CV action and top-toolbar controls are visual-only. No private CV asset, modal or outgoing link has been shipped.
4. About, Projects, Skills, Credentials, Guestbook and Contact have route shells only; their detailed content, scrolling regions and feature controls are Phase 3 work.
5. No page wipe, cursor/aim effect or marquee is present by design. These are explicitly outside this approved phase.
6. Browser refresh/direct routing is verified through Vite's SPA fallback. A production host must also rewrite unknown application paths to `index.html`; static-host deployment configuration is not included in Phase 1.

No claim of pixel-perfect or 100% behavioral parity is made. The visual captures provide the next comparison baseline.

## Phase 2 recommendation — pending approval

Next, implement only the global interaction engine described in `docs/IMPLEMENTATION_PLAN.md`: one router-aware, recoverable staircase transition state machine; one modal-aware cursor controller with native-cursor/reduced-motion fallback; and the Home greeting, rotating descriptor and time-driven spline motion. Exercise direct routes, browser history, rapid clicks, cursor-in-modal behavior and record browser video before the next approval gate.

Do not begin Phase 2 without explicit approval.
