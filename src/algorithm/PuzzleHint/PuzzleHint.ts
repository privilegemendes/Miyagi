import {PuzzleDirection} from "../PuzzleSovler/PuzzleSolver";

interface PuzzleHint {
	puzzle: number[];
	directions: PuzzleDirection[] | null;
	goalState: number[];
}

export function PuzzleHint(puzzle: number[], goalState: number[], directions: PuzzleDirection[] | null) {

	const puzzleSize = Math.sqrt(puzzle.length);

	const currentPuzzle = [...puzzle];

	if (directions === null) {
		return null;
	}

	for (let i = 0; i < directions.length; i++) {
		const direction = directions[i];
		const emptyIndex = currentPuzzle.indexOf(0);

		if (
			(direction === 'up' && emptyIndex < puzzleSize) ||
			(direction === 'down' && emptyIndex >= puzzleSize ** 2 - puzzleSize - 1) ||
			(direction === 'left' && emptyIndex % puzzleSize === 0) ||
			(direction === 'right' && emptyIndex % puzzleSize === puzzleSize - 1)
		) {
			continue;
		}

		let adjacentIndex = 0;

		switch (direction) {
			case 'up':
				adjacentIndex = emptyIndex - puzzleSize;
				break;
			case 'down':
				adjacentIndex = emptyIndex + puzzleSize;
				break;
			case 'left':
				adjacentIndex = emptyIndex - 1;
				break;
			case 'right':
				adjacentIndex = emptyIndex + 1;
				break;
		}

		[currentPuzzle[emptyIndex], currentPuzzle[adjacentIndex]] = [currentPuzzle[adjacentIndex], currentPuzzle[emptyIndex]];

		if (currentPuzzle.join('') === goalState.join('')) {
			return 'The puzzle is already solved';
		}
	}

	const movedValue = puzzle.find((value, index) => value !== currentPuzzle[index]);
	const movedIndex = currentPuzzle.indexOf(movedValue!);
	const movedDirection = directions[directions.length - 1];

	switch (movedDirection) {
		case 'up':
			return `Move ${movedValue} up`;
		case 'down':
			return `Move ${movedValue} down`;
		case 'left':
			return `Move ${movedValue} left`;
		case 'right':
			return `Move ${movedValue} right`;
	}
}
