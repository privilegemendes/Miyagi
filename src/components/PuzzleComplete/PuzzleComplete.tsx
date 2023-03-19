import * as React from 'react';
import {FC} from 'react';
import {
    useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";
import Confetti from "react-confetti";
import {Toast} from "../Toast";
import {formatTime} from "../../common/time";

type Props = {
    children?: React.ReactNode;
    moves: number;
    time: number;
    onClick: () => void;
};

const images = [
    '//i.giphy.com/26FPCXdkvDbKBbgOI.gif',
    '//i.giphy.com/13CoXDiaCcCoyk.gif',
    '//i.giphy.com/xWlPqPbrlkEQU.gif',
    '//i.giphy.com/QPDVAzBOnShLq.gif',
    '//i.giphy.com/13FJKNTaIiZ2lG.gif',
    '//i.giphy.com/5ZdCsQHEoCUBq.gif',
    '//i.giphy.com/BeGJ3IXngxyeY.gif',
    '//i.giphy.com/LhenEkp5EsPJe.gif',
    '//i.giphy.com/3o6UB65bfF8P1anIZ2.gif',
    '//i.giphy.com/l0NwLUVdksjwmtgLC.gif'
];
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
        enableAction={true}
    >
        Puzzle Complete!<br/><br/>
        Moves: {moves}<br/>
        Time: {formatTime(time)}
    </Toast>
  </>;
}
