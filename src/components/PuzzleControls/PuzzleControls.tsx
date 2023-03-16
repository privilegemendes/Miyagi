import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";
import {
	useGameTimer,
	usePuzzle,
	usePuzzleMoves,
	useSolvePuzzle
} from "../../contexts/puzzle-provider/PuzzleProvider";
import {Button3D} from "../atoms/Button3D";
import {formatTime} from "../../common/time";


export const PuzzleControls:FC = () => {

	const {startNewGame, resetGame, reset, puzzleSolved, gameState} = usePuzzle();
	const {timer} = useGameTimer();
	const numberOfMoves = usePuzzleMoves();
	const solvePuzzle = useSolvePuzzle();

	return <SettingsContainer>
		<StatsContainer>
			<Stats>{formatTime(timer)}</Stats>
			<Stats>Moves: {numberOfMoves}</Stats>
			<Stats>Hints: {numberOfMoves}</Stats>
		</StatsContainer>
		<NewGame>
			<Button3D
				text={gameState}
				onClick={startNewGame}
				disabled={puzzleSolved}
			/>
		</NewGame>
		<NewGame>
			<Button3D
				text={"Hint"}
				onClick={solvePuzzle}
				disabled={reset || puzzleSolved}
			/>
			<Button3D text={"Reset"} onClick={resetGame}/>
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

