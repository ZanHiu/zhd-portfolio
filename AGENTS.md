# AGENTS.md — ZHD Portfolio engineering rules

## Repository and scope

- This directory is the React + TypeScript application root. Application code is in `src/`; static publishable assets are in `public/`; tooling is in `scripts/`; documentation is in `docs/`.
- `reference/` is a local, private, read-only baseline. Never edit, delete, import, iframe, or publish it. It includes private CV material and is intentionally ignored by Git.
- Preserve the approved Phase 4 UI and motion baseline. Do not redesign, simplify, or replace the paper/dot-grid frame, fixed desktop shell, typography hierarchy, cursor, transitions, spline, marquee, Project Explorer, viewer, or guestbook without explicit approval.
- The current content is local-review-only. Keep professional data in typed modules under `src/data/`; do not infer missing CV facts or invent professional claims, metrics, credentials, URLs, testimonials, or assets.
- Do not deploy, publish, push personal content, expose the CV/PDF, or begin Phase 5C without explicit owner approval.

## Engineering boundaries

- Use React, strict TypeScript, Vite, React Router, design tokens and scoped styles. Keep presentation separate from typed content.
- `TransitionProvider` is the sole page-transition owner. It must retain its recoverable `idle → covering → titleHold → swap → revealing → idle` lifecycle and latest-route queue.
- `CursorProvider` is the sole global pointer-animation owner. Preserve fine-pointer readiness, native-cursor fallback, reduced-motion support and modal-aware `data-aim` targeting.
- Maintain semantic controls, visible focus, keyboard handling, Escape/focus restoration in dialogs, and safe React text rendering. Never use `innerHTML` or `dangerouslySetInnerHTML`.
- Avoid duplicate global listeners, leaking timers/rAF loops, per-frame React state, broken asset paths and unintended desktop body scrolling.
- Keep `public/_redirects` in the build for Netlify-compatible SPA refresh fallback. Other hosts require their equivalent rewrite rule.

## Workflow and verification

- Read relevant specifications and phase reports before changing behavior. Treat historical phase reports as evidence; the current root layout supersedes their former `app/` paths.
- Do not claim browser or quality checks without evidence. Record limitations and known deviations.
- Run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` after source changes. For interaction/fidelity work, test all routes, history, rapid navigation, modal cursor/focus, marquee, project selection, guestbook and greeting at 1918×906 and 1440×900 where tooling is available.
- Preserve source control history when present. Never force-push, overwrite another repository, or delete source/reference material without explicit permission.
