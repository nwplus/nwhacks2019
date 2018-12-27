import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '../../input/select';
import sortIcon from '../../../assets/sort-arrow.svg';
import filterIcon from '../../../assets/filter-icon.svg';
import filterIconSelected from '../../../assets/filter-icon-selected.svg';
import downloadIcon from '../../../assets/download-icon.svg';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.collectionSelectLabels = {
      hacker: { value: 'hacker', label: 'Hacker' },
      mentor: { value: 'mentor', label: 'Mentor' },
      volunteer: { value: 'volunteer', label: 'Volunteer' },
    };
    this.sortSelectLabels = {
      lastName: { value: 'lastName', label: 'Last Name' },
      firstName: { value: 'firstName', label: 'First Name' },
      email: { value: 'email', label: 'Email' },
      score: { value: 'score', label: 'Score' },
      timestamp: { value: 'timestamp', label: 'Timestamp' },
    };
  }

  render() {
    const { applicantType,
      switchApplicantType,
      className,
      areFiltersApplied,
      showFilterOptions,
      switchSortType, sortType, switchSortDirection, sortDirection, exportApplicants } = this.props;
    return (
      <div className={`toolbar flex fill-width ${className}`}>
        <Select
          onChange={option => switchApplicantType(option.value)}
          label="Form:"
          name="collection-input"
          value={this.collectionSelectLabels[applicantType]}
          options={Object.values(this.collectionSelectLabels)} />
        <Select
          className="margin-left-s"
          onChange={option => switchSortType(option.value)}
          label="Sort By:"
          name="sort-input"
          value={this.sortSelectLabels[sortType]}
          options={Object.values(this.sortSelectLabels)} />
        <div
          className="pad-left-l toolbar-icon"
          role="button"
          onClick={switchSortDirection}
          tabIndex={0}>
          <img
            src={sortIcon}
            alt="sort arrow"
            className={`${sortDirection === 'asc' ? '' : 'flip-vertical'}`} />
        </div>
        <div
          className="pad-left-l toolbar-icon"
          role="button"
          onClick={showFilterOptions}
          tabIndex={0}>
          <img
            src={areFiltersApplied ? filterIconSelected : filterIcon}
            alt="filter button" />
        </div>
        <div
          className="pad-left-l toolbar-icon"
          role="button"
          onClick={exportApplicants}
          tabIndex={0}>
          <img
            src={downloadIcon}
            alt="export emails" />
        </div>
      </div>
    );
  }
}

Toolbar.defaultProps = {
  className: '',
};

Toolbar.propTypes = {
  // 'hacker', 'mentor', 'volunteer'
  applicantType: PropTypes.string,
  // handler for switching between applicant types
  switchApplicantType: PropTypes.func,
  // additional styles
  className: PropTypes.string,
  // // is the user currently selecting filters
  // isSelectingFilters: PropTypes.bool,
  // has the user applied any filters
  areFiltersApplied: PropTypes.bool,
  // handler for hiding filter options
  showFilterOptions: PropTypes.func,
  // handler for hiding filter options
  // hideFilterOptions: PropTypes.func,
  // // handler for applying filter options
  // applyFilterOptions: PropTypes.func,
  // // handler for switching sort type
  switchSortType: PropTypes.func,
  // type to sort by
  sortType: PropTypes.string,
  // Switch sort direction
  switchSortDirection: PropTypes.func,
  // Check sort direction
  sortDirection: PropTypes.string,
  // Exports all applicants into a csv
  exportApplicants: PropTypes.func,

};

export default Toolbar;
