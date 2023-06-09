import * as React from 'react';
import {FC} from 'react';
import {PuzzleProvider} from "../../contexts/puzzle-provider/PuzzleProvider";
import styled from "styled-components";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	useHistory,
} from "react-router-dom";
import {GitHubShareButton} from "../atoms/GitHubShareButton";
import {Game} from "../Game";
import {Settings} from "../Settings";
import {Rank} from "../Rank";
import {
	GameSettingsProvider,
} from "../../contexts/game-settings-provider/GameSettingsProvider";
import {usePortraitMode} from "../../hooks/usePortraitMode/usePortraitMode";
import {
	PortraitModeProvider
} from "../../contexts/portrait-mode-provider/PortraitModeProvider";
import {
	useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";
import {Tutorial} from "../Tutorial";
import {Toast} from "../Toast";


type StyleProps = {
    height: number;
    width: number;
}
const Routes: FC = () => {
    return<>
        <Switch>
			<Route path="/tutorial" component={Tutorial}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/rank" component={Rank}/>
			<Route path="/" component={Game}/>
			<Route path="*" component={PageNotFound}/>
        </Switch>
    </>
}
export const Home:FC = () => {

    const {height, width} = useWindowDimensions();
	usePortraitMode();
  return <>
		  <Router>
			  <PortraitModeProvider>
			  	<HomeGridWrapper width={width} height={height}>
					  <HomeGridContainer>
						  <GameSettingsProvider>
							  <PuzzleProvider>
								  <Routes/>
								  <RightContainer>
									  <GitHubShareButton/>
								  </RightContainer>
							  </PuzzleProvider>
						  </GameSettingsProvider>
					  </HomeGridContainer>
			  	</HomeGridWrapper>
			  </PortraitModeProvider>
		  </Router>
        </>

}

export default Home;


const HomeGridWrapper = styled.div<StyleProps>`
    position: relative;
    display: grid;
    grid-template-columns: 1fr min(65ch, 100%) 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
        "left puzzle right";
	  width: 100vw;
	  height: 100vh;
    background: hsl(210deg, 30%, 8%);
    color: #fff;
    
    @media screen and (max-width: 768px) {
        //grid-template-rows: 1fr 0.2fr;
        grid-template-columns: 1fr min(65ch, 100%) 1fr;
        grid-template-areas:  
        "left puzzle right" ;
        //"left nav right";
        //height: ${props => props.height - 24}px;
    }
    
`;

const HomeGridContainer = styled.div`
    grid-area: puzzle;
  	display: flex;
  	flex-direction: column;
  	overflow: auto;
  
  
  @media screen and (min-width: 769px) {
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: stretch;
	align-content: center;
	
	
  }
  
`;



const RightContainer = styled.div`
    grid-area: right;
    @media screen and (max-width: 768px) {
        display: none;
        
    }
`;


const PageNotFound: FC = () => {
	const history = useHistory();
	return <Toast
		variant={"error"}
		enableAction={true}
		action={"Return"}
		onClick={() => history.push("/")}
	>Oops! <br/><br/> Page not found 🚧
	</Toast>
}
