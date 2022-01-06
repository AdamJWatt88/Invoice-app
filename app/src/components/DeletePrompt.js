import React, { useContext } from "react";

import InvoiceContext from "../context/invoice/InvoicesContext";
import ModalContext from "../context/modal/ModalContext";

const DeletePrompt = () => {
  const invoiceContext = useContext(InvoiceContext);
  const modalContext = useContext(ModalContext);

  const { invoice, deleteInvoice } = invoiceContext;
  const { closeDeletePrompt } = modalContext;

  const { id } = invoice;
  return (
    <div className='delete-prompt'>
      <h1 className='delete-prompt__heading'>Confirm Deletion</h1>
      <p className='delete-prompt__body'>
        {`Are you sure you want to delete invoice #${id}? This action cannot
        be undone.`}
      </p>
      <div className='delete-prompt__button-group'>
        <button
          onClick={closeDeletePrompt}
          className='delete-prompt__btn-cancel btn btn--white'>
          Cancel
        </button>
        <button
          onClick={() => {
            deleteInvoice(id);
            closeDeletePrompt();
          }}
          className='delete-prompt__btn-delete btn'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeletePrompt;
