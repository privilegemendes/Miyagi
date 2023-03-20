import * as React from 'react';
import styled from "styled-components";
import {RankButton} from "../atoms/RankButton";
import {GameButton} from "../atoms/GameButton";
import {SettingsButton} from "../atoms/SettingsButton";
import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";

type StyleProps = {
  puzzleSolved: boolean;
  gameState: string;
  reset: boolean;

}
function NavBar() {

  const { puzzleSolved, reset, gameState} = usePuzzle();

  return <NavWrapper>
	  <NavContainer
		  puzzleSolved={puzzleSolved}
		  reset={reset}
		  gameState={gameState}
	  >
		  <RankButton/>
		  <GameButton/>
		  <SettingsButton/>
	  </NavContainer>
  </NavWrapper>;
}

export default NavBar;
const NavWrapper = styled.div`
  grid-area: nav;
  display: flex;
  
  @media screen and (min-width: 769px) {
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: flex-end;
    align-content: space-around;
  }
`;

const NavContainer = styled.div<StyleProps>`
  
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  padding: 16px;
  justify-content: space-around;
  align-items: stretch;

  @media screen and (min-width: 769px) {
    background: linear-gradient(to bottom, rgba(19, 19, 33, 0.51) 0%, rgba(31, 28, 44, 0.58) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    border-radius: 4px;
    margin: 16px 0 16px auto;
    border: 1px solid #ffffff;
    ${(props) => props.gameState === "Play" && "border: 1px solid #ffffff;"}
    ${(props) => props.gameState === "Pause" && "border: 1px solid #48a4ff;"}
    ${(props) => props.gameState === "Resume" && "border: 1px solid #DEA883FF;"}
    ${(props) => props.puzzleSolved && "border: 1px solid #08ffbd;"}
    flex-direction: column;
    padding: 16px;
	flex: 1 1 auto;
    justify-content: space-around;
  }

`;
