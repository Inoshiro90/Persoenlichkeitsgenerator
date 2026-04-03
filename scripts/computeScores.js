// ── computeScores.js ──────────────────────────────────────────────────────
// Converts the Markov sampling result (ordered list of chosen values) into
// a numeric score map compatible with the existing JSON output format.
//
// Score formula for CHOSEN values (position k, 1-indexed):
//   position_weight  = 1 - (k-1) / targetCount       [1.0 … ~0.17]
//   prior_relevance  = priorVector[v] / maxPrior       [0 … 1]
//   score = 5 × (0.6 × position_weight + 0.4 × prior_relevance)
//   → clamped to [1, 5], rounded to 2 decimal places
//
// Score formula for NOT-CHOSEN values:
//   score = min(2.0,  priorVector[v] × 40)
//   → residual relevance from HEXACO prior, max 2 pts
//
// Depends on: HOG (from data.js of Markov-Sampler)

/**
 * computeScores
 *
 * @param {string[]} chosen      - Values in sampling order (index 0 = most primary)
 * @param {Object}   priorVector - German snake_case → probability [0,1]
 * @param {string[]} allValues   - Full list of 20 Schwartz value keys (VALUES)
 * @returns {Object}  scores     - German snake_case → numeric score [0, 5]
 */
function computeScores(chosen, priorVector, allValues) {
  const scores     = {};
  const targetCount = chosen.length;
  const maxPrior   = Math.max(...Object.values(priorVector)) || 1;

  // ── Chosen values: position + prior weighted ───────────────────────────
  chosen.forEach((v, idx) => {
    const k               = idx + 1;                            // 1-indexed position
    const positionWeight  = 1 - (k - 1) / targetCount;         // [1.0 … ~0.17]
    const priorRelevance  = (priorVector[v] || 0) / maxPrior;  // [0 … 1]
    const raw             = 5 * (0.6 * positionWeight + 0.4 * priorRelevance);
    scores[v]             = Math.round(Math.min(5, Math.max(1, raw)) * 100) / 100;
  });

  // ── Remaining values: residual prior relevance ────────────────────────
  const chosenSet = new Set(chosen);
  for (const v of allValues) {
    if (!chosenSet.has(v)) {
      const residual = Math.min(2.0, (priorVector[v] || 0) * 40);
      scores[v]      = Math.round(residual * 100) / 100;
    }
  }

  return scores;
}

// ── computeHigherOrderScores ──────────────────────────────────────────────
/**
 * Aggregates per-value scores into HOG (Higher-Order Group) totals.
 * Uses the HOG map from the Markov-Sampler's data.js.
 *
 * @param {Object} scores - German snake_case → numeric score
 * @returns {{ hogScores: Object, dominant: string }}
 */
function computeHigherOrderScores(scores) {
  const hogScores = {};

  for (const [hog, members] of Object.entries(HOG)) {
    hogScores[hog] = members.reduce((sum, v) => sum + (scores[v] || 0), 0);
  }

  const dominant = Object.entries(hogScores)
    .sort((a, b) => b[1] - a[1])[0][0];

  return { hogScores, dominant };
}

// ── runCoherenceCheck ─────────────────────────────────────────────────────
// Wraps coherenceScore() with threshold logic.
// Returns { pass: bool, score: number, reason: string }
const COHERENCE_MIN = 0.42; // below → too contradictory → resample
const COHERENCE_MAX = 0.90; // above → too homogeneous → log warning only

function runCoherenceCheck(chosen) {
  const score = coherenceScore(chosen); // from Markov-Sampler's coherenceScore.js

  if (score < COHERENCE_MIN) {
    return { pass: false, score, reason: `zu inkohärent (${score.toFixed(3)} < ${COHERENCE_MIN})` };
  }
  if (score > COHERENCE_MAX) {
    // Warn but still accept
    // console.warn(`[coherence] Sehr homogenes Profil: ${score.toFixed(3)} > ${COHERENCE_MAX}`);
  }
  return { pass: true, score, reason: 'ok' };
}
