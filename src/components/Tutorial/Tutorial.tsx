import React, {FC, useEffect} from "react";
import ReactMarkdown from 'react-markdown'
import NavBar from "../NavBar";
import {Toast} from "../Toast";
import styled from "styled-components";
import {usePlayerName} from "../../hooks/usePlayerName/usePlayerName";
import useFirstTimeVisitor
	from "../../hooks/useFirstTimeVisitor/useFirstTimeVisitor";
import {useHistory} from "react-router-dom";

import remarkGfm from "remark-gfm";

export const Tutorial:FC = () => {
	const playerName = usePlayerName();

	const [rememberMe, setRememberMe] = React.useState(false);
	const firstTimeVisitor = useFirstTimeVisitor('firstTimeVisitor');
	const history = useHistory();

	console.log(history.location.pathname);

	useEffect (() => {
		const currentPath = history.location.pathname;
		if (!firstTimeVisitor) {
			setRememberMe(true);
		}else{
			history.push('/game');
		}

		if (currentPath !== undefined || null) {
			setRememberMe(false);
		}
	}, [history, firstTimeVisitor]);


	return <>
		<TutorialWrapper>
			<TutorialContainer>
			<ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]}/>
			</TutorialContainer>
			{rememberMe && (
			<Toast
				variant={"notice"}
				enableAction={true}
				action={"New game"}
				onClick={() => history.push('/game')}
				onClose={() => setRememberMe(false)}

			>
				<h1>Hi 👋, you are {playerName && <p>{playerName} right ?</p>}</h1><br/>
				<p>It looks like you've been here before. If you want to start a new game Click here 👇👇.</p>

			</Toast>)}
		</TutorialWrapper>
		<NavBar/>
	</>
};

const TutorialWrapper = styled.div`
  grid-area: puzzle;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-content: stretch;
  background: linear-gradient(to bottom, rgba(19, 19, 33, 0.51) 0%, rgba(31, 28, 44, 0.58) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  box-shadow: 0 2px 20px 0 #000000;
  padding: 12px;
  margin: 12px;
  flex: 1 1 auto;

  @media screen  and (min-width: 769px) {
    margin: 16px 16px 16px 16px;
    border: 1px solid #ffffff;
    flex-wrap: nowrap;
    justify-content: stretch;
    border-radius: 4px;
    transition: border 0.1s ease-in-out;
    flex: 1 1 auto;
  }
  `;

const TutorialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  padding: 12px;
  overflow-y: auto;
  flex: 1 1 auto;
`;

const markdown = `	
# Welcome to the Miyagi, Puzzle Solver Game!

This is a fun and challenging game that involves sliding tiles around on a 3x3 grid to solve a puzzle. 
The goal is to rearrange the tiles so that they are in the correct order, which is typically a numbered sequence from 1 to 8, 
with an empty space in the bottom right corner.

## How to Play
To play the game, simply click and drag a tile to slide it into the empty space. You can only slide tiles that are adjacent to the empty space, 
and you cannot move the empty space itself. Your goal is to use these movements to rearrange the tiles until they are in the correct order.

The game can be quite challenging, but don't worry! You can always hit the "reset" or "hint" button to start over if you get stuck. 
You can also time yourself to see how quickly you can solve the puzzle, and try to beat your own record.

So go ahead and give the 3x3 puzzle slider game a try! 
It's a great way to test your problem-solving skills and have some fun at the same time.
`
