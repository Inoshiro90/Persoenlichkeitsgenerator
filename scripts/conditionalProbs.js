// ── conditionalProbs ──────────────────────────────────────────────────────
// Core scoring pipeline. Returns remaining values sorted by descending
// probability, each entry: { value, score, prob }.
//
// Pipeline steps:
//   [S1-MOD-2] Seed-weight reduction  — seed counted at 0.7, others at 1.0
//   [MOD-1]    avg+max mixture        — score = 0.7·avg + 0.3·max
//   [MOD-2]    Diversity bonus        — score blended 85/15 with diversityBonus
//   [S1-MOD-1] Z-score normalization  — amplifies differences before softmax
//   [MOD-5]    Temperature softmax    — sigma slider value used as T
//   [S1-MOD-3] Adaptive epsilon       — 8% exploration early, fades to 0%
function conditionalProbs(chosen, remaining, sigma) {
  const T = sigma;

  if (chosen.length === 0) {
    return remaining.map(v => ({ value: v, prob: 1 / remaining.length, score: 1 }));
  }

  // [S1-MOD-3] Adaptive exploration: decays as profile fills
  const progress = chosen.length / (chosen.length + remaining.length);
  const EPSILON  = 0.08 * (1 - progress);

  const scored = remaining.map(v => {
    // [S1-MOD-2] Weighted average: seed (index 0) counts less
    const seedWeight     = 0.7;
    const weights        = chosen.map((_, i) => i === 0 ? seedWeight : 1);
    const weightedScores = chosen.map((c, i) => CMAT[c][v] * weights[i]);
    const weightSum      = weights.reduce((a, b) => a + b, 0);
    const avg            = weightedScores.reduce((a, b) => a + b, 0) / weightSum;

    // [MOD-1] Max compatibility across chosen — tolerates partial fit
    const rawScores = chosen.map(c => CMAT[c][v]);
    const max       = Math.max(...rawScores);
    let score       = 0.7 * avg + 0.3 * max;

    // [MOD-2] Weak diversity bonus (15% weight)
    score = 0.85 * score + 0.15 * diversityBonus(v, chosen);

    return { value: v, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // [S1-MOD-1] Z-score normalization before softmax
  const rawScores = scored.map(r => r.score);
  const mean      = rawScores.reduce((a, b) => a + b, 0) / rawScores.length;
  const sd        = Math.sqrt(rawScores.reduce((a, b) => a + (b - mean) ** 2, 0) / rawScores.length) || 1;
  const zScores   = rawScores.map(s => (s - mean) / sd);
  const pModel    = softmaxWeights(zScores, T);

  // [S1-MOD-3] Mixture model: blend model prob with uniform distribution
  const uniform = 1 / remaining.length;
  const pFinal  = pModel.map(p => (1 - EPSILON) * p + EPSILON * uniform);
  const pSum    = pFinal.reduce((a, b) => a + b, 0);

  return scored.map((r, i) => ({ ...r, prob: pFinal[i] / pSum }));
}
