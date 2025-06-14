// document.getElementById("btn-generate-personality").addEventListener("click", function () {
// 	const archetype = chooseArchetype();
// 	const domain = setDomainLevel(archetype);
// 	const facet = setFacetLevel(archetype, domain);
// 	const descriptions = getFacetDescription(facet);
// 	const items = getFacetItem(facet);
// 	const adjectives = getFacetAdjective(facet);

// 	const output = document.getElementById("output");
// 	output.innerHTML = `
// 		<h4>Adjektive</h4>
// 		<p>${Object.values(adjectives).join(", ")}</p>
// 		<h4>Beschreibung</h4>
// 		<ul>${Object.entries(descriptions).map(([k, v]) => `<li><b>${k}</b>: ${v}</li>`).join("")}</ul>
// 		<h4>Items</h4>
// 		<ul>${Object.entries(items).map(([k, v]) => `<li><b>${k}</b>: ${v}</li>`).join("")}</ul>
// 	`;
// });

let lastAdjectives = null;
let lastDescriptions = null;
let lastItems = null;

document.getElementById("btn-generate-personality").addEventListener("click", function () {
	const archetype = chooseArchetype();
	const domain = setDomainLevel(archetype);
	const facet = setFacetLevel(archetype, domain);

	lastDescriptions = getFacetDescription(facet);
	lastItems = getFacetItem(facet);
	lastAdjectives = getFacetAdjective(facet);

	updateOutput();
});

// document.getElementById("btn-generate-personality").addEventListener("click", function () {
// 	const archetype = chooseArchetype();
// 	const domain = setDomainLevel(archetype);
// 	const facet = setFacetLevel(archetype, domain);
// 	const descriptions = getFacetDescription(facet);
// 	const items = getFacetItem(facet);
// 	const adjectives = getFacetAdjective(facet);

// 	// Neue Funktion: Anzeigeoptionen auslesen
// 	const displayOptions = {
// 		adjectives: document.getElementById("showAdjectives").checked,
// 		descriptions: document.getElementById("showDescriptions").checked,
// 		items: document.getElementById("showItems").checked
// 	};

// 	const output = document.getElementById("output");
// 	output.innerHTML = "";

// 	// Adjektive anzeigen (wenn Checkbox aktiviert)
// 	if (displayOptions.adjectives) {
// 		output.innerHTML += `
// 			<h4>Adjektive</h4>
// 			<p>${Object.values(adjectives).join(", ")}</p>
// 		`;
// 	}

// 	// Beschreibungen anzeigen (wenn Checkbox aktiviert)
// 	if (displayOptions.descriptions) {
// 		output.innerHTML += `
// 			<h4>Beschreibung</h4>
// 			<ul>${Object.entries(descriptions)
// 				.map(([k, v]) => `<li><b>${k}</b>: ${v}</li>`)
// 				.join("")}</ul>
// 		`;
// 	}

// 	// Items anzeigen (wenn Checkbox aktiviert)
// 	if (displayOptions.items) {
// 		output.innerHTML += `
// 			<h4>Items</h4>
// 			<ul>${Object.entries(items)
// 				.map(([k, v]) => `<li><b>${k}</b>: ${v}</li>`)
// 				.join("")}</ul>
// 		`;
// 	}
// });

// function updateOutput() {
// 	const output = document.getElementById("output");
// 	output.innerHTML = "";

// 	if (!lastAdjectives || !lastDescriptions || !lastItems) return;

// 	if (document.getElementById("showAdjectives").checked) {
// 		output.innerHTML += `
// 			<h4>Adjektive</h4>
// 			<p>${Object.values(lastAdjectives).join(", ")}</p>
// 		`;
// 	}
// 	if (document.getElementById("showDescriptions").checked) {
// 		output.innerHTML += `
// 			<h4>Beschreibung</h4>
// 			<ul>${Object.entries(lastDescriptions)
// 				.map(([k, v]) => `<li><b>${k}</b>: ${v}</li>`)
// 				.join("")}</ul>
// 		`;
// 	}
// 	if (document.getElementById("showItems").checked) {
// 		output.innerHTML += `
// 			<h4>Items</h4>
// 			<ul>${Object.entries(lastItems)
// 				.map(([k, v]) => `<li><b>${k}</b>: ${v}</li>`)
// 				.join("")}</ul>
// 		`;
// 	}
// }

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

["showAdjectives", "showDescriptions", "showItems"].forEach(id => {
	document.getElementById(id).addEventListener("change", updateOutput);
});