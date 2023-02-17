import React, { useContext } from "react";
import ReactDOM from "react-dom";

import FormSlide from "./FormSlide/FormSlide";
// import FormSlide from "./FormSlide/FormSlideCopy";
import DeletePrompt from "./DeletePrompt";

import ModalContext from "../context/modal/ModalContext";

const Modal = () => {
  const modalContext = useContext(ModalContext);

  const { openSlide, showDelete } = modalContext;

  const renderModal = () => {
    if (openSlide) {
      return (
        <div className='modal'>
          <FormSlide />
        </div>
      );
    } else if (showDelete) {
      return (
        <div className='modal modal--prompt'>
          <DeletePrompt />
        </div>
      );
    } else {
      return "";
    }
  };

  return ReactDOM.createPortal(renderModal(), document.getElementById("modal"));
};

export default Modal;
