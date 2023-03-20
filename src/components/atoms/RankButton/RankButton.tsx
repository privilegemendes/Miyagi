import * as React from "react";
import {PrimaryButton} from "../Button";
import {Link, useHistory} from "react-router-dom";
import styled from "styled-components";
import {useEffect} from "react";
import {NavButtonStyleProps} from "../../../types/types";
import {usePuzzle} from "../../../contexts/puzzle-provider/PuzzleProvider";


type SVGProps = {
    text?: string;
    height?: string;
    width?: string;
    color?: string;
    onClick?: (e: React.MouseEvent) => void;
}


export const RankButton: React.FC<SVGProps> =
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
            if (history.location.pathname === '/rank') {
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
        }, [history, puzzleSolved, gameState]);



  return <RankButtonContainer
	  activeRouteColor={activeRouteColor}
	  puzzleSolved={puzzleSolved}
	  gameState={gameState}
  	>
      <Link to={'/rank'}>
          <PrimaryButton
              aria-label={text}
              onClick={onClick}
          >

              <svg height={height} width={width} version="1.1" id="_x32_"
                   viewBox="0 0 24 24"
              >
                  <g>
                      <path fill={activeRouteColor} d="M20 12a2 2 0 0 0-.703.133l-2.398-1.963c.059-.214.101-.436.101-.67C17 8.114 15.886 7 14.5 7S12 8.114 12 9.5c0 .396.1.765.262 1.097l-2.909 3.438A2.06 2.06 0 0 0 9 14c-.179 0-.348.03-.512.074l-2.563-2.563C5.97 11.348 6 11.179 6 11c0-1.108-.892-2-2-2s-2 .892-2 2 .892 2 2 2c.179 0 .348-.03.512-.074l2.563 2.563A1.906 1.906 0 0 0 7 16c0 1.108.892 2 2 2s2-.892 2-2c0-.237-.048-.46-.123-.671l2.913-3.442c.227.066.462.113.71.113a2.48 2.48 0 0 0 1.133-.281l2.399 1.963A2.077 2.077 0 0 0 18 14c0 1.108.892 2 2 2s2-.892 2-2-.892-2-2-2z"/>
                  </g>
              </svg>
          </PrimaryButton>
      </Link>
      <h1>Rank</h1>
  </RankButtonContainer>
}

const RankButtonContainer = styled.div<NavButtonStyleProps>`
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
