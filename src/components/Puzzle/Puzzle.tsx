import React, {useEffect, useRef, useState} from 'react';

const PUZZLE_SIZE = 3; // 3x3 puzzle
const PIECE_SIZE = 100; // Size of each puzzle piece in pixels

interface PuzzlePiece {
	x: number;
	y: number;
	targetX: number;
	targetY: number;
	image: HTMLImageElement;
}

const images = [  'puzzle_01.png',  'puzzle_02.png',  'puzzle_03.png',  'puzzle_04.png',  'puzzle_05.png',  'puzzle_06.png',  'puzzle_07.png',  'puzzle_08.png',  'puzzle_09.png'];

const PuzzleSlider: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [puzzle, setPuzzle] = useState<PuzzlePiece[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const [dragPiece, setDragPiece] = useState<PuzzlePiece | null>(null);
	const [moves, setMoves] = useState(0);
	const [startTime, setStartTime] = useState(0);
	const [endTime, setEndTime] = useState(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			canvas.width = PUZZLE_SIZE * PIECE_SIZE;
			canvas.height = PUZZLE_SIZE * PIECE_SIZE;
			const context = canvas.getContext('2d');
			if (context) {
				const newPuzzle: PuzzlePiece[] = [];
				const image = new Image();
				image.src = images[Math.floor(Math.random() * images.length)];
				image.onload = () => {
					for (let i = 0; i < PUZZLE_SIZE; i++) {
						for (let j = 0; j < PUZZLE_SIZE; j++) {
							const piece: PuzzlePiece = {
								x: j * PIECE_SIZE,
								y: i * PIECE_SIZE,
								targetX: j * PIECE_SIZE,
								targetY: i * PIECE_SIZE,
								image
							};
							newPuzzle.push(piece);
						}
					}
					shufflePuzzle(newPuzzle);
					setPuzzle(newPuzzle);
				};
			}
		}
	}, []);

	const shufflePuzzle = (puzzle: PuzzlePiece[]) => {
		// Fisher-Yates shuffle algorithm
		for (let i = puzzle.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
		}
	};

	const drawPuzzle = (puzzle: PuzzlePiece[]) => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext('2d');
			if (context) {
				context.clearRect(0, 0, canvas.width, canvas.height);
				for (let i = 0; i < puzzle.length; i++) {
					const piece = puzzle[i];
					context.drawImage(piece.image, piece.x, piece.y, PIECE_SIZE, PIECE_SIZE);
				}
			}
		}
	};

	const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
		const { offsetX, offsetY } = event.nativeEvent;
		const puzzlePiece = getPuzzlePieceAtOffset(puzzle, offsetX, offsetY);
		if (puzzlePiece) {
			setIsDragging(true);
			setDragPiece(puzzlePiece);
			setPuzzle(
				puzzle.map((piece : PuzzlePiece) =>
					piece === puzzlePiece ? { ...piece, isDragging: true } : piece
				)
			);
		}
	};

	const onMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
		if (isDragging && dragPiece) {
			const canvas = canvasRef.current;
			if (canvas) {
				const mouseX = event.nativeEvent.offsetX;
				const mouseY = event.nativeEvent.offsetY;
				dragPiece.x = mouseX - PIECE_SIZE / 2;
				dragPiece.y = mouseY - PIECE_SIZE / 2;
				drawPuzzle(puzzle);
			}
		}
	};

	const onMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
		if (isDragging && dragPiece) {
			const canvas = canvasRef.current;
			if (canvas) {
				const mouseX = event.nativeEvent.offsetX;
				const mouseY = event.nativeEvent.offsetY;
				let nearestPiece: PuzzlePiece | null = null;
				let nearestDistance = Infinity;
				for (let i = 0; i < puzzle.length; i++) {
					const piece = puzzle[i];
					if (piece !== dragPiece) {
						const distance = Math.sqrt((piece.x - mouseX) ** 2 + (piece.y - mouseY) ** 2);
						if (distance < nearestDistance) {
							nearestPiece = piece;
							nearestDistance = distance;
						}
					}
				}
				if (nearestPiece) {
					const tempX = dragPiece.x;
					const tempY = dragPiece.y;
					dragPiece.x = nearestPiece.x;
					dragPiece.y = nearestPiece.y;
					nearestPiece.x = tempX;
					nearestPiece.y = tempY;
					setMoves(moves + 1);
					checkWin();
				} else {
					dragPiece.x = dragPiece.targetX;
					dragPiece.y = dragPiece.targetY;
				}
				setDragPiece(null);
				setIsDragging(false);
				drawPuzzle(puzzle);
			}
		}
	};

	const checkWin = () => {
		let isWin = true;
		for (let i = 0; i < puzzle.length; i++) {
			const piece = puzzle[i];
			if (piece.x !== piece.targetX || piece.y !== piece.targetY) {
				isWin = false;
				break;
			}
		}
		if (isWin) {
			setEndTime(Date.now());
			alert(`Congratulations! You solved the puzzle in ${moves} moves and ${Math.floor((endTime - startTime) / 1000)} seconds.`);
		}
	};

	const startNewGame = () => {
		const canvas = canvasRef.current;
		const newPuzzle: PuzzlePiece[] = [];
		if (canvas) {
			const context = canvas.getContext('2d');
			if (context) {
				const newPuzzle: PuzzlePiece[] = [];
				const image = new Image();
				image.src = images[Math.floor(Math.random() * images.length)];
				image.onload = () => {
					for (let i = 0; i < PUZZLE_SIZE; i++) {
						for (let j = 0; j < PUZZLE_SIZE; j++) {
							const piece: PuzzlePiece = {
								x: j * PIECE_SIZE,
								y: i * PIECE_SIZE,
								targetX: j * PIECE_SIZE,
								targetY: i * PIECE_SIZE,
								image
							};
							newPuzzle.push(piece);
						}
					}
					shufflePuzzle(newPuzzle);
					setPuzzle(newPuzzle);
					setMoves(0);
					setStartTime(Date.now());
					setEndTime(0);
					drawPuzzle(newPuzzle);
				};
			}
		}
		setEndTime(0);
		drawPuzzle(newPuzzle);
	};

	useEffect(() => {
		startNewGame();
	});

	return (
		<div>
			<canvas
				ref={canvasRef}
				width={PUZZLE_SIZE}
				height={PUZZLE_SIZE}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				onMouseUp={onMouseUp}
			/>
			<div>
				<button onClick={startNewGame}>New Game</button>
				<span>Moves: {moves}</span>
			</div>
		</div>
	);
};

const getPuzzlePieceAtOffset = (
	puzzle: PuzzlePiece[],
	x: number,
	y: number
): PuzzlePiece | undefined => {
	return puzzle.find(
		(piece) =>
			x >= piece.x &&
			x < piece.x + PIECE_SIZE &&
			y >= piece.y &&
			y < piece.y + PIECE_SIZE
	);
};
/*

This example creates a 3x3 puzzle slider app using Canvas in React Typescript.
It generates a puzzle with a random image from a list of images, shuffles the puzzle pieces, and displays it on the canvas.
The user can then click and drag the puzzle pieces to move them around and solve the puzzle.
The app uses a `PuzzlePiece` interface to define the properties of each puzzle piece, including its x and y position, target x and y positions, and the image it displays. It also uses the `useState` hook to manage the state of the puzzle, moves, start time, and end time.

The `startNewGame` function generates a new puzzle by creating an array of `PuzzlePiece` objects and shuffling it. It also sets the start time to the current time.

The `drawPuzzle` function draws the puzzle on the canvas using the `drawImage` method of the canvas context. It takes the current puzzle as an argument and loops through each puzzle piece, drawing it at its current position.

The `onMouseDown`, `onMouseMove`, and `onMouseUp` functions handle user input for dragging the puzzle pieces. They use the `useState` hook to manage the state of the currently dragged puzzle piece, whether dragging is currently happening, and the list of puzzle pieces.

The `checkWin` function checks if the puzzle is in a solved state by comparing the x and y positions of each puzzle piece to its target x and y positions. If all puzzle pieces are in their target positions, the function displays an alert message with the number of moves and time it took to solve the puzzle.

Finally, the `useEffect` hook runs `startNewGame` when the component is mounted to generate a new puzzle and display it on the canvas.

Note that this example assumes the existence of a list of images, `images`, from which to randomly choose a puzzle image. You may need to modify this code to provide your own list of images.

 */
