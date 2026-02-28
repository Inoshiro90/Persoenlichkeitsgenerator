// =====================
// GLOBALE VARIABLEN
// =====================
let lastArchetype = null;
let lastFacet = null;
let lastAdjectives = null;
let lastDescriptions = null;
let lastItems = null;
let lastBestValues = null;
let lastWorstValues = null;
let lastArchetypeInfo = null;
let lastDegree = null;

// =====================
// GENERATE PERSONALITY
// =====================
document.getElementById('btn-generate-personality').addEventListener('click', () => {
	const archetype = chooseArchetype(); // extern definiert
	const archetypeInfo = getArchetypeInfo(archetype);
	const domain = setDomainLevel(archetype); // extern definiert
	const facet = setFacetLevel(archetype, domain);
	lastBestValues = selectTopThreeMoralValues(facet);
	lastWorstValues = selectWorstThreeMoralValues(facet);
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
	'showBestValues',
	'showWorstValues',
	'numberValues',
].forEach((id) => {
	document.getElementById(id).addEventListener('change', () => {
		if (!lastFacet) return;
		lastAdjectives = getFacetAdjective(lastFacet);
		/* wenn die Checkbox geändert wird, müssen wir die Top‑3 erneut berechnen */
		lastBestValues = selectTopThreeMoralValues(lastFacet);
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
			<h5>Aliases:</h5>
			<p>${Object.entries(lastArchetypeInfo.aliases)
				.map(([k, v]) => `${v}`)
				.join(', ')}</p>`;
		}
		if (document.getElementById('showArchetypeDescription').checked) {
			output.innerHTML += `
			<h5>Beschreibung:</h5>
			<p>${archetypeInfo.description}</p>
			`;
		}
		if (document.getElementById('showArchetypeCoreIdentity').checked) {
			output.innerHTML += `
			<h5>Kernidentität:</h5>	
			<p>${archetypeInfo.core_identity}</p>`;
		}
		if (document.getElementById('showArchetypePerception').checked) {
			output.innerHTML += `
			<h5>Wahrnehmung:</h5>	
			<p>${archetypeInfo.perception}</p>`;
		}
		if (document.getElementById('showArchetypeLifePlot').checked) {
			output.innerHTML += `
			<h5>Lebensmuster:</h5>	
			<p>${archetypeInfo.life_plot}</p>`;
		}
		if (document.getElementById('showArchetypeFulfillingActivities').checked) {
			output.innerHTML += `
			<h5>Erfüllende Tätigkeiten:</h5>	
			<p>${archetypeInfo.fulfilling_activities}</p>`;
		}
		if (document.getElementById('showArchetypeHappinessSource').checked) {
			output.innerHTML += `
			<h5>Glücksquellen:</h5>	
			<p>${archetypeInfo.happiness_source}</p>`;
		}
		if (document.getElementById('showArchetypeLeadershipStyle').checked) {
			output.innerHTML += `
			<h5>Führungsstil:</h5>	
			<p>${archetypeInfo.leadership_style}</p>`;
		}
		if (document.getElementById('showArchetypeHowOthersSeeThem').checked) {
			output.innerHTML += `
			<h5>Fremdwahrnehmung:</h5>	
			<p>${archetypeInfo.how_others_see_them}</p>`;
		}
		if (document.getElementById('showArchetypeShadowTendencies').checked) {
			output.innerHTML += `
			<h5>Schattenseiten:</h5>	
			<p>${archetypeInfo.shadow_tendencies}</p>`;
		}
		if (document.getElementById('showArchetypeUnderlyingFear').checked) {
			output.innerHTML += `
			<h5>Tiefe Ängste:</h5>	
			<p>${archetypeInfo.underlying_fear}</p>`;
		}
		if (document.getElementById('showArchetypeGrowthAreas').checked) {
			output.innerHTML += `
			<h5>Wachstumsfelder:</h5>	
			<ul>${Object.entries(lastArchetypeInfo.growth_areas)
				.map(([k, v]) => `<li>${v}</li>`)
				.join('')}</ul>`;
		}
		output.innerHTML += `<hr>`;
	}

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
		{
			if (document.getElementById('showBestValues').checked && lastBestValues) {
				const html = lastBestValues
					.map((key) => {
						const info = getMoralValueInfo(key);
						if (!info) return `<li>Kein Mapping für "${key}"</li>`;

						// Basis‑HTML: Titel + Beschreibung
						let block = `
        				<div class="value">
         				<h5>${info.title}</h5>
						<p><b>Dichotomie:</b> ${info.basic_dichotomy || ''}</p>
						<p><b>Ausrichtung:</b> ${info.social_vs_personal || ''}</p>
						<p><b>Höhere Wert-Ordnung:</b> ${info.higher_order_value || ''}</p>
						<p><b>Zitat:</b> "${info.quote || ''}"</p>
          				<p><b>Beschreibung:</b> ${info.description || ''}</p>
      					`;

						// Falls es Items gibt, diese in einer Liste ausgeben
						const items = [];
						if (Array.isArray(info.items)) {
							items.push(...info.items);
						} else {
							for (let i = 1; ; i++) {
								// item1, item2, …
								const it = info[`item${i}`];
								if (!it) break;
								items.push(it);
							}
						}

						if (items.length) {
							block += `<p><strong>Aspekte</strong></p><ul>`;
							block += items.map((it) => `<li>${it}.</li>`).join('');
							block += `</ul>`;
						}

						block += `</div>`;
						return block;
					})
					.join('');

				output.innerHTML += `
	<hr>
    <h4> Höchste Werte</h4>
    ${html}
  `;
			}
		}
		{
			if (document.getElementById('showWorstValues').checked && lastWorstValues) {
				const html = lastWorstValues
					.map((key) => {
						const info = getMoralValueInfo(key);
						if (!info) return `<li>Kein Mapping für "${key}"</li>`;

						// Basis‑HTML: Titel + Beschreibung
						let block = `
        				<div class="value">
         				<h5>${info.title}</h5>
						<p><b>Dichotomie:</b> ${info.basic_dichotomy || ''}</p>
						<p><b>Ausrichtung:</b> ${info.social_vs_personal || ''}</p>
						<p><b>Höhere Wert-Ordnung:</b> ${info.higher_order_value || ''}</p>
						<p><b>Zitat:</b> "${info.quote || ''}"</p>
          				<p><b>Beschreibung:</b> ${info.description || ''}</p>
      					`;

						// Falls es Items gibt, diese in einer Liste ausgeben
						const items = [];
						if (Array.isArray(info.items)) {
							items.push(...info.items);
						} else {
							for (let i = 1; ; i++) {
								// item1, item2, …
								const it = info[`item${i}`];
								if (!it) break;
								items.push(it);
							}
						}

						if (items.length) {
							block += `<p><strong>Aspekte</strong></p><ul>`;
							block += items.map((it) => `<li>${it}.</li>`).join('');
							block += `</ul>`;
						}

						block += `</div>`;
						return block;
					})
					.join('');

				output.innerHTML += `
	<hr>
    <h4> Niedrigste Werte</h4>
    ${html}
  `;
			}
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
