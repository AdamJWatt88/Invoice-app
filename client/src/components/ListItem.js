import React, { useEffect, useRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { CSSTransition } from "react-transition-group";

import TrashIcon from "../assets/icon-delete.svg";

const ListItem = ({
  animationTiming,
  removeTiming,
  register,
  index,
  control,
  remove,
  setValue,
  watch,
  errors,
  key,
  ...rest
}) => {
  const nodeRef = useRef(null);

  const price = watch(`items.${index}.price`);
  const quantity = watch(`items.${index}.quantity`);

  useEffect(() => {
    if (price && quantity) {
      setValue(`items.${index}.total`, quantity * price);
    } else if (price === "" || quantity === "") {
      setValue(`items.${index}.total`, null);
    } else {
      return;
    }
    // eslint-disable-next-line
  }, [price, quantity]);

  return (
    <CSSTransition
      {...rest}
      key={key}
      nodeRef={nodeRef}
      timeout={animationTiming}
      classNames='slide-item'
      unmountOnExit={true}>
      <div key={key} ref={nodeRef} className='slide__form-list-item'>
        <div className='slide__form-group-item'>
          <label htmlFor='item-name'>Item Name</label>
          <input
            className='slide__form-list-item-description'
            {...register(`items.${index}.description`)}
            defaultValue={""}
          />
          <ErrorMessage
            errors={errors}
            name={`items.${index}.description`}
            render={({ message }) => (
              <p className='slide__form-group-item-error'>{message}</p>
            )}
          />
        </div>

        <div className='slide__form-group-item'>
          <label htmlFor='item-quantity'>Qty.</label>
          <input
            min='1'
            step='1'
            type='number'
            className='slide__form-list-item-quantity'
            {...register(`items.${index}.quantity`)}
            defaultValue={null}
          />
          <ErrorMessage
            errors={errors}
            name={`items.${index}.quantity`}
            render={({ message }) => (
              <p className='slide__form-group-item-error'>{message}</p>
            )}
          />
        </div>

        <div className='slide__form-group-item'>
          <label htmlFor='item-price'>Price</label>
          <input
            type='number'
            className='slide__form-list-item-price'
            {...register(`items.${index}.price`)}
            defaultValue={null}
          />
          <ErrorMessage
            errors={errors}
            name={`items.${index}.price`}
            render={({ message }) => (
              <p className='slide__form-group-item-error'>{message}</p>
            )}
          />
        </div>

        <div className='slide__form-group-item'>
          <label htmlFor='item-price'>Total</label>
          <input
            disabled
            type='number'
            {...register(`items.${index}.total`)}
            defaultValue={null}
            className='slide__form-list-item-total'
          />
        </div>

        <img
          onClick={() => {
            setTimeout(() => {
              remove(index);
            }, removeTiming);
          }}
          data-index={index}
          className='slide__form-list-item-icon'
          src={TrashIcon}
          alt=''
        />
      </div>
    </CSSTransition>
  );
};

export default ListItem;
