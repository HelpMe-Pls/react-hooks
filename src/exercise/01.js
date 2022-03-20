// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName}) {
	const [greeting, setGreeting] = React.useState(initialName)

	function handleChange(event) {
		setGreeting(event.target.value)
	}

	return (
		<div>
			<form>
				<label htmlFor="name">Name: </label>
				<input
					type="text"
					value={greeting}
					onChange={handleChange}
					id="name"
				/>
			</form>
			{greeting ? (
				<strong>Hello {greeting}</strong>
			) : (
				'Please type your name'
			)}
		</div>
	)
}

function App() {
	return <Greeting initialName="Random name" />
}

export default App
