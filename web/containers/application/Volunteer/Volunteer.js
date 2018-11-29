import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import Axios from 'axios';

import Application from '../Application';
import { changeVolunteerApplicationPage, changeVolunteerApplicationLastValidIndex, addVolunteerApplication, ACTION_TYPES } from '../../../actions';
import propTypesTemplates from '../../../prop-types-templates';
import { getFromFirestore } from '../../../services/firestore';
import { initialState as volunteerApplicationInitialState } from '../../../reducers/entities/application/volunteer';

import PageOne from '../../../components/application/volunteer/pages/PageOne/PageOne';
import PageTwo from '../../../components/application/volunteer/pages/PageTwo/PageTwo';

class VolunteerApplicationContainer extends React.Component {
  static signUp(firebase, userCredentials) {
    const auth = firebase.auth();
    const { email, password } = userCredentials;
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      console.log('user successfully created!');
    }).catch((error) => {
      console.err('failed to create user: ', error);
    });
  }

  constructor(props) {
    super(props);
    this.state = { isSubmitted: false };
  }

  submitApplication = (userCredentials, recaptchaResponse, onSubmitFailCallback) => {
    const {
      firebase,
      volunteerApplication,
      cancelApplication,
      featureFlags: {
        data: {
          auth: {
            enabled: isAuthEnabled,
          },
        },
      },
    } = this.props;

    if (isAuthEnabled) {
      this.signUp(firebase, userCredentials);
    }

    // include recaptcha token in payload for verification in cloud function
    volunteerApplication.recaptchaResponse = recaptchaResponse;

    if (!volunteerApplication.isSubmitted) {
      // POST application data to cloud function for submission
      Axios.post(
        firebase.nwUtils.getFunctionUrl('submitApplicationVolunteer'),
        volunteerApplication,
        { headers: { 'Content-Type': 'text/plain' } }
      ).then((res) => {
        if (res.status === 200) {
          console.log('Submitted volunteerApplication!');
          this.setState({ isSubmitted: true });
          cancelApplication();
        } else {
          onSubmitFailCallback();
        }
      }).catch(() => {
        onSubmitFailCallback();
      });
    }
  }

  render() {
    const {
      featureFlags: {
        isLoaded: isFeatureFlagsLoaded,
        data: featureFlagsData,
      },
    } = this.props;

    if (!isFeatureFlagsLoaded) return null;

    const { isSubmitted } = this.state;
    if (isSubmitted) return (<Redirect to="/successVolunteer" />);

    const { application: { enabled: isApplicationEnabled } } = featureFlagsData;
    if (!isApplicationEnabled) return (<Redirect to="page_not_found" />);

    const {
      volunteerApplication,
      changePage,
      changeLastActiveIndex,
      activeIndex,
      lastValidIndex,
      updateApplication,
      cancelApplication,
      resetApplicationUI,
    } = this.props;

    const pages = [
      (<PageOne />),
      (<PageTwo />),
    ];

    return (
      <Application
        application={volunteerApplication}
        changePage={changePage}
        changeLastActiveIndex={changeLastActiveIndex}
        activeIndex={activeIndex}
        lastValidIndex={lastValidIndex}
        updateApplication={updateApplication}
        cancelApplication={cancelApplication}
        submitApplication={this.submitApplication}
        resetApplicationUI={resetApplicationUI}
        pages={pages}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    root: {
      entities: {
        application: {
          volunteer: volunteerApplication,
        },
      },
      ui: {
        application: {
          volunteer: {
            activeIndex,
            lastValidIndex,
          },
        },
      },
    },
    firestore,
    firebase,
  } = state;

  const featureFlags = getFromFirestore(firestore, 'feature_flags');

  return {
    volunteerApplication,
    activeIndex,
    lastValidIndex,
    featureFlags,
    firebase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => {
      dispatch(changeVolunteerApplicationPage(page));
    },
    changeLastActiveIndex: (index) => {
      dispatch(changeVolunteerApplicationLastValidIndex(index));
    },
    updateApplication: (app) => {
      dispatch(addVolunteerApplication(app));
    },
    cancelApplication: () => {
      dispatch({ type: ACTION_TYPES.CANCEL_VOLUNTEER_APPLICATION });
    },
    resetApplicationUI: () => {
      dispatch({ type: ACTION_TYPES.RESET_VOLUNTEER_UI });
    },
  };
};

VolunteerApplicationContainer.defaultProps = {
  volunteerApplication: volunteerApplicationInitialState,
};

VolunteerApplicationContainer.propTypes = {
  volunteerApplication: propTypesTemplates.application.hacker,
  changePage: PropTypes.func.isRequired,
  changeLastActiveIndex: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  lastValidIndex: PropTypes.number.isRequired,
  updateApplication: PropTypes.func.isRequired,
  cancelApplication: PropTypes.func.isRequired,
  resetApplicationUI: PropTypes.func.isRequired,
  featureFlags: PropTypes.object.isRequired,
  firebase: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(VolunteerApplicationContainer));
