import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '../../input/buttons';

class ApplicantList extends React.Component {
  renderForAssessmentPage() {
    const { applicants, selectedApplicantId, onApplicantClick, className } = this.props;
    let applicantNumber = 0;
    if (!applicants) return null;
    return (
      <div className={`applicant-list ${className}`}>
        {applicants.map((applicant) => {
          const { id, firstName, lastName, email, score } = applicant;
          const finalScore = score ? score.finalScore : null;
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
                <div className={`score ${finalScore ? 'exists' : ''}`}>{finalScore}/10</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  renderForApplicantsPage() {
    const {
      applicants, selectedApplicantId, onApplicantClick,
      checkApplicant, uncheckApplicant, checkedApplicantIds,
      className,
    } = this.props;
    let applicantNumber = 0;
    if (!applicants) return null;
    return (
      <div className={`applicant-list ${className}`}>
        {applicants.map((applicant) => {
          const { id, firstName, lastName, email, score } = applicant;
          const finalScore = score ? score.finalScore : null;
          applicantNumber += 1;
          return (
            <div
              className={`applicant flex ${selectedApplicantId === id ? 'selected' : ''}`}
              key={id}
              onClick={() => onApplicantClick(id)}
            >
              <Checkbox
                value={id}
                checked={checkedApplicantIds[id] != null}
                onChange={() => (
                  checkedApplicantIds[id] ? uncheckApplicant(id) : checkApplicant(id)
                )}
                isControlled
                className="checkbox" />
              <div className="pad-left-m">
                <div className="name">{firstName} {lastName}</div>
                <div className="email">{email}</div>
              </div>
              <div className="right margin-ends-s flex-no-shrink">
                <div className="order">{applicantNumber}</div>
                <div className={`score ${finalScore ? 'exists' : ''}`}>{finalScore}/10</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { pageType } = this.props;
    switch (pageType) {
      case 'assessment':
        return this.renderForAssessmentPage();
      default:
      case 'applicants':
        return this.renderForApplicantsPage();
    }
  }
}

ApplicantList.defaultProps = {
  className: '',
};

ApplicantList.propTypes = {
  // list of applicants
  applicants: PropTypes.array,
  // currently selected applicant's ID
  selectedApplicantId: PropTypes.string,
  // when an applicant is clicked
  onApplicantClick: PropTypes.func,
  // for additional styles
  className: PropTypes.string,
  // 'assessment' or 'applicants'
  pageType: PropTypes.string,
  // checks a specific applicant
  checkApplicant: PropTypes.func,
  // unchecks a specific applicant
  uncheckApplicant: PropTypes.func,
  // when an applicant's checkbox is checked
  onApplicantCheck: PropTypes.func,
  // currently checked applicants
  checkedApplicantIds: PropTypes.object,
};

export default ApplicantList;
