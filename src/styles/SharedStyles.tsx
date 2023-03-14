import styled from "styled-components";

export const COLORS = {
  text: {
    light: 'hsl(0deg, 0%, 10%)', // white
    dark: 'hsl(0deg, 0%, 100%)', // near-black
  },
  background: {
    light: 'hsl(0deg, 0%, 100%)', // white
    dark: 'hsl(210deg, 30%, 8%)', // navy navy blue
  },
  primary: {
    light: 'hsl(340deg, 100%, 40%)', // Pinkish-red
    dark: 'hsl(230deg, 100%, 69%)', // Yellow
  },
  secondary: {
    light: 'hsl(250deg, 100%, 50%)', // Purplish-blue
    dark: 'hsl(333deg, 100%, 52%)', // Cyan
  },
  tertiary: {
    light: 'hsl(0deg, 0%, 100%)', // white
    dark: 'hsl(53deg, 100%, 50%)', // white
  },
  homepage: {
    light: 'hsl(204deg, 67%, 85%)', // white
    dark: 'hsl(200deg, 100%, 85%, 0.1)', // near-black
  },
  homepageBackground: {
    light: 'hsl(204deg, 67%, 85%)', // white
    dark: 'hsl(210deg, 30%, 8%)', // near-black
  },
  // Grays, scaling from least-noticeable to most-noticeable
  gray100: {

  },
  gray300: {
    light: 'hsl(0deg, 0%, 70%)',
    dark: 'hsl(0deg, 0%, 30%)',
  },
  gray500: {
    light: 'hsl(0deg, 0%, 50%)',
    dark: 'hsl(0deg, 0%, 50%)',
  },
  gray700: {
    light: 'hsl(0deg, 0%, 30%)',
    dark: 'hsl(0deg, 0%, 70%)',
  },
};
export const BREAKPOINT_SIZES = {
  xs: 320,
  sm: 540,
  md: 900,
  lg: 1024,
  xl: 1440,
};

export const BREAKPOINTS = {
  xs: `(max-width: ${BREAKPOINT_SIZES.xs}px)`,
  sm: `(max-width: ${BREAKPOINT_SIZES.sm}px)`,
  md: `(max-width: ${BREAKPOINT_SIZES.md}px)`,
  lg: `(max-width: ${BREAKPOINT_SIZES.lg}px)`,
  xl: `(max-width: ${BREAKPOINT_SIZES.xl}px)`,
  xsMin: `(min-width: ${BREAKPOINT_SIZES.xs + 1}px)`,
  smMin: `(min-width: ${BREAKPOINT_SIZES.sm + 1}px)`,
  mdMin: `(min-width: ${BREAKPOINT_SIZES.md + 1}px)`,
  lgMin: `(min-width: ${BREAKPOINT_SIZES.lg + 1}px)`,
  xlMin: `(min-width: ${BREAKPOINT_SIZES.xl + 1}px)`,
  desktop: `(min-width: ${BREAKPOINT_SIZES.sm + 1}px)`,
}

export const READING_WIDTH = 850;
export const EXTRA_WIDE_WIDTH = 1024;

const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i;

const userAgent =
  typeof window !== 'undefined' ? window.navigator.userAgent : 'node';

export const IS_MOBILE_USER_AGENT = mobileRegex.test(userAgent);

export const Z_INDICES = {
  hero: 1,
  mainContent: 10,
  header: 100,
};

const AppBar = styled.header`
  --color-primary: hsl(53deg,100%,50%);
  display: flex;
  flex-direction: column;
  -moz-box-pack: justify;
  justify-content: space-between;
  -moz-box-align: baseline;
  align-items: baseline;
  padding: 8px;
  // border-bottom: 1px solid hsl(210deg, 15%, 20%);
`;

const BottomAppBar = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 8px;
  @media screen and (orientation: portrait) and (max-width: 768px) {
    padding: 8px;
    justify-content: space-around;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0;
  position: relative;
  min-height: 100vh;
  height: 100%;
  isolation: isolate;
  background: hsl(210deg, 30%, 8%);
  color: #fff;
`
const Main = styled.div`
  flex: 1;
  padding: 12px;
  max-width: 800px;
  margin: 0 auto;

  @media screen and (orientation: portrait) and (max-width: 768px) {
    padding: 8px;
  }
`

const Title = styled.h1`
    position: relative;
    z-index: 2;
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.2;
    color: #006eff;
    //background-color: rgb(255, 178, 62);
    //background-image: radial-gradient(rgb(255, 230, 128), rgba(255, 230, 128, 0) 40%), conic-gradient(from 90deg, rgb(255, 198, 26), rgb(255, 238, 128), rgb(255, 198, 26), rgb(255, 238, 128), rgb(255, 198, 26), rgb(255, 252, 230), rgb(255, 198, 26));
   background-size: 100%;
   background-clip: text;
   // -webkit-text-fill-color: transparent;
    margin-top: 8px;
    margin-bottom: 0;
   //filter: drop-shadow(0px 0px 2px hsl(var(--background-values) / 0.5)) drop-shadow(0px 0px 4px hsl(var(--background-values) / 0.5)) drop-shadow(0px 0px 8px hsl(var(--background-values) / 0.5)) drop-shadow(0px 0px 16px hsl(var(--background-values) / 0.5)) drop-shadow(0px 0px 32px hsl(var(--background-values) / 0.5)) drop-shadow(0px 0px 64px hsl(var(--background-values) / 0.5));
`

const Description = styled.p`
  position: relative;
  padding-top: 8px;
  z-index: 3;
  font-size: 1.25rem;
  text-align: center;
  max-width: 400px;
  margin: 0;
  color: hsl(210deg, 14%, 66%);
`


const DesktopOnly = styled.div`
@media ${BREAKPOINTS.md} {
    display: none;
    }
`;

const MobileOnly = styled.div`
@media ${BREAKPOINTS.mdMin} {
    display: none;
    }
`;

export {AppBar, Container, Main, Title, Description, BottomAppBar, DesktopOnly, MobileOnly};

