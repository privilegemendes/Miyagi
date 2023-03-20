import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";
import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";

export const PuzzleCell:FC = () => {

	const {puzzle, puzzleSolved, reset, gameState, hintValue, showHintToggle, movePuzzlePiece} = usePuzzle();


	return <>
		{puzzle.map((value, index) => (
			<PuzzleCellContainer
				key={index}
				onClick={() => movePuzzlePiece(index)}>
				<Cell
					value={value}
					puzzleSolved={puzzleSolved}
					gameState={gameState}
					reset={reset}
				>
					<HighlightCell
						hint={showHintToggle ? hintValue : -1}
						value={value}
						puzzleSolved={puzzleSolved}
					>
						{value === 0 ? "" : value}
					</HighlightCell>
				</Cell>
			</PuzzleCellContainer>
		))}
	</>
}


type StyleProps = {
	value?: number;
	background?: string;
	gameState?: string;
	puzzleSolved?: boolean;
	reset?: boolean;
	hint?: number;
	isPaused?: boolean;
	isActive?: boolean;
}
const PuzzleCellContainer = styled.div`
  position: relative;
  z-index: 1000;
  height: 1fr;
  width: 1fr;
  padding: 2px;
`;
const HighlightCell = styled.div<StyleProps>`
  display: flex;
  border-radius: 6px;
  background: ${props => (!props.reset || !props.puzzleSolved) ? (props.hint === props.value ? "#13d531" : "none"): "none"};
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  height: 100%;
  width: 100%;
  cursor: cell;
  transition: background 0.1s ease-in-out;

`;

const Cell = styled.div<StyleProps>`
  display: flex;
  border-radius: 6px;
  //aspect-ratio: 1/1;
  height: 100%;
  width: 100%;
  transition: background 0.2s ease-in-out;

  background: none;
  border: 1px solid #ffffff;

  ${(props) => props.gameState === "Play" && "border: 1px solid #ffffff;"}
  ${(props) => props.gameState === "Pause" && props.value === 0 && "border: none;"}
  ${(props) => props.gameState === "Pause" && props.value !== 0 && "border: 1px solid #48a4ff;"}
  ${(props) => props.gameState === "Resume" && "border: 1px solid #DEA883FF;"}
  ${(props) => props.puzzleSolved && "border: 1px solid #08ffbd;"}


  ${(props) => props.gameState === "Play" && "background: none;"}
  ${(props) => props.gameState === "Pause" && props.value === 0 && "background: none;"}
  ${(props) => props.gameState === "Pause" && props.value !== 0 && "background: #0066ff;"}
  ${(props) => props.gameState === "Resume" && "background: #FF6811FF;"}
  ${(props) => props.puzzleSolved && "background: #13d531;"}


`;
