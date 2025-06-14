// function setFacetLevel(archetype, domain) {
// 	let facet = {
// 		H1: null,
// 		H2: null,
// 		H3: null,
// 		H4: null,
// 		E1: null,
// 		E2: null,
// 		E3: null,
// 		E4: null,
// 		X1: null,
// 		X2: null,
// 		X3: null,
// 		X4: null,
// 		A1: null,
// 		A2: null,
// 		A3: null,
// 		A4: null,
// 		C1: null,
// 		C2: null,
// 		C3: null,
// 		C4: null,
// 		O1: null,
// 		O2: null,
// 		O3: null,
// 		O4: null,
// 		Alt1: null,
// 	};
// 	//Überprüfe, welche Domäne high und welche low ist
// 	//Überprüfe, welche Facette pro Domäne für den Archetypen am irrelevantesten ist (leastH, leastE, leastX ...)
// 	//Entscheide, ob alle vier Facetten entsprechend der Domäne gleich sein soll (bspw. H high dann H1, H2, H3 und H4 high) oder die least Facette des Archetypen entgegensätzlich der Domäne ist (bspw. H ist high und archetype hat H1 als least wäre H1 low, H2 high, H3 high, H4 high)
// 	//Setze die Facetten entsprechend der vorherigen Entscheidung
// 	//Gib facet aus
// 	console.log('Facetten: ', facet);
// 	return facet;
// }

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
