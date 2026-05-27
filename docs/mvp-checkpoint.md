# CanonDesk — Lean August MVP Checkpoint

*Version 1.0 — May 2026*

---

## Purpose

This document defines the minimum viable scope for the August demo. It governs what the Week 1 JSON stubs must support and what is explicitly deferred. Everything built in v1 should serve the demo scenario first; generality is secondary.

---

## August Demo Constraint

**Mode:** Mode 3 — Administrative / Faculty Affairs Workflow
**Scenario:** One complete scenario end-to-end
**Audience:** CUNY Faculty Affairs stakeholders, CTL leaders, academic administrators
**Delivery:** GitHub Pages, no install, no login, runs in browser

The demo must show:
1. A user selects a workflow mode
2. A layer map displays in mode-specific vocabulary
3. A document router classifies two or three materials and returns routing recommendations
4. A packet builder assembles approved materials
5. A governance summary is exported (plain text or Markdown)

That is the full demo scope. Everything else is secondary.

---

## What the JSON Stubs Must Support (Week 1)

| File | Minimum Week 1 Content |
|---|---|
| `modes.json` | Mode 3 fully defined with layer vocabulary; Modes 1/2/4 present as stubs |
| `rules.json` | Six layers defined; 4 material categories for Mode 3 with routing rules; schema supports all modes |
| `scenarios.json` | 2 Mode 3 scenarios active; stub structure present for other modes |
| `glossary.json` | 8 governance terms defined; mode-specific label overrides where relevant |

---

## Naming / Config Pattern (applies to all files)

All JSON files carry a `meta` block at the top:

```json
"meta": {
  "workingName": "CanonDesk",
  "brandingStatus": "provisional",
  "version": "0.1.0-stub"
}
```

- `workingName` is the internal identifier. Not hard-coded in UI copy.
- `brandingStatus: "provisional"` signals the name is not locked for public release.
- When `config.js` is written (Week 2), it will expose `appName` and `brandingStatus` as global config variables. All UI copy references `config.appName`, never the string `"CanonDesk"` directly.

---

## What Is Out of Scope for v1

These items will not appear in any v1 file, JSON stub, or Week 1 deliverable:

- User accounts, SSO, login
- Real file upload or processing
- Live AI provider calls or API keys
- Audit logs or institutional configuration panel
- Bilingual interface
- MCP integration
- Legal compliance certification or FERPA/HIPAA assertions
- Enterprise packaging

---

## Data Architecture Constraints

- JSON files are configuration and content only — no executable logic
- All routing logic will live in `assets/js/rules-engine.js` (Week 3)
- JSON stubs establish the schema shape; content will be filled incrementally
- `brandingStatus: "provisional"` must be preserved until the name is locked and a naming decision is committed to `docs/session-status.md`
- Mode 3 content takes priority in all stubs; other modes receive valid but minimal placeholder entries

---

## Demo-Day Definition of Done

The prototype is demo-ready when a Faculty Affairs staff member with no technical knowledge can:

1. Open the URL on any device
2. Select Mode 3 without explanation
3. Route two real materials (committee notes and draft policy language)
4. See clear, jargon-minimal routing recommendations
5. Build a packet from approved materials
6. Export a one-page governance summary

No other feature is required for a successful August demo.
