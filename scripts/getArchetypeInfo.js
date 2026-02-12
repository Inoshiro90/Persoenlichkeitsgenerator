function getArchetypeInfo(archetype) {
	const archetypeMapping = {
		idealist: {
			name: 'Idealist',
			description:
				'Der Idealist ist von einem tiefen Vertrauen ins Leben geprägt, das ihm erlaubt, stets die positiven Seiten zu erkennen. Auch wenn er mit herausfordernden oder einschüchternden Situationen konfrontiert wird, bleibt er optimistisch und bemüht sich, seinen Überzeugungen sowie den Werten, die ihm wichtig sind, treu zu bleiben. Sein vertrauensvoller Charakter macht ihn offen dafür, Hilfe anzunehmen, sobald sie benötigt wird.',
			coreIdentity: {
				basicAttitude: '',
				keyMotivation: '',
				worldView: '',
				idealForm: '',
			},
			perception: {
				focus: '',
				periphery: '',
			},
			lifeNarrative: {
				origin: '',
				challenge: '',
				antagonist: '',
				maturation: '',
				idealResult: '',
			},
			fulfillingActivities: {
				typicalTasks: '',
				preferredEnvironment: '',
				energySource: '',
			},
			definitionOfLuck: {
				fulfillmentEmergence: '',
				meaningEmergence: '',
			},
			leadershipStyle: {
				strengths: '',
				decisionLogic: '',
				motivationalApproach: '',
			},
			externalPerception: {
				positiveAttributions: '',
				criticalAttributions: '',
			},
			dysfunction: {
				exaggerationOfStrength: '',
				typicalUndesirableDevelopments: '',
				blindSpot: '',
			},
			underlyingStructure: {
				primalFear: '',
				vulnerableSide: '',
				psychodynamicTension: '',
			},
			developmentPotential: {
				integration: '',
				oppositeVirtues: '',
				developmentLevers: '',
			},
		},
		realist: {
			name: 'Realist',
			description:
				'Der Realist zeichnet sich durch seine Praktikabilität aus und legt Wert darauf, nur das zu tun, was tatsächlich funktioniert und realistisch ist. Er schätzt eine gleichberechtigte Zusammenarbeit mit bodenständigen, vertrauenswürdigen Menschen. Um Enttäuschungen zu vermeiden, meidet er Träume oder Tätigkeiten, bei denen er das Gefühl hat, die Kontrolle über das Ergebnis nicht ausreichend zu besitzen.',
			coreIdentity: {
				basicAttitude: '',
				keyMotivation: '',
				worldView: '',
				idealForm: '',
			},
			perception: {
				focus: '',
				periphery: '',
			},
			lifeNarrative: {
				origin: '',
				challenge: '',
				antagonist: '',
				maturation: '',
				idealResult: '',
			},
			fulfillingActivities: {
				typicalTasks: '',
				preferredEnvironment: '',
				energySource: '',
			},
			definitionOfLuck: {
				fulfillmentEmergence: '',
				meaningEmergence: '',
			},
			leadershipStyle: {
				strengths: '',
				decisionLogic: '',
				motivationalApproach: '',
			},
			externalPerception: {
				positiveAttributions: '',
				criticalAttributions: '',
			},
			dysfunction: {
				exaggerationOfStrength: '',
				typicalUndesirableDevelopments: '',
				blindSpot: '',
			},
			underlyingStructure: {
				primalFear: '',
				vulnerableSide: '',
				psychodynamicTension: '',
			},
			developmentPotential: {
				integration: '',
				oppositeVirtues: '',
				developmentLevers: '',
			},
		},
		caregiver: {
			name: 'Fürsorger',
			description:
				'Der Fürsorger ist geprägt von dem Bestreben, anderen zu helfen und sie zu unterstützen. Dies gilt als zentraler Wert und zugleich als wesentliche Quelle der Erfüllung. Seine Aufmerksamkeit richtet sich auf die Bedürfnisse anderer, sodass er schnell einzugreifen oder Trost zu spenden bereitsteht. Großzügigkeit fällt ihm leicht, ebenso wie das Übernehmen von Verantwortung, um notwendige Fürsorge sicherzustellen.',
			coreIdentity: {
				basicAttitude: '',
				keyMotivation: '',
				worldView: '',
				idealForm: '',
			},
			perception: {
				focus: '',
				periphery: '',
			},
			lifeNarrative: {
				origin: '',
				challenge: '',
				antagonist: '',
				maturation: '',
				idealResult: '',
			},
			fulfillingActivities: {
				typicalTasks: '',
				preferredEnvironment: '',
				energySource: '',
			},
			definitionOfLuck: {
				fulfillmentEmergence: '',
				meaningEmergence: '',
			},
			leadershipStyle: {
				strengths: '',
				decisionLogic: '',
				motivationalApproach: '',
			},
			externalPerception: {
				positiveAttributions: '',
				criticalAttributions: '',
			},
			dysfunction: {
				exaggerationOfStrength: '',
				typicalUndesirableDevelopments: '',
				blindSpot: '',
			},
			underlyingStructure: {
				primalFear: '',
				vulnerableSide: '',
				psychodynamicTension: '',
			},
			developmentPotential: {
				integration: '',
				oppositeVirtues: '',
				developmentLevers: '',
			},
		},
		warrior: {
			name: 'Krieger',
			description:
				'Der Krieger ist von einer starken Zielstrebigkeit getrieben und verfolgt seine Missionen mit Entschlossenheit. Er empfindet Stolz daran, Herausforderungen zu meistern, und wenn Hindernisse auftreten, verstärkt er sein Engagement, überzeugt davon, dass die Hartnäckigen triumphieren werden. Wettbewerbsorientiert kämpft er, um sich selbst sowie andere zu schützen oder führt Initiative für Kampagnen an.',
			coreIdentity: {
				basicAttitude: '',
				keyMotivation: '',
				worldView: '',
				idealForm: '',
			},
			perception: {
				focus: '',
				periphery: '',
			},
			lifeNarrative: {
				origin: '',
				challenge: '',
				antagonist: '',
				maturation: '',
				idealResult: '',
			},
			fulfillingActivities: {
				typicalTasks: '',
				preferredEnvironment: '',
				energySource: '',
			},
			definitionOfLuck: {
				fulfillmentEmergence: '',
				meaningEmergence: '',
			},
			leadershipStyle: {
				strengths: '',
				decisionLogic: '',
				motivationalApproach: '',
			},
			externalPerception: {
				positiveAttributions: '',
				criticalAttributions: '',
			},
			dysfunction: {
				exaggerationOfStrength: '',
				typicalUndesirableDevelopments: '',
				blindSpot: '',
			},
			underlyingStructure: {
				primalFear: '',
				vulnerableSide: '',
				psychodynamicTension: '',
			},
			developmentPotential: {
				integration: '',
				oppositeVirtues: '',
				developmentLevers: '',
			},
		},
		seeker: {
			name: 'Suchender',
			description:
				'Der Suchende ist von einem tiefen Drang getrieben, sich selbst zu entdecken und weiterzuentwickeln. Sein Blick richtet sich stets nach der Zukunft. Er nimmt Neues schnell auf und verliert das Interesse an Überholten und Gewöhnlichen. Abenteuer, neue Erfahrungen sowie persönliche Wachstumschancen bereiten ihm Freude, denn er betrachtet das Leben als eine fortlaufende Reise des Erkundens.',
			coreIdentity: {
				basicAttitude: '',
				keyMotivation: '',
				worldView: '',
				idealForm: '',
			},
			perception: {
				focus: '',
				periphery: '',
			},
			lifeNarrative: {
				origin: '',
				challenge: '',
				antagonist: '',
				maturation: '',
				idealResult: '',
			},
			fulfillingActivities: {
				typicalTasks: '',
				preferredEnvironment: '',
				energySource: '',
			},
			definitionOfLuck: {
				fulfillmentEmergence: '',
				meaningEmergence: '',
			},
			leadershipStyle: {
				strengths: '',
				decisionLogic: '',
				motivationalApproach: '',
			},
			externalPerception: {
				positiveAttributions: '',
				criticalAttributions: '',
			},
			dysfunction: {
				exaggerationOfStrength: '',
				typicalUndesirableDevelopments: '',
				blindSpot: '',
			},
			underlyingStructure: {
				primalFear: '',
				vulnerableSide: '',
				psychodynamicTension: '',
			},
			developmentPotential: {
				integration: '',
				oppositeVirtues: '',
				developmentLevers: '',
			},
		},
		lover: {
			name: 'Liebender',
			description:
				'Der Liebende ist von dem Streben nach Verbindung und Beziehungen getrieben. Er wird leicht leidenschaftlich und sei es für eine andere Person, eine Aktivität oder ein Ideal. Sinnlich und lebendig lässt er sein Herz die Führung übernehmen und wählt Tätigkeiten, Berufe, Besitztümer sowie Beziehungen, die seinem Leben Schönheit verleihen.',
			coreIdentity: {
				basicAttitude: '',
				keyMotivation: '',
				worldView: '',
				idealForm: '',
			},
			perception: {
				focus: '',
				periphery: '',
			},
			lifeNarrative: {
				origin: '',
				challenge: '',
				antagonist: '',
				maturation: '',
				idealResult: '',
			},
			fulfillingActivities: {
				typicalTasks: '',
				preferredEnvironment: '',
				energySource: '',
			},
			definitionOfLuck: {
				fulfillmentEmergence: '',
				meaningEmergence: '',
			},
			leadershipStyle: {
				strengths: '',
				decisionLogic: '',
				motivationalApproach: '',
			},
			externalPerception: {
				positiveAttributions: '',
				criticalAttributions: '',
			},
			dysfunction: {
				exaggerationOfStrength: '',
				typicalUndesirableDevelopments: '',
				blindSpot: '',
			},
			underlyingStructure: {
				primalFear: '',
				vulnerableSide: '',
				psychodynamicTension: '',
			},
			developmentPotential: {
				integration: '',
				oppositeVirtues: '',
				developmentLevers: '',
			},
		},
		creator: {
			name: 'Schöpfer',
			description:
				'Der Schöpfer ist von Natur aus ein Visionär und lebt von einer anhaltenden Vorstellungskraft. Er denkt ständig über neue Möglichkeiten nach. Manchmal fließen die Ideen mühelos, als würde er sie wie eine Antenne aufnehmen. In der Lage, diese Konzepte greifbar zu machen, bringt er sie in Kunst, Schreiben, Design oder Erfindungen zum Ausdruck.',
			coreIdentity: {
				basicAttitude: '',
				keyMotivation: '',
				worldView: '',
				idealForm: '',
			},
			perception: {
				focus: '',
				periphery: '',
			},
			lifeNarrative: {
				origin: '',
				challenge: '',
				antagonist: '',
				maturation: '',
				idealResult: '',
			},
			fulfillingActivities: {
				typicalTasks: '',
				preferredEnvironment: '',
				energySource: '',
			},
			definitionOfLuck: {
				fulfillmentEmergence: '',
				meaningEmergence: '',
			},
			leadershipStyle: {
				strengths: '',
				decisionLogic: '',
				motivationalApproach: '',
			},
			externalPerception: {
				positiveAttributions: '',
				criticalAttributions: '',
			},
			dysfunction: {
				exaggerationOfStrength: '',
				typicalUndesirableDevelopments: '',
				blindSpot: '',
			},
			underlyingStructure: {
				primalFear: '',
				vulnerableSide: '',
				psychodynamicTension: '',
			},
			developmentPotential: {
				integration: '',
				oppositeVirtues: '',
				developmentLevers: '',
			},
		},
		revolutionary: {
			name: 'Revolutionär',
			description:
				'Im Kern des Revolutionärs steht ein Nonkonformist, der bestehende Regeln und den Status quo in Frage stellt und häufig auch veränderte. Die Aussagen „So ist das immer schon gemacht“ oder „Alle anderen handeln bzw. denken so“ wecken Misstrauen und ein Gefühl von Einschränkung. Er besitzt die Kraft, einschränkende Überzeugungen und Gewohnheiten loszulassen und damit neue Wege zu gehen.',
			coreIdentity: {
				basicAttitude: '',
				keyMotivation: '',
				worldView: '',
				idealForm: '',
			},
			perception: {
				focus: '',
				periphery: '',
			},
			lifeNarrative: {
				origin: '',
				challenge: '',
				antagonist: '',
				maturation: '',
				idealResult: '',
			},
			fulfillingActivities: {
				typicalTasks: '',
				preferredEnvironment: '',
				energySource: '',
			},
			definitionOfLuck: {
				fulfillmentEmergence: '',
				meaningEmergence: '',
			},
			leadershipStyle: {
				strengths: '',
				decisionLogic: '',
				motivationalApproach: '',
			},
			externalPerception: {
				positiveAttributions: '',
				criticalAttributions: '',
			},
			dysfunction: {
				exaggerationOfStrength: '',
				typicalUndesirableDevelopments: '',
				blindSpot: '',
			},
			underlyingStructure: {
				primalFear: '',
				vulnerableSide: '',
				psychodynamicTension: '',
			},
			developmentPotential: {
				integration: '',
				oppositeVirtues: '',
				developmentLevers: '',
			},
		},
		sage: {
			name: 'Weiser',
			description:
				'Der Weise besitzt eine tiefgreifende Neugier für zahlreiche Themen und betrachtet das Leben als fortlaufenden Lernprozess. Andere sehen ihn als sachkundig an. Die Suche nach Erkenntnis selbst gilt als befriedigende Belohnung. Er bleibt ruhig und unerschütterlich, strebt danach, Situationen zu verstehen, um anschließend Wissen weiterzugeben oder Ratschläge anzubieten.',
			coreIdentity: {
				basicAttitude: '',
				keyMotivation: '',
				worldView: '',
				idealForm: '',
			},
			perception: {
				focus: '',
				periphery: '',
			},
			lifeNarrative: {
				origin: '',
				challenge: '',
				antagonist: '',
				maturation: '',
				idealResult: '',
			},
			fulfillingActivities: {
				typicalTasks: '',
				preferredEnvironment: '',
				energySource: '',
			},
			definitionOfLuck: {
				fulfillmentEmergence: '',
				meaningEmergence: '',
			},
			leadershipStyle: {
				strengths: '',
				decisionLogic: '',
				motivationalApproach: '',
			},
			externalPerception: {
				positiveAttributions: '',
				criticalAttributions: '',
			},
			dysfunction: {
				exaggerationOfStrength: '',
				typicalUndesirableDevelopments: '',
				blindSpot: '',
			},
			underlyingStructure: {
				primalFear: '',
				vulnerableSide: '',
				psychodynamicTension: '',
			},
			developmentPotential: {
				integration: '',
				oppositeVirtues: '',
				developmentLevers: '',
			},
		},
		magician: {
			name: 'Magier',
			description:
				'Der Magier erkennt, dass die Realität eines Menschen durch seine Überzeugungen bestimmt wird. Er nimmt die Verbundenheit von Ereignissen, Personen und Ideen wahr, bemerkt Schicksalsschläge, bedeutungsvolle Verbindungen sowie die Welleneffekte kleiner Veränderungen. Durch das Gestalten neuer Wahrnehmungen schafft er Wandel und das sowohl in sich selbst als auch bei anderen.',
			coreIdentity: {
				basicAttitude: '',
				keyMotivation: '',
				worldView: '',
				idealForm: '',
			},
			perception: {
				focus: '',
				periphery: '',
			},
			lifeNarrative: {
				origin: '',
				challenge: '',
				antagonist: '',
				maturation: '',
				idealResult: '',
			},
			fulfillingActivities: {
				typicalTasks: '',
				preferredEnvironment: '',
				energySource: '',
			},
			definitionOfLuck: {
				fulfillmentEmergence: '',
				meaningEmergence: '',
			},
			leadershipStyle: {
				strengths: '',
				decisionLogic: '',
				motivationalApproach: '',
			},
			externalPerception: {
				positiveAttributions: '',
				criticalAttributions: '',
			},
			dysfunction: {
				exaggerationOfStrength: '',
				typicalUndesirableDevelopments: '',
				blindSpot: '',
			},
			underlyingStructure: {
				primalFear: '',
				vulnerableSide: '',
				psychodynamicTension: '',
			},
			developmentPotential: {
				integration: '',
				oppositeVirtues: '',
				developmentLevers: '',
			},
		},
		ruler: {
			name: 'Herrscher',
			description:
				'Der Herrscher zieht sich von Macht angezogen und lenkt diese gezielt ein, um Ziele zu erreichen, Ordnung zu bewahren und die guten Unternehmungen seiner Gemeinschaft voranzutreiben. Er erkennt mühelos, wer wem unterstellt ist und welche Hierarchien innerhalb verschiedener Gruppen existieren. Der Wunsch nach Kontrolle begleitet ihn, während er gleichzeitig bereitwillig Verantwortung übernimmt.',
			coreIdentity: {
				basicAttitude: '',
				keyMotivation: '',
				worldView: '',
				idealForm: '',
			},
			perception: {
				focus: '',
				periphery: '',
			},
			lifeNarrative: {
				origin: '',
				challenge: '',
				antagonist: '',
				maturation: '',
				idealResult: '',
			},
			fulfillingActivities: {
				typicalTasks: '',
				preferredEnvironment: '',
				energySource: '',
			},
			definitionOfLuck: {
				fulfillmentEmergence: '',
				meaningEmergence: '',
			},
			leadershipStyle: {
				strengths: '',
				decisionLogic: '',
				motivationalApproach: '',
			},
			externalPerception: {
				positiveAttributions: '',
				criticalAttributions: '',
			},
			dysfunction: {
				exaggerationOfStrength: '',
				typicalUndesirableDevelopments: '',
				blindSpot: '',
			},
			underlyingStructure: {
				primalFear: '',
				vulnerableSide: '',
				psychodynamicTension: '',
			},
			developmentPotential: {
				integration: '',
				oppositeVirtues: '',
				developmentLevers: '',
			},
		},
		jester: {
			name: 'Narr',
			description: 'Der Narr schätzt Humor und Lebensfreude als zentrale Werte. Er erkennt mühelos die Widersprüchlichkeit, Absurdität und Ironie des Alltags, ohne jedoch gezwungen zu sein, diese zu verändern. Ob er innerlich kichert oder aktiv Fröhlichkeit und Lachen anstößt. Er genießt es, das Vergnügen für sich selbst sowie für andere zu fördern.',
			coreIdentity: {
				basicAttitude: '',
				keyMotivation: '',
				worldView: '',
				idealForm: '',
			},
			perception: {
				focus: '',
				periphery: '',
			},
			lifeNarrative: {
				origin: '',
				challenge: '',
				antagonist: '',
				maturation: '',
				idealResult: '',
			},
			fulfillingActivities: {
				typicalTasks: '',
				preferredEnvironment: '',
				energySource: '',
			},
			definitionOfLuck: {
				fulfillmentEmergence: '',
				meaningEmergence: '',
			},
			leadershipStyle: {
				strengths: '',
				decisionLogic: '',
				motivationalApproach: '',
			},
			externalPerception: {
				positiveAttributions: '',
				criticalAttributions: '',
			},
			dysfunction: {
				exaggerationOfStrength: '',
				typicalUndesirableDevelopments: '',
				blindSpot: '',
			},
			underlyingStructure: {
				primalFear: '',
				vulnerableSide: '',
				psychodynamicTension: '',
			},
			developmentPotential: {
				integration: '',
				oppositeVirtues: '',
				developmentLevers: '',
			},
		},
		none: {
			name: 'Kein Archetyp',
			description: 'Es wurde kein Archetyp ausgewählt.',
		},
	};
	return archetypeMapping[archetype];
}
