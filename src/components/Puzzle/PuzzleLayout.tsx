import * as React from 'react';
import {FC} from "react";
import styled from "styled-components";
import {PuzzleCell} from "./PuzzleCell";
import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";
import {
	useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";

type PuzzleContainerProps = {
	puzzleSize: number;
	width: number;
	height: number;
}
export const PuzzleLayout:FC = () => {

	const {puzzleSize} = usePuzzle();
	const {height, width} = useWindowDimensions();

	return <PuzzleContainer puzzleSize={puzzleSize} height={height} width={width}>
			<PuzzleCell/>
		</PuzzleContainer>;
}

const PuzzleContainer = styled.div<PuzzleContainerProps>`
	display: grid;
	position: relative;
	grid-template-columns: repeat(${props => props.puzzleSize}, 1fr);
	grid-template-rows: repeat(${props => props.puzzleSize}, 1fr);
	background: linear-gradient(to bottom, rgba(19, 19, 33, 0.51) 0%, rgba(31, 28, 44, 0.58) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	box-shadow: 0 2px 20px 0 #000000;
	padding: 16px;
	//margin:auto;
	width: 500px;
	height: 500px;
  
  /* Mobile S 320px */
  @media screen and (orientation: portrait) and (max-width: 320px) {
    width: 90vw;
    height: 40vh;
    padding: 20px;
  }
  @media screen and (orientation: landscape) and (max-height: 320px) {
    width: 38vw;
    height: 90vh;
    margin-top: auto;
    margin-bottom: auto;
  }
  /* Mobile M 375px */
  @media screen and (orientation: portrait) and (min-width: 321px) and (max-width: 375px) {
    width: 90vw;
    height: 50vh;
    padding: 0;
  }

  @media screen and (orientation: landscape) and (min-height: 321px) and (max-height: 375px) {
    width: 45vw;
    height: 90vh;
    padding: 0;
    margin-top: auto;
    margin-bottom: auto;
  }

  /* Mobile L 425px */
  @media screen and (orientation: portrait) and (min-width: 376px) and (max-width: 425px) {
    width: 90vw;
    height: 50vh;
    padding: 0;
  }
  
  /* Tablet 768px */
  @media screen and (orientation: portrait) and (min-width: 426px) and (max-width: 768px) {
    width: 70vw;
    height: 50vh;
  }

  @media screen and (orientation: landscape) and (min-width: 426px) and (max-width: 768px) {
    width: 50vw;
    height: 45vh;
  }
  
	/* Laptop 1024px */
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 50vw;
    height: 50vh;
  }

  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    width: 35vw;
    height: 40vh;
  }
  //
  //@media screen and (min-width: 1441px) {
  //  width: 35vw;
  //  height: 40vh;
  //}

`
