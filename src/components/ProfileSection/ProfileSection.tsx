import * as React from 'react';
import styled from "styled-components";
import {GitHubShareButton} from "../atoms/GitHubShareButton";
import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";
import {FC, useState} from "react";
import {
  useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";

function ProfileSection() {

  const [isDisplay, setDisplay] = useState<boolean>(true);
  const {width} = useWindowDimensions();

  if (width <= 768) {
    return null;
  }

  return <ProfileContainer isDisplay={isDisplay}>
    <Profile/>
    <SettingsContainer>
      <Name>Game Settings</Name>
         <Difficulty/>

    </SettingsContainer>
  </ProfileContainer>;
}

export default ProfileSection;

const Difficulty: FC = () => {
  const {puzzleSize, onSliderChange} = usePuzzle();
  return <Setting>
    <SettingTitle>Difficulty</SettingTitle>
    <SettingControl>
     <Slider onChange={onSliderChange} type="range" min="3" max="6" value={puzzleSize}/>
    </SettingControl>
  </Setting>
}

type StyleProps = {
    isDisplay: boolean;
}
const ProfileContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: stretch;
  align-items: flex-start;
  //border-left: 1px solid #08a0ff;
  background: linear-gradient(to bottom, rgba(19, 19, 33, 0.51) 0%, rgba(31, 28, 44, 0.58) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  box-shadow: 0 2px 20px 0 #000000;
  padding: 16px;
  margin: 16px;
`;

const Avatar = styled.img`
    width: 50%;
    height: 50%;
    border-radius: 50%;
`;

const Name = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
`;

const Heading2 = styled.h2`
    font-size: 0.7rem;
    font-weight: 400;
    margin-top: 8px;
`;

const Profile = styled.div`
  -webkit-order: 0;
  -ms-flex-order: 0;
  order: 0;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -webkit-align-self: auto;
  -ms-flex-item-align: auto;
  align-self: auto;
`;

const SettingsContainer = styled.div`
  order: 1;
  flex: 1 1 auto;
  align-self: center;
`;

const Setting = styled.div`
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-align-content: flex-start;
  -ms-flex-line-pack: start;
  align-content: flex-start;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  background-color: #3d3d3d;
  margin-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
`;

const SettingTitle = styled.div`
  -webkit-order: 0;
  -ms-flex-order: 0;
  order: 0;
  -webkit-flex: 0 1 auto;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  -webkit-align-self: auto;
  -ms-flex-item-align: auto;
  align-self: auto;
  font-size: 0.9rem;
`;

const SettingControl = styled.div`
  -webkit-order: 1;
  -ms-flex-order: 1;
  order: 1;
  -webkit-flex: 0 1 auto;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  -webkit-align-self: auto;
  -ms-flex-item-align: auto;
  align-self: auto;
`;


const Slider = styled.input`
  color: #ffffff;
  display: block;
  margin: 8px auto;
  width: 50%;
`
