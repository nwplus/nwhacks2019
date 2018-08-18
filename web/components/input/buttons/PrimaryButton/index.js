import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ text, onClick, disabled, className, name, type }) => (
  <button
    onClick={onClick}
    type={type ? type : (name ? "submit" : "button")}
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
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default PrimaryButton;
