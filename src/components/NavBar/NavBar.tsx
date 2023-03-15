import * as React from 'react';
import styled from "styled-components";
import {RankButton} from "../atoms/RankButton";
import {GameButton} from "../atoms/GameButton";
import {ProfileButton} from "../atoms/ProfileButton";

function NavBar() {
  return <NavContainer>
    <RankButton/>
    <GameButton/>
    <ProfileButton/>
  </NavContainer>;
}

export default NavBar;

const NavContainer = styled.div`
    grid-area: nav;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 16px;
`;
