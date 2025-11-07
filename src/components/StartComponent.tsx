import "./StartComponent.css";

type StartComponentProps = {
  handleClick: () => void;
};

const StartComponent = ({ handleClick }: StartComponentProps) => {
  return (
    <div className="start-container">
      <h1>Secret Word</h1>
      <div className="btn-container">
        <p>Clique no botão para começar a jogar</p>
        <button onClick={handleClick}>Jogar</button>
      </div>
    </div>
  );
};

export default StartComponent;
