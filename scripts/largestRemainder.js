// ── largestRemainder ──────────────────────────────────────────────────────
// Hamilton / Largest-Remainder method for converting probabilities to integer
// W100 field counts that sum to exactly 100 with no entry below 1.
function largestRemainder(probs) {
  const floored = probs.map(p => Math.floor(p * 100));
  const rems    = probs.map((p, i) => ({ r: p * 100 - floored[i], i }))
                       .sort((a, b) => b.r - a.r);
  const deficit = 100 - floored.reduce((s, f) => s + f, 0);
  for (let k = 0; k < deficit; k++) floored[rems[k].i]++;
  // Guarantee no zero-field entries: donate 1 from the largest slot
  floored.forEach((f, i) => {
    if (f === 0) {
      const m = floored.indexOf(Math.max(...floored));
      floored[m]--;
      floored[i] = 1;
    }
  });
  return floored;
}
