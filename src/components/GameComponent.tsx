import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import "./GameComponent.css";

type GameComponentProps = {
  handleClick: (letter: string) => void;
  word: string;
  tip: string;
  letters: string[];
  guesses: number;
  points: number;
  guessedLetters: string[];
  wrongLetters: string[];
};

const GameComponent = ({
  handleClick,
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      handleClick(inputValue);
    }
    inputRef.current?.focus();
  };

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
          return guessedLetters.includes(letter) ? (
            <span key={i}>{letter}</span>
          ) : (
            <span key={i}>{}</span>
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            ref={inputRef}
          />
        </label>

        <div>
          {" "}
          <button type="submit">Verificar letra</button>
        </div>
      </form>
    </div>
  );
};

export default GameComponent;
