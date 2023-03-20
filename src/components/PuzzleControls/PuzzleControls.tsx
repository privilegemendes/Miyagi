import * as React from 'react';
import {FC, useEffect} from 'react';
import styled from "styled-components";
import {
	useGameTimer,
	usePuzzle,
	usePuzzleMoves
} from "../../contexts/puzzle-provider/PuzzleProvider";
import {Button3D} from "../atoms/Button3D";
import {formatTime} from "../../common/time";


export const PuzzleControls:FC = () => {

	const {puzzleSize} = usePuzzle();
	const {startNewGame, resetGame, reset, puzzleSolved, gameState, hintsUsed, showHint, hideHint} = usePuzzle();
	const {timer} = useGameTimer();
	const numberOfMoves = usePuzzleMoves();

	const [showHints, setShowHints] = React.useState<boolean>(true);

	useEffect(() => {
		if (puzzleSize > 3) {
			setShowHints(false);
		}
	},[puzzleSize]);

	return <SettingsContainer>
		<StatsContainer>
			<Stats>{formatTime(timer)}</Stats>
			<Stats>Moves: {numberOfMoves}</Stats>
			{showHints ? <Stats>Hints: {hintsUsed}</Stats> : <Stats>Hints: 🚫</Stats>}
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
				onMouseDown={showHint}
				onMouseUp={hideHint}
				onMouseLeave={hideHint}
				disabled={reset || puzzleSolved || puzzleSize > 3 || hintsUsed === 0}
			/>
			<Button3D text={"Reset"} onClick={resetGame}/>
		</NewGame>
	</SettingsContainer>;
}

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
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
`;

