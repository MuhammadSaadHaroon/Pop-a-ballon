import React, { useEffect, useState } from "react";

/**
 * Timer component
 * props:
 *  - initial (seconds)
 *  - running (bool)
 *  - onTimeUp()
 *  - onTick(remaining)
 */

export default function Timer({ initial = 20, running = true, onTimeUp, onTick }) {
  const [remaining, setRemaining] = useState(initial);

  useEffect(() => {
    setRemaining(initial);
  }, [initial]);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) {
      onTimeUp && onTimeUp();
      return;
    }
    const t = setInterval(() => {
      setRemaining((r) => {
        const next = r - 1;
        onTick && onTick(next);
        if (next <= 0) {
          onTimeUp && onTimeUp();
          clearInterval(t);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, remaining]);

  return (
    <div className="timer">
      <div className="timer-bar">
        <span>Time: {remaining}s</span>
      </div>
    </div>
  );
}
