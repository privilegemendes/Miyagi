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
	shufflePuzzle
} from "../../algorithm/PuzzleSovler/PuzzleSolver";
import {useTimer} from "../../hooks/useTimer/useTimer";
import {formatTime} from "../../common/time";
import {consoleLog} from "../../common/debug";
import {PuzzleComplete} from "../../components/PuzzleComplete";
import {saveGameData} from "../game-settings-provider/GameSettingsProvider";
import {useLocation} from "react-router-dom";
import {usePuzzleSize} from "../../hooks/usePuzzleSize/usePuzzleSize";
import {Toast} from "../../components/Toast";

type Context = {
	rows?: number
	columns?: number
	puzzle: number[]
	isPaused?: boolean
	isActive?: boolean
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
}

const ContextRef = createContext<Context | undefined>(undefined);

type Props = {
	children: React.ReactNode
	defaultNumberOfHints?: number
	defaultMovesPerHint?: number

}
export const PuzzleProvider: FC<Props> =
	(
		{
			children,
			defaultNumberOfHints = 50,
			defaultMovesPerHint = -1
		}
	) =>
	{
		const puzzleSize = usePuzzleSize();
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

		const location = useLocation();
		const currentPath = location!.pathname;

		useEffect(() => {
			if (gameState === "Pause" && currentPath !== '/game') {
				setGameState("Resume");
				handlePause();
			}

		}, [gameState,currentPath, handlePause]);


		useEffect(() => {
			const newPuzzle = generateOrderedPuzzle(puzzleSize);
			setPuzzle(newPuzzle);
		}, [puzzleSize]);

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
				saveGameData(formatTime(timer), moves, hintsUsed, `${puzzleSize}x${puzzleSize}`);
			}
		}, [handlePause, timer, moves, hintsUsed, puzzleSize]);

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
			consoleLog("Elapsed time: ", formatTime(timer));
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
				consoleLog("puzzle: ", newPuzzle, "info");
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
			isPaused,
			isActive,
			resetGame,
			showHintToggle,
			movePuzzlePiece,
		}), [puzzle, moves, reset, timer, hintValue, hintsUsed, isActive,
			showHint, hideHint, puzzleSize, isPaused, puzzleSolved, gameState,
			startNewGame, resetGame, showHintToggle,
			movePuzzlePiece]);

		return <ContextRef.Provider value={contextValue}>
			{puzzleSolved && <PuzzleComplete
					time={timer}
					moves={moves}
					onClick={resetGame}
				/>
			}
			{ (showHintToggle && puzzleSize > 3) &&
				(<Toast
					variant={"warning"}
					enableAction={true}
					disableIcons={false}
					action={"Okay, I don't need hints because I'm a badass."}
					onClick={() => setShowHintToggle(false)}
				>
					Oopsie! 😭 Hints are currently only available for puzzles of size 3x3.
				</Toast>)
			}
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




