//React
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ForwardedRef,
  type KeyboardEvent,
} from "react";

//Types
import type { focusRef } from "./Data";

//CSS
import "./WarnComponent.css";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type WarnProps = {
  handleClickWarn: () => void;
  handleKeyUpWarn: (e: KeyboardEvent<HTMLButtonElement>) => void;
};

const WarnComponent = forwardRef(
  (
    { handleClickWarn, handleKeyUpWarn }: WarnProps,
    ref: ForwardedRef<focusRef>
  ) => {
    //Ref do botão de fechar
    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
      //Método que o componente app vai poder usar na ref dele
      focus: () => {
        buttonRef.current?.focus();
      },
    }));

    return (
      <div className="warn-container">
        <p>Digite letras de A a Z (sem acentos ou caracteres especiais)</p>{" "}
        <button
          onClick={handleClickWarn}
          onKeyUp={handleKeyUpWarn}
          ref={buttonRef}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    );
  }
);

export default WarnComponent;
