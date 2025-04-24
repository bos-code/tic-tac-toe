import { Fragment, useState } from "react";
import img from "./assets/tic. tac.toe..png";
import "./App.css";

function App() {
  return <HeroWrapper />;
}

function HeroWrapper() {
  const [isXNext, setIsXNext] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));

  function handleReset() {
    setBoard(Array(9).fill(null));
  }

  function handleDraw() {
    const isDraw = board.every((square) => square !== null);
    return isDraw;
  }

  return (
    <div className="body-wrapper">
      <figure className="comp">
        <img src={img} alt="" />
      </figure>
      <div className="wrapper">
        <ScoreBoard />
        <Board
          isXNext={isXNext}
          setIsXNext={setIsXNext}
          board={board}
          setBoard={setBoard}
        />
        <Turns isXNext={isXNext} onDraw={handleDraw} onReset={handleReset} />
      </div>
    </div>
  );
}

const Board = ({ isXNext, setIsXNext, board, setBoard }) => {
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
    console.log(board.every((value) => value !== null));
    if (board.every((value) => value !== null)) {
      setBoard(Array(9).fill(null));
    }
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

function Turns({ isXNext, onDraw, onReset }) {
  function handleReset() {
    onReset();
  }

  const isDraw = onDraw();

  return (
    <div>
      {isDraw ? (
        <button className="btn" onClick={handleReset}>
          Play Again
        </button>
      ) : (
        <span className={isXNext ? "x tag" : "o tag"}>
          {isXNext ? "X’s Turn" : "O’s Turn"}
        </span>
      )}
    </div>
  );
}

function ScoreBoard() {
  return (
    <div className="scoreWrapper">
      <div className="card">
        <p>PLAYER X</p>
        <span>0</span>
      </div>
      <div className="card">
        <p>Draw</p>
        <span>0</span>
      </div>
      <div className="card">
        <p>PLAYER O</p>
        <span>0</span>
      </div>
    </div>
  );
}

export default App;
