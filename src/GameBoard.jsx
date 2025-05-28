import { useEffect, useState, useRef } from "react";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * BOARD_SIZE),
  y: Math.floor(Math.random() * BOARD_SIZE),
});

const GameBoard = ({ resetFlag }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(getRandomPosition());
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const boardRef = useRef(null);

  // ✅ Reset effect when resetFlag changes
  useEffect(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomPosition());
    setScore(0);
    setIsGameOver(false);
  }, [resetFlag]);

  const moveSnake = () => {
    setSnake((prev) => {
      const newHead = {
        x: (prev[0].x + direction.x + BOARD_SIZE) % BOARD_SIZE,
        y: (prev[0].y + direction.y + BOARD_SIZE) % BOARD_SIZE,
      };

      const hasEatenFood = newHead.x === food.x && newHead.y === food.y;

      const newSnake = hasEatenFood
        ? [newHead, ...prev]
        : [newHead, ...prev.slice(0, -1)];

      const isColliding = newSnake
        .slice(1)
        .some((segment) => segment.x === newHead.x && segment.y === newHead.y);

      if (isColliding) {
        setIsGameOver(true);
        return prev;
      }

      if (hasEatenFood) {
        setFood(getRandomPosition());
        setScore((prev) => prev + 1);
      }

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
    if (isGameOver) return;
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [direction, isGameOver]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-white font-jersey text-xl">Score: {score}</div>

      <div className="relative">
        {/* Game Board */}
        <div
          ref={boardRef}
          className="grid grid-cols-20 grid-rows-20 w-[75vmin] h-[75vmin] bg-neutral-900 border-4 border-neutral-700"
        >
          {[...Array(BOARD_SIZE * BOARD_SIZE)].map((_, i) => {
            const x = i % BOARD_SIZE;
            const y = Math.floor(i / BOARD_SIZE);

            const isSnake = snake.some((s) => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={i}
                className={`w-full h-full ${
                  isSnake
                    ? "bg-white rounded-full"
                    : isFood
                    ? "bg-red-600 rounded-full"
                    : "bg-neutral-900"
                }`}
              />
            );
          })}
        </div>

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="bg-red-600 text-white text-3xl px-6 py-4 font-jersey">
              Game Over
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
  
};

export default GameBoard;
