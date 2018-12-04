import React from 'react';
import PropTypes from 'prop-types';

class LongField extends React.Component {
  render() {
    const { label, value } = this.props;
    return (
      <div className="applicant-info-field">
        <div className="applicant-info-label">{label}</div>
        <div className="applicant-long-info">{value}</div>
      </div>
    );
  }
}

LongField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default LongField;
