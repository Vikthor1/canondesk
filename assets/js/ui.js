(function () {
  'use strict';

  var DEMO_MODE_ID = 'administrative';

  window.VC_UI = {

    /* ── Landing screen ────────────────────────────────────────────────────── */

    renderLandingScreen: function (ctx) {
      var root   = ctx.root;
      var config = ctx.config;
      var esc    = VC_UTILS.escHtml;

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
            '<button class="btn btn-ghost btn-reference-placeholder" disabled type="button" ' +
                'aria-label="Governance reference panel &#8212; available in Patch 3">' +
              'How this works' +
              '<span class="badge-coming" aria-hidden="true">Patch 3</span>' +
            '</button>' +
          '</div>' +

          '<p class="disclaimer landing-disclaimer">' +
            'Decision-support prototype. Not legal advice or an official compliance system.' +
          '</p>' +

        '</div>';

      var startBtn = VC_UTILS.qs('#btn-start-role', root);
      if (startBtn) {
        startBtn.addEventListener('click', function () {
          VC_UI.renderModeSelector(ctx);
          var heading = VC_UTILS.qs('.mode-selector-heading', root);
          if (heading) { heading.focus(); }
        });
      }
    },

    /* ── Mode selector ─────────────────────────────────────────────────────── */

    renderModeSelector: function (ctx) {
      var root  = ctx.root;
      var modes = (ctx.data && ctx.data.modes && Array.isArray(ctx.data.modes.modes))
        ? ctx.data.modes.modes
        : [];
      var state = VC_STATE.getState();
      var esc   = VC_UTILS.escHtml;

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
          VC_STATE.setMode(btn.getAttribute('data-mode-id'));
          ctx.state = VC_STATE.getState();
          VC_UI.renderModeSelector(ctx);
        });
      });

      // Back to landing
      var backBtn = VC_UTILS.qs('#btn-back-landing', root);
      if (backBtn) {
        backBtn.addEventListener('click', function () {
          VC_UI.renderLandingScreen(ctx);
        });
      }
    },

    /* ── Error screen ───────────────────────────────────────────────────────── */

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
