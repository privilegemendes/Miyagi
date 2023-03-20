import * as React from "react";
import {PrimaryButton} from "../Button";
import {Link, useHistory} from "react-router-dom";
import styled from "styled-components";
import {useEffect} from "react";
import {NavButtonStyleProps, SVGProps} from "../../../types/types";
import {usePuzzle} from "../../../contexts/puzzle-provider/PuzzleProvider";



export const GameButton: React.FC<SVGProps> =
    (
        {
            text="Play Game",
            height = "50px",
            width = "50px",
            onClick
        }
    ) => {

        const [activeRouteColor, setActiveRouteColor] = React.useState<string>('#ffffff');
		const { puzzleSolved, gameState} = usePuzzle();

        const history = useHistory();
        useEffect(() => {
            if (history.location.pathname === '/') {
				setActiveRouteColor('#08a0ff');

				if (gameState === 'Pause') {
					setActiveRouteColor('#08a0ff');
				}

				if (gameState === 'Resume') {
					setActiveRouteColor('#E06921FF');
				}
				if (puzzleSolved) {
					setActiveRouteColor('#08ffbd');
				}
			}
        }, [history, gameState, puzzleSolved]);


        return <GameButtonContainer activeRouteColor={activeRouteColor}>
      <Link to={'/'}>
          <PrimaryButton
              aria-label={text}
              onClick={onClick}
          >
              <svg height={height} width={width} version="1.1" id="_x32_"
                   viewBox="0 0 512 512"
              >
                  <g>
                      <path style={{fill: activeRouteColor}} d="M510.002,309.835l-0.068-0.326l-0.076-0.334l-26.508-112.721l-0.106-0.417l-0.106-0.418
            c-16.668-62.217-73.294-105.666-137.712-105.666H166.579c-64.418,0-121.045,43.449-137.712,105.666l-0.114,0.418l-0.099,0.417
            L2.147,309.174l-0.076,0.326l-0.068,0.326c-9.749,46.43,16.926,92.496,62.036,107.168l1.586,0.509
            c9.24,3.012,18.89,4.544,28.624,4.544c32.668,0,63.128-17.404,79.758-45.489l22.556-33.343l0.561-0.835l0.509-0.872
            c0.796-1.388,2.276-2.253,3.861-2.253h109.02c1.586,0,3.066,0.865,3.862,2.253l0.508,0.872l0.562,0.835l22.555,33.343
            c16.63,28.085,47.09,45.489,79.766,45.489c9.734,0,19.384-1.532,28.67-4.56l1.533-0.493
            C493.07,402.331,519.737,356.257,510.002,309.835z M439.318,390.397l-1.54,0.501c-6.608,2.154-13.353,3.186-20.014,3.186
            c-22.646,0-44.283-11.949-56.088-32.433l-23.064-34.101c-5.788-10.053-16.508-16.258-28.101-16.258h-109.02
            c-11.592,0-22.312,6.206-28.101,16.258l-23.063,34.101c-11.804,20.484-33.434,32.433-56.081,32.433
            c-6.661,0-13.405-1.032-20.013-3.186l-1.548-0.501c-31.431-10.219-50.102-42.485-43.311-74.819l26.508-112.722
            c13.42-50.102,58.826-84.94,110.696-84.94h178.847c51.869,0,97.276,34.838,110.696,84.94l26.508,112.722
            C489.413,347.912,470.75,380.178,439.318,390.397z"/>
                      <polygon style={{fill: activeRouteColor}} points="157.453,172.061 123.912,172.061 123.912,210.579 85.387,210.579 85.387,244.105 123.912,244.105
            123.912,282.637 157.453,282.637 157.453,244.105 195.978,244.105 195.978,210.579 157.453,210.579 	"/>
                      <path style={{fill: activeRouteColor}} d="M365.721,206.247c11.668,0,21.113-9.445,21.113-21.098c0-11.669-9.445-21.114-21.113-21.114
            c-11.653,0-21.098,9.445-21.098,21.114C344.622,196.802,354.068,206.247,365.721,206.247z"/>
                      <path style={{fill: activeRouteColor}} d="M323.509,206.247c-11.653,0-21.106,9.453-21.106,21.098c0,11.669,9.453,21.122,21.106,21.122
            c11.661,0,21.106-9.453,21.106-21.122C344.615,215.7,335.17,206.247,323.509,206.247z"/>
                      <path style={{fill: activeRouteColor}} d="M365.721,248.459c-11.653,0-21.098,9.445-21.098,21.114c0,11.653,9.445,21.098,21.098,21.098
            c11.668,0,21.113-9.445,21.113-21.098C386.834,257.904,377.388,248.459,365.721,248.459z"/>
                      <path style={{fill: activeRouteColor}} d="M407.933,206.247c-11.653,0-21.099,9.453-21.099,21.098c0,11.669,9.446,21.122,21.099,21.122
            c11.66,0,21.113-9.453,21.113-21.122C429.046,215.7,419.593,206.247,407.933,206.247z"/>
                  </g>
              </svg>
          </PrimaryButton>
      </Link>
      <h1>Game</h1>
  </GameButtonContainer>

}

const GameButtonContainer = styled.div<NavButtonStyleProps>`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: ${props => props.activeRouteColor};
        transition: color 0.1s ease-in-out;
        & > h1 {
            color: ${props => props.activeRouteColor};
        }
`;
