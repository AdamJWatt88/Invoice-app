import React, { useReducer } from "react";
import axios from "axios";

import InvoicesContext from "./InvoicesContext";
import InvoicesReducer from "./invoicesReducer";

import {
  CLEAR_FILTER,
  FILTER_STATUS,
  FETCH_INVOICES,
  FETCH_INVOICE,
  SET_LOADING,
  SET_NEW,
  SET_EDIT,
  NEW_INVOICE,
  EDIT_INVOICE,
  DELETE_INVOICE,
  CLEAR_INVOICE,
  INVOICE_ERROR,
} from "../../types";

const InvoicesState = (props) => {
  const initialState = {
    errorMsg: null,
    createInvoice: false,
    edit: false,
    filtered: [],
    invoices: [],
    invoice: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(InvoicesReducer, initialState);

  const setLoading = () => dispatch({ type: SET_LOADING });

  const getInvoices = async () => {
    setLoading();

    try {
      const res = await axios.get("/api/invoices");
      dispatch({
        type: FETCH_INVOICES,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_ERROR,
        payload: error.message,
      });
    }
  };

  const getInvoice = async (invoiceId) => {
    setLoading();

    try {
      const res = await axios.get(`/api/invoices/${invoiceId}`);

      dispatch({
        type: FETCH_INVOICE,
        payload: res.data[0],
      });
    } catch (error) {
      dispatch({
        type: INVOICE_ERROR,
        payload: error.message,
      });
    }
  };

  const filterStatus = async (status) => {
    setLoading();

    const filteredInvoices = await state.invoices.filter(
      (invoice) => invoice.status === status
    );

    dispatch({
      type: FILTER_STATUS,
      payload: filteredInvoices,
    });
  };

  const newInvoice = async (invoiceForm) => {
    setLoading();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("api/invoices/", invoiceForm, config);

      dispatch({
        type: NEW_INVOICE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_ERROR,
        payload: error.message,
      });
    }
  };

  const editInvoice = async (invoice) => {
    setLoading();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/invoices/${invoice.id}`,
        invoice,
        config
      );

      const editArr = state.invoices.filter((item) => item.id !== res.data.id);

      const newArr = [...editArr, res.data];

      dispatch({
        type: EDIT_INVOICE,
        payload: {
          invoice: res.data,
          invoices: newArr,
        },
      });
    } catch (error) {
      dispatch({
        type: INVOICE_ERROR,
        payload: error.message,
      });
    }
  };

  const deleteInvoice = (id) => {
    setLoading();

    try {
      axios.delete(`/api/invoices/${id}`);

      const deleteArr = state.invoices.filter((item) => item.id !== id);

      dispatch({
        type: DELETE_INVOICE,
        payload: deleteArr,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_ERROR,
        payload: error.message,
      });
    }
  };

  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  const setNew = () => {
    dispatch({
      type: SET_NEW,
      payload: true,
    });
  };

  const setEdit = () => {
    dispatch({
      type: SET_EDIT,
      payload: true,
    });
  };

  const clearInvoice = () => {
    dispatch({
      type: CLEAR_INVOICE,
      payload: false,
    });
  };

  return (
    <InvoicesContext.Provider
      value={{
        errorMsg: state.errorMsg,
        createInvoice: state.createInvoice,
        edit: state.edit,
        filtered: state.filtered,
        invoices: state.invoices,
        invoice: state.invoice,
        loading: state.loading,
        clearFilter,
        filterStatus,
        getInvoices,
        getInvoice,
        setNew,
        setEdit,
        clearInvoice,
        newInvoice,
        editInvoice,
        deleteInvoice,
      }}>
      {props.children}
    </InvoicesContext.Provider>
  );
};

export default InvoicesState;
