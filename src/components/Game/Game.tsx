import {FC} from "react";
import {PuzzleLayout} from "../Puzzle";
import {PuzzleControls} from "../PuzzleControls";
import * as React from "react";
import styled from "styled-components";
import NavBar from "../NavBar";

type Props = {};

export const Game: FC<Props> = () => {

	return<>
		<GameContainer>
			<PuzzleLayout/>
			<PuzzleControls/>
		</GameContainer>
		<NavBar/>
		</>;
}

const GameContainer = styled.div`
	grid-area: puzzle;
	margin: auto;
	display: flex;
	flex-direction: column;
	position: relative;
  
	@media screen and (max-width: 768px) {
		padding-top: 30px;
	}
`;
