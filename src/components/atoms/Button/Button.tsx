import * as React from 'react';
import {FC} from "react";
import styled from "styled-components";


type Props = {
  text?: string;
  Icon?:  React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onClick: (e: React.MouseEvent) => void;
}

type ButtonProps = {
    visible?: boolean;
    disabled?: boolean;
    backgroundColor?: string;
    icon?: boolean;
}
export const Button:FC<Props> =
  (
      {
        text,
        onClick
      }
  ) => {

  return <PrimaryButton onClick={onClick}>
      {text}
  </PrimaryButton>;
}

export const PrimaryButton = styled.button<ButtonProps>`
    display: flex;
    flex-direction: row;
    transition: all 0.3s ease-in-out 0s;
    border: none;
    background-color: transparent;
    &:hover {
        color: #19bf64;
    }
`;
