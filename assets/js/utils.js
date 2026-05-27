(function () {
  'use strict';

  window.VC_UTILS = {

    // Escape a value for safe insertion into innerHTML
    escHtml: function (str) {
      return String(str)
        .replace(/&/g,  '&amp;')
        .replace(/</g,  '&lt;')
        .replace(/>/g,  '&gt;')
        .replace(/"/g,  '&quot;');
    },

    // Set the textContent of an element by ID
    setText: function (id, value) {
      var el = document.getElementById(id);
      if (el) { el.textContent = value; }
    },

    // querySelector with optional root
    qs: function (selector, root) {
      return (root || document).querySelector(selector);
    },

    // querySelectorAll as a real Array, with optional root
    qsa: function (selector, root) {
      return Array.prototype.slice.call(
        (root || document).querySelectorAll(selector)
      );
    },

    // Format a count with singular / plural noun
    formatCount: function (count, singular, plural) {
      return count + ' ' + (count === 1 ? singular : (plural || singular + 's'));
    }

  };

}());
