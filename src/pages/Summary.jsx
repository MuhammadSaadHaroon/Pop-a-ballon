// src/pages/Summary.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetGame } from "../redux/gameSlice";

export function Summary({ navigate }) {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.game.score);

  const restart = () => {
    dispatch(resetGame());
    navigate("/game");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(180deg, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 48, marginTop: 120, textShadow: "0 0 10px #00ffff" }}>
        Game Over
      </h1>
      <h2 style={{ fontSize: 32}}>
        Your Score: <span style={{ color: "#00ffff" }}>{score}</span>
      </h2>
      <div style={{ display: "flex", gap: 20 }}>
        <button
          onClick={restart}
          style={{
            fontSize: 18,
            background: "#00bfff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#009acd")}
          onMouseLeave={(e) => (e.target.style.background = "#00bfff")}
        >
          Try Again
        </button>
        <button
          onClick={() => navigate("/home")}
          style={{
            fontSize: 18,
            background: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#cc0000")}
          onMouseLeave={(e) => (e.target.style.background = "#ff4d4d")}
        >
          Quit
        </button>
      </div>
    </div>
  );
}
