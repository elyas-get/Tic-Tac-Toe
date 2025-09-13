const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  let turn = 0;

  const update = (value, position) => {
    if (board[position] === "") {
      board[position] = value;
    }
  };

  const p1 = player("Elyas", "X");
  const p2 = player("Abebe", "O");

  const makeMove = (position) => {
    const currentMarker = turn % 2 === 0 ? p1.marker : p2.marker;
    update(currentMarker, position);
    turn++;
    return currentMarker;
  };

  const click = () => {
    const cells = document.querySelectorAll(".cell");
    const messageEl = document.getElementById("message");

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (board[index] === "") {
          const marker = makeMove(index);
          cell.innerText = marker;
          cell.classList.add(marker.toLowerCase());

          if (checkWinner(marker)) {
            messageEl.textContent = `${marker} wins! 🎉`;
            setTimeout(() => reset(), 1500);
            return;
          }

          if (boardFull()) {
            messageEl.textContent = "It's a draw! 🤝";
            setTimeout(() => reset(), 1500);
            return;
          }
        }
      });
    });
  };

  const boardFull = () => board.every((el) => el !== "");

  const reset = () => {
    board.fill("");
    turn = 0;
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.innerText = "";
      cell.classList.remove("x", "o");
    });
    const messageEl = document.getElementById("message");
    if (messageEl) messageEl.textContent = "";
  };

  const getBoard = () => [...board];

  return { update, reset, getBoard, boardFull, click };
})();

function player(name, marker) {
  return { name, marker };
}

function checkWinner(marker) {
  const b = gameBoard.getBoard();

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) =>
    pattern.every((index) => b[index] === marker)
  );
}

function startGame() {
  const startBtn = document.getElementById("startBtn");
  const board = document.querySelector(".game-board");

  startBtn.addEventListener("click", () => {
    board.classList.remove("hidden");
    startBtn.style.display = "none";
    gameBoard.click();
  });
}

startGame();
