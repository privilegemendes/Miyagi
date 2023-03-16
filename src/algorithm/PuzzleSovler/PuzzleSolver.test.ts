import {PuzzleSolver} from './PuzzleSolver';

test('solves the puzzle correctly', () => {
	const puzzle = [7, 0, 1, 4, 6, 2, 3, 8, 5];
	const expectedSolution = ['right', 'up', 'up', 'left', 'down', 'right', 'down', 'left', 'left', 'up', 'right', 'right', 'down', 'left', 'left', 'up', 'up', 'right', 'right', 'down', 'left', 'left', 'up'];
	const solution = PuzzleSolver(puzzle);
	expect(solution).toEqual(expectedSolution);
});
