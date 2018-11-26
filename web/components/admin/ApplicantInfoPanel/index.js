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
    { collection: applicantCollections[applicantType].longInfo, doc: applicantId },
  ];
};

class ApplicantInfoPanel extends React.Component {
  getApplicantShortInfo() {
    const { firestore, applicantId, applicantType } = this.props;
    if (!applicantId || !applicantType) {
      return null;
    }
    const shortInfo = firestore.data[applicantCollections[applicantType].shortInfo][applicantId];
    return shortInfo;
  }

  getApplicantLongInfo() {
    const { firestore, applicantId, applicantType } = this.props;
    if (!applicantId || !applicantType) {
      return null;
    }
    const longInfo = firestore.data[applicantCollections[applicantType].longInfo][applicantId];
    return longInfo;
  }

  render() {
    return (
      <div>
        <h5>Short info</h5>
        {JSON.stringify(this.getApplicantShortInfo())}
        <h5>Long info</h5>
        {JSON.stringify(this.getApplicantLongInfo())}
      </div>
    );
  }
}

ApplicantInfoPanel.propTypes = {
  firestore: PropTypes.object,
  applicantType: PropTypes.string,
  applicantId: PropTypes.string,
};

export default compose(
  firebaseConnect(),
  firestoreConnect(mapPropsToQueries),
  connect((state) => {
    return {
      firestore: state.firestore,
    };
  }),
)(ApplicantInfoPanel);
