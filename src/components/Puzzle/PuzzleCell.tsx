import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";
import {usePuzzleSize} from "../../contexts/puzzle-provider/PuzzleProvider";

export const PuzzleCell:FC = () => {

	const {puzzle, movePuzzlePiece} = usePuzzleSize();

	return <>
		{puzzle.map((value, index) => (
			<PuzzleCellContainer
				key={index}
				onClick={() => movePuzzlePiece(index)}>
				<Cell value={value}>
					{value === 0 ? "" : value}
				</Cell>
			</PuzzleCellContainer>
		))}
	</>
}

const PuzzleCellContainer = styled.div`
  position: relative;
  z-index: 1000;
  height: 1fr;
  width: 1fr;
  padding: 2px;
  //border: 1px solid #08a0ff;
`
const Cell = styled.div.attrs<{ value: number}>(props => ({
	value: props.value || 0
}))<{ value: number}>`
  display: flex;
  border-radius: 8px;
  border: ${props => props.value === 0 ? "none" : "1px solid #08a0ff"};
  background: ${props => props.value === 0 ? "none" : "#0066ff"};
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: 700;
  height: 100%;
  width: 100%;
  transition: 0.3s all ease-in-out;
  cursor: pointer;
`;
