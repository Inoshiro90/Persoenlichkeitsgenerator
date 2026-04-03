// ── valueKeyMap.js ────────────────────────────────────────────────────────
// Bridge between the two naming conventions used across both systems:
//   Persönlichkeitsgenerator  →  camelCase  (selfDirectionThought, ...)
//   Markov-Sampler            →  de_snake   (selbstbestimmung_denken, ...)
//
// Single source of truth. Import in both directions.

const CAMEL_TO_DE = {
  selfDirectionThought:     'selbstbestimmung_denken',
  selfDirectionAction:      'selbstbestimmung_handeln',
  stimulation:              'stimulation',
  hedonism:                 'hedonismus',
  achievement:              'leistung',
  powerDominance:           'macht_dominanz',
  powerResources:           'macht_ressourcen',
  face:                     'ansehen',
  securityPersonal:         'sicherheit_persoenlich',
  securitySocietal:         'sicherheit_gesellschaftlich',
  tradition:                'tradition',
  conformityRules:          'konformitaet_regeln',
  conformityInterpersonal:  'konformitaet_zwischenmenschlich',
  humility:                 'bescheidenheit',
  benevolenceDependability: 'wohlwollen_verlaesslichkeit',
  benevolenceCaring:        'wohlwollen_fuersorge',
  universalismConcern:      'universalismus_fuersorge',
  universalismNature:       'universalismus_natur',
  universalismTolerance:    'universalismus_toleranz',
  universalismObjectivity:  'universalismus_objektivitaet',
};

// Reverse map — built automatically, no manual duplication
const DE_TO_CAMEL = Object.fromEntries(
  Object.entries(CAMEL_TO_DE).map(([c, d]) => [d, c])
);

/**
 * Converts a score/prior object from camelCase keys to German snake_case.
 * Silently skips unknown keys.
 * @param {Object} obj  - { selfDirectionThought: 0.12, ... }
 * @returns {Object}    - { selbstbestimmung_denken: 0.12, ... }
 */
function camelToDeScores(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const mapped = CAMEL_TO_DE[k];
    if (mapped) out[mapped] = v;
  }
  return out;
}

/**
 * Converts a score/prior object from German snake_case keys to camelCase.
 * @param {Object} obj  - { selbstbestimmung_denken: 0.12, ... }
 * @returns {Object}    - { selfDirectionThought: 0.12, ... }
 */
function deScoresToCamel(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const mapped = DE_TO_CAMEL[k];
    if (mapped) out[mapped] = v;
  }
  return out;
}
