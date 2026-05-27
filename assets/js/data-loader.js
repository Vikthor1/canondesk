(function () {
  'use strict';

  var _data = {
    modes:     null,
    rules:     null,
    scenarios: null,
    glossary:  null
  };

  window.VC_DATA = {

    loadAll: function () {
      var paths = window.VC_CONFIG.dataPaths;
      var keys  = Object.keys(paths);

      var promises = keys.map(function (key) {
        return fetch(paths[key])
          .then(function (res) {
            if (!res.ok) {
              throw new Error('HTTP ' + res.status + ' loading ' + key);
            }
            return res.json();
          })
          .then(function (json) {
            _data[key] = json;
          });
      });

      return Promise.all(promises)
        .then(function ()    { return { success: true }; })
        .catch(function (e)  { return { success: false, error: e.message }; });
    },

    getAll: function () {
      return JSON.parse(JSON.stringify(_data));
    },

    getDataset: function (name) {
      return _data[name] ? JSON.parse(JSON.stringify(_data[name])) : null;
    }

  };

}());
