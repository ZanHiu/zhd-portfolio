# Phase 0 baseline report

**Status:** complete; migration has not started.  `reference-v8/` was read-only throughout this phase.  No dependencies were installed and no application source was created or changed.

## Baseline environment and evidence

- Static server: `python -m http.server 5173 --bind 127.0.0.1`, launched from `reference-v8/`; baseline was accessed at `http://127.0.0.1:5173/`, never via `file://`.
- Browser: Chrome `157.0.8103.50`, headless DevTools Protocol; desktop emulation, DPR 1, browser zoom default.
- Syntax: `node --check` passed for `script.js`, `p0.js`, `p1.js`, and `cursor-v7.js`.
- Page-console capture across the screenshot flow and smoke tests: no `console.error`, assertion, or DevTools `Log` error entries. Evidence: [browser-console-errors.json](phase-0-screenshots/browser-console-errors.json).
- The static server returned HTTP 200 for `index.html`, all six stylesheets, all four scripts, the PNG preview and CV PDF. `assets/reference-placeholder.pdf`, used by Contact's `RESUME`, returned HTTP 404.

### Screenshot index

All listed screenshots are PNG, 1918 x 906, DPR 1 unless stated otherwise.

| State | File | Notes |
| --- | --- | --- |
| Home after loader | [home-runtime-1918x906-dpr1.png](phase-0-screenshots/home-runtime-1918x906-dpr1.png) | Fixed frame, dot grid, animated spline field, hero and capability panel. |
| Projects, third project selected | [projects-selected-runtime-1918x906-dpr1.png](phase-0-screenshots/projects-selected-runtime-1918x906-dpr1.png) | Shows synchronized selector, dossier and CSS mock preview. |
| Skills | [skills-runtime-1918x906-dpr1.png](phase-0-screenshots/skills-runtime-1918x906-dpr1.png) | Shows the four animated marquee lanes. |
| Credentials CV viewer | [credentials-cv-viewer-runtime-1918x906-dpr1.png](phase-0-screenshots/credentials-cv-viewer-runtime-1918x906-dpr1.png) | Local-only evidence; it visibly contains the supplied personal CV and must not be published. |
| Home to Projects wipe | [transition-home-to-projects-mid-runtime-1918x906-dpr1.png](phase-0-screenshots/transition-home-to-projects-mid-runtime-1918x906-dpr1.png) | Mid-cover frame of the single black-grid staircase mask. |
| Home, secondary viewport | [home-settled-1440x900-dpr1.png](phase-0-screenshots/home-settled-1440x900-dpr1.png) | 1440 x 900, DPR 1; captured after loader completion. |

The raw runtime observations are retained in [smoke-results.json](phase-0-screenshots/smoke-results.json) and [runtime-state.json](phase-0-screenshots/runtime-state.json). The first contains the reusable smoke-test values; the latter is the final state after the initial screenshot flow.

## Inventory

### Runtime and dependencies

`reference-v8` is a standalone static HTML app: no package manifest, build step, CDN, framework, font file, or external runtime dependency. Its source order is important:

1. CSS: `styles.css` -> `override.css` -> `p0.css` -> `p1.css` -> `cursor-v7.css` -> `v8.css`.
2. JS: `script.js` -> `p0.js` -> `p1.js` -> `cursor-v7.js`.

Later styles intentionally override earlier generations. In particular, `v8.css` turns the transition into a viewport-fixed, single clipped surface; `cursor-v7.css` owns the final high-z-index reticle/aim/dot presentation. This cascade is functional but not maintainable as a direct React port.

### DOM and assets

- Fixed chrome: `#loader`, `#aimTarget`, `#cursor`, `#pointerDot`, `.topbar`, `.sidebar`, fixed `main`, and an initially hidden `#modal`.
- Seven full-canvas `section.page` chapters: `home`, `about`, `projects`, `skills`, `credentials`, `guestbook`, and `contact`. The active section is the only pointer-interactive page; intended nested panes remain scrollable.
- `p0.js` appends the `#transitionLayer` and its label at runtime.
- Projects start as three HTML buttons; `script.js` supplies data and rebuilds their dossier/preview content.
- Skills start as four `data-stacks` tracks; `p1.js` replaces each with two identical chip runs for the marquee loop.
- Supplied assets: `home.png` and `projects.png` (legacy/reference images, not referenced by the current HTML), `P0-home-1918.png` and `P0-transition-1918.png` (previous baseline evidence), and `assets/Nguyen-Van-Hieu-CV-preview.png` plus `assets/Nguyen-Van-Hieu-CV.pdf`. The latter two are private reference fixtures only. No font assets exist; the computed family is local Arial/Helvetica with Courier New for metadata.

## Behavior and event ownership

| System | Current owner | Observed contract / overlap |
| --- | --- | --- |
| Loader and language greeting | `script.js` | 18 greetings cycle on window load; hard fallback completes at 4.5 s. Language button re-runs a shorter sequence. `p1.js` observes the word node only to resize long strings. |
| Navigation and chapter wipe | `p0.js` | Capturing document click listener exclusively intercepts known hash links; it calls `stopImmediatePropagation`. One `busy` flag and latest `pending` destination serialize a 740 ms cover, 620 ms hold/swap, and 760 ms reveal. `hashchange` also calls the controller. |
| Home motion | `p0.js` | One rAF mutates seven SVG paths roughly every 30 ms, with time waves plus pointer parallax. A separate interval rotates the headline every 3.2 s. |
| Projects / credentials / modal | `script.js` | Owns project selection, dynamic preview strings, modal creation/close/maximize/download, credential preview, Esc handler, and clock. `p1.js` delegates only `[data-zoom]` clicks on the same modal, so it overlaps at the modal element but not the controls owned by `script.js`. |
| Guestbook | `script.js` | Reads/writes `irfan-p0-reference-guestbook-local`, renders submitted text with DOM `textContent`, caps to 30 entries, and makes no server claim. |
| Skills marquee | `p1.js` + `p1.css` | Duplicates each chip set once, then CSS translates the track by 50%; reverse lanes use a second keyframe. Hover pauses the lane. |
| Cursor and aim | `cursor-v7.js` + `cursor-v7.css` | Final owner of its own rAF, physical ghost dot, smoothed/rotating reticle, and target frame. `p0.js` also listens to `pointermove`, but only for spline parallax; it no longer owns cursor rendering. |

The visible cursor layers are ordered above modal content (`#cursor` 10001, aim 10002, ghost 10003); the transition layer is 500. Target discovery uses `elementsFromPoint`, the first qualifying interactive ancestor, its bounding rect plus 7 px padding, and refuses non-modal targets while the modal is open. On the tested fine-pointer browser the aim frame locked to a sidebar target and the free reticle became visible.

## Test results

| Scenario | Result | Evidence / qualification |
| --- | --- | --- |
| Baseline serves locally | PASS | HTTP 200 for source assets listed above. |
| Home, Projects, Skills, CV viewer, mid-transition capture | PASS | Screenshot index above. |
| Project selection | PASS | Selecting project 3 synchronized title, metadata, mock preview, action label and active selector in the Projects capture. |
| Transition rapid click | PASS, with history defect | About -> Skills -> Contact in one task ended at `contact`; overlay class was empty after 5 s. |
| Cursor lock | PASS on fine pointer | Smoke result: `fine: true`, `frameLocked: true`, `reticleVisible: true`. Free-motion feel was not frame-rate profiled. |
| Skills marquee | PASS for movement smoke test | Computed transform changed over 1.2 s. A 30-second seamless-loop inspection remains a Phase 4 acceptance test. |
| CV modal and Esc | FUNCTIONAL, accessibility fail | Opens with `aria-modal=true`; Esc hides it. Focus remained on `BODY`, not in the dialog or on the opener after close. |
| Guestbook local persistence | PASS | One neutral QA entry was stored and rendered, then the test key was removed. |
| Reduced motion, touch, keyboard navigation, Back/Forward, 30-second motion stability | NOT fully verified | Browser automation did not exercise these end-to-end. Source findings below identify the Back/Forward defect. |

## Observed defects, unknowns, and migration risk

### P0 — fix before declaring React parity

1. **Back/Forward cannot represent sidebar navigation.** `p0.js` uses `history.replaceState`, never `pushState`, and has no `popstate` handler. Runtime evidence: history length remained `16` before and after a rapid sequence; Back/Forward cannot recover each selected chapter. A React router must model UI navigation and browser traversal separately.
2. **Modal focus management is absent.** The modal has `aria-modal` but no dialog role, initial focus, focus trap, or opener restoration. Runtime evidence shows `activeElement` was `BODY` after opening. The React modal must implement the complete keyboard contract.
3. **Contact Resume is a real 404.** The link points to missing `assets/reference-placeholder.pdf`. Keep this broken link out of the Phase 1 shell or replace it only with an approved safe fixture later.

### P1 — high migration risk / baseline limitation

1. **Cursor readiness and accessibility:** CSS hides the native cursor for any fine pointer before JavaScript proves the custom cursor is running. The baseline has no error fallback and uses global `cursor:none!important`. React must wait for a mounted, working controller; leave native cursor for touch/reduced-motion/failure.
2. **Transition state is timer/rAF based, not router aware.** It has no `visibilitychange`/unmount cancellation or timeout recovery. The tested rapid queue clears, but React needs the documented `idle -> covering -> titleHold -> swap -> revealing -> idle` state machine with cleanup and latest-route queueing.
3. **CSS cascade is six layers of historical overrides.** `styles.css`, `override.css`, `p0.css`, `p1.css`, and `v8.css` repeatedly redefine shell, page, cursor, modal, and transition rules. Port computed measurements/tokens deliberately; copying files preserves accidental precedence rather than intent.
4. **Home and cursor each run permanent rAF loops; clock/headline/greeting use intervals/timeouts.** Baseline has no visibility pause or teardown. React Strict Mode would easily duplicate these if effect ownership is not centralized.
5. **Dynamic HTML strings:** project previews, document viewer and modal record content use `innerHTML`. Fixture data is currently trusted, but React should use typed data and JSX to eliminate injection and lifecycle hazards.
6. **Document viewer is a one-page raster preview.** Zoom changes image width; the PDF is merely an external open action. It is adequate for parity but not a multi-page PDF viewer. The supplied preview/PDF contain personal information and cannot be deployed without explicit approval.
7. **Source fidelity remains bounded.** Original font files, exact reference cursor dynamics, animation timing and external content are not supplied. This report establishes the v8 baseline, not a claim of pixel-perfect fidelity to any external site.

## Phase 1 component migration map

| V8 boundary | React target | Data / behavior boundary |
| --- | --- | --- |
| Topbar, Sidebar, outer dot-grid frame, Footer | `AppShell`, `Header`, `Sidebar`, `OuterFrame`, `Footer` | Typed navigation configuration; no legacy hash click capture. |
| Seven `section.page` nodes | `pages/Home`, `About`, `Projects`, `Skills`, `Credentials`, `Guestbook`, `Contact` | Router route state; preserve desktop fixed canvas and explicit mobile behavior. |
| Project buttons/dossier/preview | `features/projects/{ProjectList,ProjectDossier,ProjectPreview}` | `data/projects.ts`; CSS preview shapes in JSX, not HTML strings. |
| Four skill tracks | `features/skills/SkillsMarquee` | `data/skills.ts`; duplicate tracks deterministically and pause/static-render for reduced motion. |
| CV/record modal | `ModalManager`, `DocumentViewer` | Typed credential records; approved, private dev fixture policy; focus return and Esc. |
| Greeting, headline, SVG paths | `motion/{GreetingLoader,RotatingHeadline,HomeCurves}` | Greeting and descriptor fixture arrays; a single managed animation lifecycle. |
| `p0.js` wipe | `TransitionProvider`, `TransitionOverlay`, `RouteLink` | One explicitly tested state machine; latest request queued; route commit at cover. |
| `cursor-v7.js` layers | `CursorProvider`, `CursorLayer`, `aimTargets` | One root rAF using refs; modal-aware target query; native fallback. |
| Guestbook | `features/guestbook/{GuestbookForm,GuestbookList,guestbookStorage}` | Escaped text, bounded localStorage, error fallback, no server implication. |

## Prioritized Phase 1 plan — pending approval

1. Create `app/` only, using Vite + React + strict TypeScript and React Router; do not import/iframe the reference HTML. Establish typecheck, lint, test and build scripts before feature work.
2. Extract measured desktop shell tokens and construct the fixed outer frame, dot grid, header/sidebar/footer, seven direct routes, and safe narrow-viewport fallback. Preserve the baseline 1918 x 906 and 1440 x 900 screenshots as comparison anchors.
3. Move visible labels, navigation and all non-private fixture content into typed data modules. Keep supplied CV assets out of publishable defaults and do not invent replacement content.
4. Port Home as static structure first, including the hero/capability-panel geometry but not the global cursor or route wipe yet. Add route/deep-link/no-body-scroll tests and new comparison captures.
5. Stop for the Phase 1 approval gate before moving to transition, cursor, modal, projects, skills, or guestbook behavior in Phase 2/3.

No Phase 1 work has begun. Approval is required to proceed.
