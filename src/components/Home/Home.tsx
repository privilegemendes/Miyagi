import * as React from 'react';
import {FC} from 'react';
import {PuzzleProvider} from "../../contexts/puzzle-provider/PuzzleProvider";
import {PuzzleLayout} from "../Puzzle";
import {PuzzleControls} from "../PuzzleControls";
import styled from "styled-components";
import NavBar from "../NavBar";
import {GitHubShareButton} from "../atoms/GitHubShareButton";

export const Home:FC = () => {

  return <HomeGridContainer>
      <PuzzleProvider>
            <PuzzleContainer>
                <PuzzleLayout/>
                <PuzzleControls/>
            </PuzzleContainer>
          <NavContainer>
                <NavBar/>
          </NavContainer>
          <RightContainer>
              <GitHubShareButton/>
          </RightContainer>
          {/*<ProfileContainer>*/}
          {/*      <ProfileSection/>*/}
          {/*</ProfileContainer>*/}
      </PuzzleProvider>
  </HomeGridContainer>
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
    //grid-gap: 1rem;
    height: 100vh;
    width: 100vw;
    max-width: 1200px;
    margin: auto;
    background: hsl(210deg, 30%, 8%);
    color: #fff;

    // move all content to the 2nd column and leave 1 and 2 empty
    & > * {
        grid-column: 2;
    }
    
    @media screen and (orientation: portrait) and (max-width: 768px) {
        grid-template-rows: 1fr 0.1fr;
        grid-template-areas:  
        "left puzzle right" 
        "left nav right";
        grid-gap: 0;
    }
`;

const PuzzleContainer = styled.div`
    grid-area: puzzle;
    margin: auto;
    max-width: 800px;
    padding: 16px;
`;

const RightContainer = styled.div`
    grid-area: right;
`;

const StatsContainer = styled.div`
    grid-area: stats;
`;

const ProfileContainer = styled.div`
    grid-area: profile;
    min-width: 0px;
`;

const NavContainer = styled.div`
    grid-area: nav;
`;
