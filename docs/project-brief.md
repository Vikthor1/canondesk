# CanonDesk — Project Brief

*Version 1.0 — May 2026*

---

## One-Sentence Pitch

CanonDesk helps faculty, researchers, and academic administrators decide what knowledge can safely move through AI tools, what must stay protected, and what must remain human-reviewed — before they make a mistake they cannot undo.

---

## Problem

Faculty and administrators at CUNY and peer institutions are making governance decisions about AI use every day — often without recognizing that is what they are doing. They paste a grant proposal into an AI chat tool. They upload a committee briefing to an AI summarizer. They ask an LLM to revise a policy memo. They test a new tool with a real student-facing example.

Each action crosses a governance boundary that most users have never been asked to think about. The result is a pattern of ungoverned AI use that erodes the distinction between trusted records and AI-generated outputs, between official policy and AI-assisted draft language, between protected student data and sanitized working material.

CanonDesk makes those boundaries visible, legible, and actionable — without requiring legal expertise, IT infrastructure, or institutional approval to use.

---

## Target Users

**Primary**
- Faculty and researchers (manuscript drafting, grant preparation, literature review)
- CTL leaders and faculty developers (syllabus design, workshop planning, AI literacy curriculum)
- Academic administrators and Faculty Affairs staff (policy drafting, briefings, governance documentation)
- Department chairs and program directors (curriculum review, accreditation, administrative correspondence)

**Secondary**
- AI power users and scholar-developers (tool testing, governance model piloting)
- Institutional stakeholders evaluating AI adoption (provosts, academic technology officers)

---

## Four Workflow Modes

All four modes use the same governance architecture and rules engine. Only vocabulary and scenario content differ.

### Mode 1 — Faculty / Research Workflow
**User:** Faculty researcher, scholar
**Canonical layer label:** "Published Work & Official Scholarship"
**Typical use:** Checking whether a manuscript draft or grant proposal can safely enter an AI tool; building a research working packet; identifying materials that must stay outside AI systems.

### Mode 2 — Teaching / CTL Workflow
**User:** CTL director, faculty developer, instructional designer
**Canonical layer label:** "Program Source Materials & Approved Curricula"
**Typical use:** Revising a syllabus with AI assistance; creating faculty development workshop materials; checking whether course feedback data is safe for AI summarization.

### Mode 3 — Administrative / Faculty Affairs Workflow
**User:** Faculty Affairs coordinator, academic administrator, department chair
**Canonical layer label:** "Official Record & Approved Policy"
**Typical use:** Drafting a briefing memo with AI assistance; routing committee documents; producing a governance summary for institutional presentation.

### Mode 4 — Tool Testing / AI Sandbox
**User:** AI power user, scholar-developer, institutional evaluator
**Canonical layer label:** "Canonical Source Layer"
**Typical use:** Testing a new AI tool with sanitized mock materials; building a governance demo for a faculty workshop; piloting the governance model before real institutional use.

---

## Six-Layer Governance Model

| Layer | Role | Risk Level |
|---|---|---|
| 1 — Canonical Source | Trusted records, published scholarship, official policy | Safe with attribution |
| 2 — Working Context | Research/course/policy work in progress | Safe with review |
| 3 — AI-Safe Packet | Sanitized, token-budgeted extract prepared for AI use | Safe (prepared) |
| 4 — AI Output / Drafting | AI-generated content, drafts, summaries | Review required before use |
| 5 — Restricted | FERPA data, personnel records, confidential institutional materials | Restricted — never external AI |
| 6 — Public Output | Conference papers, press materials, published guides | Safe post-review |

**Core rule:** AI output (Layer 4) cannot flow back into Layer 1 (Canonical Source) without explicit human review. This is enforced as a mandatory checkpoint in the packet builder.

---

## Core Modules (planned)

1. **Workflow Mode Selector** — selects and persists user mode; applies mode-specific vocabulary
2. **Interactive Layer Map** — visual governance layer display with mode-specific labels
3. **Document / Material Router** — questionnaire that classifies materials and returns a routing recommendation
4. **Protected Material Checker** — quick-check panel for individual material types
5. **Scenario Simulator** — curated realistic scenarios per mode
6. **AI-Safe Packet Builder** — guided packet preparation with token estimator (simulated)
7. **Decision Summary / Export** — session log exportable as plain text or Markdown

---

## Prototype Boundaries (v1)

**Build in v1:**
- Four modes with mode-specific vocabulary
- Routing logic for 8–10 material categories
- 4–6 scenarios per mode (minimum 2 per mode for demo)
- Simulated packet builder and token estimator
- Exportable decision summary
- GitHub Pages deployment

**Defer to v2+:**
- User accounts, SSO, database
- Real file upload and processing
- Live AI provider routing (no API calls in v1)
- MCP integration
- Audit logs, institutional configuration
- Bilingual interface
- Legal compliance certification

---

## August Goal

A demo-ready proof-of-concept deployed to GitHub Pages, demonstrating the governance model clearly to CUNY Faculty Affairs stakeholders, CTL leaders, and academic administrators — with no IT approval, no installation, and no technical support required to use.

**Recommended demo scenario:** Mode 3 (Administrative / Faculty Affairs Workflow), one complete scenario end-to-end: routing a materials decision, building a communications packet, and exporting a governance summary.

---

## What This Is Not

This prototype is a decision-support and governance-training tool. It is not legal advice. It is not an official compliance system. It does not claim to satisfy FERPA, HIPAA, or any other regulatory requirement. All governance recommendations are based on general institutional best practices and are subject to human review.

---

## Obsidian Project Memory Layer

The GitHub repo (`~/Sites/canondesk/`) is the source of truth for all implementation, documentation, and architectural decisions. Obsidian serves as a complementary strategic thinking and project-memory layer.

**Obsidian is for:** fellowship reflections, naming decisions, stakeholder notes, product ideas, meeting notes, and higher-level governance thinking that informs but does not replace committed documentation.

**Obsidian notes are not:** code, implementation files, or canonical architecture records.

**Separation:** CanonDesk Obsidian notes must remain in a dedicated folder, separate from Tu Pana Obsidian notes.

**Planned location (vault path TBD):**
```
[OBSIDIAN_VAULT_PATH]/Projects/CanonDesk/
```
Do not create Obsidian files until the vault path is confirmed.
