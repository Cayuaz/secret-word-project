import "./GameComponent.css";

type GameComponentProps = {
  handleClick: () => void;
};

const GameComponent = ({ handleClick }: GameComponentProps) => {
  return (
    <div className="game-container">
      <h1>Advinhe a palavra</h1>
      <div className="tip-container">
        <p>
          Dica: <span>teste</span>
        </p>
        <p>Pontuação: 0</p>
      </div>
      {/*Container com as letras da palavra escolhida */}
      <div className="letters-container">
        <span>M</span>
        <span>a</span>
        <span>ç</span>
        <span>ç</span>
      </div>
      {/*Formulário com o input para o usuário digitar a letra */}
      <form className="form">
        <label htmlFor="letter-input">
          <span>Digite uma letra</span>{" "}
          <input type="text" id="letter-input" maxLength={1} placeholder="a" />
        </label>

        <div>
          {" "}
          <button onClick={handleClick}>Verificar letra</button>
        </div>
      </form>
      {/*Container com as letras já digitadas */}
      <div className="used-letters-container">
        <p>Letras já utilizadas: </p>
        <span>a</span>
        <span>b</span>
      </div>
    </div>
  );
};

export default GameComponent;
