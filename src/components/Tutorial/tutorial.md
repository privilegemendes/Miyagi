# Welcome to the Miyagi, Puzzle Solver Game!

This is a fun and challenging game that involves sliding tiles around on a NxN grid to solve a puzzle.
The goal is to rearrange the tiles so that they are in the correct order, which is typically a numbered sequence from 1 to 8,
with an empty space in the bottom right corner.

## How to Play
To play the game, simply click and drag a tile to slide it into the empty space. You can only slide tiles that are adjacent to the empty space,
and you cannot move the empty space itself. Your goal is to use these movements to rearrange the tiles until they are in the correct order.

The game can be quite challenging, but don't worry! You can always hit the "reset" or "hint" button to start over if you get stuck.
You can also time yourself to see how quickly you can solve the puzzle, and try to beat your own record.

So go ahead and give the 3x3 puzzle slider game a try!
It's a great way to test your problem-solving skills and have some fun at the same time.

## Tricks to solving any size Puzzles

So the first thing you’re going to one to do is to solve the first two pieces on the top left. Let's use a 4x4 for example:

| 1   | x   | x   | x   |
|-----|-----|-----|-----|
| x   | x   | x   | x   |
| x   | x   | x   | x   |
| x   | x   | x   | x   |

| 1   | 2   | x   | x   |
|-----|-----|-----|-----|
| x   | x   | x   | x   |
| x   | x   | x   | x   |
| x   | x   | x   | x   |

Now you’re going to want to solve the remaining top tiles. Now because they’re right next to each other you’re going to have to solve them both at the same time.

| 1   | 2   | 3   | 4   |
|-----|-----|-----|-----|
| x   | x   | x   | x   |
| x   | x   | x   | x   |
| x   | x   | x   | x   |

Now simply repeat for the next row.

| 1   | 2   | 3   | 4   |
|-----|-----|-----|-----|
| 5   | 6   | 7   | 8   |
| x   | x   | x   | x   |
| x   | x   | x   | x   |

Now is the interesting bit. You’d think that you just have to solve the next row. And I tried to do this for a long time. But it’s just too difficult to solve **2 rows** at the same time. Here we’re actually going to **switch to solving the columns**.

Now this might take a little bit of fiddling around with because you’ll often get pieces in the wrong order. But you’ll get it to work eventually. Just do this for each row.

|  1  |  2  |  3  |  4  |
|:---:|:---:|:---:|:---:|
|  5  |  6  |  7  |  8  |
|  9  |  x  |  x  |  x  |
| 13  |  x  |  x  |  x  |

|  1  |  2  |  3  |  4  |
|:---:|:---:|:---:|:---:|
|  5  |  6  |  7  |  8  |
|  9  | 10  |  x  |  x  |
| 13  | 14  |  x  |  x  |

|  1  |  2  |  3  |  4  |
|:---:|:---:|:---:|:---:|
|  5  |  6  |  7  |  8  |
|  9  | 10  | 11  | 12  |
| 13  | 14  | 15  |  x  |

And that is how you solve a slide puzzle ! Good luck!
