import React from 'react';
import PropTypes from 'prop-types';

const ProgressGroup = ({ count, onClick, activeIndex, lastValidIndex }) => {
  const buttons = [];
  for (let i = 0; i < count; i += 1) {
    const isActive = (i === activeIndex);
    buttons.push(
      <button
        key={i}
        onClick={onClick}
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
  count: PropTypes.number.isRequired, // number of elements to create
  onClick: PropTypes.func, // assigned to buttons based on index
  activeIndex: PropTypes.number, // currently "clicked"
  lastValidIndex: PropTypes.number, // all values after this will be "disabled"
};

export default ProgressGroup;
