import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import update from 'immutability-helper';
import { isPlainObject } from 'lodash';
import { capitalizeFirstLetter } from '../../../util/string';
import { PrimaryButton, SecondaryButton } from '../../input/buttons';
import FilterSelect from './FilterSelect';
import plusIcon from '../../../assets/plus-icon.svg';

class FilterModal extends React.Component {
  constructor(props) {
    super(props);
    // the default filterOptions for a single FilterSelect
    // FILTER = ATTRIBUTE + FIELD + OPERATOR + VALUE
    this.defaultFilterOptions = {
      selectedAttribute: 'property',
      selectedField: null,
      selectedOperator: 'is',
      selectedValue: null,
      filterCompleted: false,
    };
    this.attributeLabels = {
      property: { value: 'property', label: 'Property' },
      // tag: { value: 'tag', label: 'Tag' },
    };
    this.fieldLabels = {
      property: {
        education: { value: 'education', label: 'education level' },
        isDesigner: { value: 'isDesigner', label: 'designer?' },
        isDeveloper: { value: 'isDeveloper', label: 'developer?' },
        isFirstHackathon: { value: 'isFirstHackathon', label: 'first hackathon?' },
        travel: { value: 'travel', label: 'travel' },
      },
    };
    this.operatorLabels = {
      is: { value: '==', label: 'IS' },
      isNot: { value: '!=', label: 'IS NOT' },
    };
    this.valueLabels = {
      property: {
        education: ['High School', 'Undergraduate', 'Graduate'],
        isDesigner: ['true', 'false'],
        isDeveloper: ['true', 'false'],
        isFirstHackathon: ['true', 'false'],
        travel: {
          0: { value: '0', label: 'no reimbursement' },
          1: { value: '1', label: 'wants reimbursement' },
          2: { value: '2', label: 'wants bus seat' },
        },
      },
      // tags : {}, // TODO, dynamically load
    };
    const { getAppliedFilters } = this.props;
    this.state = {
      filters: getAppliedFilters(),
    };
  }

  // on modal open
  onOpen = () => {
    const { getAppliedFilters } = this.props;
    this.setState({ filters: getAppliedFilters() });
  }

  // when the user cancels adding new filters
  onCancel = () => {
    const { getAppliedFilters, hideFilterOptions } = this.props;
    hideFilterOptions();
    this.setState(
      { filters: getAppliedFilters() },
    );
  }

  // returns filterOptions {ATTRIBUTE, FIELD, OPERATOR, VALUE} for a specific filter
  getFilterOptions = (filterId) => {
    const { filters } = this.state;
    const filter = filters[filterId];
    return filter.filterOptions;
  }

  // returns possible values for ATTRIBUTE
  getFilterAttributeLabels = () => this.attributeLabels;

  // returns possible values for FIELD given a selection of ATTRIBUTE
  getFilterFieldLabels = selectedAttribute => (
    selectedAttribute ? this.fieldLabels[selectedAttribute] : []
  );

  // returns possible values for OPERATOR
  getFilterOperatorLabels = () => this.operatorLabels;

  // returns possible values for VALUES given a selection of ATTRIBUTE and FIELD
  getFilterValueLabels = (selectedAttribute, selectedField) => {
    if (selectedAttribute && selectedField) {
      const values = this.valueLabels[selectedAttribute][selectedField];
      if (Array.isArray(values)) {
        return this.valueLabels[selectedAttribute][selectedField];
      }
      return Object.values(values);
    }
    return [];
  }

  // creates a new filter
  createNewFilter = () => {
    const { filters } = this.state;
    const id = Object.keys(filters).length.toString();
    const filter = {
      filterOptions: this.defaultFilterOptions,
      id,
    };
    const newState = update(this.state, { filters: { $merge: { [id]: filter } } });
    this.setState(newState);
  }


  // reset field and value dropdown for a specific filter
  resetFieldAndValue = (filterId) => {
    const { selectedField } = this.defaultFilterOptions;
    this.updateFilterOption(filterId, 'selectedField', selectedField, () => this.resetValue(filterId));
  }

  // reset value dropdown for a specific filter
  resetValue = (filterId) => {
    const { selectedValue } = this.defaultFilterOptions;
    this.updateFilterOption(filterId, 'selectedValue', selectedValue, null);
  }

  // select value for ATTRIBUTE dropdown for a specific filter
  selectAttribute = (filterId, newValue) => {
    this.updateFilterOption(filterId, 'selectedAttribute', newValue, () => this.resetFieldAndValue(filterId));
  }

  // select value for FIELD dropdown for a specific filter
  selectField = (filterId, newValue) => {
    this.updateFilterOption(filterId, 'selectedField', newValue, () => this.resetValue(filterId));
  }

  // select value for OPERATOR dropdown for a specific filter
  selectOperator = (filterId, newValue) => {
    this.updateFilterOption(filterId, 'selectedOperator', newValue, null);
  }

  // select value for VALUE dropdown for a specific filter
  selectValue = (filterId, newValue) => {
    // const { selectedAttribute, selectedField } = this.state;
    const { selectedAttribute, selectedField } = this.getFilterOptions(filterId);
    const values = this.valueLabels[selectedAttribute][selectedField];
    if (isPlainObject(values)) {
      const { label } = values[newValue];
      newValue = { label, value: newValue };
    }
    this.updateFilterOption(filterId, 'selectedValue', newValue, null);
  }

  // updates a filterOption {ATTRIBUTE, FIELD, OPERATOR, or VALUE} for a specific filter
  updateFilterOption = (filterId, filterOptionName, newValue, callback) => {
    const newState = update(this.state, {
      filters: {
        [filterId]: {
          filterOptions: {
            [filterOptionName]: {
              $set: newValue,
            },
          },
        },
      },
    });
    this.setState(newState, callback);
  }

  render() {
    const { isOpen, applyFilterOptions, applicantType } = this.props;
    const { filters } = this.state;
    return (
      <div>
        <Modal
          open={isOpen}
          onEntered={this.onOpen}
          onClose={this.onCancel}
          center
          classNames={{
            modal: 'modal pad-sides-l pad-ends-l',
          }}>
          <h4 className="">{`Filter ${capitalizeFirstLetter(applicantType)}s`}</h4>
          <div className="filters margin-top-l margin-bottom-m">
            {Object.values(filters).map(filter => (
              <FilterSelect
                currentFilterOptions={filter.filterOptions}
                key={filter.id}
                id={filter.id}
                resetFieldAndValue={this.resetFieldAndValue}
                resetValue={this.resetValue}
                selectAttribute={this.selectAttribute}
                selectField={this.selectField}
                selectOperator={this.selectOperator}
                selectValue={this.selectValue}
                getFilterOptions={this.getFilterOptions}
                getFilterAttributeLabels={this.getFilterAttributeLabels}
                getFilterFieldLabels={this.getFilterFieldLabels}
                getFilterOperatorLabels={this.getFilterOperatorLabels}
                getFilterValueLabels={this.getFilterValueLabels}
              />
            ))}
          </div>

          <span className="add-filter clickable user-select-none m" onClick={this.createNewFilter}>
            <img src={plusIcon} className="icon margin-right-xs" alt="plus-icon" />
            <div className="label">Add a filter</div>
          </span>

          <div className="confirm-buttons pos-abs pad-sides-l pad-ends-l">
            <PrimaryButton text="Apply" onClick={() => applyFilterOptions(filters)} />
            <SecondaryButton text="Cancel" onClick={this.onCancel} className="margin-left-xs" />
          </div>
        </Modal>
      </div>
    );
  }
}

FilterModal.defaultProps = {
  className: '',
};

FilterModal.propTypes = {
  // whether or not the modal is open
  isOpen: PropTypes.bool,
  // get list of currently applied filters
  getAppliedFilters: PropTypes.func,
  // handler for applying filter options
  hideFilterOptions: PropTypes.func,
  // handler for applying filter options
  applyFilterOptions: PropTypes.func,
  // 'hacker', 'mentor', 'volunteer'
  applicantType: PropTypes.string.isRequired,
  // additional styles
  className: PropTypes.string,
  // handler for switching sort type
};

export default FilterModal;
