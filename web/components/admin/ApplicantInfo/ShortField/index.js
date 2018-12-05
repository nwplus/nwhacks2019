import React from 'react';
import PropTypes from 'prop-types';

class ShortField extends React.Component {
  render() {
    const { label, value, isurl } = this.props;
    return (
      <div className="pad-sides-xs pad-ends-xs">
        <div className="applicant-info-label pad-bottom-m">{label}</div>
        <div className="applicant-short-info">
          {isurl ? (<div className="link"><a href={value}>{value}</a></div>) : value}
        </div>
      </div>
    );
  }
}

ShortField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isurl: PropTypes.bool,
};

export default ShortField;
