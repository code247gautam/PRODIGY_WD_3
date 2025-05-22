// script.js
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart');
const emojiElement = document.getElementById('emoji');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (!board[index] && isGameActive) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWin()) {
      statusElement.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
      emojiElement.textContent = '🎊👏🥳';
      isGameActive = false;
    } else if (board.every(cell => cell)) {
      statusElement.textContent = "It's a Draw!";
      emojiElement.textContent = '🤝😐';
      isGameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusElement.textContent = `Player ${currentPlayer}'s turn`;
      emojiElement.textContent = '';
    }
  }
}

function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  emojiElement.textContent = '';
  renderBoard();
}

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.setAttribute('data-index', index);
    cellElement.textContent = cell;
    cellElement.addEventListener('click', handleCellClick);
    boardElement.appendChild(cellElement);
  });
}

restartButton.addEventListener('click', restartGame);
restartGame();
