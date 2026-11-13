# Content and asset strategy

The user has deliberately postponed personalization while pursuing UI/animation fidelity. Current v8 contains a mix of reference-style text, demo project names and previously supplied CV data. Preserve as **non-final fixtures**, not verified production content.

- Extract navigation labels, projects, skills, credentials, greeting languages and social links into typed data modules.
- Use local assets only. `reference/assets/Nguyen-Van-Hieu-CV.pdf` and its PNG preview are **personal material**; never copy them into `public/`. Before production deployment, replace with a safe demo PDF or request consent to publish.
- Avoid linking real original author's personal accounts in a future ZHD site. Replace with safe placeholders after user review.
- Content replacement should require editing data/config, not rewriting React components or animation logic.
- Font/icon source must be documented and licensed. Inspect computed font family in original baseline; when no font files exist or style cannot be established, record the approximation instead of claiming an exact match.
- No unofficial third-party repository or asset copying without permission.
