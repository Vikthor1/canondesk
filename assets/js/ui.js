(function () {
  'use strict';

  var DEMO_MODE_ID = 'administrative';

  /* ── Layer metadata maps (closed over — not exported) ─────────────────────── */

  var LAYER_STATUS_LABELS = {
    'safe-with-attribution': 'Trusted source',
    'safe-with-review':      'Working material',
    'safe-prepared':         'AI-safe packet',
    'review-required':       'Review before use',
    'restricted':            'Restricted — do not upload',
    'safe-post-review':      'Public output'
  };

  var LAYER_STATUS_CLASSES = {
    'safe-with-attribution': 'layer-status--green',
    'safe-with-review':      'layer-status--amber',
    'safe-prepared':         'layer-status--teal',
    'review-required':       'layer-status--orange',
    'restricted':            'layer-status--red',
    'safe-post-review':      'layer-status--green'
  };

  var LAYER_RULE_NOTES = {
    'no-recursive-upload': 'Note: AI output cannot return to the trusted source layer without explicit human review.',
    'never-external-ai':   'Rule: Materials in this layer must never enter an external AI system.'
  };

  window.VC_UI = {

    /* ── Governance panel helpers ─────────────────────────────────────────────── */

    // Build the panel inner HTML using the currently selected mode's vocabulary
    buildGovernancePanelContent: function (ctx) {
      var modes  = (ctx.data && ctx.data.modes  && Array.isArray(ctx.data.modes.modes))
        ? ctx.data.modes.modes  : [];
      var layers = (ctx.data && ctx.data.rules  && Array.isArray(ctx.data.rules.layers))
        ? ctx.data.rules.layers : [];
      var state  = VC_STATE.getState();
      var esc    = VC_UTILS.escHtml;

      // Find active mode object
      var activeMode = null;
      for (var i = 0; i < modes.length; i++) {
        if (modes[i].id === state.activeMode) { activeMode = modes[i]; break; }
      }

      var modeLabel  = activeMode ? activeMode.label : 'General';
      var layerVocab = (activeMode && activeMode.layerVocabulary) ? activeMode.layerVocabulary : {};

      var layersHtml = layers.map(function (layer) {
        var vocabKey    = 'layer' + layer.id;
        var label       = layerVocab[vocabKey] || layer.defaultLabel;
        var statusText  = LAYER_STATUS_LABELS[layer.riskLevel]  || layer.riskLevel;
        var statusClass = LAYER_STATUS_CLASSES[layer.riskLevel] || '';
        var ruleNote    = (layer.enforcedRule && LAYER_RULE_NOTES[layer.enforcedRule])
          ? '<p class="layer-rule-note">' + esc(LAYER_RULE_NOTES[layer.enforcedRule]) + '</p>'
          : '';

        return '<li class="layer-item layer-item--' + esc(layer.color || 'neutral') + '">' +
            '<div class="layer-item-header">' +
              '<span class="layer-number" aria-hidden="true">' + esc(String(layer.id)) + '</span>' +
              '<div class="layer-item-labels">' +
                '<span class="layer-label">' + esc(label) + '</span>' +
                '<span class="layer-status ' + esc(statusClass) + '">' + esc(statusText) + '</span>' +
              '</div>' +
            '</div>' +
            '<p class="layer-desc">' + esc(layer.description) + '</p>' +
            ruleNote +
          '</li>';
      }).join('');

      return '<div class="ref-panel-header">' +
            '<h3 class="ref-panel-title">How Veritas Compass organizes AI-use decisions</h3>' +
            '<button class="ref-panel-close" id="btn-close-panel" type="button" ' +
                'aria-label="Close governance reference panel">&times;</button>' +
          '</div>' +
          '<p class="ref-panel-intro">' +
            'This model helps you distinguish trusted records, working materials, AI-safe packets, ' +
            'AI-generated outputs, protected materials, and public outputs. ' +
            'Showing vocabulary for: <strong>' + esc(modeLabel) + '</strong>.' +
          '</p>' +
          '<p class="ref-panel-note">' +
            'This is a reference guide. You do not need to understand every layer before routing a document.' +
          '</p>' +
          '<ol class="layer-list">' + layersHtml + '</ol>' +
          '<p class="ref-panel-disclaimer disclaimer">' +
            'Decision-support prototype. Not legal advice or an official compliance system.' +
          '</p>';
    },

    // Build the trigger button + empty panel container as an HTML string
    buildRefTriggerHtml: function (panelId, triggerId) {
      var esc = VC_UTILS.escHtml;
      return '<div class="ref-trigger-row">' +
          '<button class="btn-ref-trigger" id="' + esc(triggerId) + '" type="button" ' +
              'aria-expanded="false" aria-controls="' + esc(panelId) + '">' +
            'How this works' +
            '<span class="ref-trigger-icon" aria-hidden="true">&#9660;</span>' +
          '</button>' +
        '</div>' +
        '<div class="ref-panel" id="' + esc(panelId) + '" hidden ' +
            'role="region" aria-label="Governance reference panel"></div>';
    },

    // Show and populate a reference panel by ID
    openPanel: function (panelId, triggerId, ctx, root) {
      var panel   = VC_UTILS.qs('#' + panelId,   root || document);
      var trigger = VC_UTILS.qs('#' + triggerId, root || document);
      if (!panel) { return; }

      panel.innerHTML = VC_UI.buildGovernancePanelContent(ctx);
      panel.hidden    = false;
      if (trigger) { trigger.setAttribute('aria-expanded', 'true'); }

      // Wire close button
      var closeBtn = VC_UTILS.qs('#btn-close-panel', panel);
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          VC_UI.closePanel(panelId, triggerId, root);
          if (trigger) { trigger.focus(); }
        });
      }
    },

    // Hide a reference panel by ID and return focus affordance to caller
    closePanel: function (panelId, triggerId, root) {
      var panel   = VC_UTILS.qs('#' + panelId,   root || document);
      var trigger = VC_UTILS.qs('#' + triggerId, root || document);
      if (panel)   { panel.hidden = true; }
      if (trigger) { trigger.setAttribute('aria-expanded', 'false'); }
    },

    /* ── Landing screen ───────────────────────────────────────────────────────── */

    renderLandingScreen: function (ctx) {
      var root   = ctx.root;
      var config = ctx.config;
      var esc    = VC_UTILS.escHtml;

      var PANEL_ID   = 'ref-panel-landing';
      var TRIGGER_ID = 'btn-how-works-landing';

      root.innerHTML =
        '<div class="screen landing-screen">' +

          '<div class="landing-brand">' +
            '<h1 class="landing-app-name">' + esc(config.appName) + '</h1>' +
            '<p class="landing-tagline">' + esc(config.tagline) + '</p>' +
          '</div>' +

          '<p class="landing-description">' +
            'Veritas Compass helps you decide what knowledge can safely move through AI tools, ' +
            'what must stay protected, and what requires human review &#8212; before you act.' +
          '</p>' +

          '<div class="landing-hooks">' +
            '<div class="hook-item">' +
              '<span class="hook-number" aria-hidden="true">1</span>' +
              '<p class="hook-text">What are you trying to use AI to do?</p>' +
            '</div>' +
            '<div class="hook-item">' +
              '<span class="hook-number" aria-hidden="true">2</span>' +
              '<p class="hook-text">What kind of material are you working with?</p>' +
            '</div>' +
            '<div class="hook-item">' +
              '<span class="hook-number" aria-hidden="true">3</span>' +
              '<p class="hook-text">What needs to stay protected or human-reviewed?</p>' +
            '</div>' +
          '</div>' +

          '<div class="landing-actions">' +
            '<button class="btn btn-primary" id="btn-start-role" type="button">' +
              'Start with your role' +
            '</button>' +
          '</div>' +

          VC_UI.buildRefTriggerHtml(PANEL_ID, TRIGGER_ID) +

          '<p class="disclaimer landing-disclaimer">' +
            'Decision-support prototype. Not legal advice or an official compliance system.' +
          '</p>' +

        '</div>';

      // Wire primary CTA
      var startBtn = VC_UTILS.qs('#btn-start-role', root);
      if (startBtn) {
        startBtn.addEventListener('click', function () {
          VC_UI.renderModeSelector(ctx);
          var heading = VC_UTILS.qs('.mode-selector-heading', root);
          if (heading) { heading.focus(); }
        });
      }

      // Wire governance panel trigger
      var trigger = VC_UTILS.qs('#' + TRIGGER_ID, root);
      if (trigger) {
        trigger.addEventListener('click', function () {
          var panel = VC_UTILS.qs('#' + PANEL_ID, root);
          if (panel && !panel.hidden) {
            VC_UI.closePanel(PANEL_ID, TRIGGER_ID, root);
          } else {
            VC_UI.openPanel(PANEL_ID, TRIGGER_ID, ctx, root);
          }
        });
      }
    },

    /* ── Mode selector ────────────────────────────────────────────────────────── */

    renderModeSelector: function (ctx) {
      var root  = ctx.root;
      var modes = (ctx.data && ctx.data.modes && Array.isArray(ctx.data.modes.modes))
        ? ctx.data.modes.modes : [];
      var state = VC_STATE.getState();
      var esc   = VC_UTILS.escHtml;

      var PANEL_ID   = 'ref-panel-selector';
      var TRIGGER_ID = 'btn-how-works-selector';

      var cardsHtml = modes.map(function (mode) {
        var isSelected    = state.activeMode === mode.id;
        var isRecommended = mode.id === DEMO_MODE_ID;

        var cardClass = 'mode-card' +
          (isSelected    ? ' mode-card--selected'    : '') +
          (isRecommended ? ' mode-card--recommended' : '');

        var badgeHtml = isRecommended
          ? '<div class="mode-badge">Faculty Affairs demo path</div>'
          : '';

        var selectedHtml = isSelected
          ? '<div class="mode-selected-indicator" aria-live="polite">&#10003; Selected</div>'
          : '';

        var btnClass  = 'btn mode-card-btn ' + (isSelected ? 'btn-primary' : 'btn-secondary');
        var btnLabel  = isSelected ? 'Continue with this role &#8594;' : 'Select this role';
        var btnExtras = '';

        return '<div class="' + esc(cardClass) + '">' +
            badgeHtml +
            selectedHtml +
            '<h3 class="mode-card-title">' + esc(mode.label) + '</h3>' +
            '<p class="mode-card-user">'  + esc(mode.targetUser)  + '</p>' +
            '<p class="mode-card-desc">'  + esc(mode.description) + '</p>' +
            '<button class="' + esc(btnClass) + '"' +
              ' data-mode-id="' + esc(mode.id) + '"' +
              ' type="button"' + btnExtras + '>' +
              btnLabel +
            '</button>' +
          '</div>';
      }).join('');

      root.innerHTML =
        '<div class="screen mode-selector-screen">' +
          '<div class="mode-selector-header">' +
            '<h2 class="mode-selector-heading" tabindex="-1">Select your workflow role</h2>' +
            '<p class="mode-selector-sub">' +
              'Choose the role that best matches how you are using AI today.' +
            '</p>' +
          '</div>' +
          '<div class="mode-grid" id="mode-grid">' +
            cardsHtml +
          '</div>' +
          VC_UI.buildRefTriggerHtml(PANEL_ID, TRIGGER_ID) +
          '<div class="mode-selector-nav">' +
            '<button class="btn btn-ghost" id="btn-back-landing" type="button">' +
              '&larr; Back to start' +
            '</button>' +
          '</div>' +
        '</div>';

      // Wire mode selection — navigates directly to scenario selector
      VC_UTILS.qsa('[data-mode-id]', root).forEach(function (btn) {
        btn.addEventListener('click', function () {
          VC_STATE.setMode(btn.getAttribute('data-mode-id'));
          ctx.state = VC_STATE.getState();
          VC_UI.renderScenarioSelector(ctx);
        });
      });

      // Wire governance panel trigger
      var trigger = VC_UTILS.qs('#' + TRIGGER_ID, root);
      if (trigger) {
        trigger.addEventListener('click', function () {
          var panel = VC_UTILS.qs('#' + PANEL_ID, root);
          if (panel && !panel.hidden) {
            VC_UI.closePanel(PANEL_ID, TRIGGER_ID, root);
          } else {
            VC_UI.openPanel(PANEL_ID, TRIGGER_ID, ctx, root);
          }
        });
      }

      // Wire back button
      var backBtn = VC_UTILS.qs('#btn-back-landing', root);
      if (backBtn) {
        backBtn.addEventListener('click', function () {
          VC_UI.renderLandingScreen(ctx);
        });
      }
    },

    /* ── Scenario selector ───────────────────────────────────────────────────── */

    renderScenarioSelector: function (ctx) {
      var root      = ctx.root;
      var state     = VC_STATE.getState();
      var esc       = VC_UTILS.escHtml;
      var scenarios = (ctx.data && ctx.data.scenarios && Array.isArray(ctx.data.scenarios.scenarios))
        ? ctx.data.scenarios.scenarios : [];
      var modes     = (ctx.data && ctx.data.modes && Array.isArray(ctx.data.modes.modes))
        ? ctx.data.modes.modes : [];

      var PANEL_ID   = 'ref-panel-scenario';
      var TRIGGER_ID = 'btn-how-works-scenario';

      var activeMode = null;
      for (var i = 0; i < modes.length; i++) {
        if (modes[i].id === state.activeMode) { activeMode = modes[i]; break; }
      }
      var modeLabel = activeMode ? activeMode.label : state.activeMode;

      var modeScenarios   = scenarios.filter(function (s) { return s.mode === state.activeMode; });
      var activeScenarios = modeScenarios.filter(function (s) { return s.status === 'active'; });

      var scenarioCardsHtml;
      if (activeScenarios.length > 0) {
        scenarioCardsHtml = activeScenarios.map(function (scenario) {
          var isPrimary = !!(scenario.demoNotes &&
            scenario.demoNotes.toLowerCase().indexOf('primary') === 0);
          var badgeHtml = isPrimary
            ? '<div class="scenario-badge">Primary demo scenario</div>'
            : '';
          return '<div class="scenario-card">' +
              badgeHtml +
              '<h3 class="scenario-card-title">' + esc(scenario.title) + '</h3>' +
              '<p class="scenario-card-desc">' + esc(scenario.shortDescription) + '</p>' +
              '<button class="btn btn-secondary scenario-select-btn" ' +
                'data-scenario-id="' + esc(scenario.id) + '" type="button">' +
                'Start this scenario' +
              '</button>' +
            '</div>';
        }).join('');
      } else {
        scenarioCardsHtml =
          '<div class="scenario-stub-notice">' +
            '<p>This workflow is scaffolded for the prototype. The August demo path ' +
            'currently focuses on <strong>Administrative / Faculty Affairs</strong> decisions.</p>' +
            '<p>Use the button below to return to role selection and try that workflow.</p>' +
          '</div>';
      }

      var customCardHtml =
        '<div class="scenario-card scenario-card--custom">' +
          '<h3 class="scenario-card-title">Describe my own material</h3>' +
          '<p class="scenario-card-desc">' +
            'Not sure which scenario fits? Describe what material you are working with ' +
            'and what you want AI to help you do.' +
          '</p>' +
          '<button class="btn btn-secondary scenario-select-btn" ' +
            'data-scenario-id="custom-material" type="button">' +
            'Start with my own material' +
          '</button>' +
        '</div>';

      root.innerHTML =
        '<div class="screen scenario-selector-screen">' +
          '<div class="scenario-selector-header">' +
            '<h2 class="scenario-selector-heading" tabindex="-1">Choose a scenario</h2>' +
            '<p class="scenario-selector-mode">' +
              'Role: <strong>' + esc(modeLabel) + '</strong>' +
            '</p>' +
            '<p class="scenario-selector-sub">' +
              'Select a scenario that matches your current task, or describe your own material.' +
            '</p>' +
          '</div>' +
          '<div class="scenario-grid" id="scenario-grid">' +
            scenarioCardsHtml +
            customCardHtml +
          '</div>' +
          VC_UI.buildRefTriggerHtml(PANEL_ID, TRIGGER_ID) +
          '<div class="scenario-selector-nav">' +
            '<button class="btn btn-ghost" id="btn-back-roles" type="button">' +
              '&larr; Change role' +
            '</button>' +
          '</div>' +
        '</div>';

      VC_UTILS.qsa('.scenario-select-btn', root).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var scenarioId = btn.getAttribute('data-scenario-id');
          VC_STATE.setScenario(scenarioId);
          ctx.state = VC_STATE.getState();
          VC_UI.renderMaterialRouter(ctx);
        });
      });

      var trigger = VC_UTILS.qs('#' + TRIGGER_ID, root);
      if (trigger) {
        trigger.addEventListener('click', function () {
          var panel = VC_UTILS.qs('#' + PANEL_ID, root);
          if (panel && !panel.hidden) {
            VC_UI.closePanel(PANEL_ID, TRIGGER_ID, root);
          } else {
            VC_UI.openPanel(PANEL_ID, TRIGGER_ID, ctx, root);
          }
        });
      }

      var backBtn = VC_UTILS.qs('#btn-back-roles', root);
      if (backBtn) {
        backBtn.addEventListener('click', function () {
          VC_UI.renderModeSelector(ctx);
        });
      }

      var heading = VC_UTILS.qs('.scenario-selector-heading', root);
      if (heading) { heading.focus(); }
    },

    /* ── Material router ─────────────────────────────────────────────────────── */

    renderMaterialRouter: function (ctx) {
      var root  = ctx.root;
      var state = VC_STATE.getState();
      var esc   = VC_UTILS.escHtml;
      var data  = ctx.data;

      var scenarios = (data && data.scenarios && Array.isArray(data.scenarios.scenarios))
        ? data.scenarios.scenarios : [];

      var scenarioId = state.currentScenarioId;
      var scenario   = null;
      for (var i = 0; i < scenarios.length; i++) {
        if (scenarios[i].id === scenarioId) { scenario = scenarios[i]; break; }
      }
      var scenarioTitle = scenarioId === 'custom-material'
        ? 'My own material'
        : (scenario ? scenario.title : 'Selected scenario');

      // Non-admin modes: stub notice
      if (state.activeMode !== DEMO_MODE_ID) {
        root.innerHTML =
          '<div class="screen router-screen">' +
            '<div class="router-header">' +
              '<h2 class="router-heading" tabindex="-1">Route your material</h2>' +
            '</div>' +
            '<div class="scenario-stub-notice">' +
              '<p>The material router is available for the <strong>Administrative / Faculty Affairs</strong> ' +
              'demo path only in this prototype.</p>' +
              '<p>Use the button below to return to role selection and try that workflow.</p>' +
            '</div>' +
            '<div class="router-nav">' +
              '<button class="btn btn-ghost" id="btn-back-scenarios" type="button">' +
                '&larr; Back to scenarios' +
              '</button>' +
            '</div>' +
          '</div>';

        var stubBackBtn = VC_UTILS.qs('#btn-back-scenarios', root);
        if (stubBackBtn) {
          stubBackBtn.addEventListener('click', function () {
            VC_UI.renderScenarioSelector(ctx);
          });
        }
        var stubHeading = VC_UTILS.qs('.router-heading', root);
        if (stubHeading) { stubHeading.focus(); }
        return;
      }

      // Build material category <select> options
      var categories   = VC_RULES.getMaterialCategories(data, state.activeMode);
      var catOptionsHtml = '<option value="">&#8212; Select a material type &#8212;</option>' +
        categories.map(function (cat) {
          return '<option value="' + esc(cat.id) + '">' + esc(cat.label) + '</option>';
        }).join('');

      // Build workflow route radios
      var routeOptions    = VC_RULES.getWorkflowRouteOptions();
      var routeRadiosHtml = routeOptions.map(function (opt) {
        return '<label class="router-radio-label">' +
            '<input type="radio" name="workflowRoute" value="' + esc(opt.id) + '"> ' +
            esc(opt.label) +
          '</label>';
      }).join('');

      function triOptions(name) {
        return [
          { val: 'yes',      label: 'Yes'      },
          { val: 'no',       label: 'No'       },
          { val: 'not-sure', label: 'Not sure' }
        ].map(function (o) {
          return '<label class="router-radio-label">' +
              '<input type="radio" name="' + esc(name) + '" value="' + esc(o.val) + '"> ' +
              esc(o.label) +
            '</label>';
        }).join('');
      }

      root.innerHTML =
        '<div class="screen router-screen">' +
          '<div class="router-header">' +
            '<h2 class="router-heading" tabindex="-1">Route your material</h2>' +
            '<p class="router-scenario-context">Scenario: <strong>' + esc(scenarioTitle) + '</strong></p>' +
            '<p class="router-sub">Answer the questions below to get a routing recommendation.</p>' +
          '</div>' +

          '<form class="router-form" id="router-form" novalidate>' +

            '<div class="router-form-group">' +
              '<label class="router-label" for="router-material-cat">' +
                'What type of material are you working with? <span aria-hidden="true">*</span>' +
              '</label>' +
              '<select class="router-select" id="router-material-cat" name="materialCategory" required>' +
                catOptionsHtml +
              '</select>' +
              '<div class="router-error" id="router-cat-error" role="alert" hidden>' +
                'Please select a material type before continuing.' +
              '</div>' +
            '</div>' +

            '<fieldset class="router-fieldset">' +
              '<legend class="router-label">What are you trying to use AI for?</legend>' +
              '<div class="router-radio-group router-radio-group--inline">' +
                routeRadiosHtml +
              '</div>' +
            '</fieldset>' +

            '<fieldset class="router-fieldset">' +
              '<legend class="router-label">' +
                'Does this material contain personnel, hiring, evaluation, tenure, or grievance information?' +
              '</legend>' +
              '<div class="router-radio-group router-radio-group--inline">' +
                triOptions('hasPersonnel') +
              '</div>' +
            '</fieldset>' +

            '<fieldset class="router-fieldset">' +
              '<legend class="router-label">' +
                'Does this material contain student-identifiable information?' +
              '</legend>' +
              '<div class="router-radio-group router-radio-group--inline">' +
                triOptions('hasStudentData') +
              '</div>' +
            '</fieldset>' +

            '<fieldset class="router-fieldset">' +
              '<legend class="router-label">' +
                'Does this material contain confidential institutional, legal, financial, or committee deliberation information?' +
              '</legend>' +
              '<div class="router-radio-group router-radio-group--inline">' +
                triOptions('hasConfidential') +
              '</div>' +
            '</fieldset>' +

            '<fieldset class="router-fieldset">' +
              '<legend class="router-label">' +
                'Was any part of this material generated or significantly assisted by AI?' +
              '</legend>' +
              '<div class="router-radio-group router-radio-group--inline">' +
                triOptions('isAiOutput') +
              '</div>' +
            '</fieldset>' +

            '<div class="router-form-actions">' +
              '<button class="btn btn-primary" type="submit" id="btn-router-submit">' +
                'Get routing recommendation &#8594;' +
              '</button>' +
            '</div>' +

          '</form>' +

          '<div class="router-nav">' +
            '<button class="btn btn-ghost" id="btn-back-scenarios" type="button">' +
              '&larr; Back to scenarios' +
            '</button>' +
          '</div>' +
        '</div>';

      // Wire back button
      var backBtn = VC_UTILS.qs('#btn-back-scenarios', root);
      if (backBtn) {
        backBtn.addEventListener('click', function () {
          VC_UI.renderScenarioSelector(ctx);
        });
      }

      // Wire form submit
      var form = VC_UTILS.qs('#router-form', root);
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();

          var catSelect = VC_UTILS.qs('#router-material-cat', root);
          var catError  = VC_UTILS.qs('#router-cat-error',    root);
          if (!catSelect || !catSelect.value) {
            if (catError)  { catError.hidden = false; }
            if (catSelect) { catSelect.focus(); }
            return;
          }
          if (catError) { catError.hidden = true; }

          function getRadioVal(name, fallback) {
            var checked = VC_UTILS.qs('input[name="' + name + '"]:checked', root);
            return checked ? checked.value : (fallback || '');
          }

          var answers = {
            materialCategory: catSelect.value,
            workflowRoute:    getRadioVal('workflowRoute'),
            hasPersonnel:     getRadioVal('hasPersonnel',    'not-sure'),
            hasStudentData:   getRadioVal('hasStudentData',  'not-sure'),
            hasConfidential:  getRadioVal('hasConfidential', 'not-sure'),
            isAiOutput:       getRadioVal('isAiOutput',      'not-sure')
          };

          var result = VC_RULES.evaluateRouterAnswers(answers, data);
          VC_STATE.setRouterResult(answers, result);
          ctx.state = VC_STATE.getState();
          VC_UI.renderRoutingInterim(ctx, result);
        });
      }

      var heading = VC_UTILS.qs('.router-heading', root);
      if (heading) { heading.focus(); }
    },

    /* ── Routing interim result ──────────────────────────────────────────────── */

    renderRoutingInterim: function (ctx, result) {
      var root = ctx.root;
      var esc  = VC_UTILS.escHtml;

      var recLabel = VC_RULES.getRecommendationLabel(result.recommendation);

      var chipClass = {
        'restricted':            'rec-chip--red',
        'safe-with-review':      'rec-chip--amber',
        'safe-with-attribution': 'rec-chip--blue',
        'safe':                  'rec-chip--green'
      }[result.recommendation] || '';

      var routeOptions  = VC_RULES.getWorkflowRouteOptions();
      var workflowLabel = '';
      for (var i = 0; i < routeOptions.length; i++) {
        if (routeOptions[i].id === result.workflowRoute) {
          workflowLabel = routeOptions[i].label;
          break;
        }
      }

      var warningHtml = '';
      if (result.warnings && result.warnings.length > 0) {
        var extraCount = result.warnings.length - 1;
        warningHtml =
          '<div class="interim-warning">' +
            '<p class="interim-warning-text">' + esc(result.warnings[0]) + '</p>' +
            (extraCount > 0
              ? '<p class="interim-warning-count">+ ' + extraCount +
                  ' more warning' + (extraCount > 1 ? 's' : '') + '</p>'
              : '') +
          '</div>';
      }

      root.innerHTML =
        '<div class="screen interim-result-screen">' +
          '<div class="interim-result-header">' +
            '<h2 class="interim-result-heading" tabindex="-1">Routing recommendation</h2>' +
          '</div>' +

          '<div class="interim-result-card">' +
            '<div class="rec-chip ' + esc(chipClass) + '">' + esc(recLabel) + '</div>' +

            (result.rationale
              ? '<p class="interim-rationale">' + esc(result.rationale) + '</p>'
              : '') +

            (workflowLabel
              ? '<p class="interim-workflow">AI task: <strong>' + esc(workflowLabel) + '</strong></p>'
              : '') +

            warningHtml +

            '<p class="interim-next-note">' +
              'The full result screen &#8212; with allowed actions, blocked actions, and review ' +
              'guidance &#8212; is coming in the next build.' +
            '</p>' +
          '</div>' +

          '<div class="interim-result-nav">' +
            '<button class="btn btn-ghost" id="btn-back-router" type="button">' +
              '&larr; Revise answers' +
            '</button>' +
            '<button class="btn btn-ghost" id="btn-back-scenarios-interim" type="button">' +
              '&larr; Back to scenarios' +
            '</button>' +
          '</div>' +
        '</div>';

      var backRouterBtn = VC_UTILS.qs('#btn-back-router', root);
      if (backRouterBtn) {
        backRouterBtn.addEventListener('click', function () {
          VC_UI.renderMaterialRouter(ctx);
        });
      }

      var backScenariosBtn = VC_UTILS.qs('#btn-back-scenarios-interim', root);
      if (backScenariosBtn) {
        backScenariosBtn.addEventListener('click', function () {
          VC_UI.renderScenarioSelector(ctx);
        });
      }

      var heading = VC_UTILS.qs('.interim-result-heading', root);
      if (heading) { heading.focus(); }
    },

    /* ── Error screen ─────────────────────────────────────────────────────────── */

    renderAppShellError: function (error) {
      var root = document.getElementById('app-root');
      if (!root) { return; }
      var esc = VC_UTILS.escHtml;
      root.innerHTML =
        '<div class="screen error-screen">' +
          '<h2 class="error-title">Unable to load Veritas Compass</h2>' +
          '<p class="error-message">' + esc(String(error || 'Unexpected error')) + '</p>' +
          '<p class="error-hint">Reload the page or check that all asset files are accessible.</p>' +
        '</div>';
    }

  };

}());
