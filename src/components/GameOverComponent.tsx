type GameOverComponentProps = {
  handleClick: () => void;
};

const GameOverComponent = ({ handleClick }: GameOverComponentProps) => {
  return (
    <div>
      <h1>Dados da partida</h1>
      <button onClick={handleClick}>Reiniciar o jogo</button>
    </div>
  );
};

export default GameOverComponent;
