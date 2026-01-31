function getFacetDescription(facet) {
	const facetDescription = {};

	for (let key in facet) {
		const trait = facetArray.find(f => f.name === key);
		if (trait) {
			facetDescription[key] = facet[key] === "high" ? trait.descriptionHigh : trait.descriptionLow;
		}
	}

	console.log("Facettenbeschreibung: ", facetDescription);
	return facetDescription;
}