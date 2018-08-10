import React from 'react';
import PropTypes from 'prop-types';

const ButtonGroup = ({ children, classNames }) => {
  classNames = classNames || [];
  classNames.push('button-group');
  return (<div className={classNames.join(' ')}>{children}</div>);
};

ButtonGroup.propTypes = {
  children: PropTypes.array.isRequired,
  classNames: PropTypes.arrayOf(PropTypes.string),
};

export default ButtonGroup;
