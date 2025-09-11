const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const update = (value, position) => {
    if (board[position] === "") {
      board[position] = value;
    }
  };
  const boardFull = () =>
    board.every((element) => {
      if (element === "") {
        return false;
      } else {
        return true;
      }
    });
  const reset = () => (board = ["", "", "", "", "", "", "", "", ""]);
  const getBoard = () => [...board];
  return { update, reset, getBoard, boardFull };
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
