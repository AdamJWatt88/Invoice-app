import React, { useContext, useEffect, useState } from "react";
import ArrowDown from "../assets/icon-arrow-down.svg";
import Plus from "../assets/icon-plus.svg";

import StyledButton from "./Buttons/StyledButton";

import ErrorContext from "../context/error/ErrorContext";
import InvoicesContext from "../context/invoice/InvoicesContext";
import ModalContext from "../context/modal/ModalContext";

const InvoiceStatusBar = () => {
  const errorContext = useContext(ErrorContext);
  const invoicesContext = useContext(InvoicesContext);
  const modalContext = useContext(ModalContext);

  const { errorEmptyClear, errorEmptyFiltered, errorEmptyNewInvoice } =
    errorContext;
  const { clearFilter, filterStatus, invoices, filtered, setNew } =
    invoicesContext;
  const { slideOpen } = modalContext;

  const [isFiltered, setIsFiltered] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 600);

  const updateScreen = () => {
    setDesktop(window.innerWidth > 600);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreen);

    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  useEffect(() => {
    if (filtered.length) {
      errorEmptyClear();
    } else if (!isFiltered && invoices.length === 0) {
      errorEmptyNewInvoice();
    } else if (!isFiltered) {
      errorEmptyClear();
    } else {
      errorEmptyFiltered();
    }

    // eslint-disable-next-line
  }, [filtered]);

  const handleNew = () => {
    slideOpen();
    setNew();
  };

  const filterClear = () => {
    clearFilter();
    setIsFiltered(false);
  };

  const filterSet = (e) => {
    filterStatus(e.target.value);
    setIsFiltered(true);
  };

  const onChange = (e) => {
    e.target.value === "clear" ? filterClear() : filterSet(e);
    setOpen(!open);
  };

  const onClick = () => {
    setOpen(!open);
  };

  const stopProp = (e) => {
    e.stopPropagation();
  };

  const renderTotalInvoices = () => {
    if (invoices.length === 0) {
      return "No invoices";
    } else {
      return isDesktop
        ? `There are ${invoices.length} total invoices`
        : `${invoices.length} invoices`;
    }
  };

  return (
    <div className='invoice-status-bar'>
      <div className='invoice-status-bar__invoices'>
        <h1 className='invoice-status-bar__invoices-heading'>Invoices</h1>
        <p>{renderTotalInvoices()}</p>
      </div>

      <div onClick={() => onClick()} className='invoice-status-bar__filter'>
        Filter {isDesktop ? "by status" : ""}
        <img
          className={
            open ? "arrow-down-icon arrow-down-icon--rotate" : "arrow-down-icon"
          }
          src={ArrowDown}
          alt=''
        />
        <div
          onClick={(e) => {
            stopProp(e);
          }}
          className={
            open
              ? "invoice-status-bar__filter-menu invoice-status-bar__filter-menu--open"
              : "invoice-status-bar__filter-menu"
          }>
          <form onChange={onChange}>
            <div className='invoice-status-bar__form-group'>
              <input type='radio' name='status' value='draft' />
              <label htmlFor='draft'>Draft</label>
            </div>
            <div className='invoice-status-bar__form-group'>
              <input type='radio' name='status' value='pending' />
              <label className='form__radio-label' htmlFor='pending'>
                Pending
              </label>
            </div>
            <div className='invoice-status-bar__form-group'>
              <input type='radio' name='status' value='paid' />
              <label htmlFor='paid'>Paid</label>
            </div>
            <div className='invoice-status-bar__form-group'>
              <input type='radio' name='status' value='clear' />
              <label htmlFor='clear'>Clear Filter</label>
            </div>
          </form>
        </div>
      </div>

      <StyledButton
        onClick={handleNew}
        classNames={"invoice-status-bar__new-btn"}
        children={<img className='plus-icon' src={Plus} alt='' />}
        displayName={`New ${isDesktop ? "Invoice" : ""}`}
      />
    </div>
  );
};

export default InvoiceStatusBar;
