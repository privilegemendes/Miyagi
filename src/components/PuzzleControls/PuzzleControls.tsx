import * as React from 'react';
import {FC, useState} from 'react';
import styled from "styled-components";
import {
	useGameTimer,
	usePuzzle, usePuzzleMoves, useSolvePuzzle
} from "../../contexts/puzzle-provider/PuzzleProvider";
import {Button3D} from "../atoms/Button3D";
import {formatTime} from "../../common/time";
import {useTimer} from "../../hooks/useTimer/useTimer";


export const PuzzleControls:FC = () => {

	const {startNewGame, resetGame, gameState} = usePuzzle();
	const {timer, isPaused, isActive} = useGameTimer();
	const numberOfMoves = usePuzzleMoves();
	const solvePuzzle = useSolvePuzzle();

	return <SettingsContainer>
		<StatsContainer>
			<Stats>{formatTime(timer)}</Stats>
			<Stats>Moves: {numberOfMoves}</Stats>
		</StatsContainer>
		<NewGame>
			{(!isActive && !isPaused) ?
			 <Button3D text={"Start"} onClick={startNewGame}/>
				: isPaused
					? <Button3D text={"Resume"} onClick={startNewGame}/>
					: <Button3D text={"Pause"} onClick={startNewGame}/>
			}
			{/*<Button3D text={"Play"} onClick={startNewGame}/>*/}
			<Button3D text={"Reset"} onClick={resetGame}/>
		</NewGame>
		<NewGame>
			<Button3D text={"Solve Puzzle"} onClick={solvePuzzle}/>
		</NewGame>

	</SettingsContainer>;
}

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  //border: 1px solid #08a0ff;
  border-radius: 8px;
`

const NewGame = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto;
`;

const Stats = styled.h2`
  color: #ffffff;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

