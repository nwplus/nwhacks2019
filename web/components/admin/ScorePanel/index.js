import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import applicantCollections from '../../../util/applicantCollections';

const mapPropsToQueries = (props) => {
  const { applicantType, applicantId } = props;
  return [
    { collection: applicantCollections[applicantType].shortInfo, doc: applicantId },
  ];
};

class ScorePanel extends React.Component {
  getApplicantShortInfo = () => {
    const { firestore, applicantId, applicantType } = this.props;
    if (!applicantId || !applicantType) {
      return null;
    }
    const shortInfoCollectionName = applicantCollections[applicantType].shortInfo;
    const applicantShortInfo = firestore.data[shortInfoCollectionName][applicantId];
    return applicantShortInfo;
  }

  render() {
    const { className } = this.props;
    const shortInfo = this.getApplicantShortInfo();
    return (
      <div className={`score-panel pad-sides-s pad-top-s ${className}`}>
        <i>TODO: Score panel component</i><br />
        ID: {shortInfo ? shortInfo.id : ''}
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
