const BEREICH_WERTE = {
	OW: ['selfDirectionThought', 'selfDirectionAction', 'stimulation', 'hedonism'],
	SE: ['achievement', 'powerDominance', 'powerResources', 'face'],
	BW: [
		'securityPersonal',
		'securitySocietal',
		'tradition',
		'conformityRules',
		'conformityInterpersonal',
		'humility',
	],
	ST: [
		'benevolenceDependability',
		'benevolenceCaring',
		'universalismConcern',
		'universalismNature',
		'universalismTolerance',
		'universalismObjectivity',
	],
};

const GEGENPOL = {OW: 'BW', BW: 'OW', SE: 'ST', ST: 'SE'};

const SCHWELLE_HOCH = 0.35;
const SCHWELLE_NIEDRIG = -0.35;

function areaZScore(bereich, profile) {
	const keys = BEREICH_WERTE[bereich];
	const summe = keys.reduce((acc, k) => acc + (profile[k]?.z ?? 0), 0);
	return summe / keys.length;
}

function chooseRandomly(arr) {
	if (!arr || arr.length === 0) return null;
	return arr[Math.floor(Math.random() * arr.length)];
}

function chooseTexts(toneKey) {
	const block = BEREICH_TEXTE[toneKey];
	if (!block) return null;
	return {
		pm: chooseRandomly(block.pm),
		ideal: chooseRandomly(block.ideale),
		bindung: chooseRandomly(block.bindungen),
		makel: chooseRandomly(block.makel),
	};
}

function toneKeyFor(bereich, z) {
	if (z >= SCHWELLE_HOCH) return bereich + '_hoch';
	if (z <= SCHWELLE_NIEDRIG) return bereich + '_niedrig';
	return null;
}

/**
 * Waehlt einen Archetyp-Namen für den Primaerbereich.
 * @param {string} bereich
 * @param {boolean} istDominant  - true wenn z >= 1.0 (stark), false wenn moderat
 * @returns {string}
 */
function chooseArchetypeName(bereich, istDominant) {
	const gruppe = ARCHETYP_NAMEN[bereich];
	if (!gruppe) return '';
	const pool = istDominant ? gruppe.stark : gruppe.moderat;
	return chooseRandomly(pool) ?? '';
}

// ─────────────────────────────────────────────────────────────────────────────
// HAUPTFUNKTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Leitet einen Bereichs-Archetypen aus einem Werteprofil ab.
 *
 * Algorithmus:
 *   1. Berechne Bereichs-z-Scores für alle 4 Bereiche.
 *   2. Bestimme Primaerbereich = Bereich mit hoechstem z-Score (wenn >= SCHWELLE_HOCH).
 *   3. Bestimme Sekundaerbereich = zweithoechster Bereich (wenn >= SCHWELLE_HOCH),
 *      aber nur wenn er kein Gegenpol zum Primaer ist.
 *   4. Bestimme Gegenpol = Antipol des Primaerbereichs (wenn <= SCHWELLE_NIEDRIG).
 *   5. Waehle Texte und Namen.
 *   6. Bestimme Spannungstext, wenn Primaer und Gegenpol beide aktiv sind.
 *
 * @param {Object} valueProfile - Ausgabe von computeValueProfile()
 * @returns {ArchetypErgebnis}
 */
function berechneBerreichsArchetyp(valueProfile) {
	// ── Schritt 1: Bereichs-z-Scores ─────────────────────────────────────────
	const scores = {};
	for (const b of ['OW', 'SE', 'BW', 'ST']) {
		scores[b] = areaZScore(b, valueProfile);
	}

	// Sortiert absteigend
	const bereiche_sortiert = Object.entries(scores)
		.sort((a, b) => b[1] - a[1])
		.map(([b]) => b);

	const [b1, b2, b3, b4] = bereiche_sortiert;

	// ── Schritt 2: Primaerbereich ─────────────────────────────────────────────
	const z_primaer = scores[b1];
	const z_sekundaer = scores[b2];
	const toneKey_p = toneKeyFor(b1, z_primaer);

	// Wenn selbst der hoechste Bereich nicht ueber der Schwelle liegt,
	// faellt die Person in eine "ausgeglichene" Kategorie ohne klaren Archetypen.
	if (!toneKey_p) {
		return {
			primaer: null,
			sekundaer: null,
			gegenpol: null,
			spannung: null,
			ausgeglichen: true,
			scores,
		};
	}

	const istDominant_p = z_primaer >= 1.0;
	const texte_p = chooseTexts(toneKey_p);
	const name_p = chooseArchetypeName(b1, istDominant_p);

	// ── Schritt 3: Sekundaerbereich ───────────────────────────────────────────
	// Sekundaer = zweithochster, der kein Gegenpol des Primaers ist und ueber Schwelle liegt
	const gegenpol_b1 = GEGENPOL[b1];
	const kandidaten = bereiche_sortiert.slice(1);
	const b2_kandidat = kandidaten.find((b) => b !== gegenpol_b1 && toneKeyFor(b, scores[b]));

	let sekundaer = null;
	if (b2_kandidat) {
		const z_s = scores[b2_kandidat];
		const toneKey_s = toneKeyFor(b2_kandidat, z_s);
		if (toneKey_s) {
			sekundaer = {
				bereich: b2_kandidat,
				z: Math.round(z_s * 100) / 100,
				toneKey: toneKey_s,
				...chooseTexts(toneKey_s),
			};
		}
	}

	// ── Schritt 4: Gegenpol ───────────────────────────────────────────────────
	// Gegenpol = Antipol des Primaers, nur wenn er wirklich niedrig ist
	const z_gp = scores[gegenpol_b1];
	const toneKey_gp = toneKeyFor(gegenpol_b1, z_gp);
	let gegenpol_obj = null;

	if (toneKey_gp && z_gp <= SCHWELLE_NIEDRIG) {
		gegenpol_obj = {
			bereich: gegenpol_b1,
			z: Math.round(z_gp * 100) / 100,
			toneKey: toneKey_gp,
			...chooseTexts(toneKey_gp),
		};
	}

	// ── Schritt 5: Spannungstext ──────────────────────────────────────────────
	let spannung = null;
	if (gegenpol_obj) {
		// Schlüssel: immer OW_BW oder SE_ST (nicht BW_OW oder ST_SE)
		const sp_key = [b1, gegenpol_b1].sort().join('_').includes('OW') ? 'OW_BW' : 'SE_ST';
		const sp_text = chooseRandomly(SPANNUNGS_TEXTE[sp_key]);
		if (sp_text) spannung = {text: sp_text};
	}

	// ── Schritt 6: Ergebnis zusammenstellen ──────────────────────────────────
	return {
		ausgeglichen: false,
		scores: {
			OW: Math.round(scores.OW * 100) / 100,
			SE: Math.round(scores.SE * 100) / 100,
			BW: Math.round(scores.BW * 100) / 100,
			ST: Math.round(scores.ST * 100) / 100,
		},
		primaer: {
			bereich: b1,
			z: Math.round(z_primaer * 100) / 100,
			toneKey: toneKey_p,
			name: name_p,
			...texte_p,
		},
		sekundaer: {
						bereich: b2,
			z: Math.round(z_sekundaer * 100) / 100,
			toneKey: toneKey_p,
			name: name_p,
			...texte_p,
		},
		gegenpol: gegenpol_obj,
		spannung,
	};
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDERING-HILFSFUNKTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Gibt das Archetyp-Ergebnis als HTML-String zurueck.
 * Kann direkt in output.innerHTML eingefuegt werden.
 *
 * @param {Object}  ergebnis  - Ausgabe von berechneBerreichsArchetyp()
 * @param {boolean} showScores - ob Bereichs-z-Scores angezeigt werden sollen
 * @returns {string}
 */
function renderBereichsArchetyp(ergebnis, showScores = false) {
	if (!ergebnis) return '';

	const bereichLabel = {
		OW: 'Offenheit für Wandel',
		SE: 'Selbsterhöhung',
		BW: 'Bewahrung',
		ST: 'Selbsttranszendenz',
	};


	if (ergebnis.ausgeglichen) {
		return `<hr>
		<h3>Werte-Archetyp</h3>
		<p>Diese Person zeigt kein klar dominantes Wertemuster. Ihr Werteprofil ist ausgeglichen
		über alle Bereiche verteilt.</p>`;
	}

	let html = `<h3>Werte-Archetyp</h3>`;

	// Optionale Scores-Uebersicht
	if (showScores) {
		const s = ergebnis.scores;
		html += `<p class="archetyp-scores">
			<small>Bereichs-Profile: OW ${s.OW > 0 ? '+' : ''}${s.OW} &nbsp;|&nbsp;
			SE ${s.SE > 0 ? '+' : ''}${s.SE} &nbsp;|&nbsp;
			BW ${s.BW > 0 ? '+' : ''}${s.BW} &nbsp;|&nbsp;
			ST ${s.ST > 0 ? '+' : ''}${s.ST}</small></p>`;
	}

	// ── Primaerbereich ──────────────────────────────────────────────────────
	const p = ergebnis.primaer;
	const s = ergebnis.sekundaer;
	html += `
	<div class="card mb-4">
		<h4 class="card-header">${p.name}</h4>
		<div class="card-body">
		<h5>Primärer Bereich</h5>
		<p class="text-secondary">${bereichLabel[p.bereich]}</p>
		<h6>Persönlichkeitsmerkmal</h6> 
		<p class="text-secondary">${p.pm}</p>
		<h6>Ideal</h6> 
		<p class="text-secondary">${p.ideal}</p>
		<h6>Bindung</h6> 
		<p class="text-secondary">${p.bindung}</p>
		<h6>Makel</h6> 
		<p class="text-secondary">${p.makel}</p>
		<br>
		<h5>Sekundärer Bereich</h5>
		<p class="text-secondary">${bereichLabel[s.bereich]}</p>
		<h6>Persönlichkeitsmerkmal</h6> 
		<p class="text-secondary">${s.pm}</p>
		<h6>Ideal</h6> 
		<p class="text-secondary">${s.ideal}</p>
		<h6>Bindung</h6> 
		<p class="text-secondary">${s.bindung}</p>
		<h6>Makel</h6> 
		<p class="text-secondary">${s.makel}</p>
	</div>
	`;

	return html;
}
