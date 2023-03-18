import * as React from 'react';
import {FC} from 'react';
import {PuzzleProvider} from "../../contexts/puzzle-provider/PuzzleProvider";
import styled from "styled-components";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {GitHubShareButton} from "../atoms/GitHubShareButton";
import {Game} from "../Game";
import {Settings} from "../Settings";

import {
    SettingsProvider
} from "../../contexts/settings-provider/SettingsProvider";
import {Rank} from "../Rank";
import {ZoomDisabler} from "../ZoomDisabler";

import {ErrorRouterFallback} from "../ErrorFallback";
import {usePortraitMode} from "../../hooks/usePortraitMode/usePortraitMode";
import {
    PortraitModeProvider
} from "../../contexts/portrait-mode-provider/PortraitModeProvider";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Game/>,
        children: [],
        errorElement: <ErrorRouterFallback/>,
    },
    {
        path: "/game",
        element: <Game/>,
        children: [],
        errorElement: <ErrorRouterFallback/>,
    },
    {
        path: "/settings",
        element: <Settings/>,
        children: [],
        errorElement: <ErrorRouterFallback/>,
    },
    {
        path: "/rank",
        element: <Rank/>,
        children: [] ,
        errorElement: <ErrorRouterFallback/>,
    },

]);
export const Home:FC = () => {

    usePortraitMode();
  return <>
          <ZoomDisabler/>
          <PortraitModeProvider>
              <HomeGridContainer>
                  <SettingsProvider>
                      <PuzzleProvider>
                          <RouterProvider
                              router={router}
                              fallbackElement={<div>loading...</div>}
                          />
                          <LeftContainer/>
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


const HomeGridContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1fr min(65ch, 100%) 1fr;
    grid-template-rows: 0.1fr 1fr;
    grid-template-areas:  
        "left nav right" 
        "left puzzle right";
    height: 100vh;
    width: 100vw;
    background: hsl(210deg, 30%, 8%);
    color: #fff;

    // move all content to the 2nd column and leave 1 and 2 empty
    & > * {
        grid-column: 2;
    }
    
    @media screen and (max-width: 768px) {
        grid-template-rows: 1fr 0.1fr;
        grid-template-areas:  
        "left puzzle right" 
        "left nav right";
        grid-gap: 0;
        height: 100%;
        
    }

    @media screen and (min-width: 769px) {
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 0.1fr 1fr;
    }
    
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
`;

const LeftContainer = styled.div`
    grid-area: left;
`;
