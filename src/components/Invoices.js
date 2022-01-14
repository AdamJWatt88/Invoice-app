import React, { useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";

import ErrorDisplay from "./ErrorDisplay";
import InvoiceStatusBar from "./InvoiceStatusBar";
import Modal from "./Modal";
import StatusBadge from "./StatusBadge";
import Loading from "./Loading";

import ArrowRight from "../assets/icon-arrow-right.svg";

import ErrorContext from "../context/error/ErrorContext";
import InvoicesContext from "../context/invoice/InvoicesContext";
import ModalContext from "../context/modal/ModalContext";

const Invoices = () => {
  const errorContext = useContext(ErrorContext);
  const invoicesContext = useContext(InvoicesContext);
  const modalContext = useContext(ModalContext);

  const {
    errorEmptyNewInvoice,
    errorEmptyClear,
    displayError,
    heading,
    message,
  } = errorContext;
  const { filtered, getInvoices, invoices, loading } = invoicesContext;
  const { openModal } = modalContext;

  useEffect(() => {
    // getInvoices();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (invoices.length) {
      errorEmptyClear();
    } else {
      errorEmptyNewInvoice();
    }
    // eslint-disable-next-line
  }, [invoices]);

  if (loading) return <Loading />;

  const filterInvoices = () => {
    return filtered.map((invoice) => {
      const { id, createdAt, clientName, total, status } = invoice;
      return (
        <Link to={`/invoice/${id}`} key={id}>
          <div className='invoices__invoice' id={id}>
            <span className='invoices__invoice-id'>#{id}</span>
            <span className='invoices__invoice-date'>{createdAt}</span>
            <span className='invoices__invoice-name'>{clientName}</span>
            <span className='invoices__invoice-total'>${total}</span>
            <StatusBadge status={status} />
            <img
              className='invoices__invoice-arrow'
              src={ArrowRight}
              alt='arrow-right'
            />
          </div>
        </Link>
      );
    });
  };

  const renderInvoices = () => {
    return (
      <div className='invoices'>
        {filtered.length !== 0
          ? filterInvoices()
          : invoices.map((invoice) => {
              const { id, createdAt, clientName, total, status } = invoice;
              return (
                <Link to={`/invoice/${id}`} key={id}>
                  <div className='invoices__invoice' id={id}>
                    <span className='invoices__invoice-id'>#{id}</span>
                    <span className='invoices__invoice-date'>{createdAt}</span>
                    <span className='invoices__invoice-name'>{clientName}</span>
                    <span className='invoices__invoice-total'>${total}</span>
                    <StatusBadge status={status} />
                    <img
                      className='invoices__invoice-arrow'
                      src={ArrowRight}
                      alt='arrow-right'
                    />
                  </div>
                </Link>
              );
            })}
      </div>
    );
  };

  return (
    <Fragment>
      {openModal ? <Modal /> : ""}
      <div className='invoices-container'>
        <InvoiceStatusBar />
        {displayError ? (
          <ErrorDisplay heading={heading} message={message} />
        ) : (
          renderInvoices()
        )}
      </div>
    </Fragment>
  );
};

export default Invoices;
