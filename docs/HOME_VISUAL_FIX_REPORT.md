# Home Visual Fix Report

## Result

The Home application frame now has one authoritative, continuous rounded border. Hero typography follows the measured live reference at the primary desktop sizes, and a short-height desktop rule prevents the Hero from reaching the anchored Capability Map.

## Changes made

| File | Change |
| --- | --- |
| `src/styles/tokens.css` | Set the frame layer above chrome (`--z-frame: 3`) while retaining the existing frame geometry and radius. |
| `src/components/shell/shell.module.css` | Kept `OuterFrame` as the only outer-border owner and made its box model explicit. No new border, shadow, pseudo-element, or overlay was added. |
| `src/pages/home.module.css` | Restored curve presentation, Home typography values, capability panel geometry, and a compact desktop-height rule. |
| `.gitignore` | Keeps `docs/home-visual/` local-only because captures render owner-review data. |
| `docs/HOME_VISUAL_AUDIT.md` | Records the baseline, root cause, pixel samples, and measurements. |

## Required answers

1. **Why did the outer frame appear uneven?** Header and Sidebar background layers (z=2) covered `OuterFrame` (z=1) along the top and left. Their own borders were internal dividers, not replacements for the frame.
2. **Which element owns the border now?** `OuterFrame` alone. It is `pointer-events: none`, has the existing one-pixel border and 16px radius, and paints at z=3 above internal paper surfaces.
3. **How was consistency verified?** Matching 3x close-ups of all corners plus top/bottom/left/right straight segments were captured at 1440x900/DPR1. After samples are `180–181` RGB on every side, versus pre-fix top/left values of `227` and `217`; thickness is three captured pixels, i.e. one CSS pixel.
4. **Which typography values were corrected?** H1 max `112px -> 105px` for 1918px parity; descriptor `800/1.1 -> 650/1.08`; eyebrow `11px mono/700/tracked -> 14px sans/650/normal`; H1 remains `93.6px/800` at 1440px as measured from the original.
5. **How was overlap resolved?** The reference layout is retained at normal desktop height. At max-height 820px, the hero uses smaller, intrinsic content values and the panel uses its compact anchored form. Measured 1900x754 gap changed from `-95.42px` to `+18.98px`, without negative margins, clipping, or JavaScript layout control.
6. **What remains different?** Local font fallback can affect glyph rendering; personalized content and privacy-safe placeholders deliberately differ from the original.

## Visual evidence

The following local-only artifacts were produced under `docs/home-visual/`:

- Live original and React Home captures at 1440x900 and 1918x906.
- React after capture at 1900x754 for the short-height condition.
- Before/after close-ups for all four rounded corners and all four straight border segments.
- Reproducible diff maps:

| Diff | Mean absolute channel error | Changed channels over threshold |
| --- | ---: | ---: |
| Controlled before -> after, 1440x900 | 5.976 | 5.473% |
| Controlled before -> after, 1918x906 | 10.172 | 8.083% |

These are change measurements, not a claim of absolute parity; animated splines and personalized content intentionally affect pixels.

## Validation

| Check | Result |
| --- | --- |
| `npm.cmd run typecheck` | Passed |
| `npm.cmd run lint` | Passed with zero warnings |
| `npm.cmd run test` | Passed: 3 files, 6 tests |
| `npm.cmd run build` | Passed: 76 modules transformed |
| All seven routes direct-loaded at 1440x900 | Passed; each expected heading rendered |
| DevTools error/exception monitor across all routes | Passed; 0 events |
| Desktop body scrolling | Disabled at 1440x900, 1918x906, and 1900x754 |
| Home cursor/aim target | Passed; custom cursor ready and aim frame locked on the Home Projects action |
| Transition + rapid navigation | Passed; Projects route completed, rapid navigation settled at Contact with overlay hidden |
| Back/Forward | Passed: Back to Skills, Forward to Contact |

No deployment, publishing, push, content change, private-asset exposure, or `reference/` modification was performed. Phase 5C was not started.
