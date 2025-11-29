import React from "react";

/**
 * Lifelines display
 * props:
 *  - count (0..3+)
 *  - onUse(index) optional (if you want clickable lifelines)
 */

export default function Lifelines({ count = 3, onUse }) {
  const max = Math.max(3, count);
  return (
    <div className="lifelines" style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <span>Lives:</span>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className={`life ${i < count ? "active" : "empty"}`}
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: i < count ? "red" : "transparent",
            border: "2px solid rgba(255,255,255,0.25)",
            display: "inline-block",
            cursor: onUse ? "pointer" : "default",
          }}
          onClick={() => onUse && onUse(i)}
        />
      ))}
      <small style={{ marginLeft: 8, opacity: 0.8 }}>({count} remaining)</small>
    </div>
  );
}
