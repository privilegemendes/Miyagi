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
	PuzzleSolver,
	PuzzleState
} from "../../algorithm/PuzzleSovler/PuzzleSolver";
import Toast from "../../components/Toast";
import {useTimer} from "../../hooks/useTimer/useTimer";
import {formatTime} from "../../common/time";

type Context = {
	rows?: number
	columns?: number
	puzzle: number[]
	puzzleSize: number
	moves?: number
	gameState?: "Play" | "Pause" | "Resume"
	movePuzzlePiece: (_: number) => void
	startNewGame: () => void
	resetGame: () => void
	solvePuzzle: () => void
	isPaused?: boolean
	isActive?: boolean
	timer: number
	onSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ContextRef = createContext<Context | undefined>(undefined);

type Props = {
	children: React.ReactNode
	defaultPuzzleSize?: number
	defaultRows?: number
	defaultColumns?: number
}
export const PuzzleProvider: FC<Props> =
	(
		{
			children,
			defaultPuzzleSize = 3,
			defaultRows = 3,
			defaultColumns = 3,

		}
	) =>
	{
		const [puzzleSize, setPuzzleSize] = useState<number>(defaultPuzzleSize);
		const [rows, setRows] = useState<number>(defaultRows);
		const [columns, setColumns] = useState<number>(defaultColumns);
		const [puzzle, setPuzzle] = useState<number[]>([]);
		const {timer, handleStart, handleResume, handleReset, handlePause, isPaused, isActive} = useTimer(0);
		const [gameState, setGameState] = useState<"Play" | "Pause" | "Resume">("Play");

		const [moves, setMoves] = useState(0);

		useEffect(() => {
			const newPuzzle = generateAndShuffleSolution(puzzleSize);
			setPuzzle(newPuzzle);

		}, [puzzleSize]);

		const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = parseInt(event.target.value);
			setPuzzleSize(value);
			setRows(value);
			setColumns(value);
			handleReset();
		};
		const movePuzzlePiece = (index: number) => {
			const emptyIndex = puzzle.indexOf(0);
			// console.log("Empty index: ", emptyIndex);
			// console.log("puzzle: ", puzzle);
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
				// console.log("Moves: ", moves);
				// console.log("Puzzle: ", newPuzzle);
				setPuzzle(newPuzzle);
				checkIfPuzzleSolved(newPuzzle);
			}
		};

		const generateAndShuffleSolution = (puzzleSize: number) => {
			// Create an ordered array with the numbers 1 to size^2
			const orderedPuzzle = Array.from({ length: puzzleSize ** 2 }, (_, i) => i + 1);
			const emptyCell = puzzleSize * puzzleSize;
			// Add the empty cell to the end of the array
			orderedPuzzle[emptyCell - 1] = 0;

			const shuffledPuzzle = shufflePuzzle(orderedPuzzle);
			const solution = PuzzleSolver(shuffledPuzzle);
			console.log("Solution: ", solution);
			return shuffledPuzzle;
		};

		const resetGame = useCallback(() => {
			handleReset();
			const newPuzzle = generateAndShuffleSolution(puzzleSize);
			setPuzzle(newPuzzle);
			setMoves(0);

		}, [puzzleSize]);

		const startNewGame = useCallback(() => {

			if (!isActive && !isPaused) {
				const newPuzzle = generateAndShuffleSolution(puzzleSize);
				setPuzzle(newPuzzle);
				setMoves(0);
				setGameState("Pause");
				handleStart();
				console.log("Start time: ", formatTime(timer));
			} else if (isPaused) {
				handlePause();
				setGameState("Resume");
			} else {
				handleResume();
				setGameState("Pause");
			}

		}, [puzzleSize, timer]);

		const checkIfPuzzleSolved = (puzzle: number[]) => {
			let isPuzzleSolved = true;
			const checkPuzzle = [...puzzle];
			// Check if the puzzle pieces are in order
			for (let i = 0; i < checkPuzzle.length; i++) {
				if (checkPuzzle[checkPuzzle.length - 1] === 0) {
					checkPuzzle.pop();
				}

				if (checkPuzzle[i] > checkPuzzle[i + 1]) {
					isPuzzleSolved = false;
					break;
				}
			}

			if (isPuzzleSolved) {
				console.log("Elapsed Time: ", formatTime(timer));
				handleReset();

				return <Toast variant={"success"}>
						Congratulations! You solved the puzzle in ${moves} moves and your time: {formatTime(timer)}.
					</Toast>
			}
		}

		const solvePuzzle = useCallback(() => {

			const solution = PuzzleSolver(puzzle);
			console.log("solution: ", solution);
		}, [puzzle]);



		const contextValue = useMemo(() => ({
			puzzle,
			moves,
			timer,
			puzzleSize,
			startNewGame,
			resetGame,
			solvePuzzle,
			onSliderChange,
			movePuzzlePiece,
		}), [puzzle, moves, timer, puzzleSize]);

		return <ContextRef.Provider value={contextValue}>
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


function GetHint(puzzle: number[], puzzleSize: number) {

	const emptyIndex = puzzle.indexOf(0);
	const initialPuzzleState: PuzzleState = {
		tiles: puzzle,
		emptyIndex: emptyIndex,
		puzzleSize: puzzleSize,
	}
	// const solutionPath = PuzzleSolver(initialPuzzleState);
	// console.log("Solution path: ", solutionPath);
}



/*

 */

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
