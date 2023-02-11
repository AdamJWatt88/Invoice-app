import React from "react";

import ImageEmpty from "../../assets/illustration-empty.svg";

const ErrorDisplay = ({ heading, message }) => {
  return (
    <div className='empty-invoices'>
      <img
        className='empty-invoices__image'
        src={ImageEmpty}
        alt='invoice-empty'
      />
      <h2 className='empty-invoices__heading'>{heading}</h2>
      <p className='empty-invoices__body'>{message}</p>
    </div>
  );
};

export default ErrorDisplay;
