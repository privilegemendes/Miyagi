import * as React from "react";
import {createContext, FC, useEffect, useMemo} from "react";

import {
	useAndRequireContext
} from "../../hooks/useAndRequireContext/useAndRequireContext";
import styled from "styled-components";
import {Toast} from "../../components/Toast";
import {
	useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";

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
		const {height} = useWindowDimensions();

		useEffect(() => {
			const checkForLandscapeMode = window.matchMedia("(orientation: landscape)");

			if (checkForLandscapeMode.matches && height <= 425) {
				setOrientation(true);
			} else {
				setOrientation(false);
			}


		}, [height, orientation])




		const contextValue = useMemo(() => ({

		}), []);

		return <ContextRef.Provider value={contextValue}>
			{ orientation ?
					<LandscapeMode>
						<Toast
							variant={"notice"}
						>
							For a better experience, Please rotate your device to portrait mode.
						</Toast>
					</LandscapeMode>
				: <PortraitMode>
					{children}
				</PortraitMode>
			}
		</ContextRef.Provider>;
	};


export function usePortraitMode() {

	return useAndRequireContext(ContextRef);
}


const PortraitMode = styled.div`

  @media screen and (orientation: landscape) and (max-height: 425px)  {
    display: none;
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
