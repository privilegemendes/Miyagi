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

type PuzzleDirection = 'up' | 'down' | 'left' | 'right' | null;

export function PuzzleSolver(puzzle: number[]): PuzzleDirection[] | null {
	const pq = new PriorityQueue<PuzzleNode>((a, b) => a.totalEstimatedCost - b.totalEstimatedCost);
	const visited = new Set<string>();


	const initialState: PuzzleState = {
		tiles: puzzle,
		emptyIndex: puzzle.indexOf(0),
		puzzleSize: Math.sqrt(puzzle.length),
	}

	const goalState = createGoalState(initialState.puzzleSize);

	const startNode: PuzzleNode = {
		state: initialState,
		parent: null,
		costFromStart: 0,
		estimatedCostToGoal: manhattanDistance(initialState, goalState),
		totalEstimatedCost: manhattanDistance(initialState, goalState),
	};

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
				estimatedCostToGoal: manhattanDistance(neighbor, goalState),
				totalEstimatedCost:
					currentNode.costFromStart +
					1 +
					manhattanDistance(neighbor, goalState),
			};

			if (!visited.has(JSON.stringify(neighborNode.state.tiles))) {
				pq.enqueue(neighborNode);
			}
		}
	}

	return null;
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

function getPath(currentNode: PuzzleNode): PuzzleDirection[] {
	const path: PuzzleDirection[] = [];

	// Traverse the parent nodes until we reach the root node
	while (currentNode.parent !== null) {
		// Determine the direction that was taken to reach the current node
		const currentDirection = determineDirection(
			currentNode.parent.state,
			currentNode.state
		);
		// Add the direction to the path
		path.unshift(currentDirection);
		// Move to the parent node
		currentNode = currentNode.parent;
	}

	return path;
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
		return null;
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
function createGoalState(puzzleSize: number): PuzzleState {
	const tiles: number[] = Array.from({ length: puzzleSize * puzzleSize }, (_, i) => i + 1);
	tiles[tiles.length - 1] = 0;
	return {
		tiles,
		emptyIndex: tiles.length - 1,
		puzzleSize
	};
}
