import * as React from 'react';
import {FC} from "react";
import styled from "styled-components";
import {PuzzleCell} from "./PuzzleCell";
import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";

type PuzzleContainerProps = {
	puzzleSize: number;
}
export const PuzzleLayout:FC = () => {

	const {puzzleSize} = usePuzzle();

	return <PuzzleContainer puzzleSize={puzzleSize}>
			<PuzzleCell/>
		</PuzzleContainer>;
}

const PuzzleContainer = styled.div<PuzzleContainerProps>`
  display: grid;
  //border: 1px solid #08a0ff;
  grid-template-columns: repeat(${props => props.puzzleSize}, 1fr);
  grid-template-rows: repeat(${props => props.puzzleSize}, 1fr);
  //grid-gap: 2px;
  background: linear-gradient(to bottom, rgba(19, 19, 33, 0.51) 0%, rgba(31, 28, 44, 0.58) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  box-shadow: 0 2px 20px 0 #000000;
  
  @media (max-width: 768px) { 
    width: 90vw;
    height: 50vh;
  }
  
  width: 40vw;
  height: 60vh;
  margin: auto;
`
