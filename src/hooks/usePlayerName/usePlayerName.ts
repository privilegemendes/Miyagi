import {
	useSettings
} from "../../contexts/game-settings-provider/GameSettingsProvider";
import {useEffect} from "react";
import {
	useRandomNameGenerator
} from "../useRandomNameGenerator/useRandomNameGenerator";


export function usePlayerName() {
	const {playerName, setPlayerName} = useSettings();
	const randomName = useRandomNameGenerator();

	useEffect(() => {
		const savedName = localStorage.getItem('player');

		if (savedName) {
			setPlayerName(savedName);
		} else {
			const newName = randomName;
			setPlayerName(newName);
			localStorage.setItem('player', newName);
		}
	}, [randomName, setPlayerName]);

	return playerName;
}
