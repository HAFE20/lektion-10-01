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

	// Funktioner för att interagera med appen
	const removeAnimal = (id: string): void => {
		// Viktigt i React: skapa en ändrad kopia av arrayen, i stället för att ändra direkt i den
		const newArray = animals.filter(animal => animal.id !== id)
		setAnimals(newArray)
	}

	// Tips: använd spread operator för att kopiera en lista

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
			TODO: möjlighet att lägga till ett nytt element sist i listan
			<input type="text" />
		</div>
		</section>
	)
}

export default AnimalInfo
