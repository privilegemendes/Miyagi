import * as React from 'react';
import {FC} from "react";
import {
  AppBar, BottomAppBar,
  Container,
  Description,
  Main,
  Title
} from "../../styles/SharedStyles";
import {GitHubShareButton} from "../atoms/GitHubShareButton";
import {PuzzleProvider} from "../../contexts/puzzle-provider/PuzzleProvider";
import {PuzzleLayout} from "../Puzzle";
import {PuzzleConfigurations} from "../PuzzleConfigurations";
import {GameButton} from "../atoms/GameButton";
import {RankButton} from "../atoms/RankButton";
import {ProfileButton} from "../atoms/ProfileButton";

export const Home:FC = () => {

  return <Container>
    <AppBar>
      <Title>Miyagi</Title>
      <Description>
        A puzzle slider game with a twist
      </Description>
      <GitHubShareButton/>
    </AppBar>
    <Main>
      <PuzzleProvider>
        <PuzzleLayout/>
        <PuzzleConfigurations/>
      </PuzzleProvider>
    </Main>
    <BottomAppBar>
      <GameButton/>
      <RankButton/>
      <ProfileButton/>
    </BottomAppBar>
  </Container>;
}

export default Home;
