(function () {
  'use strict';

  /* ── Private helpers ─────────────────────────────────────────────────────── */

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function formatDatetime(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
      ' at ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function lookupModeLabel(data, modeId) {
    var modes = (data && data.modes && Array.isArray(data.modes.modes))
      ? data.modes.modes : [];
    for (var i = 0; i < modes.length; i++) {
      if (modes[i].id === modeId) { return modes[i].label; }
    }
    return modeId || 'Unknown';
  }

  function lookupScenarioTitle(data, scenarioId) {
    if (!scenarioId)                    { return ''; }
    if (scenarioId === 'custom-material') { return 'My own material (custom)'; }
    var scenarios = (data && data.scenarios && Array.isArray(data.scenarios.scenarios))
      ? data.scenarios.scenarios : [];
    for (var i = 0; i < scenarios.length; i++) {
      if (scenarios[i].id === scenarioId) { return scenarios[i].title; }
    }
    return scenarioId;
  }

  function lookupMaterialLabel(data, materialId) {
    if (!materialId) { return ''; }
    var cats = (data && data.rules && Array.isArray(data.rules.materialCategories))
      ? data.rules.materialCategories : [];
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].id === materialId) { return cats[i].label; }
    }
    return materialId;
  }

  function lookupWorkflowLabel(routeId) {
    if (!routeId || !window.VC_RULES) { return routeId || ''; }
    var opts = window.VC_RULES.getWorkflowRouteOptions();
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].id === routeId) { return opts[i].label; }
    }
    return routeId;
  }

  function mdList(items) {
    if (!items || items.length === 0) { return '_None specified._'; }
    return items.map(function (item) { return '- ' + item; }).join('\n');
  }

  /* ── Public API ──────────────────────────────────────────────────────────── */

  window.VC_REPORTS = {

    getSafeFilename: function () {
      var d = new Date();
      return 'veritas-compass-summary-' +
        d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + '.md';
    },

    // Build a Markdown decision summary from session context.
    // ctx must have: ctx.config, ctx.state, ctx.data
    // Does not touch the DOM. Does not access localStorage.
    buildDecisionSummaryMarkdown: function (ctx) {
      var config  = ctx.config || {};
      var state   = ctx.state  || {};
      var data    = ctx.data   || {};
      var result  = state.routingResult  || {};
      var answers = state.routerAnswers  || {};

      var appName  = config.appName || 'Veritas Compass';
      var tagline  = config.tagline || 'An AI workflow guide for privacy, authorship, and academic judgment';
      var version  = config.version || '';
      var now      = new Date();
      var generated = formatDatetime(now);

      var modeLabel     = lookupModeLabel(data, state.activeMode);
      var scenarioTitle = lookupScenarioTitle(data, state.currentScenarioId);
      var matLabel      = lookupMaterialLabel(data, result.materialCategory || answers.materialCategory || '');
      var workflowLabel = lookupWorkflowLabel(result.workflowRoute || answers.workflowRoute || '');

      var recLabels = {
        'restricted':            'Restricted — do not use AI with this material',
        'safe-with-review':      'Safe — with human review required',
        'safe-with-attribution': 'Safe — with attribution required',
        'safe':                  'Safe for AI assistance'
      };
      var recLabel  = recLabels[result.recommendation] || (result.recommendation || 'Not determined');
      var rationale = result.rationale || '_No rationale recorded._';

      var lines = [
        '# ' + appName + ' — Decision Summary',
        '',
        '**Generated:** ' + generated,
        '',
        '> Decision-support prototype. Not legal advice or an official compliance system.',
        '',
        '---',
        '',
        '## Session Details',
        '',
        '| Field | Value |',
        '|---|---|',
        '| Workflow role | ' + modeLabel + ' |',
        '| Scenario | ' + (scenarioTitle || '_None selected_') + ' |',
        '| Material type | ' + (matLabel      || '_Not specified_') + ' |',
        '| AI task | '      + (workflowLabel  || '_Not specified_') + ' |',
        '',
        '---',
        '',
        '## Routing Recommendation',
        '',
        '**' + recLabel + '**',
        '',
        rationale,
        '',
        '---'
      ];

      if (result.warnings && result.warnings.length > 0) {
        lines.push('');
        lines.push('## Warnings');
        lines.push('');
        lines.push(mdList(result.warnings));
        lines.push('');
        lines.push('---');
      }

      lines.push('');
      lines.push('## Safer Next Steps');
      lines.push('');
      lines.push(mdList(result.allowedActions));
      lines.push('');
      lines.push('---');

      lines.push('');
      lines.push('## What You Should Not Do');
      lines.push('');
      lines.push(mdList(result.blockedActions));
      lines.push('');
      lines.push('---');

      if (result.reviewPrompts && result.reviewPrompts.length > 0) {
        lines.push('');
        lines.push('## Human Review Questions');
        lines.push('');
        lines.push(mdList(result.reviewPrompts));
        lines.push('');
        lines.push('---');
      }

      lines.push('');
      lines.push('## Authorship and Judgment Checkpoint');
      lines.push('');
      lines.push('- Who reviews or signs off before this becomes official, public, or shared?');
      lines.push('- What status should AI-assisted output have: draft, summary, recommendation, working packet, or official record candidate?');
      lines.push('- Would using AI here clarify the work, or could it obscure responsibility, authorship, or institutional judgment?');
      lines.push('');
      lines.push('---');

      if (result.recommendation === 'restricted' || result.recommendation === 'safe-with-review') {
        lines.push('');
        lines.push('## Working Packet Guidance');
        lines.push('');
        if (result.recommendation === 'restricted') {
          lines.push(
            'The original material should not enter external AI tools under any circumstances. ' +
            'If AI assistance is needed for related work, assemble a separate, human-reviewed ' +
            'working packet from non-restricted materials only.'
          );
        } else {
          lines.push(
            'Before using AI with this material, consider preparing a human-reviewed working ' +
            'packet: remove or summarize sensitive content, confirm no restricted information is ' +
            'present, and have a colleague review the packet before AI use. Do not upload the ' +
            'original source directly.'
          );
        }
        lines.push('');
        lines.push('---');
      }

      lines.push('');
      lines.push('## Important Notes');
      lines.push('');
      lines.push('- No document was uploaded or processed by ' + appName + '.');
      lines.push('- This summary is based on user-provided answers to the routing questionnaire, not automated document inspection.');
      lines.push('- Human review is required before any institutional action is taken based on this recommendation.');
      lines.push('');
      lines.push('---');
      lines.push('');
      lines.push('*' + appName + ' — ' + tagline + '*');
      if (version) { lines.push('*Version ' + version + '*'); }

      return lines.join('\n');
    },

    // Browser-only Blob download via temporary anchor element.
    // Returns true on success, false if Blob or createObjectURL unavailable.
    downloadMarkdown: function (filename, markdown) {
      try {
        var blob = new Blob([markdown], { type: 'text/markdown; charset=utf-8' });
        var url  = URL.createObjectURL(blob);
        var a    = document.createElement('a');
        a.href     = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return true;
      } catch (e) {
        return false;
      }
    }

  };

}());
