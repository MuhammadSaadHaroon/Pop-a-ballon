import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addScore, removeLife, addLife, resetGame } from "../redux/gameSlice";
import Balloon from "../components/Balloon";

import redBalloon from "../assets/balloons/red.png";
import blueBalloon from "../assets/balloons/blue.png";
import greenBalloon from "../assets/balloons/green.png";
import yellowBalloon from "../assets/balloons/yellow.png";
import purpleBalloon from "../assets/balloons/purple.png";

import gameBg from "../assets/backgrounds/game-bg.jpg";
import popSoundFile from "../assets/sounds/pop.mp3";
import bgMusicFile from "../assets/sounds/bg-music.mp3";

export function Game({ navigate, selectedLevel = [1, 10] }) {
  const dispatch = useDispatch();
  const { lifelines, score } = useSelector((state) => state.game);

  const [balloons, setBalloons] = useState([]);
  const [targetColor, setTargetColor] = useState("red");
  const [popSound, setPopSound] = useState(null);
  const [bgMusic, setBgMusic] = useState(null);

  const missedBalloons = useRef(new Set());

  // Selected level range
  const minLevel = selectedLevel[0];
  const maxLevel = selectedLevel[1];

  const multiLevel = maxLevel > minLevel;
  const [level, setLevelLocal] = useState(minLevel);

  const colors = ["red", "blue", "green", "yellow", "purple"];
  const images = {
    red: redBalloon,
    blue: blueBalloon,
    green: greenBalloon,
    yellow: yellowBalloon,
    purple: purpleBalloon,
  };

  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
  const randomLeft = () => Math.random() * 90;

  // 🎵 BACKGROUND MUSIC
  useEffect(() => {
    const bg = new Audio(bgMusicFile);
    bg.loop = true;
    bg.volume = 0.2;

    const startPlay = () => bg.play().catch(() => {});
    document.addEventListener("click", startPlay, { once: true });

    setBgMusic(bg);

    const pop = new Audio(popSoundFile);
    setPopSound(pop);

    return () => bg.pause();
  }, []);

  // 🎈 SPAWN DELAY (LEVEL BASED)
  const spawnDelay = multiLevel
    ? Math.max(1200 - level * 80, 350)
    : Math.max(1500 - level * 100, 400);

  // 🎈 SPAWNING BALLOONS
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setBalloons((prev) => [
        ...prev,
        {
          id,
          color: randomColor(),
          left: randomLeft(),
          top: 100,
        }
      ]);
    }, spawnDelay);

    return () => clearInterval(interval);
  }, [level]);

  // 🎈 MOVEMENT SPEED (LEVEL BASED)
  const moveSpeed = 0.6 + level * 0.12;

  // 🎈 MOVE BALLOONS UP
  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons((prev) =>
        prev
          .map((b) => ({ ...b, top: b.top - moveSpeed }))
          .filter((b) => {
            // If balloon escapes screen
            if (b.top <= -10) {
              if (!missedBalloons.current.has(b.id)) {
                missedBalloons.current.add(b.id);

                if (b.color === targetColor) {
                  dispatch(removeLife());
                }
              }
              return false;
            }
            return true;
          })
      );
    }, 45);

    return () => clearInterval(interval);
  }, [moveSpeed]);

  // 🎮 LEVEL UP SYSTEM
  useEffect(() => {
    if (multiLevel) {
      let pointsNeeded = level * 5;

      if (score >= pointsNeeded && level < maxLevel) {
        setLevelLocal((prev) => prev + 1);
        setTargetColor(randomColor());
        dispatch(addLife());
      }
    }
  }, [score]);

  // 🎯 POP BALLOON LOGIC
  const handlePop = (balloon) => {
    if (missedBalloons.current.has(balloon.id)) return;

    if (balloon.color === targetColor) {
      dispatch(addScore());
      popSound?.play();
    } else {
      dispatch(removeLife());
    }

    setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));

    if (lifelines <= 1) {
      navigate("/summary");
    }
  };

  // ❌ QUIT GAME
  const quit = () => {
    dispatch(resetGame());
    setBalloons([]);
    navigate("/home");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${gameBg})`,
        backgroundSize: "cover",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          color: "#00ffff",
          fontSize: 22,
          fontWeight: "bold",
          textShadow: "0 0 8px #00ffff",
        }}
      >
        Target: {targetColor.toUpperCase()} | Score: {score} | Life: {lifelines} | Level: {level}
      </div>

      <button
        onClick={quit}
        style={{
          position: "absolute",
          top: 50,
          right: 20,
          padding: "6px 12px",
          background: "#ff4d4d",
          border: "none",
          color: "#fff",
          borderRadius: 6,
        }}
      >
        Quit Game
      </button>

      {balloons.map((b) => (
        <Balloon
          key={b.id}
          id={b.id}
          color={b.color}
          startLeft={b.left}
          startTop={b.top}
          speed={moveSpeed}
          direction="up"
          onPop={handlePop}
          targetColor={targetColor}
          images={images}
        />
      ))}
    </div>
  );
}
