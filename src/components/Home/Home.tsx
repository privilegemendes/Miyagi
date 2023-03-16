import * as React from 'react';
import {FC} from 'react';
import {PuzzleProvider} from "../../contexts/puzzle-provider/PuzzleProvider";
import {PuzzleLayout} from "../Puzzle";
import {PuzzleControls} from "../PuzzleControls";
import styled from "styled-components";
import ProfileSection from "../ProfileSection";
import NavBar from "../NavBar";
import Toast from "../Toast";

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
          <ProfileContainer>
                <ProfileSection/>
          </ProfileContainer>
      </PuzzleProvider>
  </HomeGridContainer>
}

export default Home;


const HomeGridContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-template-rows: 0.1fr 1fr;
    grid-template-areas:  "puzzle nav" "puzzle profile";
    grid-gap: 1rem;
    height: 100vh;
    width: 100vw;
    max-width: 1200px;
    margin: auto;
    background: hsl(210deg, 30%, 8%);
    color: #fff;
    
    @media screen and (orientation: portrait) and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 0.1fr;
        grid-template-areas: "puzzle" "nav";
        grid-gap: 0;
    }
`;

const PuzzleContainer = styled.div`
    grid-area: puzzle;
    margin: auto;
    max-width: 800px;
    padding: 16px;
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


// return <Container>
//   <AppBar>
//     <Title>Miyagi</Title>
//     <Description>
//       A puzzle slider game with a twist
//     </Description>
//     <GitHubShareButton/>
//   </AppBar>
//   <Main>
//     <PuzzleProvider>
//       <PuzzleLayout/>
//       <PuzzleConfigurations/>
//     </PuzzleProvider>
//   </Main>
//   <BottomAppBar>
//     <RankButton/>
//     <GameButton/>
//     <ProfileButton/>
//   </BottomAppBar>
// </Container>;
