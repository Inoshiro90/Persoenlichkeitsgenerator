function setFacetLevel(archetype, domain) {
	const facet = {};
	const domains = {
		H: 'honestyHumility',
		E: 'emotionality',
		X: 'extraversion',
		A: 'agreeableness',
		C: 'conscientiousness',
		O: 'opennessToExperience',
	};

	for (let d in domains) {
		const level = domain[domains[d]];
		const leastFacet = domain[`least${d}`];

		// Entscheide zufällig: true = 3 gleich, 1 anders | false = alle gleich
		const useLeast = Math.random() < 0.5;

		for (let i = 1; i <= 4; i++) {
			const facetKey = `${d}${i}`;
			if (useLeast && facetKey === leastFacet) {
				// 3 gleich, 1 unterschiedlich
				facet[facetKey] = level === 'high' ? 'low' : 'high';
			} else {
				// alle gleich ODER restliche 3 bei 3+1-Regel
				facet[facetKey] = level;
			}
		}
	}

	// Altruismus direkt setzen (keine 4er-Gruppe)
	facet.Alt1 = domain.altruism;

	console.log('Facetten: ', facet);
	return facet;
}
