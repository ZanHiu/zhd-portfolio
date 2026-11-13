# Privacy and publication checklist — Phase 5B

**Build scope:** local owner review only. Passing build checks does not authorize publication.

| Check | Result | Release requirement |
| --- | --- | --- |
| Deployment or external submission | Not performed | Separate owner approval and deployment review |
| CV PDF / CV preview in `app/public` or `dist` | No | Keep excluded unless an explicitly public replacement is supplied |
| Private reference assets copied into app assets | No | Keep `reference-v8/` immutable and private |
| Project screenshots, live URLs and repositories | Not supplied; no external project links rendered | Approve every asset and destination individually |
| Professional facts | Integrated as local-review content | Owner must approve each public-facing statement |
| Contact channels | Present for local review only; rendered without external navigation | Explicit approval of every channel and destination |
| Certificates, testimonials and metrics | Not present | Require verified source and publication approval |
| Local build output | Contains owner-review personal content | Treat as private; do not upload, deploy or commit to a public repository |

Before any future release, complete the items in [CONTENT_GAPS.md](CONTENT_GAPS.md), replace local placeholders with approved assets where desired, then repeat the privacy scan and production QA.
