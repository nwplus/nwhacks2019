import React from 'react';
import PropTypes from 'prop-types';

const ProgressGroup = ({ count, onClick, activeIndex, lastValidIndex, className, name }) => {
  const buttons = [];
  for (let i = 0; i < count; i += 1) {
    const isActive = (i === activeIndex);
    buttons.push(
      <button
        key={i}
        onClick={e => onClick(parseInt(e.currentTarget.textContent, 10) - 1)}
        type={name ? "submit" : "button"}
        disabled={i > lastValidIndex}
        className={`progress-step ${isActive ? 'active' : ''}`}
        form={name}>
        { i + 1 }
      </button>
    );
  }
  return (<div className={`progress-button-group ${className}`}>{buttons}</div>);
};

ProgressGroup.defaultProps = {
  className: '',
};

ProgressGroup.propTypes = {
  // number of elements to create
  count: PropTypes.number.isRequired,

  // callback for clicks - the integer index of the clicked button is passed
  // as a parameter
  onClick: PropTypes.func,

  // currently "clicked"  onClick: PropTypes.func,
  activeIndex: PropTypes.number,

  // all values after this will be "disabled"
  lastValidIndex: PropTypes.number,

  // class name for styling
  className: PropTypes.string,

  // optional form name
  name: PropTypes.string,
};

export default ProgressGroup;
