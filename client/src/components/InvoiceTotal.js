import React, { useContext, useEffect, useState } from "react";

import InvoicesContext from "../context/invoice/InvoicesContext";

const InvoiceTotal = () => {
  const invoicesContext = useContext(InvoicesContext);

  const { invoice } = invoicesContext;

  const [isDesktop, setDesktop] = useState(window.innerWidth > 600);

  const updateWindow = () => {
    setDesktop(window.innerWidth > 600);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindow);
    return () => {
      window.removeEventListener("resize", updateWindow);
    };
    // eslint-disable-next-line
  }, []);

  const renderHeader = () => {
    return (
      <div className='invoice-total__headers'>
        <h4 className='invoice-total__headers-name'>Item Name</h4>
        <h4 className='invoice-total__headers-qty'>QTY.</h4>
        <h4 className='invoice-total__headers-price'>Price</h4>
        <h4 className='invoice-total__headers-total'>Total</h4>
      </div>
    );
  };

  const renderInvoice = () => {
    if (invoice.hasOwnProperty("items")) {
      return invoice.items.map((item, index) => {
        return (
          <div className='invoice-total__invoice' key={index}>
            <span className='invoice-total__invoice-name'>
              {item.description}
            </span>
            <span className='invoice-total__invoice-qty'>{item.quantity}</span>
            <span className='invoice-total__invoice-price'>$ {item.price}</span>
            <span className='invoice-total__invoice-total'>$ {item.total}</span>
          </div>
        );
      });
    }
  };

  const renderInvoiceSmall = () => {
    if (invoice.hasOwnProperty("items")) {
      return invoice.items.map((item, index) => {
        return (
          <div className='invoice-total__invoice' key={index}>
            <span className='invoice-total__invoice-name'>
              {item.description}
            </span>
            <span className='invoice-total__invoice-qty'>
              {item.quantity} x $ {item.price}
            </span>
            <span className='invoice-total__invoice-total'>$ {item.total}</span>
          </div>
        );
      });
    }
  };

  const renderAmount = () => {
    if (invoice.hasOwnProperty("items")) {
      return (
        <div className='amount-due'>
          <h2>Amount Due</h2> <span>$ {invoice.total}</span>
        </div>
      );
    }
  };

  return (
    <div className='invoice-total-container'>
      <div className='invoice-total'>
        {isDesktop ? renderHeader() : ""}
        {isDesktop ? renderInvoice() : renderInvoiceSmall()}
      </div>
      {renderAmount()}
    </div>
  );
};

export default InvoiceTotal;
