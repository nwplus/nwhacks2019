import React from 'react';
import PropTypes from 'prop-types';
import ApplicantList from '../ApplicantList';
import ApplicantInfoPanel from '../ApplicantInfoPanel';

const AssessmentPanel = ({
  applicantType,
  applicants,
  selectedApplicantId,
  switchApplicantType,
  onApplicantClick,
}) => (
  <div className="dashboard">

    {/* TOOLBAR */}
    <div className="toolbar pad-sides-s pad-top-s fill-width">
      <i>TODO: Toolbar component</i> <br />
        Collection: {applicantType}
      <button type="button" onClick={() => switchApplicantType('mentor')}>Mentor</button>
    </div>

    <div className="applicant-view flex">

      {/* APPLICANT LIST */}
      <ApplicantList
        applicants={applicants}
        selectedApplicantId={selectedApplicantId}
        onApplicantClick={onApplicantClick}
        className={`${!selectedApplicantId ? 'fill-min-width' : ''}`} />

      {/* SCORE PANEL */}
      <div className={`middle-col pad-sides-s pad-top-s ${!selectedApplicantId ? 'display-none' : ''}`}>
        <i>TODO: Score panel component</i>
      </div>

      {/* APPLICANT INFO PANEL */}
      <div className={`applicant-info pad-sides-s pad-ends-s  ${!selectedApplicantId ? 'display-none' : ''}`}>
        <i>TODO: Applicant info component</i>
        <ApplicantInfoPanel
          applicantId={selectedApplicantId}
          applicantType={applicantType}
        />

      </div>
    </div>
  </div>
);

AssessmentPanel.propTypes = {
  // 'hacker', 'mentor', 'volunteer'
  applicantType: PropTypes.string,
  // documents from <applicantType>_main_info
  applicants: PropTypes.object,
  // the id of the applicant that's currrently selected
  selectedApplicantId: PropTypes.string,
  // handler for switching between applicant types
  switchApplicantType: PropTypes.func,
  // handler for applicant click
  onApplicantClick: PropTypes.func,
};

export default AssessmentPanel;
