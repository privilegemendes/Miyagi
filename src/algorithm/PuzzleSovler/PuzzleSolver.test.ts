import {PuzzleSolver} from './PuzzleSolver';

test('solves the puzzle correctly', () => {
	const puzzle = [7, 0, 1, 4, 6, 2, 3, 8, 5];
	const expectedSolution = ['right', 'up', 'up', 'left', 'down', 'right', 'down', 'left', 'left', 'up', 'right', 'right', 'down', 'left', 'left', 'up', 'up', 'right', 'right', 'down', 'left', 'left', 'up'];
	const solution = PuzzleSolver(puzzle);
	expect(solution).toEqual(expectedSolution);
});


test('solves the puzzle of different sizes', () => {
	const puzzle = [4, 11, 14, 1, 2, 9, 5, 6, 12, 15, 3, 0, 10, 7, 13, 8];
	const solution = PuzzleSolver(puzzle);
	console.log(solution!.pathValue);
	expect(solution!.pathValue).toBeGreaterThan(0)
});
