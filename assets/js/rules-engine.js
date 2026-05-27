(function () {
  'use strict';

  /* ── Workflow Route options ──────────────────────────────────────────────────── */

  var WORKFLOW_ROUTE_OPTIONS = [
    { id: 'summarize',   label: 'Summarize or brief me' },
    { id: 'draft',       label: 'Draft or revise language' },
    { id: 'analyze',     label: 'Analyze or compare materials' },
    { id: 'communicate', label: 'Prepare a public-facing communication' },
    { id: 'technical',   label: 'Support technical or code work' },
    { id: 'test',        label: 'Test a new AI tool or workflow' }
  ];

  /* ── Recommendation labels ───────────────────────────────────────────────────── */

  var RECOMMENDATION_LABELS = {
    'restricted':            'Restricted — do not use AI with this material',
    'safe-with-review':      'Safe with human review required',
    'safe-with-attribution': 'Safe with attribution — cite the source',
    'safe':                  'Safe for AI assistance'
  };

  /* ── Public API ──────────────────────────────────────────────────────────────── */

  window.VC_RULES = {

    getWorkflowRouteOptions: function () {
      return WORKFLOW_ROUTE_OPTIONS.slice();
    },

    getRecommendationLabel: function (recommendation) {
      return RECOMMENDATION_LABELS[recommendation] || recommendation;
    },

    // Returns active material categories for a given mode from rules.json data
    getMaterialCategories: function (data, modeId) {
      if (!data || !data.rules || !Array.isArray(data.rules.materialCategories)) {
        return [];
      }
      return data.rules.materialCategories.filter(function (cat) {
        return Array.isArray(cat.applicableModes) &&
          cat.applicableModes.indexOf(modeId) !== -1 &&
          cat.status === 'active';
      });
    },

    // Core routing function — pure computation, no DOM, no state, no external calls
    evaluateRouterAnswers: function (answers, data) {
      var materialId      = answers.materialCategory || '';
      var workflowRoute   = answers.workflowRoute    || '';
      var hasPersonnel    = answers.hasPersonnel     || 'not-sure';
      var hasStudent      = answers.hasStudentData   || 'not-sure';
      var hasConfidential = answers.hasConfidential  || 'not-sure';
      var isAiOutput      = answers.isAiOutput       || 'not-sure';

      var warnings        = [];
      var allowedActions  = [];
      var blockedActions  = [];
      var reviewPrompts   = [];
      var recommendation, rationale;

      // ── No-recursive-upload guard ───────────────────────────────────────────
      if (isAiOutput === 'yes') {
        warnings.push(
          'No recursive upload: this material contains or is based on prior AI-generated ' +
          'output. It cannot be treated as a canonical source or official record without ' +
          'explicit human review and validation first.'
        );
      } else if (isAiOutput === 'not-sure') {
        warnings.push(
          'If any part of this material was AI-generated or AI-assisted, it requires ' +
          'human review before being used as a source, official record, or policy input.'
        );
      }

      // ── Personnel data — always restricted ─────────────────────────────────
      if (hasPersonnel === 'yes') {
        recommendation = 'restricted';
        rationale = 'This material contains personnel, hiring, tenure, evaluation, ' +
          'grievance, or other confidential employment-related information. It must not ' +
          'enter any external AI tool.';
        blockedActions = [
          'Do not paste into any external AI tool, chatbot, or API.',
          'Do not use AI to summarize, draft from, or revise this material.',
          'Do not include in any AI-generated document or packet.'
        ];
        reviewPrompts = [
          'Can this material be separated — isolating the personnel content before routing the rest?',
          'Who in your institution governs personnel-record access and AI-use decisions?'
        ];
        return buildResult(recommendation, materialId, workflowRoute, warnings, rationale, allowedActions, blockedActions, reviewPrompts);
      }

      // ── Student-identifiable data — always restricted ──────────────────────
      if (hasStudent === 'yes') {
        recommendation = 'restricted';
        rationale = 'This material contains student-identifiable information protected ' +
          'under FERPA. It must not enter any external AI tool without institutional ' +
          'FERPA review and authorization.';
        blockedActions = [
          'Do not use with any external AI tool, summarizer, or chatbot.',
          'Consult your institution\'s FERPA officer before any AI use.',
          'Aggregate or fully de-identified data may be routable — verify with your FERPA officer.'
        ];
        return buildResult(recommendation, materialId, workflowRoute, warnings, rationale, allowedActions, blockedActions, reviewPrompts);
      }

      // ── "Not sure" flags — add conservative escalation warning ─────────────
      if (hasPersonnel === 'not-sure' || hasStudent === 'not-sure' || hasConfidential === 'not-sure') {
        warnings.push(
          'One or more sensitivity questions were answered "Not sure." This result is ' +
          'conservative. Review the material\'s contents before proceeding with AI use.'
        );
      }

      // ── Confidential institutional content — restricted ────────────────────
      if (hasConfidential === 'yes') {
        recommendation = 'restricted';
        rationale = 'This material contains confidential institutional, legal, financial, ' +
          'or committee deliberation information. It must not enter an external AI tool ' +
          'without explicit institutional authorization.';
        blockedActions = [
          'Do not paste into external AI tools.',
          'Do not use AI to summarize, draft, or revise this material without authorization.'
        ];
        return buildResult(recommendation, materialId, workflowRoute, warnings, rationale, allowedActions, blockedActions, reviewPrompts);
      }

      // ── Material-category routing ───────────────────────────────────────────
      if (materialId === 'personnel-records') {
        recommendation = 'restricted';
        rationale = 'Personnel records are always restricted and must never enter any ' +
          'external AI tool under any circumstances.';
        blockedActions = [
          'Do not use with any external AI tool.',
          'Do not summarize, draft from, or revise using AI.'
        ];

      } else if (materialId === 'committee-notes') {
        // No personnel/confidential flags confirmed, but check "not sure"
        if (hasPersonnel === 'not-sure' || hasConfidential === 'not-sure') {
          recommendation = 'restricted';
          rationale = 'Committee notes may contain sensitive content. Because the presence ' +
            'of personnel or confidential material could not be confirmed, this material is ' +
            'treated as restricted until contents are reviewed.';
          blockedActions = [
            'Review the full material for personnel or confidential content.',
            'Route again after confirming the material contains only procedural content.'
          ];
        } else {
          recommendation = 'safe-with-review';
          rationale = 'Procedural committee notes with no personnel or confidential content ' +
            'are safe for AI assistance with human review. Confirm the full document before use.';
          allowedActions = [
            'Use AI to summarize or draft from procedural content only.',
            'Review AI output before including in any official communication.',
            'Label AI-assisted output as a draft or working material, not an official record.'
          ];
          reviewPrompts = [
            'Who reviews this before it becomes part of an official communication?',
            'What status should the AI-assisted output have — draft, summary, or working material?'
          ];
          warnings.push(
            'Consider preparing an AI-safe working packet first: confirm no restricted content ' +
            'is present and have a colleague review the packet before AI use.'
          );
        }

      } else if (materialId === 'draft-policy') {
        recommendation = 'safe-with-review';
        rationale = 'Draft policy language is safe for AI assistance with human review. ' +
          'AI output must be reviewed before adoption and cannot replace the official ' +
          'institutional approval process.';
        allowedActions = [
          'Use AI to revise, summarize, or improve draft language.',
          'Review all AI-assisted revisions before adoption.',
          'Label AI-assisted output clearly as a draft, not an approved policy.'
        ];
        reviewPrompts = [
          'Who reviews or approves this language before it becomes official policy?',
          'What status should the AI-assisted output have — draft, recommendation, or official record?'
        ];

      } else if (materialId === 'approved-policy') {
        recommendation = 'safe-with-attribution';
        rationale = 'Approved institutional policy is a canonical record. It is safe for ' +
          'AI reference and citation with proper attribution. Do not modify without ' +
          'completing the official approval process.';
        allowedActions = [
          'Use AI to summarize or cite this policy with attribution.',
          'Include as a reference source in an AI-safe working packet.',
          'AI summaries must cite the source document explicitly.'
        ];
        blockedActions = [
          'Do not use AI to revise approved policy language without starting a new approval cycle.',
          'AI-assisted output based on this material cannot replace the official approved version.'
        ];
        warnings.push('Cite the source document in any AI-assisted summary or briefing.');

      } else {
        // Unknown or unrecognised material type — conservative default
        if (hasPersonnel === 'not-sure' || hasStudent === 'not-sure' || hasConfidential === 'not-sure') {
          recommendation = 'restricted';
          rationale = 'The material type is unclear and one or more sensitivity questions ' +
            'were not confirmed. Treating as restricted until contents are reviewed.';
        } else {
          recommendation = 'safe-with-review';
          rationale = 'Material type could not be precisely determined. Human review is ' +
            'required before AI use.';
        }
      }

      return buildResult(recommendation, materialId, workflowRoute, warnings, rationale, allowedActions, blockedActions, reviewPrompts);
    }

  };

  /* ── Private helper ──────────────────────────────────────────────────────────── */

  function buildResult(recommendation, materialId, workflowRoute, warnings, rationale, allowedActions, blockedActions, reviewPrompts) {
    return {
      recommendation:   recommendation,
      materialCategory: materialId,
      workflowRoute:    workflowRoute,
      warnings:         warnings        || [],
      rationale:        rationale       || '',
      allowedActions:   allowedActions  || [],
      blockedActions:   blockedActions  || [],
      reviewPrompts:    reviewPrompts   || [],
      nextStep:         recommendation === 'restricted' ? 'stop' : 'proceed-with-review'
    };
  }

}());
