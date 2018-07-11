import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ text, onClick, disabled }) => (
  <button
    onClick={onClick}
    type="button"
    className={`primary ${disabled ? 'disabled' : ''}`}>
    { text }
  </button>
);

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PrimaryButton;
