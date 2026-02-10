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
			title: 'Selbstbestimmtes Denken',
			description: 'Freiheit, eigene Ideen und Fähigkeiten zu entwickeln.',
			item1: 'sich eine unabhängige Meinung zu bilden.',
			item2: 'sich ein eigenes Bild zu machen.',
			item3: 'sich selbst einen Reim darauf zu machen.',
		},
		selfDirectionAction: {
			title: 'Selbstbestimmtes Handeln',
			description: 'Freiheit, eigene Handlungen zu bestimmen.',
			item1: 'eigene Entscheidungen über das eigene Leben zu treffen.',
			item2: 'eigene Aktivitäten selbstständig zu planen.',
			item3: 'frei entscheiden zu können, was man selbst tut.',
		},
		stimulation: {
			title: 'Anregung',
			description: 'Aufregung, Neuheit und Veränderung.',
			item1: 'immer nach neuen Herausforderungen zu suchen.',
			item2: 'Risiken einzugehen, die das Leben spannend machen.',
			item3: 'alle möglichen neuen Erfahrungen zu machen.',
		},
		hedonism: {
			title: 'Genussstreben',
			description: 'Vergnügen und sinnliche Befriedigung.',
			item1: 'eine gute Zeit zu haben.',
			item2: 'die Freuden des Lebens zu genießen.',
			item3: 'jede Gelegenheit zu nutzen, um Spaß zu haben.',
		},
		achievement: {
			title: 'Erfolgsstreben',
			description: 'Erfolg gemäß gesellschaftlichen Normen.',
			item1: 'Ambitionen im Leben zu haben.',
			item2: 'sehr erfolgreich zu sein.',
			item3: 'dass andere die eigenen Leistungen anerkennen.',
		},
		powerDominance: {
			title: 'Vormachtsstellung',
			description: 'Macht durch Ausübung von Kontrolle über Personen.',
			item1: 'dass die Personen tun, was man ihnen sagt. ',
			item2: 'die Macht zu haben, Personen dazu zu bringen, das zu tun, was man will.',
			item3: 'die Person zu sein, die anderen sagt, was sie tun sollen.',
		},
		powerRessources: {
			title: 'Ressourcenkontrolle',
			description: 'Macht durch Kontrolle über materielle und soziale Ressourcen.',
			item1: 'die Macht zu haben, die Geld mit sich bringt.',
			item2: 'reich zu sein.',
			item3: 'teure Dinge zu besitzen, die den eigenen Reichtum zeigen.',
		},
		face: {
			title: 'Ansehen',
			description:
				'Sicherheit und Macht durch die Aufrechterhaltung des eigenen öffentlichen Rufes und die Vermeidung von Demütigungen.',
			item1: 'dass man von niemandem jemals beschämt wird.',
			item2: 'das eigene öffentliche Ansehen zu schützen.',
			item3: 'niemals gedemütigt zu werden.',
		},
		securityPersonal: {
			title: 'Persönliche Sicherheit',
			description: 'Sicherheit in der unmittelbaren Umgebung.',
			item1: 'Krankheiten zu vermeiden und die eigene Gesundheit zu schützen.',
			item2: 'persönlich sicher und geschützt zu sein.',
			item3: 'alles Gefährliche zu vermeiden.',
		},
		securitySocietal: {
			title: 'Gesellschaftliche Sicherheit',
			description: 'Sicherheit und Stabilität in der Gesellschaft insgesamt.',
			item1: 'dass das eigene Land sicher und stabil ist.',
			item2: 'dass der Staat stark ist und seine Bürger verteidigen kann.',
			item3: 'dass das eigene Land sich gegen alle Bedrohungen schützt.',
		},
		conformityRules: {
			title: 'Angepasstheit hinsichtlich Regeln',
			description: 'Einhaltung von Regeln, Gesetzen und formellen Verpflichtungen.',
			item1: 'niemals gegen Regeln oder Vorschriften zu verstoßen',
			item2: 'Regeln auch dann zu befolgen, wenn niemand zusieht.',
			item3: 'alle Gesetze zu befolgen.',
		},
		conformityInterpersonal: {
			title: 'Angepasstheit gegenüber anderen',
			description: 'Vermeidung, andere Personen zu verärgern oder zu verletzen.',
			item1: 'andere Personen nicht zu verstimmen.',
			item2: 'niemals jemanden zu verärgern.',
			item3: 'niemals andere Personen wütend zu machen.',
		},
		tradition: {
			title: 'Tradition',
			description:
				'Aufrechterhaltung und Bewahrung kultureller, familiärer oder religiöser Traditionen',
			item1: 'traditionelle Werte und Denkweisen zu bewahren.',
			item2: 'den Bräuchen der eigenen Familie oder den Bräuchen einer Religion zu folgen.',
			item3: 'die traditionellen Praktiken der eigenen Kultur zu ehren.',
		},
		humility: {
			title: 'Bescheidenheit',
			description: 'Anerkennung der eigenen Bedeutungslosigkeit im Gesamtgefüge.',
			item1: 'niemals zu denken, dass man mehr verdient als andere Personen.',
			item2: 'bescheiden zu sein.',
			item3: 'mit dem zufrieden zu sein, was man hat, und nicht nach mehr zu verlangen.',
		},
		benevolenceCaring: {
			title: 'Fürsorge',
			description: 'Engagement für das Wohlergehen der Mitglieder der Ingroup.',
			item1: 'sich um Personen zu kümmern, die einem nahestehen.',
			item2: 'den Personen zu helfen, die einem am Herzen liegen.',
			item3: 'sich um alle Bedürfnisse der eigenen Lieben zu kümmern.',
		},
		benevolenceDependability: {
			title: 'Verlässlichkeit',
			description: 'Ein zuverlässiges und vertrauenswürdiges Mitglied der Ingroup sein.',
			item1: 'dass Personen, die man kennt, volles Vertrauen in einen haben.',
			item2: 'eine verlässliche und vertrauenswürdige Freundesperson zu sein.',
			item3: 'dass alle die eignen Freundespersonen und die eigene Familie sich voll und ganz auf einen verlassen können.',
		},
		universalismConcern: {
			title: 'Gesellschaftliche Belange',
			description: 'Engagement für Gleichheit, Gerechtigkeit und Schutz für alle Personen.',
			item1: 'dass die Schwachen und Schutzbedürftigen in der Gesellschaft geschützt werden.',
			item2: 'dass jede Person auf der Welt gleiche Chancen im Leben hat.',
			item3: 'dass jede Person gerecht behandelt wird, auch Personen, die man nicht kennt.',
		},
		universalismNature: {
			title: 'Schutz der Natur',
			description: 'Erhaltung der natürlichen Umwelt.',
			item1: 'sich um die Natur zu kümmern.',
			item2: 'ich an Aktivitäten zum Schutz der Natur zu beteiligen.',
			item3: 'die natürliche Umwelt vor Zerstörung oder Verschmutzung zu schützen.',
		},
		unversalismTolerance: {
			title: 'Anerkennung von Andersartigkeit',
			description:
				'Akzeptanz und Verständnis für diejenigen, die anders sind als man selbst.',
			item1: 'gegenüber allen Arten von Personen und Gruppen tolerant zu sein.',
			item2: 'Personen zuzuhören und zu verstehen, die anders sind als man selbst.',
			item3: 'auch wenn man mit ihnen nicht einer Meinung ist.',
		},
	};

	// console.log('Mapping: ', mapping);

	if (weightValue === 19) {
		return mapping19[key] || null;
	} else {
		return mapping10[key] || null;
	}
}
