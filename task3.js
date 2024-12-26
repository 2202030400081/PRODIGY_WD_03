// Get references to DOM elements
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';  // X starts the game
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // Empty game board
let gameOver = false;  // Flag to track game state

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // If cell is already filled or the game is over, do nothing
    if (gameBoard[index] !== '' || gameOver) return;

    // Set the clicked cell with the current player's mark (X or O)
    gameBoard[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());  // Add class to color the player
    cell.textContent = currentPlayer;

    // Check for a winner after the move
    if (checkWinner()) {
        message.textContent = `${currentPlayer} wins!`;
        gameOver = true;
        return;
    }

    // Check for a draw
    if (gameBoard.every(cell => cell !== '')) {
        message.textContent = "It's a draw!";
        gameOver = true;
        return;
    }

    // Switch players
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

// Event listeners for cell clicks
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Event listener for reset button
resetBtn.addEventListener('click', resetGame);

// Initial message
message.textContent = `Player ${currentPlayer}'s turn`;
