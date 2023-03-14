import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";
import {
	usePuzzle
} from "../../contexts/puzzle-provider/PuzzleProvider";
import {Button3D} from "../atoms/Button3D";


export const PuzzleConfigurations:FC = () => {

	const {puzzleSize, onSliderChange, startNewGame} = usePuzzle();

	return <SettingsContainer>
		<Slider onChange={onSliderChange} type="range" min="4" max="6" value={puzzleSize}/>
		<Button3D text={"Start New Game"} onClick={startNewGame}/>
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


