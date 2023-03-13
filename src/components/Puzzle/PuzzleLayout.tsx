import * as React from 'react';
import {FC} from "react";
import styled from "styled-components";
import {PuzzleCells} from "./PuzzleCells";
import {usePuzzleSize} from "../../contexts/puzzle-provider/PuzzleProvider";

export const PuzzleLayout:FC = () => {

	const {rows, columns} = usePuzzleSize();


	return <PuzzleContainer columns={columns} rows={rows}>
		<PuzzleCells/>
		</PuzzleContainer>;
}


const PuzzleContainer = styled.div.attrs<{ columns: number | undefined, rows: number | undefined }>(props => ({
	columns: props.columns || 5,
	rows: props.rows || 5
}))<{ columns: number | undefined, rows: number | undefined }>`
  display: grid;
  //border: 1px solid #08a0ff;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 1fr);
  background: linear-gradient(to bottom, rgba(19, 19, 33, 0.51) 0%, rgba(31, 28, 44, 0.58) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  box-shadow: 0 2px 20px 0 #000000;
  width: 50vw;
  height: 50vw;
  margin: auto;
  padding: 2px;
`
