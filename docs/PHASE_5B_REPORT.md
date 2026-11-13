# Phase 5B report — Local Content Integration

**Status:** complete for local owner review. No deployment, publishing, external submission, or public release was performed.

## Delivered

- Replaced fixture identity with **Nguyen Van Hieu — Frontend Developer** and CV-supported React/TypeScript, complex-interface, and full-stack-side-project focus.
- Moved factual content into typed modules: `profile.ts`, `home.ts`, `projects.ts`, `skills.ts`, `credentials.ts`, and `contact.ts`. Updated `content-model.ts` to record the final Phase 5B local-review provenance and the owner-approved project order.
- Integrated Riskoa Ltd / Emvide experience; UIT and FPT Polytechnic education; the three approved projects; verified skills across the existing four marquee lanes; and local-only contact records.
- Kept project images as explicitly labelled CSS local visual placeholders. No live demos, repositories, private company material, CV assets, certificates, metrics, testimonials, or fictional contact destinations were added.
- Preserved AppShell, router, transitions, cursor engine, greeting/headline animation, spline, marquee, project explorer, document viewer, and guestbook architecture. Contact links are deliberately inert during local review.

## Files changed

### Application

- `app/src/data/profile.ts` (new)
- `app/src/data/content-model.ts`
- `app/src/data/home.ts`
- `app/src/data/projects.ts`
- `app/src/data/skills.ts`
- `app/src/data/credentials.ts`
- `app/src/data/contact.ts`
- `app/src/pages/HomePage.tsx`
- `app/src/pages/AboutPage.tsx`
- `app/src/pages/ContactPage.tsx`
- `app/src/pages/contact-local.module.css` (new)
- `app/src/features/home/RotatingHeadline.tsx`
- `app/src/features/projects/ProjectPreview.tsx`
- `app/src/components/layout/Header.tsx`

### Documentation and evidence

- `docs/CONTENT_GAPS.md` (new)
- `docs/PRIVACY_PUBLICATION_CHECKLIST.md` (new)
- `docs/phase-5b-screenshots/*.png`
- `docs/phase-5b-screenshots/browser-checks.json`
- `docs/phase-5b-screenshots/browser-smoke-1440.json`

`reference-v8/` was not modified.

## CV fields integrated

| Section | Integrated local-review content |
| --- | --- |
| Home | Name, Frontend Developer title, professional focus, content-aware headline/capability copy |
| About | Riskoa Ltd / Emvide role, period, UK remote team, LCA/carbon-footprint context; UIT and FPT education and CV-supported GPA |
| Projects | Emvide, ZHD Studio, Electro Ecommerce in the owner-approved order; verified descriptions and stacks only |
| Skills | Languages/frontend, backend/API/data, AI/workflow, and tools/delivery in four existing lanes |
| Credentials | Work and education records, explicitly not represented as certificate documents |
| Guestbook | Existing empty, bounded local-only demo preserved; no seeded testimonials |
| Contact | CV-backed email, phone, location and LinkedIn display for local review; no external navigation |

## Missing assets and links

There are no approved project screenshots, public live URLs, repository URLs, certificate assets or public CV asset. The project previews therefore remain labelled local placeholders. Contact publication consent is also absent. The complete release blockers are in [CONTENT_GAPS.md](CONTENT_GAPS.md).

## QA and screenshot evidence

At 1918 × 906, all seven routes were checked with viewport-height body layout and `overflow: hidden`: Home, About, Projects, Skills, Credentials, Guestbook, and Contact. Projects selection selected ZHD Studio and Next selected Electro Ecommerce; the document viewer opened with focus on its toolbar, cursor lock active, and closed with Escape. This evidence is recorded in `browser-checks.json`.

Fresh browser smoke at 1440 × 900 navigated all seven routes after the final content integration: each retained `bodyHeight: 900`, `viewport: 900`, `overflow: hidden`, and reported no console errors. Screenshots are:

- `home-1440x900-dpr1.png`
- `about-1440x900-dpr1.png`
- `projects-1440x900-dpr1.png`
- `skills-1440x900-dpr1.png`
- `credentials-1440x900-dpr1.png`
- `guestbook-1440x900-dpr1.png`
- `contact-1440x900-dpr1.png`

The 1918 × 906 capture set is stored alongside them. The older 1918 console log contains Vite hot-reload and favicon noise produced while files were being edited; it is not used as final clean-console evidence. The final 1440 smoke log is clean.

Visual review found no frame clipping or body-scroll regression from the longer approved text. Differences from Phase 4 are intentional: owner identity, longer factual project titles/descriptions, local-only contact labels, and explicit placeholder provenance. No visual redesign or animation timing change was made.

## Automated checks

| Command | Result |
| --- | --- |
| `npm.cmd run typecheck` | Pass |
| `npm.cmd run lint` | Pass |
| `npm.cmd run test` | Pass — 3 files, 6 tests |
| `npm.cmd run build` | Pass |

## Privacy scan

- No CV PDF or preview was copied into `app/public`, source assets, or build output.
- No private reference asset, unapproved project URL, repository URL, certificate, testimonial, or metric was introduced.
- The built local-review application does include owner-approved-for-local-review personal contact information. It must be treated as private and is **not safe to publish**.
- No deployment was performed.

## Remaining issues and review request

Approve or replace the local visual placeholders, project destinations, public contact channels, and any CV/public-document policy before a release-oriented phase. Review the local personalized content and the release blockers in [CONTENT_GAPS.md](CONTENT_GAPS.md) and [PRIVACY_PUBLICATION_CHECKLIST.md](PRIVACY_PUBLICATION_CHECKLIST.md). Phase 5C, deployment, SEO work, and redesign have not begun.
