import React from 'react';
import PropTypes from 'prop-types';

class ShortField extends React.Component {
  render() {
    const { label, value, isUrl } = this.props;
    return (
      <div className="pad-sides-xs pad-ends-xs">
        <div className="applicant-info-label pad-bottom-m">{label}</div>
        <div className="applicant-short-info">
          {isUrl ? (<div className="link"><a target="_blank" rel="noopener noreferrer" href={value && value.startsWith('http') ? value : '//' + value}> {value}</a></div>) : value}
        </div>
      </div>
    );
  }
}

ShortField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  isUrl: PropTypes.bool,
};

export default ShortField;
