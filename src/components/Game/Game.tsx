import * as React from "react";
import {FC, useEffect, useState} from "react";
import {PuzzleLayout} from "../Puzzle";
import {PuzzleControls} from "../PuzzleControls";
import styled from "styled-components";
import NavBar from "../NavBar";
import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";
import {usePlayerName} from "../../hooks/usePlayerName/usePlayerName";
import useFirstTimeVisitor
	from "../../hooks/useFirstTimeVisitor/useFirstTimeVisitor";
import {Toast} from "../Toast";

type Props = {};

type StyleProps = {
	puzzleSolved: boolean;
	gameState: string;
	reset: boolean;

}
export const Game: FC<Props> = () => {

	const playerName = usePlayerName();
	const { puzzleSolved, reset, gameState,startNewGame} = usePuzzle();

	const [rememberMe, setRememberMe] = useState(false);
	const firstTimeVisitor = useFirstTimeVisitor('firstTimeVisitor');

	useEffect (() => {
		if (!firstTimeVisitor) {
			setRememberMe(true);
		}
	}, [firstTimeVisitor]);

	const handleNewGame = () => {
		startNewGame();
		setRememberMe(false);
	}

	return<>
		<GameWrapper
			reset={reset}
			puzzleSolved={puzzleSolved}
			gameState={gameState}
		>
			<GameContainer>
				<PlayerNameContainer>
					<Name>Player:</Name>
					<Name>{playerName}</Name>
				</PlayerNameContainer>
				<PuzzleLayout/>
				<PuzzleControls/>
			</GameContainer>
		</GameWrapper>
		<NavBar/>
		{
			!rememberMe && (
				<Toast
					variant={"notice"}
					enableAction={true}
					action={"New game"}
					onClick={handleNewGame}
					onClose={() => setRememberMe(false)}
				>
					<h1>Hi 👋, Welcome to Miyagi</h1><br/>
					<p>To start a new game Click here <br/>👇👇.</p>
				</Toast>
			)
		}
		</>;
}
const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: left;
  margin-right: 8px;
  margin-left: 8px;
  
  @media screen and (max-width: 768px) {
	font-size: 1.2rem;
  }
`;


const PlayerNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;


const GameWrapper = styled.div<StyleProps>`
  grid-area: puzzle;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  padding: 12px;
  flex: 1 1 auto;
  
  @media screen  and (min-width: 769px) {
    margin: 16px 16px 16px 16px;
    border: 1px solid #ffffff;
	${(props) => props.gameState === "Play" && "border: 1px solid #ffffff;"} 
	${(props) => props.gameState === "Pause" && "border: 1px solid #48a4ff;"}
	${(props) => props.gameState === "Resume" && "border: 1px solid #DEA883FF;"}
	${(props) => props.puzzleSolved && "border: 1px solid #08ffbd;"}
    flex-wrap: nowrap;
    justify-content: stretch;
    border-radius: 4px;
    transition: border 0.1s ease-in-out;
  }
  `;

const GameContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
  	justify-content: stretch;
	margin-bottom: auto;
	margin-top: auto;
`;
