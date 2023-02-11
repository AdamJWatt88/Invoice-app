import React from "react";

const ListItemInput = ({
  labelFor,
  labelTitle,
  inputType,
  defaultValue,
  min,
  step,
  readOnly,
  className,
  inputRegister,
  register,
  children,
}) => {
  return (
    <div className='slide__form-group-item'>
      <label htmlFor={labelFor}>{labelTitle}</label>
      <input
        name={inputRegister}
        readOnly={readOnly}
        type={inputType}
        defaultValue={defaultValue}
        min={min}
        step={step}
        className={`slide__form-list-item-${className}`}
        {...register(inputRegister)}
      />

      {children}
    </div>
  );
};

export default ListItemInput;
