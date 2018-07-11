import React from 'react';
import PropTypes from 'prop-types';

const SecondaryButton = ({ text, onClick, disabled }) => (
  <button
    onClick={onClick}
    type="button"
    className={`secondary ${disabled ? 'disabled' : ''}`}>
    { text }
  </button>
);

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SecondaryButton;
