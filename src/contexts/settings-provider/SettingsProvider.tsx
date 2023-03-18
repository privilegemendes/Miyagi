import * as React from "react";
import {createContext, FC, useMemo} from "react";

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

		const contextValue = useMemo(() => ({

		}), []);

		return <ContextRef.Provider value={contextValue}>
			{children}
		</ContextRef.Provider>;
	};


export function useSettings() {

	return useAndRequireContext(ContextRef);
}
