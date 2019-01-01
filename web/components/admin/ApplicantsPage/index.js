import React from 'react';
import PropTypes from 'prop-types';
import ApplicantList from '../ApplicantList';
import ApplicantMetadata from './ApplicantMetadata';
import ApplicantInfo from '../ApplicantInfo';
import Toolbar from '../Toolbar';
import FilterModal from '../FilterModal';

const ApplicantsPage = ({
  applicantType,
  applicants,
  selectedApplicantId,
  switchApplicantType,
  onApplicantClick,
  isSelectingFilters,
  areFiltersApplied,
  getAppliedFilters,
  showFilterOptions,
  applyFilters,
  hideFilterOptions,
  sortType,
  switchSortType,
  switchSortDirection,
  sortDirection,
  checkAllApplicants,
  uncheckAllApplicants,
  checkApplicant,
  uncheckApplicant,
  checkedApplicantIds,
  toggleTagMenu,
  isTagMenuOpen,
  getTagMenuOptions,
  createNewTag,
  applyTags,
  exportApplicants,
}) => (
  <div className="dashboard">
    {/* TODO: TOOLBAR */}
    <Toolbar
      pageType="applicants"
      applicantType={applicantType}
      switchApplicantType={switchApplicantType}
      areFiltersApplied={areFiltersApplied}
      showFilterOptions={showFilterOptions}
      sortType={sortType}
      switchSortType={switchSortType}
      switchSortDirection={switchSortDirection}
      sortDirection={sortDirection}
      checkAllApplicants={checkAllApplicants}
      uncheckAllApplicants={uncheckAllApplicants}
      checkedApplicantIds={checkedApplicantIds}
      applicants={applicants}
      toggleTagMenu={toggleTagMenu}
      isTagMenuOpen={isTagMenuOpen}
      getTagMenuOptions={getTagMenuOptions}
      createNewTag={createNewTag}
      applyTags={applyTags}
      exportApplicants={exportApplicants}
      />
    <FilterModal
      isOpen={isSelectingFilters}
      getAppliedFilters={getAppliedFilters}
      hideFilterOptions={hideFilterOptions}
      applyFilters={applyFilters}
      applicantType={applicantType}
      />
    <div className="applicant-view flex">
      {/* APPLICANT LIST */}
      <ApplicantList
        pageType="applicants"
        applicants={applicants}
        selectedApplicantId={selectedApplicantId}
        onApplicantClick={onApplicantClick}
        checkApplicant={checkApplicant}
        uncheckApplicant={uncheckApplicant}
        checkedApplicantIds={checkedApplicantIds}
        className={`${!selectedApplicantId ? 'fill-min-width' : ''}`}
        />
      {/* APPLICANT TAG INFO & SCORE HISTORY */}
      <ApplicantMetadata
        applicantId={selectedApplicantId}
        applicantType={applicantType}
        className={`${!selectedApplicantId ? 'display-none' : ''}`}
      />
      {/* APPLICANT INFO PANEL */}
      <ApplicantInfo
        applicantId={selectedApplicantId}
        applicantType={applicantType}
        className={`${!selectedApplicantId ? 'display-none' : ''}`}
      />
    </div>
  </div>
);

ApplicantsPage.propTypes = {
  // 'hacker', 'mentor', 'volunteer'
  applicantType: PropTypes.string,
  // documents from <applicantType>_short_info
  applicants: PropTypes.array,
  // the id of the applicant that's currrently selected
  selectedApplicantId: PropTypes.string,
  // handler for switching between applicant types
  switchApplicantType: PropTypes.func,
  // handler for applicant click
  onApplicantClick: PropTypes.func,
  // is the user currently selecting filters
  isSelectingFilters: PropTypes.bool,
  // has the user applied any filters
  areFiltersApplied: PropTypes.bool,
  // handler for hiding filter options
  showFilterOptions: PropTypes.func,
  // get list of currently applied filters
  getAppliedFilters: PropTypes.func,
  // handler for hiding filter options
  hideFilterOptions: PropTypes.func,
  // handler for applying filter options
  applyFilters: PropTypes.func,
  // what to sort by
  sortType: PropTypes.string,
  // Sort type handler
  switchSortType: PropTypes.func,
  // Change the direction for sorting
  switchSortDirection: PropTypes.func,
  // Current sort direction
  sortDirection: PropTypes.string,
  // checks all applicants
  checkAllApplicants: PropTypes.func,
  // unchecks all applicants
  uncheckAllApplicants: PropTypes.func,
  // checks a specific applicant
  checkApplicant: PropTypes.func,
  // unchecks a specific applicant
  uncheckApplicant: PropTypes.func,
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
  // Exports all applicants into a csv
  exportApplicants: PropTypes.func,
};

export default ApplicantsPage;
