import React from 'react';
import PropTypes from 'prop-types';

const ProgressGroup = ({ activeIndex, steps }) => steps.map((s) => {
  const active = (activeIndex === 0);
  activeIndex -= 1;
  return (
    <span key={s.text}>
      <button
        onClick={s.onClick}
        type="button"
        className={`
          progress-step ${active ? 'active' : ''} ${s.disabled ? 'disabled' : ''}
        `}>
        { s.text }
      </button>
    </span>
  );
});

ProgressGroup.propTypes = {
  activeIndex: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  })),
};

export default ProgressGroup;
