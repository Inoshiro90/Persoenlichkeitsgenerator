function setDomainLevel(archetype) {
	let domain = {
		honestyHumility: null,
		emotionality: null,
		extraversion: null,
		agreeableness: null,
		conscientiousness: null,
		opennessToExperience: null,
		altruism: null,
		leastH: null,
		leastE: null,
		leastX: null,
		leastA: null,
		leastC: null,
		leastO: null,
	};

	if (archetype === 'none') {
		// zufällige Werte bei 'none'
		const levels = ['high', 'low'];
		const getRandom = () => levels[Math.floor(Math.random() * levels.length)];

		domain.honestyHumility = getRandom();
		domain.emotionality = getRandom();
		domain.extraversion = getRandom();
		domain.agreeableness = getRandom();
		domain.conscientiousness = getRandom();
		domain.opennessToExperience = getRandom();
		domain.altruism = getRandom();
	} else {
		const selected = archetypeArray.find((a) => a.id === archetype);
		if (selected) {
			domain.honestyHumility = selected.honestyHumility;
			domain.emotionality = selected.emotionality;
			domain.extraversion = selected.extraversion;
			domain.agreeableness = selected.agreeableness;
			domain.conscientiousness = selected.conscientiousness;
			domain.opennessToExperience = selected.opennessToExperience;
			domain.altruism = selected.altruism;

			domain.leastH = selected.leastH;
			domain.leastE = selected.leastE;
			domain.leastX = selected.leastX;
			domain.leastA = selected.leastA;
			domain.leastC = selected.leastC;
			domain.leastO = selected.leastO;
		}
	}

	console.log('Domänen: ', domain);
	return domain;
}
