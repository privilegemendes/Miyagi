import * as React from 'react';
import styled from "styled-components";
import {RankButton} from "../atoms/RankButton";
import {GameButton} from "../atoms/GameButton";
import {ProfileButton} from "../atoms/ProfileButton";
import {GitHubShareButton} from "../atoms/GitHubShareButton";
import {
  useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";

function NavBar() {
  const {width} = useWindowDimensions();

  return <NavContainer>
    {width >= 768 && <GitHubShareButton/>}
    <RankButton/>
    <GameButton/>
    <ProfileButton/>
  </NavContainer>;
}

export default NavBar;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 16px;
`;
