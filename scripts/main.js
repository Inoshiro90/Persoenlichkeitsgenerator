// =====================
// GLOBALE VARIABLEN
// =====================
let lastFacet = null;
let lastAdjectives = null;
let lastDescriptions = null;
let lastItems = null;

// =====================
// UPDATE OUTPUT
// =====================
function updateOutput() {
	const output = document.getElementById("output");
	output.innerHTML = "";

	if (!lastAdjectives || !lastDescriptions || !lastItems) return;

	if (document.getElementById("showAdjectives").checked) {
		output.innerHTML += `
			<h4>Adjektive</h4>
			<p>${Object.values(lastAdjectives).join(", ")}</p>
		`;
	}
	if (document.getElementById("showDescriptions").checked) {
		output.innerHTML += `
			<h4>Beschreibung</h4>
			<ul>${Object.entries(lastDescriptions)
				.map(([k, v]) => `<li>${v}</li>`)
				.join("")}</ul>
		`;
	}
	if (document.getElementById("showItems").checked) {
		output.innerHTML += `
			<h4>Items</h4>
			<ul>${Object.entries(lastItems)
				.map(([k, v]) => `<li>${v}</li>`)
				.join("")}</ul>
		`;
	}
}

// =====================
// GENERATE PERSONALITY
// =====================
document.getElementById("btn-generate-personality").addEventListener("click", function () {
	const archetype = chooseArchetype(); // Funktion muss extern definiert sein
	const domain = setDomainLevel(archetype); // Funktion muss extern definiert sein
	const facet = setFacetLevel(archetype, domain); // Funktion muss extern definiert sein

	lastFacet = facet;
	lastDescriptions = getFacetDescription(facet); // extern
	lastItems = getFacetItem(facet); // extern
	lastAdjectives = getFacetAdjective(facet);

	updateOutput();
});

// =====================
// DYNAMISCHES UMSCHALTEN DER CHECKBOXEN
// =====================
["showAdjectives", "showDescriptions", "showItems", "showDegrees"].forEach(id => {
	document.getElementById(id).addEventListener("change", () => {
		if (lastFacet) {
			lastAdjectives = getFacetAdjective(lastFacet);
			updateOutput();
		}
	});
});
