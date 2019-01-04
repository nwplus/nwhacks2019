import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '../../input/select';
import sortIcon from '../../../assets/sort-arrow.svg';
import filterIcon from '../../../assets/filter-icon.svg';
import filterIconSelected from '../../../assets/filter-icon-selected.svg';
import tagIcon from '../../../assets/internal/tag-icon.svg';
import { Checkbox } from '../../input/buttons';
import TagMenu from './TagMenu';
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

  renderToolbar = () => {
    const { applicantType,
      switchApplicantType,
      className,
      areFiltersApplied,
      showFilterOptions,
      switchSortType, sortType, switchSortDirection, sortDirection } = this.props;
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
      </div>
    );
  }

  renderAdditionalTools = () => {
    const {
      className,
      applicantType,
      toggleTagMenu, isTagMenuOpen, getTagMenuOptions,
      checkAllApplicants, uncheckAllApplicants,
      checkedApplicantIds, applicants,
      createNewTag, applyTags,
      exportApplicants,
    } = this.props;
    // a checkbox is indeterminate when it's checked value only applies to some applicants
    const numcheckedApplicantIds = Object.keys(checkedApplicantIds).length;
    const checkboxIsIndeterminate = checkedApplicantIds
    && numcheckedApplicantIds > 0
    && numcheckedApplicantIds !== applicants.length;
    const checkboxisChecked = !checkboxIsIndeterminate && numcheckedApplicantIds > 0;
    const checkboxLabel = numcheckedApplicantIds > 0
      ? `${numcheckedApplicantIds} people selected`
      : 'Select all';
    return (
      <div className={`extra-toolbar flex ai-center fill-width ${className}`}>
        <Checkbox
          value="select-all-applicants"
          className={`checkbox ${!numcheckedApplicantIds ? 'select-all' : null}`}
          onChange={e => ((e.target.checked) ? checkAllApplicants() : uncheckAllApplicants())}
          isIndeterminate={checkboxIsIndeterminate}
          checked={checkboxisChecked}
          isControlled
          label={checkboxLabel} />
        {numcheckedApplicantIds > 0
          ? (
            <div
              className="tag-button flex ai-center clickable user-select-none"
              onClick={toggleTagMenu}>
              <img alt="tag" src={tagIcon} />Tag
            </div>
          ) : null}
        {numcheckedApplicantIds > 0
          ? (
            <div
              className="export-email-button flex ai-center clickable user-select-none"
              role="button"
              onClick={exportApplicants}
              tabIndex={0}>
              <img src={downloadIcon} alt="export emails" />Export selected applicants
            </div>
          ) : null}
        <TagMenu
          applicantType={applicantType}
          isOpen={isTagMenuOpen}
          hideTagMenu={toggleTagMenu}
          checkedApplicantIds={checkedApplicantIds}
          getTagMenuOptions={getTagMenuOptions}
          createNewTag={createNewTag}
          applyTags={applyTags}
        />
      </div>
    );
  }

  render() {
    const { pageType } = this.props;
    const toolbar = this.renderToolbar();
    const extraToolbar = pageType === 'applicants' ? this.renderAdditionalTools() : null;
    return (
      <div>
        {toolbar}
        {extraToolbar}
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
  // has the user applied any filters
  areFiltersApplied: PropTypes.bool,
  // handler for hiding filter options
  showFilterOptions: PropTypes.func,
  // // handler for switching sort type
  switchSortType: PropTypes.func,
  // type to sort by
  sortType: PropTypes.string,
  // Switch sort direction
  switchSortDirection: PropTypes.func,
  // Check sort direction
  sortDirection: PropTypes.string,
  // checks all applicants
  checkAllApplicants: PropTypes.func,
  // unchecks all applicants
  uncheckAllApplicants: PropTypes.func,
  // currently checked applicants
  checkedApplicantIds: PropTypes.object,
  // shows/hides the tag menu
  toggleTagMenu: PropTypes.func,
  // is the tag menu currently open
  isTagMenuOpen: PropTypes.bool,
  // returns tag menu options
  getTagMenuOptions: PropTypes.func,
  // handler to create a new tag
  createNewTag: PropTypes.func,
  // handler to apply (add/remove) tags from an array of applicants
  applyTags: PropTypes.func,
  // all applicants (after filters are applied)
  applicants: PropTypes.array,
  // 'assessment' or 'applicants'
  pageType: PropTypes.string,
  // Exports all applicants into a csv
  exportApplicants: PropTypes.func,
};

export default Toolbar;
