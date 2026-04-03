// ── diversityBonus ────────────────────────────────────────────────────────
// [MOD-2 / S1-MOD-4] Rewards angular spread of a candidate value relative to
// already-chosen values on the Schwartz circumplex.
// Uses tanh saturation to avoid over-rewarding extreme angular distance.
// Returns a value in (0, 1).
function diversityBonus(v, chosen) {
  const dists   = chosen.map(c => angDist(VALUES_ANGLE[c], VALUES_ANGLE[v]));
  const meanDist = dists.reduce((a, b) => a + b, 0) / dists.length;
  return Math.tanh(meanDist / 90);
}
