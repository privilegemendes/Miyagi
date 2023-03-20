import * as React from "react";
import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useCallback,
	useMemo,
	useState
} from "react";

import {
	useAndRequireContext
} from "../../hooks/useAndRequireContext/useAndRequireContext";
import {SavedGame} from "../../hooks/useLoadGameData/useLoadGameData";
import {useTimer} from "../../hooks/useTimer/useTimer";
import {useHistory} from "react-router-dom";

type Context = {
	playerName: string
	puzzleSize: number
	setPlayerName:  Dispatch<SetStateAction<string>>
	setPuzzleSize:  Dispatch<SetStateAction<number>>
	puzzleSizeOptions: string[]
	onPuzzleSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}


type Props = {
	children: React.ReactNode;
	minimumPuzzleSize?: number
	maximumPuzzleSize?: number
}

const ContextRef = createContext<Context | undefined>(undefined);
export const GameSettingsProvider: FC<Props> =
	(
		{
			children,
			minimumPuzzleSize = 3,
			maximumPuzzleSize = 6,
		}
	) =>
	{
		const [playerName, setPlayerName] = useState<string>("");
		const [puzzleSize, setPuzzleSize] = useState<number>(minimumPuzzleSize);

		const puzzleSizeOptions = useMemo(() => {
			const puzzleSizeOptionsArray: string[] = [];
			for (let i = minimumPuzzleSize; i <= maximumPuzzleSize; i++) {
				puzzleSizeOptionsArray.push(`${i}x${i}`);
			}
			return puzzleSizeOptionsArray;
		}, [minimumPuzzleSize, maximumPuzzleSize]);


		const {handleReset} = useTimer(0);
		const history = useHistory();

		const onPuzzleSizeChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
			const [value] = event.target.value.split("x");
			setPuzzleSize(parseInt(value));
			localStorage.setItem('puzzleSize', value);
			handleReset();
			history.push('/');

		},[setPuzzleSize, handleReset]);

		const contextValue = useMemo(() => ({
			puzzleSize,
			playerName,
			puzzleSizeOptions,
			onPuzzleSizeChange,
			setPlayerName,
			setPuzzleSize,

		}), [playerName, puzzleSize, puzzleSizeOptions, onPuzzleSizeChange, setPlayerName, setPuzzleSize]);

		return <ContextRef.Provider value={contextValue}>
			{children}
		</ContextRef.Provider>;
	};


export function useSettings() {

	return useAndRequireContext(ContextRef);
}

export function saveGameData(time: string, moves: number, hints: number, puzzleSize: string) {
	const savedGames: SavedGame[] = JSON.parse(localStorage.getItem('savedGames') || '[]');

	const newGame: SavedGame = {
		id: savedGames.length + 1,
		time,
		moves,
		hints,
		puzzleSize
	};

	savedGames.push(newGame);
	localStorage.setItem('savedGames', JSON.stringify(savedGames));
}

export function deleteGameData() {
	localStorage.removeItem('savedGames');
}
