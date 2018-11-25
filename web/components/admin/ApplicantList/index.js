import React from 'react';
import PropTypes from 'prop-types';

class ApplicantList extends React.Component {
  render() {
    const { applicants, selectedApplicantId, onApplicantClick, className } = this.props;
    let applicantNumber = 0;

    return (
      <div className={`applicant-list ${className}`}>
        {Object.keys(applicants).map((key) => {
          const { firstName, lastName, email, finalScore } = applicants[key];
          applicantNumber += 1;
          return (
            <div
              className={`applicant flex ${selectedApplicantId === key ? 'selected' : ''}`}
              key={key}
              data-applicant-id={key}
              onClick={onApplicantClick}
            >
              <div className="pad-left-s">
                <div className="name">{firstName} {lastName}</div>
                <div className="email">{email}</div>
              </div>
              <div className="right margin-ends-s flex-no-shrink">
                <div className="order">{applicantNumber}</div>
                <div className="score">{finalScore}/10</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

ApplicantList.defaultProps = {
  className: '',
};

ApplicantList.propTypes = {
  applicants: PropTypes.object,
  selectedApplicantId: PropTypes.string,
  onApplicantClick: PropTypes.func,
  className: PropTypes.string,
};

export default ApplicantList;
