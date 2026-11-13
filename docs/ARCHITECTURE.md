# React architecture proposal

## Stack
- Vite, React, TypeScript (strict), React Router, CSS Modules + global design tokens.
- GSAP only where it materially improves deterministic transitions; avoid combining multiple animation owners for the same property. CSS/Web Animations API remain acceptable for small micro-interactions.
- Zustand is optional; prefer React state/context until cross-component transition state requires a store.
- Vitest + React Testing Library for logic/components; Playwright for browser interaction, screenshot/route QA.
- PDF.js (`pdfjs-dist`) is optional **after** acceptance of baseline image viewer; implement only if real multi-page/selectable PDF behavior is required.

## Suggested tree (adapt as needed)
```
public/                          # vetted publishable static assets
src/
  main.tsx
  app/{App,AppShell,routes}.tsx
  styles/{tokens,global}.css
  components/{shell,cursor,transitions,modals,motion,sections}/
  pages/{Home,About,Projects,Skills,Credentials,Guestbook,Contact}Page.tsx
  features/{projects,skills,guestbook}/
  data/{navigation,profile,home,projects,skills,credentials,contact}.ts
  hooks/
  tests/
scripts/                         # visual-diff and future local developer tools
reference/                       # immutable private v8 baseline; never publish
docs/                            # specifications and phase evidence
```

## Router and transition boundary
`RouteLink` requests `navigate(to)`, TransitionProvider serializes one transition, overlays app shell, commits route change exactly when fully covered, holds label visibly, reveals and unblocks. Clicking repeatedly while busy updates one `queuedDestination` (latest wins). Handle Back/Forward and direct URL separately from UI-driven changes. Don't create a scrollable Index menu. A timeout/error cleanup is mandatory.

## Cursor boundary
CursorProvider mounted once at root and independent of route. Store physical pointer coordinates in refs, not React state per animation frame. Frame target via `elementsFromPoint` and `getBoundingClientRect`; target elements expose `data-aim`. Ghost dot uses real pointer coordinates. Reticle animates with inertia/rotation. Hover target can be block-aligned; when active modal is open, only modal descendants are targetable. For canvas/iframe areas, document limitations and fallback rather than pretending embedded cross-origin content forwards pointer events.

## Styling and sizing
Preserve exact v8 desktop measurements until screenshot comparison demonstrates needed refinements. Extract tokens from computed baseline CSS after capture; don't make up font or spacing values. Use CSS `minmax(0,1fr)`, `min-height:0`, safe viewport heights and overflow rules to avoid the clipped frame and unintended body scroll. Outside-frame dot grid is part of baseline.

## Performance
Single rAF for pointer, avoid React re-render on every mouse move; pause hidden-tab animations; observe reduced motion; dispose media queries/listeners/timers on unmount; lazy-load large modal assets and heavy panels if parity is preserved.
