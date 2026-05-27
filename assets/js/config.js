(function () {
  'use strict';

  window.VC_CONFIG = {
    appName:         'Veritas Compass',
    formerWorkingName: 'CanonDesk',
    tagline:         'An AI workflow guide for privacy, authorship, and academic judgment',
    version:         '0.1.0',
    storageKey:      'veritas_compass_state_v1',
    defaultMode:     'administrative',

    dataPaths: {
      modes:     'assets/data/modes.json',
      rules:     'assets/data/rules.json',
      scenarios: 'assets/data/scenarios.json',
      glossary:  'assets/data/glossary.json'
    },

    FEATURES: {
      liveAiRouting:  false,
      fileUpload:     false,
      mcpIntegration: false,
      backendSync:    false,
      packetBuilder:  false,
      exportReport:   false
    }
  };

}());
