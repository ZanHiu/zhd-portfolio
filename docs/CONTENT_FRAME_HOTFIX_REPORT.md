# Content-frame hotfix report

**Status:** complete. This was a shared-shell visual correction only; no Phase 5C work, content change, deployment, publication, or reference edit was performed.

## Reproduced issue

The personalized Contact page reproduced the reported visual discontinuity at the shared header/main boundary. Its geometry was correct, but the horizontal boundary line visible in the approved Phase 4 reference was absent from the React header. That made the dot-grid canvas appear visually detached from the header and outer frame despite sharing the expected bounds.

No separate user-uploaded screenshot was present in the project. The investigation used the existing Phase 4 and Phase 5B Contact captures plus a fresh live `before-contact-1440x900.png` capture.

## Root cause

`src/components/shell/shell.module.css` defined the shared Header at the correct fixed position and height, but did not give it a bottom border. The Sidebar already supplied the vertical separator with `border-right: 1px`, while the canvas intentionally has no top/left border. This left the header/canvas split without its corresponding horizontal line.

The issue was not specific to Contact content: all page sections use the same `AppShell`, Header, Sidebar and canvas. Rectangles, `box-sizing`, clipping, radii and body overflow were already correct.

## Correction

Added one shared declaration to `.header`:

```css
border-bottom: 1px solid var(--color-line);
```

Because global `box-sizing: border-box` is active, the 72 px header rectangle and the canvas origin do not move. The border occupies the header's existing interior edge and completes the one-pixel horizontal boundary without adding a second canvas border.

## Files modified

- `src/components/shell/shell.module.css`
- `.gitignore` — excludes the local hotfix image/measurement evidence, which contains local-review contact data.
- `docs/content-frame-hotfix/` — local-only before/after PNGs, JSON browser measurements and visual-diff output.
- `docs/CONTENT_FRAME_HOTFIX_REPORT.md`

`reference/` was not modified.

## Screenshots and visual comparison

Local-only evidence:

- `docs/content-frame-hotfix/before-contact-1440x900.png`
- `docs/content-frame-hotfix/after-contact-1440x900.png`
- `docs/content-frame-hotfix/contact-1440-before-after.json`
- `docs/content-frame-hotfix/contact-1440-before-after.ppm`

The before/after visual diff is intentionally small: mean absolute channel error **0.046 / 255**, changed channels **0.109%**, maximum channel error **44**. The changed area is the restored shared boundary; typography, spacing, colors, animation ownership and content remain unchanged.

## Bounding rectangles

Fresh Chrome DevTools Protocol measurements at DPR 1 after the patch:

| Viewport | Outer frame | Header | Sidebar | Main canvas/page | Body |
| --- | --- | --- | --- | --- | --- |
| 1918×906 | `14,14 1890×878` | `14,14 1890×72` | `14,86 213×806` | `227,86 1677×806` | `906`, hidden overflow |
| 1440×900 | `14,14 1412×872` | `14,14 1412×72` | `14,86 213×800` | `227,86 1199×800` | `900`, hidden overflow |
| 1200×800 | `14,14 1172×772` | `14,14 1172×72` | `14,86 213×700` | `227,86 959×700` | `800`, hidden overflow |

At each desktop viewport, frame/header/canvas right edges and frame/sidebar/canvas bottom edges meet exactly. The canvas begins at the shared `227,86` grid junction, remains clipped with its existing lower-right radius, and the Header now reports a `1px` bottom border. The pre-patch shell had identical box geometry but a `0px` header bottom border.

## Browser checks

`browser-layout-checks.json` records all **seven routes** at all three viewports: 21 route/layout checks. Every check rendered its expected heading, kept the page rectangle equal to the canvas rectangle, used `overflow: hidden`, and reported no console errors.

Interaction smoke at 1440×900:

- Rapid sidebar requests settled at `/contact`; the overlay returned to its inactive base class.
- Browser Back settled at `/projects`; Forward restored `/contact`.
- Fine-pointer cursor readiness and sidebar aim lock were both `true`.
- Projects selection settled on **ZHD Studio** with the second list item active.
- Skills marquee transform changed from `-47.8367px` to `-129.158px` over 1.4 seconds.
- Document Viewer opened with focus on **Expand viewer**, cursor aim locked inside the dialog, and Escape closed it.
- A transient Guestbook entry survived reload; the storage key was removed after the test.

## Automated checks

| Command | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm run test` | Pass — 3 files, 6 tests |
| `npm run build` | Pass — 76 modules transformed |
| `npm run visual:diff -- …` | Pass |

## Remaining issues

- This focused hotfix captured Contact before/after because it exposed the defect. All routes were measured and smoke-tested, but no new full seven-page screenshot set was required or produced.
- Screenshot evidence is local-only and ignored by Git because the Contact page contains local-review personal data.
- No non-Chromium or real touch-device test was added; this remains the existing Phase 4 compatibility limitation.

No deployment was performed. Await review; Phase 5C has not started.
