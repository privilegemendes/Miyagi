import {
	useSettings
} from "../../contexts/game-settings-provider/GameSettingsProvider";
import {useEffect} from "react";
import {
	useRandomNameGenerator
} from "../useRandomNameGenerator/useRandomNameGenerator";


export function usePuzzleSize() {
	const {puzzleSize, setPuzzleSize} = useSettings();

	useEffect(() => {
		const savedPuzzleSize = localStorage.getItem('puzzlesize');
	}, [setPuzzleSize]);

	return puzzleSize;
}
