import React from 'react';
import PropTypes from 'prop-types';

const ButtonGroup = (props) => {
  const { children } = props;
  return (<div className="button-group">{children}</div>);
};

ButtonGroup.propTypes = {
  children: PropTypes.array.isRequired,
};

export default ButtonGroup;
