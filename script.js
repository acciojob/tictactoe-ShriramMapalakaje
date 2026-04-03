const submitBtn = document.getElementById('submit');
const setupDiv = document.getElementById('setup');
const gameDiv = document.getElementById('game-screen');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1, player2;
let currentPlayer;
let boardState = Array(9).fill("");
let isGameActive = true;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Cols
    [0,4,8], [2,4,6]           // Diagonals
];

submitBtn.addEventListener('click', () => {
    player1 = document.getElementById('player-1').value || "Player 1";
    player2 = document.getElementById('player-2').value || "Player 2";
    
    currentPlayer = player1;
    setupDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    messageDiv.innerText = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const id = parseInt(cell.id) - 1;
        
        if (boardState[id] !== "" || !isGameActive) return;

        const symbol = (currentPlayer === player1) ? "x" : "o";
        boardState[id] = symbol;
        cell.innerText = symbol;

        checkWinner();
    });
});

function checkWinner() {
    let won = false;

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            won = true;
            // Highlight the winning row in purple
            [a, b, c].forEach(index => {
                document.getElementById((index + 1).toString()).classList.add('winner');
            });
            break;
        }
    }

    if (won) {
        messageDiv.innerText = `${currentPlayer}, congratulations you won!`;
        isGameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        messageDiv.innerText = "Draw!";
        isGameActive = false;
        return;
    }

    // Swap turns
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
    messageDiv.innerText = `${currentPlayer}, you're up`;
}