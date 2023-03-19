import {GameSettingsTable} from "./GameSettingsTable";

export type Setting = {
	name: string;
	type: 'checkbox' | 'dropdown' | 'button';
	options?: string[];
	default?: boolean | number | string;
}

export const Settings = () => {
	const settings: Setting[] = [
		{
			name: 'Difficulty',
			type: 'dropdown',
			options: ['Easy', 'Medium', 'Hard'],
			default: 'Medium',
		},
		{
			name: 'Sound Effects',
			type: 'checkbox',
			default: true,
		},
		{
			name: 'Music',
			type: 'checkbox',
			default: true,
		},
		{
			name: 'Reset High Scores',
			type: 'button',
		},
	];

	return <GameSettingsTable settings={settings} />;
};
