function getArchetypeInfo(archetype) {
	const archetypeMapping = {
		idealist: {
			name: 'Idealist',
			description:
				'Der Idealist ist von einem tiefen Vertrauen ins Leben geprägt, das ihm erlaubt, stets die positiven Seiten zu erkennen. Auch wenn er mit herausfordernden oder einschüchternden Situationen konfrontiert wird, bleibt er optimistisch und bemüht sich, seinen Überzeugungen sowie den Werten, die ihm wichtig sind, treu zu bleiben. Sein vertrauensvoller Charakter macht ihn offen dafür, Hilfe anzunehmen, sobald sie benötigt wird',
			aliases: ['Unschuldiger', 'Optimist', 'Träumer'],
			core_identity:
				'Grundvertrauen ins Leben, fokussiert auf die helle Seite. Sieht das Gute in anderen und in Situationen, strebt nach einem idealen Leben und verkörpert die Energie eines geborgenen, unschuldigen Wesens: spontan, authentisch und vertrauend. Im besten Fall ein inspirierendes Vorbild für ein wertebasiertes Leben.',
			perception:
				'Nimmt das Gute und Vertrauenswürdige wahr, in der Welt, in anderen und in sich selbst. Vertritt auch dann die positive Perspektive, wenn Negatives präsent ist. Kann dabei blind für die dunklen Seiten des Lebens werden und ausgenutzt oder enttäuscht werden.',
			life_plot:
				'Orientiert an der Überzeugung, dass Probleme sich lösen werden, entweder hilft jemand, oder es ist nicht so schlimm wie gedacht. Die Geschichte erfordert gutes und vertrauensvolles Handeln. Das positive Endziel: Den eigenen Idealen treu bleiben und zum inspirierenden Vorbild werden.',
			fulfilling_activities:
				'Andere ermutigen und ein positives Umfeld schaffen. Gedeiht bei klaren Regeln und Erwartungen. Als natürlicher Träumer und Visionär besonders wertvoll, wenn eine Gemeinschaft, Organisation oder ein Prozess einen neuen Traum braucht.',
			happiness_source:
				'Dankbarkeit üben, im Moment leben und positive Ergebnisse antizipieren, besonders in schwierigen Zeiten. Wenn es ihm nicht gut geht, lenkt der Idealist die Aufmerksamkeit bewusst auf etwas Gutes im gegenwärtigen Moment.',
			leadership_style:
				'Inspirierend und optimistisch. Modelliert Integrität und wertebasiertes Handeln. Stellt sicher, dass alle wissen, was zu tun ist und wie es getan werden soll.',
			how_others_see_them:
				'Hoffnungsvoll und aufbauend. Andere verlassen sich auf den Idealisten zur Aufmunterung und Inspiration. Manche sehen in ihm eine Stütze, andere könnten ihn als leichte Beute betrachten.',
			shadow_tendencies:
				'Neigt dazu, Schwierigkeiten zu unterschätzen, übermäßig optimistisch oder von anderen abhängig zu sein. Kann blind gegenüber Gefahren und den harten Realitäten anderer sein. Wirkt manchmal naiv oder gefangen in Verleugnung.',
			underlying_fear:
				'Eine kindliche Verletzlichkeit und Unschuld, die leicht desillusioniert werden kann. Die Unordnung des Lebens kann zu gefährlicher Verleugnung führen. Die Angst vor dem Dunklen fördert Perfektionismus und Schwierigkeiten, Unvollkommenes zu akzeptieren.',
			growth_areas: [
				'Fähigkeit entwickeln, Schwierigkeiten vorherzusehen, ihnen zu begegnen und sie durchzuarbeiten',
				'Selektiver werden beim Vertrauen in andere',
				'Realistische Einschätzung der eigenen Fähigkeiten gewinnen, weder Unter- noch Überschätzung',
				'Toleranz gegenüber Wesen mit anderen Werten und Maßstäben entwickeln',
			],
		},
		realist: {
			name: 'Realist',
			description:
				'Der Realist zeichnet sich durch seine Praktikabilität aus und legt Wert darauf, nur das zu tun, was tatsächlich funktioniert und realistisch ist. Er schätzt eine gleichberechtigte Zusammenarbeit mit bodenständigen, vertrauenswürdigen Menschen. Um Enttäuschungen zu vermeiden, meidet er Träume oder Tätigkeiten, bei denen er das Gefühl hat, die Kontrolle über das Ergebnis nicht ausreichend zu besitzen',
			aliases: ['Gewöhnlicher', 'Jedermann', 'Waise'],
			core_identity:
				'Praktisch, unprätentiös und resilient. Verlässt sich auf gesunden Verstand, meidet Traumschlösser und riskante Ideen. Im besten Fall zeichnet sich dieser Archetyp durch Resilienz gegenüber Tragödien aus, durch einen tiefen egalitären Glauben an die Würde gewöhnlicher Wesen und durch Großzügigkeit gegenüber jenen in Not.',
			perception:
				'Nimmt Schwierigkeiten wahr und antizipiert sie, um ihnen vorzubeugen. Auch bei günstigen Prognosen behält der Realist mögliche Rückschläge im Blick. Erkennt Schwächen in anderen, akzeptiert aber Unvollkommenheiten und empfindet Empathie für alltägliches Leid.',
			life_plot:
				'Ausgerichtet auf die Erwartung, dass Probleme auftreten werden, weshalb Vorbereitung oberstes Gebot ist. Die Rolle des Realisten ist es, Probleme klar zu benennen und gemeinsam mit anderen zu verhindern oder zu lösen. Er erkennt, dass nicht alle Probleme lösbar sind, und setzt auf tragfähige Beziehungen.',
			fulfilling_activities:
				'Aufgaben, die gesunden Verstand, Praktikabilität und einen Can-do-Geist erfordern. Strategien entwickeln und Ressourcen aufbauen, um künftigen Herausforderungen zu begegnen. Andere wenden sich oft an den Realisten für praktischen Rat.',
			happiness_source:
				'Stabilität und Weisheit aus klarer Wahrnehmung der Realität. Nähe zu vertrauenswürdigen Gefährtinnen und Gefährten. Das Bewusstsein, dass andere auf einen zählen können und dass die eigene Kompetenz einen echten Unterschied macht.',
			leadership_style:
				'Gut darin, Probleme zu identifizieren und anzugehen. Antizipiert Schwierigkeiten, bevor sie eskalieren. Macht keine Versprechen, die nicht eingehalten werden können. Empathisch, aber ohne Ausreden zu akzeptieren.',
			how_others_see_them:
				'Zäher Realismus und selbstironischer Humor werden geschätzt. Demut und Resilienz werden bewundert. Kann allerdings mit chronischem Jammern oder Negativismus nerven, wenn die innere Widerstandskraft nicht ausreichend entwickelt wurde.',
			shadow_tendencies:
				'Neigt zu Fatalismus, Zynismus, Pessimismus und Stoizismus. Kann in eine Opferrolle verfallen. Je schwieriger die Lage, desto wahrscheinlicher wird eine Isolation von anderen.',
			underlying_fear:
				'Das Gefühl, allein und machtlos zu sein. Angst vor Enttäuschung und davor, die Herausforderungen des Lebens ohne Unterstützung meistern zu müssen. Vertraut nicht genug, um Hilfe zu suchen, obwohl Gemeinschaft die eigentliche Quelle der Resilienz ist.',
			growth_areas: [
				'Wagen zu hoffen, zu träumen und sich etwas vorzustellen',
				'Die eigenen Ziele höher stecken',
				'Mit anderen zusammenarbeiten',
				'Volle Verantwortung für das eigene Leben übernehmen',
				'Die eigene Rolle in den eigenen Schwierigkeiten verstehen',
			],
		},
		caregiver: {
			name: 'Fürsorger',
			description:
				'Der Fürsorger ist geprägt von dem Bestreben, anderen zu helfen und sie zu unterstützen. Dies gilt als zentraler Wert und zugleich als wesentliche Quelle der Erfüllung. Seine Aufmerksamkeit richtet sich auf die Bedürfnisse anderer, sodass er schnell einzugreifen oder Trost zu spenden bereitsteht. Großzügigkeit fällt ihm leicht, ebenso wie das Übernehmen von Verantwortung, um notwendige Fürsorge sicherzustellen',
			aliases: ['Ernährer', 'Menschenfreund', 'Märtyrer'],
			core_identity:
				'Hält Helfen und Pflegen als Kernwert und Quelle der Erfüllung. Spürt die Bedürfnisse anderer intuitiv und hilft schnell und großzügig. Im besten Fall verkörpert dieser Archetyp Mitgefühl und Altruismus, wie eine fürsorgliche Bezugsperson, die anderen Wurzeln und Flügel schenkt.',
			perception:
				'Nimmt Probleme rund um körperliches und emotionales Wohlbefinden wahr, ob Armut, Krankheit oder zwischenmenschliche Verletzungen. Sucht aktiv nach Möglichkeiten, anderen besser zu helfen. Die eigenen Bedürfnisse werden dabei oft übersehen, von sich selbst und von anderen, bis zur Erschöpfung.',
			life_plot:
				'Bereit und willens zu helfen, sei es direkt durch persönliche Fürsorge oder indirekt durch systemische Veränderungen. Die Geschichte erfordert, Selbstfürsorge mit Fürsorge für andere in Balance zu bringen, Hilfsfähigkeiten zu entwickeln und Abhängigkeit zu vermeiden.',
			fulfilling_activities:
				'Emotionale Unterstützung und Trost bieten, anleiten und lehren. Motiviert durch den Wunsch, einen positiven Unterschied im Leben anderer zu machen. Glaubt, dass die Welt besser wird, wenn Wesen füreinander sorgen und Gemeinschaften gegenseitiger Fürsorge entstehen.',
			happiness_source:
				'Freundlichkeit und Großzügigkeit gegenüber anderen. Besonders befriedigend ist es, wenn das Geleistete für jemanden wirklich bedeutsam ist. Lebt nicht für Lob, schätzt aber die Anerkennung, die den eigenen Bemühungen gebührt.',
			leadership_style:
				'Schützend und unterstützend. Hervorragend im Bereich Fürsorge und Betreuung, weil echte Motivation vorhanden ist. Alle im Umfeld fühlen sich betreut und unterstützt, ihr Bestes zu geben.',
			how_others_see_them:
				'Freundlichkeit und Großzügigkeit werden geschätzt, manchmal aber als selbstverständlich betrachtet. Wenn eigene Bedürfnisse nicht eingefordert werden, kann Ausbeutung entstehen. Selbstfürsorge ist die Voraussetzung, um wirklich für andere da sein zu können.',
			shadow_tendencies:
				'Neigt dazu zu glauben, das Beste für andere zu wissen, auch gegen deren Willen. Kann kontrollierend oder manipulativ werden, wenn dies als höherem Wohl dienend erscheint. Gefahr des Märtyrertums: Energie aufzehren oder sogar die eigene Gesundheit untergraben.',
			underlying_fear:
				'Das eigene Leiden nicht wahrzunehmen oder zu leugnen. Eine tief sitzende Angst, dass die eigenen Bedürfnisse ignoriert werden und man allein bleibt, solange andere nicht auf einen angewiesen sind. Selbstfürsorge wird als Selbstsucht empfunden.',
			growth_areas: [
				'Die eigenen körperlichen und emotionalen Bedürfnisse mit gleicher Sorgfalt erfüllen wie die anderer',
				'Erwarten, dass andere alles für sich selbst tun, was sie können',
				'Grenzen setzen, Nein sagen und Zeit sowie Prioritäten schützen',
				'Anderen erlauben, ebenfalls großzügig zu sein',
			],
		},
		warrior: {
			name: 'Krieger',
			description:
				'Der Krieger ist von einer starken Zielstrebigkeit getrieben und verfolgt seine Missionen mit Entschlossenheit. Er empfindet Stolz daran, Herausforderungen zu meistern, und wenn Hindernisse auftreten, verstärkt er sein Engagement, überzeugt davon, dass die Hartnäckigen triumphieren werden. Wettbewerbsorientiert kämpft er, um sich selbst sowie andere zu schützen oder führt Initiative für Kampagnen an',
			aliases: ['Soldat', 'Führsprecher', 'Wettkämpfer'],
			core_identity:
				'Setzt Ziele und erreicht sie, stellt sich Herausforderungen und schützt Grenzen. Überwindet Hindernisse durch Beharrlichkeit und glaubt, dass die Zähen siegen. Im besten Fall verkörpert dieser Archetyp Mut und Entschlossenheit, für Prinzipien einzustehen und das Notwendige zu tun, egal wie erschöpft oder ängstlich.',
			perception:
				'Nimmt Ungerechtigkeit und Hilfsbedürftige wahr, erkennt Herausforderungen, die gemeistert werden müssen, Gegner, die besiegt werden müssen, und Siege, die errungen werden können. Kennt die Strategien, um stark und kompetent zu werden.',
			life_plot:
				'Ein Kampf, der Können, Stärke und Mut erfordert. Erste Reaktion bei Problemen: länger und härter dasselbe tun. Oft erfordert eine größere Herausforderung einen Strategiewechsel, denn Beharrlichkeit allein reicht nicht immer aus.',
			fulfilling_activities:
				'Andere coachen, zielorientierte Gruppen aufbauen, Strategien für Erfolg entwickeln. Bevorzugt klare Strukturen mit eindeutiger Führung, klaren Ergebnissen und Erwartungen, sodass alle wissen, was zu tun ist.',
			happiness_source:
				'Auf ein Ziel zubewegen, je herausfordernder, desto besser. Im Prozess herausfinden, wozu man fähig ist. Großes Wohlbefinden entsteht, wenn der Erfolg mit dem eigenen Ehrenkodex übereinstimmt.',
			leadership_style:
				'Hervorragend in Zielsetzung und Umsetzung. Motiviert andere zu Höchstleistungen. Fokussiert auf Stärken und Schwächen. Tendiert zu klaren Entweder-oder-Szenarien und zu strategischen Plänen mit klar definierten Verantwortlichkeiten.',
			how_others_see_them:
				'Stärke, Entschlossenheit und Mut werden bewundert. Nahestehende sorgen sich um Burnout oder mangelnden Gefühlsausdruck. Bei übersteigertem Selbstvertrauen wirkt der Warrior arrogant oder einschüchternd, sodass andere schmeicheln statt die Wahrheit zu sagen.',
			shadow_tendencies:
				'Neigt zu Schwarz-Weiß-Denken und unnötigen Kämpfen. Braucht Feinde für die Kriegergeschichte, was die Gefahr des Sündenbockdenkens birgt. Kann Beiträge von Wesen, die als schwach gelten, leicht übersehen.',
			underlying_fear:
				'Angst vor Machtlosigkeit, die Versagen mit Schande verbindet. Zeigt sich als Widerstand, Schwäche oder Unwissen zuzugeben. In extremen Fällen: Einschüchterung oder Mobbing, um eigene Grenzen zu verbergen, und das Projizieren unerwünschter Eigenschaften auf andere.',
			growth_areas: [
				'Erkennen, dass nicht jede Situation kämpferisch oder kompetitiv sein muss',
				'Ruhe und Entspannung suchen, um gesund zu bleiben',
				'Verletzlichkeiten eingestehen und Angst sowie Schmerz zulassen',
				'Verursachten Schaden anerkennen und wiedergutmachen',
				'Komplexeres Denken als bloßes Entweder-oder kultivieren, um Win-win-Lösungen zu finden',
			],
		},
		seeker: {
			name: 'Suchender',
			description:
				'Der Suchende ist von einem tiefen Drang getrieben, sich selbst zu entdecken und weiterzuentwickeln. Sein Blick richtet sich stets nach der Zukunft. Er nimmt Neues schnell auf und verliert das Interesse an Überholten und Gewöhnlichen. Abenteuer, neue Erfahrungen sowie persönliche Wachstumschancen bereiten ihm Freude, denn er betrachtet das Leben als eine fortlaufende Reise des Erkundens',
			aliases: ['Entdecker', 'Wanderer', 'Pionier'],
			core_identity:
				'Wünscht sich Freiheit zu erkunden und Authentizität zu finden und auszudrücken. Abenteuerlustig, bahnbrechend und formsprengend. Möchte kein langweiliges, begrenztes Leben führen. Im besten Fall ein freier Geist, der mit Neugier und Offenheit das Unbekannte erkundet.',
			perception:
				'Nimmt das Neue und Fremdartige wahr. Spürt unbefriedigende oder einschränkende Aspekte des gegenwärtigen Lebens. Die Erkundung kann physisch, intellektuell, emotional oder spirituell sein. Betont in Gruppen die eigene Einzigartigkeit, um sich selbst nicht zu verlieren.',
			life_plot:
				'Suche nach vielfältigen Erfahrungen auf einer Reise oder Quest. Beginnt mit Unzufriedenheit mit dem Status quo. Führt über anfängliches zielloses Wandern zu Selbstentwicklung. Wird zum Pionier auf neuen Pfaden und bahnt damit auch für andere den Weg.',
			fulfilling_activities:
				'Pionier oder Kundschafter sein, neue Wege erkunden, die Selbstverbesserung ermöglichen. Gerne in Bewegung, wenn nicht physisch, dann mental, emotional oder spirituell. Ehrgeizig, aber nicht konventionell: tritt eher gegen sich selbst als gegen andere an.',
			happiness_source:
				'Das Gefühl, uneingeschränkt zu sein und sich ständig weiterzuentwickeln. Bedeutung im Brechen von Grenzen und im Bahnen neuer Wege für andere. Neue Ebenen der Selbsterkenntnis und der Ausdruck des authentischen Selbst.',
			leadership_style:
				'Hochgradig unabhängig und individualistisch. Gut in divergentem Denken. Gibt anderen Freiheit, solange Ergebnisse erzielt werden. Stärke darin, neue Ideen aus unerwarteten Quellen zu finden und zurückzubringen.',
			how_others_see_them:
				'Abenteuerlust, Integrität, Individualität und Engagement für Authentizität werden geschätzt. Andere wünschen sich manchmal mehr Offenheit für dauerhafte Verbindungen und mehr Bereitschaft für Routineaufgaben.',
			shadow_tendencies:
				'Kann Vertraute und Weggefährten verlieren, weil andere sich durch das Freiheitsbedürfnis verlassen fühlen. Zu viel Fokus auf Differenzierung kann Entfremdung erzeugen. Der Fokus auf das Neue kann alltägliche Wunder übersehen lassen.',
			underlying_fear:
				'Angst, dass das Akzeptieren des gegenwärtigen Moments Langeweile oder Sinnlosigkeit bringt. Die Angst vor Stille kann tiefere Ängste vor innerer Leere verbergen. Der heilige Gral wird nie da draußen gefunden.',
			growth_areas: [
				'Kontakt zu wirklich geschätzten Gefährtinnen und Gefährten halten',
				'Gewöhnliche Freuden hier und jetzt wahrnehmen',
				'Erkennen, dass man dazugehören und trotzdem einzigartig sein kann',
				'Lernen, Langeweile zumindest zeitweise zu tolerieren',
			],
		},
		lover: {
			name: 'Liebender',
			description:
				'Der Liebende ist von dem Streben nach Verbindung und Beziehungen getrieben. Er wird leicht leidenschaftlich und sei es für eine andere Person, eine Aktivität oder ein Ideal. Sinnlich und lebendig lässt er sein Herz die Führung übernehmen und wählt Tätigkeiten, Berufe, Besitztümer sowie Beziehungen, die seinem Leben Schönheit verleihen',
			aliases: ['Friedensstifter', 'Gefährte', 'Romantiker'],
			core_identity:
				'Priorisiert Verbindung und Beziehungen, lässt das Herz den Weg weisen. Wählt Aktivitäten, Aufgaben und Beziehungen, die dem Leben Schönheit und Freude verleihen. Im besten Fall voller Vitalität und Liebe für andere und das Leben, mit einem Talent, Wesen füreinander zu begeistern.',
			perception:
				'Nimmt Wege wahr, Wesen zu verbinden, schöne Umgebungen zu schaffen und Gegenseitigkeit zu fördern. Kann die Bedeutung rein funktionaler Dinge oder Wesen ohne Charme übersehen. Erkennt im Laufe der Zeit, wo es sicher ist, die eigene Verletzlichkeit zu zeigen.',
			life_plot:
				'Drang zur Verbindung und dem Wunsch, sich in einer Beziehung zu engagieren. Bei Problemen: Fokus auf zerbrochene Beziehungen und deren Heilung. Lernt im Laufe der Zeit, Unvollkommenheit zu akzeptieren und echte Wesen zu lieben, nicht idealisierte.',
			fulfilling_activities:
				'Kollaborative Lösungen suchen. Situationen schaffen, die anderen das Ekstatische oder zumindest das Besondere spüren lassen. Versöhnungen arrangieren, weil jede Perspektive wirklich verstanden wird.',
			happiness_source:
				'Sinnlichkeit in all ihren Formen: Berührung, Geschmack, Geruch, Anblicke und das Erleben des Lebens. Erlebnisse der Einheit mit anderen, der Natur und dem Universum. Leidenschaftliche Verbindung, die erwidert wird, aber auch tiefe Zuneigung zu Tätigkeiten, Wesen oder schönen Umgebungen.',
			leadership_style:
				'Leidenschaft mobilisiert Begeisterung, sodass andere gerne hart arbeiten. Stärke im Aufbau von Gemeinschaften und im Schaffen echter Qualitätserfahrungen. Natürlicher Coach durch provokante Fragen. Aufmerksam für Gruppenkultur und zwischenweltliche Dynamiken.',
			how_others_see_them:
				'Liebevolle Art, Leidenschaft und Freundlichkeit werden geschätzt, manchmal idealisiert. Kann als eitel, cliquenhaft oder überdramatisch wahrgenommen werden.',
			shadow_tendencies:
				'Kann sich selbst im Wunsch zu gefallen verlieren. Neigt dazu, sich schnell zu begeistern und das Interesse zu verlieren, wenn die echte Seite einer anderen Person sichtbar wird, und lässt andere dann plötzlich und ohne Erklärung fallen. Tendenz zur Dramatik.',
			underlying_fear:
				'Angst vor Einsamkeit oder innerer Leere. Kann zu vorschnellen Bindungen führen oder zu Klammern, was wiederum andere vertreibt.',
			growth_areas: [
				'Werte bezüglich Nähe und Freundschaft klären und gesunde Grenzen halten',
				'Sinnlichkeit in allen Lebensbereichen ausdrücken, auch im Gewöhnlichen',
				'Langfristiges Engagement für das Wohl anderer über erste Begeisterung hinaus eingehen',
				'Unabhängige Identität und Selbstwertgefühl kultivieren',
				'Humor bewahren, um Schwierigkeiten nicht zu dramatisieren',
			],
		},
		revolutionary: {
			name: 'Revolutionär',
			description:
				'Im Kern des Revolutionärs steht ein Nonkonformist, der bestehende Regeln und den Status quo in Frage stellt und häufig auch veränderte. Die Aussagen „So ist das immer schon gemacht“ oder „Alle anderen handeln bzw. denken so“ wecken Misstrauen und ein Gefühl von Einschränkung. Er besitzt die Kraft, einschränkende Überzeugungen und Gewohnheiten loszulassen und damit neue Wege zu gehen',
			aliases: ['Rebell', 'Spielveränderer', 'Zerstörer'],
			core_identity:
				'Hinterfragt Regeln und den Status quo. Konventionen erzeugen das Gefühl, eingeengt oder gefangen zu sein. Im besten Fall geleitet von einer Vision einer besseren Welt. Ein Ikonoklast, der persönliche Risiken eingeht, um ein besseres Leben zu schaffen, nicht irgendwann, sondern jetzt.',
			perception:
				'Fokussiert auf drohende Bedrohungen und Mittel, ihnen ein Ende zu setzen. Nimmt Ungerechtigkeit und Inkompetenz wahr und arbeitet an radikaler Veränderung. Kann dabei Empörung ausdrücken und sogar jene mobilisieren, die den Status quo bisher mochten.',
			life_plot:
				'Ähnelt einer Operation, die einen Fremdkörper entfernt. Identifiziert, was Wachstum blockiert oder bedroht, und entfernt es auf jede mögliche Weise. Bricht Regeln, wenn diese als ungerecht empfunden werden. Im besten Fall: Loslassen von selbstschädigenden Gewohnheiten.',
			fulfilling_activities:
				'Veraltete oder dysfunktionale Verhaltensweisen oder Systeme eliminieren und andere für diese Anliegen gewinnen. Findet auch Freude am bloßen Stören des Status quo oder daran aufzuzeigen, was geändert werden muss.',
			happiness_source:
				'Herausforderungen begegnen, die andere abschrecken, und sie in ein besseres Leben führen. Keine Angst vor dem Unbekannten: findet Freude in den transformativen Prozessen von Verfall und Neuanfang.',
			leadership_style:
				'Gut in der Neugestaltung von Strukturen durch Abbau von Programmen, die nicht mehr dienen, und Beendigung erfolgloser Vorhaben. Hält Qualitätsstandards durch Rechenschaftspflicht aufrecht. Kann Begeisterung für Innovation wecken und dabei Veränderungsängste dämpfen.',
			how_others_see_them:
				'Problemlösungsfähigkeit, Vision und Mut werden bewundert. Wenn es darauf ankommt, meiden andere die Assoziation mit dem Revolutionary aus Angst vor Konsequenzen oder dem entstehenden Chaos.',
			shadow_tendencies:
				'Neigt dazu, das Brechen ethischer oder rechtlicher Regeln zu rationalisieren, weil der Zweck die Mittel heiligt. Kann zu leicht zum Gesetzlosen werden. Zeigt keine Verletzlichkeit oder Lücken in Plänen, um das Vertrauen im Chaos aufrechtzuerhalten.',
			underlying_fear:
				'Angst, in einem dysfunktionalen System oder von einer mächtigen Instanz gefangen oder misshandelt zu werden. Kann ungelöste Wut aus früheren Traumata ausagieren. Ohne etwas zu bekämpfen droht existenzielle Verzweiflung oder Apathie.',
			growth_areas: [
				'Ein klares Gespür für persönliche Ethik entwickeln',
				'Natürliche Transformationsprozesse wie Entstehung, Reifung und Vergehen studieren',
				'Wahrscheinliche Konsequenzen des eigenen Handelns für sich und andere antizipieren',
				'Erkennen, dass große Veränderungen Zeit brauchen',
				'Prüfen, ob schrittweise Veränderung manchmal ausreichen könnte',
			],
		},
		creator: {
			name: 'Schöpfer',
			description:
				'Der Schöpfer ist von Natur aus ein Visionär und lebt von einer anhaltenden Vorstellungskraft. Er denkt ständig über neue Möglichkeiten nach. Manchmal fließen die Ideen mühelos, als würde er sie wie eine Antenne aufnehmen. In der Lage, diese Konzepte greifbar zu machen, bringt er sie in Kunst, Schreiben, Design oder Erfindungen zum Ausdruck',
			aliases: ['Künstler', 'Erfinder', 'Innovator'],
			core_identity:
				'Geht davon aus, dass alles, was vorgestellt werden kann, auch erschaffen werden kann. Von Natur aus fantasievoll und inspiriert. Im besten Fall denkt dieser Archetyp ständig in neuen Möglichkeiten, mit Ideen, die manchmal mühelos fließen, als wäre man ein Kanal und nicht nur der Autor.',
			perception:
				'Sieht Möglichkeiten auch in alltäglichen Dingen. Erkennt Verbindungen zwischen scheinbar unzusammenhängenden Ideen. Drückt Kreativität und Einzigartigkeit auch in Kleidung, Heimdekoration oder der Gestaltung des eigenen Raums aus.',
			life_plot:
				'Beginnt mit einer Vision und dem Lernen, sie zu verwirklichen, als Künstlerin oder Künstler, als Erfinderin oder Erfinder, als Unternehmerin oder Unternehmer, oder als bewusste Schöpferin des eigenen Lebens. Herausforderungen: Frustration über mangelndes Können, fehlende Wertschätzung und Schwierigkeiten, einen Markt für das eigene Talent zu finden.',
			fulfilling_activities:
				'Ausdruck der kreativen Vision ermöglichen. Originalität in die Welt einbringen oder einfach etwas funktional Schönes schaffen. Kreativität auf alle Lebensbereiche ausweiten und Schönheit sowie Neuheit ins Alltägliche bringen.',
			happiness_source:
				'Wenn das Erschaffene die eigene Vision wirklich widerspiegelt. Wenn andere die kreativen Leistungen schätzen, fühlt sich der Creator bestätigt, denn ein Teil von ihm spiegelt sich in jedem Werk. Der kreative Prozess und eine erweckte Vorstellungskraft sind an sich schon genussvoll.',
			leadership_style:
				'Unternehmerisch. Hervorragend in der Gestaltung eleganter Produkte, Prozesse oder Umgebungen. Leicht gelangweilt von Routine: delegiert oder findet einfallsreiche Wege für Alltagsaufgaben. Übergibt entwickelte Projekte lieber anderen und widmet sich dem nächsten.',
			how_others_see_them:
				'Vorstellungskraft und Geschmack werden bewundert und beneidet, obwohl viele nicht ahnen, wie viel Einsatz dahintersteckt. Reagiert besonders verletzt, wenn andere kreative Arbeit rein monetär bewerten.',
			shadow_tendencies:
				'Kann das Leben auf Rohmaterial für das eigene Schaffen reduzieren. Durch zu viele Projekte überfordert werden. Eine ausgeprägte innere Kritik bemerkt jeden Fehler und führt zu Unzufriedenheit. In stillen Phasen droht die Angst, die Inspiration sei verloren.',
			underlying_fear:
				'Angst loszulassen, ein perfektionistischer Zug und die Verzweiflung, dass Inspiration nie zurückkehrt. Schwierigkeit, Werke der Welt zu übergeben, aus Angst, nicht geschätzt, nicht gut genug oder missverstanden zu werden.',
			growth_areas: [
				'Auf einfallsreiche Ideen handeln, nicht nur davon träumen',
				'Den inneren Kritiker zähmen',
				'Daran erinnern, dass alles Wertvolle Zeit braucht',
				'Kreativität mit Verantwortungsbewusstsein ausbalancieren und Selbstverwöhnung vermeiden',
				'Treue zur eigenen Vision mit den Realitäten des Alltags und dem Lebensunterhalt in Einklang bringen',
			],
		},
		ruler: {
			name: 'Herrscher',
			description:
				'Der Herrscher zieht sich von Macht angezogen und lenkt diese gezielt ein, um Ziele zu erreichen, Ordnung zu bewahren und die guten Unternehmungen seiner Gemeinschaft voranzutreiben. Er erkennt mühelos, wer wem unterstellt ist und welche Hierarchien innerhalb verschiedener Gruppen existieren. Der Wunsch nach Kontrolle begleitet ihn, während er gleichzeitig bereitwillig Verantwortung übernimmt',
			aliases: ['König:in', 'Boss', 'Autokrat'],
			core_identity:
				'Geht davon aus, Kontrolle zum eigenen Wohl und dem anderer ausüben zu sollen. Wird von Macht angezogen und frustriert, wenn Unfähigkeit zu Chaos oder Stillstand führt. Im besten Fall besitzt dieser Archetyp Expertise in sozialer Organisation und weiß, wann man eingreifen und wann man einen effektiven Prozess laufen lassen soll.',
			perception:
				'Nimmt die Werkzeuge und Zeichen der Macht wahr und weiß, wo die Autorität liegt. Aufmerksam dafür, wie Status, Ansehen und Prestige Macht stärken oder untergraben. Verfolgt politische Dynamiken in sozialen Systemen.',
			life_plot:
				'Verantwortung für das eigene Leben übernehmen und schrittweise Führungserfahrung aufbauen, von der eigenen Gruppe bis zu größeren Gemeinschaften. Bei Problemen: Richtlinien, Verfahren und Systeme einführen, um aktuelle Herausforderungen zu lösen und künftige zu vermeiden.',
			fulfilling_activities:
				'Situationen einschätzen, Entscheidungen treffen und produktive Aktivitäten organisieren, von oben herab oder durch Einbindung und Entwicklung anderer. Weiß, dass gesunde soziale Gefüge jemanden brauchen, der Verantwortung übernimmt. Findet Erfüllung darin, andere zu rekrutieren, zu fördern und zu coachen.',
			happiness_source:
				'Strategieren über die beste Nutzung und den Schutz von Autorität. Andere mentorieren. Am Ende eines langen Tages die Gewissheit, dass vieles ohne einen nicht so gut gelaufen wäre. Stolz darauf, als Führungspersönlichkeit anerkannt zu werden.',
			leadership_style:
				'Gut darin, Strukturen, Richtlinien und Verfahren einzurichten. Hervorragend im Netzwerken und in politischen Prozessen. Pflichtbewusst: erledigt auch unangenehme Aufgaben und repräsentiert auch dann, wenn es nicht gelegen kommt.',
			how_others_see_them:
				'Wer weiß, wie man die Dinge in die Hand nimmt, wird geschätzt. Andere können die Autorität beneiden und untergraben oder schmeicheln, um sich in die Gunst zu setzen. Der Ruler muss stark und kompetent wirken, darf aber nicht zu harsch, diktatorisch oder rachsüchtig sein.',
			shadow_tendencies:
				'Neigt dazu, die Autorität anderer zu untergraben, Verbündete zu entfremden oder andere zu mikromanagen. Kann Beiträge von statusarmen Wesen übersehen. Gefahr von Machtmissbrauch, Anspruchsdenken und dem Gefühl, anderen überlegen zu sein.',
			underlying_fear:
				'Angst, dass Dinge auseinanderfallen und Chaos entsteht. Führt zu Überkompensation durch Kontrolle und Dominanz. Kann Meinungsverschiedenheiten als Bedrohung der eigenen Macht missverstehen oder so viele Regeln einführen, dass nichts mehr funktioniert.',
			growth_areas: [
				'Sich verpflichten, im Sinne aller zu handeln',
				'Demut kultivieren und der Stärke anderer vertrauen',
				'Durch Inspiration motivieren, nicht durch Zwang',
				'Macht für andere und gemeinsam mit anderen entwickeln, statt über andere',
			],
		},
		magician: {
			name: 'Magier',
			description:
				'Der Magier erkennt, dass die Realität eines Menschen durch seine Überzeugungen bestimmt wird. Er nimmt die Verbundenheit von Ereignissen, Personen und Ideen wahr, bemerkt Schicksalsschläge, bedeutungsvolle Verbindungen sowie die Welleneffekte kleiner Veränderungen. Durch das Gestalten neuer Wahrnehmungen schafft er Wandel und das sowohl in sich selbst als auch bei anderen',
			aliases: ['Alchemist', 'Visionär', 'Heiler'],
			core_identity:
				'Erkennt, dass das Verständnis von Realität durch das geformt wird, was wahrgenommen werden kann, und sucht ständig, das Verständnis der Existenz zu erweitern. Im besten Fall eine transformative und heilende Präsenz, die andere hinter einer gemeinsamen Vision vereint und diese Vision Wirklichkeit werden lässt.',
			perception:
				'Nimmt Serendipität, Synchronizität, die Wechselwirkung von Ereignissen im großen Bild und Kettenreaktionen scheinbar kleiner Veränderungen wahr. In der Lage, Muster zu erkennen und Ereignisse zu deuten, die anderen zufällig erscheinen.',
			life_plot:
				'Beginnt mit dem Bedürfnis, vorgefasste Meinungen zu hinterfragen und Situationen neu zu rahmen. Bei Problemen: Zuerst die eigene Haltung ändern, Perspektiven erweitern und Verhaltensweisen anpassen, um Welleneffekte zu erzeugen. Vertraut darauf, dass klare, am Wohl aller ausgerichtete Absichten sich erfüllen.',
			fulfilling_activities:
				'Als Akteur für Heilung oder Transformation wirken. Positiven Wandel in sich selbst, in anderen, in Gruppen und Institutionen beeinflussen. Glaubt, dass scheinbar Wunderbares möglich ist, wenn Wesen mehr über die Zusammenhänge von Natur, Geist und Seele verstehen.',
			happiness_source:
				'Situationen neu rahmen, sodass Möglichkeiten und Optionen entstehen. Erfüllung darin, ein System mit kleinen Eingriffen positiv zu beeinflussen. Aufrichtige Freude darin, verstecktes Potenzial in anderen zu sehen und zur Entfaltung zu bringen.',
			leadership_style:
				'Visionär, der andere inspiriert, ihren tieferen Werten treu zu sein und gemeinsam Träume zu verwirklichen. Schafft flexible Strukturen und synergistische Partnerschaften, deren Ganzes mehr ist als die Summe der Teile. Nutzt alle verfügbaren Ressourcen, indem er wahrnimmt, was andere übersehen.',
			how_others_see_them:
				'Charisma und Vision werden geschätzt, aber auch die Fähigkeiten und der Einfluss des Magicians können Misstrauen hervorrufen. Andere befürchten manchmal, manipuliert oder in eine Falle gelockt zu werden.',
			shadow_tendencies:
				'Neigt dazu, Gurus zu verfallen oder selbst einen zu spielen. Kann wie ein Zauberlehrling Unordnung hinterlassen, indem die eigenen Fähigkeiten überschätzt werden. Gefahr der Hybris, das Gefühl zu entwickeln, ein besonderes Wesen zu sein, für das normale Regeln nicht gelten.',
			underlying_fear:
				'Angst, mit der Kraft von Wissen und Transformation umzugehen, als Deckmantel für die Angst vor vollständiger Machtlosigkeit. Wissen zu nutzen, um andere zu manipulieren, ist eine Versuchung, der widerstanden werden muss.',
			growth_areas: [
				'Einen nüchternen Ansatz für Transformation entwickeln',
				'Andere so akzeptieren, wie sie sind, ohne den Drang, sie zu verändern',
				'Demütig bleiben und Nebenwirkungen gut gemeinter Handlungen im Blick behalten',
				'Durch Alltagsarbeit und Zeit in der Natur geerdet bleiben',
				'Teil einer Gemeinschaft sein, die ehrliches Feedback gibt',
			],
		},
		sage: {
			name: 'Weiser',
			description:
				'Der Weise besitzt eine tiefgreifende Neugier für zahlreiche Themen und betrachtet das Leben als fortlaufenden Lernprozess. Andere sehen ihn als sachkundig an. Die Suche nach Erkenntnis selbst gilt als befriedigende Belohnung. Er bleibt ruhig und unerschütterlich, strebt danach, Situationen zu verstehen, um anschließend Wissen weiterzugeben oder Ratschläge anzubieten',
			aliases: ['Ermittler', 'Lehrer', 'Experte'],
			core_identity:
				'Geht davon aus, dass die meisten Dinge mit Ausdauer verstanden werden können. Im besten Fall nicht nur wissend, sondern weise. Wunderbar neugierig, liebt es zu denken und strebt danach, Vorurteile herauszufiltern und so objektiv und fair wie möglich zu sein.',
			perception:
				'Nimmt Denkfehler wahr und weiß, wie leicht man in Denkgewohnheiten gefangen wird. Bedächtigkeit kann zu langsamen Reaktionen führen, wenn keine Dringlichkeit besteht. Kann relative Wahrheiten in ihrem Kontext einschätzen, auch angesichts der Erkenntnis, dass nichts mit absoluter Gewissheit gewusst werden kann.',
			life_plot:
				'Dreht sich um die Neugier, etwas herauszufinden. Beginnt mit einem rätselhaften Fakt oder Ereignis. Als Gelehrte und Detektiv verfolgt der Sage hartnäckig die Wahrheit und teilt seine Erkenntnisse mit anderen, nicht nur als Pädagogin oder Pädagoge, sondern auch als Detektiv, Journalist oder Beraterin.',
			fulfilling_activities:
				'Über Ideen und die Welt lernen. Diszipliniertes, komplexes Denken, das zur Entwicklung von Theorien führt. Liebt es, kollektives Wissen voranzubringen, wenn auch nur um ein kleines Stück, und Wissen an andere weiterzugeben.',
			happiness_source:
				'Mental herausfordernde und bereichernde Aktivitäten. Wissen um des Wissens willen. Erfüllung in der Suche nach Wahrheit, tiefem Verstehen und dem Enträtseln von Geheimnissen. Freude daran, Erkenntnisse weiterzugeben und zum Gemeinwohl beizutragen.',
			leadership_style:
				'Hervorragend in leidenschaftsloser Analyse, Planung und Evaluation. Kann in Krisenzeiten loslassen, das große Bild sehen und die lange Perspektive einnehmen. Hat eine beruhigende Wirkung und erkennt nuancierte Emotionen in Entscheidungsprozessen.',
			how_others_see_them:
				'Intelligenz und Expertise werden geschätzt. Andere suchen den Sage als Ratgeber auf. Wird als klug und scharfsinnig angesehen, als Expertin oder Experte, als Lehrende oder als Mentorin.',
			shadow_tendencies:
				'Neigt zu Dogmatismus und Sturheit, mit Geringschätzung für das gewöhnliche Leben. Kann den Körper wie ein bloßes Vehikel für den Verstand behandeln. Die scharfe Fähigkeit, Fehler zu sehen, kann einen negativen oder zynischen Charakter annehmen. Verteidigt bisweilen widerlegte Überzeugungen zum Schutz des eigenen Ansehens.',
			underlying_fear:
				'Angst vor Chaos und fehlender Gewissheit. Der Versuch zu verstehen kann auch von einem Bedürfnis nach intellektueller Vorhersehbarkeit getrieben sein. Hochtrabende Begriffe und esoterisches Wissen können tief sitzendes Unzulänglichkeitsgefühl kompensieren.',
			growth_areas: [
				'Dogmatismus vermeiden und offen für neue Erkenntnisse bleiben',
				'Auf das achten, was in der Praxis funktioniert, nicht nur auf intellektuelle Eleganz',
				'Einfach kommunizieren, ohne Expertise zur Schau zu stellen',
				'Intuitive und körperliche Weisheit kultivieren',
			],
		},
		jester: {
			name: 'Narr',
			description:
				'Der Narr schätzt Humor und Lebensfreude als zentrale Werte. Er erkennt mühelos die Widersprüchlichkeit, Absurdität und Ironie des Alltags, ohne jedoch gezwungen zu sein, diese zu verändern. Ob er innerlich kichert oder aktiv Fröhlichkeit und Lachen anstößt. Er genießt es, das Vergnügen für sich selbst sowie für andere zu fördern',
			aliases: ['Unterhaltungskünstler', 'Trickser', 'Spaßvogel'],
			core_identity:
				'Glaubt, dass das Leben genossen werden soll, und trifft Entscheidungen danach, was am meisten Freude macht. Implizit unkonventionell, respektlos gegenüber Konventionen und scheinbar unbeeindruckt davon, was andere denken. Im besten Fall glücklich, verspielt, witzig und eine Freude in der Gesellschaft, auch in schwierigen Zeiten.',
			perception:
				'Findet Chancen für Spaß in fast jeder Situation. Findet einfallsreiche Wege um Hindernisse und schätzt die Absurditäten des Lebens, die letztlich zu unvergesslichen Geschichten werden.',
			life_plot:
				'Beginnt mit Frustration in langweiligen, eingeschränkten Situationen oder dort, wo jene an der Macht sich lächerlich verhalten. Der Jester handelt, um Absurdität zu enthüllen, die Lage aufzulockern und Lachen zu erzeugen. Nutzt Satire, um mit einer gewissen Straffreiheit auszusprechen, was andere nicht hören wollen. Denkt außerhalb ausgetretener Pfade, um amüsante Wege durch schwierige Situationen zu finden.',
			fulfilling_activities:
				'Freizeitaktivitäten genießen, verspielt und erfinderisch sein und andere zum Mitmachen bewegen. Brainstorming genießen, besonders wilde Ideen, die den Geist befreien. Im Trickster-Modus andere harmlos in die Irre führen, damit sie das Richtige tun.',
			happiness_source:
				'Ironie und Humor des Lebens. Wie ein Wesen, das auf Entdeckungsreise geht, zu neuen Erfahrungen hingezogen werden, je mehr, desto besser. Erfüllung darin, andere von Illusionen oder Niedergeschlagenheit zu befreien, die ein begrenztes Weltbild erzeugt, oft durch Spiel.',
			leadership_style:
				'Gut darin, Widersprüche und Probleme auf ungewöhnliche Weise zu lösen. Brainstorming und das Aufrechterhalten hoher Moral. Bringt Humor und Leichtigkeit ins Team, sodass andere gerne zur Arbeit erscheinen. Hält die Energie auch in anspruchsvollen Zeiten durch spielerische Elemente hoch.',
			how_others_see_them:
				'Humor und Lebendigkeit werden geschätzt, besonders sanfter Humor, der anderen hilft, das eigene Verhalten zu erkennen. Andere wünschen sich bisweilen, der Jester würde sich beruhigen, Dinge ernst nehmen und Regeln folgen. Wenn er sich in schwierigen Zeiten durchmogelt, ist es schwer, ihn zu unterstützen.',
			shadow_tendencies:
				'Neigt zu Verantwortungslosigkeit, Ausschweifung oder schlechten Streichen, die andere wirklich verletzen können. Nimmt sich selbst nicht ernst genug, um Träume zu verwirklichen oder stabil zu bleiben. Kann andere in ihrem Schmerz und Kämpfen unbeabsichtigt abweisen.',
			underlying_fear:
				'Angst vor den vermeintlichen Fesseln von Langeweile und Verantwortung sowie davor, zu versagen oder andere zu enttäuschen. Wenn andere den Jester nicht ernst nehmen, verlassen sie sich nicht auf ihn, und er muss niemanden enttäuschen. Am meisten fürchtet er, das Leben zu verpassen.',
			growth_areas: [
				'Verantwortlichkeiten erfüllen, auch langweilige',
				'Wege finden, auch Routinearbeit Spaß zu machen',
				'Eigene Werte klären und schützen, was wertvoll ist',
				'Maßhalten und gesunden Verstand üben',
				'Bereit sein, unangenehme Gefühle und ernste Situationen zu konfrontieren',
			],
		},
		none: {
			name: 'Kein Archetyp',
			description: 'Es wurde kein Archetyp ausgewählt',
			aliases: [''],
			core_identity: '',
			perception: '',
			life_plot: '',
			fulfilling_activities: '',
			happiness_source: '',
			leadership_style: '',
			how_others_see_them: '',
			shadow_tendencies: '',
			underlying_fear: '',
			growth_areas: [''],
		},
	};
	return archetypeMapping[archetype];
}