export type SavedGame = {
	id : number
	time: string,
	moves: number,
	hints: number,
	puzzleSize: string
}

export function loadGameData(): SavedGame[] {
	return JSON.parse(localStorage.getItem('savedGames') || '[]');
}
