import { useEffect, useState, useRef } from "react";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

const GameBoard = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const boardRef = useRef(null);

  const moveSnake = () => {
    setSnake((prev) => {
      const newHead = {
        x: (prev[0].x + direction.x + BOARD_SIZE) % BOARD_SIZE,
        y: (prev[0].y + direction.y + BOARD_SIZE) % BOARD_SIZE,
      };
      const newSnake = [newHead, ...prev.slice(0, -1)];
      return newSnake;
    });
  };

  const handleKey = (e) => {
    const dirMap = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      w: { x: 0, y: -1 },
      s: { x: 0, y: 1 },
      a: { x: -1, y: 0 },
      d: { x: 1, y: 0 },
    };
    if (dirMap[e.key]) setDirection(dirMap[e.key]);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      ref={boardRef}
      className="grid grid-cols-20 grid-rows-20 w-[80vmin] h-[80vmin] bg-neutral-900 border-4 border-neutral-700 "
    >
      {[...Array(BOARD_SIZE * BOARD_SIZE)].map((_, i) => {
        const x = i % BOARD_SIZE;
        const y = Math.floor(i / BOARD_SIZE); 
        const isSnake = snake.some((s) => s.x === x && s.y === y);
        return (
          <div
            key={i}
            className={`w-full h-full ${
              isSnake ? "bg-white" : "bg-neutral-900"
            }`}
          />
        );
      })}
    </div>
  );
};

export default GameBoard;
