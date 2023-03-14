import * as React from 'react';
import {FC} from "react";
import {
  useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";
import Confetti from "react-confetti";
import {
  usePuzzleEndTime,
  usePuzzleMoves,
  usePuzzleStartTime
} from "../../contexts/puzzle-provider/PuzzleProvider";

export const PuzzleResult: FC = () => {
  const {width, height} = useWindowDimensions();
  const numberOfMovesUsed = usePuzzleMoves();
  const startTime = usePuzzleStartTime();
  const endTime = usePuzzleEndTime();

  return <Confetti
    width={width}
    height={height}
  >
    alert(`Congratulations! You solved the puzzle in ${numberOfMovesUsed} moves and ${Math.floor((endTime - startTime) / 3600)} seconds.`);
  </Confetti>;
};
