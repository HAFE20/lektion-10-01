import { useState } from 'react'

const AnimalInfo = () => {
	/*
	Uppgift: gör om listan med strängar till en lista med objekt. Exempel:
	{ name: 'Panther', id: '123' }

	*/
	const [animals] = useState([
		'Panther', 'Dog', 'Otter', 'Leopard', 'Horse', 'Sheep', 'Cat', 'Manul'
	])

	/* Använd fragment om det inte finns ett naturligt (semantiskt) element att lägga innehållet i: <> */
	return (
		<section>
		<h2> Animal info </h2>
		<ul className="list">
			{animals.map(animal => (
				<li key={animal}>
					{animal}
				</li>
			))}
		</ul>
		</section>
	)
}

export default AnimalInfo
