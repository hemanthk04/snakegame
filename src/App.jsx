import GameBoard from "./GameBoard";
import { GithubLogo } from "@phosphor-icons/react";

function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-8">
      <navbar className="w-full flex items-center justify-between px-12 py-4 bg-black">
        <a
          href="https://github.com/hemanthk04/snakegame"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300"
        >
          <GithubLogo size={32} weight="fill" />
        </a>
        {/* Heading Text */}
        <h1 className="font-jersey text-white text-4xl sm:text-5xl">
          Snake Game
        </h1>
        <div className="w-[28px]">hello</div>
      </navbar>

      {/* Game Board */}
      <GameBoard />
    </div>
  );
}

export default App;
