import {
	useSettings
} from "../../contexts/game-settings-provider/GameSettingsProvider";
import {useEffect} from "react";

export function usePuzzleSize() {
	const {puzzleSize, setPuzzleSize} = useSettings();

	useEffect(() => {
		const savedPuzzleSize = localStorage.getItem('puzzleSize');

		if (savedPuzzleSize) {
			setPuzzleSize(parseInt(savedPuzzleSize));
		}
	}, [setPuzzleSize]);

	return puzzleSize;
}
