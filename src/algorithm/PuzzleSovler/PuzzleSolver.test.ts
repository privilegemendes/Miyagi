import {PuzzleSolver, shufflePuzzle} from './PuzzleSolver';

test('solves the puzzle correctly', () => {
	const puzzle = [7, 0, 1, 4, 6, 2, 3, 8, 5];
	const expectedSolution = ['right', 'up', 'up', 'left', 'down', 'right', 'down', 'left', 'left', 'up', 'right', 'right', 'down', 'left', 'left', 'up', 'up', 'right', 'right', 'down', 'left', 'left', 'up'];
	const solution = PuzzleSolver(puzzle);
	expect(solution).toEqual(expectedSolution);
});


test('solves the puzzle of different sizes', () => {
	const puzzle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, 0];
	const solution = PuzzleSolver(puzzle);
	console.log(solution!.pathValue);
	expect(solution!.pathValue).toBeGreaterThan(0)
});

test('solves the puzzle', () => {
	const puzzle = [7, 0, 1, 13, 9, 11, 3, 15, 5];
	const shuffledPuzzle = shufflePuzzle(puzzle);
	const solution = PuzzleSolver(shuffledPuzzle);
	const expectedSolution = [7, 5, 13, 3, 9, 13, 15, 11, 3, 15, 5, 7, 13, 9, 15, 5, 11, 3, 5, 11, 9, 15];
	expect(solution!.pathValue).toEqual(expectedSolution);
});
