//CSS
import "./App.css";

//Components
import StartComponent from "./components/StartComponent";
import GameComponent from "./components/GameComponent";
import GameOverComponent from "./components/GameOverComponent";

//React
import { useCallback, useEffect, useState } from "react";

//Data e Types
import { wordsList, stages } from "./components/Data";
import type { wordsListKeys } from "./components/Data";
import WarnComponent from "./components/WarnComponent";

const [start, game, end] = stages;

//Função que remove os acentos da palavra escolhida
const removeAccents = (text: string) => {
  const normalizeText = text.normalize("NFD");
  const newText = normalizeText.replace(/[\u0300-\u036f]/g, "");
  return newText;
};

//Função que pega a categoria e a palavra aleatória
const getCategoryAndWord = () => {
  //Array de chaves de wordsList do tipo wordsListKeys
  const categoriesKeys = Object.keys(wordsList) as wordsListKeys[];
  //Categoria aleatória gerada a partir de um índice calculado pelo Math.random * o tamanho de categoriesKeys
  const randomCategory =
    categoriesKeys[Math.floor(Math.random() * categoriesKeys.length)];
  //Array de palavras da categoria escolhida
  const category = wordsList[randomCategory];
  //Palavra aleatória gerada a partir de um índice calculado pelo Math.random * o tamanho de category
  const randomWord = category[Math.floor(Math.random() * category.length)];

  return { randomCategory, randomWord };
};

function App() {
  //useState que vai conter o estágio atual do game (start, game, end)
  const [gameStage, setGameStage] = useState(start.name);
  //useState dacategoria da palavra escolhida
  const [category, setCategory] = useState("");
  //useState da palavra escolhida
  const [word, setWord] = useState("");
  // const arrLetters: string[] = []
  //useState das letras da palavra escolhida
  const [letters, setLetters] = useState<string[]>([]);
  //useState com as letras da palavra escolhida sem acentos
  const [lettersWhithoutAccents, setLettersWhithoutAccents] = useState<
    string[]
  >([]);
  //useState das tentativas do usuário
  const [guesses, setGuesses] = useState(5);
  //useState das letras acertadas pelo usuário
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  //useState das letras erradas
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  //useState da pontuação do usuário
  const [score, setScore] = useState(0);
  //useState das palavras acertadas pelo usuário
  const [guessedWords, setGuessedWord] = useState<string[]>([]);
  //useState com o valor de ativação do warnComponent
  const [warn, setWarn] = useState(false);

  const hideWarn = () => {
    setWarn(false);
  };

  const displayWarn = () => {
    setWarn(true);
  };

  //Função que limpa o estados antes do jogo começar e após cada palavra acertada
  const cleanStates = useCallback(() => {
    setGuessedLetters([]);
    setWrongLetters([]);
    if (gameStage === "start") {
      setScore(0);
      setGuesses(5);
      setGuessedWord([]);
    }
  }, [
    setGuessedLetters,
    setWrongLetters,
    gameStage,
    setScore,
    setGuesses,
    setGuessedWord,
  ]);

  //Callbacks
  //Função que vai mudar para o componente game e definir os valores dos useStates de categoria, word e letras
  const handleStart = useCallback(() => {
    cleanStates();
    const { randomCategory, randomWord } = getCategoryAndWord();

    //Categoria escolhida
    console.log("Categoria: " + randomCategory);
    setCategory(randomCategory);

    //Palavra escolhida
    console.log("Palavra: " + randomWord);
    setWord(randomWord);

    //Remoção de espaços na palavra escolhida
    const cleanRandomWord = randomWord.replace(/\s/g, "");

    //Array de letras da palavra escolhida
    const wordLetters = cleanRandomWord.toLowerCase().split("");
    setLetters(wordLetters);

    //Como letters armazena o array de letras da palavra escolhida com acentos, é preciso remove-lós com a função removeAccents para fazer a verificação correta ignorando acentos e sem modificar o array original
    const wordWhithoutAccents = removeAccents(wordLetters.join(""));
    console.log("Array de palavras sem acentos: " + wordWhithoutAccents);
    setLettersWhithoutAccents(wordWhithoutAccents.split(""));

    setGameStage(game.name);
  }, [
    cleanStates,
    setCategory,
    setWord,
    setLetters,
    setLettersWhithoutAccents,
  ]);

  //Função de callback do botão de sair do jogo
  const exitGame = () => {
    setGameStage(end.name);
  };

  //Função que vai verificar a letra digitada pelo usuário e mudar para o componente game over
  //Recebe a letra do input de GameComponent
  const checkLetter = (letter: string) => {
    //Verifica se a letra digitada pelo usuário está dentro do array de lettersWhithoutAccents
    const isLetterValid = lettersWhithoutAccents.includes(letter);

    //Verifica se a letra já foi utilizada antes
    const isGuessed = guessedLetters.includes(letter);
    const isWrong = wrongLetters.includes(letter);

    if (isGuessed || isWrong) {
      return;
    }

    //se a letra for válida e ela já não estiver no array de letras acertadas
    if (isLetterValid) {
      //Se a letra estiver, ela é adicionada ao array de letras de acertadas
      setGuessedLetters((prev) => [...prev, letter]);
    }

    //se a letra não for válida e ela já não estiver no array de letras erradas
    if (!isLetterValid) {
      setWrongLetters((prev) => [...prev, letter]);
      setGuesses((prev) => prev - 1);
    }
  };

  //useEffect que cuida da condição de vitória do usuário
  useEffect(() => {
    //Impede que o useEffect comece antes que o jogo se inicie
    //Se lettersWhithoutAccents estiver vazio significa que handleStart não foi chamada e que o jogo não se iniciou
    if (lettersWhithoutAccents.length <= 0) {
      return;
    }

    //Array de letras sem caracteres repetidos
    const uniqueLetters = [...new Set(lettersWhithoutAccents)];

    console.log(uniqueLetters);

    if (uniqueLetters.every((letter) => guessedLetters.includes(letter))) {
      setScore((prev) => prev + 100);
      handleStart();
      setGuessedWord((prev) => [...prev, word]);
      console.log("Wins");
    }
  }, [
    lettersWhithoutAccents,
    guessedLetters,
    setScore,
    handleStart,
    setGuessedWord,
    word,
  ]);

  //useEffect que cuida da condição de derrota do usuário
  useEffect(() => {
    if (guesses < 1) {
      setGameStage(end.name);
    }
  }, [guesses, setGameStage]);

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
          displayWarn={displayWarn}
          hideWarn={hideWarn}
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
      {gameStage === "end" && (
        <GameOverComponent
          handleClick={handleRestart}
          score={score}
          guessedWords={guessedWords}
          guesses={guesses}
          word={word}
        />
      )}
      {warn && <WarnComponent handleClickWarn={hideWarn} />}
    </div>
  );
}

export default App;
