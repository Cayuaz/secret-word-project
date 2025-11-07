type GameComponentProps = {
  handleClick: () => void;
};

const GameComponent = ({ handleClick }: GameComponentProps) => {
  return (
    <div>
      <button onClick={handleClick}>Verificar letra</button>
    </div>
  );
};

export default GameComponent;
