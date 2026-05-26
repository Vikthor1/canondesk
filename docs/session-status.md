# CanonDesk — Session Status

*Last updated: 2026-05-26*

---

## Current Phase: Project Scaffolding (Pre-Week 1)

### What Was Created Today (2026-05-26)

| File | Status |
|---|---|
| `~/Sites/canondesk/` | Created — confirmed separate from Tu Pana |
| `README.md` | Created |
| `SYSTEM_MEMORY.md` | Created (local only, not for git) |
| `docs/session-status.md` | Created (this file) |
| `docs/project-brief.md` | Created |
| `docs/ai-scholar-architecture-roadmap.md` | Created — full roadmap from conversation |

### What Was NOT Done (Intentional)

- No `index.html` — not yet.
- No `assets/` directory — not yet.
- No `assets/js/` files — not yet.
- No `assets/css/styles.css` — not yet.
- No `assets/data/*.json` — not yet.
- No GitHub repo — not yet (local git initialized; remote push pending).
- No Obsidian folder yet (vault path not yet confirmed).
- No backend, no API keys, no MCP, no external integrations.
- No Tu Pana files modified.

---

## Next Recommended Steps

### Immediate (before Week 1 build begins)

1. **Review the roadmap** — `docs/ai-scholar-architecture-roadmap.md`. Confirm or adjust working name (CanonDesk is provisional).
2. **Initialize git** — `git init` inside `~/Sites/canondesk/`; create `.gitignore` that excludes `SYSTEM_MEMORY.md`.
3. **Create GitHub repo** — public or private, under `Vikthor1`; push initial scaffold.
4. **Name decision** — confirm CanonDesk, Provenance, or ScholarBridge before building any HTML.

### Week 1 Build Deliverables (roadmap §L)

- Draft six-layer governance model with vocabulary maps for all four modes
- Write initial `assets/data/rules.json` (stub)
- Write initial `assets/data/glossary.json` (stub)
- Write initial `assets/data/modes.json` (stub)
- Write initial `assets/data/scenarios.json` (stub)
- Deliverable: Governance model document confirmed + all four JSON config stubs

---

## Separation Verification

| Check | Result |
|---|---|
| `~/Sites/canondesk/` is outside `~/Sites/tupana/` | ✓ Confirmed |
| No Tu Pana files modified | ✓ Confirmed |
| No Tu Pana source files copied | ✓ Confirmed |

---

## Open Decisions

- [ ] Confirm final product name (CanonDesk / Provenance / ScholarBridge)
- [ ] Decide GitHub repo visibility (public or private) and create remote under `Vikthor1`
- [ ] Confirm August demo audience and demo mode (roadmap recommends Mode 3 — Administrative / Faculty Affairs)
- [ ] Confirm Obsidian vault path so CanonDesk folder can be created

---

## Obsidian Project Memory Layer

The repo is the source of truth for all implementation and documentation. Obsidian is a complementary strategic thinking and memory layer — not a replacement for committed docs.

**Use Obsidian for:** fellowship reflections, naming decisions, stakeholder notes, product ideas, meeting notes, governance model thinking, CUNY Faculty Affairs context.

**Do not use Obsidian for:** code, implementation files, or architectural decisions that belong in `docs/`.

**Separation:** CanonDesk notes must be in a dedicated Obsidian folder, separate from Tu Pana notes.

**Planned location (vault path TBD):**
```
[OBSIDIAN_VAULT_PATH]/Projects/CanonDesk/
```
Do not create Obsidian files until the vault path is confirmed. Record it in `SYSTEM_MEMORY.md §11` once known.
