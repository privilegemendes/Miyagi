import * as React from 'react';
import {FC, useRef} from 'react';
import styled from "styled-components";
import {usePuzzleSize} from "../../contexts/puzzle-provider/PuzzleProvider";

export const PuzzleCell:FC = () => {

	const {rows, columns} = usePuzzleSize();

	const gridRef = useRef<HTMLDivElement>(null);
	const puzzleCells = Array.from({length: rows}, (_, row) =>
		Array.from({length: columns}, (_, col) => {
			const gridArea = `${row+1} / ${col+1} / ${row+2} / ${col+2}`;
			return <PuzzleCellContainer
				ref={gridRef}
				key={`[${row+1},${col+1}]`}
				style={{gridArea:`${row+1} / ${col+1} / ${row+2} / ${col+2}`,
					height: '1fr', width: '1fr'}}
			></PuzzleCellContainer>
		})
	);


	return <>
		{puzzleCells}
	</>
}

const PuzzleCellContainer = styled.div`
  border: 0.1px dotted white;
  transition: 0.2s all ease;
  cursor: move;
  position: relative;
  z-index: 1000;
  opacity: 0.2;
`
