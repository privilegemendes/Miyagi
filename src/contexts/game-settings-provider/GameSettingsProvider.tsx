import * as React from "react";
import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useMemo,
	useState
} from "react";

import {
	useAndRequireContext
} from "../../hooks/useAndRequireContext/useAndRequireContext";

type Context = {
	playerName: string
	puzzleSize: string
	minimumPuzzleSize: number
	maximumPuzzleSize: number
	setPlayerName:  Dispatch<SetStateAction<string>>
	setPuzzleSize:  Dispatch<SetStateAction<string>>
}


type Props = {
	children: React.ReactNode;
}

const ContextRef = createContext<Context | undefined>(undefined);
export const GameSettingsProvider: FC<Props> =
	(
		{
			children,
		}
	) =>
	{
		const minimumPuzzleSize = 3;
		const maximumPuzzleSize = 6;
		const [playerName, setPlayerName] = useState<string>("");
		const [puzzleSize, setPuzzleSize] = useState<string>(`${minimumPuzzleSize}`);

		const contextValue = useMemo(() => ({
			playerName,
			puzzleSize,
			minimumPuzzleSize,
			maximumPuzzleSize,
			setPuzzleSize,
			setPlayerName,

		}), [playerName, puzzleSize, minimumPuzzleSize, maximumPuzzleSize]);

		return <ContextRef.Provider value={contextValue}>
			{children}
		</ContextRef.Provider>;
	};


export function useSettings() {

	return useAndRequireContext(ContextRef);
}

