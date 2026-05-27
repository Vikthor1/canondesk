# Veritas Compass — Session Status

*Last updated: 2026-05-27*

---

## Patch 2 — Landing Screen + Mode Selector + State Persistence (2026-05-27 — Session 5)

**Status:** Complete. Exit criterion met.

| File | Action |
|---|---|
| `assets/js/utils.js` | Created — `window.VC_UTILS`: `escHtml`, `setText`, `qs`, `qsa`, `formatCount` |
| `assets/js/ui.js` | Created — `window.VC_UI`: `renderLandingScreen`, `renderModeSelector`, `renderAppShellError` |
| `assets/js/app.js` | Refactored — initialization and event wiring only; `renderBootScreen` removed; helpers moved to `VC_UTILS` |
| `assets/css/styles.css` | Extended — landing screen, hook questions, CTA buttons, mode grid, mode cards, error screen, responsive |
| `index.html` | Updated — `utils.js` and `ui.js` added to script load order before `app.js` |

**Script load order after Patch 2:**
`config.js → state.js → data-loader.js → utils.js → ui.js → app.js`

**Module boundary established:**
- `utils.js` — pure helpers, no DOM rendering, `window.VC_UTILS`
- `ui.js` — all DOM rendering, reads `VC_STATE` and `VC_DATA`, `window.VC_UI`
- `app.js` — initialization and event wiring only

**Mode selector:** Renders all four mode cards from `DATA.modes.modes`. Administrative mode visually distinguished with "Faculty Affairs demo path" badge and amber top border. Selected mode persists to localStorage via `VC_STATE.setMode()`.

**Landing screen:** Shows app name, tagline, description, three hook questions, "Start with your role" CTA, disabled "How this works" placeholder (Patch 3), and disclaimer.

**Next patch:** Patch 3 — Governance Reference Panel (optional, accessible via "How does this work?" link).

---

## Pre-Patch-2 Architectural Stress Test (2026-05-27 — Session 4)

**Status:** Complete.

**Verdict:** Proceed with modifications.

**Decisions recorded before Patch 2 implementation:**
- Governance / layer map reclassified as optional reference panel; removed from mandatory user path.
- Patch 2 scope revised to: Landing Screen + Mode Selector + State Persistence (replaces developer boot screen).
- Shared utilities module (`assets/js/utils.js`) and rendering module (`assets/js/ui.js`) established as module boundary; `app.js` becomes initialization and event wiring only; `renderBootScreen` removed from `app.js`.
- Workflow Route concept added to plan: a future router dimension ("What are you trying to use AI for?") that preserves the authorship and academic judgment promise without becoming a multi-LLM orchestration system.
- Authorship and academic judgment addressed minimally in the risk result screen (Patch 6) via two plain-language prompts.

**Next patch:** Revised Patch 2 implementation (Landing Screen + Mode Selector + State Persistence + utilities/module boundary).

---

## Current Phase: Week 2 — Patch 1 Complete

### Patch 1 — Static Shell and Boot Architecture (2026-05-27 — Session 3)

**Status:** Complete. Exit criterion met.

| File | Action |
|---|---|
| `index.html` | Created — semantic HTML shell, skip link, header, main, footer, disclaimer area, script load order |
| `assets/css/styles.css` | Created — design tokens (spacing, type, radius, shadows, risk colors), base reset, header/main/footer layout, card, status, button, responsive |
| `assets/js/config.js` | Created — `window.VC_CONFIG` with appName, tagline, version, storageKey, defaultMode, dataPaths, FEATURES flags |
| `assets/js/state.js` | Created — `window.VC_STATE` with getState, loadState, saveState, setMode, patch, resetState; localStorage isolated here |
| `assets/js/data-loader.js` | Created — `window.VC_DATA` with loadAll, getAll, getDataset; fetch + error handling; no DOM access |
| `assets/js/app.js` | Created — DOMContentLoaded boot sequence; populates header/footer from config; renders boot status screen with counts, active mode, disclaimer, reset button |
| `assets/data/modes.json` | Meta updated: appName, formerWorkingName, tagline, brandingStatus: active-name-repo-pending |
| `assets/data/rules.json` | Meta updated: same pattern |
| `assets/data/scenarios.json` | Meta updated: same pattern |
| `assets/data/glossary.json` | Meta updated: same pattern |

**JSON validation:** All four files valid (python3 json.load).

**Boot screen renders:**
- App name and tagline from `VC_CONFIG` (never hard-coded in JS/HTML rendering logic)
- Boot status: success or error message
- Active mode ID from `VC_STATE`
- Data counts: 4 modes, 7 material categories, 5 scenarios, 10 governance terms
- Disclaimer text
- Reset button (clears localStorage, re-renders)

**Script load order:** `config.js → state.js → data-loader.js → app.js`

**To test locally:**
```
cd ~/Sites/canondesk && python3 -m http.server 8080
# Open: http://localhost:8080
```

**Patch 2 — Mode Selector and State Persistence**
Next session: create `assets/js/ui.js` (mode selector render function), extend `app.js` to route to mode selector, extend `styles.css` with mode card components, wire mode selector screen container in `index.html`. Persist mode selection to localStorage. Mode 3 visually distinguished.

---

## Current Phase (prior): Week 1 — Data Layer Complete

### Scaffolding (2026-05-26 — Session 1)

| File | Status |
|---|---|
| `~/Sites/canondesk/` | Created — confirmed separate from Tu Pana |
| `README.md` | Created |
| `SYSTEM_MEMORY.md` | Created (local only, not for git) |
| `docs/session-status.md` | Created (this file) |
| `docs/project-brief.md` | Created |
| `docs/ai-scholar-architecture-roadmap.md` | Created — full roadmap |
| `.gitignore` | Created |
| GitHub repo | Created and pushed: https://github.com/Vikthor1/canondesk (private) |
| Obsidian layer | Initialized: `/Users/Victor1/Documents/Obsidian/Projects/CanonDesk/` (6 notes) |

### Week 1 Data Layer (2026-05-26 — Session 2)

| File | Status |
|---|---|
| `docs/mvp-checkpoint.md` | Created — lean August MVP scope definition |
| `assets/data/modes.json` | Created — all 4 modes; Mode 3 fully defined, Modes 1/2/4 stubbed |
| `assets/data/rules.json` | Created — 6 layers + 4 Mode 3 material categories active; 3 stub categories |
| `assets/data/glossary.json` | Created — 10 governance terms with mode-specific label overrides |
| `assets/data/scenarios.json` | Created — 2 Mode 3 scenarios active; 3 stub scenarios for other modes |

### Naming Status

| Field | Value |
|---|---|
| **Active name** | **Veritas Compass** |
| **Tagline** | *An AI workflow guide for privacy, authorship, and academic judgment* |
| `workingName` (JSON meta) | `"Veritas Compass"` |
| `brandingStatus` | `"locked"` |
| Former provisional name | CanonDesk (internal/session use only) |
| Name decision date | 2026-05-26 (end of Session 2) |
| Repo / local folder | Remain `canondesk` — rename deferred pending decision |
| Config pattern | All JSON files carry `meta.workingName` + `meta.brandingStatus`; future `config.js` will expose `appName` as a global variable |

---

## What Is NOT Done (Intentional)

- No `index.html` — Week 2
- No `assets/js/` files — Week 2 (shell) and Week 3 (rules engine)
- No `assets/css/styles.css` — Week 2
- No backend, no API keys, no MCP, no external integrations
- No Tu Pana files modified

---

## Next Recommended Steps

### Week 2 Build Deliverables

1. **HTML shell** — `index.html` with semantic structure, no content yet
2. **Mode selector** — UI component for selecting one of four modes; persists to localStorage
3. **Layer map** — visual governance layer display using Mode 3 vocabulary on load
4. **`assets/js/config.js`** — exposes `appName`, `brandingStatus`, `FEATURES` flags (all `false`)
5. **`assets/js/state.js`** — localStorage read/write for active mode and session state
6. **`assets/css/styles.css`** — minimal, readable; no frameworks; accessible contrast

### Deferred to Week 3+

- Document / material router (Week 3) — depends on rules-engine.js
- Scenario simulator (Week 4)
- Packet builder (Week 5)
- Export / governance summary (Week 4–5)

---

## Separation Verification

| Check | Result |
|---|---|
| `~/Sites/canondesk/` is outside `~/Sites/tupana/` | ✓ Confirmed |
| No Tu Pana files modified | ✓ Confirmed |
| No Tu Pana source files copied | ✓ Confirmed |
| Git root is `~/Sites/canondesk/` (not `~/`) | ✓ Confirmed |

---

## Open Decisions

- [x] Confirm final product name — **Veritas Compass** (locked 2026-05-26; CanonDesk was provisional)
- [x] Confirm August demo mode: Mode 3 — Administrative / Faculty Affairs (locked)
- [x] GitHub repo created: https://github.com/Vikthor1/canondesk (private)
- [x] Obsidian vault path confirmed and layer initialized
- [x] Naming/config pattern established: `meta.workingName` + `meta.brandingStatus` in all JSON files; `config.appName` in future JS

---

## Obsidian Project Memory Layer

The repo is the source of truth for all implementation and documentation. Obsidian is a complementary strategic thinking and memory layer — not a replacement for committed docs.

**Use Obsidian for:** fellowship reflections, naming decisions, stakeholder notes, product ideas, meeting notes, governance model thinking, CUNY Faculty Affairs context.

**Do not use Obsidian for:** code, implementation files, or architectural decisions that belong in `docs/`.

**Separation:** CanonDesk notes must be in a dedicated Obsidian folder, separate from Tu Pana notes.

**Confirmed Obsidian location:**
```
/Users/Victor1/Documents/Obsidian/Projects/CanonDesk/
```

**Starter notes (created 2026-05-26):**
- `00 CanonDesk Index.md`
- `01 Project Purpose and Fellowship Context.md`
- `02 Product Strategy and Naming.md`
- `03 Governance Architecture Notes.md`
- `04 CUNY Faculty Affairs and CTL Use Cases.md`
- `05 Future SaaS and Monetization Ideas.md`
