import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ text, onClick, disabled, isSubmit, className }) => (
  <button
    onClick={onClick}
    type={isSubmit ? "submit" : "button"}
    disabled={disabled}
    className={`primary ${className}`}
    form={name}>
    { text }
  </button>
);

PrimaryButton.defaultProps = {
  className: '',
};

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isSubmit: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default PrimaryButton;
