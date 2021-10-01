import { useState } from 'react'
import './AnimalInfo.css'

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
		{ name: 'Panther', id: 'a123' },
		{ name: 'Dog', id: 'a124' },
		{ name: 'Otter', id: 'a125' },
		{ name: 'Leopard', id: 'a126' },
		{ name: 'Horse', id: 'a127' },
		{ name: 'Sheep', id: 'a128' },
		{ name: 'Cat', id: 'a129' },
		{ name: 'Manul', id: 'a130' }
	])
	const [newAnimalName, setNewAnimalName] = useState<string>('')
	const [newAnimalId, setNewAnimalId] = useState<string>('')
	const [editingAnimalId, setEditingAnimalId] = useState<string>('')
	const [editingName, setEditingName] = useState<string>('')


	// Validering av input
	// - tom sträng är inte okej
	// - inte lägga till samma djur två gånger
	const nameIsValid = newAnimalName !== '' && !animals.find(animal => animal.name === newAnimalName)

	const idIsValid = newAnimalId !== '' && !animals.find(animal => animal.id === newAnimalId)

	const canAddAnimal = nameIsValid && idIsValid

	const idValidationClass = idIsValid ? 'valid' : 'invalid'
	// Att göra: ge visuell återkoppling till användaren
	// - grön ram runt fält med godkända värden
	// - röd ram runt fält med icke godkända värden
	// Använd en state-variabel för att kontrollera om användaren "touchat" fältet. Visa inte rött/grönt förrän man touchat fältet.


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

	const editAnimal = (animal: Animal): void => {
		if( editingAnimalId === animal.id ) {
			// ta bort input
			setEditingAnimalId('')
			const newArray = animals.map(a => {
				if( animal.id === a.id ) {
					// id på objektet som ska ändras - returnera ett nytt objekt
					return { ...a, name: editingName }
				} else {
					// returnera objektet oförändrat
					return a
				}
			})
			setAnimals(newArray)
		} else {
			// visa input
			setEditingAnimalId(animal.id)
			setEditingName(animal.name)
		}
	}

	/* Använd fragment om det inte finns ett naturligt (semantiskt) element att lägga innehållet i: <> */
	return (
		<section className="animal-info">
		<h2> Animal info </h2>
		<ul className="list">
			{animals.map(animal => (
				/* Koden kan förenklas genom att flytta ut li-elementet till en egen komponent */
				<li key={animal.id}>
					<span>{
						editingAnimalId === animal.id
							? <input type="text" placeholder="Animal name"
								value={editingName}
								onChange={event => setEditingName(event.target.value)} />
							: animal.name
					}</span>
					<span onClick={() => editAnimal(animal)}>🖊️</span>
					<span onClick={() => removeAnimal(animal.id)}>🗑️</span>
				</li>
			))}
		</ul>
		<div className="column">
			<input type="text" placeholder="Animal name"
				className={nameIsValid ? 'valid' : 'invalid'}
				value={newAnimalName}
				onChange={event => setNewAnimalName(event.target.value)}
				/>
			<input type="text" placeholder="Animal id"
				className={idValidationClass}
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
