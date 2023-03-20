import React, {FC, useEffect} from "react";
import ReactMarkdown from 'react-markdown'
import NavBar from "../NavBar";
import {Toast} from "../Toast";
import styled from "styled-components";
import {usePlayerName} from "../../hooks/usePlayerName/usePlayerName";
import useFirstTimeVisitor
	from "../../hooks/useFirstTimeVisitor/useFirstTimeVisitor";
import {useHistory} from "react-router-dom";

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
		}

		if (currentPath !== undefined || null) {
			setRememberMe(false);
		}
	}, [history, firstTimeVisitor]);


	return <>
		<NavBar/>
		<TutorialWrapper>
			<TutorialContainer>
			<ReactMarkdown children={markdown}/>
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
	</>
};

const TutorialWrapper = styled.div`
  grid-area: puzzle;
  display: flex;
  flex-direction: column;
  align-content: stretch;
  background: linear-gradient(to bottom, rgba(19, 19, 33, 0.51) 0%, rgba(31, 28, 44, 0.58) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  box-shadow: 0 2px 20px 0 #000000;
  padding: 12px;
  margin: 12px;

  @media screen  and (min-width: 769px) {
    margin: 16px 16px 16px 16px;
    border: 1px solid #ffffff;
    flex-wrap: nowrap;
    justify-content: stretch;
    border-radius: 4px;
    transition: border 0.1s ease-in-out;
  }
  `;

const TutorialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  padding: 12px;
  overflow-y: scroll;
`;

const markdown = `	
# A demo of \`react-markdown\`

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`h1\`)
* Has a lot of plugins

## Table of contents

`
