import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLevel } from "../redux/gameSlice";

/**
 * LevelDropdown
 * - options: 0 => 1-10 auto mode, 1..10 => single level
 */

export default function LevelDropdown() {
  const dispatch = useDispatch();
  const current = useSelector((s) => s.game.level);

  return (
    <select
      className="level-dropdown"
      value={current}
      onChange={(e) => dispatch(setLevel(Number(e.target.value)))}
      style={{ padding: "8px 12px", borderRadius: 6 }}
    >
      <option value={0}>1 to 10 (Auto Mode)</option>
      {[1,2,3,4,5,6,7,8,9,10].map((n) => (
        <option key={n} value={n}>Level {n}</option>
      ))}
    </select>
  );
}
