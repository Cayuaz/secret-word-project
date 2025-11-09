import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import "./GameComponent.css";

type GameComponentProps = {
  handleClickCheck: (letter: string) => void;
  handleClickExit: () => void;
  removeAccents: (text: string) => string;
  word: string;
  tip: string;
  letters: string[];
  guesses: number;
  points: number;
  guessedLetters: string[];
  wrongLetters: string[];
};

const lettersRegex = /^[a-z]$/i;

const GameComponent = ({
  handleClickCheck,
  handleClickExit,
  removeAccents,
  word,
  tip,
  letters,
  guesses,
  points,
  guessedLetters,
  wrongLetters,
}: GameComponentProps) => {
  //useState com o valor do input de letras
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  //Função de callback do evento de submit do formulário com o input das letras digitas pelo usuário
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //se o inputValue for válido
    if (lettersRegex.test(inputValue)) {
      handleClickCheck(inputValue.toLowerCase());
      setInputValue("");
    }

    inputRef.current?.focus();
  };

  console.log(letters);

  return (
    <div className="game-container">
      <h1>Advinhe a palavra</h1>
      <div className="info-container">
        {/*Container com as letras já digitadas */}
        <div className="used-letters-container">
          <p>Letras já utilizadas: </p>
          {wrongLetters.map((letter, i) => (
            <span key={i}>{letter}, </span>
          ))}
        </div>
        <p className="guesses">Tentativas: {guesses}</p>
      </div>

      <div className="tip-container">
        <p>
          Dica:{" "}
          <span>
            palavra com {word.length} letras e relacionada a {tip}
          </span>
        </p>
        <p>Pontuação: {points}</p>
      </div>
      {/*Container com as letras da palavra escolhida */}
      <div className="letters-container">
        {letters.map((letter, i) => {
          return guessedLetters.includes(removeAccents(letter)) ? (
            <span key={i}>{letter}</span>
          ) : (
            <span key={i}></span>
          );
        })}
      </div>
      {/*Formulário com o input para o usuário digitar a letra */}
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="letter-input">
          <span>Digite uma letra</span>{" "}
          <input
            type="text"
            id="letter-input"
            maxLength={1}
            placeholder="a"
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            ref={inputRef}
          />
        </label>

        <div className="game-buttons-container">
          {" "}
          <button type="submit">Verificar letra</button>
          <button onClick={handleClickExit}>Sair do jogo</button>
        </div>
      </form>
    </div>
  );
};

export default GameComponent;
