import React from 'react';
import PropTypes from 'prop-types';
import arrow from '../../../assets/arrow.svg';

class ShowHideTextView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => {
      return {
        isToggleOn: !state.isToggleOn,
      };
    });
  }

  render() {
    const { outerText, innerText, className } = this.props;
    const { isToggleOn } = this.state;
    return (
      <div className={`show-hide card secondary-outline ${className}`}>
        <div className="pad-sides-s pad-ends-s user-select-none clickable flex jc-between" onClick={this.handleClick}>
          <p className="show-hide-outer-text margin-ends-s margin-right-s clickable">{outerText}</p>
          <img className="margin-ends-s flex-no-shrink" src={arrow} alt="arrow" />
        </div>
        <p className={`show-hide-inner-text margin-sides-s margin-bottom-s ${isToggleOn}`}>
          {innerText}
        </p>
      </div>
    );
  }
}

ShowHideTextView.defaultProps = {
  className: '',
};

ShowHideTextView.propTypes = {
  outerText: PropTypes.string.isRequired,
  innerText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ShowHideTextView;
