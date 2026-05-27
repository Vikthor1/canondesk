(function () {
  'use strict';

  /* ── Boot sequence ───────────────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {

    // Populate static header and footer from config
    VC_UTILS.setText('header-app-name', VC_CONFIG.appName);
    VC_UTILS.setText('header-tagline',  VC_CONFIG.tagline);
    VC_UTILS.setText('footer-app-name', VC_CONFIG.appName);
    VC_UTILS.setText('footer-version',  'v' + VC_CONFIG.version);

    // Restore persisted state
    VC_STATE.loadState();

    var root = document.getElementById('app-root');

    // Load all JSON data, then render the landing screen
    VC_DATA.loadAll().then(function (result) {

      if (result.success) {
        VC_STATE.patch({ lastLoadedAt: new Date().toISOString() });

        console.log('[VC] Data loaded. Mode:', VC_STATE.getState().activeMode);

        var ctx = {
          root:   root,
          config: VC_CONFIG,
          state:  VC_STATE.getState(),
          data:   VC_DATA.getAll()
        };

        VC_UI.renderLandingScreen(ctx);

      } else {
        console.error('[VC] Data load failed:', result.error);
        VC_UI.renderAppShellError(result.error);
      }

    });

  });

}());
