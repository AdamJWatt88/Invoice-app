import React, { useEffect, useRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { CSSTransition } from "react-transition-group";

import TrashIcon from "../../assets/icon-delete.svg";
import ListItemInput from "./ListItemInput";

const ListItem = ({
  animationTiming,
  removeTiming,
  register,
  unregister,
  index,
  remove,
  setValue,
  watch,
  errors,
  key,
  control,
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
        <ListItemInput
          labelFor='item-name'
          labelTitle='Item Name'
          defaultValue=''
          className='description'
          inputRegister={`items.${index}.description`}
          register={register}
          control={control}
          children={
            <ErrorMessage
              errors={errors}
              name={`items.${index}.description`}
              render={({ message }) => (
                <p className='slide__form-group-item-error'>{message}</p>
              )}
            />
          }
        />

        <ListItemInput
          labelFor='item-quantity'
          labelTitle='Qty.'
          min='1'
          step='1'
          inputType='number'
          defaultValue={null}
          className='quantity'
          inputRegister={`items.${index}.quantity`}
          register={register}
          control={control}
          children={
            <ErrorMessage
              errors={errors}
              name={`items.${index}.quantity`}
              render={({ message }) => (
                <p className='slide__form-group-item-error'>{message}</p>
              )}
            />
          }
        />

        <ListItemInput
          labelFor='item-price'
          labelTitle='Price'
          inputType='number'
          defaultValue={null}
          className='price'
          inputRegister={`items.${index}.price`}
          register={register}
          control={control}
          children={
            <ErrorMessage
              errors={errors}
              name={`items.${index}.price`}
              render={({ message }) => (
                <p className='slide__form-group-item-error'>{message}</p>
              )}
            />
          }
        />

        <ListItemInput
          labelFor='item-price'
          labelTitle='Total'
          readOnly={"readOnly"}
          inputType='number'
          defaultValue={null}
          className='total'
          inputRegister={`items.${index}.total`}
          register={register}
        />

        <img
          onClick={() => {
            remove(index);
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
