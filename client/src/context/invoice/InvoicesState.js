import React, { useReducer } from "react";
import history from "../../history";

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

require("dotenv").config();

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

      console.log(res, "res inside action creator");

      dispatch({
        type: EDIT_INVOICE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_ERROR,
        payload: error.message,
      });
    }
  };

  const deleteInvoice = async (id) => {
    setLoading();

    try {
      const res = await axios.delete(`/api/invoices/${id}`);

      dispatch({
        type: DELETE_INVOICE,
        payload: res.data,
      });

      history.push("/");
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
