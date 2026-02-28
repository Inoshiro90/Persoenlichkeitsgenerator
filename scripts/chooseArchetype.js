function chooseArchetype() {
	const select = document.getElementById('dropdown-archetype');
	const selectedOption = select.options[select.selectedIndex].id;

	if (selectedOption === 'random') {
		const archetypes = Array.from(select.options)
			.map((opt) => opt.id)
			.filter((id) => id !== 'random' && id !== 'none');
		const randomIndex = Math.floor(Math.random() * archetypes.length);
		// console.log('Archetyp: ', archetypes[randomIndex]);
		return archetypes[randomIndex];
	}

	if (selectedOption === 'none') {
		return 'none';
	}

	// console.log('Archetyp: ', selectedOption);
	return selectedOption;
}
