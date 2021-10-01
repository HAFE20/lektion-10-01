import { useState } from 'react'

interface Animal {
	name: string;
	id: string;
}

const AnimalInfo = () => {
	/*
	Uppgift: gör om listan med strängar till en lista med objekt. Exempel:
	{ name: 'Panther', id: '123' }

	*/
	const [animals, setAnimals] = useState<Animal[]>([
		{ name: 'Panther', id: '123' },
		{ name: 'Dog', id: '124' },
		{ name: 'Otter', id: '125' },
		{ name: 'Leopard', id: '126' },
		{ name: 'Horse', id: '127' },
		{ name: 'Sheep', id: '128' },
		{ name: 'Cat', id: '129' },
		{ name: 'Manul', id: '130' }
	])
	const [newAnimalName, setNewAnimalName] = useState<string>('')
	const [newAnimalId, setNewAnimalId] = useState<string>('')


	// Validering av input
	// - tom sträng är inte okej
	// - inte lägga till samma djur två gånger
	const nameIsValid = newAnimalName !== '' && !animals.find(animal => animal.name === newAnimalName)

	const idIsValid = newAnimalId !== '' && !animals.find(animal => animal.id === newAnimalId)

	const canAddAnimal = nameIsValid && idIsValid
	// Att göra: ge visuell återkoppling till användaren
	// - grön ram runt fält med godkända värden
	// - röd ram runt fält med icke godkända värden


	// Strategi för att ändra ett värde i en lista
	// - användaren klickar på texten, ikon för en penna, t.ex...
	// - byt ut texten mot ett input-fält
	// - när användaren är färdig, uppdatera state-variabeln



	// Funktioner för att interagera med appen
	const removeAnimal = (id: string): void => {
		// Viktigt i React: skapa en ändrad kopia av arrayen, i stället för att ändra direkt i den
		const newArray = animals.filter(animal => animal.id !== id)
		setAnimals(newArray)
	}

	const addAnimal = (name: string, id: string): void => {
		// Använd spread operator för att kopiera en lista
		// array.push ändrar en befintlig lista, använd inte den med React
		const newAnimal = { name, id }
		const newArray = [ ...animals, newAnimal ]
		setAnimals(newArray)

		// Använd en "oneliner" om du känner dig bekväm med det
		// setAnimals([ ...animals, { name, id } ])
	}

	/* Använd fragment om det inte finns ett naturligt (semantiskt) element att lägga innehållet i: <> */
	return (
		<section>
		<h2> Animal info </h2>
		<ul className="list">
			{animals.map(animal => (
				<li key={animal.id}>
					<span>{animal.name}</span>
					<span onClick={() => removeAnimal(animal.id)}>🗑️</span>
				</li>
			))}
		</ul>
		<div>
			<input type="text" placeholder="Animal name"
				value={newAnimalName}
				onChange={event => setNewAnimalName(event.target.value)}
				/>
			<input type="text" placeholder="Animal id"
				value={newAnimalId}
				onChange={event => setNewAnimalId(event.target.value)}
				/>
			<button disabled={!canAddAnimal}
				onClick={() => addAnimal(newAnimalName, newAnimalId)}> Add new animal </button>
		</div>
		</section>
	)
}

export default AnimalInfo
