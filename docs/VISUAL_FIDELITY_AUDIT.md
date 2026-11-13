# Visual fidelity audit

**Scope:** visual restoration only. Personalized Phase 5B content and all interaction architecture remain in scope and unchanged.

## Evidence and source hierarchy

1. Live original at `https://irfansabrian.vercel.app/`, inspected in Chrome at 1440×900 / DPR 1.
2. Local immutable `reference/` v8 mockup.
3. Phase 4 and Phase 5B captures for regression context.

The live site was accessible in a real browser. It reports **Bricolage Grotesque** for display/UI and **JetBrains Mono** for metadata. Those font files are not packaged locally, so the React CSS now declares the measured family names with local fallbacks; no third-party font file was copied or embedded.

## Measured live-reference values at 1440×900

| Item | Live measurement | Pre-restoration React |
| --- | ---: | ---: |
| Paper background | `rgb(232,232,229)` | `#e8e8e6` |
| Frame/header origin | about `19px` | `14px` |
| Header height | `74px` | `72px` |
| Sidebar width | `184px` | `213px` |
| Main grid origin | about `203px, 93px` | `227px, 86px` |
| Outer frame radius | `16px` | `20px` |
| Home H1 | `93.6px`, weight `800` | about `72px`, weight `850` |
| Frame divider | 1px, dark translucent | light/weak gray |

## Prioritized mismatch register

| Priority | Area | Observed mismatch before restoration | Resolution |
| --- | --- | --- | --- |
| P0 | Shared frame | Inset, radius, separator strength and continuity differed from live reference | Tokenized frame geometry, stronger shared divider, continuous frame surface |
| P0 | Header/sidebar/main | Sidebar was too wide; main began too far right; toolbar controls were oversized | Restored measured shell proportions and shared boundaries |
| P0 | Home hierarchy | Personalized hero was materially smaller and lower-panel/footer relationship differed | Restored measured hero scale, vertical rhythm, capability/footer axis |
| P1 | Typography | React used generic Arial/Courier only; heavy roles were inconsistent | Declared measured family stack, normalized major heading weights and metadata stack; local font asset remains unavailable |
| P1 | Panels/contrast | Panel fills and secondary copy were too pale; section consoles extended too far vertically | Strengthened neutral tokens and constrained desktop panel proportions with existing internal scrolling |
| P2 | Section consistency | Different sections had unbounded full-height panels and inconsistent content origin | Shared page padding and bounded console/grid rules applied |
| P2 | Motion | No measured styling defect in cursor/transition timing | No engine/timing rewrite |

## Initial capture index

Local-only captures under `docs/visual-fidelity/` include matching 1440×900 live-original pages and pre-restoration React pages for Home, About, Projects, Skills, Credentials, Guestbook and Contact. They are ignored by Git because React captures contain local-review contact data.

The audit does not claim pixel-perfect equivalence: content, project images and the private-document policy intentionally differ from the original.

## Post-restoration verification

The restored React shell was measured at all seven routes. Its stable desktop geometry is now shared rather than page-specific:

| Viewport | Outer frame | Header | Sidebar | Main canvas |
| --- | --- | --- | --- | --- |
| 1918x906 | `19,19,1880x868` | `19,19,1880x74` | `19,93,184x794` | `203,93,1696x794` |
| 1440x900 | `19,19,1402x862` | `19,19,1402x74` | `19,93,184x788` | `203,93,1218x788` |
| 1200x800 | `19,19,1162x762` | `19,19,1162x74` | `19,93,184x688` | `203,93,978x688` |

All 21 route/viewport checks retained `body { overflow-y: hidden }` and a body height equal to the viewport. Final captures were taken only after the greeting loader was hidden. See `VISUAL_RESTORATION_REPORT.md` for the completed register and constraints.
