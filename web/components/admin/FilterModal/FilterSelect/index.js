import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '../../../input/select';
import deleteIcon from '../../../../assets/delete-icon.svg';

class FilterSelect extends React.Component {
  // returns the filter expression derived from selected attribute, field, operator, and value
  // returned value is a string that's later passed into filtrex.js

  render() {
    const {
      className,
      getFilterAttributeLabels, getFilterFieldLabels, getFilterOperatorLabels, getFilterValueLabels,
      selectAttribute, selectField, selectOperator, selectValue,
      deleteFilterById,
      currentFilterOptions, id,
    } = this.props;
    const {
      selectedAttribute,
      selectedField,
      selectedOperator,
      selectedValue,
    } = currentFilterOptions;
    const attributeLabels = getFilterAttributeLabels();
    const fieldLabels = getFilterFieldLabels(selectedAttribute);
    const operatorLabels = getFilterOperatorLabels();
    const valueLabels = getFilterValueLabels(selectedAttribute, selectedField);
    const noValuesAvailable = valueLabels.length === 0;
    return (
      <div className={`filter flex ${className}`}>
        <Select
          label=""
          name="attribute"
          className="attribute"
          onChange={option => selectAttribute(id, option.value)}
          options={Object.values(attributeLabels)}
          value={attributeLabels[selectedAttribute]} />
        <Select
          label=""
          name="field"
          className="field"
          onChange={option => selectField(id, option.value)}
          options={Object.values(fieldLabels)}
          value={fieldLabels[selectedField] || ''}
          placeholder="Enter or select a field"
          isSearchable
        />
        <Select
          label=""
          name="operator"
          className="operator"
          onChange={option => selectOperator(id, option.value)}
          options={Object.values(operatorLabels)}
          value={operatorLabels[selectedOperator]}
        />
        <Select
          label=""
          name="value"
          className={`value ${noValuesAvailable ? 'opacity-40' : ''}`}
          onChange={option => selectValue(id, option.value)}
          options={valueLabels}
          value={selectedValue}
          placeholder="Enter or select a value"
          isSearchable
          disabled={noValuesAvailable}
        />
        <div onClick={() => deleteFilterById(id)} className="delete">
          <img src={deleteIcon} alt="delete" className="clickable user-select-none" />
        </div>
      </div>
    );
  }
}

FilterSelect.defaultProps = {
  className: '',
};

FilterSelect.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  currentFilterOptions: PropTypes.object.isRequired,
  deleteFilterById: PropTypes.func.isRequired,
  resetFieldAndValue: PropTypes.func.isRequired,
  resetValue: PropTypes.func.isRequired,
  selectAttribute: PropTypes.func.isRequired,
  selectField: PropTypes.func.isRequired,
  selectOperator: PropTypes.func.isRequired,
  selectValue: PropTypes.func.isRequired,
  getFilterAttributeLabels: PropTypes.func.isRequired,
  getFilterFieldLabels: PropTypes.func.isRequired,
  getFilterOperatorLabels: PropTypes.func.isRequired,
  getFilterValueLabels: PropTypes.func.isRequired,
};

export default FilterSelect;
