import { useState } from "react";
import GameBoard from "./GameBoard";
import { GithubLogo } from "@phosphor-icons/react";

function App() {
  const [resetFlag, setResetFlag] = useState(false);

  const handleRestart = () => {
    // Toggle the reset flag to trigger reset useEffect inside GameBoard
    setResetFlag((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-6">
      <nav className="w-full relative flex items-center justify-between px-12 py-4 bg-black">
        <a
          href="https://github.com/hemanthk04/snakegame"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:scale-115 transition-all duration-300"
        >
          <GithubLogo size={32} weight="fill" />
        </a>

        <h1 className="absolute left-1/2 -translate-x-1/2 font-jersey text-white text-4xl sm:text-5xl">
          Snake Game
        </h1>

        <button
          onClick={handleRestart}
          className="px-6 cursor-pointer py-2 bg-white text-black font-semibold rounded-full font-instrument hover:scale-105 transition"
        >
          Restart
        </button>
      </nav>

      <GameBoard resetFlag={resetFlag} />
    </div>
  );
}

export default App;
