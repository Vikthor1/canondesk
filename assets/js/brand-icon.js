(function () {
  'use strict';

  var ICON_HTML =
    '<div class="icon-shell">' +
      '<svg class="vc-icon" viewBox="0 0 256 256" role="img"' +
          ' aria-labelledby="vc-svg-title vc-svg-desc"' +
          ' xmlns="http://www.w3.org/2000/svg">' +
        '<title id="vc-svg-title">Veritas Compass astrolabe-inspired animated icon</title>' +
        '<desc id="vc-svg-desc">A brass-and-glass scholarly compass instrument with parchment,' +
          ' engraved coordinates, quiet mechanical rings, and a calibrated needle for' +
          ' privacy, authorship, and academic judgment.</desc>' +

        '<defs>' +
          '<radialGradient id="vc-parchmentGlow" cx="50%" cy="45%" r="68%">' +
            '<stop offset="0%" stop-color="#f7ead0" />' +
            '<stop offset="68%" stop-color="#d6c095" />' +
            '<stop offset="100%" stop-color="#b29258" />' +
          '</radialGradient>' +

          '<radialGradient id="vc-glassLens" cx="36%" cy="25%" r="78%">' +
            '<stop offset="0%" stop-color="#eefbff" stop-opacity="0.36" />' +
            '<stop offset="48%" stop-color="#b7d4da" stop-opacity="0.12" />' +
            '<stop offset="100%" stop-color="#10273a" stop-opacity="0.02" />' +
          '</radialGradient>' +

          '<linearGradient id="vc-brassStroke" x1="36" y1="28" x2="218" y2="226"' +
              ' gradientUnits="userSpaceOnUse">' +
            '<stop offset="0%" stop-color="#f0cf86" />' +
            '<stop offset="35%" stop-color="#b9853c" />' +
            '<stop offset="72%" stop-color="#7a5427" />' +
            '<stop offset="100%" stop-color="#d8a85c" />' +
          '</linearGradient>' +

          '<linearGradient id="vc-needleMetal" x1="79" y1="70" x2="177" y2="188"' +
              ' gradientUnits="userSpaceOnUse">' +
            '<stop offset="0%" stop-color="#f2d087" />' +
            '<stop offset="48%" stop-color="#b9853c" />' +
            '<stop offset="100%" stop-color="#6a4422" />' +
          '</linearGradient>' +

          '<linearGradient id="vc-copperLine" x1="84" y1="52" x2="192" y2="210"' +
              ' gradientUnits="userSpaceOnUse">' +
            '<stop offset="0%" stop-color="#c37a42" />' +
            '<stop offset="100%" stop-color="#704120" />' +
          '</linearGradient>' +

          '<filter id="vc-softDrop" x="-20%" y="-20%" width="140%" height="140%">' +
            '<feDropShadow dx="0" dy="10" stdDeviation="8"' +
                ' flood-color="#041018" flood-opacity="0.30" />' +
          '</filter>' +

          '<path id="vc-gearTooth" d="M126 20 h4 l2 12 h-8 z" />' +
        '</defs>' +

        '<circle class="parchment-field" cx="128" cy="128" r="91"' +
            ' fill="url(#vc-parchmentGlow)" opacity="0.94" />' +
        '<path d="M84 109 C101 100 116 104 128 116 C140 104 155 100 172 109' +
            ' L172 169 C155 160 140 164 128 178 C116 164 101 160 84 169 Z"' +
            ' fill="#f8edcf" opacity="0.72" />' +
        '<path d="M128 116 L128 178" stroke="#6e604c" stroke-width="1.7"' +
            ' opacity="0.34" />' +
        '<path d="M96 123 C107 120 116 123 122 130" fill="none" stroke="#6e604c"' +
            ' stroke-width="1.8" stroke-linecap="round" opacity="0.45" />' +
        '<path d="M96 137 C107 134 116 137 122 144" fill="none" stroke="#6e604c"' +
            ' stroke-width="1.8" stroke-linecap="round" opacity="0.38" />' +
        '<path d="M160 123 C149 120 140 123 134 130" fill="none" stroke="#6e604c"' +
            ' stroke-width="1.8" stroke-linecap="round" opacity="0.45" />' +

        '<g class="gear-ring" fill="url(#vc-brassStroke)" opacity="0.62">' +
          '<use href="#vc-gearTooth" />' +
          '<use href="#vc-gearTooth" transform="rotate(15 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(30 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(45 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(60 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(75 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(90 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(105 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(120 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(135 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(150 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(165 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(180 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(195 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(210 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(225 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(240 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(255 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(270 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(285 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(300 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(315 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(330 128 128)" />' +
          '<use href="#vc-gearTooth" transform="rotate(345 128 128)" />' +
        '</g>' +

        '<circle cx="128" cy="128" r="105" fill="none"' +
            ' stroke="url(#vc-brassStroke)" stroke-width="8" />' +
        '<circle cx="128" cy="128" r="96" fill="none" stroke="#f0cf86"' +
            ' stroke-width="1.4" opacity="0.68" />' +
        '<circle cx="128" cy="128" r="78" fill="none" stroke="#6e604c"' +
            ' stroke-width="1.2" opacity="0.42" />' +

        '<g class="astrolabe-ring" opacity="0.68">' +
          '<circle cx="128" cy="128" r="67" fill="none"' +
              ' stroke="url(#vc-copperLine)" stroke-width="1.7"' +
              ' stroke-dasharray="1.5 8" stroke-linecap="round" />' +
          '<ellipse cx="128" cy="128" rx="82" ry="28" fill="none"' +
              ' stroke="#b9853c" stroke-width="1.3" opacity="0.45" />' +
          '<ellipse cx="128" cy="128" rx="28" ry="82" fill="none"' +
              ' stroke="#b9853c" stroke-width="1.3" opacity="0.30" />' +
        '</g>' +

        '<circle cx="128" cy="128" r="55" fill="url(#vc-glassLens)"' +
            ' stroke="rgba(238,251,255,0.42)" stroke-width="1.4" />' +
        '<path class="glass-shimmer"' +
            ' d="M101 81 C123 101 147 110 171 110" fill="none"' +
            ' stroke="rgba(238,251,255,0.58)" stroke-width="5"' +
            ' stroke-linecap="round" opacity="0.42" />' +

        '<g fill="#4f3f2a" stroke="rgba(247,237,207,0.42)" stroke-width="0.55"' +
            ' font-family="Georgia, \'Times New Roman\', serif"' +
            ' font-size="12.5" font-weight="700" text-anchor="middle"' +
            ' dominant-baseline="middle" letter-spacing="0.045em">' +
          '<text x="128" y="45">N</text>' +
          '<text x="211" y="132">E</text>' +
          '<text x="128" y="213">S</text>' +
          '<text x="45" y="132">W</text>' +
        '</g>' +

        '<g fill="#e5bf72">' +
          '<circle class="decision-node" cx="92" cy="78" r="2.1" />' +
          '<circle class="decision-node" cx="164" cy="78" r="2.1" />' +
          '<circle class="decision-node" cx="181" cy="128" r="2.1" />' +
          '<circle class="decision-node" cx="164" cy="178" r="2.1" />' +
          '<circle class="decision-node" cx="92" cy="178" r="2.1" />' +
          '<circle class="decision-node" cx="75" cy="128" r="2.1" />' +
        '</g>' +

        '<g class="needle" filter="url(#vc-softDrop)">' +
          '<path d="M128 72 L139 128 L128 184 L117 128 Z"' +
              ' fill="url(#vc-needleMetal)" />' +
          '<path d="M128 72 L139 128 L128 122 Z" fill="#f7df9b" opacity="0.76" />' +
          '<path d="M128 184 L117 128 L128 134 Z" fill="#5d3a1e" opacity="0.46" />' +
          '<circle cx="128" cy="128" r="12" fill="#10273a"' +
              ' stroke="#e5bf72" stroke-width="3" />' +
          '<circle cx="128" cy="128" r="4" fill="#efe2c2" />' +
        '</g>' +

        '<g transform="translate(174 63)">' +
          '<circle cx="0" cy="0" r="8" fill="rgba(8,22,34,0.66)"' +
              ' stroke="#e5bf72" stroke-width="2" />' +
          '<circle cx="0" cy="0" r="3.2" fill="#f0cf86" opacity="0.88" />' +
        '</g>' +

        '<path class="rim-glint" d="M73 55 C94 38 123 32 152 38" fill="none"' +
            ' stroke="#fff2bf" stroke-width="3.2" stroke-linecap="round"' +
            ' opacity="0" />' +
      '</svg>' +
    '</div>';

  window.VC_BRAND_ICON = {
    getHtml: function () { return ICON_HTML; }
  };

}());
