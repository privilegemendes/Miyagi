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
import {PuzzleResult} from "../../components/PuzzleResult";

type Context = {
	rows: number
	columns: number
	puzzle: number[]
	puzzleSize: number
	moves: number
	startTime: number
	endTime: number
	movePuzzlePiece: (_: number) => void
	startNewGame: () => void
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
			defaultPuzzleSize = 4,
			defaultRows = 4,
			defaultColumns = 4,

		}
	) =>
	{
		const [puzzleSize, setPuzzleSize] = useState<number>(defaultPuzzleSize);
		const [rows, setRows] = useState<number>(defaultRows);
		const [columns, setColumns] = useState<number>(defaultColumns);
		const [puzzle, setPuzzle] = useState<number[]>([]);
		const [moves, setMoves] = useState(0);
		const [startTime, setStartTime] = useState(0);
		const [endTime, setEndTime] = useState(0);


		useEffect(() => {
			const setupPuzzle = Array.from({ length: puzzleSize * puzzleSize }, (_, index) => index + 1);
			const emptyCell = puzzleSize * puzzleSize;
			setupPuzzle[emptyCell - 1] = 0;
			setPuzzle(setupPuzzle);

		}, [puzzleSize]);

		const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = parseInt(event.target.value);
			setPuzzleSize(value);
			setRows(value);
			setColumns(value);
		};
		const movePuzzlePiece = (index: number) => {
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
				// console.log("Moves: ", moves);
				// console.log("Puzzle: ", newPuzzle);
				setPuzzle(newPuzzle);
				checkIfPuzzleSolved(newPuzzle);
			}
		};

		const shufflePuzzle = (puzzle: number[]) => {
			// Fisher-Yates shuffle algorithm
			for (let i = puzzle.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
			}
		};

		const startNewGame = useCallback(() => {
			const setupPuzzle = Array.from({ length: puzzleSize * puzzleSize }, (_, index) => index + 1);
			const emptyCell = puzzleSize * puzzleSize;
			setupPuzzle[emptyCell - 1] = 0;
			setPuzzle(setupPuzzle);
			shufflePuzzle(setupPuzzle);
			setMoves(0);
			setStartTime(Date.now());
			setEndTime(0);
		}, [puzzleSize]);

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
				setEndTime(Date.now());
				console.log("Time: ", Math.floor((endTime - startTime) / 3600));
				return <PuzzleResult/>
			}
		}


		const contextValue = useMemo(() => ({
			rows,
			columns,
			puzzle,
			moves,
			startTime,
			endTime,
			puzzleSize,
			startNewGame,
			onSliderChange,
			movePuzzlePiece,
		}), [rows, columns, puzzle, startTime, endTime, moves, puzzleSize]);

		return <ContextRef.Provider value={contextValue}>
				{children}
		</ContextRef.Provider>;
};


export function usePuzzle() {

	return useAndRequireContext(ContextRef);
}

export function usePuzzleStartTime() {
	return useAndRequireContext(ContextRef).startTime;
}
export function usePuzzleEndTime() {
	return useAndRequireContext(ContextRef).endTime;
}

export function usePuzzleMoves() {
	return useAndRequireContext(ContextRef).moves;
}
