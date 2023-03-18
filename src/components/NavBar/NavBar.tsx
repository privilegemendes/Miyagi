import * as React from 'react';
import styled from "styled-components";
import {RankButton} from "../atoms/RankButton";
import {GameButton} from "../atoms/GameButton";
import {SettingsButton} from "../atoms/SettingsButton";

function NavBar() {
  return <NavContainer>
    <RankButton/>
    <GameButton/>
    <SettingsButton/>
  </NavContainer>;
}

export default NavBar;

const NavContainer = styled.div`
    grid-area: nav;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 16px;
    //border: 1px solid #08a0ff;
`;
