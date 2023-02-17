import React from "react";

const FormGroupItem = ({
  labelFor,
  labelTitle,
  inputType,
  inputRegister,
  errorMessage,
  register,
  renderOptions,
  selectInput,
  optionTitle,
  disabled,
}) => {
  return (
    <div className='slide__form-group-item'>
      <label htmlFor={labelFor}>{labelTitle}</label>

      {/* condition render between select or input */}
      {selectInput ? (
        <select {...register(inputRegister)}>
          <option disabled={disabled}>{optionTitle}</option>
          {renderOptions()}
        </select>
      ) : (
        <input type={inputType} {...register(inputRegister)} />
      )}

      <p className='slide__form-group-item-error'>{errorMessage}</p>
    </div>
  );
};

export default FormGroupItem;
