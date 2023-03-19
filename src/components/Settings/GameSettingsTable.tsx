import * as React from 'react';
import {FC} from 'react';
import styled from "styled-components";

import {usePuzzle} from "../../contexts/puzzle-provider/PuzzleProvider";
import NavBar from "../NavBar";
import {usePlayerName} from "../../hooks/usePlayerName/usePlayerName";
import {Setting} from "./Settings";


type Props = {
	settings: Setting[];
}
export const GameSettingsTable: FC<Props> = ({settings}) => {

	const name = usePlayerName();

	const {puzzleSize, onSliderChange} = usePuzzle();
	const minPuzzleSize = 3;
	const maxPuzzleSize = 6;

	return<>
		<NavBar/>
		<SettingsContainer>
			<SettingsTable>
				<Title><div>⚙️</div><div>Settings</div></Title>
				{settings.map(setting => (
					<SettingRow key={setting.name}>
						<SettingCell>
							<SettingLabel>{setting.name}</SettingLabel>
						</SettingCell>
						<SettingCell>
							<SettingControl>
								{setting.type === 'checkbox' && (
									<CheckboxControl
										type="checkbox"
										defaultChecked={setting.default as boolean}
									/>
								)}
								{setting.type === 'dropdown' && (
									<DropdownControl defaultValue={setting.default as string}>
										{setting.options?.map(option => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</DropdownControl>
								)}
								{setting.type === 'button' && (
									<ButtonControl>{setting.name}</ButtonControl>
								)}
							</SettingControl>
						</SettingCell>
					</SettingRow>
				))}
			</SettingsTable>
		</SettingsContainer>
	</>

};

// <Slider onChange={onSliderChange} type="range" min={minPuzzleSize} max={maxPuzzleSize} value={puzzleSize}/>

const SettingsContainer = styled.div`
    grid-area: puzzle;
    display: flex;
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
        flex-wrap: nowrap;
        border-radius: 4px;
        transition: border 0.1s ease-in-out;
    }
`;

const SettingsTable = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    font-size: 16px;
    flex: 1 1 auto;
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
    margin-bottom: 20px;
`;

const SettingCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 50%;
`;

const SettingLabel = styled.label`
    font-weight: bold;
`;

const SettingControl = styled.div``;

const CheckboxControl = styled.input`
  margin-right: 10px;
`;

const DropdownControl = styled.select``;

const ButtonControl = styled.button``;

const Slider = styled.input`
  color: #ffffff;
  display: block;
  margin: 8px auto;
  width: 50%;
`

const SliderRange = styled.div`
    margin-top: 30px;
    width: 608px;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    color: #FFFFFF;
`;
