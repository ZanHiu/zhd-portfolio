# Visual Restoration Report

## Scope and result

This was a visual-fidelity restoration only. The approved React architecture, Phase 5B content, route behavior, cursor, transition, spline, marquee, document viewer, guestbook persistence, and private/local-review policy were preserved. No reference file was modified, no deployment was performed, and no source-control remote was contacted.

The primary visual source was the live Irfan Sabrian site, with the immutable local `reference/` v8 implementation and Phase 4 evidence used to resolve adaptation-specific differences. The detailed pre-change register is in `VISUAL_FIDELITY_AUDIT.md`.

## Root causes and corrections

| Area | Root cause | Resolution | Status |
| --- | --- | --- | --- |
| Outer frame | React tokens had a 14px inset and 20px radius rather than the measured live proportions. | Shared frame tokens now use a 19px inset, 16px radius, and a single 1px translucent boundary. | Resolved |
| Shell grid | Header, sidebar, and canvas used independent dimensions (72px header, 213px sidebar), so their junctions did not match the reference grid. | Header is 74px, sidebar is 184px, and the canvas begins at `203px, 93px` through shared CSS variables. | Resolved |
| Divider/contrast | Borders, dot grid, muted labels, and panel surfaces were too faint. | Restored neutral paper/ink/dot/line tokens and applied them to the shared shell and section surfaces. | Resolved |
| Typography hierarchy | Generic fallback stacks and inconsistent heavy heading values weakened the reference hierarchy. | Declared the measured Bricolage Grotesque / JetBrains Mono stacks, standardised 800-weight headings and metadata roles, and restored desktop heading scale. | Improved; see font limitation |
| Section proportions | Desktop panels grew opportunistically, creating inconsistent visual weight between routes. | Applied common page insets and bounded desktop panel heights while retaining intended internal scrolling. | Resolved |
| Home composition | Hero scale and capability/footer relationship did not follow the live reference. | Restored hero scale, left offset, label rhythm, capability panel axis, and footer alignment. | Resolved |

## Files modified

- `src/styles/tokens.css` - measured color, typography, dot-grid, frame, and layout tokens.
- `src/styles/global.css` - token-driven paper dot grid.
- `src/components/shell/shell.module.css` - frame, header, sidebar, canvas, and footer geometry and contrast.
- `src/pages/home.module.css` - hero and capability-panel proportions.
- `src/components/sections/sections.module.css` - shared section spacing, heading scale, panel sizing, and muted-content contrast.
- `.gitignore` - retains visual evidence as local-only material.
- `docs/VISUAL_FIDELITY_AUDIT.md` - pre-change audit plus final geometry evidence.

No content data module, React interaction controller, animation controller, `reference/` file, or personal-information value was changed.

## Measured geometry

| Viewport | Frame | Header | Sidebar | Main |
| --- | --- | --- | --- | --- |
| 1918x906 | `19,19,1880x868` | `19,19,1880x74` | `19,93,184x794` | `203,93,1696x794` |
| 1440x900 | `19,19,1402x862` | `19,19,1402x74` | `19,93,184x788` | `203,93,1218x788` |
| 1200x800 | `19,19,1162x762` | `19,19,1162x74` | `19,93,184x688` | `203,93,978x688` |

All seven routes were checked at each viewport (21 checks). Outer frame, header, sidebar, and canvas were present in every check; body height matched the viewport and `overflow-y` remained `hidden`.

## Screenshot and diff evidence

Local-only, Git-ignored captures live in `docs/visual-fidelity/`:

- `original-live-{home,about,projects,skills,credentials,guestbook,contact}-1440x900.png`
- `before-react-{home,about,projects,skills,credentials,guestbook,contact}-1440x900.png`
- `after-react-{home,about,projects,skills,credentials,guestbook,contact}-1440x900.png`

Final captures were made at 1440x900 after the greeting loader was hidden. The tooling also produced before/after maps for the same personalized React pages:

| Comparison | Mean absolute channel error | Changed channels over threshold |
| --- | ---: | ---: |
| Home, before to after | 16.832 | 13.209% |
| Contact, before to after | 9.057 | 6.812% |

These are change measurements, not claims of parity: the original has different literal content, imagery, and policy-driven contact/document treatment, and motion changes pixels by design.

## QA executed

| Check | Result |
| --- | --- |
| `npm.cmd run typecheck` | Passed |
| `npm.cmd run lint` | Passed with zero warnings |
| `npm.cmd run test` | Passed: 3 files, 6 tests |
| `npm.cmd run build` | Passed; 76 modules transformed |
| Direct-load all seven routes | Passed; each route returned its expected page heading |
| DevTools console/exception monitor across all routes | Passed; 0 error or exception events |
| Back/Forward after transition navigation | Passed: `/skills` then `/contact` |
| Latest-destination rapid navigation | Passed: settled at `/contact`, overlay hidden |
| Projects selection | Passed: second project selected `ZHD Studio` |
| Skills marquee continuity | Passed: computed transform changed during a 1.3-second sample |
| Document viewer focus and Escape | Passed: viewer focused its Expand control, then closed and restored focus to the opener |
| Cursor inside document dialog | Passed: 8 dialog aim targets found; mouse targeting a Zoom control set custom cursor `data-locked=true` |
| Guestbook storage safety | Passed by the existing unit test: 30-entry bound and safe literal text persistence |
| Private asset-path scan (`public/`, `dist/`) | Passed: 0 PDF/CV/document/secret paths; `public/` contains only `favicon.svg` and `_redirects` |

Browser evidence is recorded in `docs/visual-fidelity/layout-qa.json`, `console-route-qa.json`, `interaction-navigation-qa.json`, and `modal-cursor-qa.json`. These are ignored because the local-review application can render owner contact data.

## Remaining differences and owner review

1. The measured live font families are declared, but their font files are not shipped with this private local project. Systems without Bricolage Grotesque or JetBrains Mono use the stated local fallbacks, so glyph metrics can still differ slightly. No third-party font was copied without approval.
2. Pixel-perfect scores are inappropriate here: the personalized project records, approved placeholder visuals, privacy-safe document viewer, and local-only contact labels intentionally differ from the original site.
3. Motion was visually preserved and exercised, but the live reference’s exact easing curves were not replaced or retuned because no measurable regression justified changing the approved controllers.

The application remains **Local Review / Not Published**. Its personal content must not be deployed or published without owner approval.
