import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ text, onClick, disabled, className, type }) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={`primary ${className}`}>
    { text }
  </button>
);

PrimaryButton.defaultProps = {
  className: '',
  type: 'button',
};

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default PrimaryButton;
