import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ScoreButtonGroup } from './ScoreButtonGroup';
import applicantCollections from '../../../../util/applicantCollections';
import { criteria, calculateFinalScore } from './Criteria';

const mapPropsToQueries = (props) => {
  const { applicantType, applicantId } = props;
  return [
    { collection: applicantCollections[applicantType].shortInfo, doc: applicantId },
  ];
};

class ScorePanel extends React.Component {
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
        return `${admin.firstName} ${admin.lastName}`;
      }
    }
    return null;
  }

  // converts unix timestamp to string of form 'HH:MM AM/PM SHORT_MONTH DAY YEAR'
  getDateLastScored = (unixTimestamp) => {
    const dateObj = new Date(unixTimestamp);
    const time = dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const date = dateObj.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${time} ${date}`.replace(/,/, '');
  }

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

  // returns the applicant's score for a given criteria
  getCriteriaScoreValue = (criteriaName) => {
    const criteriaInfo = this.getCriteriaInfo(criteriaName);
    return criteriaInfo ? criteriaInfo.value : null;
  }

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

  // sets score info for an applicant's criteria
  setCriteriaInfo = (criteriaName, score) => {
    const { store } = this.context;
    const { firestore, firebase } = store;
    const { applicantId } = this.props;
    if (applicantId && criteriaName && typeof score === 'number') {
      const auth = firebase.auth();
      const { currentUser: { uid } } = auth;
      const collectionName = this.getApplicantShortInfoCollectionName();
      const applicantRef = firestore.collection(collectionName).doc(applicantId);
      const fieldPath = `score.${criteriaName}`;
      const scoreInfo = {
        value: score,
        lastScoredBy: uid,
        lastScoredAt: Date.now(),
      };
      applicantRef.update({
        [fieldPath]: scoreInfo,
      }).then(() => this.updateFinalScore());
    }
  }

  // sets an applicant's finalScore to given value
  setFinalScore = (finalScore) => {
    const { store } = this.context;
    const { firestore } = store;
    const { applicantId } = this.props;
    if (typeof finalScore === 'number') {
      const collectionName = this.getApplicantShortInfoCollectionName();
      const applicantRef = firestore.collection(collectionName).doc(applicantId);
      applicantRef.update({
        'score.finalScore': finalScore,
      });
    }
  }

  // returns a map containing criteria names as keys
  // and applicant's criteria scores as values
  getAllCriteriaScores = () => criteria.reduce((map, obj) => {
    map[obj.name] = this.getCriteriaScoreValue(obj.name);
    return map;
  }, {})

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

  // returns true if all criteria have been scored for the applicant, false otherwise
  isAllCriteriaScored = () => {
    for (let i = 0; i < criteria.length; i += 1) {
      const criteriaScore = this.getCriteriaScoreValue(criteria[i].name);
      if (criteriaScore === null) {
        return false;
      }
    }
    return true;
  }

  // calculates and sets applicant's score.finalScore based on applicant's criteria scores
  updateFinalScore = () => {
    if (this.isAllCriteriaScored()) {
      // only calculate final score if all criteria are scored
      const scores = this.getAllCriteriaScores();
      const finalScore = calculateFinalScore(scores);
      this.setFinalScore(finalScore);
    }
  }

  render() {
    const { className, applicantType } = this.props;
    const finalScore = this.getFinalScore();

    return (applicantType === 'hacker') ? (
      <div className={`score-panel flex jc-between dir-col ${className}`} zoom="50%">
        <div className="score-buttons">
          <div className="score-panel-title">Scoring</div>
          {criteria.map(c => (
            <ScoreButtonGroup
              numButtons={5}
              getScore={this.getCriteriaScoreValue}
              setScore={this.setCriteriaInfo}
              criteriaName={c.name}
              key={c.name}
              title={c.title}
            />
          ))}
        </div>
        <div className="score-history pad-top-s pad-sides-s">
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
      </div>
    ) : (
      <div className="pad-top-xs pad-left-xs">
        Scoring not yet supported for {applicantType}.
      </div>
    );
  }
}

ScorePanel.propTypes = {
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
)(ScorePanel);
