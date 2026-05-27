# Veritas Compass — AI-Safe Packet Gate (Deferred Future Architecture)

*Version 0.1 — May 2026 | Architecture reference only — not an active build plan*

---

## Purpose

This document records the AI-Safe Packet Gate as a deferred future module for Veritas Compass. It is not part of the mid-August MVP. It exists so the concept is not lost and can inform future build decisions without derailing the current prototype.

The AI-Safe Packet Gate would help users prepare a human-reviewed AI-safe working packet before using any external AI tool. It is a workflow guide, not a sanitizer. It does not process, upload, store, or transmit source documents.

---

## Why It Is Deferred

The mid-August prototype is a static-first decision-support tool. It has no backend, no file upload, no live AI, and no document processing. Introducing any form of document sanitization before the governance model itself is proven in the demo would:

- Increase institutional and legal risk involving FERPA, personnel records, and data security
- Create procurement and legal-review barriers for CUNY and peer institutions evaluating the tool
- Shift the product from "governance guide" to "compliance tool," which requires a different institutional and legal framework
- Overload the August demo scope without adding demo-day value

The correct sequencing: governance model → router → risk result → packet guidance → sanitization workflow. Patches 5–6 establish routing. Packet guidance follows in Patch 7. Sanitization workflow is v1.5 at earliest.

---

## Institutional Risk Rationale

Veritas Compass must not ask users to paste sensitive documents into the public prototype. Doing so would:

1. **FERPA and personnel-record risk.** If a user pastes student records or personnel files, sensitive data would enter the browser environment and could be exposed via browser logging, history, caching, or unintended transmission.
2. **Legal and procurement risk.** Institutions evaluating the app for adoption would face data-handling review requirements that create unnecessary barriers to pilot adoption.
3. **Compliance-claim risk.** Any sanitization output could be misread as a certification that the material is de-identified, safe, or cleared for AI use. The app must never imply this.
4. **Trust erosion risk.** A public sanitizer that fails — or that a user misuses — damages the governance model's credibility and the institution's confidence in the tool.

The safe architecture: Veritas Compass remains a guidance tool. Institution-implemented workflows handle any AI-assisted document preparation in approved local environments.

---

## Three Implementation Tiers

### Tier 1 — Browser-Local Deterministic Preflight (v1.5 target, no AI)

No AI. No backend. No file upload. No network transmission. No external APIs.

**How it works:**
- User works through a structured checklist of sensitive-material categories
- App uses pattern-matching heuristics on user-entered descriptions (not document text) to flag likely sensitive categories
- Output is a human-reviewed pre-flight confirmation: a checklist the user completes before building a working packet
- Checklist results are session-only; nothing is stored or transmitted

**Why this is buildable in v1.5:**
- No sensitive data is processed by the app
- No AI model is involved
- No backend or institutional approval is required to deploy
- Fits the existing static-first, no-build architecture

**What it is not:** A sanitizer. A compliance certification. An automated redaction system.

---

### Tier 2 — Institution-Implemented Local AI Sanitizer

An institution runs a locally governed AI model (such as an institutionally approved open-weight model via a locally managed instance) using sanitization prompt templates provided in Veritas Compass documentation.

**How it works:**
- Veritas Compass publishes institution-adaptable sanitization prompt templates (see Patch G3 documentation; not yet created)
- The institution adapts these templates for its local model and data governance environment
- Veritas Compass is not involved in the processing at runtime
- Output remains institution-governed; Veritas Compass makes no claims about the result

**What Veritas Compass provides:** Documentation, prompt template guidance, and workflow design recommendations. The institution implements, runs, and governs the workflow.

**What Veritas Compass does not provide:** A running sanitizer, an API, a hosted model, a data pipeline, or any compliance certification.

---

### Tier 3 — Institution-Approved Cloud AI Sanitizer

An institution uses a cloud AI provider it has already approved for handling institutional data — one with a signed data-processing agreement covering the relevant data categories — to run a sanitization workflow.

**What Veritas Compass provides:** Prompt template documentation and workflow guidance only.

**Requirements before this is possible:**
- The institution must have explicitly approved the cloud provider for this data category
- A signed data-processing agreement must cover the relevant data types (student records, personnel records, etc.)
- FERPA compliance must be confirmed for any student-related materials
- Institutional security, legal, and procurement review must be completed

**Why this is not part of any Veritas Compass release target:** These requirements involve institutional infrastructure, legal review, and procurement decisions that are outside the scope of any single prototype deployment. Veritas Compass documentation may inform this process; it does not replace it.

---

## Guardrails and Non-Claims

Regardless of which tier an institution implements, the following must be made explicit in all documentation and any future UI:

1. **Veritas Compass does not certify compliance.** No output from Veritas Compass or any associated workflow certifies that a document is FERPA-compliant, de-identified, legally safe, or cleared for AI use.
2. **Human review is always required.** An AI-safe working packet is a human-reviewed, human-assembled artifact. The human review step is not optional and cannot be skipped.
3. **Output is a working packet, not a certified document.** Correct labels: "draft," "working packet," "AI-assisted summary," "review pending." Never: "sanitized," "cleared," "compliant," or "approved."
4. **Restricted materials do not enter this workflow without explicit institutional authorization.** The Veritas Compass router identifies restricted materials (Layer 5). That identification ends the app's role. Restricted materials are not routed into any sanitization workflow without separate institutional authorization.
5. **The AI-Safe Packet Gate operates within Layer 3 logic.** It helps users prepare materials that can legitimately enter Layer 3 (AI-Safe Packet). It does not change the six-layer governance model.

---

## Future Prompt-Template Approach (Patch G3, Documentation Only)

A future Patch G3 will create `docs/ai-safe-packet-prompt-templates.md` with institution-adaptable templates for:

1. Human-only pre-flight checklist for preparing an AI-safe working packet
2. Local-model sanitization assistant prompt for Tier 2 institution-implemented workflows
3. Reviewer prompt for checking whether a proposed packet still contains sensitive details
4. Output-status labeling prompt confirming draft / summary / working-packet / official-record status

These templates are documentation only. They do not create live AI functionality in Veritas Compass. They do not process documents within the app. They are institution-adapted for use in Tier 2 or Tier 3 environments, not used directly in the public prototype.

**Terminology note:** These are "sanitization prompt templates" or "AI-safe packet preparation prompts." Do not use the term "prompt injection" in this context — prompt injection refers to malicious attempts to manipulate AI systems, which is unrelated to governance preparation workflows.

---

## Relationship to the Workflow Route Concept

The Workflow Route (planned future routing dimension) asks: "What are you trying to use AI for?" The AI-Safe Packet Gate answers: "Before you do that, here is how to prepare your materials safely."

The two concepts work in sequence:
- Workflow Route identifies the AI task type and required human review level
- AI-Safe Packet Gate guides preparation of materials appropriate for that task
- Both operate within the existing six-layer governance model
- Neither involves live AI routing, multi-LLM orchestration, or document processing by the public prototype

---

## Relationship to Future Router Results (Patches 5–6)

The Patch 5–6 router result screens may include the following guidance text in the SAFE WITH REVIEW result state:

> "Before entering an external AI tool, consider preparing an AI-safe working packet: remove or summarize restricted content, confirm no personnel records or student-identifiable information is included, and have a colleague review the packet before use."

This is guidance text only. It points toward the future AI-Safe Packet Gate workflow without implementing it. When Tier 1 browser-local preflight is built (v1.5), this guidance text will become a link or button that opens the checklist workflow.

---

*This document is an architecture reference only. It does not modify the mid-August build scope. Update it when a Tier 1 or Tier 2 implementation decision is made. Do not rewrite this document during active build sessions — record session decisions in `docs/session-status.md` instead.*
