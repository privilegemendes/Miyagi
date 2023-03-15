import * as React from 'react';
import {FC} from 'react';
import {PuzzleProvider} from "../../contexts/puzzle-provider/PuzzleProvider";
import {PuzzleLayout} from "../Puzzle";
import {PuzzleControls} from "../PuzzleControls";
import styled from "styled-components";
import StatsSection from "../StatsSection";
import ProfileSection from "../ProfileSection";
import NavBar from "../NavBar";

export const Home:FC = () => {

  return <HomeGridContainer>
      <PuzzleProvider>
        <StatsSection/>
        <PuzzleContainer>
            <PuzzleLayout/>
            <PuzzleControls/>
        </PuzzleContainer>
        <ProfileSection/>
        <NavBar/>
      </PuzzleProvider>
  </HomeGridContainer>
}

export default Home;


const HomeGridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr;
    grid-template-rows: 1.5fr 0.1fr;
    grid-template-areas: "stats puzzle profile" "nav nav nav";
    grid-gap: 1rem;
    height: 100vh;
    width: 100vw;
    
    background: hsl(210deg, 30%, 8%);
    color: #fff;
    @media screen and (orientation: portrait) and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-areas: "puzzle" "nav";
        grid-gap: 0;
    }
  
`;

const PuzzleContainer = styled.div`
    grid-area: puzzle;
    margin: auto;
`;

const StatsContainer = styled.div`
    grid-area: stats;
`;

const ProfileContainer = styled.div`
    grid-area: profile;
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
