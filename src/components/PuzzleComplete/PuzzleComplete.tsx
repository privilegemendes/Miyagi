import * as React from 'react';
import {FC} from 'react';
import {
  useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";
import Confetti from "react-confetti";

type Props = {
    children?: React.ReactNode;
};

export const PuzzleComplete: FC<Props> = ({children}) => {
  const {width, height} = useWindowDimensions();

  return <Confetti
    width={width}
    height={height}
  >
    {children}
  </Confetti>;
};
