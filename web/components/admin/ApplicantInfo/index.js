import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import applicantCollections from '../../../util/applicantCollections';
import ShortField from '../shortField';

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
  }

  render() {
    const { className } = this.props;
    const shortInfo = this.getApplicantShortInfo();
    return (
      <div className={`applicant-info pad-sides-s pad-ends-s ${className}`}>
        <i>TODO: Applicant info component</i>
        <ShortField label="First name" value={shortInfo ? shortInfo.firstName : ''} />
        <ShortField label="Last name" value={shortInfo ? shortInfo.lastName : ''} />
        <ShortField label="Email" value={shortInfo ? shortInfo.email : ''} />
        <ShortField label="City" value={shortInfo ? shortInfo.city : ''} />
        <ShortField label="School" value={shortInfo ? shortInfo.school : ''} />
        <ShortField label="Gender" value={shortInfo ? shortInfo.gender : ''} />
        <ShortField label="Birthday" value={shortInfo ? shortInfo.birthdate : ''} />
        <ShortField label="Education" value={shortInfo ? shortInfo.education : ''} />
        <ShortField label="Grad year" value={shortInfo ? shortInfo.gradYear : ''} />
        <ShortField label="Travel" value={shortInfo ? shortInfo.travel : ''} />
        <ShortField label="Major" value={shortInfo ? shortInfo.major : ''} />
        <ShortField label="Phone Number" value={shortInfo ? shortInfo.phoneNumber : ''} />
        <ShortField label="Ethnicity" value={shortInfo ? shortInfo.ethnicity : ''} />
        <ShortField label="First Hackathon?" value={shortInfo ? shortInfo.isFirstHackathon : ''} />
        <ShortField label="Github" value={shortInfo ? shortInfo.githubLink : ''} />
        <ShortField label="Personal Website" value={shortInfo ? shortInfo.personalWebsiteLink : ''} />
        <ShortField label="LinkedIn" value={shortInfo ? shortInfo.linkedInLink : ''} />
        <ShortField label="Resume" value={shortInfo ? shortInfo.resumeLink : ''} />
        <ShortField label="Developer?" value={shortInfo ? shortInfo.isDeveloper : ''} />
        <ShortField label="Hardware?" value={shortInfo ? shortInfo.isHardware : ''} />
        <ShortField label="Designer?" value={shortInfo ? shortInfo.isDesigner : ''} />
        {/* <h5>Short info</h5> */}
        {/* {JSON.stringify(this.getApplicantShortInfo())} */}
        {/* <h5>Long info</h5> */}
        {/* {JSON.stringify(this.getApplicantLongInfo())} */}
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
