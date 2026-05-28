# Veritas Compass — Product and Demo Brief

*NotebookLM export packet. Created 2026-05-27. Source of truth: committed repo files.*

---

## Identity

**Public product name:** Veritas Compass
**Current live tagline:** Your true north for privacy, authorship, and academic judgment.
**Former provisional name:** CanonDesk (internal reference only — never shown in UI)
**Repo / local folder:** `canondesk` (rename deferred until before public launch)
**GitHub repo:** `https://github.com/Vikthor1/canondesk` (private)
**Version:** 0.1.0

**Note on tagline drift:** Several docs (project-brief.md, modes.json meta blocks) still reference the older tagline "An AI workflow guide for privacy, authorship, and academic judgment." The live config.js value is authoritative. This drift is cosmetic and does not affect routing or UI behavior.

---

## One-Paragraph Description

Veritas Compass is a static, browser-based AI governance workflow guide for higher education faculty, researchers, and academic administrators. It helps users decide what scholarly or institutional material can safely move through AI tools, what requires human review before AI use, and what must remain protected — before a mistake is made. It works through a progressive question-and-answer router that classifies materials, returns a plain-language routing recommendation, and exports an exportable decision summary. No login, no backend, no file upload, no live AI. It runs fully in the browser and is designed for GitHub Pages deployment.

---

## Target Audiences

**Primary — Administrative / Faculty Affairs (operational)**
- Faculty Affairs coordinators
- Academic administrators and department chairs
- Institutional governance staff

**Secondary — Faculty / Research (operational as of Patch F1)**
- Faculty researchers and scholars
- Grant-writing faculty
- Graduate researchers working with potentially sensitive material

**Scaffolded (content not yet active)**
- CTL directors and faculty developers (Teaching / CTL mode)
- AI power users and institutional evaluators (Tool Testing / AI Sandbox mode)

---

## Current Operational Routes

**Route 1 — Administrative / Faculty Affairs (primary demo path)**
Full end-to-end route. Mode selector → scenario selector (2 active scenarios) → material router → risk result screen → decision summary export. Four active material categories: committee notes, draft policy, approved policy, personnel records.

**Route 2 — Faculty / Research (secondary proof-of-concept, added Patch F1)**
Same UI flow as administrative route. One active scenario. Five active material categories: published scholarship, own unpublished draft, co-authored unpublished material, grant proposal or fellowship, human-subjects / IRB material. Mode-specific research-sensitive question added to router. Conservative routing throughout.

---

## Core Value Proposition

Veritas Compass makes AI-use governance boundaries visible, legible, and actionable — without requiring legal expertise, IT infrastructure, or institutional approval to use. Its value is not technical complexity: it makes AI-use judgment teachable, repeatable, and institutionally documentable for non-expert users. The exportable decision summary is the key artifact: it gives a session tangible, shareable governance output.

---

## What the August Demo Must Show

1. A Faculty Affairs coordinator (or faculty member) selects their workflow role.
2. They select a scenario matching a real task.
3. They answer a short routing questionnaire about their material.
4. They receive a clear routing recommendation (restricted / safe with review / safe with attribution / safe) with plain-language rationale, allowed actions, blocked actions, and review prompts.
5. They export a Markdown decision summary.
6. The whole path takes under five minutes without technical assistance.

The primary demo scenario is `mode3-briefing-memo` — a Faculty Affairs coordinator routing committee notes and draft policy language. The Faculty / Research scenario (`faculty-research-abstract-grant`) is available as a secondary demonstration.

---

## What the App Is Not

- **Not legal advice.** Routing recommendations are based on general institutional best practices. Human review is always required before institutional action.
- **Not a compliance system.** The app does not certify FERPA compliance, de-identification, data security, or legal clearance for AI use.
- **Not a document processor.** No file upload, no document scanning, no redaction, no sanitization in the public prototype.
- **Not a live AI system.** No API calls, no LLM routing, no multi-provider AI orchestration.
- **Not a packet builder yet.** The decision summary export is functional; a full packet builder is deferred beyond the August demo.
- **Not a multi-user platform.** localStorage only, no login, no shared state, no audit trail.

---

## Strategic Context

Veritas Compass is connected to a possible CUNY Faculty Affairs fellowship project. The August demo is the first proof-of-concept delivery. The strongest revenue path is a higher-education AI governance training and workshop product — not a SaaS app sold on feature count. The exportable decision summary, scenario library, and facilitation layer are more important to adoption than any technical feature. See `docs/ideas/revenue-and-adoption-strategy.md` for the full strategic note.
