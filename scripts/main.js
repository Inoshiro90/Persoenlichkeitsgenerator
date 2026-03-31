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
let lastValueProfile = null;
let lastArchetypErgebnis = null;
let lastKombinationsErgebnis = null;

// =====================
// GENERATE PERSONALITY
// =====================
document.getElementById('btn-generate-personality').addEventListener('click', () => {
	const archetype = chooseArchetype(); // extern definiert
	const archetypeInfo = getArchetypeInfo(archetype);
	const domain = setDomainLevel(archetype); // extern definiert
	const facet = setFacetLevel(archetype, domain);
	lastValueProfile = computeValueProfile(facet);
	lastArchetypErgebnis = berechneBerreichsArchetyp(lastValueProfile);
	lastKombinationsErgebnis = calculateSingeValueCombination(lastValueProfile);
	lastFacet = facet;
	lastDescriptions = getFacetDescription(facet);
	lastItems = getFacetItem(facet);
	lastAdjectives = getFacetAdjective(facet);
	lastArchetype = archetype;
	lastArchetypeInfo = archetypeInfo;
	// lastDegree = getFacetDegree(facet)

	updateOutput(lastArchetypeInfo);
});

[
	'showArchetype',
	'showArchetypeDescription',
	'showArchetypeAliases',
	'showArchetypeDescription',
	'showArchetypeCoreIdentity',
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
].forEach((id) => {
	document.getElementById(id).addEventListener('change', () => {
		if (!lastFacet) return;
		lastAdjectives = getFacetAdjective(lastFacet);
		lastValueProfile = computeValueProfile(lastFacet);
		lastArchetypErgebnis = berechneBerreichsArchetyp(lastValueProfile);
		lastKombinationsErgebnis = calculateSingeValueCombination(lastValueProfile);
		updateOutput(lastArchetypeInfo);
	});
});

// =====================
// UPDATE OUTPUT
// =====================
function updateOutput(archetypeInfo) {
	const output = document.getElementById('output');
	output.innerHTML = '';

	// Early return if data not available
	if (!lastAdjectives || !lastDescriptions || !lastItems) return;

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
	// SECTION: Archetype Information
	// ─────────────────────────────────────────────────
	if (lastArchetype !== 'none') {
		if (document.getElementById('showArchetype').checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h3>${archetypeInfo.name}</h3>
					</div>
				</div>
			`;
		}

		// Aliases
		if (document.getElementById('showArchetypeAliases').checked) {
			const aliases = Object.entries(lastArchetypeInfo.aliases)
				.map(([k, v]) => v)
				.join(', ');
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h4>Alias</h4>
						<p class="text-secondary">${aliases}</p>
					</div>
				</div>
			`;
		}

		// Description
		if (document.getElementById('showArchetypeDescription').checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h4>Beschreibung</h4>
						<p class="text-secondary">${archetypeInfo.description}</p>
					</div>
				</div>
			`;
		}

		// Core Identity
		if (document.getElementById('showArchetypeCoreIdentity').checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h4>Kernidentität</h4>
						<p class="text-secondary">${archetypeInfo.core_identity}</p>
					</div>
				</div>
			`;
		}

		// Perception
		if (document.getElementById('showArchetypePerception').checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h4>Wahrnehmung</h4>
						<p class="text-secondary">${archetypeInfo.perception}</p>
					</div>
				</div>
			`;
		}

		// Life Plot
		if (document.getElementById('showArchetypeLifePlot').checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h4>Lebensmuster</h4>
						<p class="text-secondary">${archetypeInfo.life_plot}</p>
					</div>
				</div>
			`;
		}

		// Fulfilling Activities
		if (document.getElementById('showArchetypeFulfillingActivities').checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h4>Erfüllende Tätigkeiten</h4>
						<p class="text-secondary">${archetypeInfo.fulfilling_activities}</p>
					</div>
				</div>
			`;
		}

		// Happiness Source
		if (document.getElementById('showArchetypeHappinessSource').checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h4>Glücksquellen</h4>
						<p class="text-secondary">${archetypeInfo.happiness_source}</p>
					</div>
				</div>
			`;
		}

		// Leadership Style
		if (document.getElementById('showArchetypeLeadershipStyle').checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h4>Führungsstil</h4>
						<p class="text-secondary">${archetypeInfo.leadership_style}</p>
					</div>
				</div>
			`;
		}

		// How Others See Them
		if (document.getElementById('showArchetypeHowOthersSeeThem').checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h4>Fremdwahrnehmung</h4>
						<p class="text-secondary">${archetypeInfo.how_others_see_them}</p>
					</div>
				</div>
			`;
		}

		// Shadow Tendencies
		if (document.getElementById('showArchetypeShadowTendencies').checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h4>Schattenseiten</h4>
						<p class="text-secondary">${archetypeInfo.shadow_tendencies}</p>
					</div>
				</div>
			`;
		}

		// Underlying Fear
		if (document.getElementById('showArchetypeUnderlyingFear').checked) {
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h4>Tiefe Ängste</h4>
						<p class="text-secondary">${archetypeInfo.underlying_fear}</p>
					</div>
				</div>
			`;
		}

		// Growth Areas
		if (document.getElementById('showArchetypeGrowthAreas').checked) {
			const growthAreas = Object.entries(lastArchetypeInfo.growth_areas)
				.map(([k, v]) => `<li>${v}</li>`)
				.join('');
			output.innerHTML += `
				<div class="card mb-4">
					<div class="card-body">
						<h4>Wachstumsfelder</h4>
						<ul class="text-secondary">${growthAreas}</ul>
					</div>
				</div>
			`;
		}
	}

	// ─────────────────────────────────────────────────
	// SECTION: HEXACO
	// ─────────────────────────────────────────────────
	output.innerHTML += `<h2 class="mt-6">HEXACO</h2>`;

	// Adjectives
	if (document.getElementById('showAdjectives').checked) {
		const adjList = Object.values(lastAdjectives);
		const groupSize = 4;
		const groups = [];
		for (let i = 0; i < adjList.length; i += groupSize) {
			groups.push(adjList.slice(i, i + groupSize));
		}

		output.innerHTML += `<h3 class="mt-4">Adjektive</h3>`;
		groups.forEach((group, index) => {
			if (hexacoDomains[index]) {
				const adjectives = group.map((adj) => `<li>${adj}</li>`).join('');
				output.innerHTML += `
					<div class="card mb-4">
						<h4 class="card-header">
							${hexacoDomains[index]}
						</h4>
						<div class="card-body">
							<ul class="text-secondary">${adjectives}</ul>
						</div>
					</div>
				`;
			}
		});
	}

	// Descriptions
	if (document.getElementById('showDescriptions').checked) {
		const entries = Object.entries(lastDescriptions);
		const groupSize = 4;
		const groups = [];
		for (let i = 0; i < entries.length; i += groupSize) {
			groups.push(entries.slice(i, i + groupSize));
		}

		output.innerHTML += `<h3 class="mt-4">Beschreibungen</h3>`;
		groups.forEach((group, index) => {
			if (hexacoDomains[index]) {
				const descriptions = group.map(([k, v]) => `<li>${v}</li>`).join('');
				output.innerHTML += `
					<div class="card mb-4">
						<h4 class="card-header">
							${hexacoDomains[index]}
						</h4>
						<div class="card-body">
							<ul class="text-secondary">${descriptions}</ul>
						</div>
					</div>
				`;
			}
		});
	}

	// Items
	if (document.getElementById('showItems').checked) {
		const entries = Object.entries(lastItems);
		const groupSize = 4;
		const groups = [];
		for (let i = 0; i < entries.length; i += groupSize) {
			groups.push(entries.slice(i, i + groupSize));
		}

		output.innerHTML += `<h3 class="mt-4">Items</h3>`;
		groups.forEach((group, index) => {
			if (hexacoDomains[index]) {
				const items = group.map(([k, v]) => `<li>${v}</li>`).join('');
				output.innerHTML += `
					<div class="card mb-4">
						<h4 class="card-header">
							${hexacoDomains[index]}
						</h4>
						<div class="card-body">
							<ul class="text-secondary">${items}</ul>
						</div>
					</div>
				`;
			}
		});
	}

	// ─────────────────────────────────────────────────
	// SECTION: Moral Values
	// ─────────────────────────────────────────────────
	output.innerHTML += `<h2 class="mt-6">Werte</h2>`;

	if (lastValueProfile) {
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
				label: 'Stark positive Werte',
				// badge: 'badge-success',
			},
			{
				stufe: 'MODERAT_POSITIV',
				checkboxId: 'showModeratePositive',
				label: 'Eher positive Werte',
				// badge: 'badge-info',
			},
			{
				stufe: 'NEUTRAL',
				checkboxId: 'showNeutral',
				label: 'Neutrale Werte',
				// badge: 'badge-neutral',
			},
			{
				stufe: 'MODERAT_NEGATIV',
				checkboxId: 'showModerateNegative',
				label: 'Eher negative Werte',
				// badge: 'badge-warning',
			},
			{
				stufe: 'STARK_NEGATIV',
				checkboxId: 'showStrongNegative',
				label: 'Stark negative Werte',
				// badge: 'badge-error',
			},
		];

		// Group values by level
		const gruppen = {};
		for (const {stufe} of stufenConfig) gruppen[stufe] = [];
		for (const key of valueOrder) {
			const entry = lastValueProfile[key];
			if (entry) gruppen[entry.stufe].push({key, ...entry});
		}
		for (const {stufe} of stufenConfig) {
			gruppen[stufe].sort((a, b) => b.z - a.z);
		}

		// Helper: Render single value block
		function renderValueBlock(key) {
			const info = getMoralValueInfo(key);
			if (!info) return `<p class="text-error">Kein Mapping für "${key}"</p>`;

			let block = `
				<div class="card mb-4">
				<h4 class= "mb-4 card-header">${info.title}</h4>
					<div class="card-body">
						
						
						<div class="mb-4">
							<h5 class="text-primary">Dichotomie</h5>
							<p class="text-secondary">${info.basic_dichotomy || ''}</p>
						</div>

						<div class="mb-4">
							<h5 class="text-primary">Ausrichtung</h5>
							<p class="text-secondary">${info.social_vs_personal || ''}</p>
						</div>

						<div class="mb-4">
							<h5 class="text-primary">Höhere Wert-Ordnung</h5>
							<p class="text-secondary">${info.higher_order_value || ''}</p>
						</div>

						<div class="mb-4">
							<h5 class="text-primary">Zitat</h5>
							<p class="text-secondary"><em>"${info.quote || ''}"</em></p>
						</div>

						<div class="mb-4">
							<h5 class="text-primary">Beschreibung</h5>
							<p class="text-secondary">${info.description || ''}</p>
						</div>`;

			const items = [];
			if (Array.isArray(info.items)) {
				items.push(...info.items);
			} else {
				for (let i = 1; ; i++) {
					const it = info[`item${i}`];
					if (!it) break;
					items.push(it);
				}
			}

			if (items.length) {
				block += `
					<div class="mb-4">
						<h5 class="text-primary">Aspekte</h5>
						<ul class="text-secondary">`;
				block += items.map((it) => `<li>${it}</li>`).join('');
				block += `
						</ul>
					</div>`;
			}

			block += `
					</div>
				</div>`;
			return block;
		}

		// Render each value level
		for (const {stufe, checkboxId, label} of stufenConfig) {
			const checkbox = document.getElementById(checkboxId);
			if (!checkbox || !checkbox.checked) continue;
			const werte = gruppen[stufe];
			if (werte.length === 0) continue;

			output.innerHTML += `
				<h3 class="mt-6">
					<span>${label}</span>
					<span class="text-muted"> (${werte.length})</span>
				</h3>
			`;

			const html = werte.map(({key}) => renderValueBlock(key)).join('');
			output.innerHTML += html;
		}
	}

	// Optional: Render value archetypes if implemented
	{
		const checkbox = document.getElementById('showWertArchetyp');
		if (checkbox && checkbox.checked && lastArchetypErgebnis) {
			output.innerHTML += renderBereichsArchetyp(lastArchetypErgebnis);
		}
	}

	// Optional: Render value combinations if implemented
	{
		const checkbox = document.getElementById('showWertKombination');
		if (checkbox && checkbox.checked && lastKombinationsErgebnis) {
			output.innerHTML += renderSingleValueCombination(lastKombinationsErgebnis);
		}
	}
}

(function () {
	const html = document.documentElement;
	const toggle = document.getElementById('themeToggle');
	if (!toggle) return;

	// Determine initial theme: localStorage > OS preference > light
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

	// Apply on load (before paint to avoid flash)
	applyTheme(getInitialTheme());

	toggle.addEventListener('click', () => {
		const current = html.getAttribute('data-theme');
		const next = current === 'dark' ? 'light' : 'dark';
		applyTheme(next);
		localStorage.setItem('ds-theme', next);
	});

	// Sync with OS preference changes
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		if (!localStorage.getItem('ds-theme')) {
			applyTheme(e.matches ? 'dark' : 'light');
		}
	});
})();
// =====================
// GENERATE PERSONALITY
// =====================
// document.getElementById('btn-generate-personality').addEventListener('click', () => {
// 	const archetype = chooseArchetype(); // extern definiert
// 	const domain = setDomainLevel(archetype); // extern definiert
// 	const facet = setFacetLevel(archetype, domain);

// 	/* → berechne und speichere die Top‑3 Moral Values */

// 	/* … weitere globale Variablen setzen … */
// 	lastFacet = facet;
// 	lastDescriptions = getFacetDescription(facet);
// 	lastItems = getFacetItem(facet);
// 	lastAdjectives = getFacetAdjective(facet);
// 	lastBestValues = selectTopThreeMoralValues(facet);

// 	updateOutput();
// });

// =====================
// DYNAMISCHES UMSCHALTEN DER CHECKBOXEN
// =====================
