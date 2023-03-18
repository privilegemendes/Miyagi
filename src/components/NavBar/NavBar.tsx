import * as React from 'react';
import styled from "styled-components";
import {RankButton} from "../atoms/RankButton";
import {GameButton} from "../atoms/GameButton";
import {SettingsButton} from "../atoms/SettingsButton";
import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";

type StyleProps = {
  puzzleSolved: boolean;
  reset: boolean;

}
function NavBar() {

  const { puzzleSolved, reset} = usePuzzle();

  return <NavContainer puzzleSolved={puzzleSolved} reset={reset}>
    <RankButton/>
    <GameButton/>
    <SettingsButton/>
  </NavContainer>;
}

export default NavBar;

const NavContainer = styled.div<StyleProps>`
  grid-area: nav;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  padding: 16px;


  @media screen  and (min-width: 769px) {
    flex-direction: column;
    justify-content: space-around;
    background: linear-gradient(to bottom, rgba(19, 19, 33, 0.51) 0%, rgba(31, 28, 44, 0.58) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    //box-shadow: 0 2px 20px 0 #000000;
    border-radius: 4px;
    margin: 16px 0 16px auto;
    border: ${props =>
        props.reset ? "1px solid #ffffff"
            : props.puzzleSolved
                ? "1px solid #08ffbd"
                : "1px solid #08a0ff"
    };

  }

`;
