import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";
import {
	usePuzzle, usePuzzleMoves
} from "../../contexts/puzzle-provider/PuzzleProvider";
import {Button3D} from "../atoms/Button3D";


export const PuzzleControls:FC = () => {

	const {startNewGame} = usePuzzle();
	const NumberOfMoves = usePuzzleMoves();

	return <SettingsContainer>
		<Button3D text={"Start New Game"} onClick={startNewGame}/>
		<h2>Moves: {NumberOfMoves}</h2>
	</SettingsContainer>;
}

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  padding-left: 64px;
  padding-right: 64px;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  //border: 1px solid #08a0ff;
  border-radius: 8px;
`



