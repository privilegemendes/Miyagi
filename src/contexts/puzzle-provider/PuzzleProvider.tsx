import * as React from "react";
import {
	createContext,
	FC,
	useCallback,
	useEffect,
	useMemo,
	useState
} from "react";
import {
	useAndRequireContext
} from "../../hooks/useAndRequireContext/useAndRequireContext";

import {
	PuzzleDirection,
	PuzzleSolver
} from "../../algorithm/PuzzleSovler/PuzzleSolver";
import Toast from "../../components/Toast";
import {useTimer} from "../../hooks/useTimer/useTimer";
import {formatTime} from "../../common/time";
import {consoleLog} from "../../common/debug";
import {PuzzleComplete} from "../../components/PuzzleComplete";
import {PuzzleHint} from "../../algorithm/PuzzleHint/PuzzleHint";

type Context = {
	rows?: number
	columns?: number
	puzzle: number[]
	puzzleSize: number
	moves?: number
	gameState: string
	reset: boolean
	puzzleSolved: boolean
	movePuzzlePiece: (_: number) => void
	startNewGame: () => void
	resetGame: () => void
	solvePuzzle: () => void
	timer: number
	onSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ContextRef = createContext<Context | undefined>(undefined);

type Props = {
	children: React.ReactNode
	defaultPuzzleSize?: number
}
export const PuzzleProvider: FC<Props> =
	(
		{
			children,
			defaultPuzzleSize = 3,
		}
	) =>
	{
		const [puzzleSize, setPuzzleSize] = useState<number>(defaultPuzzleSize);
		const [puzzle, setPuzzle] = useState<number[]>([]);
		const [reset, setReset] = useState<boolean>(true);
		const [puzzleSolved, setPuzzleSolved] = useState<boolean>(false);
		const {timer, handleStart, handleResume, handleReset, handlePause, isPaused, isActive} = useTimer(0);
		const [gameState, setGameState] = useState<"Play" | "Pause" | "Resume">("Play");

		const [moves, setMoves] = useState(0);

		useEffect(() => {
			const newPuzzle = generateOrderedPuzzle(puzzleSize);
			setPuzzle(newPuzzle);
		}, [puzzleSize]);

		const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = parseInt(event.target.value);
			setPuzzleSize(value);
			handleReset();
		};
		const movePuzzlePiece = useCallback ((index: number) => {
			if (puzzleSolved || reset) {
				return;
			}
			const emptyIndex = puzzle.indexOf(0);
			const row = Math.floor(emptyIndex / puzzleSize);
			const col = emptyIndex % puzzleSize;
			const moveRow = Math.floor(index / puzzleSize);
			const moveCol = index % puzzleSize;
			if (
				(row === moveRow && Math.abs(col - moveCol) === 1) ||
				(col === moveCol && Math.abs(row - moveRow) === 1)
			) {
				const newPuzzle = [...puzzle];
				newPuzzle[emptyIndex] = puzzle[index];
				newPuzzle[index] = 0;
				setMoves(moves + 1);
				setPuzzle(newPuzzle);
				checkWinCondition(newPuzzle);
			}
		},[puzzle, puzzleSize, puzzleSolved, moves]);



		const resetGame = useCallback(() => {
			consoleLog("info", "Elapsed time: ", formatTime(timer));
			setReset(true);
			handleReset();
			setPuzzleSolved(false);
			const newPuzzle = generateOrderedPuzzle(puzzleSize);
			setGameState("Play");
			setPuzzle(newPuzzle);
			setMoves(0);

		}, [timer, puzzleSize, handleReset]);

		const startNewGame = useCallback(() => {

			if (!isActive && !isPaused) {
				const newPuzzle = generateAndShuffleSolution(puzzleSize);
				setPuzzle(newPuzzle);
				setMoves(0);
				setGameState("Pause");
				handleStart();
				setPuzzleSolved(false);
				setReset(false);
				consoleLog("info", "Start time: ", formatTime(timer));
			} else if (isPaused) {
				setGameState("Resume");
				handlePause();
			} else {
				handleResume();
				setGameState("Pause");
			}
		}, [puzzleSize, timer, isPaused, isActive, handlePause, handleResume, handleStart]);

		const checkWinCondition = (puzzle: number[]) => {

			const isPuzzleSolved = puzzle.every((puzzlePiece, index) => {
					if (index === puzzle.length - 1) {
						// handle special case where last element is 0
						return puzzlePiece === 0;
					}
					return puzzlePiece === index + 1;
				}
			);

			if (isPuzzleSolved) {
				setPuzzleSolved(true);
				handlePause();
				consoleLog("info", "End time: ", formatTime(timer));
				setGameState("Play");
			}
		};

		const solvePuzzle = useCallback(() => {
			const newPuzzle = generateOrderedPuzzle(puzzleSize);
			const solution = PuzzleSolver(puzzle);
			const nextMove = PuzzleHint(puzzle, newPuzzle, solution);
			consoleLog("Next move: ", nextMove, "info");
			console.log("solution: ", solution);

		}, [puzzle]);

		const contextValue = useMemo(() => ({
			puzzle,
			moves,
			reset,
			timer,
			puzzleSize,
			puzzleSolved,
			gameState,
			startNewGame,
			resetGame,
			solvePuzzle,
			onSliderChange,
			movePuzzlePiece,
		}), [puzzle, moves, reset, timer, puzzleSize, puzzleSolved, gameState]);

		return <ContextRef.Provider value={contextValue}>
			{puzzleSolved && <PuzzleComplete/>}
			{children}
		</ContextRef.Provider>;
};


export function usePuzzle() {

	return useAndRequireContext(ContextRef);
}

export function usePuzzleStartTime() {
	return useAndRequireContext(ContextRef);
}
export function usePuzzleEndTime() {
	return useAndRequireContext(ContextRef);
}

export function usePuzzleMoves() {
	return useAndRequireContext(ContextRef).moves;
}

export function useSolvePuzzle() {
	return useAndRequireContext(ContextRef).solvePuzzle;
}

export function useGameTimer() {
	return useAndRequireContext(ContextRef);
}


const generateOrderedPuzzle = (puzzleSize: number) => {
	// Create an ordered array with the numbers 1 to size^2
	const orderedPuzzle = Array.from({ length: puzzleSize ** 2 }, (_, i) => i + 1);
	const emptyCell = puzzleSize * puzzleSize;
	// Add the empty cell to the end of the array
	orderedPuzzle[emptyCell - 1] = 0;
	return orderedPuzzle;
}
const generateAndShuffleSolution = (puzzleSize: number) => {
	// Create an ordered array with the numbers 1 to size^2
	const orderedPuzzle = Array.from({ length: puzzleSize ** 2 }, (_, i) => i + 1);
	const emptyCell = puzzleSize * puzzleSize;
	// Add the empty cell to the end of the array
	orderedPuzzle[emptyCell - 1] = 0;

	const shuffledPuzzle = shufflePuzzle(orderedPuzzle);
	const solution = PuzzleSolver(shuffledPuzzle);
	consoleLog("Solution: ", solution, "info");

	const nextMove = PuzzleHint(shuffledPuzzle, orderedPuzzle, solution);
	consoleLog("Next move: ", nextMove, "info");
	return shuffledPuzzle;
};

function shufflePuzzle(puzzle: number[]) {

	const shuffledPuzzle = [...puzzle];

	// Shuffle the array using the Fisher-Yates algorithm
	for (let i = shuffledPuzzle.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledPuzzle[i], shuffledPuzzle[j]] = [shuffledPuzzle[j], shuffledPuzzle[i]];
	}

	// Check if the puzzle is solvable, if not shuffle again
	while (!checkIfPuzzleIsSolvable(shuffledPuzzle)) {
		for (let i = shuffledPuzzle.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledPuzzle[i], shuffledPuzzle[j]] = [shuffledPuzzle[j], shuffledPuzzle[i]];
		}
	}

	return shuffledPuzzle;
}

/* Check if the puzzle is solvable
1. Calculate the number of inversions in the puzzle.
2. If the puzzle size is odd and the number of inversions is even, the puzzle is solvable.
3. If the puzzle size is odd and the number of inversions is odd, the puzzle is not solvable.
4. If the puzzle size is even, calculate the sum of the row number of the empty cell and the number of inversions.
5. If the sum is odd, the puzzle is not solvable. If the sum is even, the puzzle is solvable.
* @param {number[]} puzzle - The puzzle to be solved
* returns {boolean} - True if the puzzle is solvable, false otherwise
*/
function checkIfPuzzleIsSolvable(puzzle: number[]): boolean {
	const puzzleSize = Math.sqrt(puzzle.length);
	let inversions = 0;
	let emptyRowIndex = 0;

	for (let i = 0; i < puzzle.length; i++) {
		if (puzzle[i] === 0) {
			emptyRowIndex = Math.floor(i / puzzleSize) + 1;
			continue;
		}
		for (let j = i + 1; j < puzzle.length; j++) {
			if (puzzle[i] > puzzle[j] && puzzle[j] !== 0) {
				inversions++;
			}
		}
	}

	if (puzzleSize % 2 === 1) {
		return inversions % 2 === 0;
	} else {
		return (inversions + emptyRowIndex) % 2 === 1;
	}

}


