/**
 * computeValueProfile.js
 * Stufen-Einteilung (z-Score):
 *   z ≥ +1.2  → STARK_POSITIV   ("lebt diesen Wert aktiv")
 *   z ≥ +0.4  → MODERAT_POSITIV ("schätzt diesen Wert")
 *   z >  -0.4 → NEUTRAL         ("gleichgültig gegenüber diesem Wert")
 *   z > -1.2  → MODERAT_NEGATIV ("lehnt diesen Wert eher ab")
 *   z ≤ -1.2  → STARK_NEGATIV   ("steht diesem Wert aktiv entgegen")
 */

const CORRELATION_TABLE = {
	H1: {
		selfDirectionThought:    1,  selfDirectionAction:   -10,
		stimulation:            -2,  hedonism:               -1,
		achievement:            -4,  powerDominance:         -7,
		powerResources:         -5,  face:                   -6,
		securityPersonal:       -8,  securitySocietal:       -9,
		tradition:               2,  conformityRules:         3,
		conformityInterpersonal: 4,  humility:                5,
		benevolenceDependability: 9, benevolenceCaring:       7,
		universalismConcern:     6,  universalismNature:      8,
		universalismTolerance:  10,  universalismObjectivity: 1,
	},
	H2: {
		selfDirectionThought:   -3,  selfDirectionAction:    -4,
		stimulation:            -6,  hedonism:               -7,
		achievement:            -5,  powerDominance:        -10,
		powerResources:         -1,  face:                   -2,
		securityPersonal:       -8,  securitySocietal:        2,
		tradition:               8,  conformityRules:         5,
		conformityInterpersonal: 3,  humility:                6,
		benevolenceDependability: 9, benevolenceCaring:      10,
		universalismConcern:     4,  universalismNature:     -9,
		universalismTolerance:   7,  universalismObjectivity: 1,
	},
	H3: {
		selfDirectionThought:   10,  selfDirectionAction:     9,
		stimulation:             7,  hedonism:               -6,
		achievement:            -7,  powerDominance:         -1,
		powerResources:        -10,  face:                   -8,
		securityPersonal:       -5,  securitySocietal:       -4,
		tradition:              -3,  conformityRules:        -2,
		conformityInterpersonal:-9,  humility:                8,
		benevolenceDependability: 3, benevolenceCaring:       1,
		universalismConcern:     2,  universalismNature:      4,
		universalismTolerance:   5,  universalismObjectivity: 6,
	},
	H4: {
		selfDirectionThought:   -3,  selfDirectionAction:    -4,
		stimulation:            -6,  hedonism:               -7,
		achievement:            -8,  powerDominance:        -10,
		powerResources:         -1,  face:                   -5,
		securityPersonal:        5,  securitySocietal:        6,
		tradition:               8,  conformityRules:         9,
		conformityInterpersonal: 7,  humility:               10,
		benevolenceDependability: 3, benevolenceCaring:       4,
		universalismConcern:     2,  universalismNature:     -9,
		universalismTolerance:  -2,  universalismObjectivity: 1,
	},
	E1: {
		selfDirectionThought:    6,  selfDirectionAction:     9,
		stimulation:            10,  hedonism:                7,
		achievement:             8,  powerDominance:          5,
		powerResources:         -1,  face:                   -5,
		securityPersonal:      -10,  securitySocietal:       -8,
		tradition:              -7,  conformityRules:        -9,
		conformityInterpersonal:-3,  humility:               -4,
		benevolenceDependability:-6, benevolenceCaring:      -3,
		universalismConcern:    -2,  universalismNature:      2,
		universalismTolerance:   1,  universalismObjectivity: 4,
	},
	E2: {
		selfDirectionThought:    3,  selfDirectionAction:     9,
		stimulation:            -10, hedonism:               -9,
		achievement:             2,  powerDominance:         -3,
		powerResources:         -2,  face:                   -1,
		securityPersonal:       10,  securitySocietal:        8,
		tradition:               7,  conformityRules:         6,
		conformityInterpersonal: 5,  humility:                4,
		benevolenceDependability:-7,  benevolenceCaring:       1,
		universalismConcern:    -5,  universalismNature:     -6,
		universalismTolerance:  -8,  universalismObjectivity:-4,
	},
	E3: {
		selfDirectionThought:  -10,  selfDirectionAction:    -9,
		stimulation:            -8,  hedonism:               -7,
		achievement:            -4,  powerDominance:         -1,
		powerResources:         -5,  face:                   -3,
		securityPersonal:       10,  securitySocietal:        6,
		tradition:               7,  conformityRules:         8,
		conformityInterpersonal: 4,  humility:                5,
		benevolenceDependability: 9, benevolenceCaring:       3,
		universalismConcern:     1,  universalismNature:     -6,
		universalismTolerance:   2,  universalismObjectivity:-2,
	},
	E4: {
		selfDirectionThought:   -7,  selfDirectionAction:    -6,
		stimulation:            -5,  hedonism:               -4,
		achievement:            -8,  powerDominance:        -10,
		powerResources:         -3,  face:                   -2,
		securityPersonal:       -9,  securitySocietal:       -1,
		tradition:               2,  conformityRules:         4,
		conformityInterpersonal: 3,  humility:                5,
		benevolenceDependability:10, benevolenceCaring:       9,
		universalismConcern:     4,  universalismNature:      6,
		universalismTolerance:   8,  universalismObjectivity:-9,
	},
	X1: {
		selfDirectionThought:    1,  selfDirectionAction:     9,
		stimulation:             8,  hedonism:                7,
		achievement:            10,  powerDominance:          6,
		powerResources:          5,  face:                    4,
		securityPersonal:        3,  securitySocietal:        2,
		tradition:              -1,  conformityRules:        -2,
		conformityInterpersonal:-3,  humility:              -10,
		benevolenceDependability:-4, benevolenceCaring:      -5,
		universalismConcern:    -9,  universalismNature:     -6,
		universalismTolerance:  -8,  universalismObjectivity:-7,
	},
	X2: {
		selfDirectionThought:   -3,  selfDirectionAction:     5,
		stimulation:             6,  hedonism:                4,
		achievement:            10,  powerDominance:          9,
		powerResources:          8,  face:                    7,
		securityPersonal:        1,  securitySocietal:        3,
		tradition:               2,  conformityRules:        -1,
		conformityInterpersonal:-2,  humility:              -10,
		benevolenceDependability:-5, benevolenceCaring:      -4,
		universalismConcern:    -8,  universalismNature:     -6,
		universalismTolerance:  -9,  universalismObjectivity:-7,
	},
	X3: {
		selfDirectionThought:  -10,  selfDirectionAction:    -9,
		stimulation:            -8,  hedonism:               -5,
		achievement:            -4,  powerDominance:         -1,
		powerResources:         -6,  face:                   -3,
		securityPersonal:       -7,  securitySocietal:       -2,
		tradition:              -3,   conformityRules:        5,
		conformityInterpersonal: 6,  humility:               -4,
		benevolenceDependability: 7, benevolenceCaring:       9,
		universalismConcern:     4,  universalismNature:     -6,
		universalismTolerance:   1,  universalismObjectivity: 2,
	},
	X4: {
		selfDirectionThought:    6,  selfDirectionAction:     8,
		stimulation:            10,  hedonism:                7,
		achievement:            -4,  powerDominance:         -1,
		powerResources:         -6,  face:                   -3,
		securityPersonal:       -5,  securitySocietal:       -9,
		tradition:              -2,  conformityRules:        -7,
		conformityInterpersonal:-8,  humility:               -4,
		benevolenceDependability:-5, benevolenceCaring:       4,
		universalismConcern:     2,  universalismNature:      3,
		universalismTolerance:   9,  universalismObjectivity: 5,
	},
	A1: {
		selfDirectionThought:   -6,  selfDirectionAction:    -5,
		stimulation:            -4,  hedonism:               -3,
		achievement:            -8,  powerDominance:        -10,
		powerResources:         -1,  face:                   -2,
		securityPersonal:       -9,  securitySocietal:       -7,
		tradition:               1,  conformityRules:         5,
		conformityInterpersonal: 4,  humility:                6,
		benevolenceDependability: 9, benevolenceCaring:      10,
		universalismConcern:     2,  universalismNature:      7,
		universalismTolerance:   3,  universalismObjectivity: 8,
	},
	A2: {
		selfDirectionThought:   -6,  selfDirectionAction:    -5,
		stimulation:            -4,  hedonism:               -3,
		achievement:            -8,  powerDominance:         -1,
		powerResources:         -2,  face:                  -10,
		securityPersonal:       -7,  securitySocietal:       -9,
		tradition:               1,  conformityRules:         2,
		conformityInterpersonal: 3,  humility:                5,
		benevolenceDependability: 9, benevolenceCaring:       7,
		universalismConcern:     8,  universalismNature:      4,
		universalismTolerance:  10,  universalismObjectivity: 6,
	},
	A3: {
		selfDirectionThought:   -9,  selfDirectionAction:   -10,
		stimulation:            -8,  hedonism:               -7,
		achievement:            -4,  powerDominance:         -1,
		powerResources:         -6,  face:                   -3,
		securityPersonal:        5,  securitySocietal:        6,
		tradition:               8,  conformityRules:         9,
		conformityInterpersonal: 7,  humility:               10,
		benevolenceDependability: 3, benevolenceCaring:       4,
		universalismConcern:     1,  universalismNature:     -5,
		universalismTolerance:  -2,  universalismObjectivity:-4,
	},
	A4: {
		selfDirectionThought:    4,  selfDirectionAction:     3,
		stimulation:           -10,  hedonism:               -9,
		achievement:             1,  powerDominance:         -3,
		powerResources:         -2,  face:                   -1,
		securityPersonal:       10,  securitySocietal:        9,
		tradition:               8,  conformityRules:         7,
		conformityInterpersonal: 6,  humility:                5,
		benevolenceDependability:-7,  benevolenceCaring:      -4,
		universalismConcern:    -5,  universalismNature:     -6,
		universalismTolerance:  -8,  universalismObjectivity: 2,
	},
	C1: {
		selfDirectionThought:   -8,  selfDirectionAction:     4,
		stimulation:           -10,  hedonism:               -9,
		achievement:             3,  powerDominance:         -5,
		powerResources:         -6,  face:                   -7,
		securityPersonal:        9,  securitySocietal:        8,
		tradition:              10,  conformityRules:         6,
		conformityInterpersonal: 7,  humility:                5,
		benevolenceDependability:-4,  benevolenceCaring:      -3,
		universalismConcern:    -2,  universalismNature:     -3,
		universalismTolerance:  -1,  universalismObjectivity: 1,
	},
	C2: {
		selfDirectionThought:    5,  selfDirectionAction:     2,
		stimulation:            -9,  hedonism:              -10,
		achievement:            10,  powerDominance:          4,
		powerResources:          9,  face:                    3,
		securityPersonal:        7,  securitySocietal:        6,
		tradition:               8,  conformityRules:        -1,
		conformityInterpersonal: 1,  humility:               -2,
		benevolenceDependability:-6, benevolenceCaring:      -7,
		universalismConcern:    -5,  universalismNature:     -4,
		universalismTolerance:  -8,  universalismObjectivity:-3,
	},
	C3: {
		selfDirectionThought:    6,  selfDirectionAction:     8,
		stimulation:            -9,  hedonism:              -10,
		achievement:            10,  powerDominance:          9,
		powerResources:         -3,  face:                    4,
		securityPersonal:        1,  securitySocietal:        7,
		tradition:               3,  conformityRules:        -1,
		conformityInterpersonal: 2,  humility:               -2,
		benevolenceDependability:-6, benevolenceCaring:      -5,
		universalismConcern:    -7,  universalismNature:      5,
		universalismTolerance:  -6,  universalismObjectivity:-8,
	},
	C4: {
		selfDirectionThought:   -9,  selfDirectionAction:     5,
		stimulation:           -10,  hedonism:               -8,
		achievement:            10,  powerDominance:          9,
		powerResources:         -3,  face:                    4,
		securityPersonal:        1,  securitySocietal:        7,
		tradition:               2,  conformityRules:        -1,
		conformityInterpersonal: 3,  humility:               -2,
		benevolenceDependability:-7, benevolenceCaring:      -6,
		universalismConcern:    -5,  universalismNature:     -4,
		universalismTolerance:  -8,  universalismObjectivity: 1,
	},
	O1: {
		selfDirectionThought:    9,  selfDirectionAction:     3,
		stimulation:             6,  hedonism:                2,
		achievement:            -5,  powerDominance:         -1,
		powerResources:         -6,  face:                   -3,
		securityPersonal:       -4,  securitySocietal:       -9,
		tradition:              -2,  conformityRules:        -7,
		conformityInterpersonal:-8,  humility:               -4,
		benevolenceDependability: 1, benevolenceCaring:       5,
		universalismConcern:     4,  universalismNature:     10,
		universalismTolerance:   8,  universalismObjectivity: 7,
	},
	O2: {
		selfDirectionThought:   10,  selfDirectionAction:     7,
		stimulation:             8,  hedonism:                1,
		achievement:            -4,  powerDominance:         -6,
		powerResources:         -5,  face:                   -3,
		securityPersonal:       -2,  securitySocietal:       -9,
		tradition:              -7,  conformityRules:        -5,
		conformityInterpersonal:-6,  humility:               -4,
		benevolenceDependability: 2, benevolenceCaring:       3,
		universalismConcern:     4,  universalismNature:      6,
		universalismTolerance:   5,  universalismObjectivity: 9,
	},
	O3: {
		selfDirectionThought:   10,  selfDirectionAction:     9,
		stimulation:             8,  hedonism:                7,
		achievement:            -4,  powerDominance:         -1,
		powerResources:         -6,  face:                   -3,
		securityPersonal:       -5,  securitySocietal:       -9,
		tradition:              -2,  conformityRules:        -7,
		conformityInterpersonal:-8,  humility:               -4,
		benevolenceDependability: 1, benevolenceCaring:       4,
		universalismConcern:     3,  universalismNature:      2,
		universalismTolerance:   6,  universalismObjectivity: 5,
	},
	O4: {
		selfDirectionThought:   10,  selfDirectionAction:     9,
		stimulation:             8,  hedonism:                7,
		achievement:            -4,  powerDominance:         -1,
		powerResources:         -6,  face:                   -5,
		securityPersonal:       -2,  securitySocietal:       -3,
		tradition:              -9,  conformityRules:        -7,
		conformityInterpersonal:-8,  humility:               -4,
		benevolenceDependability: 1, benevolenceCaring:       2,
		universalismConcern:     3,  universalismNature:      4,
		universalismTolerance:   5,  universalismObjectivity: 6,
	},
	Alt1: {
		selfDirectionThought:   -5,  selfDirectionAction:    -6,
		stimulation:            -7,  hedonism:               -4,
		achievement:            -3,  powerDominance:        -10,
		powerResources:         -1,  face:                   -8,
		securityPersonal:       -2,  securitySocietal:       -9,
		tradition:               1,  conformityRules:         3,
		conformityInterpersonal: 2,  humility:                4,
		benevolenceDependability:10, benevolenceCaring:       7,
		universalismConcern:     9,  universalismNature:      5,
		universalismTolerance:   8,  universalismObjectivity: 6,
	},
};

const VALUE_KEYS = [
	'selfDirectionThought', 'selfDirectionAction', 'stimulation', 'hedonism',
	'achievement', 'powerDominance', 'powerResources', 'face',
	'securityPersonal', 'securitySocietal', 'tradition',
	'conformityRules', 'conformityInterpersonal', 'humility',
	'benevolenceDependability', 'benevolenceCaring',
	'universalismConcern', 'universalismNature',
	'universalismTolerance', 'universalismObjectivity',
];

const STUFEN = {
	STARK_POSITIV:   { label: 'stark positiv',   css: 'val-stark-pos',   symbol: '▲▲' },
	MODERAT_POSITIV: { label: 'moderat positiv',  css: 'val-mod-pos',     symbol: '▲'  },
	NEUTRAL:         { label: 'neutral',           css: 'val-neutral',     symbol: '—'  },
	MODERAT_NEGATIV: { label: 'moderat negativ',  css: 'val-mod-neg',     symbol: '▼'  },
	STARK_NEGATIV:   { label: 'stark negativ',    css: 'val-stark-neg',   symbol: '▼▼' },
};

function computeValueProfile(facetLevels) {
	const rawScores = {};
	for (const key of VALUE_KEYS) rawScores[key] = 0;

	for (const [facetKey, level] of Object.entries(facetLevels)) {
		const row = CORRELATION_TABLE[facetKey];
		if (!row) continue;

		// 'high' → Vorzeichen bleibt wie in Tabelle
		// 'low'  → Vorzeichen wird umgekehrt (Gegenpol)
		const sign = level === 'high' ? 1 : -1;

		for (const valueKey of VALUE_KEYS) {
			if (row[valueKey] !== undefined) {
				rawScores[valueKey] += sign * row[valueKey];
			}
		}
	}

	const values = Object.values(rawScores);
	const mean   = values.reduce((a, b) => a + b, 0) / values.length;
	const sd     = Math.sqrt(
		values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length
	);

	const profile = {};
	for (const key of VALUE_KEYS) {
		const raw = rawScores[key];
		const z   = sd > 0 ? (raw - mean) / sd : 0;

		let stufe;
		if      (z >=  1.2) stufe = 'STARK_POSITIV';
		else if (z >=  0.4) stufe = 'MODERAT_POSITIV';
		else if (z >  -0.4) stufe = 'NEUTRAL';
		else if (z >  -1.2) stufe = 'MODERAT_NEGATIV';
		else                stufe = 'STARK_NEGATIV';

		profile[key] = { raw, z: Math.round(z * 100) / 100, stufe };
	}

	return profile;
}

function getValuesByStage(profile, ...stufen) {
	return VALUE_KEYS
		.filter(k => stufen.includes(profile[k].stufe))
		.sort((a, b) => profile[b].z - profile[a].z);
}
