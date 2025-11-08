import "./StartComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faLightbulb,
  faKeyboard,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

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

      <div className="guide-container">
        <h3>Pronto para o desafio? siga estes passos</h3>
        <div className="cards-tips">
          <div>
            <FontAwesomeIcon icon={faPlay} />
            <p>Aperte o botão de jogar</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faLightbulb} />
            <p>Leia a dica da palavra escolhida</p>
          </div>

          <div>
            <FontAwesomeIcon icon={faKeyboard} />
            <p>Digite uma letra </p>
          </div>
          <div>
            <FontAwesomeIcon icon={faTrophy} />
            <p>Acumule pontos e divirta-se!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartComponent;
