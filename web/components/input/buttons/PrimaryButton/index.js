import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ text, onClick, disabled }) => (
  <span>
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className="primary">
      { text }
    </button>
  </span>
);

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PrimaryButton;
