// Synchronizing Side-Effects
// full explanation video at: from https://epicreact.dev/modules/react-hooks/useeffect-persistent-state-extra-credit-solution-4

import * as React from 'react'

type UseLocalStorageOptions<StateType = unknown> = {
	serialize?: (data: StateType) => string
	deserialize?: (str: string) => StateType
}
function useLocalStorageState<StateType>(
	key: string,
	defaultValue: StateType | (() => StateType),
	{
		serialize = JSON.stringify,
		deserialize = JSON.parse,
	}: UseLocalStorageOptions<StateType> = {},
	// the `= {}` fixes the error we would get from destructuring when no argument was passed
	// Check https://jacobparis.com/blog/destructure-arguments for a detailed explanation
) {
	const [state, setStateType] = React.useState(() => {
		const valueInLocalStorage = window.localStorage.getItem(key)
		if (valueInLocalStorage) {
			// the try/catch is here in case the localStorage value was set before
			// we had the serialization in place (like we do in previous extra credits)
			try {
				return deserialize(valueInLocalStorage)
			} catch (error) {
				window.localStorage.removeItem(key)
			}
		}
		// can't do typeof because:
		// https://github.com/microsoft/TypeScript/issues/37663#issuecomment-759728342
		return defaultValue instanceof Function ? defaultValue() : defaultValue
	})

	const prevKeyRef = React.useRef(key) // explained at 04:10, basically it's an object that you can mutate without triggering a re-render

	// Check the example at src/examples/local-state-key-change.js to visualize a key change
	React.useEffect(() => {
		const prevKey = prevKeyRef.current
		if (prevKey !== key) {
			window.localStorage.removeItem(prevKey)
		}
		prevKeyRef.current = key
		window.localStorage.setItem(key, serialize(state))
	}, [key, state, serialize]) // explained at 03:25

	return [state, setStateType] as const
}

function UsernameForm({
	initialUsername = '',
	onSubmitUsername,
}: {
	initialUsername?: string
	onSubmitUsername: (username: string) => void
}) {
	const [username, setUsername] = useLocalStorageState(
		'username',
		initialUsername,
	)
	const [touched, setTouched] = React.useState(false)

	const usernameIsLowerCase = username === username.toLowerCase()
	const usernameIsLongEnough = username.length >= 3
	const usernameIsShortEnough = username.length <= 10
	const formIsValid =
		usernameIsShortEnough && usernameIsLongEnough && usernameIsLowerCase

	const displayErrorMessage = touched && !formIsValid

	let errorMessage = null
	if (!usernameIsLowerCase) {
		errorMessage = 'Username must be lower case'
	} else if (!usernameIsLongEnough) {
		errorMessage = 'Username must be at least 3 characters long'
	} else if (!usernameIsShortEnough) {
		errorMessage = 'Username must be no longer than 10 characters'
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setTouched(true)
		if (!formIsValid) return

		onSubmitUsername(username)
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setUsername(event.currentTarget.value)
	}

	function handleBlur() {
		setTouched(true)
	}

	return (
		<form name="usernameForm" onSubmit={handleSubmit} noValidate>
			<div>
				<label htmlFor="usernameInput">Username:</label>
				<input
					id="usernameInput"
					type="text"
					value={username}
					onChange={handleChange}
					onBlur={handleBlur}
					pattern="[a-z]{3,10}"
					required
					aria-describedby={
						displayErrorMessage ? 'error-message' : undefined
					}
				/>
			</div>
			{displayErrorMessage ? (
				<div role="alert" id="error-message">
					{errorMessage}
				</div>
			) : null}
			<button type="submit">Submit</button>
		</form>
	)
}

function App() {
	const onSubmitUsername = (username: string) =>
		alert(`You entered: ${username}`)
	return (
		<div style={{width: 400}}>
			<UsernameForm onSubmitUsername={onSubmitUsername} />
		</div>
	)
}

export {App}
