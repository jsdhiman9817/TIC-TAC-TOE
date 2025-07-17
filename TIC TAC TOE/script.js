const boxes = document.querySelectorAll('.box');
const winText = document.querySelector('.win');
let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWin() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[b].textContent === boxes[c].textContent
    ) {
      winText.textContent = `${boxes[a].textContent} Wins!`;
      gameActive = false;
      boxes.forEach(box => box.disabled = true);
      return;
    }
  }

  if ([...boxes].every(box => box.textContent)) {
    winText.textContent = "It's a Draw!";
    gameActive = false;
  }
}

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (box.textContent === '' && gameActive) {
      box.textContent = currentPlayer;
      checkWin();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});

// ✅ RESET without reload
document.querySelector(".reset").addEventListener("click", () => {
  boxes.forEach(box => {
    box.textContent = "";
    box.disabled = false;
  });
  winText.textContent = "";     // 🔥 Winner message clear
  currentPlayer = "X";
  gameActive = true;
});
