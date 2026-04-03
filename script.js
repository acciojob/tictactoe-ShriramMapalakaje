const submitBtn = document.getElementById('submit');
const setupDiv = document.getElementById('setup');
const gameDiv = document.getElementById('game-screen');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let p1Name, p2Name, currentPlayer;
let boardState = Array(9).fill("");
let isGameActive = true;

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

submitBtn.addEventListener('click', () => {
    p1Name = document.getElementById('player1').value || "Player 1";
    p2Name = document.getElementById('player2').value || "Player 2";
    
    currentPlayer = p1Name;
    setupDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    // Matches assertion: "{name}, you're up"
    messageDiv.innerText = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const id = parseInt(cell.id) - 1;
        if (boardState[id] !== "" || !isGameActive) return;

        const symbol = (currentPlayer === p1Name) ? "x" : "o";
        boardState[id] = symbol;
        cell.innerText = symbol;

        checkResult();
    });
});

function checkResult() {
    let roundWon = false;
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        // Matches assertion: "{name} congratulations you won!"
        messageDiv.innerText = `${currentPlayer} congratulations you won!`;
        isGameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        messageDiv.innerText = "It's a draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = (currentPlayer === p1Name) ? p2Name : p1Name;
    messageDiv.innerText = `${currentPlayer}, you're up`;
}