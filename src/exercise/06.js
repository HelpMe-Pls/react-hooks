// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
	PokemonForm,
	fetchPokemon,
	PokemonInfoFallback,
	PokemonDataView,
} from '../pokemon'

class ErrorBoundary extends React.Component {
	state = {error: null}
	static getDerivedStateFromError(error) {
		return {error}
	}
	render() {
		const {error} = this.state
		if (error) {
			return <this.props.FallbackComponent error={error} />
		}

		return this.props.children
	}
}

function PokemonInfo({pokemonName}) {
	// 🐨 Have a common state for API responses && the pokemon
	const [state, setState] = React.useState({
		status: 'idle',
		pokemon: null,
		error: null,
	})
	const {status, pokemon, error} = state

	// 🐨 use React.useEffect where the callback should be called whenever the
	// pokemon name changes.
	// 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
	React.useEffect(() => {
		// 💰 if the pokemonName is falsy (an empty string, in case of the initial render) then we'll have to exit early coz fetchPokemon("") is not a thing.
		if (!pokemonName) return

		// (This is to enable the loading state when switching between different pokemon.)
		// 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:

		fetchPokemon(pokemonName).then(
			pokemonData => {
				setState({status: 'resolved', pokemon: pokemonData})
			},
			err => setState({status: 'rejected', pokemon: null, error: err}),
		)

		// 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
		return () => setState({status: 'pending', pokemon: null})
	}, [pokemonName])

	// 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
	//   1. no pokemonName: 'Submit a pokemon'
	if (status === 'idle') return 'Submit a pokemon'
	//   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
	else if (status === 'pending')
		return <PokemonInfoFallback name={pokemonName} />
	// this {error} is then passed to <ErrorBoundary/>
	else if (status === 'rejected') throw error
	//   3. pokemon: <PokemonDataView pokemon={pokemon} />
	//  <ErrorBoundary/> also catches runtime error
	//	e.g. try to return <PokemonDataView pokemon={null} /> to see that
	else return <PokemonDataView pokemon={pokemon} />
}

// {error} comes from the state defined in <ErrorBoundary/>
function ErrorFallback({error}) {
	return (
		<div role="alert">
			There was an error:{' '}
			<pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
		</div>
	)
}

function App() {
	const [pokemonName, setPokemonName] = React.useState('')

	function handleSubmit(newPokemonName) {
		setPokemonName(newPokemonName)
	}

	return (
		<div className="pokemon-info-app">
			<PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
			<hr />
			<div className="pokemon-info">
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<PokemonInfo pokemonName={pokemonName} />
				</ErrorBoundary>
			</div>
		</div>
	)
}

export default App
