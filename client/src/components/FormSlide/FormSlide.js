import React, { Fragment, useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TransitionGroup } from "react-transition-group";

import FormGroupItem from "./FormGroupItem";
import ListItem from "./ListItem";
import StyledButton from "../Buttons/StyledButton";

import { validationSchema } from "../../schemas/FormSchema";

import InvoiceContext from "../../context/invoice/InvoicesContext";
import ModalContext from "../../context/modal/ModalContext";

import { editDefaults, defaultValues } from "./Data/defaultValues";

const FormSlide = () => {
  const invoiceContext = useContext(InvoiceContext);
  const modalContext = useContext(ModalContext);

  const {
    clearFilter,
    clearInvoice,
    createInvoice,
    edit,
    newInvoice,
    editInvoice,
    invoice,
  } = invoiceContext;

  const { slideClose } = modalContext;

  const animationTiming = 500;
  const removeTiming = 100;

  const renderDefaultValues = () =>
    edit ? editDefaults(invoice) : defaultValues;

  const {
    handleSubmit,
    control,
    register,
    unregister,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: renderDefaultValues(),
    shouldUnregister: true,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // when an invoice is new set the value of id to a random id number.
  // when an invoice is being edited setValue to the already given id then repopulate the useFieldArray state from the invoice object
  // TODO
  //! When edit is selected the items are duplicated and added to the fields state
  useEffect(() => {
    if (createInvoice) {
      setValue("id", generateId());
    }
    if (edit) {
      setValue("id", invoice.id);
      invoice.items.map((item) => append(item));
    }

    // eslint-disable-next-line
  }, []);

  const onSubmit = (invoice) => {
    edit ? editInvoice(invoice) : newInvoice(invoice);

    slideClose();
    clearInvoice();
    clearFilter();
  };

  // create a random id for the invoice
  const generateId = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const getRandomNum = (max) => {
      return Math.floor(Math.random() * max);
    };

    let arr = [];

    for (let i = 0; i < 2; i++) {
      const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      arr.push(randomChar);
    }

    for (let j = 0; j < 4; j++) {
      arr.push(getRandomNum(10));
    }

    let id = arr.join("");

    return id;
  };

  // add item to the fields state with these defaults
  const addItemState = () => {
    append({
      description: "",
      quantity: null,
      price: null,
      total: null,
    });
  };

  const setPaymentDue = () => {
    const startDate = getValues("createdAt");
    const daysAdded = getValues("paymentTerms");
    const date = DateTime.fromISO(startDate);
    const dueDate = DateTime.fromISO(date)
      .plus({ days: daysAdded })
      .toFormat("yyyy-MM-dd");

    return startDate && daysAdded ? dueDate : "";
  };

  const saveTotal = () => {
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;

    const itemsArr = getValues("items");

    const itemsTotalArr = [];

    let total;
    if (itemsArr.length) {
      itemsArr.map((item) => itemsTotalArr.push(item.total));
      total = itemsTotalArr.reduce(reducer);
    }

    return total;
  };

  const saveInvoice = (e) => {
    setValue("status", e.target.value);
    setValue("paymentDue", setPaymentDue());
    setValue("total", saveTotal());

    e.target.value === "draft"
      ? setValue("isSave", false)
      : setValue("isSave", true);
  };

  const discardChanges = () => {
    slideClose();
    clearInvoice();
  };

  const renderInvoiceHeading = () =>
    createInvoice ? "New Invoice" : "Edit Invoice";

  const renderOptions = () => {
    const days = {
      a: 1,
      b: 7,
      c: 14,
      d: 30,
    };

    return Object.values(days).map((item) => (
      <option value={item} key={item}>
        Next {item} Days
      </option>
    ));
  };

  const renderButtons = () => {
    return (
      <Fragment>
        <StyledButton
          type='button'
          displayName='Discard'
          classModifier='white'
          onClick={discardChanges}
        />
        <StyledButton
          value='draft'
          type='submit'
          displayName='Save as Draft'
          classNames='slide__form-btn-draft'
          onClick={(e) => saveInvoice(e)}
        />
        <StyledButton
          value='pending'
          type='submit'
          displayName='Save & Send'
          classNames='slide__form-btn-send'
          onClick={(e) => saveInvoice(e)}
        />
      </Fragment>
    );
  };

  return (
    <div className='slide'>
      <h2 className='slide__heading'>{renderInvoiceHeading()}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='slide__form'>
        <h3 className='slide__form-heading'>Bill From</h3>

        {/* TODO
      Refactor these form groups. Store the data in an array of objects to map over. An issue that is arising when doing this method is how to get the errors state from form state into array of object.  */}
        {/* form group one */}
        <div className='slide__form-group'>
          <FormGroupItem
            labelFor='street'
            labelTitle='Street Address'
            inputRegister='senderAddress.street'
            errorMessage={errors.senderAddress?.street?.message}
            register={register}
          />

          <FormGroupItem
            labelFor='city'
            labelTitle='City'
            inputRegister='senderAddress.city'
            errorMessage={errors.senderAddress?.city?.message}
            register={register}
          />

          <FormGroupItem
            labelFor='postCode'
            labelTitle='Post Code'
            inputType='number'
            inputRegister='senderAddress.postCode'
            errorMessage={errors.senderAddress?.postCode?.message}
            register={register}
          />

          <FormGroupItem
            labelFor='country'
            labelTitle='Country'
            inputRegister='senderAddress.country'
            errorMessage={errors.senderAddress?.country?.message}
            register={register}
          />
        </div>

        <h3 className='slide__form-heading'>Bill To</h3>

        {/* form group two */}
        <div className='slide__form-group'>
          <FormGroupItem
            labelFor='clientName'
            labelTitle="Client's Name"
            inputRegister='clientName'
            errorMessage={errors.clientName?.message}
            register={register}
          />

          <FormGroupItem
            labelFor='clientEmail'
            labelTitle="Client's Email"
            inputRegister='clientEmail'
            errorMessage={errors.clientEmail?.message}
            register={register}
          />

          <FormGroupItem
            labelFor='street'
            labelTitle='Street Address'
            inputRegister='clientAddress.street'
            errorMessage={errors.clientAddress?.street?.message}
            register={register}
          />

          <FormGroupItem
            labelFor='city'
            labelTitle='City'
            inputRegister='clientAddress.city'
            errorMessage={errors.clientAddress?.city?.message}
            register={register}
          />

          <FormGroupItem
            labelFor='post'
            labelTitle='Post Code'
            inputType='number'
            inputRegister='clientAddress.postCode'
            errorMessage={errors.clientAddress?.postCode?.message}
            register={register}
          />

          <FormGroupItem
            labelFor='country'
            labelTitle='Country'
            inputRegister='clientAddress.country'
            errorMessage={errors.clientAddress?.country?.message}
            register={register}
          />
        </div>

        {/* form group three */}
        <div className='slide__form-group'>
          <FormGroupItem
            labelFor='createdAt'
            labelTitle='Invoice Date'
            inputType='date'
            inputRegister='createdAt'
            errorMessage={errors.createdAt?.message}
            register={register}
          />

          <FormGroupItem
            labelFor='paymentTerms'
            labelTitle='Payment Terms'
            selectInput={true}
            inputRegister='paymentTerms'
            disabled={true}
            optionTitle='Select Terms'
            renderOptions={renderOptions}
            errorMessage={errors.paymentTerms?.message}
            register={register}
          />

          <FormGroupItem
            labelFor='description'
            labelTitle='Project Description'
            inputRegister='description'
            errorMessage={errors.description?.message}
            register={register}
          />
        </div>

        <h2 className='slide__form-item-list-heading'>Item List</h2>

        <div className='slide__form-list'>
          <TransitionGroup component={null}>
            {fields.map((field, index) => (
              <ListItem
                animationTiming={animationTiming}
                removeTiming={removeTiming}
                register={register}
                unregister={unregister}
                errors={errors}
                key={field.id}
                index={index}
                remove={remove}
                setValue={setValue}
                watch={watch}
              />
            ))}
          </TransitionGroup>
        </div>
        <StyledButton
          type='button'
          displayName='+ Add New Item'
          classNames='slide__form-list-new-btn'
          onClick={() => addItemState()}
        />

        <p className='slide__form-group-item-error'>{errors.items?.message}</p>

        <div className='slide__form-button-group'>{renderButtons()}</div>
      </form>
    </div>
  );
};

export default FormSlide;
