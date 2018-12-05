import React from 'react';
import PropTypes from 'prop-types';
import ApplicantList from '../ApplicantList';
import ApplicantInfo from '../ApplicantInfo';
import ScorePanel from './ScorePanel';
import Toolbar from '../Toolbar';

const AssessmentPage = ({
  applicantType,
  applicants,
  selectedApplicantId,
  switchApplicantType,
  onApplicantClick,
}) => (
  <div className="dashboard">
    {/* TODO: TOOLBAR */}
    <Toolbar
      applicantType={applicantType}
      switchApplicantType={switchApplicantType}
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
};

export default AssessmentPage;
