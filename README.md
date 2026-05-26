# CanonDesk — AI Scholar Architecture Prototype

**Working name:** CanonDesk (provisional — see `docs/ai-scholar-architecture-roadmap.md §A` for name candidates)

**Status:** Early scaffolding. No implementation files yet.

---

## What This Is

CanonDesk is a standalone, static-first dynamic HTML/CSS/JavaScript prototype that operationalizes responsible, governance-aware AI use in academic, administrative, and faculty development contexts.

It helps faculty, researchers, CTL leaders, and academic administrators answer four questions before using any AI tool:

1. Is this material safe to use with AI?
2. What must stay protected?
3. What counts as a trusted source or official record?
4. What can be transformed into an AI-safe working packet?

The prototype supports four workflow modes: Faculty / Research, Teaching / CTL, Administrative / Faculty Affairs, and Tool Testing / AI Sandbox.

---

## What This Is Not

- Not a Tu Pana de Escritura feature or extension.
- Not a legal compliance system.
- Not enterprise software requiring SSO, procurement, or institutional IT approval.
- Not a backend application.

This is a decision-support and governance-training prototype. It does not claim legal compliance. It does not handle real student data, personnel records, or institutional storage.

---

## Relationship to Tu Pana

This project is architecturally inspired by Tu Pana de Escritura (`~/Sites/tupana/`) — same static-first patterns, modular JavaScript, localStorage state, JSON configuration, no build step, GitHub Pages deployment — but is fully independent. No Tu Pana source files have been copied. No Tu Pana files should ever be modified from within this project.

---

## Quick Start (future — not yet built)

```
python3 -m http.server 8000
# open http://localhost:8000
```

---

## Documentation

- `docs/ai-scholar-architecture-roadmap.md` — full product roadmap
- `docs/project-brief.md` — project purpose, users, modes, prototype boundaries
- `docs/session-status.md` — current development status and next steps
- `SYSTEM_MEMORY.md` — local AI session briefing (not committed)

---

*Target: August 2026 proof-of-concept demo for CUNY Faculty Affairs stakeholders.*
