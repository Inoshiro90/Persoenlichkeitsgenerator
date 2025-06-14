// function getFacetAdjective(facet) {
// 	let facetAdjective = {
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

// 	//Überprüfe, welche Facetten low und welche high sind
// 	//Suche die Facette und die adjective aus dem Array facetArray anhand von name heraus
// 	//Setze das Facettenadjektiv entsprechend
// 	//Gib facetAdjektive aus
// 	//Beispiel:
// 	// {
// 	// 		name: 'H1',
// 	// 		domain: 'H',
// 	// 		descriptionHigh: 'ist nicht bereit, andere zu manipulieren',
// 	// 		adjectiveHigh: 'aufrichtig',
// 	// 		itemHigh1: 'verwendet keine Schmeicheleien, um Vorteile zu erzielen',
// 	// 		itemHigh2: 'vermeidet es, Zuneigung vorzutäuschen, um sich Vorteile zu verschaffen',
// 	// 		itemHigh3: 'lehnt es ab, freundliches Verhalten aus taktischem Kalkül zu zeigen',
// 	// 		itemHigh4: 'verzichtet auf vorgetäuschte Zustimmung, um sich einen Vorteil zu sichern',
// 	// 		descriptionLow:
// 	// 			'wird anderen schmeicheln oder vorgeben, sie zu mögen, um sich Vorteile zu verschaffen',
// 	// 		adjectiveLow: 'manipulativ',
// 	// 		itemLow1:
// 	// 			'zeigt taktisch-freundliches Verhalten gegenüber Personen, die nicht geschätzt werden',
// 	// 		itemLow2: 'reagiert positiv auf humorlose Beiträge, um sich einen Vorteil zu verschaffen',
// 	// 		itemLow3: 'nutzt schmeichelndes Verhalten zur Erreichung von Zielen',
// 	// 		itemLow4: 'täuscht positive Gefühle vor, um Unterstützung zu erhalten',
// 	// 	}
// 	console.log('Facettenadjektiv: ', facetAdjective)
// 	return facetAdjective;
// }

function getFacetAdjective(facet) {
	const facetAdjective = {};

	for (let key in facet) {
		const trait = facetArray.find(f => f.name === key);
		if (trait) {
			facetAdjective[key] = facet[key] === "high" ? trait.adjectiveHigh : trait.adjectiveLow;
		}
	}

	console.log("Facettenadjektiv: ", facetAdjective);
	return facetAdjective;
}