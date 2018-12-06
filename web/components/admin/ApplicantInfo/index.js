import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import applicantCollections from '../../../util/applicantCollections';
import ShortField from './ShortField';
import LongField from './LongField';

const mapPropsToQueries = (props) => {
  const { applicantType, applicantId } = props;
  return [
    { collection: applicantCollections[applicantType].shortInfo, doc: applicantId },
    { collection: applicantCollections[applicantType].longInfo, doc: applicantId },
  ];
};

// converts boolean values to strings
const convertTruthy = (bool) => {
  if (bool) return 'Yes';
  return 'No';
};

class ApplicantInfo extends React.Component {
  getApplicantShortInfo = () => {
    const { firestore, applicantId, applicantType } = this.props;
    if (!applicantId || !applicantType) {
      return null;
    }
    const shortInfoCollectionName = applicantCollections[applicantType].shortInfo;
    const applicantShortInfo = firestore.data[shortInfoCollectionName][applicantId];
    return applicantShortInfo;
  }

  getApplicantLongInfo = () => {
    const { firestore, applicantId, applicantType } = this.props;
    if (!applicantId || !applicantType) {
      return null;
    }
    const longInfoCollectionName = applicantCollections[applicantType].longInfo;
    const applicantLongInfo = firestore.data[longInfoCollectionName][applicantId];
    return applicantLongInfo;
  };

  render() {
    const { applicantType, className } = this.props;
    const shortInfo = this.getApplicantShortInfo();
    const longInfo = this.getApplicantLongInfo();
    if (applicantType !== 'hacker') {
      return (
        <i>TODO: Applicant info component</i>
      );
    }
    return (
      <div className={`applicant-info pad-sides-s pad-ends-s ${className}`}>
        <ShortField label="First Hackathon?" value={shortInfo ? convertTruthy(shortInfo.isFirstHackathon) : ''} />
        <ShortField isUrl label="Github" value={shortInfo ? shortInfo.githubLink : ''} />
        <ShortField isUrl label="Personal Website" value={shortInfo ? shortInfo.personalWebsiteLink : ''} />
        <ShortField isUrl label="LinkedIn" value={shortInfo ? shortInfo.linkedInLink : ''} />
        <ShortField isUrl label="Resume" value={shortInfo ? shortInfo.resumeLink : ''} />
        <LongField label="Interest in NwHacks" value={longInfo ? longInfo.interestForNwHacks : ''} />
        <LongField label="Recent Projects" value={longInfo ? longInfo.recentProject : ''} />
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
