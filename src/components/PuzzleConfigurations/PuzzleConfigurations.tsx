import * as React from 'react';
import {FC} from "react";
import styled from "styled-components";
import {usePuzzleSize} from "../../contexts/puzzle-provider/PuzzleProvider";


export const PuzzleConfigurations:FC = () => {

  const {gridSize, onSliderChange} = usePuzzleSize();

  return <SettingsContainer>
    <Slider onChange={onSliderChange} type="range" min="1" max="10" value={gridSize}/>
  </SettingsContainer>;
}

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1fr;
  padding-left: 64px;
  padding-right: 64px;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #08a0ff;
  border-radius: 8px;
`
export const Slider = styled.input`
  color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  display: block;
`
