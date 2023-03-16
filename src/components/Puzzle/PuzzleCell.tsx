import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";
import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";

export const PuzzleCell:FC = () => {

	const {puzzle, puzzleSolved, reset, movePuzzlePiece} = usePuzzle();
	return <>
		{puzzle.map((value, index) => (
			<PuzzleCellContainer
				key={index}
				onClick={() => movePuzzlePiece(index)}>
				<Cell value={value} puzzleSolved={puzzleSolved} reset={reset}>
					{value === 0 ? "" : value}
				</Cell>
			</PuzzleCellContainer>
		))}
	</>
}


type StyleProps = {
	value: number;
	puzzleSolved: boolean;
	reset: boolean;
}
const PuzzleCellContainer = styled.div`
  position: relative;
  z-index: 1000;
  height: 1fr;
  width: 1fr;
  padding: 2px;
  //border: 1px solid #08a0ff;
`;

const Cell = styled.div<StyleProps>`
  display: flex;
  border-radius: 6px;
  border: ${props =>
    props.reset ? "1px solid #ffffff" 
    : props.puzzleSolved 
    ? "1px solid #08ffbd"
    : (
		props.value === 0 
	    ? "none" 
	    : "1px solid #08a0ff"
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
  
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  height: 100%;
  width: 100%;
  transition: 0.3s all ease-in-out;
  cursor: pointer;
`;
