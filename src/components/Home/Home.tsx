import * as React from 'react';
import {FC} from 'react';
import {PuzzleProvider} from "../../contexts/puzzle-provider/PuzzleProvider";
import styled from "styled-components";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {GitHubShareButton} from "../atoms/GitHubShareButton";
import {Game} from "../Game";
import {Settings} from "../Settings";
import {Rank} from "../Rank";
import {
    SettingsProvider
} from "../../contexts/settings-provider/SettingsProvider";

import {ZoomDisabler} from "../ZoomDisabler";
import {usePortraitMode} from "../../hooks/usePortraitMode/usePortraitMode";
import {
    PortraitModeProvider
} from "../../contexts/portrait-mode-provider/PortraitModeProvider";
import {Player} from "../Player";
import {
    useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";


type StyleProps = {
    height: number;
    width: number;
}
const Routes: FC = () => {
    return <Router>
        <Switch>
            <Route path="/game">
                <Game/>
            </Route>
            <Route path="/settings">
                <Settings/>
            </Route>
            <Route path="/rank">
                <Rank/>
            </Route>
            <Route path="/">
                <Player/>
            </Route>
        </Switch>
    </Router>
}
export const Home:FC = () => {

    usePortraitMode();
    const {height, width} = useWindowDimensions();
  return <>
          <ZoomDisabler/>
          <PortraitModeProvider>
              <HomeGridContainer width={width} height={height}>
                  <SettingsProvider>
                      <PuzzleProvider>
                             <Routes/>
                          <RightContainer>
                              <GitHubShareButton/>
                          </RightContainer>
                      </PuzzleProvider>
                  </SettingsProvider>
              </HomeGridContainer>
          </PortraitModeProvider>
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
    height: 100vh;
    width: 100vw;
    background: hsl(210deg, 30%, 8%);
    color: #fff;

    // move all content to the 2nd column and leave 1 and 4 empty
    //& > :not(:first-child) {
    //    grid-column: 2;
    //}
    @media screen and (max-width: 768px) {
        grid-template-rows: 1fr 0.1fr;
        grid-template-columns: 1fr min(65ch, 100%) 1fr;
        grid-template-areas:  
        "left puzzle right" 
        "left nav right";
        height: ${props => props.height - 24}px;
    }

    //@media screen and (min-width: 769px) {
    //    grid-template-columns: 1fr 2fr 1fr;
    //    grid-template-rows: 0.1fr 1fr;
    //}
    
    //@media screen and (orientation: landscape) and (max-height: 425px) {
    //    transform: rotate(-90deg);
    //    transform-origin: left top;
    //    width: 100vh;
    //    height: 100vw;
    //    position: absolute;
    //    top: 100%;
    //    left: 0;
    //}
`;



const RightContainer = styled.div`
    grid-area: right;
    @media screen and (max-width: 768px) {
        display: none;
        
    }
`;
