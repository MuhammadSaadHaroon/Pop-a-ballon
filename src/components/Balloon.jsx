import React, { useEffect, useRef, useState } from "react";

export default function Balloon({ id, color, startTop = 100, startLeft = 10, speed = 1, direction = "up", onPop, onMiss, images }) {
  const ref = useRef(null);
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let posTop = startTop;
    let raf;
    const start = performance.now();

    function step(now) {
      const dt = (now - start) / 1000;
      posTop -= dt * 10 * speed;

      if (posTop < -10) {
        if (!popped && onMiss) onMiss({ id, color });
        cancelAnimationFrame(raf);
        return;
      }

      el.style.top = `${posTop}%`;
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [startTop, speed, id, onMiss, color, popped]);

  const handleClick = () => {
    if (popped) return;
    setPopped(true);
    if (onPop) onPop({ id, color });
    const el = ref.current;
    if (el) {
      el.style.transform = "scale(1.5)";
      el.style.opacity = 0;
      setTimeout(() => el && el.remove(), 300);
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      style={{
        position: "absolute",
        top: `${startTop}%`,
        left: `${startLeft}%`,
        width: 60,
        height: 80,
        cursor: "pointer",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        backgroundImage: `url(${images[color]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      title={`Color: ${color}`}
    />
  );
}
