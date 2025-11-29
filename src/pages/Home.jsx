import React from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../redux/gameSlice";

export function Home({ navigate }) {
  const dispatch = useDispatch();

  const handleStart = () => {
    dispatch(resetGame()); // score/lives reset
    navigate("/game");
  };

  return (
    <div className="home-container">
      <h1 className="main-title">POP A BALLOON</h1>

      <div className="instructions">
        <h3>Instructions:</h3>
        <p>
          Pop the correct colored balloon. Missing the target balloon reduces a
          life. Pop wrong balloon → lose life. Score increases level (1 to 10).
        </p>
      </div>

      <div className="button-row">
        <button className="btn-primary" onClick={handleStart}>
          Start Game
        </button>
      </div>
    </div>
  );
}
