import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";
import {usePuzzleSize} from "../../contexts/puzzle-provider/PuzzleProvider";
import {Button} from "../Button";


export const PuzzleConfigurations:FC = () => {

    const {puzzleSize, onSliderChange, startNewGame} = usePuzzleSize();

  return <SettingsContainer>
    <Slider onChange={onSliderChange} type="range" min="2" max="10" value={puzzleSize}/>
    <Controls>
        <Button text={"Start New Game"} onClick={startNewGame}/>
    </Controls>
  </SettingsContainer>;
}

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-left: 64px;
  padding-right: 64px;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #08a0ff;
  border-radius: 8px;
`
const Slider = styled.input`
  color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  display: block;
`
const Controls = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;
    width: 50%;
    margin: 16px auto;
    
    @media (max-width: 768px) {
        flex-direction: column;
    }

`


