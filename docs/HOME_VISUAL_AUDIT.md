# Home Visual Audit

## Scope and evidence

This audit is limited to the personalized React Home route and its shared application frame. No typed profile data, route structure, animation controller, or reference file was changed.

Capture protocol: Chrome DevTools, CSS DPR 1, browser zoom 100%, and a settled greeting loader. Both the live original and React Home were captured at 1440x900 and 1918x906. A 1900x754 desktop canvas was also tested because it reproduces the short-height collision class. No separate user-supplied comparison image was available as a workspace file, so the audit uses the live original and the local capture set.

Local-only evidence is in `docs/home-visual/` (Git-ignored):

- `original-live-home-1440x900.png`, `original-live-home-1918x906.png`
- `before-home-1440x900.png`, `before-home-1918x906.png`
- `after-home-1440x900.png`, `after-home-1918x906.png`, `after-home-1900x754.png`
- eight `before-*` / `after-*` corner and straight-border close-ups.

## Findings before implementation

| Priority | Finding | Evidence | Resolution |
| --- | --- | --- | --- |
| P0 | The outer border was visually uneven. | Top and left segments were covered by opaque chrome backgrounds; their sampled RGB values were lighter than right/bottom. | Raise the single `OuterFrame` border layer above Header, Sidebar, and canvas. |
| P0 | Short desktop canvases allowed the hero to collide with the fixed capability panel. | At 1900x754, simulated pre-fix actions ended at `y=583.42`, while the panel began at `y=488`: a `-95.42px` overlap. | Use a height-aware compact Home layout below 820px viewport height. |
| P1 | The animated descriptor was too heavy. | React: `35.28px / 800 / 38.808px`; live original: `35.28px / 650 / 38.102px` at 1440x900. | Restore weight 650 and 1.08 line-height. |
| P1 | The main title exceeded the live reference on wide desktops. | At 1918px React was `112px`; live original was `104.8px`. | Cap Home title at 105px while retaining 93.6px at 1440px. |
| P1 | The eyebrow had the wrong treatment. | React used 11px mono / 700 / tracked; live original used 14.08px / 650 / normal spacing. | Restore the measured sans display treatment. |
| P2 | Curves were visually stronger than the approved Home baseline. | React stroke was `1.05` at `.84` opacity. | Restore the lighter `.7` / `.75` presentation and keep its existing animation engine. |

## Frame root-cause analysis

`OuterFrame` already had the only intended rounded border, but it was at `z-index: 1`. Header and Sidebar were at `z-index: 2` and had opaque/translucent paper backgrounds. They painted over the frame at the top and left edge; Header only supplied an internal bottom divider and Sidebar only supplied an internal right divider. Thus the same frame border looked faint or missing where those surfaces overlapped.

There was no transform, fractional frame coordinate, box-shadow, or duplicate outer border involved. At 1440x900 the frame bounds are integral: `19,19,1402x862`, with a 16px radius.

### Straight-border validation at 1440x900 / DPR 1

Close-ups were captured at 3x image scale. The intended 1 CSS-pixel border therefore occupies three physical rows/columns in the capture.

| Segment midpoint | Before RGB | After RGB | Result |
| --- | --- | --- | --- |
| Top | `227,227,224` | `181,181,178` | Restored to the common frame intensity |
| Bottom | `180,180,178` | `180,180,178` | Unchanged, already visible |
| Left | `217,217,215` | `180,180,178` | Restored to the common frame intensity |
| Right | `180,180,178` | `180,180,178` | Unchanged, already visible |

The after samples differ by at most one channel value (rounding/anti-aliasing). Top-left, top-right, bottom-left, and bottom-right close-ups show one uninterrupted frame curve with expected corner anti-aliasing and no secondary perimeter.

## Typography and layout measurements

| Role | Live original at 1440x900 | React before | React after |
| --- | --- | --- | --- |
| Home H1 | `93.6px / 800 / 87.984px`, x=245 | `93.6px / 800 / 87.984px` | `93.6px / 800 / 87.984px`, x=245 |
| Home H1 at 1918px | `104.8px / 800` | `112px / 800` | `105px / 800` |
| Descriptor at 1440px | `35.28px / 650 / 38.102px` | `35.28px / 800 / 38.808px` | `35.28px / 650 / 38.102px` |
| Eyebrow at 1440px | `14.08px / 650`, normal spacing | `11px / 700`, `0.715px` tracking | `14px / 650`, normal spacing |
| Capability panel | x=245, y about 635, h about 160 | x=245, y=631.5, h=162.5 | x=245, y=635, h=160 |
| Hero-to-panel gap, 1440px | positive | 41.83px | 47.03px |
| Hero-to-panel gap, 1918px | positive | 24.5px | 33.91px |
| Hero-to-panel gap, 1900x754 | n/a | -95.42px without compact rule | 18.98px |

The personalized name remains longer than the original name, so its width is intentionally not forced to match. Its size, weight, line-height, horizontal origin, and desktop cap follow measured live treatment.

## Remaining differences

The live original uses Bricolage Grotesque, while the local-review app declares that family but does not package an unapproved font file. A system without it falls back to Arial/Helvetica, so glyph shapes and ascenders can still vary slightly even where computed sizes match. Personalized text, privacy-safe contact/document behavior, and approved local placeholder visuals also prevent a literal pixel-for-pixel comparison.
