import React from 'react';
import PropTypes from 'prop-types';

import { Ripple } from '../../../animations';

const SecondaryButton = ({ text, onClick, disabled }) => (
  <span>
    <Ripple disabled={disabled}>
      <button
        onClick={onClick}
        type="button"
        disabled={disabled}
        className="secondary">
        { text }
      </button>
    </Ripple>
  </span>
);

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SecondaryButton;
