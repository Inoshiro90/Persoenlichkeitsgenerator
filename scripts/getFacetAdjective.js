const showDegreesCheckbox = document.getElementById("showDegrees");

function getFacetAdjective(facet) {
	const facetAdjective = {};

	resetUsedDomainDegrees();

	for (let key in facet) {
		const trait = facetArray.find((f) => f.name === key);
		if (trait) {
			const degree = getFacetDegree(key);
			if (!degree) continue;

			facetAdjective[key] =
				facet[key] === 'high'
					? showDegreesCheckbox.checked
						? `${degree} ${trait.adjectiveHigh}`
						: trait.adjectiveHigh
					: showDegreesCheckbox.checked
						? `${degree} ${trait.adjectiveLow}`
						: trait.adjectiveLow;
		}
	}

	return facetAdjective;
}
