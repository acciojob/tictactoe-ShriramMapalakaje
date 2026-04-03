//your JS code here. If required.
const submitBtn = document.getElementById('submit');
const setupDiv = document.getElementById('setup');
const gameContainer = document.getElementById('game-container');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let p1 = "";
let p2 = "";
let currentPlayer = "";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

submitBtn.addEventListener('click', () => {
    p1 = document.getElementById('player-1').value || "Player 1";
    p2 = document.getElementById('player-2').value || "Player 2";
    
    currentPlayer = p1;
    setupDiv.style.display = 'none';
    gameContainer.style.display = 'block';
    messageDiv.textContent = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = parseInt(cell.id) - 1;

        if (boardState[index] !== "" || !gameActive) return;

        const symbol = (currentPlayer === p1) ? "x" : "o";
        boardState[index] = symbol;
        cell.textContent = symbol;

        checkResult();
    });
});

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            // Add the purple background class to winning cells
            document.getElementById((a + 1).toString()).classList.add('winner');
            document.getElementById((b + 1).toString()).classList.add('winner');
            document.getElementById((c + 1).toString()).classList.add('winner');
            break;
        }
    }

    if (roundWon) {
        messageDiv.textContent = `${currentPlayer} congratulations you won!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        messageDiv.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    // Switch turns
    currentPlayer = (currentPlayer === p1) ? p2 : p1;
    messageDiv.textContent = `${currentPlayer}, you're up`;
}