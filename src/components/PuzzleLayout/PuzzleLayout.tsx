import * as React from 'react';
import {FC} from "react";
import styled from "styled-components";
import {PuzzleCell} from "./PuzzleCell";
import {usePuzzleSize} from "../../contexts/puzzle-provider/PuzzleProvider";

export const PuzzleLayout:FC = () => {

	const {rows, columns} = usePuzzleSize();

	console.log(rows, columns);

	return <PuzzleContainer columns={columns} rows={rows}>
		<PuzzleCell/>
		</PuzzleContainer>;
}


const PuzzleContainer = styled.div.attrs<{ columns: number | undefined, rows: number | undefined }>(props => ({
	columns: props.columns || 5,
	rows: props.rows || 5
}))<{ columns: number | undefined, rows: number | undefined }>`
  display: grid;
  border: 1px solid #08a0ff;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 1fr);
  background: linear-gradient(to bottom, #131321 0%, #1f1c2c 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  box-shadow: 0 2px 20px 0 #000000;
  width: 50vw;
  height: 50vw;
  margin: auto;
`
