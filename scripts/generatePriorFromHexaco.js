// ── generatePriorFromHexaco.js ────────────────────────────────────────────
// REPLACES the scoring half of computeValueProfile.js.
//
// Instead of mapping HEXACO → discrete z-score stages (STARK_POSITIV etc.),
// this produces a PROBABILITY DISTRIBUTION over all 20 Schwartz values.
// Output keys are German snake_case, matching the Markov-Sampler (VALUES_ANGLE).
//
// Depends on:
//   - CORRELATION_TABLE  (from computeValueProfile.js — keep that const in scope)
//   - VALUE_KEYS         (from computeValueProfile.js)
//   - CAMEL_TO_DE        (from valueKeyMap.js)
//
// Pipeline:
//   [1] Raw score:   Σ  sign(level) × CORRELATION_TABLE[facet][value]
//   [2] Z-normalize: zero-mean, unit-variance across all 20 values
//   [3] Softmax(T):  → probability vector in [0,1], Σ = 1

// ── Utility: softmax with temperature ────────────────────────────────────
function softmax(scores, T = 0.5) {
  const max = Math.max(...scores); // numerical stability: subtract max
  const exps = scores.map(s => Math.exp((s - max) / T));
  const sum  = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
}

// ── Utility: z-score normalise a plain array ──────────────────────────────
function zNormalize(values) {
  const n    = values.length;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const sd   = Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / n) || 1;
  return values.map(v => (v - mean) / sd);
}

// ── Utility: weighted sample from an array ───────────────────────────────
// Returns one element of `items` sampled according to `weights`.
function weightedSample(items, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1]; // safety fallback
}

// ── Utility: normalise object values to sum to 1 ─────────────────────────
function normalizeVector(obj) {
  const keys = Object.keys(obj);
  const vals = keys.map(k => Math.max(0, obj[k])); // relu — no negatives
  const sum  = vals.reduce((a, b) => a + b, 0) || 1;
  const out  = {};
  keys.forEach((k, i) => { out[k] = vals[i] / sum; });
  return out;
}

// ── Main export ───────────────────────────────────────────────────────────
/**
 * generatePriorFromHexaco
 *
 * @param {Object} facetLevels  - e.g. { H1: 'high', E2: 'low', X3: 'high', ... }
 * @param {number} [T=0.5]      - Softmax temperature.
 *                                  Low (0.1) → sharp/peaked distribution.
 *                                  High (1.0) → flat/uniform distribution.
 * @returns {Object}  priorVector — German snake_case keys → probability [0,1], Σ=1
 *
 * Example:
 *   { wohlwollen_fuersorge: 0.14, selbstbestimmung_denken: 0.09, ... }
 */
function generatePriorFromHexaco(facetLevels, T = 0.5) {

  // ── [1] Raw scores (same accumulation logic as original computeValueProfile) ──
  const raw = {};
  for (const key of VALUE_KEYS) raw[key] = 0;

  for (const [facetKey, level] of Object.entries(facetLevels)) {
    const row = CORRELATION_TABLE[facetKey];
    if (!row) continue;
    // 'high' keeps sign as-is; 'low' inverts (opposite pole)
    const sign = level === 'high' ? 1 : -1;
    for (const valueKey of VALUE_KEYS) {
      if (row[valueKey] !== undefined) {
        raw[valueKey] += sign * row[valueKey];
      }
    }
  }

  // ── [2] Z-score normalisation ──────────────────────────────────────────
  const rawArr  = VALUE_KEYS.map(k => raw[k]);
  const zArr    = zNormalize(rawArr);

  // ── [3] Softmax → probability distribution ────────────────────────────
  const probArr = softmax(zArr, T);

  // ── [4] Assemble output in German snake_case keys ──────────────────────
  const prior = {};
  VALUE_KEYS.forEach((camelKey, i) => {
    const deKey    = CAMEL_TO_DE[camelKey];
    if (deKey) prior[deKey] = probArr[i];
  });

  return prior; // e.g. { wohlwollen_fuersorge: 0.14, ... }
}
