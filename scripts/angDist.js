// ── angDist ───────────────────────────────────────────────────────────────
// Shortest angular distance between two circumplex positions (0–180°)
function angDist(a1, a2) {
  const d = Math.abs(a1 - a2) % 360;
  return Math.min(d, 360 - d);
}
