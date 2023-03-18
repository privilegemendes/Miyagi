import * as React from "react";
import {FC} from "react";
import {PuzzleLayout} from "../Puzzle";
import {PuzzleControls} from "../PuzzleControls";
import styled from "styled-components";
import NavBar from "../NavBar";
import {
	useGetNameFromWebStorage
} from "../../hooks/useGetNameFromWebStorage/useGetNameFromWebStorage";
import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";

type Props = {};

type StyleProps = {
	puzzleSolved: boolean;
	reset: boolean;

}
export const Game: FC<Props> = () => {

	const playerName = useGetNameFromWebStorage();
	const { puzzleSolved, reset} = usePuzzle();

	return<>
		<NavBar/>
		<GameWrapper reset={reset} puzzleSolved={puzzleSolved}>
			<GameContainer>
				<Name>Player: {playerName}</Name>
				<PuzzleLayout/>
				<PuzzleControls/>
			</GameContainer>
		</GameWrapper>
		</>;
}
const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
`;

const GameWrapper = styled.div<StyleProps>`
  grid-area: puzzle;
  display: flex;
  flex-direction: column;

  @media screen  and (min-width: 769px) {
    margin: 16px 16px 16px 16px;
    border: ${props =>
            props.reset ? "1px solid #ffffff"
                    : props.puzzleSolved
                            ? "1px solid #08ffbd"
                            : "1px solid #08a0ff"
			};
    flex-wrap: nowrap;
    justify-content: stretch;
    border-radius: 4px;
    transition: border 0.1s ease-in-out;
  }
  `;

const GameContainer = styled.div`
	
	margin: auto;
	display: flex;
	flex-direction: column;
	position: relative;
  	justify-content: stretch;
	
  
	@media screen and (max-width: 768px) {
		padding-top: 30px;
	}
`;
