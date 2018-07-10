import React from 'react';
import PropTypes from 'prop-types';

import './SecondaryButton.sass';

const SecondaryButton = ({ text, onClick }) => (
  <button onClick={onClick} type="button" className="secondary">
    { text }
  </button>
);

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default SecondaryButton;
