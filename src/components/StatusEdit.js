import React, { useContext } from "react";

import StatusBadge from "./StatusBadge";

import InvoicesContext from "../context/invoice/InvoicesContext";
import ModalContext from "../context/modal/ModalContext";

const StatusEdit = () => {
  const invoicesContext = useContext(InvoicesContext);
  const modalContext = useContext(ModalContext);

  const { errorMsg, invoice, setEdit, editInvoice } = invoicesContext;
  const { slideOpen, openDeletePrompt } = modalContext;

  const onClick = (status) => {
    editInvoice(invoice.id, invoice, status);
  };

  const renderStatusBtn = () => {
    if (invoice.status === "paid") {
      return (
        <button onClick={() => onClick("pending")} className='btn btn--purple'>
          Mark pending
        </button>
      );
    } else {
      return (
        <button onClick={() => onClick("paid")} className='btn btn--purple'>
          Mark as paid
        </button>
      );
    }
  };

  if (errorMsg) {
    return <div></div>;
  } else {
    return (
      <div className='status-edit-bar'>
        <div className='status-edit-bar__status'>
          <h3>Status</h3>
          <StatusBadge status={invoice.status} />
        </div>

        <div className='status-edit-bar__btn-group'>
          <button
            onClick={() => {
              setEdit();
              slideOpen();
            }}
            className='btn btn--white'>
            Edit
          </button>
          <button onClick={openDeletePrompt} className='btn btn--red'>
            Delete
          </button>
          {renderStatusBtn()}
        </div>
      </div>
    );
  }
};

export default StatusEdit;
