import React from 'react';
import PropTypes from 'prop-types';

class ShortField extends React.Component {
  // converts boolean values to strings
  convertTruthy = (bool) => {
    if (bool) return 'Yes';
    return 'No';
  };

  render() {
    const { label, isUrl } = this.props;
    let { value } = this.props;
    value = typeof value === 'boolean' ? this.convertTruthy(value) : value;
    return (
      <div className="margin-bottom-m">
        <div className="applicant-info-label">{label}</div>
        <div className="applicant-short-info">
          {isUrl ? (<div className="link"><a target="_blank" rel="noopener noreferrer" href={value && value.startsWith('http') ? value : '//' + value}> {value}</a></div>) : value}
        </div>
      </div>
    );
  }
}

ShortField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  isUrl: PropTypes.bool,
};

export default ShortField;
