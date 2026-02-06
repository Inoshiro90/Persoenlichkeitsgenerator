function selectTopThreeMoralValues(facetLevels) {
	const strongPositive = 5;
	const moderatePositive = 4;
	const weakPositive = 3;
	const veryWeakPositive = 2;
	const negligiblePositive = 1;
	const negligibleNegative = -1;
	const veryWeakNegative = -2;
	const weakNegative = -3;
	const moderateNegative = -4;
	const strongNegative = -5;

	const adjustments = {
		// H‑Facetten
		H1: {
			high: {
				selfDirection: negligiblePositive,
				stimulation: veryWeakNegative,
				hedonism: weakNegative,
				achievement: moderateNegative,
				power: strongNegative,
				security: negligibleNegative,
				conformity: weakPositive,
				tradition: veryWeakPositive,
				benevolence: moderatePositive,
				universalism: strongPositive,
			},
			low: {
				selfDirection: negligibleNegative,
				stimulation: veryWeakPositive,
				hedonism: weakPositive,
				achievement: moderatePositive,
				power: strongPositive,
				security: negligiblePositive,
				conformity: weakNegative,
				tradition: veryWeakNegative,
				benevolence: moderateNegative,
				universalism: strongNegative,
			},
		},

		H2: {
			high: {
				selfDirection: negligibleNegative,
				stimulation: weakNegative,
				hedonism: moderateNegative,
				achievement: veryWeakNegative,
				power: strongNegative,
				security: negligiblePositive,
				conformity: strongPositive,
				tradition: veryWeakPositive,
				benevolence: weakPositive,
				universalism: moderatePositive,
			},
			low: {
				selfDirection: negligiblePositive,
				stimulation: weakPositive,
				hedonism: moderatePositive,
				achievement: veryWeakPositive,
				power: strongPositive,
				security: negligibleNegative,
				conformity: strongNegative,
				tradition: veryWeakNegative,
				benevolence: weakNegative,
				universalism: moderateNegative,
			},
		},

		H3: {
			high: {
				selfDirection: weakPositive,
				stimulation: veryWeakNegative,
				hedonism: weakNegative,
				achievement: moderateNegative,
				power: strongNegative,
				security: negligibleNegative,
				conformity: negligiblePositive,
				tradition: veryWeakPositive,
				benevolence: moderatePositive,
				universalism: strongPositive,
			},
			low: {
				selfDirection: weakNegative,
				stimulation: veryWeakPositive,
				hedonism: weakPositive,
				achievement: moderatePositive,
				power: strongPositive,
				security: negligiblePositive,
				conformity: negligibleNegative,
				tradition: veryWeakNegative,
				benevolence: moderateNegative,
				universalism: strongNegative,
			},
		},

		H4: {
			high: {
				selfDirection: negligibleNegative,
				stimulation: weakNegative,
				hedonism: veryWeakNegative,
				achievement: moderateNegative,
				power: strongNegative,
				security: negligiblePositive,
				conformity: weakPositive,
				tradition: veryWeakPositive,
				benevolence: moderatePositive,
				universalism: strongPositive,
			},
			low: {
				selfDirection: negligiblePositive,
				stimulation: weakPositive,
				hedonism: veryWeakPositive,
				achievement: moderatePositive,
				power: strongPositive,
				security: negligibleNegative,
				conformity: weakNegative,
				tradition: veryWeakNegative,
				benevolence: moderateNegative,
				universalism: strongNegative,
			},
		},

		// E‑Facetten
		E1: {
			high: {
				selfDirection: moderateNegative,
				stimulation: strongNegative,
				hedonism: negligiblePositive,
				achievement: veryWeakPositive,
				power: negligibleNegative,
				security: moderatePositive,
				conformity: strongPositive,
				tradition: weakPositive,
				benevolence: weakNegative,
				universalism: veryWeakNegative,
			},
			low: {
				selfDirection: moderatePositive,
				stimulation: strongPositive,
				hedonism: negligibleNegative,
				achievement: veryWeakNegative,
				power: negligiblePositive,
				security: moderateNegative,
				conformity: strongNegative,
				tradition: weakNegative,
				benevolence: weakPositive,
				universalism: veryWeakPositive,
			},
		},

		E2: {
			high: {
				selfDirection: veryWeakNegative,
				stimulation: moderateNegative,
				hedonism: negligiblePositive,
				achievement: weakPositive,
				power: weakNegative,
				security: moderatePositive,
				conformity: strongPositive,
				tradition: veryWeakPositive,
				benevolence: strongNegative,
				universalism: negligibleNegative,
			},
			low: {
				selfDirection: veryWeakPositive,
				stimulation: moderatePositive,
				hedonism: negligibleNegative,
				achievement: weakNegative,
				power: weakPositive,
				security: moderateNegative,
				conformity: strongNegative,
				tradition: veryWeakNegative,
				benevolence: strongPositive,
				universalism: negligiblePositive,
			},
		},

		E3: {
			high: {
				selfDirection: strongNegative,
				stimulation: moderateNegative,
				hedonism: strongPositive,
				achievement: veryWeakPositive,
				power: weakNegative,
				security: weakPositive,
				conformity: moderatePositive,
				tradition: negligiblePositive,
				benevolence: veryWeakNegative,
				universalism: negligibleNegative,
			},
			low: {
				selfDirection: strongPositive,
				stimulation: moderatePositive,
				hedonism: strongNegative,
				achievement: veryWeakNegative,
				power: weakPositive,
				security: weakNegative,
				conformity: moderateNegative,
				tradition: negligibleNegative,
				benevolence: veryWeakPositive,
				universalism: negligiblePositive,
			},
		},

		E4: {
			high: {
				selfDirection: moderateNegative,
				stimulation: weakNegative,
				hedonism: negligiblePositive,
				achievement: veryWeakNegative,
				power: strongNegative,
				security: veryWeakPositive,
				conformity: moderatePositive,
				tradition: negligibleNegative,
				benevolence: weakPositive,
				universalism: strongPositive,
			},
			low: {
				selfDirection: moderatePositive,
				stimulation: weakPositive,
				hedonism: negligibleNegative,
				achievement: veryWeakPositive,
				power: strongPositive,
				security: veryWeakNegative,
				conformity: moderateNegative,
				tradition: negligiblePositive,
				benevolence: weakNegative,
				universalism: strongNegative,
			},
		},

		// X‑Facetten
		X1: {
			high: {
				selfDirection: negligiblePositive,
				stimulation: moderatePositive,
				hedonism: weakPositive,
				achievement: negligibleNegative,
				power: strongNegative,
				security: veryWeakNegative,
				conformity: moderateNegative,
				tradition: weakNegative,
				benevolence: strongPositive,
				universalism: veryWeakPositive,
			},
			low: {
				selfDirection: negligibleNegative,
				stimulation: moderateNegative,
				hedonism: weakNegative,
				achievement: negligiblePositive,
				power: strongPositive,
				security: veryWeakPositive,
				conformity: moderatePositive,
				tradition: weakPositive,
				benevolence: strongNegative,
				universalism: veryWeakNegative,
			},
		},

		X2: {
			high: {
				selfDirection: moderatePositive,
				stimulation: strongPositive,
				hedonism: negligibleNegative,
				achievement: veryWeakPositive,
				power: veryWeakNegative,
				security: weakNegative,
				conformity: strongNegative,
				tradition: moderateNegative,
				benevolence: weakPositive,
				universalism: negligiblePositive,
			},
			low: {
				selfDirection: moderateNegative,
				stimulation: strongNegative,
				hedonism: negligiblePositive,
				achievement: veryWeakNegative,
				power: veryWeakPositive,
				security: weakPositive,
				conformity: strongPositive,
				tradition: moderatePositive,
				benevolence: weakNegative,
				universalism: negligibleNegative,
			},
		},

		X3: {
			high: {
				selfDirection: strongNegative,
				stimulation: moderatePositive,
				hedonism: strongPositive,
				achievement: weakPositive,
				power: moderateNegative,
				security: veryWeakNegative,
				conformity: negligibleNegative,
				tradition: weakNegative,
				benevolence: negligiblePositive,
				universalism: veryWeakPositive,
			},
			low: {
				selfDirection: strongPositive,
				stimulation: moderateNegative,
				hedonism: strongNegative,
				achievement: weakNegative,
				power: moderatePositive,
				security: veryWeakPositive,
				conformity: negligiblePositive,
				tradition: weakPositive,
				benevolence: negligibleNegative,
				universalism: veryWeakNegative,
			},
		},

		X4: {
			high: {
				selfDirection: negligibleNegative,
				stimulation: strongPositive,
				hedonism: weakPositive,
				achievement: negligiblePositive,
				power: strongNegative,
				security: veryWeakNegative,
				conformity: moderateNegative,
				tradition: weakNegative,
				benevolence: moderatePositive,
				universalism: veryWeakPositive,
			},
			low: {
				selfDirection: negligiblePositive,
				stimulation: strongNegative,
				hedonism: weakNegative,
				achievement: negligibleNegative,
				power: strongPositive,
				security: veryWeakPositive,
				conformity: moderatePositive,
				tradition: weakPositive,
				benevolence: moderateNegative,
				universalism: veryWeakNegative,
			},
		},

		// A‑Facetten
		A1: {
			high: {
				selfDirection: weakNegative,
				stimulation: veryWeakPositive,
				hedonism: negligibleNegative,
				achievement: moderateNegative,
				power: strongNegative,
				security: veryWeakNegative,
				conformity: weakPositive,
				tradition: moderatePositive,
				benevolence: negligiblePositive,
				universalism: strongPositive,
			},
			low: {
				selfDirection: weakPositive,
				stimulation: veryWeakNegative,
				hedonism: negligiblePositive,
				achievement: moderatePositive,
				power: strongPositive,
				security: veryWeakPositive,
				conformity: weakNegative,
				tradition: moderateNegative,
				benevolence: negligibleNegative,
				universalism: strongNegative,
			},
		},

		A2: {
			high: {
				selfDirection: weakNegative,
				stimulation: veryWeakNegative,
				hedonism: negligibleNegative,
				achievement: moderateNegative,
				power: strongNegative,
				security: veryWeakPositive,
				conformity: strongPositive,
				tradition: moderatePositive,
				benevolence: negligiblePositive,
				universalism: weakPositive,
			},
			low: {
				selfDirection: weakPositive,
				stimulation: veryWeakPositive,
				hedonism: negligiblePositive,
				achievement: moderatePositive,
				power: strongPositive,
				security: veryWeakNegative,
				conformity: strongNegative,
				tradition: moderateNegative,
				benevolence: negligibleNegative,
				universalism: weakNegative,
			},
		},

		A3: {
			high: {
				selfDirection: weakNegative,
				stimulation: negligibleNegative,
				hedonism: veryWeakNegative,
				achievement: moderateNegative,
				power: strongNegative,
				security: negligiblePositive,
				conformity: moderatePositive,
				tradition: weakPositive,
				benevolence: veryWeakPositive,
				universalism: strongPositive,
			},
			low: {
				selfDirection: weakPositive,
				stimulation: negligiblePositive,
				hedonism: veryWeakPositive,
				achievement: moderatePositive,
				power: strongPositive,
				security: negligibleNegative,
				conformity: moderateNegative,
				tradition: weakNegative,
				benevolence: veryWeakNegative,
				universalism: strongNegative,
			},
		},

		A4: {
			high: {
				selfDirection: veryWeakNegative,
				stimulation: negligibleNegative,
				hedonism: weakNegative,
				achievement: moderateNegative,
				power: strongNegative,
				security: negligiblePositive,
				conformity: moderatePositive,
				tradition: weakPositive,
				benevolence: veryWeakPositive,
				universalism: strongPositive,
			},
			low: {
				selfDirection: veryWeakPositive,
				stimulation: negligiblePositive,
				hedonism: weakPositive,
				achievement: moderatePositive,
				power: strongPositive,
				security: negligibleNegative,
				conformity: moderateNegative,
				tradition: weakNegative,
				benevolence: veryWeakNegative,
				universalism: strongNegative,
			},
		},

		// C‑Facetten
		C1: {
			high: {
				selfDirection: strongNegative,
				stimulation: weakNegative,
				hedonism: moderateNegative,
				achievement: negligiblePositive,
				power: veryWeakNegative,
				security: strongPositive,
				conformity: moderatePositive,
				tradition: weakPositive,
				benevolence: veryWeakPositive,
				universalism: negligibleNegative,
			},
			low: {
				selfDirection: strongPositive,
				stimulation: weakPositive,
				hedonism: moderatePositive,
				achievement: negligibleNegative,
				power: veryWeakPositive,
				security: strongNegative,
				conformity: moderateNegative,
				tradition: weakNegative,
				benevolence: veryWeakNegative,
				universalism: negligiblePositive,
			},
		},

		C2: {
			high: {
				selfDirection: negligiblePositive,
				stimulation: weakPositive,
				hedonism: strongNegative,
				achievement: strongPositive,
				power: moderateNegative,
				security: negligibleNegative,
				conformity: weakNegative,
				tradition: veryWeakNegative,
				benevolence: moderatePositive,
				universalism: veryWeakPositive,
			},
			low: {
				selfDirection: negligibleNegative,
				stimulation: weakNegative,
				hedonism: strongPositive,
				achievement: strongNegative,
				power: moderatePositive,
				security: negligiblePositive,
				conformity: weakPositive,
				tradition: veryWeakPositive,
				benevolence: moderateNegative,
				universalism: veryWeakNegative,
			},
		},

		C3: {
			high: {
				selfDirection: negligibleNegative,
				stimulation: moderateNegative,
				hedonism: strongNegative,
				achievement: weakPositive,
				power: veryWeakNegative,
				security: moderatePositive,
				conformity: strongPositive,
				tradition: negligiblePositive,
				benevolence: veryWeakPositive,
				universalism: weakNegative,
			},
			low: {
				selfDirection: negligiblePositive,
				stimulation: moderatePositive,
				hedonism: strongPositive,
				achievement: weakNegative,
				power: veryWeakPositive,
				security: moderateNegative,
				conformity: strongNegative,
				tradition: negligibleNegative,
				benevolence: veryWeakNegative,
				universalism: weakPositive,
			},
		},

		C4: {
			high: {
				selfDirection: veryWeakNegative,
				stimulation: weakNegative,
				hedonism: strongNegative,
				achievement: negligibleNegative,
				power: moderateNegative,
				security: strongPositive,
				conformity: moderatePositive,
				tradition: veryWeakPositive,
				benevolence: weakPositive,
				universalism: negligiblePositive,
			},
			low: {
				selfDirection: veryWeakPositive,
				stimulation: weakPositive,
				hedonism: strongPositive,
				achievement: negligiblePositive,
				power: moderatePositive,
				security: strongNegative,
				conformity: moderateNegative,
				tradition: veryWeakNegative,
				benevolence: weakNegative,
				universalism: negligibleNegative,
			},
		},

		// O‑Facetten
		O1: {
			high: {
				selfDirection: moderatePositive,
				stimulation: weakPositive,
				hedonism: negligiblePositive,
				achievement: veryWeakNegative,
				power: strongNegative,
				security: negligibleNegative,
				conformity: weakNegative,
				tradition: moderateNegative,
				benevolence: veryWeakPositive,
				universalism: strongPositive,
			},
			low: {
				selfDirection: moderateNegative,
				stimulation: weakNegative,
				hedonism: negligibleNegative,
				achievement: veryWeakPositive,
				power: strongPositive,
				security: negligiblePositive,
				conformity: weakPositive,
				tradition: moderatePositive,
				benevolence: veryWeakNegative,
				universalism: strongNegative,
			},
		},

		O2: {
			high: {
				selfDirection: moderatePositive,
				stimulation: weakPositive,
				hedonism: weakNegative,
				achievement: negligiblePositive,
				power: moderateNegative,
				security: negligibleNegative,
				conformity: strongNegative,
				tradition: veryWeakNegative,
				benevolence: veryWeakPositive,
				universalism: strongPositive,
			},
			low: {
				selfDirection: moderateNegative,
				stimulation: weakNegative,
				hedonism: weakPositive,
				achievement: negligibleNegative,
				power: moderatePositive,
				security: negligiblePositive,
				conformity: strongPositive,
				tradition: veryWeakPositive,
				benevolence: veryWeakNegative,
				universalism: strongNegative,
			},
		},

		O3: {
			high: {
				selfDirection: weakPositive,
				stimulation: strongPositive,
				hedonism: negligibleNegative,
				achievement: negligiblePositive,
				power: moderateNegative,
				security: veryWeakNegative,
				conformity: strongNegative,
				tradition: weakNegative,
				benevolence: veryWeakPositive,
				universalism: moderatePositive,
			},
			low: {
				selfDirection: weakNegative,
				stimulation: strongNegative,
				hedonism: negligiblePositive,
				achievement: negligibleNegative,
				power: moderatePositive,
				security: veryWeakPositive,
				conformity: strongPositive,
				tradition: weakPositive,
				benevolence: veryWeakNegative,
				universalism: moderateNegative,
			},
		},

		O4: {
			high: {
				selfDirection: weakPositive,
				stimulation: strongPositive,
				hedonism: negligiblePositive,
				achievement: negligibleNegative,
				power: veryWeakNegative,
				security: moderateNegative,
				conformity: strongNegative,
				tradition: weakNegative,
				benevolence: veryWeakPositive,
				universalism: moderatePositive,
			},
			low: {
				selfDirection: weakNegative,
				stimulation: strongNegative,
				hedonism: negligibleNegative,
				achievement: negligiblePositive,
				power: veryWeakPositive,
				security: moderatePositive,
				conformity: strongPositive,
				tradition: weakPositive,
				benevolence: veryWeakNegative,
				universalism: moderateNegative,
			},
		},

		// Alt‑Facetten
		Alt1: {
			high: {
				selfDirection: negligibleNegative,
				stimulation: weakNegative,
				hedonism: veryWeakNegative,
				achievement: moderateNegative,
				power: strongNegative,
				security: veryWeakPositive,
				conformity: weakPositive,
				tradition: negligiblePositive,
				benevolence: moderatePositive,
				universalism: strongPositive,
			},
			low: {
				selfDirection: negligiblePositive,
				stimulation: weakPositive,
				hedonism: veryWeakPositive,
				achievement: moderatePositive,
				power: strongPositive,
				security: veryWeakNegative,
				conformity: weakNegative,
				tradition: negligibleNegative,
				benevolence: moderateNegative,
				universalism: strongNegative,
			},
		},
	};

	// ───────────────────────────────────────────────────────────────
	// 2️⃣  Gesamtsumme initialisieren
	// ───────────────────────────────────────────────────────────────

	const totals = {
		selfDirection: 0,
		stimulation: 0,
		hedonism: 0,
		achievement: 0,
		power: 0,
		security: 0,
		conformity: 0,
		tradition: 0,
		benevolence: 0,
		universalism: 0,
	};

	// ───────────────────────────────────────────────────────────────
	// 3️⃣  Alle Facetten durchlaufen und die passenden Werte addieren
	// ───────────────────────────────────────────────────────────────

	for (const [facet, level] of Object.entries(facetLevels)) {
		const adjustment = adjustments[facet]?.[level];
		if (!adjustment) continue; // kein "high"/"low" oder unbekannte Facette

		for (const key in adjustment) {
			totals[key] += adjustment[key]; // Summieren
		}
	}

	console.log('Totals:', totals);

	const top = Object.entries(totals)
		.sort((a, b) => b[1] - a[1]) // absteigend sortieren
		.slice(0, 5);

	console.log('Top:', top);

	return top.map(([key]) => key);
}
