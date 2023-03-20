import * as React from "react";
import {createContext, FC, useEffect, useMemo} from "react";

import {
	useAndRequireContext
} from "../../hooks/useAndRequireContext/useAndRequireContext";
import styled from "styled-components";
import {Toast} from "../../components/Toast";

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
		const [orientation, setOrientation] = React.useState<boolean>(false);

		useEffect(() => {
			const checkForLandscapeMode = window.matchMedia("(orientation: landscape)");

			if (checkForLandscapeMode.matches) {
				setOrientation(true);
			}


		}, [orientation])




		const contextValue = useMemo(() => ({

		}), []);

		return <ContextRef.Provider value={contextValue}>
			<PortraitMode>
				{children}
			</PortraitMode>
			{ orientation ?
					<LandscapeMode>
						<Toast
							variant={"notice"}
						>
							For a better experience, Please rotate your device to portrait mode.
						</Toast>
					</LandscapeMode>
				: null
			}
		</ContextRef.Provider>;
	};


export function usePortraitMode() {

	return useAndRequireContext(ContextRef);
}


const PortraitMode = styled.div`
  display: none;
  
  @media screen and (orientation: portrait) and (max-height: 2000px) {
    height: 100%;
    width: 100%;
    display: block;
  }

  @media screen and (orientation: landscape) and (min-height: 425px) {
    height: 100%;
    width: 100%;
    display: block;
	min-height: 500px;
	overflow-x: hidden;
  }
`;

const LandscapeMode = styled.div`
  display: none;
  
  @media screen and (orientation: landscape) and (max-height: 425px)  {
    height: 100%;
    width: 100%;
    display: block;
  }
`;
