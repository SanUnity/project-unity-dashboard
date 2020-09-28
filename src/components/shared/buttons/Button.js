import React from 'react';
import './Button.css'

const Button = ({ onClick, disabled, text, name, className, type }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      id={`${name}`}
    >
      {text}
    </button>
  );
};

export default Button;