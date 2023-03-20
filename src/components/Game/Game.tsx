import * as React from "react";
import {FC} from "react";
import {PuzzleLayout} from "../Puzzle";
import {PuzzleControls} from "../PuzzleControls";
import styled from "styled-components";
import NavBar from "../NavBar";
import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";
import {usePlayerName} from "../../hooks/usePlayerName/usePlayerName";

type Props = {};

type StyleProps = {
	puzzleSolved: boolean;
	gameState: string;
	reset: boolean;

}
export const Game: FC<Props> = () => {

	const playerName = usePlayerName();
	const { puzzleSolved, reset, gameState} = usePuzzle();

	return<>
		<NavBar/>
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
		</>;
}
const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: left;
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
	
	margin: auto;
	display: flex;
	flex-direction: column;
	position: relative;
  	justify-content: stretch;
	
  
	@media screen and (max-width: 768px) {
		padding-top: 30px;
	}
`;
