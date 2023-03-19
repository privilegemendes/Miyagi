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
	setPlayerName:  Dispatch<SetStateAction<string>>;

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
		const [playerName, setPlayerName] = useState<string>("");
		const [minimumPuzzleSize, setMinimumPuzzleSize] = useState<number>(3);
		const [maximumPuzzleSize, setMaximumPuzzleSize] = useState<number>(6);

		const contextValue = useMemo(() => ({
			playerName,
			minimumPuzzleSize,
			maximumPuzzleSize,
			setPlayerName,

		}), [playerName, minimumPuzzleSize, maximumPuzzleSize]);

		return <ContextRef.Provider value={contextValue}>
			{children}
		</ContextRef.Provider>;
	};


export function useSettings() {

	return useAndRequireContext(ContextRef);
}

