import React from 'react';

import './SecondaryButton.sass';

const SecondaryButton = ({ text, onClick }) => (
  <button onClick={onClick}>
    { text }
  </button>
);

export default SecondaryButton;
