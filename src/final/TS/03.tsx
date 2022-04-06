// Lifting state
// 💯 removing unnecessary controlled state
// http://localhost:3000/isolated/final/03.extra-2.tsx

import * as React from 'react'

/**
 * We’ve made the input “controlled” by providing the value and onChange props, but we’re not actually doing anything with that state and we’re not changing the value to anything that would be different from what the browser does by default.
 *
 * Just because you have an input doesn’t mean it needs to be controlled. You really only need a controlled input when you’re going to programmatically change the value of that input. Otherwise it’s just extra work for no benefit.
 */

function Name() {
	return (
		<div>
			<label htmlFor="name">Name: </label>
			<input id="name" />
		</div>
	)
}

function FavoriteAnimal({
	animal,
	onAnimalChange,
}: {
	animal: string
	onAnimalChange: (newAnimal: string) => void
}) {
	return (
		<div>
			<label htmlFor="animal">Favorite Animal: </label>
			<input
				id="animal"
				value={animal}
				onChange={event => onAnimalChange(event.currentTarget.value)}
			/>
		</div>
	)
}

function Display({animal}: {animal: string}) {
	return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
	const [animal, setAnimal] = React.useState('')
	return (
		<form>
			<Name />
			<FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
			<Display animal={animal} />
		</form>
	)
}

export {App}
