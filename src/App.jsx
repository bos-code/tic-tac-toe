import { Fragment, useState } from "react";
import img from "./assets/tic. tac.toe..png";
import "./App.css";
import { ScoreBoard } from "./ScoreBoard";
import { Turns } from "./Turns";

function App() {
  return <HeroWrapper />;
}

function HeroWrapper() {
  const [isXNext, setIsXNext] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));

  function handleReset() {
    setBoard(Array(9).fill(null));
  }

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = checkWinner(board);
  function checkDraw(board, winner) {
    const isBoardFull = board.every((cell) => cell !== null);
    const isDraw = isBoardFull && winner == null;
    return isDraw;
  }
  const isDraw = checkDraw(board, winner);

  return (
    <div className="body-wrapper">
      <figure className="comp">
        <img src={img} alt="" />
      </figure>
      <div className="wrapper">
        <ScoreBoard onDraw={isDraw} winner={winner} />
        <Board
          isXNext={isXNext}
          setIsXNext={setIsXNext}
          board={board}
          setBoard={setBoard}
          winner={winner}
        />
        <Turns
          isXNext={isXNext}
          winner={winner}
          onFilled={board}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

function Winner({ winner }) {
  return <div>{winner ? `Winner: ${winner}` : ""}</div>;
}

const Board = ({ isXNext, setIsXNext, board, setBoard, winner }) => {
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

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      <p
        className={`${value === null ? "op" : "player"} ${
          value === "x" ? "x" : "o"
        }`}
      >
        {value}
      </p>
    </button>
  );
};

export default App;
