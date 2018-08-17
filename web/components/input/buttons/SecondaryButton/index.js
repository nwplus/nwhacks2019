import React from 'react';
import PropTypes from 'prop-types';

const SecondaryButton = ({ text, onClick, disabled, className }) => (
  <button
    onClick={onClick}
    type={name ? "submit" : "button"}
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
  className: PropTypes.string,
  name: PropTypes.string,
};

export default SecondaryButton;
