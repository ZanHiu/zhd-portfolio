# Acceptance & test matrix

## Build gates
- `npm ci` (after lockfile exists), `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build` succeed.
- No console errors, React key warnings or uncaught promise failures on tested flows.
- All local assets resolve without 404.

## Visual snapshots
- Captured at matching viewport 1918×906, DPR 1, same browser zoom and fonts, no OS taskbar included in canvas.
- Snapshots for: Home initial/rotator; About; Projects selected item; Skills; Credentials; Guestbook; Contact; modal CV; transition mid-frame.
- Compare outer frame edges, header/sidebar heights/widths, typography family/weight/size, dot density, icon baseline, curves, colors and scrollbars. Maintain a deviation log; define pixel-diff threshold only after baseline capture.

## Interaction scenarios
| ID | Scenario | Expected |
|---|---|---|
| NAV-01 | Direct load `/#projects` (or equivalent chosen route) | Projects visible, correct sidebar, no overlay |
| NAV-02 | Home → Projects → Skills → Home | Full transition each time, final state correct |
| NAV-03 | Click 5 tabs in quick succession | Last request wins, overlay clears, no stripe artifacts |
| NAV-04 | Browser Back/Forward | Route, header/sidebar and content synchronized |
| NAV-05 | Modal open during navigation attempt | Defined, stable behavior, focus doesn't escape unexpectedly |
| CUR-01 | Move on dot background | ghost tracks exact pointer; reticle follows smoothly and rotates |
| CUR-02 | Hover sidebar/project/action | aim brackets cover target; ghost inside target |
| CUR-03 | Move into/out of modal controls and preview | reticle stays visible and targets only modal controls |
| CUR-04 | Touch/reduced motion | native controls work, no hidden pointer trap |
| HOME-01 | Wait 15 seconds hands-off | spline and heading automatically animate, no layout jump |
| INTRO-01 | Re-run greeting intro | language cycle + progress without reflow |
| SKL-01 | Skills visible for 30 seconds | continuous seamless multirow motion without jump |
| PRJ-01 | Select item, prev/next and preview | all dossier panels synchronize, aim works |
| DOC-01 | Open CV; zoom/reset; close; Escape | controls work, no 404, focus restored |
| GUE-01 | Submit guestbook; reload | safe local demo persistence; no unexpected server claims |
| VIEW-01 | Desktop 1918x906 / 1440x900 | no outer frame cropping or unintended body scroll |
| VIEW-02 | Narrow viewport and keyboard-only | usable and navigable; no inaccessible hidden content |

## Security/privacy
- Do not publish reference personal PDF, email/phone or other sensitive assets without explicit user authorization. Original uploaded CV is in the reference package and is only for local development comparison.
- External links use `rel="noopener noreferrer"` where applicable; sanitize or render user text via React escaping; guestbook local data is not a service.

## Motion quality
- During screen transitions: visible title hold; no stuck overlay after blur/navigation/multiple rapid clicks; consistent completion with reduced motion.
- During cursor motion: no jank under target tracking, no duplicate visual cursor, no aim targeting off-screen/hidden elements.
