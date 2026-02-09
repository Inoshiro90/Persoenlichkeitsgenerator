function getMoralValueInfo(key) {
	const selectedWeight = document.getElementById('valueAdjustment');

	// 2. Den aktuell gewählten Wert auslesen (als Zahl)
	const weightValue = Number(selectedWeight.value); // 10 oder 25

	// console.log('getMoralValueInfo called with key: ', key);
	const mapping10 = {
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

	const mapping19 = {
		// ---------- 1️⃣  Titel ----------
		selfDirectionThought: {title: 'SELBSTBESTIMMUNG DENKEN'},
		selfDirectionAction: {title: 'SELBSTBESTIMMUNG HANDELN'},
		stimulation: {title: 'STIMULATION'},
		hedonism: {title: 'HEDONISMUS'},
		achievement: {title: 'LEISTUNG'},
		powerDominance: {title: 'MACHT ÜBER MENSCHEN'},
		powerRessources: {title: 'MACHT ÜBER RESSOURCEN'},
		face: {title: 'ANSEHEN'},
		securityPersonal: {title: 'SICHERHEIT FÜR '},
		securitySocietal: {title: 'SICHERHEIT DER GESELLSCHAFT'},
		conformityRules: {title: 'KONFORMITÄT GEGENÜBER REGELN'},
		conformityInterpersonal: {title: 'KONFORMITÄT GEGENÜBER PERSONEN'},
		tradition: {title: 'TRADITION'},
		humility: {title: 'DEMUT'},
		benevolenceCaring: {title: 'WOHLWOLLEN - FÜRSORGE'},
		benevolenceDependability: {title: 'WOHLWOLLEN - ZUVERLÄSSIGKEIT'},
		universalismConcern: {title: 'UNIVERSALISMUS - SORGE'},
		universalismNature: {title: 'UNIVERSALISMUS - NATUR'},
		unversalismTolerance: {title: 'UNIVERSALISMUS - TOLERANZ'},

		// ---------- 2️⃣  Beschreibungen ----------
		selfDirectionThought: {
			title: 'Selbstbestimmung – Denken',
			description: 'Freiheit, eigene Ideen und Fähigkeiten zu entwickeln.',
		},
		selfDirectionAction: {
			title: 'Selbstbestimmung – Handeln',
			description: 'Freiheit, eigene Handlungen zu bestimmen.',
		},
		stimulation: {
			title: 'Stimulation',
			description: 'Aufregung, Neuheit und Veränderung.',
		},
		hedonism: {
			title: 'Hedonismus',
			description: 'Vergnügen und sinnliche Befriedigung.',
		},
		achievement: {
			title: 'Leistung',
			description: 'Erfolg gemäß gesellschaftlichen Normen.',
		},
		powerDominance: {
			title: 'Macht – Dominanz',
			description: 'Macht durch Ausübung von Kontrolle über Menschen.',
		},
		powerRessources: {
			title: 'Macht – Ressourcen',
			description: 'Macht durch Kontrolle über materielle und soziale Ressourcen.',
		},
		face: {
			title: 'Ansehen',
			description:
				'Sicherheit und Macht durch die Aufrechterhaltung des eigenen öffentlichen Images und die Vermeidung von Demütigungen.',
		},
		securityPersonal: {
			title: 'Sicherheit – Persönlich',
			description: 'Sicherheit in der unmittelbaren Umgebung.',
		},
		securitySocietal: {
			title: 'Sicherheit – Gesellschaftlich',
			description: 'Sicherheit und Stabilität in der Gesellschaft insgesamt.',
		},
		conformityRules: {
			title: 'Konformität – Regeln',
			description: 'Einhaltung von Regeln, Gesetzen und formellen Verpflichtungen.',
		},
		conformityInterpersonal: {
			title: 'Konformität – Zwischenmenschlich',
			description: 'Vermeidung, andere Menschen zu verärgern oder zu verletzen.',
		},
		tradition: {
			title: 'Tradition',
			description:
				' Aufrechterhaltung und Bewahrung kultureller, familiärer oder religiöser Traditionen',
		},
		humility: {
			title: 'Demut',
			description: 'Anerkennung der eigenen Bedeutungslosigkeit im Gesamtzusammenhang.',
		},
		benevolenceCaring: {
			title: 'Wohlwollen – Fürsorge',
			description: 'Engagement für das Wohlergehen der Mitglieder der Ingroup.',
		},
		benevolenceDependability: {
			title: 'Wohlwollen – Zuverlässigkeit',
			description: 'Ein zuverlässiges und vertrauenswürdiges Mitglied der Ingroup sein.',
		},
		universalismConcern: {
			title: 'Universalismus – Sorge',
			description: 'Engagement für Gleichheit, Gerechtigkeit und Schutz für alle Menschen.',
		},
		universalismNature: {
			title: 'Universalismus – Natur',
			description: 'Erhaltung der natürlichen Umwelt.',
		},
		unversalismTolerance: {
			title: 'Universalismus – Toleranz',
			description:
				'Akzeptanz und Verständnis für diejenigen, die anders sind als man selbst.',
		},
	};

	// console.log('Mapping: ', mapping);

	if (weightValue === 19) {
		return mapping19[key] || null;
	} else {
		return mapping10[key] || null;
	}
}
