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

import {PuzzleSolver} from "../../algorithm/PuzzleSovler/PuzzleSolver";
import {useTimer} from "../../hooks/useTimer/useTimer";
import {formatTime} from "../../common/time";
import {consoleLog} from "../../common/debug";
import {PuzzleComplete} from "../../components/PuzzleComplete";

type Context = {
	rows?: number
	columns?: number
	puzzle: number[]
	puzzleSize: number
	moves?: number
	gameState: string
	reset: boolean
	hintValue?: number
	hintsUsed?: number
	showHintToggle?: boolean
	puzzleSolved: boolean
	movePuzzlePiece: (_: number) => void
	startNewGame: () => void
	resetGame: () => void
	showHint: () => void
	hideHint: () => void
	timer: number
	onSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ContextRef = createContext<Context | undefined>(undefined);

type Props = {
	children: React.ReactNode
	defaultPuzzleSize?: number
	defaultNumberOfHints?: number
	defaultMovesPerHint?: number
}
export const PuzzleProvider: FC<Props> =
	(
		{
			children,
			defaultPuzzleSize = 3,
			defaultNumberOfHints = 10,
			defaultMovesPerHint = -1
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
		const [checkMovesForHint, setCheckMovesForHint] = useState(defaultMovesPerHint);
		const [hintsUsed, setHintsUsed] = useState(defaultNumberOfHints);
		const [hintValue, setHintValue] = useState<number>();
		const [showHintToggle, setShowHintToggle] = useState<boolean>(false);



		useEffect(() => {
			const newPuzzle = generateOrderedPuzzle(puzzleSize);
			setPuzzle(newPuzzle);
		}, [puzzleSize]);


		const onSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
			const value = parseInt(event.target.value);
			setPuzzleSize(value);
			handleReset();
		}, [handleReset]);


		const checkWinCondition = useCallback((puzzle: number[]) => {
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
		}, [handlePause, timer]);


		const movePuzzlePiece = useCallback ((index: number) => {
			if (puzzleSolved || reset || !isPaused) {
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
		},[puzzleSolved, reset, isPaused, puzzle, puzzleSize, moves, checkWinCondition]);



		const resetGame = useCallback(() => {
			consoleLog("Elapsed time: ", formatTime(timer), "info");
			setReset(true);
			handleReset();
			setPuzzleSolved(false);
			const newPuzzle = generateOrderedPuzzle(puzzleSize);
			setGameState("Play");
			setPuzzle(newPuzzle);
			setMoves(0);
			setCheckMovesForHint(defaultMovesPerHint);
			setHintsUsed(defaultNumberOfHints);

		}, [timer, handleReset, puzzleSize, defaultMovesPerHint, defaultNumberOfHints]);

		const startNewGame = useCallback(() => {

			if (!isActive && !isPaused) {
				const newPuzzle = generateAndShuffleSolution(puzzleSize);
				setPuzzle(newPuzzle);
				setMoves(0);
				setCheckMovesForHint(defaultMovesPerHint);
				setHintsUsed(defaultNumberOfHints);
				setGameState("Pause");
				handleStart();
				setPuzzleSolved(false);
				setReset(false);
				setShowHintToggle(false);
				consoleLog("Start time: ", formatTime(timer), "info");
			} else if (isPaused) {
				setGameState("Resume");
				handlePause();
			} else {
				handleResume();
				setGameState("Pause");
			}
		}, [puzzleSize, timer, defaultMovesPerHint, defaultNumberOfHints, isPaused, isActive, handlePause, handleResume, handleStart]);



		const showHint = useCallback(() => {
			if (!isPaused ) {
				return;
			}

			// only use hint per move
			if (checkMovesForHint < moves) {
				setShowHintToggle(true);
				setHintsUsed(hintsUsed - 1);
				setCheckMovesForHint(checkMovesForHint + 1);
				const solution = PuzzleSolver(puzzle);
				if (hintsUsed > 0) {

					setHintValue(solution!.pathValue[0]);
				}
				consoleLog("solution: ", solution!.pathValue);
			}

		}, [moves, puzzle, hintsUsed, isPaused, checkMovesForHint]);

		const hideHint = useCallback(() => {

			setTimeout(() => {
				setShowHintToggle(false);
			}, 1000);

		}, []);

		const contextValue = useMemo(() => ({
			puzzle,
			moves,
			reset,
			timer,
			hintValue,
			hintsUsed,
			showHint,
			hideHint,
			puzzleSize,
			puzzleSolved,
			gameState,
			startNewGame,
			resetGame,
			showHintToggle,
			onSliderChange,
			movePuzzlePiece,
		}), [puzzle, moves, reset, timer, hintValue, hintsUsed, showHint, hideHint, puzzleSize, puzzleSolved, gameState, startNewGame, resetGame, showHintToggle, onSliderChange, movePuzzlePiece]);

		return <ContextRef.Provider value={contextValue}>
			{puzzleSolved && <PuzzleComplete/>}
			{children}
		</ContextRef.Provider>;
};


export function usePuzzle() {

	return useAndRequireContext(ContextRef);
}

export function usePuzzleMoves() {
	return useAndRequireContext(ContextRef).moves;
}

export function useSolvePuzzle() {
	return useAndRequireContext(ContextRef).showHint;
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

	return shufflePuzzle(orderedPuzzle);
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


