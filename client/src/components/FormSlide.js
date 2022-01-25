import React, { Fragment, useContext, useEffect } from "react";
import { DateTime } from "luxon";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TransitionGroup } from "react-transition-group";

import ListItem from "./ListItem";

import { validationSchema } from "../schemas/FormSchema";

import InvoiceContext from "../context/invoice/InvoicesContext";
import ModalContext from "../context/modal/ModalContext";

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

  const renderDefaultValues = () => {
    if (edit) {
      return {
        id: invoice.id,
        createdAt: invoice.createdAt,
        paymentDue: invoice.paymentDue,
        description: invoice.description,
        paymentTerms: invoice.paymentTerms,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        status: invoice.status,
        senderAddress: {
          street: invoice.senderAddress.street,
          city: invoice.senderAddress.city,
          postCode: invoice.senderAddress.postCode,
          country: invoice.senderAddress.country,
        },
        clientAddress: {
          street: invoice.clientAddress.street,
          city: invoice.clientAddress.city,
          postCode: invoice.clientAddress.postCode,
          country: invoice.clientAddress.country,
        },
        total: invoice.total,
      };
    } else {
      return {
        id: "",
        createdAt: "",
        paymentDue: "",
        description: "",
        paymentTerms: null,
        clientName: "",
        clientEmail: "",
        status: "",
        senderAddress: {
          street: "",
          city: "",
          postCode: null,
          country: "",
        },
        clientAddress: {
          street: "",
          city: "",
          postCode: null,
          country: "",
        },
        total: null,
      };
    }
  };

  const {
    handleSubmit,
    control,
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: renderDefaultValues(),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data) => {
    edit ? editInvoice(data.id, data, data.status) : newInvoice(data);

    slideClose();
    clearInvoice();
    clearFilter();
  };

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

  const addItemState = (e) => {
    e.preventDefault(e);
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
        <button
          type='button'
          onClick={discardChanges}
          className='btn btn--white'>
          Discard
        </button>
        <button
          value='draft'
          type='submit'
          onClick={(e) => saveInvoice(e)}
          className='slide__form-btn-draft btn'>
          Save as Draft
        </button>
        <button
          value='pending'
          type='submit'
          onClick={(e) => saveInvoice(e)}
          className='slide__form-btn-send btn'>
          Save & Send
        </button>
      </Fragment>
    );
  };

  return (
    <div className='slide'>
      <h2 className='slide__heading'>{renderInvoiceHeading()}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='slide__form'>
        <h3 className='slide__form-heading'>Bill From</h3>

        <div className='slide__form-group'>
          <div className='slide__form-group-item'>
            <label htmlFor='street'>Street Address</label>
            <input {...register("senderAddress.street")} />
            <p className='slide__form-group-item-error'>
              {errors.senderAddress?.street?.message}
            </p>
          </div>

          <div className='slide__form-group-item'>
            <label htmlFor='city'>City</label>
            <input {...register("senderAddress.city")} />
            <p className='slide__form-group-item-error'>
              {errors.senderAddress?.city?.message}
            </p>
          </div>

          <div className='slide__form-group-item'>
            <label htmlFor='postCode'>Post Code</label>
            <input type='number' {...register("senderAddress.postCode")} />
            <p className='slide__form-group-item-error'>
              {errors.senderAddress?.postCode?.message}
            </p>
          </div>

          <div className='slide__form-group-item'>
            <label htmlFor='country'>Country</label>
            <input {...register("senderAddress.country")} />
            <p className='slide__form-group-item-error'>
              {errors.senderAddress?.country?.message}
            </p>
          </div>
        </div>

        <h3 className='slide__form-heading'>Bill To</h3>

        <div className='slide__form-group'>
          <div className='slide__form-group-item'>
            <label htmlFor='clientName'>Client's Name</label>
            <input {...register("clientName")} />
            <p className='slide__form-group-item-error'>
              {errors.clientName?.message}
            </p>
          </div>

          <div className='slide__form-group-item'>
            <label htmlFor='clientEmail'>Client's Email</label>
            <input {...register("clientEmail")} />
            <p className='slide__form-group-item-error'>
              {errors.clientEmail?.message}
            </p>
          </div>

          <div className='slide__form-group-item'>
            <label htmlFor='street'>Street Address</label>
            <input {...register("clientAddress.street")} />
            <p className='slide__form-group-item-error'>
              {errors.clientAddress?.street?.message}
            </p>
          </div>

          <div className='slide__form-group-item'>
            <label htmlFor='city'>City</label>
            <input {...register("clientAddress.city")} />
            <p className='slide__form-group-item-error'>
              {errors.clientAddress?.city?.message}
            </p>
          </div>

          <div className='slide__form-group-item'>
            <label htmlFor='post'>Post Code</label>
            <input type='number' {...register("clientAddress.postCode")} />
            <p className='slide__form-group-item-error'>
              {errors.clientAddress?.postCode?.message}
            </p>
          </div>

          <div className='slide__form-group-item'>
            <label htmlFor='country'>Country</label>
            <input {...register("clientAddress.country")} />
            <p className='slide__form-group-item-error'>
              {errors.clientAddress?.country?.message}
            </p>
          </div>
        </div>

        <div className='slide__form-group'>
          <div className='slide__form-group-item'>
            <label htmlFor='createdAt'>Invoice Date</label>
            <input type='date' {...register("createdAt")} />
            <p className='slide__form-group-item-error'>
              {errors.createdAt?.message}
            </p>
          </div>

          <div className='slide__form-group-item'>
            <label htmlFor='paymentTerms'>Payment Terms</label>
            <select {...register("paymentTerms")}>
              <option disabled>Select Terms</option>
              {renderOptions()}
            </select>
            <p className='slide__form-group-item-error'>
              {errors.paymentTerms?.message}
            </p>
          </div>

          <div className='slide__form-group-item'>
            <label htmlFor='description'>Project Description</label>
            <input {...register("description")} />
            <p className='slide__form-group-item-error'>
              {errors.description?.message}
            </p>
          </div>
        </div>

        <h2 className='slide__form-item-list-heading'>Item List</h2>

        <div className='slide__form-list'>
          <TransitionGroup component={null}>
            {fields.map((field, index) => (
              <ListItem
                animationTiming={animationTiming}
                removeTiming={removeTiming}
                register={register}
                errors={errors}
                key={field.id}
                index={index}
                control={control}
                remove={remove}
                setValue={setValue}
                watch={watch}
              />
            ))}
          </TransitionGroup>
        </div>
        <button
          type='button'
          onClick={(e) => addItemState(e)}
          className='slide__form-list-new-btn btn'>
          + Add New Item
        </button>

        <p className='slide__form-group-item-error'>{errors.items?.message}</p>

        <div className='slide__form-button-group'>{renderButtons()}</div>
      </form>
    </div>
  );
};

export default FormSlide;
