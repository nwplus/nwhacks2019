import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ScoreButtonGroup } from './ScoreButtonGroup';
import ScoreHistory from './ScoreHistory';
import applicantCollections from '../../../../util/applicantCollections';
import { criteria, calculateFinalScore } from '../Criteria';

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

  // returns applicant's score info for a given criteria
  getCriteriaInfo = (criteriaName) => {
    const shortInfo = this.getApplicantShortInfo();
    if (shortInfo && shortInfo.score) {
      return shortInfo.score[criteriaName];
    }
    return null;
  }

  // returns the applicant's score for a given criteria
  getCriteriaScoreValue = (criteriaName) => {
    const criteriaInfo = this.getCriteriaInfo(criteriaName);
    return criteriaInfo ? criteriaInfo.value : null;
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
      const applicantScore = {
        [fieldPath]: scoreInfo,
      };
      const scores = { ...this.getAllCriteriaScores(), [criteriaName]: score };
      // only calculate final score if all criteria are scored
      if (this.isAllCriteriaScored(scores)) {
        const finalScore = calculateFinalScore(scores);
        applicantScore['score.finalScore'] = finalScore;
      }
      applicantRef.update(applicantScore);
    }
  }

  // returns a map containing criteria names as keys
  // and applicant's criteria scores as values
  getAllCriteriaScores = () => criteria.reduce((map, obj) => {
    map[obj.name] = this.getCriteriaScoreValue(obj.name);
    return map;
  }, {})

  // returns true if all criteria have been scored for the applicant, false otherwise
  isAllCriteriaScored = (scores) => {
    for (let i = 0; i < criteria.length; i += 1) {
      const criteriaName = criteria[i].name;
      const criteriaScore = scores[criteriaName];
      if (criteriaScore == null) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { className, applicantType } = this.props;

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
        <ScoreHistory {...this.props} />
      </div>
    ) : (
      <div className="pad-top-xs pad-left-xs">
        Assessment not enabled for {applicantType}.<br />
        Please manually select and tag accepted {applicantType}s
        through the <i>Applicants</i> page.
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
