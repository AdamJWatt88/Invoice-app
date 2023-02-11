import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import InvoiceContext from "../context/invoice/InvoicesContext";
import ModalContext from "../context/modal/ModalContext";

import StyledButton from "./Buttons/StyledButton";

const DeletePrompt = () => {
  const invoiceContext = useContext(InvoiceContext);
  const modalContext = useContext(ModalContext);

  const { invoice, deleteInvoice } = invoiceContext;
  const { closeDeletePrompt } = modalContext;

  const { id } = invoice;

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteInvoice(id);
    closeDeletePrompt();
    navigate("/");
  };

  return (
    <div className='delete-prompt'>
      <h1 className='delete-prompt__heading'>Confirm Deletion</h1>
      <p className='delete-prompt__body'>
        {`Are you sure you want to delete invoice #${id}? This action cannot
        be undone.`}
      </p>
      <div className='delete-prompt__button-group'>
        <StyledButton
          onClick={closeDeletePrompt}
          classModifier='white'
          classNames='delete-prompt__btn-cancel'
          displayName='Cancel'
        />

        <StyledButton
          onClick={handleDelete}
          classNames='delete-prompt__btn-delete'
          displayName='Delete'
        />
      </div>
    </div>
  );
};

export default DeletePrompt;
