import React from 'react';
import PropTypes from 'prop-types';

const SecondaryButton = ({ text, onClick, disabled, className, type }) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={`secondary ${className}`}>
    { text }
  </button>
);

SecondaryButton.defaultProps = {
  className: '',
  type: 'button',
};

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default SecondaryButton;
