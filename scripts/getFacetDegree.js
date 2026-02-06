// =====================
// DOMÄNEN-PARTIKEL
// =====================
const facetDegreeMap = {
	H: ['leicht', 'mäßig', 'stark', 'extrem'],
	E: ['leicht', 'mäßig', 'stark', 'extrem'],
	X: ['leicht', 'mäßig', 'stark', 'extrem'],
	A: ['leicht', 'mäßig', 'stark', 'extrem'],
	C: ['leicht', 'mäßig', 'stark', 'extrem'],
	O: ['leicht', 'mäßig', 'stark', 'extrem'],
	Alt: ['leicht', 'mäßig', 'stark', 'extrem'],
};

const facetDegreeMapOld = {
	H: ['ansatzweise', 'überwiegend', 'konsequent', 'durch und durch'],
	E: ['etwas', 'erkennbar', 'massiv', 'extrem'],
	X: ['subtil', 'betont', 'ausgeprägt', 'außergewöhnlich'],
	A: ['wenig', 'meistens', 'ausgesprochen', 'außerordentlich'],
	C: ['eher', 'moderat', 'deutlich', 'hochgradig'],
	O: ['geringfügig', 'merklich', 'stark', 'übermäßig'],
	Alt: ['bedingt', 'spürbar', 'auffällig', 'uneingeschränkt'],
};

// =====================
// HILFSFUNKTIONEN
// =====================
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

const usedDomainDegrees = {};

function resetUsedDomainDegrees() {
	for (let domain in facetDegreeMap) {
		usedDomainDegrees[domain] = shuffleArray([...facetDegreeMap[domain]]);
	}
}

// =====================
// FACET DEGREE
// =====================
function getFacetDegree(facetName) {
	const domainKey = facetName.startsWith('Alt') ? 'Alt' : facetName.charAt(0);

	if (!usedDomainDegrees[domainKey] || usedDomainDegrees[domainKey].length === 0) {
		console.warn('Keine verfügbaren Partikel mehr für Domäne:', domainKey);
		return '';
	}

	const degree = usedDomainDegrees[domainKey].shift();
	// console.log(`Facettengrad (${facetName}, Domäne ${domainKey}):`, degree);

	return degree;
}