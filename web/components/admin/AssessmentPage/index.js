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
}) => (
  <div className="dashboard">
    {/* TODO: TOOLBAR */}
    <Toolbar
      applicantType={applicantType}
      switchApplicantType={switchApplicantType}
      areFiltersApplied={areFiltersApplied}
      showFilterOptions={showFilterOptions}
      sortType={sortType}
      switchSortType={switchSortType}
      switchSortDirection={switchSortDirection}
      sortDirection={sortDirection}
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
        applicants={applicants}
        selectedApplicantId={selectedApplicantId}
        onApplicantClick={onApplicantClick}
        className={`${!selectedApplicantId ? 'fill-min-width' : ''}`}
      />
      {/* SCORE PANEL */}
      <ScorePanel
        applicantId={selectedApplicantId}
        applicantType={applicantType}
        className={`${!selectedApplicantId ? 'display-none' : ''}`}
      />
      {/* TODO: APPLICANT INFO PANEL */}
      <ApplicantInfo
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

};

export default AssessmentPage;
