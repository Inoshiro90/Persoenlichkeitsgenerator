// ── softmaxWeights ────────────────────────────────────────────────────────
// [MOD-5] Temperature softmax: P(i) ∝ exp(score_i / T)
// T controls sharpness: low T = top candidates dominate, high T = flat.
// Input scores are typically z-normalized before calling this function.
function softmaxWeights(scores, T) {
  const weights = scores.map(s => Math.exp(s / T));
  const total   = weights.reduce((a, b) => a + b, 0);
  return weights.map(w => total > 0 ? w / total : 1 / scores.length);
}
