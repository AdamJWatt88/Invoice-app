import {
  SLIDE_OPEN,
  SLIDE_CLOSE,
  OPEN_DELETE_PROMPT,
  CLOSE_DELETE_PROMPT,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SLIDE_OPEN:
      return {
        ...state,
        openModal: action.payload,
        openSlide: action.payload,
      };

    case SLIDE_CLOSE:
      return {
        ...state,
        openModal: action.payload,
        openSlide: action.payload,
      };

    case OPEN_DELETE_PROMPT:
      return {
        ...state,
        openModal: action.payload,
        showDelete: action.payload,
      };

    case CLOSE_DELETE_PROMPT:
      return {
        ...state,
        openModal: action.payload,
        showDelete: action.payload,
      };

    default:
      return state;
  }
};
