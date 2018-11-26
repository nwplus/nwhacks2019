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

class ApplicantInfo extends React.Component {
  getApplicantShortInfo = () => {
    const { firestore, applicantId, applicantType } = this.props;
    if (!applicantId || !applicantType) {
      return null;
    }
    const shortInfo = firestore.ordered[applicantCollections[applicantType].shortInfo];
    const applicantShortInfo = shortInfo.find(applicant => applicant.id === applicantId);
    return applicantShortInfo;
  }

  getApplicantLongInfo = () => {
    const { firestore, applicantId, applicantType } = this.props;
    if (!applicantId || !applicantType) {
      return null;
    }
    const longInfo = firestore.data[applicantCollections[applicantType].longInfo][applicantId];
    return longInfo;
  }

  render() {
    const { className } = this.props;
    return (
      <div className={`applicant-info pad-sides-s pad-ends-s ${className}`}>
        <i>TODO: Applicant info component</i>
        <h5>Short info</h5>
        {JSON.stringify(this.getApplicantShortInfo())}
        <h5>Long info</h5>
        {JSON.stringify(this.getApplicantLongInfo())}
      </div>
    );
  }
}

ApplicantInfo.propTypes = {
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
)(ApplicantInfo);
