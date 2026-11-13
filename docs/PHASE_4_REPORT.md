# Phase 4 report — Visual Fidelity, Performance & Production QA

**Status:** complete. `reference-v8/` remained read-only. No next phase has been started.

## Visual comparison

Captured fresh v8 and React images for all seven routes at 1918×906 and 1440×900, DPR 1. Each pair was evaluated by the checked-in, dependency-free [visual-diff.mjs](../scripts/visual-diff.mjs), which decodes the PNGs, writes a false-colour PPM difference image, and records machine-readable metrics.

| Viewport | Mean absolute channel error range | Changed-channel range (>16/255) |
| --- | ---: | ---: |
| 1918×906 | 5.141–6.799 / 255 | 5.764–8.044% |
| 1440×900 | 5.338–7.295 / 255 | 6.225–8.523% |

The differences include dynamic spline/headline frames, anti-aliasing and the deliberate private-viewer substitution. Fixed geometry—the 14 px frame inset, 72 px header, 213 px sidebar, 21 px dot grid, desktop panel divisions, border treatment and local Arial/Courier approximations—remained aligned. No material clipping, body overflow, or visual regression was observed that warranted a redesign or token change.

Evidence directories:

- `docs/phase-4-reference/` — 14 v8 captures.
- `docs/phase-4-react/` — matching React captures.
- `docs/phase-4-diffs/` — 14 `.json` metrics and `.ppm` difference maps; rerun with `node scripts/visual-diff.mjs <reference.png> <react.png> <output-base>`.

## Fixes and production configuration

- Added [public/_redirects](../public/_redirects) with `/* /index.html 200`. At the time of Phase 4 it lived under `app/public`; Vite copied it to `dist/_redirects`. It provides SPA direct-route refresh fallback for Netlify-compatible static hosts.
- Added a dependency-free visual-diff utility rather than adding an image-processing dependency.
- No private CV, PDF or preview asset was added. The existing safe text-record viewer remains the required privacy deviation.

For hosts other than Netlify-compatible static hosting, configure the equivalent rewrite of application paths to `index.html` before deployment.

## QA evidence

| Area | Result |
| --- | --- |
| Typecheck / lint / test / production build | PASS — 3 test files, 6 tests; lint has zero warnings. |
| Direct route refresh | PASS in Vite and capture flows for all seven routes; production `_redirects` present in `dist`. |
| Body/frame | PASS — fixed desktop shell retained; Home motion probe reported `overflow: hidden` and document height equal to viewport. |
| Transition queue, Back/Forward | PASS — rapid requests settled at `/contact`, overlay cleared; Back `/about`, Forward `/contact`. |
| Marquee soak | PASS — moved at 30 and 60 seconds; hover pause held the same transform. See [marquee-soak.json](phase-4-diffs/marquee-soak.json). |
| Projects / Guestbook / toolbar | PASS — Projects list and circular navigation synchronize; guestbook persistence and text-only rendering were verified in Phase 3 and retained. |
| Document Viewer | PASS — 100% → 150% zoom, reset to 100%, expand, download target, backdrop close, Escape/focus restoration and dialog cursor aim. See [document-controls.json](phase-4-diffs/document-controls.json). |
| Home motion | PASS — 15-second probe changed headline and spline geometry without body growth. |
| Performance probe | PASS — 15-second Home probe recorded 0.576 s main-thread task duration; no console errors. See [performance.json](phase-4-diffs/performance.json). |
| Privacy / unsafe render scan | PASS — no private CV/PDF, iframe, `innerHTML` or `dangerouslySetInnerHTML` in application source/output. |

Browser recording: `docs/phase-4-recording/transition-000.jpg` through `transition-030.jpg` capture a 31-frame React Home → Projects wipe.

## Final gates

```text
npm.cmd run typecheck  PASS
npm.cmd run lint       PASS
npm.cmd run test       PASS (6/6)
npm.cmd run build      PASS
```

## Remaining risks

1. QA and visual comparison used Chromium headless; Safari/Firefox and real touch-device verification remain advisable before a public release.
2. The PPM maps deliberately show dynamic-frame variance; they are a measurable baseline, not a claim of pixel-perfect or 100% motion fidelity.
3. The viewer cannot use the v8 private raster/PDF without explicit permission. The safe text-record viewer is production-ready for the current privacy policy.
4. `_redirects` is verified in the build artifact, but the final host must support that file or receive its documented equivalent rewrite rule.

Awaiting approval for any future work.
