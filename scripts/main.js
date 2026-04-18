// =====================
// GLOBALE VARIABLEN
// =====================
let lastArchetype = null;
let lastFacet = null;
let lastAdjectives = null;
let lastDescriptions = null;
let lastItems = null;
let lastArchetypeInfo = null;
let lastDegree = null;
let lastValueProfile = null; // z-score profile (computeValueProfile) → bestehende Rendering-Funktionen
let lastHybridProfile = null; // probabilistisches Profil (generateValueProfile) → neues Rendering
let lastArchetypErgebnis = null;
let lastKombinationsErgebnis = null;

const VALUE_KEY_MAP = {
	// Universalismus
	universalismus_objektivitaet: 'universalismObjectivity',
	universalismus_fuersorge: 'universalismConcern',
	universalismus_toleranz: 'universalismTolerance',
	universalismus_natur: 'universalismNature',

	// Wohlwollen
	wohlwollen_fuersorge: 'benevolenceCaring',
	wohlwollen_verlaesslichkeit: 'benevolenceDependability',

	// Offenheit
	anregung: 'stimulation',
	genussstreben: 'hedonism',

	// Selbstbestimmung
	selbstbestimmung_denken: 'selfDirectionThought',
	selbstbestimmung_handeln: 'selfDirectionAction',

	// Macht / Erfolg
	erfolgsstreben: 'achievement',
	macht_dominanz: 'powerDominance',
	macht_ressourcen: 'powerResources',
	ansehen: 'face',

	// Sicherheit
	sicherheit_persoenlich: 'securityPersonal',
	sicherheit_gesellschaftlich: 'securitySocietal',

	// Konformität
	angepasstheit_hinsichtlich_regeln: 'conformityRules',
	angepasstheit_gegenüber_anderen: 'conformityInterpersonal',

	// Tradition
	tradition: 'tradition',
	bescheidenheit: 'humility',
};

// =====================
// GENERATE PERSONALITY
// =====================
document.getElementById('btn-generate-personality').addEventListener('click', () => {
	const archetype = chooseArchetype();
	const archetypeInfo = getArchetypeInfo(archetype);
	const domain = setDomainLevel(archetype);
	const facet = setFacetLevel(archetype, domain);

	// ── Altes System: z-Score-Profil für bestehende Rendering-Funktionen ──
	lastValueProfile = computeValueProfile(facet);
	lastArchetypErgebnis = berechneBerreichsArchetyp(lastValueProfile);
	lastKombinationsErgebnis = calculateSingeValueCombination(lastValueProfile);

	// ── NEUES SYSTEM: Probabilistisches Schwartz-Profil ───────────────────
	lastHybridProfile = generateValueProfile(facet, {varianceMode: 'normal'});

	lastFacet = facet;
	lastDescriptions = getFacetDescription(facet);
	lastItems = getFacetItem(facet);
	lastAdjectives = getFacetAdjective(facet);
	lastArchetype = archetype;
	lastArchetypeInfo = archetypeInfo;

	updateOutput(lastArchetypeInfo);
});

[
	'showArchetype',
	'showArchetypeDescription',
	'showArchetypeAliases',
	'showArchetypeDescription',
	'showArchetypeCoreIdentity',
	'showArchetypePerception',
	'showArchetypeLifePlot',
	'showArchetypeFulfillingActivities',
	'showArchetypeHappinessSource',
	'showArchetypeLeadershipStyle',
	'showArchetypeHowOthersSeeThem',
	'showArchetypeShadowTendencies',
	'showArchetypeUnderlyingFear',
	'showArchetypeGrowthAreas',
	'showDegrees',
	'showAdjectives',
	'showDescriptions',
	'showItems',
	'showStrongPositive',
	'showModeratePositive',
	'showNeutral',
	'showModerateNegative',
	'showStrongNegative',
	'showWertArchetyp',
	'showWertKombination',
	'showHybridProfil',
].forEach((id) => {
	const el = document.getElementById(id);
	if (!el) return;
	el.addEventListener('change', () => {
		if (!lastFacet) return;
		lastAdjectives = getFacetAdjective(lastFacet);
		lastValueProfile = computeValueProfile(lastFacet);
		lastArchetypErgebnis = berechneBerreichsArchetyp(lastValueProfile);
		lastKombinationsErgebnis = calculateSingeValueCombination(lastValueProfile);
		updateOutput(lastArchetypeInfo);
	});
});

// =====================
// PERSONALITY SUMMARY
// =====================
function generatePersonalitySummary() {
	if (!lastArchetypeInfo || !lastAdjectives || !lastDescriptions || !lastHybridProfile) return '';

	const HOG_LABELS = {
		offenheit_fuer_wandel: 'Offenheit für Wandel',
		selbsterhoehung: 'Selbsterhöhung',
		bewahrung: 'Bewahrung',
		selbsttranszendenz: 'Selbsttranszendenz',
	};

	// ── Archetype ──────────────────────────────────────────────────────────
	const archetypeName = lastArchetypeInfo.name || '';
	const coreIdFull = lastArchetypeInfo.core_identity || '';
	// Keep only the first sentence for brevity
	const coreIdShort = (coreIdFull.split(/(?<=[.!?])\s/)[0] || coreIdFull)
		.trim()
		.replace(/\.$/, '');

	const shadowFull = lastArchetypeInfo.shadow_tendencies || '';
	const shadowShort = (shadowFull.split(/(?<=[.!?])\s/)[0] || shadowFull)
		.trim()
		.replace(/\.$/, '');

	const strengthsFull = lastArchetypeInfo.how_others_see_them || '';
	const strengthsShort = (strengthsFull.split(/(?<=[.!?])\s/)[0] || strengthsFull)
		.trim()
		.replace(/\.$/, '');

	//── Matching HEXACO Adjectives & Descriptions ─────────────────────────────
	const domainAdj = {H: [], E: [], X: [], A: [], C: [], O: [], Alt: []};
	const domainDesc = {H: [], E: [], X: [], A: [], C: [], O: [], Alt: []};

	for (const [key, adj] of Object.entries(lastAdjectives)) {
		const d = key.startsWith('Alt') ? 'Alt' : key.charAt(0);
		if (domainAdj[d]) domainAdj[d].push({key, adj});
	}

	for (const [key, desc] of Object.entries(lastDescriptions)) {
		const d = key.startsWith('Alt') ? 'Alt' : key.charAt(0);
		if (domainDesc[d]) domainDesc[d].push({key, desc});
	}

	function pickMatching(domain) {
		const adjs = domainAdj[domain];
		const descs = domainDesc[domain];

		if (!adjs.length || !descs.length) return null;

		const random = adjs[Math.floor(Math.random() * adjs.length)];

		const match = descs.find((d) => d.key === random.key);

		return {
			adj: random.adj,
			desc: match?.desc,
		};
	}

	const picked = {
		H: pickMatching('H'),
		E: pickMatching('E'),
		X: pickMatching('X'),
		A: pickMatching('A'),
		C: pickMatching('C'),
		O: pickMatching('O'),
		// Alt: pickMatching('Alt'),
	};

	const traitAdjectives = Object.values(picked)
		.map((x) => x?.adj)
		.filter(Boolean);

	// const E = pickMatching('E');
	// const X = pickMatching('X');
	// const A = pickMatching('A');

	// Capitalise first letter helper
	const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
	const socialDesc = [picked.X, picked.A]
		.filter(Boolean)
		.map((x) => cap(x.desc))
		.join('<br>');

	const emotionalDesc = picked.E ? cap(picked.E.desc) : '';

	const hexacoLines = Object.entries(picked)
		.filter(([_, val]) => val && val.adj && val.desc)
		.map(([domain, val]) => {
			return `<strong>${val.adj.charAt(0).toUpperCase() + val.adj.slice(1)}: </strong>${cap(val.desc)}`;
		});

	// ── Schwartz top-3 + dominant HOG ──────────────────────────────────────
	const humanValues = (lastHybridProfile.top_schwartz_values || []).slice(0, 2);
	const dominantHOG = HOG_LABELS[lastHybridProfile.dominant_higher_order] || '';

	// ── Build HTML ──────────────────────────────────────────────────────────
	const row = (color, label, content) => `
		<p class="text-secondary">
			<div class="card-body">
				<h4 class="text-primary">${label}</h4>
				<p class="text-secondary">${content}</p>
			</div>
		</p>`;

	return `
		<div class="card mb-6";">
			<div class="card-header">
				<span style="font-size:1.1rem;"></span>
				<h3 class="card-title">Zusammenfassung</h3>
			</div>
			<div>
				${row(
					'var(--color-primary,#6366f1)',
					'Archetyp',
					`<strong>${archetypeName}:</strong> ${coreIdShort}.`,
				)}
				${row('var(--color-info,#3b82f6)', 'Dominante Persönlichkeitszüge', hexacoLines.join('<br>'))}
				${row(
					'var(--color-warning,#f59e0b)',
					'Zentrale Werte',
					humanValues.length
						? humanValues
								.map((key) => {
									const mappedKey = VALUE_KEY_MAP[key] || key;
									const info = getMoralValueInfo(mappedKey);

									if (!info) {
										console.warn(
											'Kein Mapping/Info für:',
											key,
											'→',
											mappedKey,
										);
									}
									const label =
										typeof LABEL_FULL !== 'undefined' && LABEL_FULL[key]
											? LABEL_FULL[key]
											: key;

									const quote = info?.quote || '—';
									console.log('RAW key:', key);
									console.log('Mapped key:', mappedKey);
									console.log('Info:', info);
									return `<strong>${label}:</strong> ${quote}`;
								})
								.join('<br>')
						: '',
				)}
				${row('var(--color-success,#22c55e)', 'Stärken', strengthsShort + '.')}
				${row('var(--color-error,#ef4444)', 'Schwächen', shadowShort + '.')}
			</div>
		</div>`;
}

// =====================
// UPDATE OUTPUT
// =====================
function updateOutput(archetypeInfo) {
	const output = document.getElementById('output');
	output.innerHTML = '';

	if (!lastAdjectives || !lastDescriptions || !lastItems) return;

	// ── Personality Summary (always shown at the top) ──────────────────────
	output.innerHTML += generatePersonalitySummary();

	const hexacoDomains = [
		'Ehrlichkeit-Bescheidenheit',
		'Emotionalität',
		'Extraversion',
		'Verträglichkeit',
		'Gewissenhaftigkeit',
		'Offenheit für Erfahrungen',
		'Altruismus',
	];

	// ─────────────────────────────────────────────────
	// SECTION: Archetyp
	// ─────────────────────────────────────────────────
	if (lastArchetype !== 'none') {
		output.innerHTML += `<h2 class="mt-6">Archetyp</h2>`;

		if (document.getElementById('showArchetype')?.checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-header"><h3>${archetypeInfo.name}</h3></div>
				</div>`;
		}

		if (document.getElementById('showArchetypeAliases')?.checked) {
			const aliases = Object.entries(lastArchetypeInfo.aliases)
				.map(([k, v]) => v)
				.join(', ');
			output.innerHTML += `
				<div class="card mb-4">
					<h4 class="card-header">Alias</h4>
					<div class="card-body"><p class="text-secondary">${aliases}</p></div>
				</div>`;
		}

		if (document.getElementById('showArchetypeDescription')?.checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<h4 class="card-header">Beschreibung</h4>
					<div class="card-body"><p class="text-secondary">${archetypeInfo.description}</p></div>
				</div>`;
		}

		if (document.getElementById('showArchetypeCoreIdentity')?.checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<h4 class="card-header">Kernidentität</h4>
					<div class="card-body"><p class="text-secondary">${archetypeInfo.core_identity}</p></div>
				</div>`;
		}

		if (document.getElementById('showArchetypePerception')?.checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<h4 class="card-header">Wahrnehmung</h4>
					<div class="card-body"><p class="text-secondary">${archetypeInfo.perception}</p></div>
				</div>`;
		}

		if (document.getElementById('showArchetypeLifePlot')?.checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<h4 class="card-header">Lebensmuster</h4>
					<div class="card-body"><p class="text-secondary">${archetypeInfo.life_plot}</p></div>
				</div>`;
		}

		if (document.getElementById('showArchetypeFulfillingActivities')?.checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<h4 class="card-header">Tätigkeiten</h4>
					<div class="card-body"><p class="text-secondary">${archetypeInfo.fulfilling_activities}</p></div>
				</div>`;
		}

		if (document.getElementById('showArchetypeHappinessSource')?.checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<h4 class="card-header">Glücksquellen</h4>
					<div class="card-body"><p class="text-secondary">${archetypeInfo.happiness_source}</p></div>
				</div>`;
		}

		if (document.getElementById('showArchetypeLeadershipStyle')?.checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<h4 class="card-header">Führungsstil</h4>
					<div class="card-body"><p class="text-secondary">${archetypeInfo.leadership_style}</p></div>
				</div>`;
		}

		if (document.getElementById('showArchetypeHowOthersSeeThem')?.checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<h4 class="card-header">Fremdwahrnehmung</h4>
					<div class="card-body"><p class="text-secondary">${archetypeInfo.how_others_see_them}</p></div>
				</div>`;
		}

		if (document.getElementById('showArchetypeShadowTendencies')?.checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<h4 class="card-header">Schattenseiten</h4>
					<div class="card-body"><p class="text-secondary">${archetypeInfo.shadow_tendencies}</p></div>
				</div>`;
		}

		if (document.getElementById('showArchetypeUnderlyingFear')?.checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<h4 class="card-header">Tiefe Ängste</h4>
					<div class="card-body"><p class="text-secondary">${archetypeInfo.underlying_fear}</p></div>
				</div>`;
		}

		if (document.getElementById('showArchetypeGrowthAreas')?.checked) {
			const growthAreas = Object.entries(lastArchetypeInfo.growth_areas)
				.map(([k, v]) => `<li>${v}</li>`)
				.join('');
			output.innerHTML += `
				<div class="card mb-4">
					<h4 class="card-header">Wachstumsfelder</h4>
					<div class="card-body"><ul class="text-secondary">${growthAreas}</ul></div>
				</div>`;
		}
	}

	// ─────────────────────────────────────────────────
	// SECTION: HEXACO
	// ─────────────────────────────────────────────────
	output.innerHTML += `<h2 class="mt-6">HEXACO</h2>`;

	if (document.getElementById('showAdjectives')?.checked) {
		const adjList = Object.values(lastAdjectives);
		const groups = [];
		for (let i = 0; i < adjList.length; i += 4) groups.push(adjList.slice(i, i + 4));
		output.innerHTML += `<h3 class="mt-4">Adjektive</h3>`;
		groups.forEach((group, index) => {
			if (hexacoDomains[index]) {
				const adjectives = group.map((adj) => `<li>${adj}</li>`).join('');
				output.innerHTML += `
					<div class="card mb-4">
						<h4 class="card-header">${hexacoDomains[index]}</h4>
						<div class="card-body"><ul class="text-secondary">${adjectives}</ul></div>
					</div>`;
			}
		});
	}

	if (document.getElementById('showDescriptions')?.checked) {
		output.innerHTML += `<h3 class="mt-4">Beschreibungen</h3>`;
		const domainGroups = {H: [], E: [], X: [], A: [], C: [], O: [], Alt: []};
		for (const [key, value] of Object.entries(lastDescriptions)) {
			const domain = key.startsWith('Alt') ? 'Alt' : key.charAt(0);
			if (domainGroups[domain]) domainGroups[domain].push({key, value});
		}
		Object.entries(domainGroups).forEach(([domain, items], idx) => {
			if (items.length) {
				const domainLabel =
					hexacoDomains[['H', 'E', 'X', 'A', 'C', 'O', 'Alt'].indexOf(domain)] || domain;
				const descList = items.map((item) => `<li>${item.value}</li>`).join('');
				output.innerHTML += `
					<div class="card mb-4">
						<h4 class="card-header">${domainLabel}</h4>
						<div class="card-body"><ul class="text-secondary">${descList}</ul></div>
					</div>`;
			}
		});
	}

	if (document.getElementById('showItems')?.checked) {
		output.innerHTML += `<h3 class="mt-4">Items</h3>`;
		const domainGroups = {H: [], E: [], X: [], A: [], C: [], O: [], Alt: []};
		for (const [key, value] of Object.entries(lastItems)) {
			const domain = key.startsWith('Alt') ? 'Alt' : key.charAt(0);
			if (domainGroups[domain]) domainGroups[domain].push({key, value});
		}
		Object.entries(domainGroups).forEach(([domain, items], idx) => {
			if (items.length) {
				const domainLabel =
					hexacoDomains[['H', 'E', 'X', 'A', 'C', 'O', 'Alt'].indexOf(domain)] || domain;
				const itemList = items.map((item) => `<li>${item.value}</li>`).join('');
				output.innerHTML += `
					<div class="card mb-4">
						<h4 class="card-header">${domainLabel}</h4>
						<div class="card-body"><ul class="text-secondary">${itemList}</ul></div>
					</div>`;
			}
		});
	}

	// ─────────────────────────────────────────────────
	// SECTION: Schwartz-Werte (z-Score-Stufen, altes System)
	// ─────────────────────────────────────────────────
	if (lastValueProfile) {
		output.innerHTML += `<h2 class="mt-6">Schwartz-Werte</h2>`;

		const valueOrder = [
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

		const stufenConfig = [
			{
				stufe: 'STARK_POSITIV',
				checkboxId: 'showStrongPositive',
				label: 'Extrem wichtige Werte',
			},
			{
				stufe: 'MODERAT_POSITIV',
				checkboxId: 'showModeratePositive',
				label: 'Sehr wichtige Werte',
			},
			{stufe: 'NEUTRAL', checkboxId: 'showNeutral', label: 'Mittelmäßig wichtige Werte'},
			{
				stufe: 'MODERAT_NEGATIV',
				checkboxId: 'showModerateNegative',
				label: 'Wenig wichtige Werte',
			},
			{
				stufe: 'STARK_NEGATIV',
				checkboxId: 'showStrongNegative',
				label: 'Überhaupt nicht wichtige Werte',
			},
		];

		const gruppen = {};
		for (const {stufe} of stufenConfig) gruppen[stufe] = [];
		for (const key of valueOrder) {
			const entry = lastValueProfile[key];
			if (entry) gruppen[entry.stufe].push({key, ...entry});
		}
		for (const {stufe} of stufenConfig) gruppen[stufe].sort((a, b) => b.z - a.z);

		function renderValueBlock(key) {
			const info = getMoralValueInfo(key);
			if (!info) return `<p class="text-error">Kein Mapping für "${key}"</p>`;
			let block = `
				<div class="card mb-4">
					<h4 class="card-header">${info.title}</h4>
					<div class="card-body">
						<div class="mb-4"><h5 class="text-primary">Dichotomie</h5><p class="text-secondary">${info.basic_dichotomy || ''}</p></div>
						<div class="mb-4"><h5 class="text-primary">Ausrichtung</h5><p class="text-secondary">${info.social_vs_personal || ''}</p></div>
						<div class="mb-4"><h5 class="text-primary">Höhere Wert-Ordnung</h5><p class="text-secondary">${info.higher_order_value || ''}</p></div>
						<div class="mb-4"><h5 class="text-primary">Zitat</h5><p class="text-secondary">"${info.quote || ''}"</p></div>
						<div class="mb-4"><h5 class="text-primary">Beschreibung</h5><p class="text-secondary">${info.description || ''}</p></div>`;
			const items = Array.isArray(info.items) ? info.items : [];
			if (items.length) {
				block += `<div class="mb-4"><h5 class="text-primary">Aspekte</h5><ul class="text-secondary">`;
				block += items.map((it) => `<li>${it}</li>`).join('');
				block += `</ul></div>`;
			}
			block += `</div></div>`;
			return block;
		}

		for (const {stufe, checkboxId, label} of stufenConfig) {
			const checkbox = document.getElementById(checkboxId);
			if (!checkbox?.checked) continue;
			const werte = gruppen[stufe];
			if (!werte.length) continue;
			output.innerHTML += `<h3 class="mt-6"><span>${label}</span> <span class="text-muted">(${werte.length})</span></h3>`;
			output.innerHTML += werte.map(({key}) => renderValueBlock(key)).join('');
		}
	}

	// ─────────────────────────────────────────────────
	// SECTION: Werte-Archetyp (z-Score-basiert)
	// ─────────────────────────────────────────────────
	if (document.getElementById('showWertArchetyp')?.checked && lastArchetypErgebnis) {
		output.innerHTML += renderBereichsArchetyp(lastArchetypErgebnis);
	}

	// ─────────────────────────────────────────────────
	// SECTION: Werte-Kombination (z-Score-basiert)
	// ─────────────────────────────────────────────────
	if (document.getElementById('showWertKombination')?.checked && lastKombinationsErgebnis) {
		output.innerHTML += renderSingleValueCombination(lastKombinationsErgebnis);
	}

	// ─────────────────────────────────────────────────
	// SECTION: Probabilistisches Schwartz-Werteprofil (NEU)
	// ─────────────────────────────────────────────────
	if (document.getElementById('showHybridProfil')?.checked && lastHybridProfile) {
		output.innerHTML += renderHybridProfile(lastHybridProfile);
	}
}

// =====================
// RENDER: Probabilistisches Profil (NEU)
// =====================
function renderHybridProfile(profile) {
	if (!profile) return '';

	const HOG_LABELS = {
		offenheit_fuer_wandel: 'Offenheit für Wandel',
		selbsterhoehung: 'Selbsterhöhung',
		bewahrung: 'Bewahrung',
		selbsttranszendenz: 'Selbsttranszendenz',
	};
	const HOG_COLORS = {
		offenheit_fuer_wandel: '#f0a840',
		selbsterhoehung: '#e05060',
		bewahrung: '#5888f0',
		selbsttranszendenz: '#40c090',
	};

	// Kohärenz-Badge
	const c = profile.coherence_score;
	let cLabel, cStyle;
	if (c > 0.8) {
		cLabel = 'Sehr kohärent';
		cStyle = 'background:var(--color-success,#22c55e);color:#fff';
	} else if (c > 0.65) {
		cLabel = 'Kohärent';
		cStyle = 'background:var(--color-success,#22c55e);color:#fff';
	} else if (c > 0.5) {
		cLabel = 'Gemischt';
		cStyle = 'background:var(--color-warning,#f59e0b);color:#fff';
	} else {
		cLabel = 'Spannungsreich';
		cStyle = 'background:var(--color-error,#ef4444);color:#fff';
	}

	// Top-Werte
	const topHtml = profile.top_schwartz_values
		.map((v, i) => {
			const label = typeof LABEL_FULL !== 'undefined' && LABEL_FULL[v] ? LABEL_FULL[v] : v;
			const score = (profile.schwartz_scores[v] || 0).toFixed(1);
			const hog = typeof VALUE_TO_HOG !== 'undefined' ? VALUE_TO_HOG[v] : null;
			const color = hog ? HOG_COLORS[hog] : 'var(--color-text-secondary)';
			return `
			<div class="card mb-2">
				<div class="card-body" style="display:flex;justify-content:space-between;align-items:center;gap:1rem;">
					<div>
						<span style="font-size:.75rem;font-weight:600;color:${color};text-transform:uppercase;letter-spacing:.04em;">${i + 1}</span>
						&nbsp;
						<strong>${label}</strong>
					</div>
					<span style="font-size:.85rem;color:var(--color-text-secondary,#888);flex-shrink:0;">${score} / 5</span>
				</div>
			</div>`;
		})
		.join('');

	// HOG-Scores
	const maxHog = Math.max(...Object.values(profile.higher_order_scores));
	const hogHtml = Object.entries(profile.higher_order_scores)
		.sort((a, b) => b[1] - a[1])
		.map(([hog, score]) => {
			const label = HOG_LABELS[hog] || hog;
			const isPrimary = hog === profile.dominant_higher_order;
			const color = HOG_COLORS[hog] || '#888';
			const pct = maxHog > 0 ? Math.round((score / maxHog) * 100) : 0;
			return `
				<div class="mb-3">
					<div style="display:flex;justify-content:space-between;margin-bottom:.25rem;">
						<span style="font-weight:${isPrimary ? 600 : 400};color:${isPrimary ? color : 'inherit'}">${label}</span>
						<span style="font-size:.85rem;color:var(--color-text-secondary,#888)">${score.toFixed(1)}</span>
					</div>
					<div style="height:6px;border-radius:3px;background:var(--color-border,#e5e7eb);overflow:hidden;">
						<div style="height:100%;width:${pct}%;background:${color};border-radius:3px;transition:width .4s ease;"></div>
					</div>
				</div>`;
		})
		.join('');

	// Sampling-Pfad
	const pathHtml = profile.sampling_path
		.map((s, i) => {
			const label =
				typeof LABEL_FULL !== 'undefined' && LABEL_FULL[s.value]
					? LABEL_FULL[s.value]
					: s.value;
			const isFirst = i === 0;
			return `<span style="display:inline-block;padding:.15rem .5rem;border-radius:999px;
			font-size:.75rem;background:var(--color-surface-2,#f3f4f6);margin:.1rem;"
			title="${isFirst ? 'Seed (Prior)' : `α=${s.weights?.α ?? '—'} β=${s.weights?.β ?? '—'} γ=${s.weights?.γ ?? '—'}`}"
		>${isFirst ? '⚑ ' : ''}${label}</span>`;
		})
		.join('<span style="color:var(--color-text-secondary);padding:0 .15rem;">→</span>');

	const mode = profile._meta?.varianceMode || '—';
	const retries = profile._meta?.retries ?? 0;

	return ``;
	// 	`
	// <h2 class="mt-6">Werteprofil
	// 	<small style="font-size:.65em;font-weight:400;opacity:.6;">(probabilistisch · Markov-Hybrid)</small>
	// </h2>

	// <div class="card mb-4">
	// 	<div class="card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;">
	// 		<h4 style="margin:0;">Dominante Werte</h4>
	// 		<div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;">
	// 			<span style="padding:.2rem .6rem;border-radius:999px;font-size:.75rem;${cStyle}">${cLabel} · ${c.toFixed(2)}</span>
	// 			<span style="padding:.2rem .6rem;border-radius:999px;font-size:.75rem;background:var(--color-surface-2,#f3f4f6);">Modus: ${mode}</span>
	// 			${retries > 0 ? `<span style="padding:.2rem .6rem;border-radius:999px;font-size:.75rem;background:var(--color-surface-2,#f3f4f6);">${retries}× Resample</span>` : ''}
	// 		</div>
	// 	</div>
	// 	<div class="card-body">${topHtml}</div>
	// </div>

	// <div class="card mb-4">
	// 	<h4 class="card-header">Higher-Order-Bereiche</h4>
	// 	<div class="card-body">${hogHtml}</div>
	// </div
	// `;
}

// =====================
// THEME TOGGLE
// =====================
(function () {
	const html = document.documentElement;
	const toggle = document.getElementById('themeToggle');
	if (!toggle) return;

	function getInitialTheme() {
		const saved = localStorage.getItem('ds-theme');
		if (saved === 'dark' || saved === 'light') return saved;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function applyTheme(theme) {
		html.setAttribute('data-theme', theme);
		toggle.setAttribute(
			'aria-label',
			theme === 'dark' ? 'Zu Light Mode wechseln' : 'Zu Dark Mode wechseln',
		);
		toggle.setAttribute('title', theme === 'dark' ? 'Light Mode' : 'Dark Mode');
	}

	applyTheme(getInitialTheme());

	toggle.addEventListener('click', () => {
		const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
		applyTheme(next);
		localStorage.setItem('ds-theme', next);
	});

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		if (!localStorage.getItem('ds-theme')) applyTheme(e.matches ? 'dark' : 'light');
	});
})();
