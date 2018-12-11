import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AssessmentPage from '../../../components/admin/AssessmentPage';
import applicantCollections from '../../../util/applicantCollections';

class AssessmentPageContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      applicantType: 'hacker',
      selectedApplicantId: null,
      sortType: null,
    };
  }

  componentWillMount() {
    this.loadApplicants();
  }

  componentWillUnmount() {
    this.unloadApplicants();
  }

  // handles selecting an applicant
  selectApplicant = (applicantId) => {
    this.setState({ selectedApplicantId: applicantId });
  }

  // Fills state.firestore.data.applicants by listening to <applicantType>_main_info collection
  loadApplicants = () => {
    const { store } = this.context;
    const { firestore } = store;
    const { applicantType } = this.state;
    firestore.setListener({
      collection: applicantCollections[applicantType].shortInfo,
      orderBy: 'timestamp',
    });
  }

  // Clears state.firestore.data.applicants by unlistening to <applicantType>_main_info collection
  unloadApplicants = () => {
    const { store } = this.context;
    const { firestore } = store;
    const { applicantType } = this.state;
    firestore.unsetListener({
      collection: applicantCollections[applicantType].shortInfo,
      orderBy: 'timestamp',
    });
  }

  // switches applicant types (hacker, mentor, volunteer)
  switchApplicantType = (newApplicantType) => {
    this.unloadApplicants(); // remove listener for old applicantType's collections
    this.setState({
      applicantType: newApplicantType,
      selectedApplicantId: null,
    }, () => {
      this.loadApplicants(); // add listener for new applicantType's collections
    });
  }

  switchSortType = (newSortType) => {
    this.setState({
      sortType: newSortType,
      selectedApplicantId: null,
    });
  };

  sortApplicants = (sortType, applicants) => {
    switch (sortType) {
      case 'name':
        return null;
      case 'email':
        return null;
      case 'score':
        return null;
      case 'timestamp':
        return null;
      default:
        return applicants;
    }
  };

  render() {
    const {
      applicantType,
      selectedApplicantId,
      sortType,
    } = this.state;

    const {
      firestore,
    } = this.props;
    const shortInfoCollectionName = applicantCollections[applicantType].shortInfo;
    const applicants = firestore.ordered[shortInfoCollectionName];
    let sortedApplicants = null;
    if (sortType) {
      sortedApplicants = this.sortApplicants(sortType, applicants);
    } else {
      sortedApplicants = null;
    }

    if (!isLoaded(applicants)) {
      return (<span>Loading...</span>);
    }
    return (
      <div>
        <AssessmentPage
          applicantType={applicantType}
          applicants={sortedApplicants || applicants}
          selectedApplicantId={selectedApplicantId}
          switchApplicantType={this.switchApplicantType}
          onApplicantClick={this.selectApplicant}
        />
      </div>
    );
  }
}

AssessmentPageContainer.propTypes = {
  firestore: PropTypes.object,
};

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect((state) => {
    return {
      firestore: state.firestore,
    };
  }),
)(AssessmentPageContainer);
