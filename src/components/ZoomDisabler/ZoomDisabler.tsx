import React, {FC} from 'react';
import {Helmet} from 'react-helmet';
import {createGlobalStyle} from 'styled-components';
import {
	useZoomDisablePreventDefaultOnEvents
} from "../../hooks/useZoomDisablePreventDefaultOnEvents/useZoomDisablePrevenDefaultOnEvents";

const GlobalStyle = createGlobalStyle`
  html, body {
    text-size-adjust: none;
    touch-action: pan-y;
  }
`;


export const ZoomDisabler: FC = () => {
	useZoomDisablePreventDefaultOnEvents();
	return <>
			<noscript>
				<Helmet>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
					/>

				</Helmet>
			</noscript>
			<GlobalStyle />
		</>;
};
