/*  Succinct Chess – main JS
    Uses chess.js for rules + chessboard.js for UI
-------------------------------------------------- */

const game = new Chess(); // rules / state engine

/* -- Drag validation ------------------------------------------ */
function onDragStart(source, piece) {
  // Disallow moves if the game is over
  // or if it's not that colour's turn
  if (
    game.game_over() ||
    (game.turn() === "w" && piece.startsWith("b")) ||
    (game.turn() === "b" && piece.startsWith("w"))
  ) {
    return false;
  }
}

/* -- Handle a piece drop -------------------------------------- */
function onDrop(source, target) {
  // Attempt the move; promote to queen by default
  const move = game.move({
    from: source,
    to: target,
    promotion: "q",
  });

  // Illegal move → snap piece back
  if (move === null) return "snapback";
}

/* -- Snap end: update board to new FEN ------------------------ */
function onSnapEnd() {
  board.position(game.fen());
}

/* -- Initialise the board UI ---------------------------------- */
const board = Chessboard("board", {
  draggable: true,
  position: "start",
  onDragStart,
  onDrop,
  onSnapEnd,
});
