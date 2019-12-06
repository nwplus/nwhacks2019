import React from 'react';
import PropTypes from 'prop-types';

class ShortField extends React.Component {
  // converts boolean values to strings
  convertTruthy = (bool) => {
    if (bool) return 'Yes';
    return 'No';
  };

  render() {
    const { label } = this.props;
    let { value } = this.props;
    const expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    value = typeof value === 'boolean' ? this.convertTruthy(value) : value;
    return (
      <div className="margin-bottom-m">
        <div className="applicant-info-label">{label}</div>
        <div className="applicant-short-info">
          {String(value).match(regex) ? (<div className="link"><a target="_blank" rel="noopener noreferrer" href={value && value.startsWith('http') ? value : '//' + value}> {value}</a></div>) : value}
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
