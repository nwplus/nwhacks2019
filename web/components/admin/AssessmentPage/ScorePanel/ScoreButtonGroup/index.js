import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ScoreButtonGroup extends React.Component {
  render() {
    const { title, numButtons, criteriaName, getScore, setScore } = this.props;
    return (
      <div className="score-button-group margin-bottom-l">
        <div className="criteria-title">{title}</div>
        {_.times(numButtons, (i) => {
          const buttonValue = i + 1;
          const selected = (getScore(criteriaName) === buttonValue);
          return (
            <button
              type="button"
              onClick={() => setScore(criteriaName, buttonValue)}
              className={`score-btn margin-right-xs ${selected ? 'selected' : ''}`}
              key={buttonValue}>
              <div className={`score-btn-text ${selected ? 'selected' : ''}`}>
                {buttonValue}
              </div>
            </button>
          );
        })}
      </div>
    );
  }
}

ScoreButtonGroup.propTypes = {
  // number of buttons
  numButtons: PropTypes.number.isRequired,
  // criteria name in database
  criteriaName: PropTypes.string.isRequired,
  // function to get current score value
  getScore: PropTypes.func.isRequired,
  // function to set score value
  setScore: PropTypes.func.isRequired,
  // title of button group
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

export { ScoreButtonGroup };
