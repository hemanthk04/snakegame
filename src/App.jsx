import GameBoard from "./GameBoard";

function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-8">
      {/* Heading */}
      <h1 className="font-jersey text-white text-4xl sm:text-5xl">
        Snake Game
      </h1>

      {/* Game Board */}
      <GameBoard />
    </div>
  );
}

export default App;
