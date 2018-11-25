import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AssessmentPanel from '../../../components/admin/AssessmentPanel';

class AssessmentPanelContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      // one of 'hacker', 'mentor', 'volunteer'
      applicantType: 'hacker',
      // all documents from <applicantType>_main_info collection
      applicants: {},
      // single document from <applicantType>_main_info for selected applicant
      selectedApplicantMainInfo: {},
      // single document from <applicantType>_long_info collection for selected applicant
      selectedApplicantLongInfo: {},
    };
  }

  componentWillMount() {
    this.setState({ applicants: this.getApplicants() });
  }

  // returns all documents from <applicantType>_main_info
  getApplicants() {
    const {
      firestore,
    } = this.props;

    const { applicantType } = this.state;
    const { hackerMainInfo, volunteerMainInfo, mentorMainInfo } = firestore.data;
    const applicants = {
      hacker: hackerMainInfo,
      volunteer: volunteerMainInfo,
      mentor: mentorMainInfo,
    };
    return applicants[applicantType];
  }

  // promise which returns <applicant_type>_long_info document for a particular applicant
  getLongInfo(applicantId) {
    const { applicantType } = this.state;
    // http://docs.react-redux-firebase.com/history/v2.0.0/docs/firestore.html#manual
    const { store } = this.context;
    const { firestore } = store;

    const longInfoCollections = {
      hacker: 'hacker_long_info',
      volunteer: 'volunteer_long_info',
      mentor: 'mentor_long_info',
    };

    return firestore.get(
      { collection: longInfoCollections[applicantType], doc: applicantId }
    ).then(doc => doc.data());
  }

  // handles selecting an applicant
  selectApplicant = (e) => {
    const { applicants } = this.state;
    const applicantId = e.currentTarget.getAttribute('data-applicant-id');
    this.setState({ selectedApplicantMainInfo: applicants[applicantId] });
    this.getLongInfo(applicantId).then((data) => {
      this.setState({ selectedApplicantLongInfo: data });
    });
  }

  render() {
    const {
      applicantType,
      applicants,
      selectedApplicantMainInfo,
      selectedApplicantLongInfo,
    } = this.state;

    if (!isLoaded(applicants)) {
      return (<span>Loading...</span>);
    }
    return (
      <div>
        <AssessmentPanel
          applicantType={applicantType}
          applicants={applicants}
          selectedApplicantMainInfo={selectedApplicantMainInfo}
          selectedApplicantLongInfo={selectedApplicantLongInfo}
          onApplicantClick={this.selectApplicant}
        />
      </div>
    );
  }
}

AssessmentPanelContainer.propTypes = {
  firestore: PropTypes.object,
};

export default compose(
  firebaseConnect(),
  firestoreConnect([
    {
      collection: 'hacker_full_info',
      storeAs: 'hackerMainInfo',
      orderBy: 'timestamp',
    },
    {
      collection: 'volunteer_full_info',
      storeAs: 'volunteerMainInfo',
      orderBy: 'timestamp',
    },
    {
      collection: 'mentor_full_info',
      storeAs: 'mentorMainInfo',
      orderBy: 'timestamp',
    },
  ]),
  connect((state) => {
    return {
      firestore: state.firestore,
    };
  }),
)(AssessmentPanelContainer);
