# Content mapping — Phase 5A preparation

## Rules applied

- This is a planning model only. `src/data/content-model.ts` is not imported by any React component.
- `private` means do not place the value in published UI, build output, public assets, links or downloadable documents.
- `review-required` means the field is CV-backed but requires explicit user approval before replacing the approved fixture.
- No project image, certificate, testimonial or new metric is inferred from the CV.

## Content field inventory

| Section | Field | Source | Destination component | Status | Image/link state |
| --- | --- | --- | --- | --- | --- |
| Global | Navigation labels, section order | existing safe fixture | `navigation.ts`, `Sidebar` | safe-fixture | n/a |
| Global | Greeting languages | reference-v8 | `GreetingLoader` | safe-fixture | n/a |
| Home | Display name | private CV identity | `HomePage › homeContent.name` | private | no replacement prepared |
| Home | Role (`Frontend Developer`) | private CV | `HomePage › lead/headline` | review-required | n/a |
| Home | Professional summary | private CV | `HomePage › homeContent.summary` | review-required | n/a |
| Home | Frontend/full-stack/workflow/product capability labels | private CV skills/summary | `HomePage › homeContent.capabilities` | review-required | n/a |
| About | Current direction | private CV | `AboutPage › current direction` | review-required | n/a |
| About | B2B SaaS/canvas/workflow summary | private CV | `AboutPage › main summary` | review-required | n/a |
| About | Work list: Riskoa/Emvide, ZHD Studio, Electro Ecommerce | private CV | `AboutPage › experience rows` | review-required | n/a |
| About | Education list: UIT AI, FPT Web Development | private CV | `AboutPage › education rows` | review-required | n/a |
| About | Contribution grid | reference decorative fixture | `AboutPage › contribution grid` | safe-fixture | no personal activity data claimed |
| Projects / 01 | Title: KPN Profile Company / Emvide | private CV + existing fixture | `ProjectsPage › projects[0]` | review-required | publishable image missing |
| Projects / 01 | Role, period, summary, stack | private CV | `ProjectsPage › dossier/description` | review-required | public URL/repository missing |
| Projects / 01 | Highlight/metric | existing fixture only | `ProjectsPage › highlight` | review-required | do not treat as CV-verified metric |
| Projects / 02 | Title: ZHD Studio | private CV | `ProjectsPage › projects[1]` | review-required | conflicts with current `Happy Agent` fixture |
| Projects / 02 | Role, period, localisation pipeline summary, stack | private CV | `ProjectsPage › dossier/description` | review-required | publishable image and live URL missing |
| Projects / 02 | Repository URL | private CV | `ProjectsPage › repositoryUrl` | review-required | do not publish until approved |
| Projects / 03 | Title: Electro Ecommerce | private CV | `ProjectsPage › projects[2]` | review-required | conflicts with current `PetaVerse` fixture |
| Projects / 03 | Role, period, e-commerce summary, stack | private CV | `ProjectsPage › dossier/description` | review-required | publishable image and live URL missing |
| Projects / 03 | Repository URL | private CV | `ProjectsPage › repositoryUrl` | review-required | do not publish until approved |
| Skills | Languages | private CV | `SkillsPage › marquee lanes` | review-required | n/a |
| Skills | Frontend frameworks/libraries | private CV | `SkillsPage › marquee lanes` | review-required | n/a |
| Skills | Backend/API tools | private CV | `SkillsPage › marquee lanes` | review-required | n/a |
| Skills | AI/workflow tools | private CV | `SkillsPage › marquee lanes` | review-required | n/a |
| Skills | General tools | private CV | `SkillsPage › marquee lanes` | review-required | n/a |
| Skills | English ability sentence | private CV | `SkillsPage › optional evidence` | review-required | n/a |
| Credentials | Work record | private CV | `CredentialsPage › professional experience` | review-required | no certificate asset supplied |
| Credentials | UIT education record | private CV | `CredentialsPage › education record` | review-required | no certificate asset supplied |
| Credentials | FPT education/GPA record | private CV | `CredentialsPage › web-development record` | review-required | no certificate asset supplied |
| Credentials | Certificate list | missing | `CredentialsPage › credential list` | missing | do not fabricate |
| Credentials | CV PDF and preview | private CV asset | `DocumentViewer` | private | never copy to `public/` |
| Guestbook | Local-demo explanation | existing safe fixture | `GuestbookPage › intro` | safe-fixture | n/a |
| Guestbook | Seeded notes/testimonials | missing | `GuestbookPage › message list` | missing | none supplied; do not invent |
| Contact | Email | private CV | `ContactPage`, `Header` | private | retain safe placeholder until approved |
| Contact | Phone | private CV | `ContactPage` | private | no public value prepared |
| Contact | Ho Chi Minh City location | private CV | `ContactPage › location` | review-required | no map/address provided |
| Contact | LinkedIn | private CV | `ContactPage`, `Header` | private | do not publish until approved |
| Contact | GitHub | private CV | `ContactPage`, `Header` | private | do not publish until approved |
| Contact | Resume | private CV asset | `ContactPage › resume` | private | no public resume link |

## Existing-fixture conflicts requiring a decision

1. The second project is named `Happy Agent` in the approved React fixture but `ZHD Studio` in the private CV.
2. The third project is named `PetaVerse` in the approved React fixture but `Electro Ecommerce` in the private CV.
3. Existing project external URLs/repositories are fixture values, not approval to publish CV links.
4. The CV contains personal contact channels. They remain redacted in the model and must not replace the safe placeholders without consent.

## Proposed later integration boundary

After explicit review, a future content-only implementation may select approved `review-required` fields from `preparedContent` and map them into the existing typed fixture modules (`home.ts`, `projects.ts`, `skills.ts`, `credentials.ts`, `contact.ts`). It must not change layout, animation ownership, route architecture, or document-viewer privacy policy without a separate approval.
