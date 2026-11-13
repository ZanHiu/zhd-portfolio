# Behavior contract — preserve existing v8, fix only demonstrated defects

## Global shell
- Visual system: light gray paper surface and dotted matrix including outer margin, rounded frame, thin borders, fixed header/sidebar/footer with main canvas.
- No body/page scrolling on desktop. Only intended nested lists/panels scroll. Sidebar is the primary route navigation, not a fullscreen Index screen.
- Section ids: `home`, `about`, `projects`, `skills`, `credentials`, `guestbook`, `contact`.
- Direct deep-link and browser Back/Forward work. Active sidebar highlights route; no mismatch after rapid clicks.

## Multilingual greeting
- Intro cycles through multiple languages; no layout shift (reserve fixed height/width for greeting and progress indicator). Avoid retriggering on every route unless baseline does so. May offer skip for accessibility.

## Cursor: dual-layer system
- On fine-pointer devices, native cursor hidden **only when** custom cursor is mounted and functioning; native fallback otherwise.
- Small low-opacity ghost pointer tracks precise physical position; rotating/free reticle lags slightly with inertia and subtle grid influence.
- On hover over interactive block (including Project list, dossier controls, sidebar, toolbar, modal buttons), the four-corner aim frame expands toward target element bounding box. Ghost pointer stays inside at actual pointer location.
- No doubled reticles. Hovering modal must NOT target inert backdrop controls. Both cursor layers remain available inside document viewer including its scrollable preview area where possible.
- Reticle resets after mouseleave/blur, transitions and modal close. Suppress on touch; respect reduced motion.

## Screen transitions (highest risk)
- Entire **app** has continuous black grid wipe with a stair-step edge, not independent vertical strips. Overlay covers header, sidebar and main; content switches only when covered.
- Section title and index are visible on the dark transition for a deliberate hold. Avoid too-fast unreadable transition or stuck black screen.
- One state machine: `idle → covering → titleHold → swap → revealing → idle`; latest destination wins if clicked during transition. Every completion/error path clears overlay and frees navigation.
- Back/Forward and direct route must not skip content or leave overlay stuck. Honor reduced motion.

## Home
- Multiple independent animated spline paths are **time-driven**, optionally adding pointer parallax; not merely static paths moving on hover.
- Rotating headline transitions between descriptors without pushing layout; capability map remains aligned and accessible.

## Projects
- Left project list with active state; central dossier changes title, image/preview and descriptions; right metadata panel. Independent scroll regions where needed.
- Prev/Next and project click produce coherent updates; active reticle works for individual rows, preview and action buttons.
- No invented real project claims; current contents are fixture text to be replaced separately later.

## Skills
- Marquee badges continuously move (some alternate directions) with seamless loops; no visible seam or jump. Hover behavior must follow baseline. All badge icons aligned and legible.
- Reduced motion should pause or render static lists without content loss.

## Credentials and CV
- Document viewer with toolbar, zoom in/out/reset, open link, close/maximize and scroll; current v8 uses raster PNG preview plus original PDF link. Preserve these first; optionally introduce PDF.js in a separately approved enhancement.
- ESC closes, backdrop closes if expected, proper focus management, return focus to trigger, no cursor disappearance inside preview.
- Keep fake text-based credentials explicitly identifiable as demo summaries rather than official certificates.

## Guestbook, language and toolbar
- Guestbook demo persists locally and never implies server storage. Inputs use visible focus and keyboard entry; prevent XSS.
- Toolbar: valid language icon/chevron and social SVG; consistent icon stroke and focus/hover target bounds. Don't invent an operational translation system if reference only animates greeting.
