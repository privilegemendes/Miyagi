import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import NavBar from "../NavBar";
import {
    loadGameData,
    SavedGame,
} from "../../hooks/useLoadGameData/useLoadGameData";
import {usePlayerName} from "../../hooks/usePlayerName/usePlayerName";

type Player = {
    rank: number;
    time: string;
    moves: number;
    hints: number;
    puzzleSize: string;
};

type Props = {
    players: Player[];
};

export const Rank: FC = () => {

    const [savedGames, setSavedGames] = useState<SavedGame[]>([]);
    const playerName = usePlayerName();

    useEffect(() => {
        const savedGamesFromStorage = loadGameData();
        setSavedGames(savedGamesFromStorage);
    }, []);

    return <>
        <NavBar/>
        <RankContainer>
            <RankTable>
                <Title>🏆 {playerName}'s Wall of Shame 🏆</Title>
                <RankTableHeader>
                    <RankTableCell>Rank</RankTableCell>
                    <RankTableCell>Time</RankTableCell>
                    <RankTableCell>Moves</RankTableCell>
                    <RankTableCell>Hints</RankTableCell>
                    <RankTableCell>Size</RankTableCell>
                </RankTableHeader>
                { savedGames.length > 0 ?
                                savedGames.map((game) => (
                            <RankTableRow key={game.id}>
                                <RankTableCell>{game.id}</RankTableCell>
                                <RankTableCell>{game.time}</RankTableCell>
                                <RankTableCell>{game.moves}</RankTableCell>
                                <RankTableCell>{game.hints}</RankTableCell>
                                <RankTableCell>{game.puzzleSize}</RankTableCell>
                            </RankTableRow>
                        ))
                    :
                    <div style={{textAlign:"center", margin:"auto"}}>
                        Oops! no saved games found.
                    </div>
                }
            </RankTable>
        </RankContainer>

    </>;
};

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 16px;
`;

const RankContainer = styled.div`
    grid-area: puzzle;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    @media screen  and (min-width: 769px) {
        margin: 16px 16px 16px 16px;
        border: 1px solid #ffffff;
        flex-wrap: nowrap;
        justify-content: stretch;
        border-radius: 4px;
        transition: border 0.1s ease-in-out;
        padding: 16px;
    }
`;

const RankTable = styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    flex: 1 1 auto;

    background: linear-gradient(to bottom, rgba(19, 19, 33, 0.51) 0%, rgba(31, 28, 44, 0.58) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    box-shadow: 0 2px 20px 0 #000000;
    padding: 16px;
    margin: 16px;
`;

const RankTableHeader = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    font-weight: bold;
`;

const RankTableCell = styled.div`
    flex-basis: 25%;
    text-align: center;
    color: #fff;
`;

const RankTableRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
    padding: 5px;
    //background-color: #fff;
`;
