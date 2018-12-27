import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import applicantCollections from '../../../util/applicantCollections';
import { FIELDS, TRAVEL } from './FieldLabels';
import ShortField from './ShortField';
import LongField from './LongField';

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
    const shortInfoCollection = firestore.data[shortInfoCollectionName];
    if (isLoaded(shortInfoCollection)) {
      return shortInfoCollection[applicantId];
    }
    return {};
  }

  getApplicantLongInfo = () => {
    const { firestore, applicantId, applicantType } = this.props;
    if (!applicantId || !applicantType) {
      return null;
    }
    const longInfoCollectionName = applicantCollections[applicantType].longInfo;
    const longInfoCollection = firestore.data[longInfoCollectionName];
    if (isLoaded(longInfoCollection)) {
      return longInfoCollection[applicantId];
    }
    return {};
  };

  // returns field names needed for assessing applicants
  getAssessmentFieldNamesOnly = () => {
    return {
      shortInfo: [
        'isFirstHackathon',
        'githubLink',
        'personalWebsiteLink',
        'linkedInLink',
        'resumeLink',
      ],
      longInfo: [
        'interestForNwHacks',
        'recentProject',
      ],
    };
  };

  // returns all field names for an applicant
  getAllFieldNames = () => {
    return {
      shortInfo: [
        'firstName',
        'lastName',
        'email',
        'birthdate',
        'gender',
        'ethnicity',
        'city',
        'travel',
        'phoneNumber',
        'school',
        'education',
        'major',
        'gradYear',
        'isFirstHackathon',
        'githubLink',
        'personalWebsiteLink',
        'linkedInLink',
        'resumeLink',
        'source',
      ],
      longInfo: [
        'interestForNwHacks',
        'recentProject',
      ],
    };
  }

  render() {
    const { applicantType, className, showAssessmentFieldsOnly } = this.props;
    const shortInfo = this.getApplicantShortInfo();
    const longInfo = this.getApplicantLongInfo();
    if (applicantType !== 'hacker') {
      return (
        <i>TODO: Applicant info component</i>
      );
    }
    const applicantFields = showAssessmentFieldsOnly
      ? this.getAssessmentFieldNamesOnly()
      : this.getAllFieldNames();
    return (
      <div className={`applicant-info pad-sides-m pad-ends-m ${className}`}>
        {applicantFields.shortInfo.map((fieldName) => {
          const label = FIELDS[fieldName];
          let value = shortInfo ? shortInfo[fieldName] : '';
          if (fieldName === 'travel') value = TRAVEL[value];
          return (
            <ShortField
              key={label}
              label={label}
              value={value}
            />);
        })}
        {applicantFields.longInfo.map(fieldName => (
          <LongField
            key={FIELDS[fieldName]}
            label={FIELDS[fieldName]}
            value={longInfo ? longInfo[fieldName] : ''} />
        ))}
        {/* <ShortField label={FieldLabels.isFirstHackathon} value={shortInfo ? shortInfo.isFirstHackathon : ''} />
        <ShortField isUrl label={FieldLabels.githubLink} value={shortInfo ? shortInfo.githubLink : ''} />
        <ShortField isUrl label={FieldLabels.personalWebsiteLink} value={shortInfo ? shortInfo.personalWebsiteLink : ''} />
        <ShortField isUrl label={FieldLabels.linkedInLink} value={shortInfo ? shortInfo.linkedInLink : ''} />
        <ShortField isUrl label={FieldLabels.resumeLink} value={shortInfo ? shortInfo.resumeLink : ''} />
        <LongField label={FieldLabels.interestForNwHacks} value={longInfo ? longInfo.interestForNwHacks : ''} />
        <LongField label={FieldLabels.recentProject} value={longInfo ? longInfo.recentProject : ''} /> */}
      </div>
    );
  }
}

ApplicantInfo.propTypes = {
  firestore: PropTypes.object,
  applicantType: PropTypes.string,
  applicantId: PropTypes.string,
  showAssessmentFieldsOnly: PropTypes.bool,
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
