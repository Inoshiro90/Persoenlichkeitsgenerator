// =====================
// GLOBALE VARIABLEN
// =====================
let lastArchetype = null;
let lastFacet = null;
let lastAdjectives = null;
let lastDescriptions = null;
let lastItems = null;
let lastBestValues = null;
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
	'showDegrees',
	'showAdjectives',
	'showDescriptions',
	'showItems',
	'showBestValues',
	'valueAdjustment',
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
	if (document.getElementById('showArchetype').checked) {
		output.innerHTML += `
			<h4>Archetyp</h4>
			<p><b>${archetypeInfo.name}</b></p>
			<p>${archetypeInfo.description}</p>		`;
	}

	if (document.getElementById('showAdjectives').checked) {
		output.innerHTML += `
			<h4>Adjektive</h4>
			<p>${Object.values(lastAdjectives).join(', ')}</p>
		`;
	}
	if (document.getElementById('showDescriptions').checked) {
		output.innerHTML += `
			<h4>Beschreibung</h4>
			<ul>${Object.entries(lastDescriptions)
				.map(([k, v]) => `<li>${v}</li>`)
				.join('')}</ul>
		`;
	}
	if (document.getElementById('showItems').checked) {
		output.innerHTML += `
			<h4>Items</h4>
			<ul>${Object.entries(lastItems)
				.map(([k, v]) => `<li>${v}</li>`)
				.join('')}</ul>
		`;
	}
	{
		{
			// 			if (document.getElementById('showBestValues').checked && lastBestValues) {
			// 				output.innerHTML += `
			//       <h4>Top‑3 Moral Values</h4>
			//       <ul>${lastBestValues.map((v) => `<li>${v}</li>`).join('')}</ul>
			//     `;
			// 			}
			// 		}
			// 	}
			// }
			if (document.getElementById('showBestValues').checked && lastBestValues) {
				const html = lastBestValues
					.map((key) => {
						const info = getMoralValueInfo(key);

						// Fallback, falls kein Mapping gefunden wurde
						if (!info) return `<li>Kein Mapping für "${key}"</li>`;

						return `
                <p>
                    <strong>${info.title}</strong><br>
                    ${info.description}
                </p>`;
					})
					.join('');

				output.innerHTML += `
        <h4>Werte</h4>
        <div>${html}</div>
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
