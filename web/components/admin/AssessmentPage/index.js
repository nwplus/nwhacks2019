import React from 'react';
import PropTypes from 'prop-types';
import ApplicantList from '../ApplicantList';
import ApplicantInfo from '../ApplicantInfo';
import ScorePanel from './ScorePanel';
import Toolbar from '../Toolbar';
import FilterModal from '../FilterModal';

const AssessmentPage = ({
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
  searchApplicants,
  switchNFCdevice,
}) => (
  <div className="dashboard">
    {/* TODO: TOOLBAR */}
    <Toolbar
      pageType="assessment"
      applicantType={applicantType}
      switchApplicantType={switchApplicantType}
      areFiltersApplied={areFiltersApplied}
      showFilterOptions={showFilterOptions}
      sortType={sortType}
      switchSortType={switchSortType}
      switchSortDirection={switchSortDirection}
      sortDirection={sortDirection}
      searchApplicants={searchApplicants}
      switchNFCdevice={switchNFCdevice}
    />
    <FilterModal
      isOpen={isSelectingFilters}
      getAppliedFilters={getAppliedFilters}
      hideFilterOptions={hideFilterOptions}
      applyFilters={applyFilters}
      applicantType={applicantType}
    />
    <div className="assessment-applicant-view flex">
      {/* APPLICANT LIST */}
      <ApplicantList
        pageType="assessment"
        applicants={applicants}
        selectedApplicantId={selectedApplicantId}
        onApplicantClick={onApplicantClick}
        className={`${!selectedApplicantId ? 'fill-min-width' : ''}`}
        sortType={sortType}
        sortDirection={sortDirection}
      />
      {/* SCORE PANEL */}
      <ScorePanel
        applicantId={selectedApplicantId}
        applicantType={applicantType}
        className={`${!selectedApplicantId ? 'display-none' : ''}`}
      />
      {/* APPLICANT INFO PANEL */}
      <ApplicantInfo
        showAssessmentFieldsOnly
        applicantId={selectedApplicantId}
        applicantType={applicantType}
        className={`${!selectedApplicantId ? 'display-none' : ''}`}
      />
    </div>
  </div>
);

AssessmentPage.propTypes = {
  // 'hacker', 'mentor', 'volunteer'
  applicantType: PropTypes.string,
  // documents from <applicantType>_main_info
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
  // Exports all applicants into a csv
  exportApplicants: PropTypes.func,
  // Executes fuzzy search on applicants
  searchApplicants: PropTypes.func,
  // Switch between different NFC devices
  switchNFCdevice: PropTypes.func,
};

export default AssessmentPage;
