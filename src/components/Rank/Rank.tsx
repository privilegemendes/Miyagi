import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";
import {players} from "../../assets/mock/players";
import NavBar from "../NavBar";

type Player = {
    rank: number;
    name: string;
    moves: number;
    time: string;
};

type Props = {
    players: Player[];
};

export const Rank: FC = () => {

    return <>
        <NavBar/>
        <RankContainer>
            <RankTable>
                <RankTableHeader>
                    <RankTableCell>Rank</RankTableCell>
                    <RankTableCell>Name</RankTableCell>
                    <RankTableCell>Moves</RankTableCell>
                    <RankTableCell>Time</RankTableCell>
                </RankTableHeader>
                {players.map((player) => (
                    <RankTableRow key={player.rank}>
                        <RankTableCell>{player.rank}</RankTableCell>
                        <RankTableCell>{player.name}</RankTableCell>
                        <RankTableCell>{player.moves}</RankTableCell>
                        <RankTableCell>{player.time}</RankTableCell>
                    </RankTableRow>
                ))}
            </RankTable>
        </RankContainer>

    </>;
};

const RankContainer = styled.div`
    grid-area: puzzle;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

const RankTable = styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: stretch;
    font-size: 16px;
    flex: 1 1 auto;

    background: linear-gradient(to bottom, rgba(19, 19, 33, 0.51) 0%, rgba(31, 28, 44, 0.58) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    box-shadow: 0 2px 20px 0 #000000;
    padding: 16px;
    margin: 16px;
`;

const RankTableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    //background-color: #eee;
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
