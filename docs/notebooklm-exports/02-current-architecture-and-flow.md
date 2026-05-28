# Veritas Compass — Current Architecture and User Flow

*NotebookLM export packet. Created 2026-05-27. Source of truth: committed repo files.*

---

## Architecture Principles

- **Static-first, no build step.** Plain HTML, CSS, and vanilla JavaScript. No npm, no bundler, no frameworks.
- **No backend.** No server, no database, no API keys in any deployed file.
- **No login or authentication.** localStorage for session state only.
- **No live AI.** No calls to external AI providers, no model routing, no document processing.
- **GitHub Pages compatible.** All asset paths are relative. Page loads without a server runtime.
- **Single HTML shell.** `index.html` is the only HTML file. All screen transitions are JavaScript-driven DOM replacement inside `#app-root`.

---

## Script Load Order (fixed — enforced by order in index.html)

```
config.js → state.js → data-loader.js → utils.js →
rules-engine.js → report-builder.js → brand-icon.js →
ui.js → app.js
```

All scripts use `?v=0.1.0` cache-busting query strings. The stylesheet (`assets/css/styles.css`) is similarly versioned.

---

## File Responsibility Map

| File | Responsibility |
|---|---|
| `assets/js/config.js` | `window.VC_CONFIG` — `appName`, `tagline`, `version`, `storageKey`, `defaultMode`, `dataPaths`, `FEATURES` flags (all `false` in v1). Loaded first. No DOM access. |
| `assets/js/state.js` | `window.VC_STATE` — `getState()`, `loadState()`, `saveState()`, `setMode()`, `setScenario()`, `setRouterResult()`, `resetState()`. All localStorage access isolated here. |
| `assets/js/data-loader.js` | `window.VC_DATA` — fetches all four JSON files on boot. Exposes `loadAll()`, `getAll()`, `getDataset()`. No routing logic. No DOM access. |
| `assets/js/utils.js` | `window.VC_UTILS` — `escHtml()`, `setText()`, `qs()`, `qsa()`, `formatCount()`. Pure helpers. No DOM rendering. No state access. |
| `assets/js/rules-engine.js` | `window.VC_RULES` — `getMaterialCategories()`, `getWorkflowRouteOptions()`, `getRecommendationLabel()`, `evaluateRouterAnswers()`. Pure routing logic. No DOM. No state writes. Returns a `RoutingResult` object. |
| `assets/js/report-builder.js` | `window.VC_REPORTS` — `buildDecisionSummaryMarkdown()`, `getSafeFilename()`, `downloadMarkdown()`. Pure computation. No DOM access except Blob download. |
| `assets/js/brand-icon.js` | `window.VC_BRAND_ICON` — `getHtml()` (landing hero SVG), `getHeaderHtml()` (compact header SVG). Pure data. No DOM access at load time. |
| `assets/js/ui.js` | `window.VC_UI` — all DOM rendering functions. Reads `VC_STATE` and `VC_DATA`. Calls `VC_RULES`. Never fetches data directly. Owns all screen transitions. |
| `assets/js/app.js` | Initialization and event wiring only. Boot sequence: `loadState()` → `VC_DATA.loadAll()` → first screen render. Loaded last. No DOM rendering functions. |

---

## Data Files

All four files live in `assets/data/`. They are configuration and content only — no executable logic.

| File | Contents |
|---|---|
| `modes.json` | Four mode definitions with `id`, `label`, `targetUser`, `description`, `layerVocabulary` (6 layers), `status`. `administrative` and `faculty-research` are `active`; `teaching-ctl` and `tool-testing` are `stub`. |
| `rules.json` | Six governance layers, two enforced rules (`no-recursive-upload`, `never-external-ai`), and all material categories with `applicableModes`, `routingRules`, and `status`. |
| `scenarios.json` | All scenarios. Two `administrative` active; one `faculty-research` active; three stubs. |
| `glossary.json` | Ten governance terms with mode-specific label overrides. |

---

## Complete User Flow (both active routes)

```
Landing screen
  → [Start with your role]
Role selector (4 mode cards)
  → [Select role]
Scenario selector (mode-filtered; active scenarios + "Describe my own material")
  → [Select scenario or custom]
Material router (questionnaire)
  Material category select
  Workflow route (what AI task?)
  Sensitivity questions:
    - Personnel / employment info?
    - Student-identifiable info?
    - Confidential institutional / legal / financial info?
    - Prior AI-generated output?
    - [faculty-research only] Human-subjects / IRB / restricted research data?
  → [Submit]
Risk result screen
  Recommendation card (restricted / safe-with-review / safe-with-attribution / safe)
  Allowed actions panel
  Blocked actions panel
  Warnings panel
  Review prompts
  Authorship and judgment checkpoint (always rendered)
  AI-Safe Packet guidance text (conditional)
  Disclaimer (always rendered)
  → [View decision summary]
Decision summary screen
  Markdown preview
  Copy Markdown / Download .md
  Session reset
  ← Back to result
```

The optional "How this works" governance reference panel is available from the landing, mode selector, and scenario selector screens. It is never a required step.

---

## Completed Modules (as of Patch F1)

- Static HTML shell and boot architecture
- Dynamic brand icon (animated astrolabe SVG; compact header variant)
- Landing screen with hook questions and CTA
- Mode selector (4 modes; administrative marked as recommended starting point)
- Optional governance reference panel (six-layer model with mode-specific vocabulary)
- Scenario selector (mode-filtered; active scenarios + custom path)
- Material router (questionnaire with validation; mode-specific research-sensitive question for faculty-research)
- Rules engine (conservative routing for administrative and faculty-research categories)
- Risk result screen (four recommendation states; allowed/blocked/warnings/review/authorship/packet guidance/disclaimer)
- Decision summary export (Markdown preview, copy, download, session reset)
- Accessibility: WCAG 2.1 AA pass (Patches 8A + 8B); keyboard navigation; ARIA; touch targets; duplicate SVG IDs resolved

---

## Browser-Tested Status

Full Administrative / Faculty Affairs path tested in browser after each patch. Faculty / Research routing logic verified programmatically (15/15 tests, Patch F1). Both routes confirmed working. Local server: `cd ~/Sites/canondesk && python3 -m http.server 8080` → `http://localhost:8080`.

GitHub Pages deployment (Patch 9) has not yet been run. Asset paths are relative and expected to be compatible.
