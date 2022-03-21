// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const Name = () => {
	const [name, setName] = React.useState('')
	return (
		<div>
			<label htmlFor="name">Name: </label>
			<input
				id="name"
				value={name}
				onChange={event => setName(event.target.value)}
			/>
		</div>
	)
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
const FavoriteAnimal = ({animal, onAnimalChange}) => {
	return (
		<div>
			<label htmlFor="animal">Favorite Animal: </label>
			<input id="animal" value={animal} onChange={onAnimalChange} />
		</div>
	)
}

const Display = ({animal}) => {
	return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
	// 🐨 Lifting the state: move the useState for the animal (originally from <FavoriteAnimal/>) so that its state is managed by its parent component (<App/>)
	const [animal, setAnimal] = React.useState('')

	return (
		<form>
			<Name />
			<FavoriteAnimal
				animal={animal}
				onAnimalChange={event => setAnimal(event.target.value)}
			/>
			{/* 🐨 pass the animal prop here */}
			<Display animal={animal} />
		</form>
	)
}

export default App
