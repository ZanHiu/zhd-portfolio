# Repository restructure report

**Status:** complete for local developer handoff. No Phase 5C work, design/content change, deployment, publishing, Git initialization, commit, or remote push was performed.

## Locations

| Item | Original location | New standalone location |
| --- | --- | --- |
| Handoff package | `D:\SideProject\zhd-porfolio\ZHD-Portfolio-React-Codex-Handoff-v1` | Retained unchanged |
| React application root | `...\ZHD-Portfolio-React-Codex-Handoff-v1\app` | `D:\SideProject\zhd-porfolio\zhd-portfolio` |
| Reference baseline | `...\ZHD-Portfolio-React-Codex-Handoff-v1\reference-v8` | `...\zhd-portfolio\reference` |
| Documentation | `...\ZHD-Portfolio-React-Codex-Handoff-v1\docs` | `...\zhd-portfolio\docs` |
| Developer scripts | `...\ZHD-Portfolio-React-Codex-Handoff-v1\scripts` | `...\zhd-portfolio\scripts` |

The destination did not exist before work began. The original handoff folder was copied, not deleted or altered.

## File movement summary

- Copied `app/src/` to `src/`, `app/public/` to `public/`, and the application root configuration (`package.json`, lockfile, Vite, TypeScript, ESLint, and `index.html`) to the new root.
- Copied `docs/` and `scripts/` without changing their evidence files.
- Copied immutable `reference-v8/` to `reference/`. It contains 23 local baseline files, including private CV/PDF material, and is excluded from Git.
- Did **not** move or copy the old `node_modules/`, `dist/`, `.npm-cache/`, TypeScript build-info files, or generated Vite config artifacts. The new project created its own ignored dependency/build/cache directories during verification.
- Source and public-file SHA-256 comparison between the old app and new root reported **0 differences**.

## Configuration and documentation changes

- Renamed the package to `zhd-portfolio` in `package.json` and `package-lock.json`.
- Added `npm run preview` and `npm run visual:diff`; the latter runs `scripts/visual-diff.mjs` from the new root.
- Updated current architecture/content/asset documentation to point to `src/`, `public/`, `scripts/`, and `reference/`. Historical phase reports retain their former `app/` wording as historical evidence; Phase 4's active redirect link now resolves to `public/_redirects`.
- Replaced the root README with beginner-oriented setup, script, architecture, editing, animation, testing, privacy, troubleshooting, and status documentation.
- Rewrote `AGENTS.md` for the root-level layout and preserved fidelity, motion, strict-TypeScript, component-ownership, testing, privacy, and no-fabrication requirements.
- Expanded `.gitignore` for dependencies, build/caches, environment files, the private `reference/` baseline, and local screenshot/diff/recording evidence.

## Git and privacy findings

- Neither the original handoff folder nor its parent was a Git repository. There was no Git status, remote, tracked-file set, or history to preserve. The new project was deliberately **not** initialized as a Git repository.
- `public/` and `dist/` contain **0** files named as a CV or PDF; source/public/build scans contain **0** reference/CV path matches.
- The built JavaScript contains the local-review contact data by design. It is therefore private and **must not be deployed, uploaded, or committed to a public repository**.
- No private CV/PDF was copied into publishable assets. `reference/` is local-only and ignored. See [PRIVACY_PUBLICATION_CHECKLIST.md](PRIVACY_PUBLICATION_CHECKLIST.md) and [CONTENT_GAPS.md](CONTENT_GAPS.md).

## Commands executed from the new root

```text
npm.cmd ci
npm.cmd ci --cache .npm-cache --no-audit --no-fund
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run test
npm.cmd run build
npm.cmd run dev -- --host 127.0.0.1
npm.cmd run visual:diff -- docs/phase-4-reference/home-1918x906-dpr1.png docs/phase-4-react/home-1918x906-dpr1.png docs/repository-restructure-screenshots/visual-diff-smoke
```

The first `npm ci` failed because Windows denied access to the shared user npm cache (`EPERM`). The retry used the project's local ignored `.npm-cache` and succeeded, installing 233 packages from the lockfile.

## Results

| Check | Result |
| --- | --- |
| Clean locked dependency install | Pass on local-cache retry |
| Strict TypeScript | Pass |
| ESLint | Pass, zero warnings |
| Vitest | Pass — 3 files, 6 tests |
| Production build | Pass — 76 transformed modules |
| Root Vite startup | Pass — `http://127.0.0.1:5173/` |
| Direct requests for all seven routes | Pass — HTTP 200 for `/`, `/about`, `/projects`, `/skills`, `/credentials`, `/guestbook`, `/contact` |
| SPA redirect build artifact | Pass — `dist/_redirects` contains `/* /index.html 200` |
| Root visual-diff script | Pass — generated JSON/PPM smoke diff from preserved Phase 4 captures |
| Source/public preservation | Pass — 0 SHA-256 differences from the old application files |
| Private asset exposure scan | Pass — no CV/PDF/reference path in `src/`, `public/`, or `dist/` |

## Browser verification limitation

Chrome was available locally, but two fresh headless capture attempts at the requested 1918×906 and 1440×900 viewports failed before page rendering because Chrome's GPU process crashed in the sandboxed Windows environment. No screenshot or console-clean claim is made for this restructure run. The prior verified Phase 5B screenshots and browser evidence were preserved in `docs/` as local evidence.

Because application source and public files are byte-identical to the approved Phase 5B app, previously verified transition, cursor, spline, Projects Explorer, Skills Marquee, Document Viewer, guestbook, history and interaction behavior is preserved by the restructure. It was not re-exercised through browser input in this run; perform the manual checklist below once the local Chrome environment is healthy.

## Known issues

1. The local build contains local-review personal data and is not publication-ready.
2. Chrome headless GPU sandbox failure prevented new viewport screenshots and interaction/console capture during this task.
3. Direct-route rewrite support is supplied for Netlify-compatible static hosting only; any future host needs an equivalent rewrite rule.
4. The `reference/` baseline is deliberately ignored, so a future private source-control workflow must explicitly choose a secure storage policy rather than force-adding it.

## Open and run the standalone project

```powershell
Set-Location 'D:\SideProject\zhd-porfolio\zhd-portfolio'
npm ci --cache .npm-cache --no-audit --no-fund
npm run dev
```

Open the Vite URL printed in PowerShell (normally `http://localhost:5173/`). Stop it with `Ctrl+C`.

Before a later release-oriented phase, repeat browser QA at 1918×906 and 1440×900: direct routes, Back/Forward, rapid sidebar navigation, transition recovery, cursor/aim targets, Home motion, project selection, marquee pause/continuity, viewer keyboard controls and guestbook persistence. Do not begin Phase 5C without owner approval.
