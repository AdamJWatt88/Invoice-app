import React from "react";

const StyledButton = ({
  type,
  value,
  onClick,
  displayName,
  classModifier,
  classNames,
  children,
}) => {
  return (
    <button
      type={type}
      value={value}
      onClick={onClick}
      className={`btn btn--${classModifier} ${classNames ? classNames : ""}`}>
      {children}
      {displayName}
    </button>
  );
};

export default StyledButton;
