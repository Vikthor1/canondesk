# Veritas Compass — Governance Rules and Boundaries

*NotebookLM export packet. Created 2026-05-27. Source of truth: committed repo files.*

---

## Three Governance Pillars

Every routing decision in Veritas Compass is framed around three questions:

1. **Privacy** — Does this material contain protected, restricted, or identifiable information that must stay out of external AI tools?
2. **Authorship** — Who created this material, who owns it, and what rights and obligations apply before it enters AI processing?
3. **Academic judgment** — Should this output carry human authorship, institutional authority, and human review — and would AI use here clarify or obscure that?

These pillars are surfaced in the result screen's authorship and judgment checkpoint (always rendered, regardless of routing outcome).

---

## Six-Layer Governance Model

The same six-layer model applies across all four modes. Mode-specific vocabulary labels replace default names; the structure is identical.

| Layer | Default label | Risk level | Description |
|---|---|---|---|
| 1 | Canonical Source | Safe with attribution | Trusted records, published scholarship, officially approved policy. Safe for AI reference with proper attribution. AI output cannot return here without human review. |
| 2 | Working Context | Safe with review | Work in progress — drafts, developing policy, course materials under revision. Safe for AI assistance with human review before adoption. |
| 3 | AI-Safe Packet | Safe (prepared) | A curated extract of reviewed, non-restricted materials prepared specifically for AI processing. Token-budgeted and confirmed clean. (Deferred module — guidance text only in v1.) |
| 4 | AI Output / Drafting | Review required | AI-generated content and drafts. Must be reviewed before use. Cannot be re-introduced to Layer 1 without explicit human validation. |
| 5 | Restricted | Restricted — never external AI | FERPA-protected student data, personnel records, confidential institutional materials, IRB-covered research data. Must never enter external AI systems. |
| 6 | Public Output | Safe post-review | Conference papers, press materials, approved public communications. Safe after review cycle is complete. |

**Mode vocabulary examples:**

| Mode | Layer 1 label | Layer 5 label |
|---|---|---|
| Administrative | Official Record & Approved Policy | Personnel Records & Confidential Files |
| Faculty / Research | Published Work & Official Scholarship | Protected Research Data & Confidential Materials |
| Teaching / CTL | Program Source Materials & Approved Curricula | Student Data & Protected Feedback |
| Tool Testing | Canonical Source Layer | Restricted — Do Not Upload |

---

## Enforced Rules

**No-recursive-upload (Layer 4)**
AI-generated output cannot flow back into Layer 1 (Canonical Source) and be treated as a trusted record without explicit human review and validation. This is checked in the router questionnaire ("Was any part of this material generated or significantly assisted by AI?"). A yes or not-sure answer triggers a warning in the result.

**Never-external-AI (Layer 5)**
Layer 5 materials must never be submitted to any external AI tool, API, or cloud service. This rule cannot be overridden by any mode or configuration. Personnel yes → restricted; student data yes → restricted; confidential institutional yes → restricted; IRB/human-subjects yes or not-sure → restricted.

---

## Active Material Categories and Default Routing

### Administrative / Faculty Affairs mode

| Category ID | Label | Default routing |
|---|---|---|
| `committee-notes` | Committee Notes | restricted (if personnel), safe-with-review (procedural only) |
| `draft-policy` | Draft Policy Language | safe-with-review |
| `approved-policy` | Approved Institutional Policy | safe-with-attribution |
| `personnel-records` | Personnel Records | always restricted |

### Faculty / Research mode

| Category ID | Label | Default routing |
|---|---|---|
| `published-scholarship` | Published scholarship or public research output | safe-with-attribution |
| `own-unpublished-draft` | Own unpublished draft or work in progress | safe-with-review |
| `coauthored-unpublished-material` | Co-authored unpublished material | restricted by default |
| `grant-proposal-or-fellowship` | Grant proposal or fellowship application | safe-with-review |
| `human-subjects-or-irb-material` | Human-subjects, IRB, interview, fieldnote, or restricted research material | always restricted |

---

## Recommendation Types

| Value | Display label | When used |
|---|---|---|
| `restricted` | Restricted — do not use AI with this material | Personnel records, student data, confidential institutional content, co-authored unpublished material, IRB/human-subjects material, or research-sensitive flag yes/not-sure |
| `safe-with-review` | Safe — with human review required | Work in progress, draft policy, own unpublished drafts, grant proposals |
| `safe-with-attribution` | Safe — with attribution required | Published/official canonical sources |
| `safe` | Safe for AI assistance | Not yet triggered by any current category — available for future use |

---

## How the Result Screen Works

The risk result screen renders all of the following from the `RoutingResult` object returned by `rules-engine.js`:

- **Recommendation card** — colored border, text icon, label, rationale. Color is never used alone; icon + label + border tint distinguish all four states.
- **Allowed actions panel** ("Safer next steps") — what the user can do. Conservative fallback rendered if empty and recommendation is not restricted.
- **Blocked actions panel** ("What you should not do") — what must not happen. Conservative fallback rendered for restricted.
- **Warnings panel** — advisory notes (no-recursive-upload flag, not-sure escalation note, category-specific warnings).
- **Review prompts** — category-specific human review questions.
- **Authorship and judgment checkpoint** — always rendered, regardless of recommendation:
  - Who reviews or signs off before this becomes official, public, or shared?
  - What status should AI-assisted output have: draft, summary, recommendation, working packet, or official record candidate?
  - Would using AI here clarify the work, or could it obscure responsibility, authorship, or institutional judgment?
- **AI-Safe Packet guidance** — text only, no gate, no sanitizer. Restricted → "do not enter external AI tools; assemble a separate working packet from non-restricted materials only." Safe-with-review → consider preparing a human-reviewed working packet before AI use.
- **Disclaimer** (always rendered): "This is a decision-support tool, not legal advice. Recommendations are based on general governance best practices and require human review before any institutional action."

---

## Non-Compliance-Certification Language

These statements must remain true in all versions of the app and all future prompts:

- Veritas Compass is not a compliance system. It does not certify FERPA compliance, de-identification, legal safety, or AI clearance.
- No document is uploaded, processed, sanitized, or transmitted by the app.
- All recommendations require human review before institutional action.
- The app guides users before they use AI tools; the guidance itself is the product.
- Correct output labels: draft, working packet, summary, review pending. Never: sanitized, cleared, compliant, approved.

---

## Conservative Routing Cascade

`rules-engine.js` applies guards in this order before reaching material-category logic:

1. No-recursive-upload check → warning added
2. Personnel yes → restricted (early return)
3. Student data yes → restricted (early return)
4. Not-sure flags → conservative escalation warning added
5. Confidential institutional yes → restricted (early return)
6. Research-sensitive yes or not-sure → restricted (early return; faculty-research mode only)
7. Material-category routing (category-specific logic)
8. Default fallback → safe-with-review (or restricted if any not-sure flag was present)

If in doubt, the engine escalates conservatively. Not-sure is never treated as No.
