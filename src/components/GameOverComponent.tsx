import "./GameOverComponent.css";

type GameOverComponentProps = {
  handleClick: () => void;
  score: number;
  guessedWords: string[];
  guesses: number;
  word: string;
};

const GameOverComponent = ({
  handleClick,
  score,
  guessedWords,
  guesses,
  word,
}: GameOverComponentProps) => {
  return (
    <div className="game-over-container">
      <h1>Fim de jogo</h1>
      <div>
        <h2>Resultados das partidas: </h2>
        <div className="points-container ">
          <p>Pontuação final: {score}</p>{" "}
          <p
            className={guessedWords.length > 10 ? "guessedWordsAlignment" : ""}
          >
            {/*Se o usuário acertar pelo menos uma palavra ela é exibida*/}
            {/*A última palavra acertada não tem a vírgula adicionada no final*/}
            Palavras acertadas:{" "}
            {guessedWords.length > 0 ? (
              guessedWords.map((word, i) => {
                return i === guessedWords.length - 1 ? (
                  <span key={i}>{word}</span>
                ) : (
                  <span key={i}> {word}, </span>
                );
              })
            ) : (
              <span>nenhuma</span>
            )}
          </p>
        </div>
      </div>
      {guesses <= 0 && (
        <div className="loss-container">
          <p>
            <span>DERROTA!</span> Tentativas esgotadas
          </p>
          <p>A palavra era: {word}</p>
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
