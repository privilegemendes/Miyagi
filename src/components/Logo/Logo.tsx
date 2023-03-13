import styled from "styled-components";
import * as React from "react";
import { FC } from "react";

const MyLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  -moz-box-pack: justify;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 725px) {
    text-align: center;
    padding-bottom: 16px;
    -moz-box-align: center;
    align-items: center;
  }
`;


const MyLogoHeader = styled.a `
  display: flex;
  font-size: 2rem;
  letter-spacing: -1px;
  text-decoration: none;
  color: hsl(53deg,100%,50%);
  margin-right: 32px;
`

const MyLogoFooter = styled.a `
  font-size: 1.5rem;
  text-decoration: none;
  color: #ffff;

  @media (max-width: 725px) {
    order: 1;
    text-align: center;
    padding-bottom: 12px;
    align-items: center;
  }
`
const Privi = styled.span `
  display: inline-flex;
  font-weight: 600;
  color: #ffff;
  font-Family: 'Schoolbell', 'Roboto',sans-serif;
  letter-spacing: 1px;
  align-items: center;

`;

const Lege = styled.span `
  display: inline-flex;
  font-weight: 600;
  font-Family: 'Roboto',sans-serif;
  color: #006eff;
  letter-spacing: 1.5px;
  align-items: center;
`;

const Slogan = styled.span `
  display: flex;
  font-weight: 800;
  font-size: 14px;
  color: #ffff;
  align-items: flex-end;
`;

const SloganReally = styled.span `
  color: #006eff;
`;

export const LogoHeader: FC = () => {

  return (
    <MyLogoContainer>
      <MyLogoHeader href="/">
        <Privi>Privi</Privi>
        <Lege>lege</Lege>
      </MyLogoHeader>
    </MyLogoContainer>

  )

};

export const LogoFooter: FC = () => {

  return (
    <MyLogoContainer>
      <MyLogoFooter href="/">
        <Privi>Privi</Privi>
        <Lege>lege</Lege>
        <Slogan>Yes, that&apos;s<SloganReally>&nbsp;really&nbsp;</SloganReally>my name</Slogan>
      </MyLogoFooter>
    </MyLogoContainer>
  )
};
