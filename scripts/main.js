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
	{
		{
			// nur weiter wenn etwas vorhanden ist
			if (!lastAdjectives || !lastDescriptions || !lastItems) return;
		}
	}

	if (lastArchetype === 'none') {
		if (document.getElementById('showArchetype').checked) {
			output.innerHTML += `
			<h3>Archetyp</h3>
			<h4>${archetypeInfo.name}</h4> `;
		}
		if (document.getElementById('showArchetypeDescription').checked) {
			output.innerHTML += `
			<h5>Beschreibung:</h5>
			<p>${archetypeInfo.description}</p>`;
		}
		output.innerHTML += `<hr>`;
	} else {
		if (document.getElementById('showArchetype').checked) {
			output.innerHTML += `
			<h3>Archetyp</h3>
			<h4>${archetypeInfo.name}</h4>`;
		}
		if (document.getElementById('showArchetypeAliases').checked) {
			output.innerHTML += `
			<h5>Aliases</h5>
			<p>${Object.entries(lastArchetypeInfo.aliases)
				.map(([k, v]) => `${v}`)
				.join(', ')}</p>`;
		}
		if (document.getElementById('showArchetypeDescription').checked) {
			output.innerHTML += `
			<h5>Beschreibung</h5>
			<p>${archetypeInfo.description}</p>
			`;
		}
		if (document.getElementById('showArchetypeCoreIdentity').checked) {
			output.innerHTML += `
			<h5>Kernidentität</h5>	
			<p>${archetypeInfo.core_identity}</p>`;
		}
		if (document.getElementById('showArchetypePerception').checked) {
			output.innerHTML += `
			<h5>Wahrnehmung</h5>	
			<p>${archetypeInfo.perception}</p>`;
		}
		if (document.getElementById('showArchetypeLifePlot').checked) {
			output.innerHTML += `
			<h5>Lebensmuster</h5>	
			<p>${archetypeInfo.life_plot}</p>`;
		}
		if (document.getElementById('showArchetypeFulfillingActivities').checked) {
			output.innerHTML += `
			<h5>Erfüllende Tätigkeiten</h5>	
			<p>${archetypeInfo.fulfilling_activities}</p>`;
		}
		if (document.getElementById('showArchetypeHappinessSource').checked) {
			output.innerHTML += `
			<h5>Glücksquellen</h5>	
			<p>${archetypeInfo.happiness_source}</p>`;
		}
		if (document.getElementById('showArchetypeLeadershipStyle').checked) {
			output.innerHTML += `
			<h5>Führungsstil</h5>	
			<p>${archetypeInfo.leadership_style}</p>`;
		}
		if (document.getElementById('showArchetypeHowOthersSeeThem').checked) {
			output.innerHTML += `
			<h5>Fremdwahrnehmung</h5>	
			<p>${archetypeInfo.how_others_see_them}</p>`;
		}
		if (document.getElementById('showArchetypeShadowTendencies').checked) {
			output.innerHTML += `
			<h5>Schattenseiten</h5>	
			<p>${archetypeInfo.shadow_tendencies}</p>`;
		}
		if (document.getElementById('showArchetypeUnderlyingFear').checked) {
			output.innerHTML += `
			<h5>Tiefe Ängste</h5>	
			<p>${archetypeInfo.underlying_fear}</p>`;
		}
		if (document.getElementById('showArchetypeGrowthAreas').checked) {
			output.innerHTML += `
			<h5>Wachstumsfelder</h5>	
			<ul>${Object.entries(lastArchetypeInfo.growth_areas)
				.map(([k, v]) => `<li>${v}</li>`)
				.join('')}</ul>`;
		}
		output.innerHTML += `<hr>`;
	}
	output.innerHTML += `<h3>HEXACO</h3>`;
	if (document.getElementById('showAdjectives').checked) {
		const adjList = Object.values(lastAdjectives);

		// Gruppierung in Blöcke von 4 Einträgen
		const groupSize = 4;
		const groups = [];
		for (let i = 0; i < adjList.length; i += groupSize) {
			groups.push(adjList.slice(i, i + groupSize));
		}

		output.innerHTML += `<h4>Adjektive</h4>`;

		// Liste der Hexaco-Domänen in Reihenfolge
		const hexacoDomains = [
			'Ehrlichkeit-Bescheidenheit',
			'Emotionalität',
			'Extraversion',
			'Verträglichkeit',
			'Gewissenhaftigkeit',
			'Offenheit für Erfahrungen',
			'Altruismus',
		];

		groups.forEach((group, index) => {
			// if (index > 0) {
			// 	output.innerHTML += '<br>';
			// }

			// Füge die zugehörige Domain als <h5> ein
			if (hexacoDomains[index]) {
				output.innerHTML += `<h5>${hexacoDomains[index]}</h5>`;
				// Füge die Liste der Adjektive in einem <p>-Tag mit <ul> ein
				output.innerHTML += `
				<p>
					<ul>
						${group.map((adj) => `<li>${adj}</li>`).join('')}
					</ul>
				</p>
			`;
			}
		});
	}
	if (document.getElementById('showDescriptions').checked) {
		const entries = Object.entries(lastDescriptions);
		output.innerHTML += `<hr>`;
		// Gruppierung in Blöcke von 4 Einträgen
		const groupSize = 4;
		const groups = [];
		for (let i = 0; i < entries.length; i += groupSize) {
			groups.push(entries.slice(i, i + groupSize));
		}

		output.innerHTML += `<h4>Beschreibung</h4>`;

		// Liste der Hexaco-Domänen in Reihenfolge
		const hexacoDomains = [
			'Ehrlichkeit-Bescheidenheit',
			'Emotionalität',
			'Extraversion',
			'Verträglichkeit',
			'Gewissenhaftigkeit',
			'Offenheit für Erfahrungen',
			'Altruismus',
		];

		groups.forEach((group, index) => {
			// if (index > 0) {
			// 	output.innerHTML += '<br>';
			// }

			// Füge die zugehörige Domain als <h5> ein
			if (hexacoDomains[index]) {
				output.innerHTML += `<h5>${hexacoDomains[index]}</h5>`;
				// Füge die Liste der Beschreibungen in einem <p>-Tag mit <ul> ein
				output.innerHTML += `
				<p>
					<ul>
						${group.map(([k, v]) => `<li>${v}</li>`).join('')}
					</ul>
				</p>
			`;
			}
		});
	}

	if (document.getElementById('showItems').checked) {
		const entries = Object.entries(lastItems);
		output.innerHTML += `<hr>`;
		// Gruppierung in Blöcke von 4 Einträgen
		const groupSize = 4;
		const groups = [];
		for (let i = 0; i < entries.length; i += groupSize) {
			groups.push(entries.slice(i, i + groupSize));
		}

		output.innerHTML += `<h4>Items</h4>`;

		// Liste der Hexaco-Domänen in Reihenfolge
		const hexacoDomains = [
			'Ehrlichkeit-Bescheidenheit',
			'Emotionalität',
			'Extraversion',
			'Verträglichkeit',
			'Gewissenhaftigkeit',
			'Offenheit für Erfahrungen',
			'Altruismus',
		];

		groups.forEach((group, index) => {
			// if (index > 0) {
			// 	output.innerHTML += '<br>';
			// }
			// Füge die zugehörige Domain als <h5> ein
			if (hexacoDomains[index]) {
				output.innerHTML += `<h5>${hexacoDomains[index]}</h5>`;
				// Füge die Liste der Beschreibungen in einem <p>-Tag mit <ul> ein
				output.innerHTML += `
				<p>
					<ul>
						${group.map(([k, v]) => `<li>${v}</li>`).join('')}
					</ul>
				</p>
			`;
			}
		});
	}

	{
		const checkbox = document.getElementById('showWertArchetyp');
		if (checkbox && checkbox.checked && lastArchetypErgebnis) {
			output.innerHTML += renderBereichsArchetyp(lastArchetypErgebnis);
		}
	}

	{
		const checkbox = document.getElementById('showWertKombination');
		if (checkbox && checkbox.checked && lastKombinationsErgebnis) {
			output.innerHTML += renderSingleValueCombination(lastKombinationsErgebnis);
		}
	}

	output.innerHTML += `<hr><h3>Werte</h3>`;
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
			},
			{
				stufe: 'MODERAT_POSITIV',
				checkboxId: 'showModeratePositive',
				label: 'Eher positive Werte',
			},
			{stufe: 'NEUTRAL', checkboxId: 'showNeutral', label: 'Neutrale Werte'},
			{
				stufe: 'MODERAT_NEGATIV',
				checkboxId: 'showModerateNegative',
				label: 'Eher negative Werte',
			},
			{
				stufe: 'STARK_NEGATIV',
				checkboxId: 'showStrongNegative',
				label: 'Stark negative Werte',
			},
		];

		// Gruppiere Werte nach Stufe, absteigend nach z-Score sortiert
		const gruppen = {};
		for (const {stufe} of stufenConfig) gruppen[stufe] = [];
		for (const key of valueOrder) {
			const entry = lastValueProfile[key];
			if (entry) gruppen[entry.stufe].push({key, ...entry});
		}
		for (const {stufe} of stufenConfig) {
			gruppen[stufe].sort((a, b) => b.z - a.z);
		}

		// Hilfsfunktion: rendere einen einzelnen Wert im alten Format
		function renderValueBlock(key) {
			const info = getMoralValueInfo(key);
			if (!info) return `<p>Kein Mapping für "${key}"</p>`;

			let block = `
				<div class="value border p-2 mb-2">
					<h5>${info.title}</h5>
					<h6>Dichotomie</h6> 
					<p>${info.basic_dichotomy || ''}</p>
					<h6>Ausrichtung</h6> 
					<p>${info.social_vs_personal || ''}</p>
					<h6>Höhere Wert-Ordnung</h6> 
					<p>${info.higher_order_value || ''}</p>
					<h6>Zitat:</h6> 
					<p>"${info.quote || ''}"</p>
					<h6>Beschreibung</h6> 
					<p>${info.description || ''}</p>`;

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
				block += `<h6>Aspekte</h6><ul>`;
				block += items.map((it) => `<li>${it}.</li>`).join('');
				block += `</ul>`;
			}
			block += `</div>`;
			return block;
		}

		// Jede Stufe separat rendern, nur wenn Checkbox aktiv und Werte vorhanden
		for (const {stufe, checkboxId, label} of stufenConfig) {
			const checkbox = document.getElementById(checkboxId);
			if (!checkbox || !checkbox.checked) continue;
			const werte = gruppen[stufe];
			if (werte.length === 0) continue;

			const html = werte.map(({key}) => renderValueBlock(key)).join('');
			output.innerHTML += `<h4>${label}</h4>${html}`;
		}
	}
}
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
