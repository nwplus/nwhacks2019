import React from 'react';
import PropTypes from 'prop-types';

const SecondaryButton = ({ text, onClick, disabled }) => (
  <button
    onClick={onClick}
    type={isSubmit ? "submit" : "button"}
    disabled={disabled}
    className={`secondary ${className}`}
    form={name}>
    { text }
  </button>
);

SecondaryButton.defaultProps = {
  className: '',
};

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isSubmit: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default SecondaryButton;
