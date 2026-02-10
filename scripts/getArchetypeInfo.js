function getArchetypeInfo(archetype) {
	const archetypeMapping = {
		idealist: {
			name: 'Idealist',
			description:
				'Beschreibung Idealist',
		},
		realist: {
			name: 'Realist',
			description: 'Beschreibung Realist',
		},
		caregiver: {
			name: 'Fürsorger',
			description: 'Beschreibung Fürsorger',
		},
		warrior: {
			name: 'Krieger',
			description: 'Beschreibung Krieger',
		},
		seeker: {
			name: 'Sucher',
			description: 'Beschreibung Sucher',
		},
		lover: {
			name: 'Liebhaber',
			description: 'Beschreibung Liebhaber',
		},
		creator: {
			name: 'Schöpfer',
			description: 'Beschreibung Schöpfer',
		},
		revolutionary: {
			name: 'Revolutionär',
			description: 'Beschreibung Revolutionär',
		},
		sage: {
			name: 'Weiser',
			description: 'Beschreibung Weiser',
		},
		magician: {
			name: 'Magier',
			description: 'Beschreibung Magier',
		},
		ruler: {
			name: 'Herrscher',
			description: 'Beschreibung Herrscher',
		},
		fool: {
			name: 'Narr',
			description: 'Beschreibung Narr',
		},
		none: {
			name: 'Kein Archetyp',
			description: 'Es wurde kein Archetyp ausgewählt.'
		}
	};
	return archetypeMapping[archetype];
}
