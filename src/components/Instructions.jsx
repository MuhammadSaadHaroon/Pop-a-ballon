import React from "react";

export default function Instructions() {
  return (
    <div className="instructions-box" style={{ maxWidth: 720, margin: "8px auto", textAlign: "left" }}>
      <h3>How to Play</h3>
      <ol>
        <li>Signup / Login with your account.</li>
        <li>Select Level from dropdown. Choose 1-10 mode for progressive timed run or a single level to play unlimited time.</li>
        <li>Click <strong>Start Game</strong>. Target color will be shown at top center.</li>
        <li>Pop target-color balloons. Wrong pops cost a life. You have 3 lifelines initially.</li>
        <li>Clear a round to earn +1 lifeline (max limit optional).</li>
        <li>1-10 mode stores highscore (top 10) — single-level runs do not store global highs.</li>
      </ol>
      <p style={{ fontSize: 13, opacity: 0.9 }}>
        Tip: as levels increase balloons move faster, change color and move in different directions.
      </p>
    </div>
  );
}
