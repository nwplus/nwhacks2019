import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ text, onClick, disabled, className }) => (
  <button
    onClick={onClick}
    type="submit"
    disabled={disabled}
    className={`primary ${className}`}>
    { text }
  </button>
);

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default PrimaryButton;
