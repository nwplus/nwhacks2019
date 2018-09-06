import React from 'react';
import PropTypes from 'prop-types';
import arrow from '../../../assets/arrow.svg';

class ShowHideTextView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDropDown: false };
  }

  handleClick = () => {
    const { showDropDown } = this.state;
    this.setState({ showDropDown: !showDropDown });
  };

  render() {
    const { label, dropDownText, className } = this.props;
    const { showDropDown } = this.state;
    return (
      <div className={`show-hide card secondary-outline ${className}`}>
        <div className="show-hide-label-container pad-sides-s pad-ends-s user-select-none clickable flex jc-between" onClick={this.handleClick}>
          <p className="show-hide-label margin-ends-s margin-right-s clickable">{label}</p>
          <img
            className={`show-hide-arrow margin-ends-s flex-no-shrink ${showDropDown ? 'flip-vertical' : ''}`}
            src={arrow}
            alt="arrow" />
        </div>
        <p className={`show-hide-drop-down-text margin-sides-s margin-bottom-s ${showDropDown ? '' : 'display-none'}`}>
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
