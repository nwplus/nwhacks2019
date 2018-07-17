import React from 'react';
import PropTypes from 'prop-types';

import NWButton from '../templates/NWButton';

const SecondaryButton = props => <NWButton type="secondary" {...props} />;

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SecondaryButton;
