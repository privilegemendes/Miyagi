import * as React from 'react';
import {FC} from 'react';
import {
  useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";
import Confetti from "react-confetti";

export const PuzzleComplete: FC = () => {
  const {width, height} = useWindowDimensions();

  return <Confetti
    width={width}
    height={height}
  />;
};
