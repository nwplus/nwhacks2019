import React from 'react';

const ButtonGroup = (props) => {
  const { children } = props;
  return (<div className="button-group">{children}</div>);
};

export default ButtonGroup;
