import * as React from "react";
import {createContext, FC, useMemo, useState} from "react";

import {
	useAndRequireContext
} from "../../hooks/useAndRequireContext/useAndRequireContext";

type Context = { }


type Props = {
	children: React.ReactNode;
}

const ContextRef = createContext<Context | undefined>(undefined);
export const SettingsProvider: FC<Props> =
	(
		{
			children,
		}
	) =>
	{

		const [minimumPuzzleSize, setMinimumPuzzleSize] = useState<number>(3);
		const [maximumPuzzleSize, setMaximumPuzzleSize] = useState<number>(10);

		const contextValue = useMemo(() => ({

		}), []);

		return <ContextRef.Provider value={contextValue}>
			{children}
		</ContextRef.Provider>;
	};


export function useSettings() {

	return useAndRequireContext(ContextRef);
}
