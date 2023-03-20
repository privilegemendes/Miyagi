import {GameSettingsTable} from "./GameSettingsTable";
import {
	useSettings
} from "../../contexts/game-settings-provider/GameSettingsProvider";
import * as React from "react";
import {usePuzzleSize} from "../../hooks/usePuzzleSize/usePuzzleSize";

export type Setting = {
	name: string;
	type: 'checkbox' | 'range'| 'dropdown' | 'reset-button'| 'credits-button'| 'how-top-play-button' ;
	options?: string[];
	default?: any;
	disabled?: boolean;
}

export const Settings = () => {

	const {puzzleSizeOptions} = useSettings();
	const puzzleSize = usePuzzleSize();

	const settings: Setting[] = [
		{
			name: '🧩 Grid Size',
			type: 'dropdown',
			default: `${puzzleSize}x${puzzleSize}`,
			options: puzzleSizeOptions,
		},
		{
			name: '🔈 Sound Effects (Coming Soon)',
			type: 'checkbox',
			default: false,
			disabled: true,
		},
		{
			name: '⏳ Show Timer (Coming Soon)',
			type: 'checkbox',
			default: true,
			disabled: true,
		},
		{
			name: '❓Show Hints (Coming Soon)',
			type: 'checkbox',
			default: true,
			disabled: true,
		},
		{
			name: 'Reset Scores',
			type: 'reset-button',
		},
		{
			name: 'How to Play',
			type: 'how-top-play-button',
		},
		{
			name: 'Credits',
			type: 'credits-button',
		},
	];

	return <GameSettingsTable settings={settings} />;
};
