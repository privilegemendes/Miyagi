import {FC} from "react";
import {PuzzleLayout} from "../Puzzle";
import {PuzzleControls} from "../PuzzleControls";
import * as React from "react";
import styled from "styled-components";
import NavBar from "../NavBar";
import {
	useGetNameFromStorage
} from "../../hooks/useGetPlayerDetails/useGetPlayerDetails";

type Props = {};

export const Game: FC<Props> = () => {

	const name = useGetNameFromStorage('name');

	return<>
		<NavBar/>
		<GameContainer>
			<Name>Player: {name}</Name>
			<PuzzleLayout/>
			<PuzzleControls/>
		</GameContainer>
		</>;
}
const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
`;

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
