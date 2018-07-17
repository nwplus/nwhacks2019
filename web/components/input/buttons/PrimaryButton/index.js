import React from 'react';
import PropTypes from 'prop-types';

import { Ripple } from '../../../animations';

const PrimaryButton = ({ text, onClick, disabled }) => (
  <span>
    <Ripple disabled={disabled}>
      <button
        onClick={onClick}
        type="button"
        disabled={disabled}
        className="primary">
        { text }
      </button>
    </Ripple>
  </span>
);

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PrimaryButton;
