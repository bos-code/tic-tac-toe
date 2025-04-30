import { Winner, Square } from "./App";

export const Board = ({ isXNext, setIsXNext, board, setBoard, winner }) => {
  function handleNext() {
    setIsXNext(!isXNext);
  }

  function handleSquareClick(index) {
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = isXNext ? "x" : "O";
      setBoard(newBoard);
      handleNext();
    }
    if (board.every((value) => value !== null)) {
      setBoard(Array(9).fill(null));
    }
  }
  if (winner) {
    return <Winner winner={winner} />;
  }
  if (board.every((value) => value !== null)) {
    return <div className="board">Draw</div>;
  }
  return (
    <div className="board">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => {
            handleSquareClick(index);
          }}
        />
      ))}
    </div>
  );
};
