function getMoralValueInfo(key) {
	const mapping20 = {
		selfDirectionThought: {
			title: 'Selbstbestimmtes Denken',
			original: 'Self-direction: thought',
			basic_dichotomy: 'Wachstum und Angstfreiheit',
			social_vs_personal: 'Persönlicher Fokus',
			higher_order_value: 'Offenheit für Wandel',
			quote: 'Es ist gut, eigene Ideen und Interessen zu haben.',
			items: [
				'Kreativer sein: mehr Kreativität und Vorstellungskraft entwickeln',
				'Neugieriger sein: mehr Neugier zeigen, Entdeckungen machen und Interesse wecken',
				'Gedankenfreiheit haben: Personen helfen, sich eine eigene Meinung zu bilden, weniger Zensur und weniger Beeinflussung des Denkens fördern',
			],
			description:
				'Selbstbestimmtes Denken betont die Freiheit, eigene Gedanken zu entwickeln, unabhängig zu denken und intellektuell zu erkunden. Er umfasst Kreativität, Neugier und das Recht auf unzensiertes Denken. Personen mit diesem Wert schätzen intellektuelle Unabhängigkeit und die Fähigkeit, sich eine eigene Weltanschauung zu erarbeiten.',
		},
		selfDirectionAction: {
			title: 'Selbstbestimmtes Handeln',
			original: 'Self-direction: action',
			basic_dichotomy: 'Wachstum und Angstfreiheit',
			social_vs_personal: 'Persönlicher Fokus',
			higher_order_value: 'Offenheit für Wandel',
			quote: 'Es ist gut, die eigenen Handlungen selbst zu bestimmen.',
			items: [
				'Eigene Ziele wählen: Personen erlauben, selbst zu entscheiden, was das Beste für sie ist, ihr Leben selbst zu gestalten und ihren Träumen zu folgen',
				'Unabhängig sein: Personen ermöglichen, eigenständig zu planen, ohne Zustimmung anderer einzuholen',
				'Handlungsfreiheit haben: Personen erlauben, selbstbestimmt zu handeln und zu tun, was sie möchten',
				'Privatsphäre haben: private Räume, Zeit für sich allein und weniger Überwachung ermöglichen; mehr Kontrolle darüber, was man offenbart und wem',
			],
			description:
				'Selbstbestimmtes Handeln steht für die Freiheit, das eigene Leben aktiv zu gestalten und Entscheidungen ohne Fremdbestimmung zu treffen. Er umfasst Autonomie im Alltag, die Wahl eigener Ziele, Unabhängigkeit in der Lebensplanung sowie den Schutz der Privatsphäre. Personen mit diesem Wert lehnen Bevormundung ab und betonen das Recht auf Selbstverwirklichung.',
		},
		stimulation: {
			title: 'Anregung',
			original: 'Stimulation',
			basic_dichotomy: 'Wachstum und Angstfreiheit',
			social_vs_personal: 'Persönlicher Fokus',
			higher_order_value: 'Offenheit für Wandel',
			quote: 'Es ist gut, Aufregung, Neues und Veränderung zu erleben.',
			items: [
				'Ein aufregendes Leben führen: Personen ermöglichen, fremde Orte zu erleben, besondere Aktivitäten auszuprobieren und perspektivverändernde Erfahrungen zu machen',
				'Ein abwechslungsreiches Leben führen: Personen ermöglichen, viele Aktivitäten auszuprobieren, Teile ihres Lebens zu verändern und lokale Vereine und Gruppen zu fördern',
				'Wagemutig sein: mehr Risikobereitschaft entwickeln und Mut zeigen',
			],
			description:
				'Anregung als Wert treibt Personen an, Abwechslung, Neuheit und aufregende Erlebnisse zu suchen. Es geht darum, das Leben lebendig und dynamisch zu gestalten und zwar durch Reisen, neue Hobbys, Risikobereitschaft und das Verlassen der Komfortzone. Dieser Wert steht im Gegensatz zu Routine und Stagnation.',
		},
		hedonism: {
			title: 'Genussstreben',
			original: 'Hedonism',
			basic_dichotomy: 'Wachstum und Angstfreiheit',
			social_vs_personal: 'Persönlicher Fokus',
			higher_order_value: 'Offenheit für Wandel',
			quote: 'Es ist gut, Freude und sinnliche Befriedigung zu erleben.',
			items: [
				'Freude haben: das Leben genießbar machen, Freizeit ermöglichen, Spaß und sinnliche Befriedigung fördern',
			],
			description:
				'Genussstreben betont das Streben nach persönlichem Genuss, Freude und Wohlbefinden. Personen mit diesem Wert legen großen Wert auf angenehme Erfahrungen, Lebensgenuss und die Befriedigung sinnlicher Bedürfnisse. Er umfasst Freizeitgestaltung, kulinarischen Genuss, körperliches Wohlbefinden und jede Form von lustvollen Erlebnissen.',
		},
		achievement: {
			title: 'Erfolgsstreben',
			original: 'Achievement',
			basic_dichotomy: 'Selbstschutz und Angstvermeidung',
			social_vs_personal: 'Persönlicher Fokus',
			higher_order_value: 'Selbsterhöhung',
			quote: 'Es ist gut, gemäß gesellschaftlichen Normen erfolgreich zu sein.',
			items: [
				'Ehrgeizig sein: Ambitionen erlauben und den sozialen Aufstieg ermöglichen',
				'Erfolg haben: Erfolge ermöglichen und Leistungen anerkennen',
				'Fähig sein: Kompetenz in bestimmten Aufgaben erwerben, effektiver werden und Können unter Beweis stellen',
				'Intellektuell sein: hohe kognitive Fähigkeiten entwickeln, reflektierter werden und Intelligenz zeigen',
				'Mutig sein: mutiger werden und für die eigenen Überzeugungen eintreten',
			],
			description:
				'Erfolgsstreben als Wert beschreibt den Antrieb, persönliche Ziele zu erreichen, Kompetenz zu demonstrieren und gesellschaftlich anerkannten Erfolg zu erzielen. Er umfasst Ehrgeiz, Tüchtigkeit, intellektuelle Fähigkeiten und den Mut, für seine Überzeugungen einzustehen. Dieser Wert motiviert zu persönlichem Wachstum innerhalb sozialer Maßstäbe.',
		},
		powerDominance: {
			title: 'Vormachtsstellung',
			original: 'Power: dominance',
			basic_dichotomy: 'Selbstschutz und Angstvermeidung',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Selbsterhöhung',
			quote: 'Es ist gut, Kontrollpositionen über andere innezuhaben.',
			items: [
				'Einfluss haben: mehr Personen haben, die um einen Gefallen bitten, mehr Einfluss ausüben und mehr Wege zur Kontrolle von Ereignissen nutzen',
				'Das Recht zu befehlen haben: den richtigen Personen erlauben, das Kommando zu übernehmen, Experten in Führungspositionen zu bringen und klarere Befehlshierarchien zu schaffen',
			],
			description:
				'Vormachtsstellung beschreibt das Streben nach sozialer Dominanz, Führungsanspruch und der Fähigkeit, andere zu lenken und zu kontrollieren. Personen mit diesem Wert schätzen klare Hierarchien, Autorität und die Möglichkeit, Entscheidungen für andere zu treffen. Er umfasst Führung, Einflussnahme und das Streben nach gesellschaftlicher Kontrolle.',
		},
		powerRessources: {
			title: 'Ressourcenkontrolle',
			original: 'Power: resources',
			basic_dichotomy: 'Selbstschutz und Angstvermeidung',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Selbsterhöhung',
			quote: 'Es ist gut, materielle Besitztümer und soziale Ressourcen zu haben.',
			items: [
				'Wohlstand haben: Personen erlauben, Reichtum und materielle Güter zu erlangen, ihren Wohlstand zu zeigen und durch Reichtum Kontrolle auszuüben sowie finanzielle Prosperität zu fördern',
			],
			description:
				'Ressourcenkontrolle betont den Wert materieller und sozialer Güter als Mittel zur Einflussnahme und Absicherung. Wohlstand, Besitz und finanzielle Unabhängigkeit gelten als erstrebenswert und das nicht nur um ihrer selbst willen, sondern auch als Grundlage für soziale Macht und Handlungsspielraum.',
		},
		face: {
			title: 'Ansehen',
			original: 'Face',
			basic_dichotomy: 'Selbstschutz und Angstvermeidung',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Selbsterhöhung',
			quote: 'Es ist gut, das eigene öffentliche Bild zu wahren.',
			items: [
				'Soziale Anerkennung haben: Personen erlauben, Respekt und gesellschaftliche Anerkennung zu erlangen oder Demütigung zu vermeiden',
				'Einen guten Ruf haben: Personen ermöglichen, ihren Ruf aufzubauen, ihr öffentliches Image zu schützen und ihren guten titlen zu verbreiten',
			],
			description:
				'Ansehen als Wert dreht sich um die Pflege des öffentlichen Images und die Vermeidung von Gesichtsverlust. Personen mit diesem Wert investieren in ihre gesellschaftliche Reputation, streben nach Respekt und Anerkennung und sind sensibel gegenüber öffentlicher Kritik oder Demütigung. Dieser Wert ist eng mit sozialer Identität und Zugehörigkeit verknüpft.',
		},
		securityPersonal: {
			title: 'Persönliche Sicherheit',
			original: 'Security: personal',
			basic_dichotomy: 'Selbstschutz und Angstvermeidung',
			social_vs_personal: 'Persönlicher Fokus',
			higher_order_value: 'Bewahrung',
			quote: 'Es ist gut, ein sicheres unmittelbares Umfeld zu haben.',
			items: [
				'Zugehörigkeit spüren: Personen ermöglichen, Gruppen zu gründen, beizutreten und in ihnen zu bleiben, ihre Gruppenzugehörigkeit zu zeigen und füreinander zu sorgen',
				'Gute Gesundheit haben: Krankheiten vermeiden, die Gesundheit erhalten und körperliches sowie geistiges Wohlbefinden fördern',
				'Schuldenfrei sein: Verschuldung vermeiden und sicherstellen, dass Gefälligkeiten erwidert werden',
				'Ordentlich und sauber sein: mehr Sauberkeit, Ordentlichkeit und Struktur fördern',
				'Ein komfortables Leben führen: ein Grundeinkommen ermöglichen, finanzielle Sorgen vermeiden und ein prosperierendes Leben führen',
			],
			description:
				'Persönliche Sicherheit umfasst das Bedürfnis nach Schutz, Stabilität und Wohlbefinden im unmittelbaren Lebensumfeld. Dazu gehören körperliche Gesundheit, finanzielle Absicherung, Sauberkeit und Ordnung sowie das Gefühl der Zugehörigkeit zu einer Gruppe. Dieser Wert zielt darauf ab, Bedrohungen und Unsicherheiten im persönlichen Alltag zu minimieren.',
		},
		securitySocietal: {
			title: 'Gesellschaftliche Sicherheit',
			original: 'Security: societal',
			basic_dichotomy: 'Selbstschutz und Angstvermeidung',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Bewahrung',
			quote: 'Es ist gut, eine sichere und stabile Gesellschaft zu haben.',
			items: [
				'Ein sicheres Land haben: einen Staat fördern, der besser gegen Kriminalität vorgehen und seine Bürger schützen und versorgen kann',
				'Eine stabile Gesellschaft haben: bestehende Gesellschaftsstrukturen akzeptieren oder aufrechterhalten und gesellschaftlichem Chaos und Unordnung vorbeugen',
			],
			description:
				'Gesellschaftliche Sicherheit betont die Bedeutung stabiler staatlicher Institutionen, einer funktionierenden Rechtsordnung und des Schutzes der Bürger durch den Staat. Personen mit diesem Wert schätzen gesellschaftliche Ordnung, Verlässlichkeit staatlicher Strukturen und die Prävention von Chaos und Kriminalität auf gesellschaftlicher Ebene.',
		},
		conformityRules: {
			title: 'Angepasstheit hinsichtlich Regeln',
			original: 'Conformity: rules',
			basic_dichotomy: 'Selbstschutz und Angstvermeidung',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Bewahrung',
			quote: 'Es ist gut, Regeln, Gesetze und formale Verpflichtungen einzuhalten.',
			items: [
				'Regelkonform sein: Gesetzen und Regeln folgen, die Erfüllung eigener Verpflichtungen fördern und Personen, die dies tun, anerkennen',
				'Selbstdiszipliniert sein: Selbstbeherrschung üben, Regeln auch ohne Kontrolle befolgen und sich selbst Regeln setzen',
				'Sich angemessen verhalten: informelle Regeln und gesellschaftliche Konventionen nicht verletzen und gute Manieren fördern',
			],
			description:
				'Angepasstheit hinsichtlich Regeln beschreibt die innere Bereitschaft, formale und informelle Normen einzuhalten und das aus Pflichtbewusstsein, nicht aus Angst vor Konsequenzen. Dieser Wert umfasst Selbstdisziplin, die Einhaltung gesellschaftlicher Vereinbarungen und das Verständnis, dass Regeln das gemeinsame Leben erleichtern.',
		},
		conformityInterpersonal: {
			title: 'Angepasstheit gegenüber anderen',
			original: 'Conformity: interpersonal',
			basic_dichotomy: 'Selbstschutz und Angstvermeidung',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Bewahrung',
			quote: 'Es ist gut, andere nicht zu verletzen oder zu stören.',
			items: [
				'Höflich sein: andere nicht verletzen, Rücksicht auf andere nehmen und nicht zur Last fallen',
				'Ältere ehren: den Eltern folgen und seinen Respekt und Glauben gegenüber Älteren zeigen',
			],
			description:
				'Angepasstheit gegenüber anderen beschreibt die zwischenpersönliche Dimension von Konformität: das Bestreben, andere nicht zu verletzen, zu stören oder zu verärgern. Er umfasst Höflichkeit, Rücksichtnahme und die Achtung gegenüber älteren Generationen. Personen mit diesem Wert legen großen Wert auf harmonische soziale Interaktionen.',
		},
		tradition: {
			title: 'Tradition',
			original: 'Tradition',
			basic_dichotomy: 'Selbstschutz und Angstvermeidung',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Bewahrung',
			quote: 'Es ist gut, kulturelle, familiäre oder religiöse Traditionen zu bewahren.',
			items: [
				'Traditionen respektieren: den Bräuchen der Familie folgen, traditionelle Praktiken ehren, traditionelle Werte und Denkweisen bewahren und die Erhaltung von Gewohnheiten fördern',
				'Religiösen Glauben pflegen: die Bräuche einer Religion praktizieren, sein Leben dem Glauben widmen und Frömmigkeit sowie die Verbreitung des eigenen Glaubens fördern',
			],
			description:
				'Tradition als Wert bezeichnet die Wertschätzung und Weitergabe kultureller, religiöser und familiärer Überlieferungen. Personen mit diesem Wert fühlen sich durch ihre Herkunft, ihren Glauben und überlieferte Praktiken verwurzelt. Sie sehen in Traditionen eine wichtige Quelle der Identität, des Zusammenhalts und der Orientierung.',
		},
		humility: {
			title: 'Bescheidenheit',
			original: 'Humility',
			basic_dichotomy: 'Selbstschutz und Angstvermeidung',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Bewahrung',
			quote: 'Es ist gut, die eigene Bedeutungslosigkeit im größeren Gesamtbild zu erkennen.',
			items: [
				'Bescheiden sein: Arroganz und Prahlerei ablehnen, die Gruppe über das Individuum stellen und der Gesellschaft etwas zurückgeben',
				'Das Leben so annehmen, wie es ist: das eigene Schicksal akzeptieren, sich den Lebensumständen fügen und mit dem Vorhandenen zufrieden sein',
			],
			description:
				'Bescheidenheit als Wert betont das Bewusstsein für die eigene begrenzte Rolle in der Welt und die Bereitschaft, das Kollektive über das Individuelle zu stellen. Es geht darum, Ansprüche zurückzuhalten, Schicksal anzunehmen und in Dankbarkeit statt in Anspruchsdenken zu leben. Dieser Wert fördert inneren Frieden und soziale Harmonie.',
		},
		benevolenceCaring: {
			title: 'Fürsorge',
			original: 'Benevolence: caring',
			basic_dichotomy: 'Wachstum und Angstfreiheit',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Selbsttranszendenz',
			quote: 'Es ist gut, für das Wohl der Mitglieder der eigenen Gruppe zu arbeiten.',
			items: [
				'Hilfsbereit sein: den Personen in der eigenen Gruppe helfen und das Wohlergehen anderer fördern',
				'Ehrlich sein: ehrlicher sein und Ehrlichkeit anerkennen und fördern',
				'Vergebend sein: Personen ermöglichen, einander zu vergeben, zweite Chancen zu geben und Gnade walten zu lassen',
				'Die eigene Familie schützen: Personen ermöglichen, eine Familie zu haben, zu schützen und für sie zu sorgen',
				'Liebevoll sein: enge Beziehungen fördern, das Wohlbefinden anderer über das eigene stellen und Zuneigung, Mitgefühl und Empathie zeigen',
			],
			description:
				'Fürsorge als Teil des Wohlwollens betont das aktive Einsetzen für das Wohlergehen nahestehender Personen. Dieser Wert umfasst Hilfsbereitschaft, Ehrlichkeit, Vergebungsbereitschaft, Liebe und den Schutz der Familie. Er motiviert Personen, sich füreinander einzusetzen und soziale Bindungen zu stärken.',
		},
		benevolenceDependability: {
			title: 'Verlässlichkeit',
			original: 'Benevolence: dependability',
			basic_dichotomy: 'Wachstum und Angstfreiheit',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Selbsttranszendenz',
			quote: 'Es ist gut, ein zuverlässiges und vertrauenswürdiges Mitglied der eigenen Gruppe zu sein.',
			items: [
				'Verantwortungsbewusst sein: klare Verantwortlichkeiten schaffen, Verlässlichkeit fördern und Vertrauen aufbauen',
				'Freunden gegenüber loyal sein: ein verlässlicher, vertrauensvoller und loyaler Freund sein und Freundschaften vollständig unterstützen',
			],
			description:
				'Verlässlichkeit als Dimension des Wohlwollens beschreibt das Bestreben, als vertrauenswürdige und beständige Person in sozialen Beziehungen zu gelten. Dieser Wert umfasst Verantwortungsbewusstsein, Treue gegenüber Freunden und das Einhalten von Versprechen. Personen mit diesem Wert gelten als verlässlicher Anker in ihrer sozialen Gemeinschaft.',
		},
		universalismConcern: {
			title: 'Gesellschaftliche Belange',
			original: 'Universalism: concern',
			basic_dichotomy: 'Wachstum und Angstfreiheit',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Selbsttranszendenz',
			quote: 'Es ist gut, nach Gleichheit, Gerechtigkeit und Schutz für alle Personen zu streben.',
			items: [
				'Gleichheit haben: Personen mit geringerem sozialem Status fördern, ärmere Regionen der Welt unterstützen und allen Personen gleiche Chancen bieten',
				'Gerecht sein: Gerechtigkeit blind gegenüber irrelevanten Aspekten eines Falls zu machen, Fairness in Wettbewerben zu fördern und Schwache und Verletzliche zu schützen',
				'Eine friedliche Welt haben: Nationen zum Waffenstillstand bringen, Konflikte vermeiden und Kriege beenden sowie den Frieden als wertvoll und fragil begreifen',
			],
			description:
				'Gesellschaftliche Belange beschreibt das Streben nach globaler Gerechtigkeit, Chancengleichheit und dem Schutz aller Personen, unabhängig von Herkunft oder Status. Dieser Wert geht über die eigene Gruppe hinaus und umfasst ein kosmopolitisches Mitgefühl für Alle.',
		},
		universalismNature: {
			title: 'Naturschutz',
			original: 'Universalism: nature',
			basic_dichotomy: 'Wachstum und Angstfreiheit',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Selbsttranszendenz',
			quote: 'Es ist gut, die natürliche Umwelt zu bewahren.',
			items: [
				'Die Umwelt schützen: Umweltverschmutzung vermeiden, für die Natur sorgen und Programme zur Wiederherstellung der Natur fördern',
				'In Harmonie mit der Natur leben: Chemikalien und gentechnisch veränderte Organismen meiden, Tiere und Pflanzen als beseelt betrachten und das Leben im Einklang mit der Natur fördern',
				'Eine Welt der Schönheit haben: Personen ermöglichen, Kunst zu erleben und vor der Natur ehrfürchtig zu staunen sowie die Schönheit der Natur und die Künste zu fördern',
			],
			description:
				'Naturschutz betont die Verantwortung des Personen gegenüber der Natur und des Planeten als Lebensgrundlage. Er umfasst Umweltschutz, Nachhaltigkeit, einen naturbewussten Lebensstil und die Wertschätzung ästhetischer Schönheit in Natur und Kunst. Personen mit diesem Wert handeln mit dem Bewusstsein für ökologische Zusammenhänge.',
		},
		universalismTolerance: {
			title: 'Toleranz',
			original: 'Universalism: tolerance',
			basic_dichotomy: 'Wachstum und Angstfreiheit',
			social_vs_personal: 'Sozialer Fokus',
			higher_order_value: 'Selbsttranszendenz',
			quote: 'Es ist gut, diejenigen zu akzeptieren und zu verstehen, die anders sind als man selbst.',
			items: [
				'Aufgeschlossen sein: den Dialog zwischen Gruppen fördern, Vorurteile abbauen, Personen zuhören, die anders sind, und Toleranz zwischen allen Personen und Gruppen fördern',
				'Die Weisheit haben, andere zu akzeptieren: Personen ermöglichen, Meinungsverschiedenheiten und andere Personen zu akzeptieren, ein reifes Verständnis für unterschiedliche Meinungen fördern und Fanatismus und Parteigeist reduzieren',
			],
			description:
				'Toleranz als universalistischer Wert beschreibt die Bereitschaft, Personen mit anderen Überzeugungen, Kulturen und Lebensstilen zu akzeptieren und zu verstehen. Dieser Wert fördert offene Gesellschaftsdebatte, das Überwinden von Vorurteilen und eine reife Haltung gegenüber Pluralismus. Er ist Grundlage für ein friedliches Zusammenleben in Vielfalt.',
		},
		universalismObjectivity: {
			title: 'Objektivität',
			original: 'Universalism: objectivity',
			basic_dichotomy: 'Wachstum und Angstfreiheit',
			social_vs_personal: 'Persönlicher Fokus',
			higher_order_value: 'Selbsttranszendenz',
			quote: 'Es ist gut, nach Wahrheit zu suchen und rational sowie unvoreingenommen zu denken.',
			items: [
				'Logisch sein: auf Daten statt auf Bauchgefühl setzen, rationales, fokussiertes und konsistentes Denken fördern und die wissenschaftliche Methode unterstützen',
				'Eine objektive Sichtweise haben: die Wahrheit suchen, eine neutrale Perspektive einnehmen, eine unvoreingenommene Meinung bilden und Personen die Mittel geben, fundierte Entscheidungen zu treffen',
			],
			description:
				'Objektivität als Wert steht für das Streben nach Wahrheit, Rationalität und unvoreingenommener Analyse. Personen mit diesem Wert schätzen wissenschaftliches Denken, evidenzbasierte Entscheidungen und die Fähigkeit, Sachverhalte neutral zu beurteilen. Dieser Wert bildet eine Brücke zwischen individualem Erkenntnisstreben und universellem Wahrheitsanspruch.',
		},
	};

	// console.log('Mapping: ', mapping);

	return mapping20[key] || null;
}
