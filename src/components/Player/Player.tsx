import React, {FC} from 'react';
import {Toast} from "../Toast";
import NavBar from "../NavBar";
import styled from "styled-components";
import {usePlayerName} from "../../hooks/usePlayerName/usePlayerName";

export const Player: FC = () => {

   const playerName = usePlayerName();

    return <>
        <NavBar/>
        <TutorialWrapper>
            <Toast
                variant={"notice"}

                enableAction={false}
            >
                <h1>Hi 👋, Welcome to Miyagi!</h1><br/>
                {/*<Form onSubmit={handleNameSubmit}/>*/}
                {playerName && <p>{playerName}!🤣</p>}
            </Toast>
        </TutorialWrapper>
    </>
};

const TutorialWrapper = styled.div`
  grid-area: puzzle;
  display: flex;
  flex-direction: column;

  @media screen  and (min-width: 769px) {
    margin: 16px 16px 16px 16px;
    border: 1px solid #ffffff;
    flex-wrap: nowrap;
    justify-content: stretch;
    border-radius: 4px;
    transition: border 0.1s ease-in-out;
  }
  `;
