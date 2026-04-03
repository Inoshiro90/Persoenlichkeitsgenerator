const showDegreesCheckbox = document.getElementById('showDegrees');

function getFacetAdjective(facet) {
	const facetAdjective = {};

	resetUsedDomainDegrees();

	for (let key in facet) {
		const trait = facetArray.find((f) => f.name === key);
		if (trait) {
			facetAdjective[key] = facet[key] === 'high' ? trait.adjectiveHigh : trait.adjectiveLow;
		}
	}

	return facetAdjective;
}
