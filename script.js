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
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

submitBtn.addEventListener('click', () => {
    // Selectors updated to match Cypress (no hyphen)
    p1 = document.getElementById('player1').value || "Player 1";
    p2 = document.getElementById('player2').value || "Player 2";
    
    currentPlayer = p1;
    setupDiv.style.display = 'none';
    gameContainer.style.display = 'block';
    // Test 1 & 2 expect exactly: "{name}, you're up"
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

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        // Test 2 & 3 expect exactly: "{name} congratulations you won!"
        messageDiv.textContent = `${currentPlayer} congratulations you won!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        messageDiv.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    // Toggle turn
    currentPlayer = (currentPlayer === p1) ? p2 : p1;
    messageDiv.textContent = `${currentPlayer}, you're up`;
}