import { EMPTY_CLEAR, EMPTY_FILTERED, EMPTY_NEW } from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case EMPTY_NEW:
      return {
        ...state,
        displayError: true,
        heading: action.payload.heading,
        message: action.payload.message,
      };

    case EMPTY_FILTERED:
      return {
        ...state,
        displayError: true,
        heading: action.payload.heading,
        message: action.payload.message,
      };

    case EMPTY_CLEAR:
      return {
        ...state,
        displayError: false,
        heading: null,
        message: null,
      };

    default:
      return state;
  }
};
