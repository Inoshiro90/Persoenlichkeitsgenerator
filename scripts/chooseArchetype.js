// function chooseArchetype() {
// 	let archetype;
// 	//Archetyp aus der Liste mit id="dropdown-archetype" wählen
// 	//Bei Element mit id="random" einen zufälligen Archetyp auswählen und id als archetype ausgeben
// 	//Bei Element mit id="none" keinen auswählen und id als archetype ausgeben
// 	//Bei allen anderen die id als archetype ausgeben
// 	console.log('Archetyp: ', archetype);
// 	return archetype;
// }

function chooseArchetype() {
	const select = document.getElementById("dropdown-archetype");
	const selectedOption = select.options[select.selectedIndex].id;

	if (selectedOption === "random") {
		const archetypes = Array.from(select.options)
			.map(opt => opt.id)
			.filter(id => id !== "random" && id !== "none");
		const randomIndex = Math.floor(Math.random() * archetypes.length);
		console.log("Archetyp: ", archetypes[randomIndex]);
		return archetypes[randomIndex];
	}

	console.log("Archetyp: ", selectedOption);
	return selectedOption;
}