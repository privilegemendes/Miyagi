# Design Notes

1. Use customize-cra and react-app-rewired to override cra default webpack config
2. 

## Frontend
1. JS and CSS grid block slider
2. Attach the algorithm to it


### CSS Grid
#### Pros
 - Easy to create a grid layout for the puzzle pieces
 - lightweight and easy to maintain

#### Cons
 - Can be less performant for complex puzzle with many pieces
 - Limited ability to add custom graphics or animations to the puzzle pieces

### SVG
#### Pros
  - Can create custom graphics and animations for the puzzle pieces
  - Can be more performant for complex puzzle with many pieces
  - Ability to use external tools to create and manipulate SVG graphics

#### Cons
 - Step learning curve for creating and manipulating SVG graphics
 - May require more code to create the puzzle pieces and implement drag and drop functionality
 - Can be more difficult to maintain

### HTML5 Canvas
#### Pros
 - Highly performant for complex puzzle with many pieces
 - Ability to create custom graphics and animations for the puzzle pieces
 - Supports advanced features like pixel-level collision detection

#### Cons
 - Requires more code and a deeper understanding of graphics programming
 - Not as flexible for creating layouts as CSS Grid or SVG
 - Canvas is a bitmap-based graphics technology, meaning that images can become pixelated when scaled up or down



## A Star Algorithm for Puzzle Solver
The A* algorithm is a pathfinding algorithm that can be used to find the shortest path between two points in a graph. In this case, the graph is represented by the state space of a 3x3 sliding puzzle.

The solvePuzzle function takes an initial PuzzleState as input and returns an array of PuzzleState objects representing the solution path. If there is no solution, it returns an empty array.

The function uses the A* algorithm to search for the solution path. It maintains two sets of nodes: the openSet and the closedSet. The openSet is the set of nodes that have been discovered but not yet visited, while the closedSet is the set of nodes that have already been visited.

The function starts by initializing the openSet with a single Node representing the startNode, which has the initial PuzzleState as its state and zero cost from start to itself, and the estimated cost to the goal node as heuristic(initialState).

The function then enters a loop that runs until the openSet is empty or the goal node is found. In each iteration of the loop, the function selects the node with the lowest totalEstimatedCost from the openSet and adds it to the closedSet.

The function then generates the successors of the current node by applying each possible move to the empty tile in the puzzle. For each successor, the function computes its costFromStart (the cost to reach this node from the start node), its estimatedCostToGoal (the estimated cost to reach the goal node from this node using the heuristic function), and its totalEstimatedCost (the sum of the previous two costs). If the successor is not already in the closedSet, the function adds it to the openSet.

If the goal node is found, the function reconstructs the solution path by following the parent links of each node from the goal node back to the start node. The function returns an array of PuzzleState objects representing the solution path.

If there is no solution, the function returns an empty array.

#### Heuristic Function - Manhattan Distance
we calculate the distance between a tile's current position and its goal position for each tile, and then add up all of these distances to get an estimate of how far away the current state is from the goal state. This heuristic is admissible, which means that it never overestimates the distance to the goal, and it is also consistent, which means that the heuristic estimate of the distance between two states is always less than or equal to the true distance.
