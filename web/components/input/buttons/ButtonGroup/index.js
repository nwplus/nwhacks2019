import React from 'react';
import PropTypes from 'prop-types';

const ButtonGroup = ({ children, className }) => (<div className={`button-group ${className}`}>{children}</div>);

ButtonGroup.defaultProps = {
  className: '',
};

ButtonGroup.propTypes = {
  // children of this component, e.g. <ButtonGroup><child1 /><child2 /></ButtonGroup>
  children: PropTypes.array.isRequired,

  // class name for styling
  className: PropTypes.string,
};

export default ButtonGroup;
