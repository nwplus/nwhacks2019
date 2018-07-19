import React from 'react';
import PropTypes from 'prop-types';

const ProgressGroup = ({ count, onClick, activeIndex, lastValidIndex }) => {
  const buttons = [];
  for (let i = 0; i < count; i += 1) {
    const isActive = (i === activeIndex);
    buttons.push(
      <button
        key={i}
        onClick={e => onClick(parseInt(e.currentTarget.textContent, 10) - 1)}
        type="button"
        className={`
            progress-step
            ${isActive ? 'active' : ''} 
            ${i > lastValidIndex ? 'disabled' : ''}
          `}>
        { i + 1 }
      </button>
    );
  }
  return buttons;
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
};

export default ProgressGroup;
