// ── compat ────────────────────────────────────────────────────────────────
// Pairwise compatibility score between two Schwartz values (0–1).
// Formula combines cosine proximity, HOG membership, and linear distance.
// [MOD-3] Bipolar penalty reduced from 0.3 → 0.6 to allow occasional tension.
function compat(v1, v2) {
  if (v1 === v2) return 1;
  const d    = angDist(VALUES_ANGLE[v1], VALUES_ANGLE[v2]);
  const prox = (Math.cos(d * Math.PI / 180) + 1) / 2;
  const h1   = VALUE_TO_HOG[v1];
  const h2   = VALUE_TO_HOG[v2];
  const hf   = h1 === h2 ? 1 : BIPOLAR.has(`${h1}|${h2}`) ? 0 : 0.5;
  const pen  = BIPOLAR.has(`${h1}|${h2}`) && d > 135 ? 0.6 : 1;
  return Math.max(0, Math.min(1, (0.6 * prox + 0.25 * hf + 0.15 * (1 - d / 180)) * pen));
}

// ── CMAT ──────────────────────────────────────────────────────────────────
// [S1-MOD-5] Symmetric precomputation — each pair computed once.
const CMAT = {};
VALUES.forEach(v => { CMAT[v] = {}; });
for (let i = 0; i < VALUES.length; i++) {
  for (let j = i + 1; j < VALUES.length; j++) {
    const c = compat(VALUES[i], VALUES[j]);
    CMAT[VALUES[i]][VALUES[j]] = c;
    CMAT[VALUES[j]][VALUES[i]] = c;
  }
}
