import * as React from 'react';
import {FC} from 'react';
import {
  useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";
import Confetti from "react-confetti";
import Toast from "../Toast";
import {formatTime} from "../../common/time";

type Props = {
    children?: React.ReactNode;
    moves: number;
    time: number;
    onClick: () => void;
};

export const PuzzleComplete: FC<Props> = (
    {
        moves,
        time,
        onClick
    }) => {

  const {width, height} = useWindowDimensions();

  return<>
    <Confetti
        width={width}
        height={height}
    />
    <Toast
        variant={"success"}
        onClick={onClick}
        action={"Play Again"}
    >
        Puzzle Complete!<br/>
        Moves: {moves}<br/>
        Time: {formatTime(time)}
    </Toast>
  </>

};
