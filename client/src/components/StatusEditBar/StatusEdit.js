import React, { useContext } from "react";

import StatusBadge from "./StatusBadge";
import StyledButton from "../Buttons/StyledButton";

import InvoicesContext from "../../context/invoice/InvoicesContext";
import ModalContext from "../../context/modal/ModalContext";

const StatusEdit = () => {
  const invoicesContext = useContext(InvoicesContext);
  const modalContext = useContext(ModalContext);

  const { errorMsg, invoice, setEdit, editInvoice } = invoicesContext;
  const { slideOpen, openDeletePrompt } = modalContext;

  const changeInvoiceStatus = (status) => {
    editInvoice({ ...invoice, status: status });
  };

  const handleEdit = () => {
    setEdit();
    slideOpen();
  };

  const renderStatusBtn = () => {
    if (invoice.status === "paid") {
      return (
        <StyledButton
          displayName='Mark Pending'
          classModifier='purple'
          onClick={() => changeInvoiceStatus("pending")}
        />
      );
    } else {
      return (
        <StyledButton
          displayName='Mark as paid'
          classModifier='purple'
          onClick={() => changeInvoiceStatus("paid")}
        />
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
          <StyledButton
            displayName='Edit'
            classModifier='white'
            onClick={handleEdit}
          />
          <StyledButton
            displayName='Delete'
            classModifier='red'
            onClick={openDeletePrompt}
          />
          {renderStatusBtn()}
        </div>
      </div>
    );
  }
};

export default StatusEdit;
