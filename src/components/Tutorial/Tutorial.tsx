import React, {FC, useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown'
import NavBar from "../NavBar";
import {Toast} from "../Toast";
import styled from "styled-components";
import {usePlayerName} from "../../hooks/usePlayerName/usePlayerName";
import useFirstTimeVisitor
	from "../../hooks/useFirstTimeVisitor/useFirstTimeVisitor";
import {useHistory} from "react-router-dom";
import tutorial from './tutorial.md';
import remarkGfm from "remark-gfm";
import "./markdown.css";
import rehypeRaw from "rehype-raw";

export const Tutorial:FC = () => {

	const playerName = usePlayerName();
	const [rememberMe, setRememberMe] = React.useState(false);
	const firstTimeVisitor = useFirstTimeVisitor('firstTimeVisitor');
	const history = useHistory();

	useEffect (() => {
		const currentPath = history.location.pathname;
		if (!firstTimeVisitor) {
			setRememberMe(true);
		} else {
			history.push('/game');
		}

		if (currentPath !== undefined || null) {
			setRememberMe(false);
		}
	}, [history, firstTimeVisitor]);


	const [content, setContent] = useState("");

	useEffect(() => {
		fetch(tutorial)
			.then((res) => res.text())
			.then((text) => setContent(text));
	}, []);

	return <>
		<TutorialWrapper>
			<TutorialContainer>
				<ReactMarkdown
					children={content}
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw]}
					className={"markdown-body"}
				/>
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
  display: flex;
  flex-direction: column;
  align-content: stretch;
  background: linear-gradient(to bottom, rgba(19, 19, 33, 0.51) 0%, rgba(31, 28, 44, 0.58) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  box-shadow: 0 2px 20px 0 #000000;
  padding: 12px;
  margin: 12px;
  flex: 1 1 auto;
  overflow: hidden !important;

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
  flex: 1 1 auto;
  overflow-y: scroll;
  height: 100%;
`;
