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

	return <PuzzleControlsContainer>
		<StatsContainer>
			<Stats>{formatTime(timer)}</Stats>
			<Stats>Moves: {numberOfMoves}</Stats>
			{showHints ? <Stats>Hints: {hintsUsed}</Stats> : <Stats>Hints: 🚫</Stats>}
		</StatsContainer>
		<GameController>
			<HintButton>
				<Button3D
					text={"Hint"}
					onMouseDown={showHint}
					onMouseUp={hideHint}
					onMouseLeave={hideHint}
					disabled={reset || puzzleSolved || puzzleSize > 3 || hintsUsed === 0}
				/>
			</HintButton>
			<PlayButton>
				<Button3D
					text={gameState}
					onClick={startNewGame}
					disabled={puzzleSolved}
				/>
			</PlayButton>
			<ResetButton>
				<Button3D text={"Reset"} onClick={resetGame}/>
			</ResetButton>
		</GameController>
	</PuzzleControlsContainer>;
}

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const PuzzleControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  border-radius: 8px;
  align-items: stretch;
`

const GameController = styled.div `
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex: 1 1 auto;
  gap: 16px;
`;

const Stats = styled.h2`
  color: #ffffff;
  margin: auto;
  display: flex;
  flex-direction: row;
`;

const PlayButton = styled.div`
	flex: 0 1 auto;
	align-items: center ;
`;

const ResetButton = styled.div`
	flex: 0 1 auto;
  	align-items: center ;
`;

const HintButton = styled.div`
  flex: 0 1 auto;
  align-items: center ;
`;
