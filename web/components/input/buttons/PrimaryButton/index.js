import React from 'react';
import PropTypes from 'prop-types';

import './PrimaryButton.sass';

const PrimaryButton = ({ text, onClick }) => (
  <button onClick={onClick} type="button" className="primary">
    { text }
  </button>
);

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default PrimaryButton;
