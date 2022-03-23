// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({onSelectSquare, squares}) {
	function renderSquare(i) {
		return (
			<button className="square" onClick={() => onSelectSquare(i)}>
				{squares[i]}
			</button>
		)
	}

	return (
		<div>
			<div className="board-row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className="board-row">
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className="board-row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
		</div>
	)
}

function Game() {
	// each array in the {history} represents a version of the game with all the checked box from that point of time
	// console.log(history) to see what happens
	const [history, setHistory] = useLocalStorageState('game:history', [
		Array(9).fill(null),
	])
	const [currentStep, setCurrentStep] = useLocalStorageState('game:step', 0)

	const currentSquares = history[currentStep]
	const nextValue = calculateNextValue(currentSquares)
	const winner = calculateWinner(currentSquares)
	const status = calculateStatus(winner, currentSquares, nextValue)

	function selectSquare(square) {
		if (winner || currentSquares[square]) return

		/**
		 * Clone a version of the {history} AT THE {currentStep} so that when we go BACK to
		 * a specific step and then continue the game, it would start from THAT step
		 * just try const newHistory = [...history] to see this bug
		 */
		const newHistory = history.slice(0, currentStep + 1)

		const tempSquares = [...currentSquares]
		tempSquares[square] = nextValue

		setHistory([...newHistory, tempSquares])
		setCurrentStep(newHistory.length)
	}

	function restart() {
		setHistory([Array(9).fill(null)])
		setCurrentStep(0)
	}

	const moves = history.map((item, step) => {
		// {item} represents ALL of those checked box for that particular {step}
		const desc = step ? `Go to move #${step}` : 'Go to game start'
		const isCurrentStep = step === currentStep
		return (
			<li key={step}>
				<button
					disabled={isCurrentStep}
					onClick={() => setCurrentStep(step)}
				>
					{desc} {isCurrentStep ? '(current)' : null}
				</button>
			</li>
		)
	})

	return (
		<div className="game">
			<div className="game-board">
				<Board onSelectSquare={selectSquare} squares={currentSquares} />
				<button className="restart" onClick={restart}>
					restart
				</button>
			</div>
			<div className="game-info">
				<div>{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	)
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
	return winner
		? `Winner: ${winner}`
		: squares.every(Boolean)
		? `Draw!`
		: `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
	return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]
	for (let i of lines) {
		const [a, b, c] = i
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a]
		}
	}
	return null
}

function App() {
	return <Game />
}

export default App
