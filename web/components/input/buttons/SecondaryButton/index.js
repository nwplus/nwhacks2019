import React from 'react';
import PropTypes from 'prop-types';

const SecondaryButton = ({ text, onClick, disabled }) => (
  <button
    onClick={onClick}
    type="button"
    disabled={disabled}
    className="secondary"
    form={name}>
    {text}
  </button>
);

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.name,
};

export default SecondaryButton;
