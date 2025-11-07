type GameOverComponentProps = {
  handleClick: () => void;
};

const GameOverComponent = ({ handleClick }: GameOverComponentProps) => {
  return (
    <div>
      <button onClick={handleClick}>Reiniciar o jogo</button>
    </div>
  );
};

export default GameOverComponent;
