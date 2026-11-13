# Current v8 source audit (code-derived facts)

The provided baseline is a **vanilla HTML/CSS/JavaScript** page in `reference/index.html` with multiple CSS and JS files, not a React project. Sources include:

| File | Responsibility observed in source | Migration destination |
|---|---|---|
| `index.html` | Static shell, 7 pages, modal markup, buttons and cursor elements | React app shell/pages/components |
| `styles.css`, `override.css`, `p0.css`, `p1.css`, `cursor-v7.css`, `v8.css` | Accumulated UI + motion + cursor layers | Shared design tokens + component styles, progressively consolidated |
| `script.js` | Project data, dynamic project content, modal/CV, credential records, guestbook, greeting and clock | Typed fixtures, hooks, services, React components |
| `p0.js` | `SELECTORS` for 7 chapters; captures hash-anchor clicks; black staircase transition mask; home curve animation + headline rotator | App router + transition coordinator + animated Hero |
| `p1.js` | Stack marquee and delegated PDF zoom actions | SkillsMarquee and DocumentViewer |
| `cursor-v7.js` | Dual-layer cursor: free rotating reticle, ghost pointer, target brackets; modal targeting rule; requestAnimationFrame | CursorProvider + CursorLayer + target detection utilities |
| `assets/Nguyen-Van-Hieu-CV.pdf`, `assets/Nguyen-Van-Hieu-CV-preview.png` | Personal résumé and 1-page preview | Private/reference fixture; do not deploy without user approval |

## Verified by source inspection — NOT by browser QA
- `p0.js` uses captured hash links, replaces history state, serializes transitions with a `busy` flag and latest `pending` request, animates staircase clip-path with a manually scheduled rAF loop and waits during overlay hold. It does **not** itself prove runtime reliability.
- `cursor-v7.js` uses `document.elementsFromPoint()` and filters hidden/oversize elements; it suppresses background targets while modal is open, and separately tracks a small precise pointer dot and delayed free reticle.
- `script.js` builds markup strings via `innerHTML` for project previews and modal content; guestbook uses `localStorage` and text nodes for submitted messages.
- Current CV viewer uses a locally rendered PNG, not a live PDF.js viewer. Zoom acts by changing rendered image width; the original PDF remains openable.
- Home uses SVG path mutation, text rotation and a timed multilingual loader.

## Architectural hazards to investigate
- Layered style overrides make cascade behavior difficult to reason about.
- Multiple timing systems (`requestAnimationFrame`, `setInterval`, `setTimeout`) need single lifecycle ownership and cleanup.
- Hash navigation, overlay timing and active section state need one React source of truth.
- Naïvely porting interval/DOM event code into component bodies can duplicate listeners under React Strict Mode.
- `innerHTML`-based rendering should be replaced with typed JSX, with special care for links and text escaping.
- Motion-heavy fixed viewport may need desktop-only constraints and a mobile accessibility fallback.

## Browser validation still required
Do not interpret code-level inspection as evidence of correct geometry, cursor feel, 100% visual match, transition speed, overlay recovery, or modal focus behavior.
