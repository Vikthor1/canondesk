# AI Scholar Architecture — Prototype Development Roadmap

`docs/ai-scholar-architecture-roadmap.md` — Version 1.0 — May 2026

---

## Purpose and Scope

This roadmap defines the product strategy, prototype architecture, and development plan for a new standalone web application that operationalizes responsible, governance-aware AI use in academic, administrative, and faculty development contexts. This is an independent prototype. It does not extend or modify any existing codebase.

The roadmap draws on proven patterns from static-first, GitHub Pages–deployable web applications: modular JavaScript with a fixed load order, localStorage for state persistence, JSON configuration files for content, no build step, and clear separation of concerns across files. These patterns are adopted here for the same reasons they work in proven academic tools: solo maintainability, zero infrastructure cost, and instant deployability.

Each section of this document is designed to stand independently as a GitHub issue, development prompt, Obsidian note, or documentation file.

---

## 0. Role Directory

For a solo scholar-developer working with AI-assisted coding tools, these roles represent distinct phases and mental modes of work rather than separate people. AI tools can be assigned sub-roles within each domain. Each role is scoped to deliver a concrete product contribution.

---

### Role 1 — Codebase Researcher

**Core responsibility:** Determine the optimal base architecture for a static, no-build, GitHub Pages–deployable prototype by identifying reusable structural patterns from working academic tools.

**Key deliverables:**
- Architecture decision memo: module structure, script load order, state management approach
- List of reusable structural patterns (not code): modal overlays, mode switching, JSON config loading, localStorage persistence, report export
- Confirmation that no framework, bundler, or backend is required for v1

**Questions to answer:**
- What is the minimum file structure needed to begin building?
- How should config, state, rules logic, UI rendering, and initialization be separated?
- Where does the architecture need to be future-ready without being overbuilt now?

**Files involved:** `config.js`, `state.js`, `app.js`, `index.html`

**Contribution to prototype:** Ensures the build starts on a stable, extensible foundation that does not require refactoring when new modes or modules are added.

---

### Role 2 — Story Writer

**Core responsibility:** Develop the narrative logic of the app — what problem it solves, why governance matters, how it communicates risk without sounding punitive, and how it positions AI as useful but bounded by trust, privacy, provenance, and human review.

**Key deliverables:**
- One-sentence pitch per audience (faculty, CTL leader, administrator, developer)
- Onboarding copy for each workflow mode
- Risk explanation language that frames governance as professional judgment, not surveillance
- Tone guide: institutional but accessible, serious but not bureaucratic

**Questions to answer:**
- What does a faculty member feel when they first open this app?
- How do we explain governance layers without using the word "layers"?
- What is the single thing every user must understand before taking any action?

**Files involved:** `modes.json`, `glossary.json`, `index.html` (landing copy), `docs/demo-script.md`

**Contribution to prototype:** Prevents the app from reading like a compliance audit. Ensures every screen is legible to non-technical users without being condescending.

---

### Role 3 — Spec Writer

**Core responsibility:** Translate the concept into a clear product specification covering user personas, user flows, core modules, data model, interface states, decision rules, non-goals, and success criteria.

**Key deliverables:**
- User persona cards for six target profiles
- User flows for all four workflow modes
- Core module list with input/output description for each
- Non-goals list: what this prototype explicitly does not do
- Success criteria for the August demo

**Questions to answer:**
- What does a complete session look like for each persona?
- What is the minimum set of modules needed for a convincing demo?
- What questions must the prototype answer without human explanation?

**Files involved:** `scenarios.json`, `modes.json`, `rules.json`, `docs/roadmap.md`

**Contribution to prototype:** Prevents scope drift. Gives every other role a shared reference for what is and is not being built.

---

### Role 4 — Governance Framework Designer

**Core responsibility:** Translate the underlying Scholarly AI Workflow Architecture into accessible governance concepts — trusted records, restricted materials, AI-safe working packets, drafting spaces, public outputs, and controlled tool pilots.

**Key deliverables:**
- Six-layer governance model with mode-specific vocabulary for each layer
- Routing rules: what can move forward, what must stay protected, what can never flow back
- No-recursive-upload rule formalized as a governance principle
- Glossary of governance terms with plain-language definitions

**Questions to answer:**
- What does "canonical" mean to a department chair who has never encountered that term?
- Where does the governance model break down in real faculty or administrative workflows?
- What is the single most dangerous mistake the app must prevent?

**Files involved:** `rules.json`, `glossary.json`, `modes.json`, `docs/governance-glossary.md`

**Contribution to prototype:** The intellectual foundation of the entire prototype. Without a clear, defensible governance model, every other module is arbitrary.

---

### Role 5 — UX / Information Architecture Designer

**Core responsibility:** Design the app structure, navigation, mode selector, decision-tree interface, cards, warnings, progress indicators, scenario simulator, packet builder, and summary report screens.

**Key deliverables:**
- Screen inventory and navigation model
- Component inventory: cards, warning banners, progress indicators, questionnaire, result screens, report panel
- Mobile breakpoint decisions
- Accessibility requirements per screen
- Visual language for risk states: safe, review-required, restricted

**Questions to answer:**
- How does a user understand where they are in the governance workflow at any moment?
- How do we show the layer map without overwhelming non-technical users?
- Where should warnings appear — inline, modal overlay, or persistent banner?

**Files involved:** `styles.css`, `index.html`, `ui.js`

**Contribution to prototype:** Ensures the app is usable by faculty and administrators without onboarding, a tutorial, or technical support.

---

### Role 6 — Frontend Builder

**Core responsibility:** Implement the dynamic HTML/CSS/JavaScript prototype according to the spec, UX design, and governance model.

**Key deliverables:**
- Functional prototype of all nine screens
- Mode switching (four modes, localStorage-persisted)
- Document router questionnaire with live risk-level indicator
- Scenario simulator with end-to-end decision flow
- Decision summary report with export
- AI-safe packet builder (simulated, local only)
- Responsive, accessible layout

**Key constraints:**
- No framework unless strongly justified (plain JavaScript preferred)
- No build step
- No ES modules — classic globals, fixed script load order
- No external AI calls in v1
- localStorage only for state

**Files involved:** All `assets/js/` files, `assets/css/styles.css`, `index.html`

**Contribution to prototype:** Produces the working prototype. All strategy work becomes real here.

---

### Role 7 — Backend Builder / Architecture Planner

**Core responsibility:** Design the future-ready backend plan without building a real backend in v1. Define what would eventually require a database, authentication, audit logs, or institutional deployment.

**Key deliverables:**
- Future SaaS architecture memo: what backend services would be needed for institutional scale
- API integration plan: AI provider routing, file processing, institutional SSO
- Data architecture for multi-user scenarios: how local JSON config would migrate to a database
- Clear boundary between v1 (localStorage, static) and v2+ (real backend)

**Questions to answer:**
- What would need to change if five institutions wanted to use this simultaneously?
- What data should never be sent to a backend, even in v2?
- How should the config and rules system be structured so a future backend replaces localStorage without touching logic or UI code?

**Files involved:** `docs/future-saas-notes.md`, `config.js` (future-ready config structure)

**Contribution to prototype:** Prevents the prototype from being built into a corner. Ensures config, rules, and state are structured for future extraction without a full rewrite.

---

### Role 8 — AI Workflow / Prompt Systems Designer

**Core responsibility:** Design how the app generates AI-safe working packets, token-budgeted summaries, prompt packets, and tool-specific guidance — all simulated locally in v1, without sending sensitive data to external systems.

**Key deliverables:**
- AI-safe packet template: fields, structure, token guidance
- Token budget estimator logic (simulated): document type → estimated token count → context window guidance
- Tool-specific guidance cards (v1: informational only, no live API)
- No-recursive-upload rule formalized as a UI checkpoint in the packet builder
- Copy-ready packet template output

**Questions to answer:**
- What does an AI-safe working packet actually contain, and what does it explicitly exclude?
- How do we explain "token budget" to a faculty member without using that phrase?
- What is the meaningful difference between an AI-safe summary and a canonical record?

**Files involved:** `packet-builder.js`, `report-builder.js`, `scenarios.json`

**Contribution to prototype:** Makes the prototype practically useful beyond a governance checklist. Users leave with something they can use in their next real AI session.

---

### Role 9 — Privacy, Compliance, and Risk Reviewer

**Core responsibility:** Identify sensitive material categories, define clear warning logic and user-facing explanations, and ensure the prototype does not make false compliance claims.

**Key deliverables:**
- Sensitivity taxonomy: 8–10 material categories with routing rules
- Warning language library: plain-language explanations for each restricted category
- Disclaimer copy: what the app is and is not (not legal advice, not an official compliance system)
- Risk matrix for all demo scenarios

**Questions to answer:**
- What FERPA-referencing language is accurate without creating legal liability for the app?
- Where is the precise line between "decision-support tool" and "compliance software"?
- Which risk warnings will faculty ignore, and how does the design resist that?

**Files involved:** `rules.json`, `glossary.json`, warning components in `ui.js`

**Contribution to prototype:** Protects the app from overclaiming compliance while making governance concerns genuinely actionable for non-legal users.

---

### Role 10 — Test Verifier

**Core responsibility:** Create and execute a testing plan covering all four workflow modes, all scenario types, all routing decisions, and all export behaviors.

**Key deliverables:**
- Test scenarios matrix: one test per sensitive category × four modes
- Safe routing verification: SAFE / SAFE WITH REVIEW / RESTRICTED decisions confirmed correct
- No-recursive-upload logic test: AI-generated outputs cannot be re-routed as canonical sources
- localStorage behavior tests: state persists, clears correctly, no cross-session contamination
- Demo reliability test: full demo session completes without error

**Files involved:** Local test scripts (untracked), `docs/demo-script.md`

**Contribution to prototype:** Ensures the prototype is demo-reliable and does not produce incorrect governance recommendations in front of institutional stakeholders.

---

### Role 11 — Implementation Validator

**Core responsibility:** Review the roadmap for feasibility, scope discipline, and August-readiness. Identify what can realistically be built and what must be deferred without compromising the demo.

**Key deliverables:**
- Go / defer / cut list for all proposed features
- Revised August build plan based on realistic solo-developer velocity
- Scope guardrails: conditions under which new features should be rejected mid-build
- Risk flags: where the build is most likely to stall or bloat

**Questions to answer:**
- What is the minimum set of working modules that makes a compelling CUNY Faculty Affairs demo?
- What features feel necessary but are actually deferred scope in disguise?
- Where will a solo developer spend the most time unexpectedly?

**Files involved:** `docs/roadmap.md`, `docs/future-saas-notes.md`

**Contribution to prototype:** Prevents the most common failure mode of solo academic development projects: over-ambitious scope that collapses before a demo exists.

---

### Role 12 — Product Strategist

**Core responsibility:** Evaluate the prototype as a proof of concept for future institutional adoption, faculty-development workshops, consulting, and possible SaaS evolution.

**Key deliverables:**
- Minimum viable demo narrative: three things the prototype must demonstrate to be compelling
- Pilot strategy: which institutional stakeholders to approach first
- Revenue and sustainability scenarios: workshop licensing, consulting, institutional subscription, open source
- CUNY Faculty Affairs fellowship pitch framing

**Questions to answer:**
- What does success look like at a Faculty Affairs demo in August?
- Who is the decision-maker in that room, and what do they need to see?
- What is the difference between an interesting prototype and a funded product?

**Files involved:** `docs/demo-script.md`, `README.md`

**Contribution to prototype:** Ensures the prototype is built toward a real audience and a real pitch, not purely a technical exercise.

---

### Role 13 — Documentation Writer

**Core responsibility:** Plan and produce all documentation needed for the prototype: README, user guide, demo script, governance glossary, scenario examples, and future development notes.

**Key deliverables:**
- `README.md`: purpose, quick start, mode descriptions, governance overview
- `docs/demo-script.md`: step-by-step CUNY Faculty Affairs walkthrough with talking points
- `docs/governance-glossary.md`: mode-specific vocabulary reference
- `docs/user-guide.md`: faculty and administrator plain-language guide
- `docs/future-saas-notes.md`: deferred features, scaling architecture, institutional deployment path

**Files involved:** All `docs/` files, `README.md`

**Contribution to prototype:** Makes the prototype legible to stakeholders who will never read the code and ensures the governance model is communicable outside the demo room.

---

### Role 14 — Accessibility and Inclusion Reviewer

**Core responsibility:** Ensure the prototype meets WCAG 2.1 AA accessibility standards and is legible to users with varying technical literacy, including faculty who rely on assistive technology or high-contrast display environments.

**Key deliverables:**
- Accessibility checklist for all nine screens
- Plain-language audit: flag any screen where governance language exceeds a faculty-legible reading level
- Color contrast verification for all three risk states (safe / review / restricted)
- Keyboard navigation map for the document router questionnaire

**Questions to answer:**
- Can a screen-reader user complete the document router without sighted assistance?
- Is the risk-level indicator accessible to users who cannot distinguish color?
- Does the governance glossary serve first-generation college administrators, not just digital-native faculty?

**Files involved:** `styles.css`, `index.html`, warning components in `ui.js`

**Contribution to prototype:** Ensures institutional adoption is not blocked by accessibility concerns and that the app serves the full range of CUNY faculty and administrator profiles.

---

## A. Product Name Options

Ten candidate names evaluated on five criteria: **clarity** (does the name explain itself without a subtitle?), **memorability** (will users recall it after one encounter?), **institutional seriousness** (appropriate for Faculty Affairs and CTL contexts?), **audience fit** (works across faculty, administrators, and developers?), and **product scalability** (can it grow into a platform or product line?).

---

**1. CanonDesk**
Your scholarly canon, on your desk. "Canon" is deeply understood in academic contexts — literary canon, canonical sources, canonical records. "Desk" grounds it in a familiar workspace metaphor. Neither technical nor corporate.
*Clarity: High · Memorability: High · Seriousness: High · Fit: All audiences · Scalability: Strong*

**2. Provenance**
From archival and scholarly practice: the verified origin and chain of custody of a source. Signals authenticity, trust, and governance without bureaucratic language. Requires a brief subtitle for non-humanist audiences.
*Clarity: Medium · Memorability: High · Seriousness: Very high · Fit: Strong for faculty/researchers, requires translation for administrators · Scalability: Strong*

**3. ScholarBridge**
The bridge between your scholarly work and AI tools — crossed safely, with governance guardrails. Active metaphor. Implies human agency and bidirectionality.
*Clarity: High · Memorability: Medium · Seriousness: Medium-high · Fit: Strong for CTLs and faculty developers · Scalability: Medium*

**4. TrustPath**
The path from trusted source to safe output. Directional, clean, non-technical. Implies process without implying policing.
*Clarity: High · Memorability: Medium · Seriousness: Medium · Fit: Good across audiences · Scalability: Medium*

**5. PacketReady**
"Is this material AI-packet ready?" Functional, self-explanatory, communicates the app's core action immediately. Best for technical users; weakest for Faculty Affairs.
*Clarity: Very high · Memorability: Medium · Seriousness: Low for administrators · Fit: Strong for AI power users, weak for institutional stakeholders · Scalability: Limited (action-specific)*

**6. Meridian**
A guiding reference line. Scholarly, elegant, architectural. Suggests precision without implying restriction. Works as a platform name with a subtitle.
*Clarity: Low without subtitle · Memorability: High · Seriousness: Very high · Fit: Strong for an aspirational brand · Scalability: Strong*

**7. CanonFlow**
The flow of canonical materials through AI governance layers. Dynamic feel. Slightly technical.
*Clarity: Medium · Memorability: Medium · Seriousness: Medium · Fit: Good for technical users and faculty developers · Scalability: Medium*

**8. TrustDesk**
Your trusted scholarly workspace. Administratively legible. Slightly less distinctive than CanonDesk.
*Clarity: High · Memorability: Medium · Seriousness: Medium-high · Fit: Strong for administrators · Scalability: Medium*

**9. SafeRoute**
Safe routing of scholarly materials through AI tools. Direct, functional, but risks sounding like a compliance tool or a firewall product.
*Clarity: High · Memorability: Medium · Seriousness: Medium · Fit: Good for administrators, weaker for faculty · Scalability: Limited*

**10. WorkCanon**
Your working canonical layer. Precise but requires explanation.
*Clarity: Medium · Memorability: Low · Seriousness: Medium · Fit: Strong for technical users only · Scalability: Limited*

---

### Top 3 Recommendation

**First choice: CanonDesk**
Balances institutional seriousness with accessibility. Memorable across faculty and administrator audiences. Scales as a product name. Tagline: *"Your scholarly knowledge, governed for the AI age."*

**Second choice: Provenance**
Most intellectually distinctive and most legible to humanist faculty. Strongest for a fellowship or academic stakeholder pitch. Tagline: *"Know where your knowledge comes from."*

**Third choice: ScholarBridge**
Clearest narrative metaphor for the app's core function. Best for CTL and faculty development contexts. Tagline: *"AI tools, crossed safely."*

**Working name for this roadmap:** **CanonDesk**

---

## B. Product Framing

### One-Sentence Pitch
CanonDesk helps faculty, researchers, and academic administrators decide what knowledge can safely move through AI tools, what must stay protected, and what must remain human-reviewed — before they make a mistake they cannot undo.

### For CUNY Faculty Affairs Stakeholders
Faculty and administrators at CUNY are already using AI tools. The question is no longer whether to engage with AI, but how to do so without violating student privacy, compromising personnel confidentiality, corrupting official records, or inadvertently treating AI-generated text as authoritative policy or scholarship. CanonDesk is a lightweight, interactive governance tool that walks users through the decision process — not as a compliance requirement, but as a practical, empowering workflow guide. It works entirely in the browser, requires no IT approval, no login, and no institutional setup. It can be piloted by any Faculty Affairs office or CTL in an afternoon workshop.

### For Developers
CanonDesk is a static-first, dynamic HTML/CSS/JavaScript prototype with no backend, no login, and no external AI calls in v1. It implements a six-layer Scholarly AI Workflow Architecture as a mode-switchable, questionnaire-driven web application. State is localStorage-only. All configuration is JSON-driven. Deployment target is GitHub Pages. Architecture uses modular scripts in a fixed load order, FEATURES flags, a single global state object, and a strict separation among configuration, data, rules engine, UI rendering, and initialization. The same architecture that governs a solo-scholar prototype is designed to scale to a multi-institution backend without rewriting the rules engine or the UI layer.

---

## C. Core Problem

Faculty and administrators at CUNY and peer institutions are making governance decisions about AI use every day — often without recognizing that is what they are doing. They paste a grant proposal into an AI chat tool. They upload a committee briefing to an AI summarizer. They ask an LLM to revise a policy memo. They test a new tool with a real student-facing example. They accept an AI-generated summary as a working document.

Each of these actions crosses a governance boundary that most users have never been asked to think about. The result is not always a catastrophic breach — but it is a pattern of ungoverned AI use that erodes the distinction between trusted records and AI-generated outputs, between official policy and AI-assisted draft language, between protected student data and sanitized working material.

The institutions that will govern AI well are not the ones that prohibit it. They are the ones that equip their faculty and staff to make principled, auditable decisions about when and how to use it. CanonDesk exists to make those boundaries visible, legible, and actionable — without requiring legal expertise, IT infrastructure, or institutional approval to use.

---

## D. Target Users

### Primary Users
- **Faculty and researchers** — manuscript drafting, grant preparation, literature review, conference work, research data decisions
- **CTL leaders and faculty developers** — syllabus design, workshop planning, professional development materials, AI literacy curriculum
- **Academic administrators and Faculty Affairs staff** — policy drafting, briefing preparation, communications, reporting, governance documentation
- **Department chairs and program directors** — curriculum review, accreditation materials, administrative correspondence, hiring process materials

### Secondary Users
- **AI power users and scholar-developers** — testing tools, building AI workflows, piloting governance models before institutional adoption
- **Institutional stakeholders evaluating AI adoption** — provosts, academic technology officers, legal and compliance staff exploring governance frameworks without requiring compliance software

### Not Primary Targets in v1
- Students (student-facing governance is a future option)
- IT departments and security teams (the governance model is compatible with institutional IT policy but is not designed as an IT compliance tool)
- Legal and compliance offices (the app supports their goals without making legal claims or replacing their judgment)

---

## E. Core User Modes

Four workflow modes use the same underlying architecture but apply mode-specific vocabulary, scenarios, and risk framings. The governance model is identical in all modes. Only the language and scenario content change.

---

### Mode 1 — Faculty / Research Workflow

**User goals:** Determine what research materials can safely enter AI tools; build an AI-safe working packet from a manuscript or grant; identify what requires human review before any AI-assisted text is used or cited.

**Layer vocabulary:**

| Governance Layer | Faculty / Research Label |
|---|---|
| Canonical Source | Published Work & Official Scholarship |
| Working Context | Research in Progress |
| AI-Safe Packet | Research Working Packet |
| AI Output / Drafting | AI-Assisted Drafting Space |
| Restricted | Protected Research Materials |
| Public Output | Dissemination & Public Outputs |

**Typical scenarios:** Drafting a conference abstract using prior published work; preparing a literature review synthesis; revising a grant narrative with AI assistance; checking whether a dataset description is safe to include as AI context.

**Risk categories:** Unpublished manuscripts, human-subjects research data, pre-submission grant materials, co-authored work without co-author consent, confidential IRB-covered materials.

**Final output:** AI-safe research working packet with token guidance; routing decision summary; checklist of materials that must remain outside AI tools.

---

### Mode 2 — Teaching / CTL Workflow

**User goals:** Determine what course and program materials can support AI-assisted curriculum design; prepare AI-safe workshop content; identify where student data must be excluded.

**Layer vocabulary:**

| Governance Layer | Teaching / CTL Label |
|---|---|
| Canonical Source | Program Source Materials & Approved Curricula |
| Working Context | Course Work in Progress |
| AI-Safe Packet | Workshop Preparation Packet |
| AI Output / Drafting | AI-Assisted Course Design Space |
| Restricted | Student Records & Confidential Feedback |
| Public Output | Published Course Materials & Faculty Guides |

**Typical scenarios:** Revising a syllabus with AI assistance; creating a faculty development workshop description; building an AI literacy module for students; checking whether aggregate course feedback is safe for AI summarization.

**Risk categories:** FERPA-covered student work or feedback, individually identifiable course evaluations, student grade distributions, confidential program review data, accreditation materials under active review.

**Final output:** Workshop preparation packet; checklist of student data exclusions; routing summary for CTL program materials.

---

### Mode 3 — Administrative / Faculty Affairs Workflow

**User goals:** Determine what administrative and policy materials can be AI-assisted; protect personnel and institutional records; produce a governance summary suitable for briefings and institutional presentation.

**Layer vocabulary:**

| Governance Layer | Administrative / Faculty Affairs Label |
|---|---|
| Canonical Source | Official Record & Approved Policy |
| Working Context | Policy & Administrative Work in Progress |
| AI-Safe Packet | Briefing & Communications Packet |
| AI Output / Drafting | AI-Assisted Drafting Space |
| Restricted | Personnel Records & Confidential Files |
| Public Output | Official Communications & Published Reports |

**Typical scenarios:** Drafting a Faculty Affairs briefing with AI assistance; reviewing whether a policy memo can be AI-summarized; preparing governance documentation for a CUNY-wide initiative; routing committee recommendations through a decision checklist.

**Risk categories:** Personnel records, tenure review materials, hiring committee deliberations, confidential grievance files, student records referenced in administrative context, budget materials under institutional confidentiality.

**Final output:** Administrative communications packet; routing decision for each material type; governance summary report suitable for institutional presentation or filing.

---

### Mode 4 — Tool Testing / AI Sandbox

**User goals:** Test AI tools using mock or sanitized materials; explore the governance model with safe examples; evaluate new tools before institutional adoption; build AI-literacy skills in a low-risk environment.

**Layer vocabulary:**

| Governance Layer | Tool Testing / Sandbox Label |
|---|---|
| Canonical Source | Canonical Source Layer |
| Working Context | Working Context Layer |
| AI-Safe Packet | AI-Safe Context Packet |
| AI Output / Drafting | AI Output / Drafting Layer |
| Restricted | Restricted / Never-AI Layer |
| Public Output | Public Output Layer |

**Typical scenarios:** Testing a new AI tool with a mock grant proposal; evaluating a prompt strategy with a sanitized syllabus; building a governance demonstration for a faculty workshop; piloting the governance model before deploying it with real institutional materials.

**Risk categories:** Accidental use of real sensitive data in sandbox mode; treating AI output as a canonical source; bypassing the packet-building step because "it's just a test."

**Final output:** Sandbox session summary; tool evaluation notes; governance compliance checklist for piloting a new AI tool; exportable packet for institutional review or workshop use.

---

## F. Core Modules

The prototype is organized around seven high-value modules. All modules share the same state object and rules engine. Each module corresponds to one or more screens.

- **Workflow Mode Selector** — entry point; selects and persists user mode; applies mode-specific vocabulary throughout the app for every subsequent screen.
- **Interactive Layer Map** — visual representation of the six governance layers with mode-specific labels; each layer expands to show what belongs there, what can move forward, and what must stay protected; color-coded by risk level.
- **Document / Material Router** — progressive questionnaire that classifies a described material, identifies sensitivity flags, and returns a routing recommendation (SAFE / SAFE WITH REVIEW / RESTRICTED) with a plain-language rationale.
- **Protected Material Checker** — standalone quick-check tool; user selects a material category and receives an immediate risk assessment and plain-language guidance; does not require completing the full questionnaire.
- **Scenario Simulator** — curated set of 6–8 scenarios per mode; user works through a realistic case and sees how the governance model applies; decision rationale is revealed at the end.
- **AI-Safe Packet Builder** — guided workflow for preparing a working packet from a described material; includes a simulated token budget estimator and a pre-flight checklist; produces a copy-ready packet template for immediate use.
- **Decision Summary / Exportable Report** — session-level log of routing decisions, warnings issued, and packets prepared; exportable as plain text or Markdown; no real data stored — all values are derived from questionnaire responses.

**Deferred to v2+:** File upload with local processing; live AI provider routing; multi-session history; institutional configuration panel; real-time audit log; multi-user permissions.

---

## G. Data Model

The prototype stores only local state. No real documents, no institutional data, no user accounts. All state is mock-object based and localStorage-persisted for demo continuity.

### Session State Object (stored in localStorage)

```
{
  mode: 'faculty' | 'ctl' | 'admin' | 'sandbox',
  currentScenario: null | scenarioId,
  routerAnswers: {
    materialType, containsStudentData, containsPersonnelData,
    publishedStatus, intendedTool, userOwnership, coAuthorConsent
  },
  routingResult: {
    recommendation: 'safe' | 'review' | 'restricted',
    warnings: [],
    rationale: '',
    allowedActions: [],
    blockedActions: []
  },
  packetDraft: {
    title, contentDescription, tokenEstimate,
    preflightChecks: [], status: 'incomplete' | 'ready'
  },
  decisions: [{ timestamp, materialType, recommendation, mode }],
  sessionComplete: false
}
```

### Configuration Files (JSON, loaded locally, not in localStorage)

- `rules.json` — routing rules, sensitivity categories, warning language library
- `scenarios.json` — scenario content and flow logic per mode
- `glossary.json` — governance terms with mode-specific definitions and plain-language explanations
- `modes.json` — mode definitions, vocabulary maps, layer names per mode

No real names, real documents, real student data, real personnel data, or real institutional records are processed or stored anywhere in v1.

---

## H. Interface Design

The prototype has nine screens or states, all rendered dynamically within a single `index.html` shell. Screen transitions are JavaScript-driven; no page reloads.

**Screen 1 — Landing**
App title and tagline. Three key questions the app helps answer. Mode selector entry point. Brief "how it works" explanation (three steps, no jargon). Persistent disclaimer: "This is a decision-support prototype, not legal advice."

**Screen 2 — Mode Selection**
Four mode cards with icon, title, target user description, and an example scenario chip. Selection persists in localStorage. Mode can be changed from the header at any time without losing session decisions.

**Screen 3 — Layer Map**
Six-layer visual with mode-specific labels applied from the selected mode. Color coding: green (safe), amber (review required), red (restricted). Each layer expands on click/tap to show: what belongs here, what can safely move forward, what must stay protected. Non-technical copy throughout.

**Screen 4 — Scenario Selection**
Grid of scenario cards per mode: title, one-sentence description, material type chip, estimated session length. "Describe my own situation" option opens the Document Router directly.

**Screen 5 — Document Router Questionnaire**
Progressive multi-step questionnaire (5–8 questions). Each answer updates a live risk-level indicator (traffic-light metaphor: green / amber / red). Questions are in plain language; sensitive-category logic runs in the rules engine, not visible to the user. Step indicator shows current position.

**Screen 6 — Risk Results**
Routing recommendation displayed prominently (SAFE / SAFE WITH REVIEW / RESTRICTED). Plain-language explanation of why. Two-column display: "What you CAN do with this material" and "What you should NOT do." Next-step button adapts to the recommendation: Build Packet / Proceed with Caution / Stop — this material must stay protected.

**Screen 7 — AI-Safe Packet Builder**
Guided packet preparation form. Asks: What do you want to accomplish with this material? What will you exclude? Token budget estimator (dropdown: document type → estimated length → approximate context window percentage). Pre-flight checklist (5–6 items, all must be checked). Copy-ready packet template generated at completion.

**Screen 8 — Decision Summary / Export**
Session log: materials reviewed, routing decisions, warnings issued, packets built. Export as plain text or Markdown. Session reset button clears all localStorage state. No real content in the export — all values are derived from questionnaire answers.

**Screen 9 — Governance Glossary / About**
Searchable governance term glossary with mode-specific vocabulary applied. Each term shows its meaning in all four mode vocabularies. "How this app works" plain-language explanation. What the app is and is not. Version and contact.

---

## I. Decision Rules

These rules are implemented in `rules-engine.js` and configured in `rules.json`. They power the Document Router and the Protected Material Checker.

### Category: Restricted — Cannot Enter External AI Tools

- Material contains student names, grades, enrollment status, disciplinary records, or any individually identifiable student information → **RESTRICTED (FERPA)**
- Material is a personnel record: annual review, tenure file, promotion dossier, hiring committee deliberation, disciplinary action record → **RESTRICTED (Personnel Confidentiality)**
- Material is a confidential committee document: tenure deliberation minutes, grievance records, accreditation self-study pre-release → **RESTRICTED (Institutional Confidentiality)**
- Material is an unpublished manuscript or pre-submission grant proposal involving co-authors or human subjects data not solely owned by the user → **RESTRICTED (Copyright / Co-authorship / IRB)**
- Material is a confidential institutional financial record, legal document, contract, or pending litigation document → **RESTRICTED (Legal / Financial)**

### Category: Safe with Review — Can Enter AI Drafting Space with Precautions

- User's own unpublished manuscript (sole author, not under confidential review): may enter AI drafting space with user confirmation; cannot be uploaded to tools with persistent training data rights without review of terms of service
- In-progress grant proposal (user's own, no co-investigators' confidential data): may be used in AI drafting space with token-limited excerpts; submitted proposals require checking the funding agency's AI use policy
- Meeting notes not containing personnel discussion or student-identifiable information: may be AI-summarized; results require human review before circulation
- Policy draft not yet officially approved: may be AI-assisted in drafting; AI-generated language cannot be adopted as official policy without a human review and institutional approval process
- Aggregate, de-identified course assessment data: may be AI-summarized with user confirmation of de-identification; individual identifiability must be verified before routing

### Category: Safe — Standard AI Use with Attribution

- User's own published scholarship, peer-reviewed articles, published books → SAFE; AI-generated summaries must not replace original citation
- Publicly available course descriptions, program learning outcomes, catalog copy → SAFE; AI-assisted revisions require human review before official submission
- Conference talk slides and public presentations → SAFE; cannot be treated as canonical record or policy without review
- Publicly available policy documents, regulations, official institutional publications → SAFE for reference and synthesis; AI output cannot be treated as authoritative interpretation of those policies

### No-Recursive-Upload Rule

Any material produced in the AI Output / Drafting Layer — including AI-generated summaries, AI-assisted drafts, AI-generated outlines, or tool-specific outputs — **cannot be routed back into the Canonical Source Layer or Official Record without explicit human review and validation.** The prototype enforces this as a mandatory checkpoint in the AI-Safe Packet Builder: if the user indicates the input material originated from prior AI output, the router issues a warning and requires a manual confirmation step before proceeding.

### Sandbox-Specific Rule

Materials used in Tool Testing / AI Sandbox mode must be confirmed as non-sensitive before any sandbox workflow begins. The prototype displays a mandatory acknowledgment screen: "I confirm this material contains no real student data, no personnel records, and no confidential institutional information."

---

## J. Technical Architecture

### Core Principles

- **Static-first.** The entire prototype deploys from a single directory to GitHub Pages with no build step, no server, and no dependencies.
- **No backend in v1.** All state is localStorage. Configuration is JSON loaded locally via fetch.
- **No login in v1.** Single-user, browser-local prototype. No authentication, no accounts, no session server.
- **No external AI calls in v1.** All AI workflow simulations are local. Tool guidance cards are informational only. No API keys anywhere in the codebase.
- **No ES modules.** Classic globals with a fixed script load order. One script tag per file in `index.html`. GitHub Pages compatible without a bundler.
- **FEATURES flags.** A `FEATURES` object in `config.js` gates all optional capabilities (`FEATURES.liveAiRouting = false`, `FEATURES.fileUpload = false`, `FEATURES.mcpIntegration = false`). Future capabilities are enabled by changing a flag, not rewriting logic.
- **JSON-driven configuration.** All mode vocabulary, routing rules, scenarios, and glossary terms live in JSON files. Adding a scenario, changing institutional vocabulary, or updating a risk rule requires only a JSON edit.
- **Future-ready separation.** Config, state, rules engine, UI, and initialization are in separate files with clear contracts. A future backend migration replaces the state layer (localStorage → API) without touching rules logic or UI rendering.

### Script Load Order (Fixed)
`config → modes → state → rules-engine → scenarios → packet-builder → report-builder → ui → app`

### Deployment
GitHub Pages via `vikthor1.github.io/[repo-name]/`. Direct push to `main` deploys instantly. No CI/CD required for v1.

---

## K. File Structure

```
canondesk/
  index.html                        — single HTML shell; all screens rendered here
  README.md                         — purpose, quick start, mode guide, governance overview
  assets/
    css/
      styles.css                    — all CSS; mobile breakpoints at the bottom
    js/
      config.js                     — FEATURES flags, APP_CONFIG, app-level constants
      modes.js                      — four mode definitions, vocabulary maps, layer names
      state.js                      — global STATE object, localStorage read/write helpers
      rules-engine.js               — routing logic, risk assessment, no-recursive-upload guard
      scenarios.js                  — scenario content and simulation flow logic
      packet-builder.js             — AI-safe packet construction, token estimator simulation
      report-builder.js             — decision summary generation, export to text/Markdown
      ui.js                         — all rendering functions, screen transitions, DOM cache
      app.js                        — initialization sequence, event wiring, boot order
    data/
      rules.json                    — routing rules, sensitivity categories, warning language
      scenarios.json                — scenario content per mode
      glossary.json                 — governance terms with mode-specific definitions
      modes.json                    — mode definitions and vocabulary maps
  docs/
    roadmap.md                      — this document
    demo-script.md                  — CUNY Faculty Affairs walkthrough with talking points
    governance-glossary.md          — plain-language governance reference
    user-guide.md                   — faculty and administrator guide
    future-saas-notes.md            — deferred features, scaling architecture, v2+ plan
  SYSTEM_MEMORY.md                  — LOCAL ONLY, not committed; AI session briefing
```

---

## L. August-Ready Build Plan

### Week 1 — Concept, Naming, Specs, Data Model
- Confirm product name (CanonDesk recommended)
- Draft six-layer governance model with full vocabulary maps for all four modes
- Write initial `rules.json`, `glossary.json`, `modes.json` with working content (not final copy)
- Define all nine screens and the navigation model
- Document all four modes: scenarios, risk categories, final outputs
- **Deliverable:** Complete governance model document + initial JSON config files

### Week 2 — Static Shell, Mode Selector, Layer Map
- Build `index.html` shell with all screen containers (empty, for scaffolding)
- Build `styles.css` foundation: typography, color system, layout grid, design tokens, component primitives
- Implement `config.js`, `modes.js`, and `state.js`
- Build Screen 2 (Mode Selector) — functional, localStorage-persisted
- Build Screen 3 (Layer Map) — static rendering, mode-vocabulary aware
- **Deliverable:** Working shell with mode switching and a readable layer map

### Week 3 — Document Router and Risk Rules
- Implement `rules-engine.js` with initial routing logic for all material categories
- Build Screen 5 (Document Router questionnaire) — 6 questions, live risk-level indicator
- Build Screen 6 (Risk Results) — three routing states with plain-language rationale
- Build Protected Material Checker quick-check panel
- Wire all routing output to mode-specific vocabulary
- **Deliverable:** Functioning document router with correct routing for all 8–10 material categories

### Week 4 — Scenario Simulator and Summary Report
- Populate `scenarios.json` with 4–6 scenarios per mode (minimum 2 per mode for demo)
- Build Screen 4 (Scenario Selection)
- Build scenario simulation flow using the rules engine internally
- Build Screen 8 (Decision Summary) — session log, export as plain text and Markdown
- **Deliverable:** Scenario simulator working end-to-end for at least one mode

### Week 5 — AI-Safe Packet Builder and Token Estimator
- Implement `packet-builder.js` — packet template structure, pre-flight checklist
- Build Screen 7 (AI-Safe Packet Builder)
- Build simulated token budget estimator: document type → approximate token range → context window percentage display
- Build copy-ready packet output
- **Deliverable:** Full packet builder flow working for at least one scenario

### Week 6 — UI Polish, Accessibility, Glossary
- Build Screen 9 (Governance Glossary / About) with mode-specific vocabulary filter
- Polish Screen 1 (Landing) with final copy and mode selector entry
- Full accessibility pass: keyboard navigation, ARIA labels, color contrast, focus management
- Mobile responsive pass: all screens usable on tablet (768px) and phone (390px)
- Warning component library: consistent amber and red warning banners applied across all screens
- **Deliverable:** All nine screens visually complete, accessible, and mobile-ready

### Week 7 — Testing with Mock Scenarios
- Complete all scenario content for all four modes
- Run routing logic against all material categories — verify all recommendations
- Test no-recursive-upload guard across all routing paths
- Test localStorage persistence, session reset, and state restoration
- Test export function (plain text and Markdown)
- Accessibility spot checks on all nine screens
- Full demo session end-to-end
- **Deliverable:** All tests passing; demo script drafted; no console errors during demo

### Week 8 — CUNY-Facing Demo Script and Final Refinement
- Complete `docs/demo-script.md` — full Faculty Affairs walkthrough with talking points for a non-technical audience
- Complete `docs/user-guide.md` — faculty and administrator plain-language guide
- Final copyediting pass: all user-facing text reviewed for plain language, consistency, and bilingual readiness
- Final disclaimer review: confirm the prototype does not claim legal compliance anywhere
- GitHub Pages deployment confirmation and URL finalization
- **Deliverable:** Demo-ready prototype, deployed, documented, presentable to Faculty Affairs stakeholders

---

## M. Scope Boundaries

### Build Now — v1 Prototype

- Interactive demo running entirely in a browser, no installation required
- Four workflow modes with mode-specific vocabulary throughout
- Governance layer map with mode labels
- Document router with routing logic for 8–10 material categories
- Scenario simulator with 4–6 scenarios per mode (minimum 2 per mode for August demo)
- AI-safe packet builder (simulated, local only)
- Token budget estimator (simulated lookup table, not calculated)
- No-recursive-upload guard as a checkpoint in the packet builder
- Decision summary with plain-text and Markdown export
- Governance glossary with mode-specific vocabulary
- localStorage state persistence across sessions
- GitHub Pages deployment
- CUNY Faculty Affairs demo script and user guide

### Defer to v2+

- User accounts and authentication (SSO, CUNY login, institutional identity)
- Real file upload and local processing
- Database or any institutional storage
- Live AI provider routing (actual API calls to Claude, GPT-4, Gemini, or others)
- MCP integration
- Multi-user sessions, institutional configuration panels, admin dashboards
- Audit logs and compliance reporting
- Multi-institution or multi-campus deployment
- Procurement-ready enterprise packaging or SLA agreements
- Student-facing governance materials
- Real-time collaboration
- Bilingual interface (English-only in v1; architecture should support bilingual addition without structural rewriting)
- Legal compliance certification of any kind

---

## N. Testing Plan

### Routing Logic Tests
- All 8–10 material categories return the correct recommendation for all four modes
- FERPA-flagged materials always return RESTRICTED regardless of mode
- Personnel records always return RESTRICTED regardless of mode
- User's own published work returns SAFE in all modes
- No-recursive-upload guard triggers when AI-generated material is described as the input source

### Mode-Specific Language Tests
- All six layer names render correctly for each of the four modes
- Mode vocabulary switches correctly when mode is changed mid-session
- Glossary definitions match the vocabulary of the currently selected mode

### Scenario Tests
- Each scenario produces the correct routing recommendation when run through the document router
- Scenario simulation completes without error for all four modes
- Custom scenario (entered via document router) produces a valid routing result

### Packet Builder Tests
- Packet builder is only accessible when the routing result is SAFE or SAFE WITH REVIEW
- Pre-flight checklist blocks packet generation if any item is unchecked
- Token estimator returns a plausible range for each document type
- Packet template output is copy-ready and contains no unfilled placeholder text

### localStorage Tests
- Mode selection persists on page reload
- Session decision log persists on page reload
- Reset clears all session state completely
- No cross-session data contamination

### Export Tests
- Summary report exports as valid plain text
- Summary report exports as valid Markdown
- No real document content appears in any export (all values are questionnaire-derived)

### Accessibility Tests
- All interactive elements reachable by keyboard alone
- All three risk states distinguishable without color (shape, icon, or text label in addition to color)
- ARIA labels present on all modal and dialog elements
- Color contrast ≥ 4.5:1 for all text/background combinations

### Demo Reliability Tests
- Full demo session (Mode 3 recommended for Faculty Affairs context) completes end-to-end without error
- App loads on Chrome, Firefox, and Safari without console errors
- App is usable on a 768px tablet viewport
- No API keys, no real data, no sensitive content exposed anywhere in the built files

---

## O. Implementation Risks

**Overbuilding the rules engine before the UI is stable.**
The rules engine is intellectually satisfying to design but must stay simple until the UI proves what users actually need. Start with 6–8 rules. Do not write 40 rules for a demo that will use 6 scenarios.

**Governance language that reads like a compliance audit.**
Every screen must be reviewed through the Story Writer lens before it ships. Risk language must help users make decisions confidently, not make them feel surveilled or penalized. Words like "violation," "prohibited," and "illegal" do not belong in the UI unless the routing result genuinely warrants them.

**Ambiguous or overclaimed governance recommendations.**
The app must never say "this is legal" or "this complies with FERPA." It says: "based on your answers, this material type typically requires the following precautions." The disclaimer must be visible on every screen that produces a recommendation.

**Four modes creating four times the work.**
The governance model is identical across all modes. Only vocabulary and scenario content differ. Build the core logic and one complete mode before extending to the other three. Any architecture change made before Mode 1 is stable will require four-way updates.

**Token budget estimator appearing more authoritative than it is.**
The estimator is a simulation for orientation, not a measurement tool. Copy must say so clearly. In v1, a lookup table (document type → approximate token range) is sufficient and safer than a calculated value.

**Solo developer pacing.**
Week 5 (packet builder and token estimator) is the most complex build week and arrives when fatigue is highest. Simplify early and add fidelity later. A working packet checklist with a static token range estimate is better than a sophisticated estimator that delays the demo.

**MCP or live AI integration pressure.**
As the prototype matures, there will be temptation to wire in a live AI API to make it feel more dynamic. Resist this in v1. The governance model is the product. Live AI would distract from it and create privacy exposure in a demo environment.

**Confusing the prototype with a compliance product.**
If institutional stakeholders misread CanonDesk as an official compliance or legal tool, it will immediately require procurement review, IT security clearance, and legal vetting — the exact outcome this architecture is designed to avoid. Every public-facing description and every screen must make the prototype's role as a decision-support and training tool unambiguous.

---

## P. Final Recommendation

### The Smallest Strong Prototype

CanonDesk v1 needs to do three things compellingly:

**1. Make governance visible.**
The Layer Map must be immediately legible to a faculty member or administrator who has never thought about AI governance. It must answer, within ten seconds of looking at it: "What can I do with this material, and what should I leave alone?"

**2. Make the decision feel personal.**
The Document Router must feel like it is responding to the user's specific situation — not delivering a generic policy lecture. The routing result must be specific, plain, and actionable.

**3. Leave users with something useful.**
The AI-Safe Packet Builder must produce an output users can carry into their next real AI session. If they leave with nothing they can act on, the app is interesting but not compelling.

### The Strongest Demo Narrative for Faculty Affairs

Lead with Mode 3 (Administrative / Faculty Affairs Workflow). Walk through a single realistic scenario: a Faculty Affairs coordinator prepares a briefing memo, checks whether AI assistance is appropriate for each element, builds a working communications packet, and receives an exportable summary report she can attach to a governance file. This scenario requires no technical explanation, demonstrates institutional value immediately, and shows exactly the kind of principled decision-making Faculty Affairs offices are trying to build across their campuses.

### Path to Pilot

1. **August demo** — CUNY Faculty Affairs fellowship context; one complete scenario, Mode 3 primary.
2. **CTL workshop version** — one-session facilitated workshop using Mode 2 scenarios; faculty developers run it themselves.
3. **Faculty development webinar** — self-guided Mode 1 scenarios with governance glossary; no facilitation required.
4. **Institutional pilot** — offer CanonDesk as a free, open-source governance tool to 2–3 CUNY campuses or peer institutions.
5. **SaaS path (v2+)** — institutional configuration panel, multi-user audit log, branded deployment, subscription model.

The prototype does not need to be enterprise software to be compelling. It needs to be clear, credible, and immediately useful to the people in the room on demo day.

---

*End of roadmap. Version 1.0 — May 2026. This is a living document. Update each section as naming, scope, and build decisions are confirmed. Each lettered section can become a standalone GitHub issue or Obsidian note.*
