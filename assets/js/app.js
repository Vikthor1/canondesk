(function () {
  'use strict';

  /* ── Boot sequence ───────────────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    // Populate static header and footer text from config
    setText('header-app-name', VC_CONFIG.appName);
    setText('header-tagline',  VC_CONFIG.tagline);
    setText('footer-app-name', VC_CONFIG.appName);
    setText('footer-version',  'v' + VC_CONFIG.version);

    // Restore persisted state
    VC_STATE.loadState();

    var root = document.getElementById('app-root');

    // Fetch all four JSON data files, then render the boot screen
    VC_DATA.loadAll().then(function (result) {
      if (result.success) {
        VC_STATE.patch({ lastLoadedAt: new Date().toISOString() });
      }
      renderBootScreen(root, result);
    });
  });

  /* ── Boot screen renderer ────────────────────────────────────────────────── */

  function renderBootScreen(root, loadResult) {
    var state  = VC_STATE.getState();
    var config = VC_CONFIG;

    var statusClass = loadResult.success ? 'status-success' : 'status-error';
    var statusText  = loadResult.success
      ? 'Boot check: data loaded successfully'
      : 'Boot check failed: ' + (loadResult.error || 'Unknown error');

    var countsHtml = '';
    var modeHtml   = '';

    if (loadResult.success) {
      var data = VC_DATA.getAll();

      var modesCount      = safeLen(data.modes,     'modes');
      var categoriesCount = safeLen(data.rules,      'materialCategories');
      var scenariosCount  = safeLen(data.scenarios,  'scenarios');
      var termsCount      = safeLen(data.glossary,   'terms');

      modeHtml = '<p class="boot-mode">Active mode: <strong>' +
        escHtml(state.activeMode) + '</strong></p>';

      countsHtml =
        '<ul class="boot-counts">' +
          '<li><strong>' + modesCount      + '</strong> workflow modes</li>'       +
          '<li><strong>' + categoriesCount + '</strong> material categories</li>'  +
          '<li><strong>' + scenariosCount  + '</strong> scenarios</li>'            +
          '<li><strong>' + termsCount      + '</strong> governance terms</li>'     +
        '</ul>';
    }

    root.innerHTML =
      '<div class="boot-card card">' +
        '<h1 class="boot-title">' + escHtml(config.appName) + '</h1>' +
        '<p class="boot-tagline">' + escHtml(config.tagline) + '</p>' +
        '<div class="' + statusClass + '">' + escHtml(statusText) + '</div>' +
        modeHtml +
        countsHtml +
        '<p class="disclaimer">' +
          'Decision-support prototype. Not legal advice or an official compliance system.' +
        '</p>' +
        '<button class="btn btn-reset" id="btn-reset" type="button">' +
          'Reset local state' +
        '</button>' +
      '</div>';

    var resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        VC_STATE.resetState();
        renderBootScreen(root, loadResult);
      });
    }
  }

  /* ── Utilities ───────────────────────────────────────────────────────────── */

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function safeLen(dataset, arrayKey) {
    return (dataset && Array.isArray(dataset[arrayKey]))
      ? dataset[arrayKey].length
      : 0;
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

}());
