import React from 'react';
import PropTypes from 'prop-types';

class ShortField extends React.Component {
  render() {
    const { label, value } = this.props;
    return (
      <div className="short-field">
        <div className="short-label">{label}</div>
        <div className="short-value">
          {value}
        </div>
      </div>
    );
  }
}

ShortField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default ShortField;
