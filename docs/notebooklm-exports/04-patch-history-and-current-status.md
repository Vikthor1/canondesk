# Veritas Compass — Patch History and Current Status

*NotebookLM export packet. Created 2026-05-27. Source of truth: committed repo files and docs/session-status.md.*

---

## Current State (2026-05-27)

- **Latest committed patch:** Patch F1 — Minimal Faculty / Research Secondary Route (commit `cff9da8`)
- **Branch:** `main`, up to date with `origin/main`, working tree clean
- **Next intended task:** Patch 9 — GitHub Pages deployment readiness
- **Active routes:** Administrative / Faculty Affairs (primary) + Faculty / Research (secondary)
- **Scaffolded routes:** Teaching / CTL, Tool Testing / AI Sandbox

---

## Compressed Patch History

### Week 1 — Data Layer (2026-05-26, Sessions 1–2)

- Repo created: `https://github.com/Vikthor1/canondesk` (private)
- Four JSON data files created: `modes.json`, `rules.json`, `scenarios.json`, `glossary.json`
- Mode 3 (Administrative) fully defined; Modes 1/2/4 stubbed
- Product named **Veritas Compass** (locked 2026-05-26; former provisional name: CanonDesk)
- Obsidian project memory layer initialized: `/Users/Victor1/Documents/Obsidian/Projects/CanonDesk/`

### Patch 1 — Static Shell and Boot Architecture (Session 3)

Created: `index.html`, `styles.css` (design tokens), `config.js`, `state.js`, `data-loader.js`, `app.js`. Boot screen renders data counts from JSON. JSON meta blocks updated to `workingName: "Veritas Compass"`.

### Pre-Patch-2 Architectural Stress Test (Session 4)

Decisions recorded: governance layer map reclassified as optional reference panel; module boundary established (`utils.js`, `ui.js`, `app.js`); Workflow Route concept added to future roadmap; authorship/judgment to be addressed via result screen prompts.

### Patch 2 — Landing Screen + Mode Selector + State Persistence (Session 5)

Created: `utils.js`, `ui.js`. Boot screen replaced with real landing screen, mode selector, and localStorage-persisted mode state. `app.js` refactored to initialization-only.

### Patch 3 — Governance Reference Panel (Session 6)

Optional "How this works" expandable panel showing all six governance layers with mode-specific vocabulary. Available from landing and mode selector. Never a required step. Focus management wired.

### Patch 4 — Scenario Selector (Session 7)

Mode-filtered scenario cards. Two administrative scenarios active. Non-admin modes show scaffold notice. "Describe my own material" always available. Mode 3 marked as recommended starting point.

### Patch 5 — Material Router and Rules Engine (Session 9)

Created: `rules-engine.js`. Six-question router form. Conservative routing cascade. No-recursive-upload guard. All four administrative material categories routing correctly.

### Patch G0 — AI-Safe Packet Gate Architecture Documentation (Session 8)

Documentation only — no code. Created `docs/future-ai-safe-packet-gate.md`. Established: AI-Safe Packet Gate is deferred; three implementation tiers defined; router result screens may include guidance text only.

### Patch 6 — Risk Result Screen (Session 10)

Full polished result screen replacing interim. Four recommendation states (restricted / safe-with-review / safe-with-attribution / safe). Allowed/blocked/warnings/review panels. Authorship checkpoint. Disclaimer. All states distinguishable without color.

### Patch 7 — Decision Summary Export (Session 11)

Created: `report-builder.js`. Markdown decision summary. Copy to clipboard. Download .md. Session reset with confirm prompt. "View decision summary" button on result screen.

### Patch V1 — Dynamic Brand Icon (Session 12)

Created: `brand-icon.js`. Animated astrolabe SVG icon on landing screen. All SVG IDs prefixed `vc-` to avoid collisions. `prefers-reduced-motion` support.

### Patch V1B — Brand Hierarchy Refinement (Session 12)

Compact header icon (`getHeaderHtml()`). `body.is-landing` class suppresses duplicate branding on landing. Header brand reappears on all subsequent screens. SVG ID conflicts fully resolved.

### Patch 8A — Accessibility and UX Audit (Session 13, implied)

WCAG 2.1 AA pass. Full audit of all screens. Identified issues recorded as Patch 8B targets.

### Patch 8B — Accessibility, UX, and Polish Remediation (Session 13)

- Dev-facing copy removed from mode badge, scenario badge, stub notices
- Duplicate SVG IDs eliminated (separate `SVG_INNER_HDR` for header variant)
- Touch targets: all `.btn` elements meet 44×44 CSS px via `inline-flex` + `min-height`
- Governance panel focus management corrected
- Landing banner height fixed
- All hard-coded app name strings replaced with `config.appName`
- Clipboard confirm message standardized
- Obsolete interim result CSS removed (~90 lines)
- Governance panel intro uses mode-specific `layerVocab`
- Cache-busting `?v=0.1.0` added to all 9 script tags and stylesheet

*End of Patches 1–8B. Full Administrative / Faculty Affairs demo path working end-to-end.*

### Patch F1 — Minimal Faculty / Research Secondary Route (Session 14, commit `cff9da8`)

**What was added:**
- `faculty-research` mode status: `stub` → `active`
- New active scenario `faculty-research-abstract-grant`: "Preparing a Research Abstract or Grant Narrative with AI Assistance"
- Five active Faculty / Research material categories: `published-scholarship`, `own-unpublished-draft`, `coauthored-unpublished-material`, `grant-proposal-or-fellowship`, `human-subjects-or-irb-material`
- `rules-engine.js` extended: `hasResearchSensitive` guard; five Faculty routing branches
- `ui.js` extended: mode guard widened to include `faculty-research`; research-sensitive fieldset (mode-conditional); badge detection updated; stub notices updated
- Co-authored unpublished material: restricted by default; no consent-gate UI (kept simple)
- `report-builder.js` unchanged — already generic, works for all modes

**Files changed:** `modes.json`, `rules.json`, `scenarios.json`, `rules-engine.js`, `ui.js`, `session-status.md`

---

## Upcoming Patch Plan

| Patch | Purpose | Status |
|---|---|---|
| Patch 9 | GitHub Pages deployment readiness — verify relative paths, test live URL on Chrome and Safari | Next |
| Patch 10 | Faculty Affairs demo script (`docs/demo-script.md`) — non-technical walkthrough for presenter | Planned |

---

## Known Doc / Config Drift

| Item | Current state | Status |
|---|---|---|
| Tagline in `config.js` | "Your true north for privacy, authorship, and academic judgment." | Authoritative live value |
| Tagline in `project-brief.md`, `modes.json` meta | "An AI workflow guide for privacy, authorship, and academic judgment" | Stale — cosmetic drift only |
| `modes.json` meta `brandingStatus` | `"active-name-repo-pending"` | Not updated since Patch 1; cosmetic |
| Repo / folder name | `canondesk` | Public product is Veritas Compass; rename deferred until before public launch |

---

## Git / Repo Conventions

| Field | Value |
|---|---|
| Public app name | Veritas Compass |
| Former provisional name | CanonDesk (never shown in UI; `formerWorkingName` in config.js) |
| Repo name | `canondesk` |
| Local folder | `~/Sites/canondesk/` |
| Branch | `main` |
| Remote | `https://github.com/Vikthor1/canondesk` (private) |
| Commit naming | `feat:` for new features, `fix:` for patches, `docs:` for documentation |
| Co-author tag | `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` |
