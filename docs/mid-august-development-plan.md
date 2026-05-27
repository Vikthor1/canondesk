# Veritas Compass — Mid-August Development Plan

*Version 1.0 — May 2026 | Active build roadmap*

---

## 1. Purpose of This Development Plan

This is the active implementation control document for building the Veritas Compass prototype by mid-August 2026. It is not a product vision document, a strategic roadmap, or a requirements specification. Those already exist:

- `docs/ai-scholar-architecture-roadmap.md` — full product strategy and role definitions
- `docs/mvp-checkpoint.md` — minimum viable scope and demo-day definition of done
- `docs/project-brief.md` — product identity, target users, governance model

This plan synthesizes those documents into a narrow, patch-by-patch build sequence. Its purpose is session control: every future development session should open this file first, confirm which patch is active, and close with this file updated.

**Do not rewrite this plan during a build session.** Update `docs/session-status.md` for milestone notes. Update this plan only when the patch sequence changes or a new risk surfaces.

**Pre-Patch-2 architectural stress test (2026-05-27) — Verdict: Proceed with modifications.** Four decisions recorded before UI implementation begins. See §4 (revised user path, layer map reclassified), §6 (revised Patch 2 and Patch 3 definitions), and §9 (Workflow Route concept).

---

## 2. Product Identity

| Field | Value |
|---|---|
| **Public name** | Veritas Compass |
| **Tagline** | *An AI workflow guide for privacy, authorship, and academic judgment* |
| **Former provisional name** | CanonDesk — internal/session reference only |
| **Local folder** | `~/Sites/canondesk/` — not renamed yet |
| **GitHub repo** | `https://github.com/Vikthor1/canondesk` — not renamed yet |
| **Repo rename decision** | Deferred — decide before public launch, not before August demo |

**Naming rule for all future code:** UI copy and JS logic must never hard-code the string `"Veritas Compass"`. All references go through `config.appName`. This is enforced starting in Patch 1 when `config.js` is created.

**JSON meta blocks** in `modes.json`, `rules.json`, `scenarios.json`, and `glossary.json` still carry `workingName: "CanonDesk"` and `brandingStatus: "provisional"` from Week 1. Update these in Patch 1 when `config.js` is written and the naming pattern is active.

---

## 3. Mid-August Prototype Thesis

The prototype must prove one thing:

> A CUNY Faculty Affairs coordinator, CTL director, or academic administrator can describe a material, understand whether it is safe for AI use, requires review, or must remain protected — and export a plain-language decision summary — without uploading real documents or sensitive data.

Everything in this build plan serves that thesis. Features that do not serve it are deferred.

---

## 4. Demo-First User Path

This is the first complete vertical slice. Build it before anything else. Extend to other modes only after this path runs without errors.

### Complete User Path (Mode 3 — Administrative)

| Step | Screen | Status |
|---|---|---|
| 1 | Landing — app name, tagline, call to action, disclaimer | Build in Patch 2 (replaces boot screen) |
| 2 | Mode selector — 4 modes, Mode 3 emphasized, localStorage-persisted | Build in Patch 2 |
| 3 | Scenario selector — 2 active Mode 3 scenarios + "describe my material" | Build in Patch 4 |
| 4 | Document / material router — progressive questionnaire, live risk indicator | Build in Patch 5 |
| 5 | Risk result screen — SAFE / SAFE WITH REVIEW / RESTRICTED + rationale + authorship prompts | Build in Patch 6 |
| 6 | Decision summary export — session log, Markdown export | Build in Patch 7 |

**Governance / trust map (six-layer model) — reclassified as optional reference panel.** Not a required step in the main user path. Built in Patch 3 as an accessible component, reachable via a "How does this work?" link from the landing, mode selector, router, and result screens. Users routing a document never pass through the layer map as a mandatory step; it is available at any time for reference.

### Primary Demo Scenario

`mode3-briefing-memo` — already active in `scenarios.json`. A Faculty Affairs coordinator routes committee notes and draft policy language, builds a Briefing & Communications Packet from approved materials, and exports a governance summary. This scenario already has complete step logic and routing messages.

### What Is Fully Built (Data Layer — Week 1)

- `assets/data/modes.json` — Mode 3 fully defined; Modes 1/2/4 stubbed
- `assets/data/rules.json` — 4 active Mode 3 material categories with routing rules; 3 stubbed
- `assets/data/scenarios.json` — 2 active Mode 3 scenarios; 3 stubs
- `assets/data/glossary.json` — 10 governance terms with mode-specific label overrides

### What Is Lightly Scaffolded (Deferred Content)

- Modes 1, 2, 4 — schemas correct, content minimal; expand after Mode 3 demo path is stable
- Packet builder — simulated checklist only; no sophisticated token estimator in v1
- Governance glossary screen — display-only; no search in v1

### What Is Deferred

See Section 11.

---

## 5. Architectural Spine

These eight files must exist and be wired correctly before any UI expansion. They are the non-negotiable foundation. Do not skip files or merge responsibilities.

| File | Responsibility |
|---|---|
| `index.html` | Single HTML shell. All screen containers rendered here. No content — only structure and script tags. |
| `assets/css/styles.css` | All CSS. Design tokens (variables) defined first. Color system, typography, layout grid, component primitives. Mobile breakpoints at the bottom. No JavaScript. |
| `assets/js/config.js` | `APP_CONFIG` object: `appName`, `tagline`, `version`, `brandingStatus`. `FEATURES` flags object: all `false` in v1 (`liveAiRouting`, `fileUpload`, `mcpIntegration`, `fullFourModeParity`). Loaded first. No DOM access. |
| `assets/js/state.js` | Global `STATE` object with schema matching `docs/ai-scholar-architecture-roadmap.md §G`. `loadState()`, `saveState()`, `resetState()` helpers. All localStorage access is isolated here — no other file touches localStorage directly. |
| `assets/js/data-loader.js` | Fetches all four JSON config files. Exposes global `DATA` object: `DATA.modes`, `DATA.rules`, `DATA.scenarios`, `DATA.glossary`. Loaded before any logic file. No routing logic. |
| `assets/js/rules-engine.js` | Routing logic only. Reads `DATA.rules`. Returns a `RoutingResult` object: `{ recommendation, warnings, rationale, allowedActions, blockedActions }`. No DOM access. No state writes. |
| `assets/js/ui.js` | All DOM rendering functions. Screen transitions. DOM node cache. Reads `STATE` and `DATA`. Calls `rules-engine.js`. Never fetches data directly. |
| `assets/js/app.js` | Initialization sequence and event wiring only. Calls `loadState()`, then `DATA` fetch, then first screen render. Loaded last. |

### Script Load Order (Fixed — enforced by order in `index.html`)

`config.js → state.js → data-loader.js → utils.js → ui.js → app.js` (then `rules-engine.js` added in Patch 5)

**Module boundary rule (enforced from Patch 2 forward):**
- `utils.js` — pure helper functions only (`escHtml`, `setText`, etc.); no DOM access; no state access; exposed as `window.VC_UTILS`
- `ui.js` — all DOM rendering functions; reads `VC_STATE` and `VC_DATA`; never fetches data directly
- `app.js` — initialization and event wiring only; no DOM rendering functions

`modes.js`, `scenarios.js`, `packet-builder.js`, and `report-builder.js` from the master roadmap are **deferred** — their responsibilities are handled inline by `data-loader.js` (data) and `ui.js` (rendering) in v1. Add dedicated files only if a module grows large enough to warrant extraction.

---

## 6. Patch Sequence

Each patch is one session's work. Complete the exit criterion before opening the next patch. Do not combine patches. Do not refactor outside the patch's `Files touched` list.

---

### Patch 1 — Static Shell and Boot Architecture

**Goal:** A loadable page with a working boot sequence, correct config, and all JSON data accessible in the browser.

**Files touched:**
- `index.html` (create)
- `assets/css/styles.css` (create — design tokens and reset only; no layout)
- `assets/js/config.js` (create)
- `assets/js/state.js` (create)
- `assets/js/data-loader.js` (create)
- `assets/data/modes.json` (update meta block: `workingName → "Veritas Compass"`, `brandingStatus → "locked"`)
- `assets/data/rules.json` (update meta block only)
- `assets/data/scenarios.json` (update meta block only)
- `assets/data/glossary.json` (update meta block only)
- `docs/session-status.md` (update milestone)

**Files not touched:** `rules-engine.js`, `ui.js`, `app.js`, all `docs/` except `session-status.md`

**Exit criterion:** Page loads without console errors. `console.log(APP_CONFIG.appName)` returns `"Veritas Compass"`. `console.log(DATA.modes)` returns the four mode objects. `console.log(STATE)` returns the initialized state object.

**Test to run:** Open in Chrome. Open DevTools console. Verify the three log checks above. Verify no 404 errors on JSON fetches.

**Commit message pattern:** `feat: boot architecture — config, state, data-loader, static shell`

---

### Patch 2 — Landing Screen + Mode Selector + State Persistence

**Goal:** Replace the developer boot screen with a real user-facing landing screen, build a functional mode selector, and establish the shared utilities and rendering module architecture.

**Files touched:**
- `assets/js/utils.js` (create — shared helpers: `escHtml`, `setText`; exposed as `window.VC_UTILS`; loaded before `ui.js`)
- `assets/js/ui.js` (create — `renderLandingScreen()` and `renderModeSelector()`; owns all DOM rendering)
- `assets/js/app.js` (update — initialization and event wiring only; delegates all rendering to `ui.js`; `renderBootScreen` removed)
- `assets/css/styles.css` (extend — landing screen layout, mode card components)
- `index.html` (extend — `utils.js` added to load order before `ui.js`; mode selector screen container wired)
- `docs/session-status.md` (update)

**Files not touched:** `config.js`, `state.js`, `data-loader.js`, `rules-engine.js`, all JSON files, all `docs/` except `session-status.md`

**Exit criterion:** Landing screen renders on boot with app name, tagline, and a clear call to action. Boot status detail is console-only (not visible to users). All four mode cards render with correct labels and descriptions from `DATA.modes`. Selecting a mode writes to `VC_STATE.activeMode` and persists on page reload. Mode 3 is visually distinguished. Mode can be changed without losing previous routing decisions.

**Test to run:** Verify no "Boot check" text is visible in the UI. Select Mode 3. Reload. Confirm Mode 3 is still selected. Select Mode 1. Reload. Confirm Mode 1 is still selected.

**Commit message pattern:** `feat: landing screen, mode selector, utils/ui module architecture`

---

### Patch 3 — Governance Reference Panel (Optional)

**Goal:** Build the six-layer governance reference panel as an accessible, toggleable component. This is not a required step in the main user path — it is reachable at any time via a "How does this work?" link from the landing, mode selector, router, and result screens.

**Files touched:**
- `assets/js/ui.js` (extend — `renderGovernancePanel()` and toggle logic)
- `assets/css/styles.css` (extend — reference panel layout, color states: green/amber/orange/red; all states distinguishable without color)
- `index.html` (extend — reference panel container; "How does this work?" link added to landing and mode selector)
- `docs/session-status.md` (update)

**Files not touched:** All other JS files, all JSON files

**Exit criterion:** Complete Mode 3 demo path runs without opening the panel — panel is never required. "How does this work?" link is visible on the landing and mode selector screens. Clicking it renders the six-layer panel with the active mode's vocabulary. Switching modes updates panel vocabulary. Closing the panel returns focus to the originating screen. Color coding uses Layers 1 and 6 as green, Layer 2 as amber, Layer 3 as blue-green, Layer 4 as orange, Layer 5 as red. No color is used alone — each state includes a text label or icon.

**Test to run:** Run the full Mode 3 demo path without touching the panel. Then open the panel from the mode selector. Switch to Mode 1. Verify Layer 3 label changes to "Research Working Packet." Close the panel. Confirm routing state is unchanged.

**Commit message pattern:** `feat: governance reference panel (optional, accessible)`

---

### Patch 4 — Scenario Selector

**Goal:** Mode 3 scenarios rendered from `DATA.scenarios`. Selection stored in state. "Describe my own situation" button leads to the Document Router.

**Files touched:**
- `assets/js/ui.js` (extend — scenario card render function)
- `assets/css/styles.css` (extend — scenario card component)
- `index.html` (extend — scenario selector screen container wired)
- `docs/session-status.md` (update)

**Files not touched:** `rules-engine.js`, all JSON files

**Exit criterion:** Two Mode 3 scenario cards render with correct titles and descriptions. `mode3-briefing-memo` is visually marked as the primary demo scenario. Clicking a scenario stores the selection in `STATE.currentScenario`. "Describe my own situation" routes to the Document Router (Patch 5 screen — can be a placeholder at this stage).

**Test to run:** Click `mode3-briefing-memo`. Confirm `STATE.currentScenario === "mode3-briefing-memo"`. Confirm page reload preserves selection.

**Commit message pattern:** `feat: scenario selector for Mode 3`

---

### Patch 5 — Document / Material Router

**Goal:** Progressive questionnaire that reads from `DATA.rules`, produces a `RoutingResult`, and shows a live risk indicator. Covers all four active Mode 3 material categories.

**Files touched:**
- `assets/js/rules-engine.js` (create — routing logic for the 4 active Mode 3 categories)
- `assets/js/ui.js` (extend — questionnaire render, live risk indicator, step progress)
- `assets/css/styles.css` (extend — questionnaire steps, risk indicator: green/amber/red traffic light)
- `index.html` (extend — router screen container wired)
- `docs/session-status.md` (update)

**Files not touched:** All JSON files, `config.js`, `state.js`, `data-loader.js`

**Routing coverage for this patch (Mode 3 only):**
- `committee-notes` — RESTRICTED if personnel discussion; SAFE WITH REVIEW if procedural
- `draft-policy` — SAFE WITH REVIEW
- `approved-policy` — SAFE (with attribution)
- `personnel-records` — always RESTRICTED

**No-recursive-upload guard:** If the user indicates input material originated from prior AI output, `rules-engine.js` must issue a warning and require explicit confirmation before proceeding. This is a hard requirement, not a nice-to-have.

**Exit criterion:** All four Mode 3 material categories produce the correct recommendation. No-recursive-upload guard fires when appropriate. Live risk indicator updates on each answer. Questionnaire completes and writes result to `STATE.routingResult`.

**Test to run:** Route `personnel-records`. Confirm RESTRICTED. Route `approved-policy`. Confirm SAFE. Route `committee-notes` with "yes" for personnel. Confirm RESTRICTED. Route `committee-notes` with "no." Confirm SAFE WITH REVIEW.

**Commit message pattern:** `feat: document router with Mode 3 routing rules`

---

### Patch 6 — Risk Result Screen

**Goal:** Display the routing recommendation clearly with plain-language rationale, split action columns, and a persistent disclaimer.

**Files touched:**
- `assets/js/ui.js` (extend — result screen render from `STATE.routingResult`)
- `assets/css/styles.css` (extend — result screen, two-column action layout, warning banners)
- `index.html` (extend — result screen container wired)
- `docs/session-status.md` (update)

**Files not touched:** `rules-engine.js` (do not modify routing logic here), all JSON files

**Three states that must render correctly:**
- **SAFE** — green header, citation/attribution reminder, "What you CAN do" list from `allowedActions`
- **SAFE WITH REVIEW** — amber header, review requirements, both columns populated
- **RESTRICTED** — red header, plain-language restriction explanation, "What you should NOT do" list from `blockedActions`; next-step button reads "Stop — this material must stay protected"

**Disclaimer requirement:** The following text must appear on every result screen, below the recommendation: *"This is a decision-support tool, not legal advice. Recommendations are based on general governance best practices and require human review before any institutional action."*

**Authorship and academic judgment prompts:** Every result screen must also include two brief plain-language prompts below the routing recommendation. These address the authorship and academic judgment pillars of the product promise and do not change the routing result:
- *"Who reviews or signs off before this becomes official?"*
- *"What status should AI-assisted output have: draft, summary, recommendation, or official record?"*

**Exit criterion:** All three states render correctly from `STATE.routingResult`. Disclaimer is visible on all three states without scrolling on a 1024px viewport. Authorship prompts are visible on all three states. Next-step button adapts to recommendation. No-recursive-upload warning appears in the result when triggered.

**Test to run:** Run the full `mode3-briefing-memo` scenario routing. Confirm RESTRICTED result for personnel-containing committee notes. Confirm SAFE WITH REVIEW for procedural notes. Confirm disclaimer is visible.

**Commit message pattern:** `feat: risk result screen with three routing states`

---

### Patch 7 — Decision Summary Export

**Goal:** Session log of routing decisions exportable as Markdown. Minimal packet builder (guided checklist + copy-ready template). Session reset.

**Files touched:**
- `assets/js/ui.js` (extend — summary render, export function, packet checklist)
- `assets/css/styles.css` (extend — summary panel, export button, checklist component)
- `index.html` (extend — summary screen container wired)
- `docs/session-status.md` (update)

**Files not touched:** `rules-engine.js`, all JSON files

**Export requirements:**
- Export as Markdown only (plain text is a stretch goal for this patch)
- Output contains: mode selected, scenarios run, materials routed, recommendations, warnings issued, review status
- No real document content appears anywhere in the export
- All values derived from questionnaire answers stored in `STATE`

**Packet builder scope for this patch:** A five-item pre-flight checklist (all must be checked before generating the packet template). A copy-ready packet template rendered as a `<pre>` block with placeholder text. No token estimator in this patch — deferred to polish (Patch 8) or post-August.

**Session reset:** Clears `STATE` and localStorage completely. Prompts user to confirm before clearing.

**Exit criterion:** Full Mode 3 demo path — mode select → layer map → scenario → router → result → summary — completes without errors. Export produces valid Markdown with no placeholder artifacts. Session reset clears all state and returns to landing.

**Test to run:** Run complete Mode 3 demo path. Export. Open exported Markdown in a text editor. Verify content is complete and contains no unfilled `{{placeholder}}` text. Reset session. Confirm `STATE` is cleared.

**Commit message pattern:** `feat: decision summary export and session reset`

---

### Patch 8 — Accessibility, Polish, and Responsive Design

**Goal:** All screens meet WCAG 2.1 AA. Usable on 768px tablet for demo. No console errors in Chrome and Safari.

**Files touched:**
- `assets/css/styles.css` (responsive breakpoints, contrast fixes)
- `assets/js/ui.js` (ARIA labels, focus management, keyboard navigation)
- `index.html` (semantic HTML audit, landmark elements)
- `docs/session-status.md` (update)

**Accessibility requirements:**
- All interactive elements reachable by keyboard (Tab, Enter, Space)
- All three risk states distinguishable without color (shape, icon, or text label in addition to color)
- ARIA labels on all modal, dialog, and dynamic content regions
- Color contrast ≥ 4.5:1 for all text/background combinations
- Focus management: after screen transitions, focus moves to the new screen's heading

**Responsive target:** 768px (iPad) must be fully usable for demo. 390px (iPhone) is a stretch goal.

**Exit criterion:** Complete demo path on 768px Chrome with no horizontal scroll. DevTools Accessibility panel shows no critical violations. Keyboard-only navigation completes the full Mode 3 path.

**Test to run:** Open Chrome DevTools. Set viewport to 768px. Run complete demo path. Run Lighthouse Accessibility audit. Target score ≥ 85.

**Commit message pattern:** `fix: accessibility pass and responsive layout for demo`

---

### Patch 9 — GitHub Pages Demo Readiness

**Goal:** Prototype deployed and loading correctly at the GitHub Pages URL. All asset paths confirmed. No build step required.

**Files touched:**
- `index.html` (verify asset paths are relative, not absolute)
- `docs/session-status.md` (update with live URL)

**Files not touched:** No logic files, no JSON files

**Exit criterion:** Prototype loads at `https://vikthor1.github.io/canondesk/` (or equivalent) without 404 errors. All JSON data loads. Complete Mode 3 demo path runs from the live URL on Chrome and Safari.

**Test to run:** Open live URL on Chrome and Safari. Run complete demo path. Check DevTools Network tab — no 404s, no CORS errors.

**Commit message pattern:** `deploy: GitHub Pages demo readiness`

---

### Patch 10 — Faculty Affairs Demo Script

**Goal:** A non-technical walkthrough document a presenter can follow without technical assistance.

**Files touched:**
- `docs/demo-script.md` (create)
- `docs/session-status.md` (update)

**Files not touched:** All implementation files

**Script requirements:**
- Opens with the one-sentence pitch for a Faculty Affairs audience
- Walks through Mode 3, `mode3-briefing-memo` scenario, step by step
- Each step includes: what to click, what to say, why it matters to this audience
- Handles one likely question per screen ("Is this a compliance system?" — answer provided)
- Closes with what the demo proved and a suggested next step (pilot, workshop, follow-up)
- Length: 2–4 pages maximum

**Exit criterion:** A non-technical colleague can run the demo using only this script.

**Commit message pattern:** `docs: Faculty Affairs demo script for Mode 3`

---

## 7. Token-Saving Development Protocol

These rules apply to every future session — Claude, Kimi, or any other AI-assisted coding tool.

**Session entry:**
1. Read `SYSTEM_MEMORY.md` (fast re-entry context)
2. Read `docs/session-status.md` (current patch and milestone)
3. Read this file (active patch definition)
4. Read only the files listed under the active patch's `Files touched`
5. Do not read any other files unless the patch definition explicitly requires it

**During the session:**
- One patch per session. Do not begin Patch N+1 during a Patch N session.
- No opportunistic refactoring. No cleanup outside the patch's file list.
- No new features not in the patch definition.
- If a blocker is discovered that requires reading outside the patch scope, stop and report it rather than expanding scope.

**Tu Pana rule:** Do not inspect, reference, or modify any file under `~/Sites/tupana/`. This rule has no exceptions.

**Obsidian rule:** Do not modify Obsidian notes for routine code changes. Obsidian is a strategic reflection layer, not a session log.

**After each session, update:**
- `docs/session-status.md` — patch completed, files changed, exit criterion met
- `SYSTEM_MEMORY.md` — only for architecture decisions or protocol changes, not for routine patches

**End-of-session report format:**
- Files changed (list each)
- Exit criterion: met / not met
- Tests run and results
- Any risks or blockers for the next patch
- Suggested commit message

---

## 8. NotebookLM Export Strategy

NotebookLM export packets provide orientation context for sessions where re-reading source files would be too slow. They are supplements, not canon. All canonical decisions live in committed `docs/` files and the codebase.

**Do not create export packets until this development plan is reviewed and confirmed.**

**When to create:** After Patch 1 is complete and the boot architecture is stable.

**Recommended packet structure:**

| Packet | Source files to synthesize |
|---|---|
| `product-brief-packet.md` | `docs/project-brief.md` |
| `august-mvp-packet.md` | `docs/mvp-checkpoint.md` + this file §§3–4 |
| `governance-model-packet.md` | `docs/ai-scholar-architecture-roadmap.md §§I, D, E` + `assets/data/rules.json` |
| `technical-architecture-packet.md` | `docs/ai-scholar-architecture-roadmap.md §§J, K` + this file §5 |
| `data-contract-packet.md` | All four JSON files in `assets/data/` |
| `implementation-protocol-packet.md` | This file §§6–7 |
| `session-digest.md` | `docs/session-status.md` (update before each NotebookLM session) |

**Location:** `docs/notebooklm-exports/` (untracked — add to `.gitignore`)

**Rule:** NotebookLM outputs are orientation only. If a NotebookLM response conflicts with a committed `docs/` file or the codebase, trust the committed file.

---

## 9. Scalability Without Bloat

The prototype is built for a solo developer and a mid-August demo. It must also be extendable without a structural rewrite when institutional interest grows.

**How this architecture stays future-ready without over-engineering now:**

- **JSON-driven content.** Adding a new mode, scenario, material category, or governance term requires only a JSON edit. No code changes for content updates.
- **Mode vocabulary separated from logic.** `rules-engine.js` reads mode vocabulary from `DATA.modes` at runtime. A new mode requires a JSON entry, not a new rules file.
- **Rules engine separated from UI.** `rules-engine.js` returns plain objects. `ui.js` renders them. Swapping the UI framework (if ever) does not touch routing logic.
- **localStorage isolated in `state.js`.** A future backend migration replaces only `loadState()` and `saveState()` — one file, one concern.
- **`FEATURES` flags in `config.js`.** Live AI routing, file upload, MCP integration, and multi-user support are gated behind flags. Enabling them is a config change, not a refactor.
- **No backend assumptions in v1.** State shape is designed to be serializable to an API payload without restructuring. Session decisions array maps naturally to a database record.
- **Single HTML shell.** All screen transitions are JavaScript-driven. A future React or Svelte migration wraps the existing logic without rewriting governance rules.

**Workflow Route concept (planned future dimension — not a v1 screen):** A second routing axis that will ask "What are you trying to use AI for?" alongside the existing "What material do you have?" question. This will guide AI task-type appropriateness (summarizing vs. drafting vs. analyzing vs. generating), output status designation (draft, summary, recommendation, or official record), and required human review checkpoints. The concept is seeded in the step logic of `assets/data/scenarios.json`. Veritas Compass guides users *before* they use an AI tool — it is not a multi-LLM orchestration system and must never be positioned as one. The Workflow Route adds depth to the governance model without adding AI provider calls or live routing across systems.

**What must not be added before the August demo,** regardless of how reasonable it sounds:

- Custom institutional vocabulary configuration panel
- Real token counting via the Anthropic or OpenAI API
- Any persistent storage outside localStorage
- Any dependency that requires a `package.json` or a build step

---

## 10. Definition of Done for Mid-August

The prototype is demo-ready when all of the following are true:

**Functionality**
- [ ] Complete Mode 3 path works end-to-end: mode select → layer map → scenario → router → result → export
- [ ] At least one SAFE outcome, one SAFE WITH REVIEW outcome, and one RESTRICTED outcome are demonstrable
- [ ] No-recursive-upload warning fires correctly
- [ ] Decision summary exports as Markdown without errors
- [ ] Session reset clears all state

**Content and copy**
- [ ] All user-facing text is in plain language — no governance jargon without a plain-English gloss
- [ ] Disclaimer is visible on every screen that produces a recommendation
- [ ] No "CanonDesk" strings appear anywhere in the rendered UI (all references go through `config.appName`)
- [ ] No unfilled placeholder text appears in any export

**Technical**
- [ ] No console errors in Chrome or Safari on the live GitHub Pages URL
- [ ] All JSON data loads without 404 errors
- [ ] Page loads and first screen renders in under 3 seconds on a standard connection
- [ ] No API keys, no real data, no sensitive content anywhere in the deployed files

**Accessibility and display**
- [ ] Responsive and usable on a 768px tablet viewport for the demo
- [ ] All three risk states distinguishable without color
- [ ] Keyboard navigation completes the full Mode 3 path

**Documentation**
- [ ] `docs/demo-script.md` exists and covers the complete Mode 3 demo
- [ ] `docs/session-status.md` reflects current build state

---

## 11. Deferred Features

These must not be built before the August demo. If scope pressure mounts, this list is the first line of defense.

| Feature | Why deferred |
|---|---|
| Live AI provider calls | Adds privacy exposure, requires API keys, distracts from governance model |
| MCP integration | Architectural complexity; not needed for demo |
| Real file upload | Privacy risk in a demo environment; out of scope for v1 |
| Login / SSO / authentication | No multi-user use case before institutional pilot |
| Backend, database, audit logs | v2+ architecture; localStorage is sufficient for demo |
| Full four-mode parity | Mode 3 is the demo; Modes 1/2/4 are stubs for orientation only |
| Sophisticated token estimator | Lookup table is sufficient; a calculated value overstates precision |
| Searchable glossary | Display-only glossary is sufficient for demo |
| Enterprise compliance claims | The prototype is not a compliance system and must not imply otherwise |
| Bilingual interface | Architecture should support it; implementation is post-August |
| Institutional configuration panel | v2+ feature |
| SaaS packaging or pricing | Not relevant before the pilot succeeds |

---

## 12. Immediate Next Step After This Plan

**Next session: Patch 1 — Static shell and boot architecture.**

Prompt scope: Create `index.html`, `assets/css/styles.css` (design tokens only), `assets/js/config.js`, `assets/js/state.js`, and `assets/js/data-loader.js`. Update the four JSON meta blocks. Verify boot sequence in browser console. Do not build any UI components. Do not write routing logic.

Before opening that session, confirm:
- This plan has been reviewed and no section requires revision
- The repo/folder rename question has been resolved or explicitly deferred
- `docs/session-status.md` reflects the current state (Patch 1: not started)

---

*End of mid-August development plan. Version 1.0 — May 2026. Update this document only when the patch sequence changes or a new architectural risk surfaces. Routine session updates go to `docs/session-status.md`.*
