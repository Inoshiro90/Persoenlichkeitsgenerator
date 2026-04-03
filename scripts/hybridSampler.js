// ── hybridSampler.js ──────────────────────────────────────────────────────
// Central integration module.
//
// Bridges the Persönlichkeitsgenerator with the Schwartz-Markov-Sampler.
//
// Depends on (must be loaded before this file):
//   From Persönlichkeitsgenerator:
//     - CORRELATION_TABLE, VALUE_KEYS       (computeValueProfile.js)
//     - CAMEL_TO_DE, normalizeVector,
//       softmax, zNormalize, weightedSample (valueKeyMap.js +
//                                            generatePriorFromHexaco.js)
//   From Markov-Sampler:
//     - VALUES, VALUES_ANGLE, HOG, CMAT     (data.js + compat.js)
//     - conditionalProbs()                  (conditionalProbs.js)
//     - diversityBonus()                    (diversityBonus.js)
//     - coherenceScore()                    (coherenceScore.js)
//
// Public API:
//   generateValueProfile(facetLevels, options?) → ProfileResult
//
// ── Default options ───────────────────────────────────────────────────────
const DEFAULT_OPTIONS = {
  targetCount:  6,      // how many values to sample
  temperature:  0.25,   // Softmax sharpness for Markov step (σ in original sampler)
  priorTemp:    0.50,   // Softmax temperature for the HEXACO prior itself
  priorNoise:   0.02,   // Gaussian noise σ added to prior (individual variance)
  varianceMode: 'normal', // 'tight' | 'normal' | 'wild'
  maxRetries:   3,      // max coherence-check retries before accepting best
  seed:         null,   // optional: force first value (string key, de_snake)
};

// Temperature overrides by varianceMode
const VARIANCE_TEMPS = {
  tight:  { temperature: 0.10, priorTemp: 0.30, priorNoise: 0.005 },
  normal: { temperature: 0.25, priorTemp: 0.50, priorNoise: 0.020 },
  wild:   { temperature: 0.65, priorTemp: 0.90, priorNoise: 0.060 },
};

// ── Adaptive weight schedule ──────────────────────────────────────────────
// α(k): Markov weight — grows as profile fills
// β(k): Prior weight  — shrinks as profile fills
// γ(k): Exploration   — fades to 0 (adaptive epsilon, matching Markov-Sampler)
//
// At k=1 (second pick): α=0.50, β=0.42, γ=0.08
// At k=N-1 (last pick): α=0.80, β=0.10, γ≈0
function adaptiveWeights(k, targetCount) {
  const progress = k / (targetCount - 1); // 0 → 1
  const alpha    = 0.50 + 0.30 * progress;                    // Markov
  const epsilon  = 0.08 * Math.max(0, 1 - progress);          // exploration (mirrors Markov-Sampler [S1-MOD-3])
  const beta     = Math.max(0.10, (1 - alpha - epsilon));      // prior
  // renormalise so α+β+γ = 1
  const total    = alpha + beta + epsilon;
  return { alpha: alpha / total, beta: beta / total, gamma: epsilon / total };
}

// ── Add Gaussian noise to prior ───────────────────────────────────────────
// Simulates individual differences within the same HEXACO type.
function addPriorNoise(prior, sigma) {
  if (sigma <= 0) return prior;
  const noisy = {};
  for (const [k, v] of Object.entries(prior)) {
    // Box-Muller: single Gaussian sample per value
    const u1 = Math.random() || 1e-10;
    const u2 = Math.random();
    const z  = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    noisy[k] = Math.max(0, v + sigma * z);
  }
  return normalizeVector(noisy); // relu + renormalise
}

// ── combineProbabilities ──────────────────────────────────────────────────
/**
 * Hybrid mixture of Markov + Prior + Uniform for the remaining values.
 *
 * @param {Array}  markovResult  - output of conditionalProbs(): [{value, prob, score}, ...]
 * @param {Object} prior         - de_snake → probability (full, over all 20)
 * @param {string[]} remaining   - values not yet chosen
 * @param {{ alpha, beta, gamma }} weights
 * @param {number} T             - softmax temperature
 * @returns {Array}  [{value, finalProb}, ...] sorted descending by finalProb
 */
function combineProbabilities(markovResult, prior, remaining, weights, T) {
  const { alpha, beta, gamma } = weights;
  const uniform = 1 / remaining.length;

  // Normalise prior over REMAINING values only
  const priorSlice  = {};
  let   priorSum    = 0;
  for (const v of remaining) {
    priorSlice[v] = prior[v] || 0;
    priorSum     += priorSlice[v];
  }
  if (priorSum > 0) {
    for (const v of remaining) priorSlice[v] /= priorSum;
  } else {
    for (const v of remaining) priorSlice[v] = uniform;
  }

  // Build a lookup from markovResult → prob
  const markovMap = {};
  for (const r of markovResult) markovMap[r.value] = r.prob;

  // Hybrid raw scores
  const hybridScores = remaining.map(v => ({
    value: v,
    score: alpha * (markovMap[v] || 0) +
           beta  * priorSlice[v]       +
           gamma * uniform,
  }));

  // Z-normalise then softmax (mirrors [S1-MOD-1] + [MOD-5] in conditionalProbs.js)
  const rawScores = hybridScores.map(r => r.score);
  const mean      = rawScores.reduce((a, b) => a + b, 0) / rawScores.length;
  const sd        = Math.sqrt(rawScores.reduce((a, b) => a + (b - mean) ** 2, 0) / rawScores.length) || 1;
  const zScores   = rawScores.map(s => (s - mean) / sd);
  const probs     = softmax(zScores, T);

  return hybridScores
    .map((r, i) => ({ value: r.value, finalProb: probs[i] }))
    .sort((a, b) => b.finalProb - a.finalProb);
}

// ── One sampling attempt ──────────────────────────────────────────────────
function runSamplingAttempt(prior, opts) {
  const { targetCount, temperature, seed } = opts;
  const chosen    = [];
  const remaining = [...VALUES]; // full list from data.js
  const log       = [];

  // ── Step 1: Seed selection ───────────────────────────────────────────
  let seedValue;
  if (seed && remaining.includes(seed)) {
    seedValue = seed;
  } else {
    // Sample from prior
    const priorWeights = VALUES.map(v => prior[v] || 0);
    seedValue = weightedSample(VALUES, priorWeights);
  }
  chosen.push(seedValue);
  remaining.splice(remaining.indexOf(seedValue), 1);
  log.push({ step: 0, value: seedValue, source: 'prior_seed' });

  // ── Steps 2…N: Hybrid Markov + Prior ───────────────────────────────
  while (chosen.length < targetCount && remaining.length > 0) {
    const k = chosen.length; // current step index (1-based for logging)

    // Markov probabilities from the existing conditionalProbs() function
    const markovResult = conditionalProbs(chosen, remaining, temperature);

    // Adaptive weights for this step
    const weights = adaptiveWeights(k, targetCount);

    // Hybrid mixture
    const combined = combineProbabilities(
      markovResult, prior, remaining, weights, temperature
    );

    // Sample from hybrid distribution
    const candidates = combined.map(r => r.value);
    const finalProbs = combined.map(r => r.finalProb);
    const picked     = weightedSample(candidates, finalProbs);

    chosen.push(picked);
    remaining.splice(remaining.indexOf(picked), 1);
    log.push({
      step:    k,
      value:   picked,
      weights: { alpha: +weights.alpha.toFixed(3), beta: +weights.beta.toFixed(3), gamma: +weights.gamma.toFixed(3) },
      prob:    +(finalProbs[candidates.indexOf(picked)]).toFixed(4),
    });
  }

  return { chosen, log };
}

// ── Main public function ──────────────────────────────────────────────────
/**
 * generateValueProfile
 *
 * Complete pipeline: HEXACO facet levels → probabilistic Schwartz value profile.
 *
 * @param {Object} facetLevels  - e.g. { H1: 'high', H2: 'low', E3: 'high', ... }
 * @param {Object} [userOpts]   - override any DEFAULT_OPTIONS field
 * @returns {ProfileResult}
 *
 * ProfileResult:
 * {
 *   schwartz_scores:       { [de_snake]: number },   // 0–5
 *   top_schwartz_values:   string[],                 // ordered, chosen values
 *   higher_order_scores:   { [hog]: number },
 *   dominant_higher_order: string,
 *   coherence_score:       number,                   // 0–1
 *   sampling_path:         Array,                    // debug log
 *   prior_vector:          { [de_snake]: number },   // the HEXACO prior used
 *   _meta: { retries, varianceMode, temperature }
 * }
 */
function generateValueProfile(facetLevels, userOpts = {}) {

  // ── Merge options ──────────────────────────────────────────────────────
  const opts = Object.assign({}, DEFAULT_OPTIONS, userOpts);

  // Apply varianceMode temperature overrides
  if (VARIANCE_TEMPS[opts.varianceMode]) {
    Object.assign(opts, VARIANCE_TEMPS[opts.varianceMode], userOpts);
  }

  // ── Phase 1: Generate HEXACO prior ────────────────────────────────────
  // Uses generatePriorFromHexaco() from generatePriorFromHexaco.js
  const rawPrior  = generatePriorFromHexaco(facetLevels, opts.priorTemp);

  // ── Phase 2: Add individual noise ─────────────────────────────────────
  const prior = addPriorNoise(rawPrior, opts.priorNoise);

  // ── Phase 3: Sampling with coherence check + retries ──────────────────
  let bestResult      = null;
  let bestCoherence   = -1;
  let retries         = 0;

  for (let attempt = 0; attempt < opts.maxRetries; attempt++) {
    const { chosen, log } = runSamplingAttempt(prior, opts);
    const check           = runCoherenceCheck(chosen); // from computeScores.js

    if (check.pass) {
      bestResult    = { chosen, log };
      bestCoherence = check.score;
      retries       = attempt;
      break;
    }

    // Keep the most coherent result seen so far as fallback
    if (check.score > bestCoherence) {
      bestCoherence = check.score;
      bestResult    = { chosen, log };
    }

    retries = attempt + 1;
    // On retry: nudge temperature slightly upward → more Markov-driven
    opts.temperature = Math.min(0.8, opts.temperature * 1.25);
  }

  // ── Phase 4: Score assignment ──────────────────────────────────────────
  const { chosen, log } = bestResult;
  const scores          = computeScores(chosen, prior, VALUES); // from computeScores.js

  // ── Phase 5: Higher-order aggregation ─────────────────────────────────
  const { hogScores, dominant } = computeHigherOrderScores(scores); // from computeScores.js

  // ── Phase 6: Assemble output (backward-compatible format) ─────────────
  return {
    // Core output — matches existing hexaco_to_value_mapping.json format
    schwartz_scores:       scores,
    top_schwartz_values:   chosen,
    higher_order_scores:   hogScores,
    dominant_higher_order: dominant,

    // New fields
    coherence_score:  +bestCoherence.toFixed(4),
    sampling_path:    log,
    prior_vector:     prior,

    _meta: {
      retries,
      varianceMode:   opts.varianceMode,
      temperature:    +opts.temperature.toFixed(3),
    },
  };
}
