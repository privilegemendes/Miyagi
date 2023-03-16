import {PuzzleSolver} from './PuzzleSolver';

test('solves the puzzle correctly', () => {
	const puzzle = [1, 0, 3, 4, 2, 5, 7, 8, 6];
	const expectedSolution = ['up', 'left', 'down', 'right', 'right', 'up', 'left', 'left', 'down', 'down', 'right', 'up', 'right', 'up'];
	const solution = PuzzleSolver(puzzle);
	expect(solution).toEqual(expectedSolution);
});
