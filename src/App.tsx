//CSS
import "./App.css";

//Components
import StartComponent from "./components/StartComponent";
import GameComponent from "./components/GameComponent";
import GameOverComponent from "./components/GameOverComponent";

//React
import { useState, useCallback, useEffect } from "react";

//Data e Types
import { wordsList, stages } from "./components/Data";
import type { wordsListKeys } from "./components/Data";

const [start, game, end] = stages;

function App() {
  //useState que vai conter o estágio atual do game (start, game, end)
  const [gameStage, setGameStage] = useState(start.name);
  const [words] = useState(wordsList);
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");
  // const arrLetters: string[] = []
  const [letters, setLetters] = useState<string[]>([]);

  console.log(category, word, letters);

  const pickCategoryAndWord = () => {
    //Array de chaves de wordsList do tipo wordsListKeys
    const categoriesKeys = Object.keys(words) as wordsListKeys[];
    //Categoria aleatória gerada a partir de um índice calculado pelo Math.random * o tamanho de categoriesKeys
    const randomCategory =
      categoriesKeys[Math.floor(Math.random() * categoriesKeys.length)];
    //Array de palavras da categoria escolhida
    const category = words[randomCategory];
    //Palavra aleatória gerada a partir de um índice calculado pelo Math.random * o tamanho de category
    const randomWord = category[Math.floor(Math.random() * category.length)];

    return { randomCategory, randomWord };
  };

  //Callbacks
  //Função que vai mudar para o componente game
  const handleStart = () => {
    const { randomCategory, randomWord } = pickCategoryAndWord();
    console.log("Categoria: " + randomCategory);
    //Categoria
    setCategory(randomCategory);
    console.log("Palavra: " + randomWord);
    //Palavra
    setWord(randomWord);

    const wordLetters = randomWord.toLowerCase().split("");
    setLetters(wordLetters);
    console.log(wordLetters);
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
