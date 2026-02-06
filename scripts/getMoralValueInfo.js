function getMoralValueInfo(key) {
	// console.log('getMoralValueInfo called with key: ', key);
	const mapping = {
		// ---------- 1️⃣  Titel ----------
		selfDirection: {title: 'SELBSTBESTIMMUNG'},
		stimulation: {title: 'STIMULATION'},
		hedonism: {title: 'HEDONISMUS'},
		achievement: {title: 'LEISTUNG'},
		power: {title: 'MACHT'},
		security: {title: 'SICHERHEIT'},
		conformity: {title: 'KONFORMITÄT'},
		tradition: {title: 'TRADITION'},
		benevolence: {title: 'BENEVOLENZ'},
		universalism: {title: 'UNIVERSALISMUS'},

		// ---------- 2️⃣  Beschreibungen ----------
		selfDirection: {
			title: 'Selbstbestimmung',
			description:
				'Unabhängiges Denken und Handeln, schöpferisch Tätigsein, erforschen. (Kreativität, Freiheit, unabhängig, neugierig, eigene Ziele auswählen)',
		},
		stimulation: {
			title: 'Stimulation',
			description:
				'Aufregung, Neuheit und Herausforderungen im Leben. (wagemutig, ein abwechslungsreiches Leben, ein aufregendes Leben)',
		},
		hedonism: {
			title: 'Hedonismus',
			description:
				'Vergnügen und sinnliche Belohnungen für einen selbst. (Vergnügen, das Leben genießen)',
		},
		achievement: {
			title: 'Leistung',
			description:
				'Persönlicher Erfolg durch die Demonstration von Kompetenz bezüglich sozialer Standards. (erfolgreich, fähig, ehrgeizig, einflussreich)',
		},
		power: {
			title: 'Macht',
			description:
				'Sozialer Status und Prestige, Kontrolle oder Dominanz über Menschen und Ressourcen. (soziale Macht, Autorität, Reichtum, mein öffentliches Ansehen wahren)',
		},
		security: {
			title: 'Sicherheit',
			description:
				'Sicherheit, Harmonie und Stabilität der Gesellschaft, von Beziehungen und des Selbst. (familiäre Sicherheit, nationale Sicherheit, soziale Ordnung, sauber, niemandem etwas schuldig bleiben)',
		},
		conformity: {
			title: 'Konformität',
			description:
				'Beschränkung von Handlungen, Inklinationen und Impulsen, die andere beleidigen oder verletzten könnten oder gegen soziale Erwartungen und Normen verstoßen. (Höflichkeit, Gehorsam, Selbstdisziplin, ehrerbietig gegenüber Eltern und älteren Menschen)',
		},
		tradition: {
			title: 'Tradition',
			description:
				'Respekt vor, Verbundenheit mit und Akzeptanz von Gebräuchen und Ideen, die traditionelle Kulturen und Religionen für ihre Mitglieder entwickelt haben. (fromm, meine Stellung im Leben akzeptieren, demütig, Achtung vor der Tradition, gemäßigt)',
		},
		benevolence: {
			title: 'Benevolenz',
			description:
				'Bewahrung und Erhöhung des Wohlergehens der Menschen, zu denen man häufigen Kontakt hat. (hilfsbereit, ehrlich, vergebend, treu, verantwortungsbewusst)',
		},
		universalism: {
			title: 'Universalismus',
			description:
				'Verständnis, Wertschätzung, Toleranz und Schutz des Wohlergehens aller Menschen und der Natur. (tolerant, Weisheit, soziale Gerechtigkeit, Gleichheit, eine Welt in Frieden, eine Welt voll Schönheit, Einheit mit der Natur, die Umwelt schützen)',
		},
	};

	// console.log('Mapping: ', mapping);
	return mapping[key] || null;
}
