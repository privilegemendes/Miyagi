import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";
import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";

export const PuzzleCell:FC = () => {

	const {puzzle, puzzleSolved, reset, hintValue, showHintToggle, movePuzzlePiece} = usePuzzle();

	return <>
		{puzzle.map((value, index) => (
			<PuzzleCellContainer
				key={index}
				onClick={() => movePuzzlePiece(index)}>
				<Cell
					value={value}
					puzzleSolved={puzzleSolved}
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
	puzzleSolved?: boolean;
	reset?: boolean;
	hint?: number;
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
  border: ${props =>
    props.reset ? "1px solid #ffffff" 
    : props.puzzleSolved 
    ? "1px solid #08ffbd"
    : (
		props.value === 0 
	    ? "none" 
	    : "1px solid #48a4ff"
    )};
  
  background: ${props => 
	  props.reset ? "rgba(19,19,33,0.51)" :
	  props.puzzleSolved
	  ? "#13d531"
	  : (
          props.value === 0
          ? "none"
          : "#0066ff"
	  )};
`;
