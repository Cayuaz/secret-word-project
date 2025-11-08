type GameComponentProps = {
  handleClick: () => void;
};

const GameComponent = ({ handleClick }: GameComponentProps) => {
  return (
    <div className="game-container">
      <h1>Advinhe a palavra</h1>
      <div className="tip-container">
        <p>Dica:</p>
        <p>Pontuação: 0</p>
      </div>
      {/*Container com as letras da palavra escolhida */}
      <div className="letters-container">
        <span>A</span>
      </div>
      {/*Formulário com o input para o usuário digitar a letra */}
      <form action="">
        <label htmlFor="letter-input">Digite uma letra</label>
        <input type="text" id="letter-input" />
        <button onClick={handleClick}>Verificar letra</button>
      </form>
      {/*Container com as letras já digitadas */}
      <div>
        <p>Letras já utilizadas: </p>
        <span>a</span>
      </div>
    </div>
  );
};

export default GameComponent;
