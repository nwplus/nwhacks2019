import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

import Application from '../Application';
import { changeHackerApplicationPage, changeHackerApplicationLastValidIndex, addHackerApplication, ACTION_TYPES } from '../../../actions';
import propTypesTemplates from '../../../prop-types-templates';
import { getFromFirestore } from '../../../services/firestore';
import { initialState as hackerApplicationInitialState } from '../../../reducers/entities/application/hacker';

import PageOne from '../../../components/application/hacker/pages/PageOne/PageOne';
import PageTwo from '../../../components/application/hacker/pages/PageTwo/PageTwo';

export class HackerApplicationContainer extends React.Component {
  static signUp(firebase, userCredentials) {
    const auth = firebase.auth();
    const { email, password } = userCredentials;
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      console.log('user successfully created!');
    }).catch((error) => {
      console.err('failed to create user: ', error);
    });
  }

  submitApplication = (userCredentials) => {
    const {
      firebase,
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
    } else {
      console.log('application submitted');
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

    const { application: { enabled: isApplicationEnabled } } = featureFlagsData;
    if (!isApplicationEnabled) return (<Redirect to="page_not_found" />);

    const {
      hackerApplication,
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
        application={hackerApplication}
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
          hacker: hackerApplication,
        },
      },
      ui: {
        application: {
          hacker: {
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
    hackerApplication,
    activeIndex,
    lastValidIndex,
    featureFlags,
    firebase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => {
      dispatch(changeHackerApplicationPage(page));
    },
    changeLastActiveIndex: (index) => {
      dispatch(changeHackerApplicationLastValidIndex(index));
    },
    updateApplication: (app) => {
      dispatch(addHackerApplication(app));
    },
    cancelApplication: () => {
      dispatch({ type: ACTION_TYPES.CANCEL_HACKER_APPLICATION });
    },
    resetApplicationUI: () => {
      dispatch({ type: ACTION_TYPES.RESET_HACKER_UI });
    },
  };
};

HackerApplicationContainer.defaultProps = {
  hackerApplication: hackerApplicationInitialState,
};

HackerApplicationContainer.propTypes = {
  hackerApplication: propTypesTemplates.application.hacker,
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
)(withFirebase(HackerApplicationContainer));
