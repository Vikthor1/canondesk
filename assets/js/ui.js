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

        var btnClass  = 'btn mode-card-btn ' + (isSelected ? 'btn-selected' : 'btn-secondary');
        var btnLabel  = isSelected ? '&#10003;&nbsp;Role selected' : 'Select this role';
        var btnExtras = isSelected ? ' disabled aria-disabled="true"' : '';

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

      // Wire mode selection — skip disabled (already-selected) buttons
      VC_UTILS.qsa('[data-mode-id]', root).forEach(function (btn) {
        if (btn.disabled) { return; }
        btn.addEventListener('click', function () {
          // Preserve panel open state across re-render
          var panelEl      = VC_UTILS.qs('#' + PANEL_ID, root);
          var panelWasOpen = panelEl && !panelEl.hidden;

          VC_STATE.setMode(btn.getAttribute('data-mode-id'));
          ctx.state = VC_STATE.getState();
          VC_UI.renderModeSelector(ctx);

          // Re-open with fresh vocabulary if it was open before re-render
          if (panelWasOpen) {
            VC_UI.openPanel(PANEL_ID, TRIGGER_ID, ctx, root);
          }
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
