// ── coherenceScore ────────────────────────────────────────────────────────
// Mean pairwise compatibility of all value pairs in the profile.
// Returns 1.0 for profiles with 0 or 1 values.
function coherenceScore(chosen) {
  if (chosen.length <= 1) return 1;
  let sum = 0, n = 0;
  for (let i = 0; i < chosen.length; i++) {
    for (let j = i + 1; j < chosen.length; j++) {
      sum += CMAT[chosen[i]][chosen[j]];
      n++;
    }
  }
  return sum / n;
}
