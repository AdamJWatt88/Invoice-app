import {
  CLEAR_FILTER,
  FILTER_STATUS,
  FETCH_INVOICES,
  FETCH_INVOICE,
  SET_LOADING,
  SET_NEW,
  SET_EDIT,
  CLEAR_INVOICE,
  NEW_INVOICE,
  EDIT_INVOICE,
  DELETE_INVOICE,
  INVOICE_ERROR,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case FETCH_INVOICES:
      return {
        ...state,
        invoices: action.payload,
        invoice: {},
        errorMsg: null,
        loading: false,
      };

    case FETCH_INVOICE:
      return {
        ...state,
        invoice: action.payload,
        errorMsg: null,
        loading: false,
      };

    case NEW_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
        errorMsg: null,
        loading: false,
      };

    case EDIT_INVOICE:
      return {
        ...state,
        invoices: action.payload.invoices,
        invoice: action.payload.invoice,
        loading: false,
      };

    case DELETE_INVOICE:
      return {
        ...state,
        invoices: action.payload,
        invoice: {},
        filtered: [],
        loading: false,
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: [],
      };

    case FILTER_STATUS:
      return {
        ...state,
        filtered: action.payload,
        loading: false,
      };

    case SET_NEW:
      return {
        ...state,
        createInvoice: action.payload,
      };

    case SET_EDIT:
      return {
        ...state,
        edit: action.payload,
      };

    case CLEAR_INVOICE:
      return {
        ...state,
        createInvoice: action.payload,
        edit: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case INVOICE_ERROR:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      };

    default:
      return state;
  }
};
