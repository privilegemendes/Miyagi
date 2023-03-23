import {PriorityQueue} from "@datastructures-js/priority-queue";

export interface PuzzleState {
	tiles: number[];
	emptyIndex: number;
	puzzleSize: number;
}

interface PuzzleNode {
	state: PuzzleState;
	parent: PuzzleNode | null;
	costFromStart: number;
	estimatedCostToGoal: number;
	totalEstimatedCost: number;
	// direction: PuzzleDirection
}

export type PuzzleDirection = 'up' | 'down' | 'left' | 'right' | null;

export function PuzzleSolver(puzzle: number[]): { path: PuzzleDirection[] | null; pathValue: number[] } | null {
	const puzzleSize = Math.sqrt(puzzle.length);

	const initialState: PuzzleState = {
		tiles: puzzle,
		emptyIndex: puzzle.indexOf(0),
		puzzleSize: Math.sqrt(puzzle.length),
	}

	const goalState = createGoalState(initialState.tiles);
	const heuristicValue = manhattanDistance(initialState, goalState);


	const startNode: PuzzleNode = {
		state: initialState,
		parent: null,
		costFromStart: 0,
		estimatedCostToGoal: heuristicValue,
		totalEstimatedCost: heuristicValue,
	};

	if (puzzleSize > 3) {

		return IDAstarAlgorithm(startNode, initialState, goalState);
	}

	return AStarAlgorithm(startNode, initialState, goalState);
}

function AStarAlgorithm (startNode: PuzzleNode, initialState: PuzzleState, goalState: PuzzleState): { path: PuzzleDirection[]; pathValue: number[] } | null {
	const visited = new Set<string>();
	const heuristicValue = manhattanDistance(initialState, goalState);

	const pq = PriorityQueue.fromArray<PuzzleNode>(
		[startNode],
		(a, b) => a.totalEstimatedCost - b.totalEstimatedCost
	);

	pq.enqueue(startNode);

	while (!pq.isEmpty()) {
		const currentNode = pq.dequeue()!;
		visited.add(JSON.stringify(currentNode.state.tiles));

		if (isGoalState(currentNode.state, goalState)) {
			return getPath(currentNode);
		}

		const neighbors = getNeighborStates(currentNode.state);

		for (const neighbor of neighbors) {
			const neighborNode: PuzzleNode = {
				state: neighbor,
				parent: currentNode,
				costFromStart: currentNode.costFromStart + 1,
				estimatedCostToGoal: heuristicValue,
				totalEstimatedCost:
					currentNode.costFromStart +
					1 + heuristicValue,
			};

			if (!visited.has(JSON.stringify(neighborNode.state.tiles))) {
				pq.enqueue(neighborNode);
			}
		}
	}

	return null;
}

function IDAstarAlgorithm (startNode: PuzzleNode, initialState: PuzzleState, goalState: PuzzleState): { path: PuzzleDirection[]; pathValue: number[] } | null {

	let bound = manhattanDistance(initialState, goalState);
	let result: { path: PuzzleDirection[] | null; pathValue: number[] } | null = null;

	while (true) {
		let t = search(initialState, 0, bound, goalState);
		if (t === -1) {
			break;
		}
		bound = t;
	}

	return result;
}
function search(node: PuzzleState, g: number, bound: number, goal: PuzzleState): number {
	let f = g;

	f += manhattanDistance(node, goal);

	if (f > bound) {
		return f;
	}
	if (isGoalState(node, goal)) {
		return -1;
	}
	let min = Infinity;
	const neighbors = getNeighborStates(node);
	for (const neighbor of neighbors) {
		if (JSON.stringify(neighbor.tiles) !== JSON.stringify(node.tiles.reverse())) {
			let t = search(neighbor, g + 1, bound, goal);
			if (t === -1) {
				return -1;
			}
			if (t < min) {
				min = t;
			}
		}
	}
	return min;
}



// We ignore the empty tile in the Manhattan distance function because the empty tile can be placed in any position,
// so it does not contribute to the distance between the current state and the goal state.
// This allows us to calculate the distance more accurately for the other tiles.
function manhattanDistance(neighbor: PuzzleState, goal: PuzzleState): number {
	let distance = 0;
	for (let i = 0; i < neighbor.tiles.length; i++) {
		const tile = neighbor.tiles[i];
		if (tile !== 0) {
			const goalIndex = goal.tiles.indexOf(tile);
			const { row: goalRow, col: goalCol } = indexToCoordinate(goalIndex, goal.puzzleSize);
			const { row: currRow, col: currCol } = indexToCoordinate(i, neighbor.puzzleSize);
			distance += Math.abs(goalRow - currRow) + Math.abs(goalCol - currCol);
		}
	}
	return distance;
}

function indexToCoordinate(index: number, puzzleSize: number) {
	const row = Math.floor(index / puzzleSize);
	const col = index % puzzleSize;
	return {row, col};
}

//This function takes a PuzzleState as input and returns an array of PuzzleState objects,
// which represent the possible neighbor states of the input state. It does this by first extracting
// the emptyIndex and puzzleSize values from the input state. It then defines the possible movements of
// the empty tile using an array of movement objects, each of which specifies a row and column offset.
// For each movement, the function computes the index of the potential neighbor tile and checks if it is
// within the bounds of the tiles. If it is, the function creates a new array of tiles by swapping the
// empty tile with the neighbor tile and constructs a new PuzzleState object with this array and the
// index of the new empty tile.
// This new state is then added to an array of neighbor states, which is returned by the function.

function getNeighborStates(state: PuzzleState): PuzzleState[] {
	const { tiles, emptyIndex, puzzleSize } = state;
	const movements = [
		{ row: -1, col: 0 }, // Move up
		{ row: 0, col: -1 }, // Move left
		{ row: 1, col: 0 }, // Move down
		{ row: 0, col: 1 }, // Move right
	];

	const emptyRow = Math.floor(emptyIndex / puzzleSize);
	const emptyCol = emptyIndex % puzzleSize;

	const neighborStates: PuzzleState[] = [];

	for (const movement of movements) {
		const newRow = emptyRow + movement.row;
		const newCol = emptyCol + movement.col;

		// Check if new row and column are within bounds
		if (newRow >= 0 && newRow < puzzleSize && newCol >= 0 && newCol < puzzleSize) {
			const neighborIndex = newRow * puzzleSize + newCol;
			const newTiles = [...tiles];
			[newTiles[emptyIndex], newTiles[neighborIndex]] = [newTiles[neighborIndex], newTiles[emptyIndex]];
			neighborStates.push({
				tiles: newTiles,
				emptyIndex: neighborIndex,
				puzzleSize: puzzleSize,
			});
		}
	}

	return neighborStates;
}

function getPath(currentNode: PuzzleNode): {path: PuzzleDirection[], pathValue: number[]} {
	const path: PuzzleDirection[] = [];
	const pathValue: number[] = [];

	// Traverse the parent nodes until we reach the root node
	while (currentNode.parent !== null) {
		// Determine the direction that was taken to reach the current node
		const currentDirection = determineDirection(
			currentNode.parent.state,
			currentNode.state
		);
		const currentNodeValueDirection = determineValueDirection(
			currentNode.parent.state,
			currentNode.state
		);
		// Add the direction to the path
		path.unshift(currentDirection);
		pathValue.unshift(currentNodeValueDirection);
		// Move to the parent node
		currentNode = currentNode.parent;
	}

	return {path, pathValue};
}

function determineDirection(parentState: PuzzleState, currentState: PuzzleState): PuzzleDirection {
	const parentEmptyIndex = parentState.emptyIndex;
	const currentEmptyIndex = currentState.emptyIndex;

	if (currentEmptyIndex - parentEmptyIndex === 1) {
		return 'left';
	} else if (parentEmptyIndex - currentEmptyIndex === 1) {
		return 'right';
	} else if (currentEmptyIndex - parentEmptyIndex === currentState.puzzleSize) {
		return 'up';
	} else if (parentEmptyIndex - currentEmptyIndex === currentState.puzzleSize) {
		return 'down';
	} else {

		throw new Error('Invalid direction');
	}
}

function determineValueDirection(parentState: PuzzleState, currentState: PuzzleState) {
	const parentEmptyIndex = parentState.emptyIndex;
	const currentEmptyIndex = currentState.emptyIndex;

	if (currentEmptyIndex - parentEmptyIndex === 1) {
		return currentState.tiles[currentEmptyIndex - 1];
	} else if (parentEmptyIndex - currentEmptyIndex === 1) {
		return currentState.tiles[currentEmptyIndex + 1];
	} else if (currentEmptyIndex - parentEmptyIndex === currentState.puzzleSize) {
		return currentState.tiles[currentEmptyIndex - currentState.puzzleSize];
	} else if (parentEmptyIndex - currentEmptyIndex === currentState.puzzleSize) {
		return currentState.tiles[currentEmptyIndex + currentState.puzzleSize];
	} else {

		throw new Error('Invalid direction');
	}
}


/*
 *This function simply checks if every tile in the current state is the same as the
 corresponding tile in the goal state. If they are all the same, it returns true,
 indicating that the current state is the goal state.
 */
function isGoalState(state: PuzzleState, goal: PuzzleState): boolean {
	return state.tiles.every((tile, index) => tile === goal.tiles[index]);
}
function createGoalState(puzzle: number[]): PuzzleState {

	const sortedPuzzle = [...puzzle].sort(function(a, b){return a-b});
	const emptyTileIndex = sortedPuzzle.indexOf(0);
	sortedPuzzle.splice(emptyTileIndex, 1);
	sortedPuzzle.push(0);

	return {
		tiles: sortedPuzzle,
		emptyIndex: sortedPuzzle.length - 1,
		puzzleSize: Math.sqrt(sortedPuzzle.length),
	};
}

export function shufflePuzzle(puzzle: number[]) {

	const shuffledPuzzle = [...puzzle];

	// Shuffle the array using the Fisher-Yates algorithm
	for (let i = shuffledPuzzle.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledPuzzle[i], shuffledPuzzle[j]] = [shuffledPuzzle[j], shuffledPuzzle[i]];
	}

	// Check if the puzzle is solvable, if not shuffle again
	while (!checkIfPuzzleIsSolvable(shuffledPuzzle)) {
		for (let i = shuffledPuzzle.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledPuzzle[i], shuffledPuzzle[j]] = [shuffledPuzzle[j], shuffledPuzzle[i]];
		}
	}

	return shuffledPuzzle;
}

/* Check if the puzzle is solvable
1. Calculate the number of inversions in the puzzle.
2. If the puzzle size is odd and the number of inversions is even, the puzzle is solvable.
3. If the puzzle size is odd and the number of inversions is odd, the puzzle is not solvable.
4. If the puzzle size is even, calculate the sum of the row number of the empty cell and the number of inversions.
5. If the sum is odd, the puzzle is not solvable. If the sum is even, the puzzle is solvable.
* @param {number[]} puzzle - The puzzle to be solved
* returns {boolean} - True if the puzzle is solvable, false otherwise
*/
function checkIfPuzzleIsSolvable(puzzle: number[]): boolean {
	const puzzleSize = Math.sqrt(puzzle.length);
	let inversions = 0;
	let emptyRowIndex = 0;

	for (let i = 0; i < puzzle.length; i++) {
		if (puzzle[i] === 0) {
			emptyRowIndex = Math.floor(i / puzzleSize) + 1;
			continue;
		}
		for (let j = i + 1; j < puzzle.length; j++) {
			if (puzzle[i] > puzzle[j] && puzzle[j] !== 0) {
				inversions++;
			}
		}
	}

	if (puzzleSize % 2 === 1) {
		return inversions % 2 === 0;
	} else {
		return (inversions + emptyRowIndex) % 2 === 0;
	}
}
