import "./GameOverComponent.css";

type GameOverComponentProps = {
  handleClick: () => void;
  score: number;
  guessedWords: string[];
  guesses: number;
};

const GameOverComponent = ({
  handleClick,
  score,
  guessedWords,
  guesses,
}: GameOverComponentProps) => {
  return (
    <div className="game-over-container">
      <h1>Fim de jogo</h1>
      <div>
        <h2>Resultados das partidas</h2>
        <div className="points-container ">
          <p>Pontuação final: {score}</p>{" "}
          <p
            className={guessedWords.length > 10 ? "guessedWordsAlignment" : ""}
          >
            Palavras acertadas:{" "}
            {guessedWords.length > 1 ? (
              guessedWords.map((word) => <span>{word + " - "} </span>)
            ) : (
              <span>nenhuma</span>
            )}
          </p>
        </div>
      </div>
      {guesses <= 0 && (
        <div className="loss-container">
          <p>
            <span>DERROTA!</span> Tentativas esgotadas.
          </p>
          <h3>
            Clique no botão abaixo para ir à tela inicial e começar uma nova
            partida!
          </h3>
        </div>
      )}
      <div>
        {" "}
        <button onClick={handleClick}>Voltar a tela inicial</button>
      </div>
    </div>
  );
};

export default GameOverComponent;
