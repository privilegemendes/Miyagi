import * as React from 'react';
import {FC, useEffect} from 'react';
import styled from "styled-components";

import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";
import NavBar from "../NavBar";
import {Setting} from "./Settings";
import {
	deleteGameData,
	useSettings
} from "../../contexts/game-settings-provider/GameSettingsProvider";
import {Toast} from "../Toast";
import {GamePlayStyleProps} from "../../types/types";
import {usePuzzleSize} from "../../hooks/usePuzzleSize/usePuzzleSize";
import {Button3D} from "../atoms/Button3D";


type Props = {
	settings: Setting[];
}
export const GameSettingsTable: FC<Props> = ({settings}) => {


	const {onPuzzleSizeChange} = useSettings();
	const puzzleSize = usePuzzleSize();
	const [showResetToast, setShowResetToast] = React.useState(false);
	const [showCreditsToast, setShowCreditsToast] = React.useState(false);
	const [showPuzzleSizeWarningToast, setShowPuzzleSizeWarningToast] = React.useState(false);
	const [showHowToPlayToast, setShowHowToPlayToast] = React.useState(false);

	const { puzzleSolved, gameState} = usePuzzle();

	useEffect(() => {
		if (puzzleSize > 3) {
			setShowPuzzleSizeWarningToast(true);
		}
	},[puzzleSize]);

	const handleReset = () => {
		deleteGameData();
		setShowResetToast(true);
	}

	const handleCredits = () => {
		setShowCreditsToast(true);
	}

	const handleHowToPlay = () => {
		setShowHowToPlayToast(false);
	}

	return<>
		<SettingsContainer gameState={gameState} puzzleSolved={puzzleSolved}>
			<SettingsTable>
				<Title><div>⚙️</div><div>Settings</div></Title>
				{settings.map(setting => (
					<SettingRow key={setting.name}>
						<SettingLabelCell>
							<SettingLabel>{setting.name}</SettingLabel>
						</SettingLabelCell>
						<SettingControlCell>
							<SettingControl>
								{setting.type === 'checkbox' && (
									<CheckboxControl
										type="checkbox"
										defaultChecked={setting.default}
										disabled={setting.disabled}
									/>
								)}
								{setting.type === 'dropdown' && (
									<DropDownControl
										defaultValue={setting.default}
										onChange={onPuzzleSizeChange}
									>
										{setting.options?.map(option => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</DropDownControl>
								)}
								{setting.type === 'reset-button' && (
									<Button3D
									size={'small'}
									onClick={handleReset}
									text={setting.name}
									/>
								)}
								{setting.type === 'credits-button' && (
									<Button3D
									size={'small'}
									onClick={handleCredits}
									text={setting.name}
									/>
								)}
								{setting.type === 'how-top-play-button' && (
									<Button3D
										size={'small'}
										onClick={handleHowToPlay}
										text={setting.name}
									/>
								)}
								{ showResetToast &&
									(<Toast
										variant={"success"}
										enableAction={true}
										disableIcons={false}
										onClick={() => setShowResetToast(false)}
										onClose={() => setShowResetToast(false)}
									>
										Gaming data has been successfully deleted.
									</Toast>)
								}
								{ showCreditsToast &&
									(<Toast
										variant={"notice"}
										enableAction={true}
										disableIcons={true}
										action={"Okay, now let me play!"}
										onClick={() => setShowCreditsToast(false)}
										onClose={() => setShowCreditsToast(false)}
									>
										<div>👋 Designed, destroyed and tweaked by <br/><br/>
											<a href={`https://lege.dev`}
											   style={{textDecoration: "none"}}

											>
												😝 Privilege Mendes 😝
											</a><br/><br/>
											Special thanks to 🦄 <span style={{color:"purple"}}> Ursenna </span> 🦄 for testing and dealing with my nonsense while I was building this game.
										</div>
									</Toast>)
								}
								{ showPuzzleSizeWarningToast &&
									(<Toast
										variant={"warning"}
										enableAction={true}
										disableIcons={false}
										action={"Okay, I don't need hints because I'm a badass."}
										onClick={() => setShowPuzzleSizeWarningToast(false)}
										onClose={() => setShowPuzzleSizeWarningToast(false)}
									>
										Oopsie! 😭 Hints are currently only available for puzzles of size 3x3.
									</Toast>)
								}
								{ showHowToPlayToast &&
									(<Toast
										variant={"tutorial"}
										enableAction={true}
										disableIcons={true}
										action={"Okay, now let me play!"}
										onClick={() => setShowHowToPlayToast(false)}
										onClose={() => setShowHowToPlayToast(false)}
									>
										Coming soon! 🚧
									</Toast>)
								}
							</SettingControl>
						</SettingControlCell>
					</SettingRow>
				))}
			</SettingsTable>
		</SettingsContainer>
		<NavBar/>
	</>

};



const SettingsContainer = styled.div<GamePlayStyleProps>`
    grid-area: puzzle;
    display: flex;
  	flex: 1 1 auto;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: stretch;
    background: linear-gradient(to bottom, rgba(19, 19, 33, 0.51) 0%, rgba(31, 28, 44, 0.58) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    box-shadow: 0 2px 20px 0 #000000;
    padding: 12px;
    margin: 12px;

    @media screen  and (min-width: 769px) {
        margin: 16px 16px 16px 16px;
        border: 1px solid #ffffff;
		${(props) => props.gameState === "Play" && "border: 1px solid #ffffff;"}
		${(props) => props.gameState === "Pause" && "border: 1px solid #48a4ff;"}
		${(props) => props.gameState === "Resume" && "border: 1px solid #DEA883FF;"}
		${(props) => props.puzzleSolved && "border: 1px solid #08ffbd;"}
        flex-wrap: nowrap;
        border-radius: 4px;
        transition: border 0.1s ease-in-out;
      	flex: 1 1 auto;
    }
`;

const SettingsTable = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	font-size: 16px;
	flex: 1 1 auto;
	padding: 12px;
	
	@media screen  and (min-width: 769px) {
		padding: 16px;
	}
  
`;


const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 16px;
  	justify-content: center;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 8px;
`;

const SettingRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  	margin-top: 12px;
    margin-bottom: 12px;
  
  @media screen  and (min-width: 320px) {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

const SettingLabelCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 50%;
`;
const SettingControlCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 50%;
`;

const SettingLabel = styled.label`
    font-weight: bold;
    font-size: 0.9rem;
   @media screen  and (max-width: 320px) {
	 	font-size: 0.7rem;
   }
`;

const SettingControl = styled.div`
	display: flex;
	align-items: center;
`;

const CheckboxControl = styled.input`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 0;
  
`;

const DropDownControl = styled.select`
	width: 100px;
  	text-align: center;
  	border-radius: 4px;
  	background: transparent;
  	color: #ffffff;
  	font-size: 1rem;
  	border: none;
	font-weight: bold;
`;
