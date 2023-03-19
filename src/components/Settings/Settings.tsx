import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";

import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";
import NavBar from "../NavBar";
import {
    useGetNameFromWebStorage
} from "../../hooks/useGetNameFromWebStorage/useGetNameFromWebStorage";
import {PuzzleLayout} from "../Puzzle";

export const Settings: FC = () => {

    const name = useGetNameFromWebStorage();

      return<>
          <NavBar/>
          <ProfileContainer>
              <SettingsContainer>
                  <Name>Game Settings</Name>
                  <h1>{name}</h1>
                  <Difficulty/>
              </SettingsContainer>
              <PuzzleLayout/>
          </ProfileContainer>
      </>

}

const Difficulty: FC = () => {
  const {puzzleSize, onSliderChange} = usePuzzle();
  const minPuzzleSize = 3;
  const maxPuzzleSize = 6;

  return <Setting>
      <SettingTitle>Difficulty</SettingTitle>
      {puzzleSize}
      <SettingControl>
          <Slider onChange={onSliderChange} type="range" min={minPuzzleSize} max={maxPuzzleSize} value={puzzleSize}/>
      </SettingControl>
    </Setting>
}

const ProfileContainer = styled.div`
    grid-area: puzzle;
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

    @media screen  and (min-width: 769px) {
        margin: 16px 16px 16px 16px;
        border: 1px solid #ffffff;
        flex-wrap: nowrap;
        justify-content: stretch;
        border-radius: 4px;
        transition: border 0.1s ease-in-out;
    }
`;


const Name = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
`;


const SettingsContainer = styled.div`
  order: 1;
  flex: 1 1 auto;
  align-self: center;
`;

const Setting = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: flex-start;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  //background-color: #3d3d3d;
  margin-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
`;

const SettingTitle = styled.div`

  order: 0;
  flex: 0 1 auto;
  align-self: auto;
  font-size: 0.9rem;
`;

const SettingControl = styled.div`
  order: 1;
  flex: 0 1 auto;
  align-self: auto;
`;


const Slider = styled.input`
  color: #ffffff;
  display: block;
  margin: 8px auto;
  width: 50%;
`

const SliderRange = styled.div`
    margin-top: 30px;
    width: 608px;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    color: #FFFFFF;
`;
