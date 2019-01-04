import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import applicantCollections from '../../../../util/applicantCollections';
import ScoreHistory from '../../AssessmentPage/ScorePanel/ScoreHistory';
import Tag from '../../Tag';

const mapPropsToQueries = (props) => {
  const { applicantType, applicantId } = props;
  return [
    { collection: applicantCollections[applicantType].shortInfo, doc: applicantId },
  ];
};

class ApplicantMetadata extends React.Component {
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

  // removes a tag from applicant
  removeTagFromApplicant = (tagName) => {
    const { applicantId } = this.props;
    const { store: { firestore: db } } = this.context;
    const { tags } = this.getApplicantShortInfo() || {};
    if (tags != null) {
      delete tags[tagName];
      const collectionName = this.getApplicantShortInfoCollectionName();
      const applicantRef = db.collection(collectionName).doc(applicantId);
      applicantRef.update({ tags });
    }
  }

  render() {
    const { className } = this.props;
    const applicantInfo = this.getApplicantShortInfo();
    const { tags } = applicantInfo || {};
    const applicantHasTags = tags && Object.keys(tags).length > 0;
    return (
      <div className={`applicant-metadata flex jc-between dir-col ${className}`} zoom="50%">
        <div className="tags">
          <div className="primary-text">Tags</div>
          <div className="flex wrap">
            {applicantHasTags ? Object.keys(tags).map(tagName => (
              <Tag
                tagName={tagName}
                key={tagName}
                allowDelete
                deleteTag={this.removeTagFromApplicant}
              />
            )) : (<div className="secondary-text"> No tags found </div>)}
          </div>
        </div>
        <ScoreHistory {...this.props} />
      </div>
    );
  }
}

ApplicantMetadata.propTypes = {
  firestore: PropTypes.object,
  applicantId: PropTypes.string,
  applicantType: PropTypes.string,
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
)(ApplicantMetadata);
