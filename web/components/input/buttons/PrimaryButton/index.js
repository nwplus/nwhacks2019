import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ text, onClick, disabled, type }) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className="primary">
    { text }
  </button>
);

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PrimaryButton;
