import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import {usePuzzleSize} from "../../contexts/puzzle-provider/PuzzleProvider";

export const PuzzleCell:FC = () => {

	const {puzzleSize} = usePuzzleSize();

	const [puzzle, setPuzzle] = useState<number[]>([]);

	useEffect(() => {
		const setupPuzzle = Array.from({ length: puzzleSize * puzzleSize }, (_, index) => index + 1);
		const emptyCell = puzzleSize * puzzleSize;
		setupPuzzle[emptyCell - 1] = 0;
		setPuzzle(setupPuzzle);

	}, [puzzleSize]);
	const movePuzzlePiece = (index: number) => {
		const emptyIndex = puzzle.indexOf(0);
		const row = Math.floor(emptyIndex / puzzleSize);
		const col = emptyIndex % puzzleSize;
		const moveRow = Math.floor(index / puzzleSize);
		const moveCol = index % puzzleSize;
		if (
			(row === moveRow && Math.abs(col - moveCol) === 1) ||
			(col === moveCol && Math.abs(row - moveRow) === 1)
		) {
			const newPuzzle = [...puzzle];
			newPuzzle[emptyIndex] = puzzle[index];
			newPuzzle[index] = 0;
			setPuzzle(newPuzzle);
		}
	};

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
