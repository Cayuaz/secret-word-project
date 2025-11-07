//CSS
import "./App.css";

//Components
import StartComponent from "./components/StartComponent";
import GameComponent from "./components/GameComponent";
import GameOverComponent from "./components/GameOverComponent";

//React
import { useState, useCallback, useEffect } from "react";

//Data
import { wordsList, stages } from "./components/Data";

const [start, game, end] = stages;

function App() {
  //useState que vai conter o estágio atual do game (start, game, end)
  const [gameStage, setGameStage] = useState(start.name);
  const [words] = useState(wordsList);

  //Callbacks
  //Função que vai mudar para o componente game
  const handleStart = () => {
    setGameStage(game.name);
  };

  //Função que vai verificar a letra digitada pelo usuário e mudar para o componente game over
  const checkLetter = () => {
    setGameStage(end.name);
  };

  //Função que vai mudar para o componente start
  const handleRestart = () => {
    setGameStage(start.name);
  };

  return (
    //Renderização condicional com base no gameStage
    <div className="app-container">
      {gameStage === "start" && <StartComponent handleClick={handleStart} />}
      {gameStage === "game" && <GameComponent handleClick={checkLetter} />}
      {gameStage === "end" && <GameOverComponent handleClick={handleRestart} />}
    </div>
  );
}

export default App;
