import React, { useReducer } from "react";

import ErrorContext from "./ErrorContext";
import ErrorReducer from "./ErrorReducer";

import { EMPTY_CLEAR, EMPTY_FILTERED, EMPTY_NEW } from "../../types";

const ErrorState = (props) => {
  const initialState = {
    displayError: false,
    heading: null,
    message: null,
  };

  const [state, dispatch] = useReducer(ErrorReducer, initialState);

  const errorEmptyNewInvoice = () => {
    const errorObj = {
      heading: "There is nothing here",
      message:
        "Create an invoice by clicking the New Invoice button and get started",
    };

    dispatch({
      type: EMPTY_NEW,
      payload: errorObj,
    });
  };

  const errorEmptyFiltered = () => {
    const errorObj = {
      heading: "There is nothing here",
      message: "No invoices matching that status exist",
    };

    dispatch({
      type: EMPTY_FILTERED,
      payload: errorObj,
    });
  };

  const errorEmptyClear = () => {
    dispatch({
      type: EMPTY_CLEAR,
    });
  };

  return (
    <ErrorContext.Provider
      value={{
        displayError: state.displayError,
        heading: state.heading,
        message: state.message,
        errorEmptyNewInvoice,
        errorEmptyFiltered,
        errorEmptyClear,
      }}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorState;
