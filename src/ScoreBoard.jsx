import { useEffect } from "react";

export function ScoreBoard({
  onDraw,
  winner,
  draw,
  setDraw,
  win,
  setWin,
  loss,
  setLoss,
}) {
  useEffect(() => {
    if (onDraw) {
      setDraw((prev) => prev + 1); // Draw
    }
  }, [onDraw]);
  useEffect(() => {
    if (!winner) return;

    if (winner === "x") {
      setLoss((prev) => prev + 1); // X loses
    }
    if (winner === "O") {
      setWin((prev) => prev + 1); // O wins
    }
  }, [winner]);

  return (
    <div className="scoreWrapper">
      <div className="card">
        <p>PLAYER X</p>
        <span>{loss}</span>
      </div>
      <div className="card">
        <p>Draw</p>
        <span>{draw}</span>
      </div>
      <div className="card">
        <p>PLAYER O</p>
        <span>{win}</span>
      </div>
    </div>
  );
}
