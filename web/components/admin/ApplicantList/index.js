import React from 'react';
import PropTypes from 'prop-types';

class ApplicantList extends React.Component {
  render() {
    const { applicants, selectedApplicantId, onApplicantClick, className } = this.props;
    let applicantNumber = 0;

    if (!applicants) return null;
    return (
      <div className={`applicant-list ${className}`}>
        {applicants.filter(applicant => applicant.firstName === 'Carol').map((applicant) => {
          // console.log(applicant.firstName);
          const { id, firstName, lastName, email, finalScore } = applicant;
          applicantNumber += 1;
          return (
            <div
              className={`applicant flex ${selectedApplicantId === id ? 'selected' : ''}`}
              key={id}
              onClick={() => onApplicantClick(id)}
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
  applicants: PropTypes.array,
  selectedApplicantId: PropTypes.string,
  onApplicantClick: PropTypes.func,
  className: PropTypes.string,
};

export default ApplicantList;
