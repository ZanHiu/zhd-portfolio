# Implementation plan with approval gates

## Phase 0 — Baseline audit (no migration yet)
Tasks: launch static v8; inspect DOM/CSS/JS; capture screenshots at 1918x906 and 1440x900; inventory interactions and known bugs; report baseline with evidence, risks, and component boundaries. Deliver `docs/PHASE_0_REPORT.md` and screenshots. **STOP for approval.**

## Phase 1 — React shell and structural parity
Create Vite React TypeScript app in `app/`; port outer background/frame, header, sidebar, footer, Home static layout and all 7 route placeholders via React Router. Preserve exact visual content/style in baseline; do not yet redesign cursor/transition. Establish typed fixtures and asset handling. Tests: deep links, viewport fit, no body scroll. Take side-by-side screenshots. **Approval gate.**

## Phase 2 — Global interaction engine
Move dual-layer cursor and modal-aware targeting into one provider. Replace legacy navigation with a documented single transition state machine; implement full-app black-grid staircase mask, title hold, queued navigation, Back/Forward and cleanup. Port multilingual intro + moving home curves. Tests for rapid clicking, stuck overlay and cursor-in-modal. Record browser video. **Approval gate.**

## Phase 3 — Section feature parity
Port Projects (list/dossier/preview), Skills (seamless marquee), About, Credentials+CV viewer, Guestbook, Contact. Preserve v8 data and behavior as fixtures. Add real modal accessibility, handling for localStorage failures, and toolbars/icons. Unit/component/browser tests. **Approval gate.**

## Phase 4 — Fidelity, performance and hardening
Conduct full-page visual comparison at fixed viewport, motion comparison, keyboard, focus, reduced-motion, touch and responsive testing; fix regressions. Optimize frame rates, remove dead code/duplicate styles, audit dependencies, and produce parity report. Only then discuss future content personalization. **Approval gate.**

## Required output at EACH phase
- Summary of exact files and systems changed.
- Evidence: commands run and results, screenshot/video artifacts if available.
- Known deviations from v8, with severity and reproduction steps.
- Explicit list of incomplete items; do not silently mark as done.
- Clear next phase request but no automatic progression without approval.

## Regression rule
If React version loses a working behavior from v8, treat it as a regression and fix before adding new capabilities.
