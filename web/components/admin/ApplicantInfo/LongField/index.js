import React from 'react';
import PropTypes from 'prop-types';

class LongField extends React.Component {
  render() {
    const { label, value } = this.props;
    return (
      <div className="margin-bottom-m">
        <div className="applicant-info-label">{label}</div>
        <div className="applicant-long-info pad-sides-xs pad-ends-xs">{value}</div>
      </div>
    );
  }
}

LongField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default LongField;
