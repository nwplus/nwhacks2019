import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import flat from 'flat';
import applicantCollections from '../../../util/applicantCollections';
import { fieldLabels, travelLabels } from './fieldLabels';
import ShortField from './ShortField';
import LongField from './LongField';
import { decodeUnixTimestamp } from '../../../util/date';

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
  getAssessmentFieldNamesOnly = applicantType => fieldLabels[applicantType]['assessment-only'];

  // returns all field names for an applicant
  getAllFieldNames = applicantType => fieldLabels[applicantType]['all-fields'];

  render() {
    const { applicantType, className, showAssessmentFieldsOnly } = this.props;
    let shortInfo = this.getApplicantShortInfo();
    const longInfo = this.getApplicantLongInfo();
    if (applicantType === 'mentor'
      || (applicantType === 'volunteer' && showAssessmentFieldsOnly)) return null;
    const applicantFields = showAssessmentFieldsOnly
      ? this.getAssessmentFieldNamesOnly(applicantType)
      : this.getAllFieldNames(applicantType);
    const rsvpInfoExists = shortInfo && shortInfo.rsvp && applicantFields.rsvpInfo;
    shortInfo = shortInfo ? flat(shortInfo, { delimiter: '_' }) : {};
    return (
      <div className={`applicant-info ${className}`}>
        {applicantFields.shortInfo.map((field) => {
          const { name, label } = field;
          let value = shortInfo ? shortInfo[name] : '';
          if (name === 'travel') value = travelLabels[value];
          if (name === 'timestamp') value = decodeUnixTimestamp(value);
          return (
            <ShortField
              key={label}
              label={label}
              value={value}
            />);
        })}
        {applicantFields.longInfo.map((field) => {
          const { name, label } = field;
          return (
            <LongField
              key={name}
              label={label}
              value={longInfo ? longInfo[name] : ''} />
          );
        })}
        {rsvpInfoExists ? applicantFields.rsvpInfo.map((field) => {
          const { name, label } = field;
          let value = shortInfo ? shortInfo[name] : '';
          if (name === 'travel') value = travelLabels[value];
          if (name === 'timestamp') value = decodeUnixTimestamp(value);
          return (
            <ShortField
              key={label}
              label={label}
              value={value}
            />);
        }) : null}
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
