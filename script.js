var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}
let newgrid= [[], [], [], [], [], [], [], [], []]
let GetPuzzle = document.getElementById('getPuzzle')
let SolvePuzzle = document.getElementById('solvePuzzle')

GetPuzzle.onclick = function () {
  newgrid=generateSudoku()
	FillBoard(newgrid)
}

SolvePuzzle.onclick = () => {
	solveSudoku(newgrid)
}

function generateSudoku() {
  const N = 9; // Size of the Sudoku grid
  const grid = [];
  for (let i = 0; i < N; i++) {
    grid[i] = new Array(N).fill(0);
  }

  solveSudoku(grid);

  // Remove random cells while maletaining a unique solution
  const cells = [];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      cells.push([row, col]);
    }
  }
  shuffleArray(cells);

  const cellsToRemove = Math.floor(N * N / 2); // Adjust difficulty level here
  for (let i = 0; i < cellsToRemove; i++) {
    const [row, col] = cells[i];
    if (grid[row][col] !== 0) {
      grid[row][col] = 0;
    }
  }

  return grid;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function isSafe(grid, row, col, val)
{
    for (let i = 0; i < 9; i++)
    {
        if (grid[row][i] === val)
        {
            return false;
        }
        if (grid[i][col] === val)
        {
            return false;
        }
    }
    let si = row-row%3;
    let sj = col-col%3;
    for (let i = si; i < si+3; i++) {
      for (let j = sj; j < sj+3; j++) {
        if (grid[i][j] === val) {
          return false;
        }
      }
    }
    return true;
}

function printGrid(grid)
{
    // Your code here
    for (let i = 0; i < 9; i++)
    {
        for (let j = 0; j < 9; j++)
        {
            console.log(grid[i][j]+" ");
        }
        console.log("\n");
    }
    FillBoard(grid)
}

function solveSudoku(grid)
{
    // Your code here
    for (let i = 0; i < 9; i++)
    {
        for (let j = 0; j < 9; j++)
        {
            if (grid[i][j] === 0)
            {
                for (let k = 1; k <= 9; k++)
                {
                    if (isSafe(grid, i, j, k))
                    {
                        grid[i][j] = k;
                        let nextPossible = solveSudoku(grid);
                        if (nextPossible===true)
                        {
                            return true;
                        }
                        grid[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    printGrid(grid);

    return true;
}