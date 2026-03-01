const KREIS_POSITION = {
	selfDirectionThought: 1,
	selfDirectionAction: 2,
	stimulation: 3,
	hedonism: 4,
	achievement: 5,
	powerDominance: 6,
	powerResources: 7,
	face: 8,
	securityPersonal: 9,
	securitySocietal: 10,
	tradition: 11,
	conformityRules: 12,
	conformityInterpersonal: 13,
	humility: 14,
	benevolenceDependability: 15,
	benevolenceCaring: 16,
	universalismConcern: 17,
	universalismNature: 18,
	universalismTolerance: 19,
	universalismObjectivity: 20,
};

const WERT_BEREICH = {
	selfDirectionThought: 'OW',
	selfDirectionAction: 'OW',
	stimulation: 'OW',
	hedonism: 'OW',
	achievement: 'SE',
	powerDominance: 'SE',
	powerResources: 'SE',
	face: 'SE',
	securityPersonal: 'BW',
	securitySocietal: 'BW',
	tradition: 'BW',
	conformityRules: 'BW',
	conformityInterpersonal: 'BW',
	humility: 'BW',
	benevolenceDependability: 'ST',
	benevolenceCaring: 'ST',
	universalismConcern: 'ST',
	universalismNature: 'ST',
	universalismTolerance: 'ST',
	universalismObjectivity: 'ST',
};

const BEREICH_LABEL = {
	OW: 'Offenheit f\u00fcr Wandel',
	SE: 'Selbsterh\u00f6hung',
	BW: 'Bewahrung',
	ST: 'Selbsttranszendenz',
};


const KOHAERENZ_SCHWELLEN = [
	{key: 'sehrKoharent', label: 'Sehr koh\u00e4rent', maxAbstand: 2},
	{key: 'koharent', label: 'Koh\u00e4rent', maxAbstand: 4},
	{key: 'gemischt', label: 'Gemischt', maxAbstand: 6},
	{key: 'spannungsreich', label: 'Spannungsreich', maxAbstand: 8},
	{key: 'konfliktgeladen', label: 'Konfliktgeladen', maxAbstand: 20},
];

const EWK_VALUE_KEYS =
	typeof VALUE_KEYS !== 'undefined'
		? VALUE_KEYS
		: [
				'selfDirectionThought',
				'selfDirectionAction',
				'stimulation',
				'hedonism',
				'achievement',
				'powerDominance',
				'powerResources',
				'face',
				'securityPersonal',
				'securitySocietal',
				'tradition',
				'conformityRules',
				'conformityInterpersonal',
				'humility',
				'benevolenceDependability',
				'benevolenceCaring',
				'universalismConcern',
				'universalismNature',
				'universalismTolerance',
				'universalismObjectivity',
			];

function circleDistance(keyA, keyB) {
	const a = KREIS_POSITION[keyA];
	const b = KREIS_POSITION[keyB];
	if (a === undefined || b === undefined) return 0;
	const d = Math.abs(a - b);
	return Math.min(d, 20 - d);
}

function coherenceLevel(maxAbstand) {
	for (const stufe of KOHAERENZ_SCHWELLEN) {
		if (maxAbstand <= stufe.maxAbstand) return stufe;
	}
	return KOHAERENZ_SCHWELLEN[KOHAERENZ_SCHWELLEN.length - 1];
}

function chooseRandomly(arr) {
	if (!arr || arr.length === 0) return '';
	return arr[Math.floor(Math.random() * arr.length)];
}

function loadValueTexts(key) {
	const normKey = key === 'powerResources' ? 'powerResources' : key;
	const block = EINZELWERT_TEXTE[normKey];
	if (!block) return null;
	return {
		pm: chooseRandomly(block.pm),
		ideal: chooseRandomly(block.ideale),
		bindung: chooseRandomly(block.bindungen),
		makel: chooseRandomly(block.makel),
	};
}

function calculateSingeValueCombination(valueProfile, anzahl = 3) {
	if (!valueProfile) return null;


	const sortiert = EWK_VALUE_KEYS.map((key) => ({key, z: valueProfile[key]?.z ?? 0})).sort(
		(a, b) => b.z - a.z,
	);

	const topN = sortiert.slice(0, anzahl);


	const positiveAnzahl = topN.filter((w) => w.z > 0).length;


	let maxAbstand = 0;
	for (let i = 0; i < topN.length; i++) {
		for (let j = i + 1; j < topN.length; j++) {
			const d = circleDistance(topN[i].key, topN[j].key);
			if (d > maxAbstand) maxAbstand = d;
		}
	}


	const stufe = coherenceLevel(maxAbstand);


	const kohaerenzTexte = KOHAERENZ_TEXTE[stufe.key];
	const kohaerenzText = chooseRandomly(kohaerenzTexte) ?? '';

	const eintraege = topN.map(({key, z}) => {
		const info = typeof getMoralValueInfo !== 'undefined' ? getMoralValueInfo(key) : null;
		const texte = loadValueTexts(key);
		return {
			key,
			z: Math.round(z * 100) / 100,
			rank: topN.indexOf(topN.find((w) => w.key === key)) + 1,
			title: info?.title ?? key,
			bereich: WERT_BEREICH[key] ?? '?',
			pm: texte?.pm ?? '',
			ideal: texte?.ideal ?? '',
			bindung: texte?.bindung ?? '',
			makel: texte?.makel ?? '',
		};
	});


	const bereicheImTrio = [...new Set(topN.map((w) => WERT_BEREICH[w.key] ?? ''))];
	const bereichsBeteiligung = bereicheImTrio.map((b) => BEREICH_LABEL[b] ?? b).join(' + ');


	const paarAbstaende = [];
	for (let i = 0; i < topN.length; i++) {
		for (let j = i + 1; j < topN.length; j++) {
			paarAbstaende.push({
				a: eintraege[i].title,
				b: eintraege[j].title,
				abstand: circleDistance(topN[i].key, topN[j].key),
			});
		}
	}

	return {
		topWerte: topN.map((w, i) => ({...w, rank: i + 1})),
		maxAbstand,
		kohaerenz: stufe.key,
		kohaerenzLabel: stufe.label,
		kohaerenzText,
		eintraege,
		bereichsBeteiligung,
		paarAbstaende,
		positiveAnzahl,
	};
}

function renderSingleValueCombination(ergebnis, showDetails = false) {
	if (!ergebnis) return '';

	const kohaerenzKlassen = {
		sehrKoharent: 'ewk-sehr-koharent',
		koharent: 'ewk-koharent',
		gemischt: 'ewk-gemischt',
		spannungsreich: 'ewk-spannungsreich',
		konfliktgeladen: 'ewk-konfliktgeladen',
	};
	const kClass = kohaerenzKlassen[ergebnis.kohaerenz] ?? '';

	let html = `<hr><h4>Werte-Kombination</h4>`;

	html += `
	<div class="ewk-meta">
		<span class="ewk-kohaerenz-badge ${kClass}">${ergebnis.kohaerenzLabel}</span>
		<span class="ewk-bereiche">${ergebnis.bereichsBeteiligung}</span>
	</div>
	<p class="ewk-kohaerenz-text">${ergebnis.kohaerenzText}</p>`;

	if (showDetails && ergebnis.paarAbstaende.length) {
		const paare = ergebnis.paarAbstaende
			.map((p) => `${p.a} / ${p.b}: Abstand ${p.abstand}`)
			.join(' &nbsp;|&nbsp; ');
		html += `<p class="ewk-details"><small>${paare}</small></p>`;
	}

	// Einzelwert-Bloecke
	for (const eintrag of ergebnis.eintraege) {
		html += `
	<div class="ewk-wert-block">
		<h5>${eintrag.rank}. ${eintrag.title}</h5>
		<h6>Persönlichkeitsmerkmal:</h6> 
		<p>${eintrag.pm}</p>
		<h6>Ideal</h6> 
		<p>${eintrag.ideal}</p>
		<h6>Bindung</h6> 
		<p>${eintrag.bindung}</p>
		<h6>Makel</h6> 
		<p>${eintrag.makel}</p>
	</div>
`;
	}

	return html;
}
