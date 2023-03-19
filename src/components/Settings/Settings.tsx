import {GameSettingsTable} from "./GameSettingsTable";

export type Setting = {
	name: string;
	type: 'checkbox' | 'range' | 'button';
	options?: string[];
	default?: any;
	min?: number;
	max?: number;
	step?: number;
}

export const Settings = () => {

	// const {minPuzzleSize, maxPuzzleSize} = useSettings();

	const settings: Setting[] = [
		{
			name: 'Grid Size',
			type: 'range',
			min: 3,
			max: 6,
			step: 1,
			default: 3,
		},
		{
			name: 'Sound Effects',
			type: 'checkbox',
			default: true,
		},
		{
			name: 'Show Timer',
			type: 'checkbox',
			default: true,
		},
		{
			name: 'Show Hints',
			type: 'checkbox',
			default: true,
		},
		{
			name: 'Reset Scores',
			type: 'button',
		},
		{
			name: 'Credits',
			type: 'button',
		},
	];

	return <GameSettingsTable settings={settings} />;
};
