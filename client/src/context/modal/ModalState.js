import React, { useReducer } from "react";
import ModalContext from "./ModalContext";
import ModalReducer from "./ModalReducer";

import {
  SLIDE_OPEN,
  SLIDE_CLOSE,
  OPEN_DELETE_PROMPT,
  CLOSE_DELETE_PROMPT,
} from "../../types";

const ModalState = (props) => {
  const intialState = {
    openModal: false,
    openSlide: false,
    showDelete: false,
  };

  const [state, dispatch] = useReducer(ModalReducer, intialState);

  const slideOpen = () => {
    dispatch({
      type: SLIDE_OPEN,
      payload: true,
    });
  };

  const slideClose = () => {
    dispatch({
      type: SLIDE_CLOSE,
      payload: false,
    });
  };

  const openDeletePrompt = () => {
    dispatch({
      type: OPEN_DELETE_PROMPT,
      payload: true,
    });
  };

  const closeDeletePrompt = () => {
    dispatch({
      type: CLOSE_DELETE_PROMPT,
      payload: false,
    });
  };

  return (
    <ModalContext.Provider
      value={{
        openModal: state.openModal,
        openSlide: state.openSlide,
        showDelete: state.showDelete,
        slideOpen,
        slideClose,
        openDeletePrompt,
        closeDeletePrompt,
      }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
