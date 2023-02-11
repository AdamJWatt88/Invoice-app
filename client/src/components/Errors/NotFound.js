import React from "react";
import { Link } from "react-router-dom";

import ArrowLeft from "../../assets/icon-arrow-left.svg";

import ErrorDisplay from "./ErrorDisplay";

const NotFound = () => {
  return (
    <div className='invoice-container'>
      <Link to='/' className='back-btn'>
        <img src={ArrowLeft} alt='Back' /> Go back
      </Link>

      <ErrorDisplay
        heading='Page Not Found'
        message='This page cannot be found'
      />
    </div>
  );
};

export default NotFound;
