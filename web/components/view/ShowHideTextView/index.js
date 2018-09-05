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
    const { label, dropDownText, className } = this.props;
    const { isToggleOn } = this.state;
    return (
      <div className={`show-hide card secondary-outline ${className}`}>
        <div className="pad-sides-s pad-ends-s user-select-none clickable flex jc-between" onClick={this.handleClick}>
          <p className="show-hide-outer-text margin-ends-s margin-right-s clickable">{label}</p>
          <img className="margin-ends-s flex-no-shrink" src={arrow} alt="arrow" />
        </div>
        <p className={`show-hide-inner-text margin-sides-s margin-bottom-s ${isToggleOn ? 'display-none' : ''}`}>
          {dropDownText}
        </p>
      </div>
    );
  }
}

ShowHideTextView.defaultProps = {
  className: '',
};

ShowHideTextView.propTypes = {
  // the label text for the component
  label: PropTypes.string.isRequired,

  // the text revealed when the component is clicked
  dropDownText: PropTypes.string.isRequired,
  
  // optional extra className
  className: PropTypes.string,
};

export default ShowHideTextView;
