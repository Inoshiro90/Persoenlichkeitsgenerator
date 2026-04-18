// ── DATA ──────────────────────────────────────────────────────────────────
// Schwartz value circumplex positions (degrees)
const VALUES_ANGLE = {
  selbstbestimmung_denken:0, wohlwollen_verlaesslichkeit:3, universalismus_objektivitaet:9,
  selbstbestimmung_handeln:18, stimulation:54, hedonismus:90, leistung:126,
  macht_dominanz:153, macht_ressourcen:171, ansehen:189, sicherheit_persoenlich:216,
  sicherheit_gesellschaftlich:234, tradition:261, konformitaet_regeln:279,
  konformitaet_zwischenmenschlich:297, bescheidenheit:315, universalismus_toleranz:333,
  universalismus_natur:342, universalismus_fuersorge:351, wohlwollen_fuersorge:357
};

// Full German display labels
const LABEL_FULL = {
  selbstbestimmung_denken:'Selbstbestimmtes Handeln', wohlwollen_verlaesslichkeit:'Verlässlichkeit',
  universalismus_objektivitaet:'Objektivität', selbstbestimmung_handeln:'Selbstbestimmtes Handeln',
  stimulation:'Anregung', hedonismus:'Genussstreben', leistung:'Erfolgsstreben',
  macht_dominanz:'Vormachtsstellung', macht_ressourcen:'Ressourcenkontrolle', ansehen:'Ansehen',
  sicherheit_persoenlich:'Persönliche Sicherheit', sicherheit_gesellschaftlich:'Gesellschaftliche Sicherheit',
  tradition:'Tradition', konformitaet_regeln:'Angepasstheit hinsichtlich Regeln',
  konformitaet_zwischenmenschlich:'Angepasstheit gegenüber anderen', bescheidenheit:'Bescheidenheit',
  universalismus_toleranz:'Toleranz', universalismus_natur:'Naturschutz',
  universalismus_fuersorge:'Gesellschaftliche Belange', wohlwollen_fuersorge:'Fürsorge'
};

// Higher-Order Groups (HOGs)
const HOG = {
  offenheit_fuer_wandel: ['selbstbestimmung_denken','selbstbestimmung_handeln','stimulation','hedonismus'],
  selbsterhoehung: ['leistung','macht_dominanz','macht_ressourcen','ansehen'],
  bewahrung: ['sicherheit_persoenlich','sicherheit_gesellschaftlich','tradition','konformitaet_regeln','konformitaet_zwischenmenschlich','bescheidenheit'],
  selbsttranszendenz: ['universalismus_toleranz','universalismus_natur','universalismus_fuersorge','wohlwollen_fuersorge','wohlwollen_verlaesslichkeit','universalismus_objektivitaet']
};

const HOG_LABEL = {
  offenheit_fuer_wandel:'Offenheit f. Wandel',
  selbsterhoehung:'Selbsterhöhung',
  bewahrung:'Bewahrung',
  selbsttranszendenz:'Selbsttranszendenz'
};

const HOG_COLOR = {
  offenheit_fuer_wandel:'#f0a840',
  selbsterhoehung:'#e05060',
  bewahrung:'#5888f0',
  selbsttranszendenz:'#40c090'
};

const HOG_CLASS = {
  offenheit_fuer_wandel:'ofw',
  selbsterhoehung:'se',
  bewahrung:'bew',
  selbsttranszendenz:'st'
};

// Reverse lookup: value → HOG key
const VALUE_TO_HOG = {};
Object.entries(HOG).forEach(([h, vs]) => vs.forEach(v => VALUE_TO_HOG[v] = h));

// Bipolar opposing HOG pairs (strong incompatibility)
const BIPOLAR = new Set([
  'offenheit_fuer_wandel|bewahrung',
  'bewahrung|offenheit_fuer_wandel',
  'selbsterhoehung|selbsttranszendenz',
  'selbsttranszendenz|selbsterhoehung'
]);

// Ordered list of all 20 values
const VALUES = Object.keys(VALUES_ANGLE);
