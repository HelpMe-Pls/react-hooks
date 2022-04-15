// useEffect: HTTP requests
// 💯 use resetKeys
// http://localhost:3000/isolated/final/06.extra-8.tsx

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import type {FallbackProps} from 'react-error-boundary'
import {
	fetchPokemon,
	PokemonInfoFallback,
	PokemonForm,
	PokemonDataView,
} from '../../pokemon'
import type {PokemonData} from '../../types'

// Have a common state for API responses && the pokemon
type PokemonInfoState =
	| {status: 'idle'}
	| {status: 'pending'}
	| {status: 'rejected'; error: Error}
	| {status: 'resolved'; pokemon: PokemonData}

function PokemonInfo({pokemonName}: {pokemonName: string}) {
	const [state, setState] = React.useState<PokemonInfoState>({
		status: pokemonName ? 'pending' : 'idle',
	})

	React.useEffect(() => {
		// if the pokemonName is falsy (an empty string, in case of the initial render) then we'll have to exit early coz fetchPokemon("") is not a thing.
		if (!pokemonName) {
			return
		}
		// before calling `fetchPokemon`, clear the current pokemon state by setting it to null
		// This is to enable the loading state when switching between different pokemon
		setState({status: 'pending'})

		fetchPokemon(pokemonName).then(
			pokemon => {
				setState({status: 'resolved', pokemon})
			},
			error => {
				setState({status: 'rejected', error})
			},
		)

		// The implementation of the clean up function will prevent the render of the <PokemonInfoFallback/>:
		// return () => setState({status: 'pending'})
	}, [pokemonName])

	switch (state.status) {
		case 'idle':
			//   no pokemonName:
			return <span>Submit a pokemon</span>
		case 'pending':
			//   pokemonName but no pokemon:

			return <PokemonInfoFallback name={pokemonName} />
		case 'rejected':
			// this {error} is then passed to <ErrorBoundary/>
			throw state.error
		case 'resolved':
			//  <ErrorBoundary/> also catches runtime error
			//	e.g. try to return <PokemonDataView pokemon={null} /> to see that
			return <PokemonDataView pokemon={state.pokemon} />
		default:
			throw new Error('This should be impossible')
	}
}

// {error} comes from the state defined in <ErrorBoundary/>
// {resetErrorBoundary} is to reset the state without unmount & remount the component
function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
	return (
		<div role="alert">
			There was an error:{' '}
			<pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

function App() {
	const [pokemonName, setPokemonName] = React.useState('')

	function handleSubmit(newPokemonName: string) {
		setPokemonName(newPokemonName)
	}

	function handleReset() {
		setPokemonName('')
	}

	return (
		<div className="pokemon-info-app">
			<PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
			<hr />
			<div className="pokemon-info">
				<ErrorBoundary
					/**
					{pokemonName} is a state from <App/> that gets updated on every re-render so if we pass it as a prop to <ErrorBoundary/>, it'll also re-rendered and reset its state (in this case: {error}). The reason why we need to reset its {error} state is in case we had an error in <PokemonInfo/>, it'll set the {error} state in <ErrorBoundary/>, and it persists through re-renders, which leads to a bug where we re-submit the available Pokemon, the error's still there
					 */
					// key={pokemonName} // this prop is now handled by {resetErrorBoundary} prop
					FallbackComponent={ErrorFallback}
					onReset={handleReset} // a pair prop with {resetErrorBoundary}
					resetKeys={[pokemonName]} // things that trigger a reset
				>
					<PokemonInfo pokemonName={pokemonName} />
				</ErrorBoundary>
			</div>
		</div>
	)
}

export {App}
