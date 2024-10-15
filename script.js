const game = document.getElementById('game');
const resetButton = document.getElementById('reset');
const resultDisplay = document.getElementById('result');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let clicks = 0;

// Create grid
function createGrid() {
    game.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        game.appendChild(cell);
    }
}

// Initialize grid on page load
createGrid();

// Event listener for player moves
game.addEventListener('click', (event) => {
    const cell = event.target;
    const index = cell.dataset.index;

    if (cell.classList.contains('cell') && !cell.innerHTML) {
        cell.innerHTML = currentPlayer;
        board[index] = currentPlayer;
        clicks++;
        if (checkWin()) {
            resultDisplay.innerText = `${currentPlayer} wins!`;
            highlightWinningCells();
        } else if (clicks === 9) {
            resultDisplay.innerText = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
});

// Reset button functionality
resetButton.addEventListener('click', resetGame);

// Reset game function
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    clicks = 0;
    currentPlayer = 'X';
    resultDisplay.innerText = '';
    createGrid();
}

// Check for win conditions
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6]             // diagonal
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Highlight winning cells
function highlightWinningCells() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.querySelectorAll('.cell')[a].style.backgroundColor = 'lightgreen';
            document.querySelectorAll('.cell')[b].style.backgroundColor = 'lightgreen';
            document.querySelectorAll('.cell')[c].style.backgroundColor = 'lightgreen';
        }
    });
}
