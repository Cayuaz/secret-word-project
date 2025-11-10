import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type WarnProps = {
  handleClickWarn: () => void;
};

import "./WarnComponent.css";

const WarnComponent = ({ handleClickWarn }: WarnProps) => {
  return (
    <div className="warn-container">
      <p>
        Apenas letras sem acento são permitidas. Por favor, digite uma letra
        válida
      </p>{" "}
      <FontAwesomeIcon icon={faXmark} onClick={handleClickWarn} />
    </div>
  );
};

export default WarnComponent;
