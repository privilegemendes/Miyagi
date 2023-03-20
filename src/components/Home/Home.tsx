import * as React from 'react';
import {FC} from 'react';
import {PuzzleProvider} from "../../contexts/puzzle-provider/PuzzleProvider";
import styled from "styled-components";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import {GitHubShareButton} from "../atoms/GitHubShareButton";
import {Game} from "../Game";
import {Settings} from "../Settings";
import {Rank} from "../Rank";
import {
    GameSettingsProvider,
} from "../../contexts/game-settings-provider/GameSettingsProvider";

import {ZoomDisabler} from "../ZoomDisabler";
import {usePortraitMode} from "../../hooks/usePortraitMode/usePortraitMode";
import {
    PortraitModeProvider
} from "../../contexts/portrait-mode-provider/PortraitModeProvider";
import {
    useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";
import {Tutorial} from "../Tutorial";


type StyleProps = {
    height: number;
    width: number;
}
const Routes: FC = () => {
    return<>
        <Switch>
            <Route path="/settings"><Settings/></Route>
            <Route path="/rank"><Rank/></Route>
			<Route path="/game"><Game/></Route>
			<Route path="/"><Tutorial/></Route>
        </Switch>
    </>
}
export const Home:FC = () => {

    usePortraitMode();
    const {height, width} = useWindowDimensions();
  return <>
          <ZoomDisabler/>
		  <Router>
			  <PortraitModeProvider>
				  <HomeGridContainer width={width} height={height}>
					  <GameSettingsProvider>
						  <PuzzleProvider>
							  <Routes/>
							  <RightContainer>
								  <GitHubShareButton/>
							  </RightContainer>
						  </PuzzleProvider>
					  </GameSettingsProvider>
				  </HomeGridContainer>
			  </PortraitModeProvider>
		  </Router>
        </>

}

export default Home;


const HomeGridContainer = styled.div<StyleProps>`
    position: relative;
    display: grid;
    grid-template-columns: 1fr min(65ch, 100%) 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
        "nav puzzle right";
	  width: 100vw;
	  height: 100vh;
    background: hsl(210deg, 30%, 8%);
    color: #fff;
    
    @media screen and (max-width: 768px) {
        grid-template-rows: 1fr 0.2fr;
        grid-template-columns: 1fr min(65ch, 100%) 1fr;
        grid-template-areas:  
        "left puzzle right" 
        "left nav right";
        //height: ${props => props.height - 24}px;
    }
    
`;



const RightContainer = styled.div`
    grid-area: right;
    @media screen and (max-width: 768px) {
        display: none;
        
    }
`;
