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

function PokemonInfo({pokemonName}) {
	// 🐨 Have state for the pokemon (null)
	const [pokemon, setPokemon] = React.useState(null)

	// 🐨 use React.useEffect where the callback should be called whenever the
	// pokemon name changes.
	// 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
	React.useEffect(() => {
		// 💰 if the pokemonName is falsy (an empty string, in case of the initial render) then we'll have to exit early coz fetchPokemon("") is not a thing.
		if (!pokemonName) return

		// (This is to enable the loading state when switching between different pokemon.)
		// 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
		fetchPokemon(pokemonName).then(pokemonData => setPokemon(pokemonData))

		// 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
		return () => setPokemon(null)
	}, [pokemonName])

	// 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
	//   1. no pokemonName: 'Submit a pokemon'
	if (!pokemonName) return 'Submit a pokemon'
	//   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
	else if (!pokemon) return <PokemonInfoFallback name={pokemonName} />
	//   3. pokemon: <PokemonDataView pokemon={pokemon} />
	else return <PokemonDataView pokemon={pokemon} />
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
				<PokemonInfo pokemonName={pokemonName} />
			</div>
		</div>
	)
}

export default App
