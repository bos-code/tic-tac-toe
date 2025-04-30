export function Turns({ isXNext, onFilled, onReset, winner }) {
  function handleReset() {
    onReset();
  }

  const reset = onFilled?.every((value) => value !== null);

  return (
    <div>
      {reset || winner ? (
        <div className="btn-wrapper">
          <button className="btn" onClick={handleReset}>
            Play Again
          </button>
        </div>
      ) : (
        <span className={isXNext ? "x tag" : "o tag"}>
          {isXNext ? "X’s Turn" : "O’s Turn"}
        </span>
      )}
    </div>
  );
}
