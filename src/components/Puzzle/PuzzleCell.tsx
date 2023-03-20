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
  //border: 1px solid #48a4ff;
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
  // /* If the puzzle is solved, use a different border color */
  // ${(props) => props.puzzleSolved && "border-color: #08ffbd;"}
  //
  //   /* If the value is zero, don't display a border */
  // ${(props) => props.value === 0 && "border-style: none;"}
  //
  //   /* If the puzzle is not solved, the value is not zero, and the game is paused, display a border */
  // ${(props) =>
  //         !props.puzzleSolved &&
  //         props.value !== 0 &&
  //         props.isPaused &&
  //         !props.reset &&
  //         "border-style: solid; border-color: #48a4ff;"}
  //
  //   /* If the reset button has been pressed, always display a border */
  // ${(props) => props.reset && "border-style: solid; border-color: #ffffff;"}




// background: ${props =>
// 	props.isPaused && !props.reset && !props.isActive ? "#e80909"
// : props.reset
// ? "rgba(19,19,33,0.51)"
// : props.puzzleSolved
// ? "#13d531"
// : (
//   	props.value === 0
//   	? "none"
// 	: "#0066ff"
// )
// };
