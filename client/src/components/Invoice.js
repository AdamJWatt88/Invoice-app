import React, { useEffect, useContext, Fragment } from "react";
import { Link, useParams } from "react-router-dom";

import ErrorDisplay from "./Errors/ErrorDisplay";
import InvoiceTotal from "./InvoiceTotal";
import Modal from "./Modal";
import StatusEdit from "./StatusEditBar/StatusEdit";
import Loading from "./Loading";

import ArrowLeft from "../assets/icon-arrow-left.svg";

import InvoicesContext from "../context/invoice/InvoicesContext";
import ModalContext from "../context/modal/ModalContext";

const Invoice = () => {
  const invoicesContext = useContext(InvoicesContext);
  const modalContext = useContext(ModalContext);

  const { errorMsg, getInvoice, invoice, loading } = invoicesContext;

  const { openModal } = modalContext;

  let { id } = useParams();

  useEffect(() => {
    getInvoice(id);

    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;

  const splitEmail = (emailAddress) => {
    if (emailAddress) {
      const split = emailAddress.split("@");
      return (
        <p>
          {split[0]}&#8203;{"@" + split[1]}
        </p>
      );
    }
  };

  const renderInvoice = () => {
    if (invoice?.clientAddress) {
      return (
        <div className='invoice-details'>
          <div className='invoice-details__description flex-col'>
            <p>
              <span>#</span>
              {invoice.id}
            </p>
            <h3 className='invoice-details__heading'>{invoice.description}</h3>
          </div>

          <div className='invoice-details__invoice-date flex-col'>
            <h3 className='invoice-details__heading'>Invoice Date</h3>
            <p>{invoice.createdAt}</p>
          </div>

          <div className='invoice-details__due-date flex-col'>
            <h3 className='invoice-details__heading'>Payment Due</h3>
            <p>{invoice.paymentDue}</p>
          </div>

          <div className='invoice-details__client flex-col'>
            <h3 className='invoice-details__heading'>Bill To</h3>
            <p className='invoice-details__client-name'>{invoice.clientName}</p>
            <p className='invoice-details__client-address'>
              {invoice.clientAddress.street}
            </p>
            <p className='invoice-details__client-address'>
              {invoice.clientAddress.city}
            </p>
            <p className='invoice-details__client-address'>
              {invoice.clientAddress.postCode}
            </p>
            <p className='invoice-details__client-address'>
              {invoice.clientAddress.country}
            </p>
          </div>

          <div className='invoice-details__email flex-col'>
            <h3 className='invoice-details__heading'>Sent to</h3>
            {splitEmail(invoice.clientEmail)}
          </div>

          <div className='invoice-details__sender flex-col'>
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </div>
      );
    }
  };

  const checkInvoice = () => {
    if (errorMsg) {
      return <ErrorDisplay heading='Oops!' message='Invoice not found' />;
    } else {
      return (
        <Fragment>
          <StatusEdit />
          <div className='invoice'>
            {renderInvoice()}
            <InvoiceTotal />
          </div>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      {openModal ? <Modal /> : ""}

      <div className='invoice-container'>
        <Link to='/' className='back-btn'>
          <img src={ArrowLeft} alt='Back' /> Go back
        </Link>

        {checkInvoice()}
      </div>
    </Fragment>
  );
};

export default Invoice;
