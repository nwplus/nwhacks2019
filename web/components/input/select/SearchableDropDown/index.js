import React from 'react';
import PropTypes from 'prop-types';

class SearchableDropDown extends React.Component {

  // Converts list of values to list of <option> elements
  valueListToOptions = () => {
    const { valueList } = this.props;
    return valueList.map(value => <option>{value}</option>);
  }

  render() {
    const {
      label,
      className,
      name,
      placeholder,
      required,
      disabled,
      isSearchable,
      allowCustomAnswer,
      customAnswerMaxCharNumber,
    } = this.props;
    const inputProps = {
      name,
      required,
      disabled,
    };

    return (
      <div className={`drop-down-input ${className}`}>
        <h5 className="body-text">{label}</h5>
        {isSearchable ? (
          // searchable drop down list
          <input {...inputProps} type="text" placeholder={placeholder} />
        ) : (
          // regular drop down list
          <select {...inputProps} name={name}>
            <option value="" disabled selected>{placeholder || 'Select an option'}</option>
            {this.valueListToOptions()}
          </select>
        )}
      </div>
    );
  }
}

SearchableDropDown.defaultProps = {
  customAnswerMaxCharNumber: 255,
};
SearchableDropDown.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  valueList: PropTypes.array.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  isSearchable: PropTypes.bool,
  allowCustomAnswer: PropTypes.bool,
  customAnswerMaxCharNumber: PropTypes.number,
};

export default SearchableDropDown;
