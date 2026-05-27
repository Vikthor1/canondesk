(function () {
  'use strict';

  function defaultState() {
    return {
      activeMode:        'administrative',
      decisions:         [],
      currentScenarioId: null,
      routerAnswers:     null,
      routingResult:     null,
      lastLoadedAt:      null
    };
  }

  var _state = defaultState();

  function storageKey() {
    return (window.VC_CONFIG && window.VC_CONFIG.storageKey)
      ? window.VC_CONFIG.storageKey
      : 'veritas_compass_state_v1';
  }

  function isValidState(obj) {
    return obj !== null
      && typeof obj === 'object'
      && typeof obj.activeMode === 'string';
  }

  window.VC_STATE = {

    getState: function () {
      return JSON.parse(JSON.stringify(_state));
    },

    loadState: function () {
      try {
        var raw = localStorage.getItem(storageKey());
        if (raw) {
          var parsed = JSON.parse(raw);
          _state = isValidState(parsed)
            ? Object.assign(defaultState(), parsed)
            : defaultState();
        } else {
          _state = defaultState();
        }
      } catch (e) {
        _state = defaultState();
      }
    },

    saveState: function () {
      try {
        localStorage.setItem(storageKey(), JSON.stringify(_state));
      } catch (e) {
        // localStorage unavailable — silent fail
      }
    },

    setMode: function (modeId) {
      _state.activeMode = modeId;
      window.VC_STATE.saveState();
    },

    setScenario: function (scenarioId) {
      _state.currentScenarioId = scenarioId;
      window.VC_STATE.saveState();
    },

    setRouterResult: function (answers, result) {
      _state.routerAnswers = answers;
      _state.routingResult = result;
      window.VC_STATE.saveState();
    },

    patch: function (fields) {
      Object.assign(_state, fields);
      window.VC_STATE.saveState();
    },

    resetState: function () {
      _state = defaultState();
      try {
        localStorage.removeItem(storageKey());
      } catch (e) {}
    }

  };

}());
