//CSS
import "./App.css";

//Components
import StartComponent from "./components/StartComponent";
import GameComponent from "./components/GameComponent";
import GameOverComponent from "./components/GameOverComponent";

//React
import { useState } from "react";

//Data e Types
import { wordsList, stages } from "./components/Data";
import type { wordsListKeys } from "./components/Data";

const [start, game, end] = stages;

//Função que remove os acentos da palavra escolhida
const removeAccents = (text: string) => {
  const normalizeText = text.normalize("NFD");
  const newText = normalizeText.replace(/[\u0300-\u036f]/g, "");
  return newText;
};

function App() {
  //useState que vai conter o estágio atual do game (start, game, end)
  const [gameStage, setGameStage] = useState(start.name);
  //useState da lista de categorias e palavras
  const [words] = useState(wordsList);
  //useState dacategoria da palavra escolhida
  const [category, setCategory] = useState("");
  //useState da palavra escolhida
  const [word, setWord] = useState("");
  // const arrLetters: string[] = []
  //useState das letras da palavra escolhida
  const [letters, setLetters] = useState<string[]>([]);
  // //useState com as letras da palavra escolhida com acentos
  // const [normalLetters, setNormalLetters] = useState<string[]>([]);
  //useState das tentativas do usuário
  const [guesses, setGuesses] = useState(5);
  //useState das letras acertadas pelo usuário
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  //useState das letras erradas
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  //useState da pontuação do usuário
  const [score, setScore] = useState(0);

  console.log("Palavra escolhida: " + word);

  //Função que pega a categoria e a palavra aleatória
  const getCategoryAndWord = () => {
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
  //Função que vai mudar para o componente game e definir os valores dos useStates de categoria, word e letras
  const handleStart = () => {
    const { randomCategory, randomWord } = getCategoryAndWord();
    console.log("Categoria: " + randomCategory);

    //Categoria
    setCategory(randomCategory);

    //Palavra
    console.log("Palavra: " + randomWord);

    setWord(randomWord);

    //Remoção de espaços na palavra
    const cleanRandomWord = randomWord.replace(/\s/g, "");

    //Array de letras
    const wordLetters = cleanRandomWord.toLowerCase().split("");
    console.log(wordLetters);

    setLetters(wordLetters);
    setGuessedLetters([]);
    setWrongLetters([]);
    if (gameStage === "start") {
      setScore(0);
      setGuesses(5);
    }
    setGameStage(game.name);
  };

  const exitGame = () => {
    setGameStage(end.name);
  };

  //Função que vai verificar a letra digitada pelo usuário e mudar para o componente game over
  //Recebe a letra do input de GameComponent
  const checkLetter = (letter: string) => {
    //Como letters armazena o array de letras da palavra escolhida com acentos, é preciso remove-lós com a função removeAccents para fazer a verificação correta ignorando acentos e sem modificar o array original
    const wordWhithoutAccents = removeAccents(letters.join(""));
    const lettersWhithoutAccents = wordWhithoutAccents.split("");

    //Verifica se a letra digitada pelo usuário está dentro do array de lettersWhithoutAccents
    const isLetterValid = lettersWhithoutAccents.includes(letter);

    const isGuessed = guessedLetters.includes(letter);
    const isWrong = wrongLetters.includes(letter);

    //se a letra for válida e ela já não estiver no array de letras acertadas
    if (isLetterValid && !isGuessed) {
      const newGuessedLetters = [...guessedLetters, letter];

      //Se a letra estiver, ela é adicionada ao array de letras de acertadas
      setGuessedLetters((prev) => [...prev, letter]);

      if (
        lettersWhithoutAccents.every((letter) =>
          newGuessedLetters.includes(letter)
        )
      ) {
        handleStart();
        setScore((prev) => prev + 100);
        console.log("Wins");
      }
    }

    //se a letra não for válida e ela já não estiver no array de letras erradas
    if (!isLetterValid && !isWrong) {
      const newGuesses = guesses - 1;

      //Se a letra não estiver, ela é adicionada ao array de letradas erradas e o usuário perde uma chance
      setWrongLetters((prev) => [...prev, letter]);
      setGuesses((prev) => prev - 1);

      //Se chances forem igual a zero o jogo acaba
      if (newGuesses < 1) {
        setGameStage(end.name);
        return;
      }
    }

    console.log("letras acertadas: ");
    console.log(guessedLetters);

    console.log("Letra digitada pelo usuário: " + letter);
  };

  //Função que vai mudar para o componente start
  const handleRestart = () => {
    setGameStage(start.name);
  };

  return (
    //Renderização condicional com base no gameStage
    <div className="app-container">
      {gameStage === "start" && <StartComponent handleClick={handleStart} />}
      {gameStage === "game" && (
        <GameComponent
          handleClickCheck={checkLetter}
          handleClickExit={exitGame}
          removeAccents={removeAccents}
          word={word}
          tip={category}
          letters={letters}
          guesses={guesses}
          points={score}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
        />
      )}
      {gameStage === "end" && <GameOverComponent handleClick={handleRestart} />}
    </div>
  );
}

export default App;
