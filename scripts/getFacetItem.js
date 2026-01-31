function getFacetItem(facet) {
	const facetItem = {};

	for (let key in facet) {
		const trait = facetArray.find(f => f.name === key);
		if (trait) {
			const level = facet[key];
			const items = level === "high"
				? [trait.itemHigh1, trait.itemHigh2, trait.itemHigh3, trait.itemHigh4]
				: [trait.itemLow1, trait.itemLow2, trait.itemLow3, trait.itemLow4];
			const randomIndex = Math.floor(Math.random() * items.length);
			facetItem[key] = items[randomIndex];
		}
	}

	console.log("Facettenitem: ", facetItem);
	return facetItem;
}