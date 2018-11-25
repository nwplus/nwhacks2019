import React from 'react';
import PropTypes from 'prop-types';
import ApplicantList from '../ApplicantList';

const AssessmentPanel = ({
  applicantType,
  applicants,
  selectedApplicantMainInfo,
  selectedApplicantLongInfo,
  onApplicantClick }) => (
    <div className="dashboard">
      <div className="toolbar pad-sides-s pad-top-s fill-width">

        <i>TODO: Toolbar component</i> <br />
        Collection: {applicantType}

      </div>
      <div className="applicant-view flex">
        <ApplicantList
          applicants={applicants}
          selectedApplicantId={selectedApplicantMainInfo.id}
          onApplicantClick={onApplicantClick} />
        <div className="middle-col pad-sides-s pad-top-s"><i>TODO: Score panel component</i></div>
        <div className="applicant-info pad-sides-s pad-ends-s">
          <i>TODO: Applicant info component</i>
          <br /><br />
          <h5>Main info</h5>
          {JSON.stringify(selectedApplicantMainInfo)}
          <br /><br />
          <h5>Long info</h5>
          {JSON.stringify(selectedApplicantLongInfo)}
        </div>
      </div>
    </div>
);

AssessmentPanel.propTypes = {
  applicantType: PropTypes.string,
  applicants: PropTypes.object,
  selectedApplicantMainInfo: PropTypes.object,
  selectedApplicantLongInfo: PropTypes.object,
  onApplicantClick: PropTypes.func,
};

export default AssessmentPanel;
