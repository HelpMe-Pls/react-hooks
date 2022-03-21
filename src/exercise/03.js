// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name({name, onNameChange}) {
	return (
		<div>
			<label htmlFor="name">Name: </label>
			<input id="name" value={name} onChange={onNameChange} />
		</div>
	)
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
	return (
		<div>
			<label htmlFor="animal">Favorite Animal: </label>
			<input id="animal" value={animal} onChange={onAnimalChange} />
		</div>
	)
}

function Display({name, animal}) {
	return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

function App() {
	// 🐨 Lifting the state: move the useState for the animal (originally from <FavoriteAnimal/>) so that its state is managed by its parent component (<App/>)
	const [name, setName] = React.useState('')
	const [animal, setAnimal] = React.useState('')

	return (
		<form>
			<Name
				name={name}
				onNameChange={event => setName(event.target.value)}
			/>
			{/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
			<FavoriteAnimal
				animal={animal}
				onAnimalChange={event => setAnimal(event.target.value)}
			/>
			{/* 🐨 pass the animal prop here */}
			<Display name={name} animal={animal} />
		</form>
	)
}

export default App
