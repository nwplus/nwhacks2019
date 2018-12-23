import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import update from 'immutability-helper';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isEqual } from 'lodash';
import { capitalizeFirstLetter } from '../../../util/string';
import { PrimaryButton, SecondaryButton } from '../../input/buttons';
import FilterSelect from './FilterSelect';
import plusIcon from '../../../assets/plus-icon.svg';

class FilterModal extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    // the default filterOptions for a single FilterSelect
    // FILTER = ATTRIBUTE + FIELD + OPERATOR + VALUE
    //   - ATTRIBUTE is one of 'property' or 'tags'
    //   - VALUE is always 'true' when ATTRIBUTE = 'tag'
    this.defaultFilterOptions = {
      selectedAttribute: 'property',
      selectedField: null,
      selectedOperator: '==',
      selectedValue: null,
      filterCompleted: false,
    };
    this.attributeLabels = {
      property: { value: 'property', label: 'Property' },
      tag: { value: 'tag', label: 'Tag' },
    };
    this.fieldLabels = {
      property: {
        education: { value: 'education', label: 'education level' },
        isDesigner: { value: 'isDesigner', label: 'designer?' },
        isDeveloper: { value: 'isDeveloper', label: 'developer?' },
        isHardware: { value: 'isHardware', label: 'hardware?' },
        isFirstHackathon: { value: 'isFirstHackathon', label: 'first hackathon?' },
        travel: { value: 'travel', label: 'travel' },
      },
    };
    this.operatorLabels = {
      '==': { value: '==', label: 'IS' },
      '!=': { value: '!=', label: 'IS NOT' },
    };
    this.valueLabels = {
      property: {
        education: {
          'High school': { value: 'High school', label: 'High school' },
          Undergraduate: { value: 'Undergraduate', label: 'Undergraduate' },
          Graduate: { value: 'Graduate', label: 'Graduate' },
        },
        isDesigner: {
          true: { value: 'true', label: 'true' },
        },
        isDeveloper: {
          true: { value: 'true', label: 'true' },
        },
        isHardware: {
          true: { value: 'true', label: 'true' },
        },
        isFirstHackathon: {
          true: { value: 'true', label: 'true' },
        },
        travel: {
          0: { value: '0', label: 'no reimbursement' },
          1: { value: '1', label: 'wants reimbursement' },
          2: { value: '2', label: 'wants bus seat' },
        },
      },
    };
    const { getAppliedFilters } = this.props;
    this.state = {
      filters: getAppliedFilters(),
      applyButtonDisabled: true,
    };
  }

  // on modal open
  onOpen = () => {
    const { getAppliedFilters } = this.props;
    this.setState(
      { filters: getAppliedFilters() },
      this.onFiltersChange()
    );
  }

  // when the user cancels adding new filters
  onCancel = () => {
    const { getAppliedFilters, hideFilterOptions } = this.props;
    hideFilterOptions();
    this.setState(
      {
        filters: getAppliedFilters(),
        applyButtonDisabled: true,
      },
    );
  }

  // when the user presses the apply button
  onApply = () => {
    const { filters } = this.state;
    const { applyFilters } = this.props;
    this.setState(
      { applyButtonDisabled: true },
      () => applyFilters(filters)
    );
  }

  // called whenever filters change and apply button should be enabled/disabled
  onFiltersChange = () => {
    this.setState({ applyButtonDisabled: !this.shouldApplyButtonBeEnabled() });
  }

  // returns a specific filter
  getFilter = (filterId) => {
    const { filters } = this.state;
    return filters[filterId];
  }

  // returns possible values for ATTRIBUTE
  getFilterAttributeLabels = () => this.attributeLabels;

  // returns possible values for FIELD given a selection of ATTRIBUTE
  getFilterFieldLabels = (selectedAttribute) => {
    if (selectedAttribute === 'property') {
      return this.fieldLabels[selectedAttribute];
    }
    if (selectedAttribute === 'tag') {
      let { firestore: { data: { tags } } } = this.props;
      tags = Object.keys(tags);
      const fieldLabels = {};
      for (let i = 0; i < tags.length; i += 1) {
        const tag = tags[i];
        const flattenedName = 'tags_' + tag;
        fieldLabels[flattenedName] = { value: flattenedName, label: tag };
      }
      return fieldLabels;
    }
    return null;
  };

  // returns possible values for OPERATOR
  getFilterOperatorLabels = () => this.operatorLabels;

  // returns array of possible values for VALUES given a selection of ATTRIBUTE and FIELD
  getFilterValueLabels = (selectedAttribute, selectedField) => {
    if (selectedField) {
      if (selectedAttribute === 'property') {
        return this.valueLabels[selectedAttribute][selectedField] || {};
      }
      if (selectedAttribute === 'tag') {
        return { true: { value: 'true', label: 'true' } };
      }
    }
    return [];
  }

  // creates a new filter
  createNewFilter = () => {
    const { filters } = this.state;
    const index = filters.length.toString();
    const filter = this.defaultFilterOptions;
    filter.filterCompleted = false;
    const newState = update(this.state, {
      filters: {
        [index]: {
          $set: filter,
        },
      },
      applyButtonDisabled: {
        $set: true,
      },
    });
    this.setState(newState);
  }

  // remove a specific filter by id (position of filter in filters array)
  deleteFilterById = (filterId) => {
    const newState = update(this.state, { filters: { $splice: [[filterId, 1]] } });
    this.setState(newState, this.onFiltersChange);
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
    const { selectedAttribute } = this.getFilter(filterId);
    if (selectedAttribute === 'property') {
      this.updateFilterOption(filterId, 'selectedField', newValue, () => this.resetValue(filterId));
    } else if (selectedAttribute === 'tag') {
      // instead of resetting VALUE, set VALUE to 'true' when ATTRIBUTE = tag
      this.updateFilterOption(filterId, 'selectedField', newValue, () => this.selectValue(filterId, 'true'));
    }
  }

  // select value for OPERATOR dropdown for a specific filter
  selectOperator = (filterId, newValue) => {
    this.updateFilterOption(filterId, 'selectedOperator', newValue, null);
  }

  // select value for VALUE dropdown for a specific filter
  selectValue = (filterId, newValue) => {
    this.updateFilterOption(filterId, 'selectedValue', newValue, null);
  }

  // updates a filterOption {ATTRIBUTE, FIELD, OPERATOR, or VALUE} for a specific filter
  updateFilterOption = (filterId, filterOptionName, newValue, callback) => {
    const newState = update(this.state, {
      filters: {
        [filterId]: {
          [filterOptionName]: {
            $set: newValue,
          },
          filterCompleted: { $set: (newValue != null) },
        },
      },
    });
    this.setState(newState, () => {
      if (callback) callback();
      this.onFiltersChange();
    });
  }

  // returns whether or not the apply button should be enabled
  // false when filters are unchanged or not completed
  shouldApplyButtonBeEnabled = () => {
    const { filters } = this.state;
    const { getAppliedFilters } = this.props;
    const appliedFilters = getAppliedFilters();
    if (isEqual(filters, appliedFilters)) return false;
    for (let i = 0; i < filters.length; i += 1) {
      if (!filters[i].filterCompleted) return false;
    }
    return true;
  }

  render() {
    const { isOpen, applicantType } = this.props;
    const { filters, applyButtonDisabled } = this.state;
    return (
      <div>
        <Modal
          open={isOpen}
          onEntered={this.onOpen}
          onClose={this.onCancel}
          center
          classNames={{
            modal: 'modal pad-sides-l pad-top-l',
          }}>
          <h4 className="">{`Filter ${capitalizeFirstLetter(applicantType)}s`}</h4>
          <div className="filters margin-top-l margin-bottom-m">
            {filters.map((filter, index) => (
              <FilterSelect
                currentFilterOptions={filter}
                key={index.toString()}
                id={index.toString()}
                deleteFilterById={this.deleteFilterById}
                resetFieldAndValue={this.resetFieldAndValue}
                resetValue={this.resetValue}
                selectAttribute={this.selectAttribute}
                selectField={this.selectField}
                selectOperator={this.selectOperator}
                selectValue={this.selectValue}
                getFilterAttributeLabels={this.getFilterAttributeLabels}
                getFilterFieldLabels={this.getFilterFieldLabels}
                getFilterOperatorLabels={this.getFilterOperatorLabels}
                getFilterValueLabels={this.getFilterValueLabels}
              />
            ))}
          </div>

          <div className="add-filter clickable user-select-none m" onClick={this.createNewFilter}>
            <img src={plusIcon} className="icon margin-right-xs" alt="plus-icon" />
            <div className="label">Add a filter</div>
          </div>

          <div className="confirm-buttons pos-abs pad-sides-l pad-ends-l">
            <SecondaryButton
              text="Cancel"
              onClick={this.onCancel}
            />
            <PrimaryButton
              text="Apply"
              onClick={this.onApply}
              className="margin-left-xs"
              disabled={applyButtonDisabled}
            />
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
  applyFilters: PropTypes.func,
  // 'hacker', 'mentor', 'volunteer'
  applicantType: PropTypes.string.isRequired,
  // additional styles
  className: PropTypes.string,
  firestore: PropTypes.object,
};

export default compose(
  firebaseConnect(),
  firestoreConnect(['tags']),
  connect((state) => {
    return {
      firestore: state.firestore,
    };
  }),
)(FilterModal);
