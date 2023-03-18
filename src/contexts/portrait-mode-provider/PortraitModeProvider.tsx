import * as React from "react";
import {createContext, FC, useMemo} from "react";

import {
	useAndRequireContext
} from "../../hooks/useAndRequireContext/useAndRequireContext";
import styled from "styled-components";
import Toast from "../../components/Toast";

type Context = { }


type Props = {
	children: React.ReactNode;
}

const ContextRef = createContext<Context | undefined>(undefined);
export const PortraitModeProvider: FC<Props> =
	(
		{
			children,
		}
	) =>
	{

		// const portraitOrientation = window.matchMedia("(orientation: portrait)");
		// consoleLog("portrait:", portraitOrientation)

		const contextValue = useMemo(() => ({

		}), []);

		return <ContextRef.Provider value={contextValue}>
			<PortraitMode>
				{children}
			</PortraitMode>
			<LandscapeMode>
				<Toast
					variant={"notice"}
				>
					For a better experience, Please rotate your device to portrait mode.
				</Toast>
			</LandscapeMode>
		</ContextRef.Provider>;
	};


export function useSettings() {

	return useAndRequireContext(ContextRef);
}

const PortraitMode = styled.div`
	display: none;
  
  @media screen and (max-aspect-ratio: 13/9) {
    height: 100%;
    width: 100%;
    display: block;
  }

`;

const LandscapeMode = styled.div`
  display: none;

  @media (max-width: 768px) and (max-aspect-ratio: 13/9) {
    height: 100%;
    width: 100%;
    display: block;
  }
`;
