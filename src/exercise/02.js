// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = (key, initialValue = '') => {
	const [name, setName] = React.useState(
		() => window.localStorage.getItem(key) ?? initialValue,
	)

	// 🐨 Here's where you'll use `React.useEffect`.
	// The callback should set the `name` in localStorage.
	React.useEffect(() => {
		window.localStorage.setItem(key, name)
	}, [key, name])
	return [name, setName]
}

function Greeting({initialName = ''}) {
	// 🐨 initialize the state to the value from custom hook
	const [greeting, setGreeting] = useLocalStorageState('name', initialName)

	function handleChange(event) {
		setGreeting(event.target.value)
	}
	return (
		<div>
			<form>
				<label htmlFor="name">Name: </label>
				<input value={greeting} onChange={handleChange} id="name" />
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
	return <Greeting />
}

export default App
