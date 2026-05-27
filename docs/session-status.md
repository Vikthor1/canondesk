# CanonDesk — Session Status

*Last updated: 2026-05-26*

---

## Current Phase: Week 1 — Data Layer Complete

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
| `workingName` | `"CanonDesk"` |
| `brandingStatus` | `"provisional"` |
| Final name decision | Deferred — lock before any UI copy is written |
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

- [ ] Confirm final product name (CanonDesk / Provenance / ScholarBridge) — lock before HTML copy is written
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
