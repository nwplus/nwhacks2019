import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import applicantCollections from '../../../../../util/applicantCollections';
import { criteria } from '../../Criteria';
import { decodeUnixTimestamp } from '../../../../../util/date';

const mapPropsToQueries = (props) => {
  const { applicantType, applicantId } = props;
  return [
    { collection: applicantCollections[applicantType].shortInfo, doc: applicantId },
  ];
};

class ScoreHistory extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  // retrieve firestore document located at <applicantType>_short_info/<applicantId>
  getApplicantShortInfo = () => {
    const { firestore, applicantId, applicantType } = this.props;
    if (!applicantId || !applicantType) {
      return null;
    }
    const shortInfoCollectionName = this.getApplicantShortInfoCollectionName();
    const applicantShortInfo = firestore.data[shortInfoCollectionName][applicantId];
    return applicantShortInfo;
  }

  // returns name of short info collection for applicantType
  getApplicantShortInfoCollectionName = () => {
    const { applicantId, applicantType } = this.props;
    if (!applicantId || !applicantType) {
      return null;
    }
    return applicantCollections[applicantType].shortInfo;
  }

  // returns an admin's full name given the admin's UID
  getAdminFullName = (uid) => {
    if (uid) {
      const { firestore } = this.props;
      const admin = firestore.data.admins[uid];
      if (admin) {
        return `${admin.name}`;
      }
    }
    return null;
  }

  // converts unix timestamp to string of form 'HH:MM AM/PM SHORT_MONTH DAY YEAR'
  getDateLastScored = unixTimestamp => decodeUnixTimestamp(unixTimestamp)

  // returns applicant's score info for a given criteria
  getCriteriaInfo = (criteriaName) => {
    const shortInfo = this.getApplicantShortInfo();
    if (shortInfo && shortInfo.score) {
      return shortInfo.score[criteriaName];
    }
    return null;
  }

  // returns the applicant's final score
  getFinalScore = () => this.getCriteriaInfo('finalScore');

  // returns the a string representing the name and timestamp
  // of the person who last marked a given criteria for this applicant
  getScoreHistory = (criteriaName) => {
    const criteriaInfo = this.getCriteriaInfo(criteriaName);
    if (criteriaInfo) {
      const lastScoredBy = this.getAdminFullName(criteriaInfo.lastScoredBy);
      const lastScoredAt = this.getDateLastScored(criteriaInfo.lastScoredAt);
      return `${lastScoredBy} at ${lastScoredAt}`;
    }
    return 'Unscored';
  }

  // clears applicant's score information
  clearScoreInfo = () => {
    if (window.confirm("Are you sure you want to clear this applicant's score?")) { // eslint-disable-line no-alert
      const { store } = this.context;
      const { firestore } = store;
      const { applicantId } = this.props;
      const collectionName = this.getApplicantShortInfoCollectionName();
      const applicantRef = firestore.collection(collectionName).doc(applicantId);
      // set field to null then delete field (otherwise store won't refresh https://github.com/prescottprue/redux-firestore/issues/45)
      applicantRef.update({
        score: null,
      }).then(() => (
        applicantRef.update({
          score: firestore.FieldValue.delete(),
        })
      ));
    }
  }

  render() {
    const { className, applicantType } = this.props;
    const finalScore = this.getFinalScore();

    return (applicantType === 'hacker') ? (
      <div className={`score-history pad-top-s pad-sides-s ${className}`}>
        <div className="pad-bottom-s">
          <span>
            <span className="score-panel-primary-text pad-right-xs">Total score:</span>
            <span className={`score-value ${finalScore ? 'exists' : ''}`}>{finalScore}/10</span>
          </span>
          <div className="clear-btn clickable" onClick={this.clearScoreInfo}>Clear</div>
        </div>
        <div className="criteria-history">
          {criteria.map(c => (
            <div className="pad-bottom-s" key={c.name}>
              <div className="score-panel-primary-text">{c.title}</div>
              <div className="score-panel-secondary-text">{this.getScoreHistory(c.name)}</div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="pad-top-xs pad-left-xs">
        Score history not yet supported for {applicantType}.
      </div>
    );
  }
}

ScoreHistory.propTypes = {
  firestore: PropTypes.object,
  applicantType: PropTypes.string,
  applicantId: PropTypes.string,
  className: PropTypes.string,
};

export default compose(
  firebaseConnect(),
  firestoreConnect(mapPropsToQueries),
  connect((state) => {
    return {
      firestore: state.firestore,
    };
  }),
)(ScoreHistory);
