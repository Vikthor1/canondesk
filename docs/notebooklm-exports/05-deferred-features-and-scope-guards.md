# Veritas Compass — Deferred Features, Scope Guards, and NotebookLM Usage

*NotebookLM export packet. Created 2026-05-27. Source of truth: committed repo files.*

---

## Hard Scope Guard: Do Not Build Before the August Demo

The following must not be implemented in any session before the August demo, regardless of how reasonable they sound in context. If scope pressure mounts, this list is the first line of defense.

| Feature | Why deferred |
|---|---|
| Live AI provider calls (OpenAI, Anthropic, Gemini, Ollama, etc.) | Adds privacy exposure, requires API keys, distracts from governance model |
| Multi-LLM orchestration or provider routing | Different product with a different procurement path |
| MCP integration | Architectural complexity; not needed for demo |
| Real file upload or document processing | Privacy risk in a demo environment; out of scope for v1 |
| AI-Safe Packet Gate implementation | Full architecture deferred; guidance text only in v1 (see below) |
| Packet builder (interactive) | Exportable decision summary is sufficient for demo; full builder deferred |
| Packet checklist (interactive) | Guidance text covers this for demo |
| Document sanitizer or redactor | Never in the public prototype; institution-implemented only in future tiers |
| Login, SSO, authentication | No multi-user use case before institutional pilot |
| Backend, database, or audit logs | localStorage sufficient for demo; v2+ architecture |
| Full four-mode parity | Mode 3 (Admin) primary + Mode 1 (Faculty) secondary are sufficient; CTL and Sandbox remain scaffolded |
| Teaching / CTL route functionality | Not before demo; scaffolded only |
| Tool Testing / AI Sandbox route functionality | Not before demo; scaffolded only |
| Sophisticated token estimator | Lookup table or guidance text sufficient; a calculated value overstates precision |
| Searchable governance glossary | Display-only is sufficient for demo |
| Enterprise compliance claims | The app is not a compliance system and must not imply otherwise |
| Bilingual interface | Architecture supports it; implementation is post-August |
| Institutional configuration panel | v2+ feature |
| SaaS packaging or pricing | Not relevant before the pilot succeeds |
| Major ui.js refactor | All screen transitions are working; refactor would risk regression |
| NotebookLM export layer as implementation | These packets are orientation only; the repo is the source of truth |

---

## AI-Safe Packet Gate — Deferred Architecture Summary

The AI-Safe Packet Gate is a future module that would help users prepare human-reviewed AI-safe working packets before using external AI tools. It is not part of the mid-August MVP.

**What it is NOT in v1:** The current app shows guidance text only ("consider preparing a human-reviewed working packet"). No checklist, no file input, no sanitization, no gate.

**Three deferred implementation tiers:**

- **Tier 1 (v1.5, earliest):** Browser-local deterministic preflight. No AI, no backend, no file upload. A structured checklist the user completes to confirm no restricted material is present before building a packet. Fits the existing static-first architecture.
- **Tier 2:** Institution-implemented local AI sanitizer. The institution runs a locally governed AI model using prompt templates published by Veritas Compass. Veritas Compass is not involved at runtime; output is institution-governed.
- **Tier 3:** Institution-approved cloud AI sanitizer. Requires signed data-processing agreement, FERPA review, institutional procurement approval. Veritas Compass provides documentation only.

**Non-negotiable guardrails for all tiers:** Veritas Compass never certifies compliance. Human review is always required. Correct labels: draft, working packet, AI-assisted summary. Never: sanitized, cleared, compliant, approved. Restricted materials do not enter this workflow without explicit institutional authorization.

Full architecture: `docs/future-ai-safe-packet-gate.md`.

---

## NotebookLM Export Layer — Purpose and Usage

### Why this layer exists

As the project grows, re-reading source files in every session consumes too many tokens and risks introducing stale context. These five packets compress the project's status, architecture, governance model, patch history, and scope guards into a small, uploadable source set.

### When to use NotebookLM packets

- When starting a new implementation session and need fast re-entry context
- When switching AI assistants (e.g., Claude → ChatGPT or vice versa) and need to re-establish context efficiently
- When working on non-implementation tasks (strategy, product writing, workshop design) that don't require full source access
- When collaborating with a colleague or stakeholder who needs project orientation

### How to use these packets in prompts

Begin implementation sessions with a prompt like:

> "You are continuing development of Veritas Compass, a static-first AI governance web app for higher education. Use the attached NotebookLM packets as your context foundation. The repo source of truth is `~/Sites/canondesk/`. Read `docs/session-status.md` and the files listed under the active patch before writing any code."

For strategy or product sessions:

> "Use the attached Veritas Compass NotebookLM packets as background. The governance model and scope constraints in packet 03 and 05 are non-negotiable. Suggest approaches consistent with the August demo scope."

### What these packets do NOT replace

- **The committed repo files.** If a packet says X is the architecture and the source code says Y, trust the source code.
- **`docs/session-status.md`.** This file is updated after every patch and is the authoritative record of what has been built.
- **The `docs/mid-august-development-plan.md`.** The canonical patch-by-patch build sequence lives there, not in these packets.
- **The four JSON data files.** Material categories, scenarios, and governance layer definitions are in `assets/data/`, not these packets.

### Update cadence

These packets should be refreshed after major milestones: after Patch 9 (deployment), after any new route is made operational, after any significant architecture change, or before a new stakeholder needs project orientation.

### Warning: do not treat NotebookLM output as ground truth

NotebookLM synthesizes and summarizes. It may:
- Misattribute which patch added a feature
- Conflate deferred and active functionality
- Omit recent changes if packets are not refreshed
- Suggest features that are explicitly deferred in these packets

Always verify against the committed repo before implementing anything a NotebookLM session suggests.

---

## Strategic Context for Scope Decisions

The core principle: **every feature decision before the August demo should serve one test:**

> Can a non-expert Faculty Affairs coordinator or faculty member complete a routing session, get a useful recommendation, and export a decision summary in under five minutes — without technical assistance?

If a feature doesn't directly serve that test, it is deferred. The governance model's credibility depends on the app remaining fast, simple, and institution-approachable. Adding live AI, file processing, or multi-user architecture before the governance workflow is validated would undermine the prototype's strongest advantage: it requires no IT approval to try.

The exportable decision summary (Patch 7) is the most important feature for adoption — it makes a session worth having. The routing logic and result screen are what make the governance model actionable. Everything else is secondary.
