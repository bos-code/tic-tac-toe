import { Fragment, useState } from "react";
import img from "./assets/tic. tac.toe..png";
import "./App.css";
import { ScoreBoard } from "./ScoreBoard";
import { Turns } from "./Turns";
import { Board } from "./Board";

function App() {
  return <HeroWrapper />;
}

function HeroWrapper() {
  const [isXNext, setIsXNext] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [draw, setDraw] = useState(0);
  const [win, setWin] = useState(0);
  const [loss, setLoss] = useState(0);

  function handleBoardReset() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  function handleGameReset() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setDraw(0);
    setWin(0);
    setLoss(0);
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
      <ResetGame onReset={handleGameReset} />
      <div className="wrapper">
        <ScoreBoard
          onDraw={isDraw}
          winner={winner}
          draw={draw}
          setDraw={setDraw}
          win={win}
          setWin={setWin}
          loss={loss}
          setLoss={setLoss}
        />
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
          onReset={handleBoardReset}
        />
      </div>
    </div>
  );
}

export function Winner({ winner }) {
  return <div>{winner ? `Winner: ${winner}` : ""}</div>;
}

export function Square({ value, onClick }) {
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
}

function ResetGame({ onReset }) {
  function handleReset() {
    onReset();
  }
  return (
    <div className="reset-game-wrapper">
      <button className="reset--btn" onClick={handleReset}>
        reset
      </button>
    </div>
  );
}

export default App;
