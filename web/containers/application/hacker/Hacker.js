import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

import { HackerApplication } from '../../../components/application';
import { changeHackerApplicationPage, changeHackerApplicationLastValidIndex, addHackerApplication, ACTION_TYPES } from '../../../actions';
import propTypesTemplates from '../../../prop-types-templates';
import { getFromFirestore } from '../../../services/firestore';
import { initialState as hackerApplicationInitialState } from '../../../reducers/entities/application/hacker';

export class HackerApplicationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelled: false,
      isNextButtonEnabled: false,
    };
  }

  onPageChange = (activeIndex) => {
    const { changePage, changeLastActiveIndex, lastValidIndex } = this.props;
    changePage(activeIndex);
    this.setState({ isNextButtonEnabled: false });
    if (activeIndex > lastValidIndex) {
      changeLastActiveIndex(activeIndex);
    }
  }

  onPageNext = () => {
    const { activeIndex } = this.props;
    const nextIndex = activeIndex + 1;
    this.onPageChange(nextIndex);
  }

  onPageBack = () => {
    const { activeIndex } = this.props;
    const nextIndex = activeIndex - 1;
    this.onPageChange(nextIndex);
  }

  onHackerApplicationChange = (app) => {
    const { updateApplication } = this.props;
    updateApplication(app);
  }

  alertThenCancel = () => {
    if (window.confirm('Are you sure you want to cancel?')) {
      this.cancel();
    }
  };

  cancel = () => {
    const { cancelApplication } = this.props;
    this.setState({ cancelled: true });
    cancelApplication();
  }

  updateNextButtonState = (enabled) => {
    if (enabled) {
      this.enableNextButton();
    } else {
      this.disableNextButton();
    }
  }

  enableNextButton = () => {
    const { isNextButtonEnabled } = this.state;

    if (!isNextButtonEnabled) {
      this.setState({ isNextButtonEnabled: true });
    }
  }

  disableNextButton = () => {
    const { isNextButtonEnabled } = this.state;

    if (isNextButtonEnabled) {
      this.setState({ isNextButtonEnabled: false });
    }
  }

  submitApplication = (userCredentials) => {
    const { firebase } = this.props;
    this.signUp(firebase, userCredentials);
  }

  signUp(firebase, userCredentials) {
    const auth = firebase.auth();
    const { email, password } = userCredentials;
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      console.log('user successfully created!');
    }).catch((error) => {
      console.err('failed to create user: ', error);
    });
  }

  render() {
    const {
      hackerApplication,
      activeIndex,
      lastValidIndex,
      featureFlags: {
        isLoaded: isFeatureFlagsLoaded,
        data: featureFlagsData,
      },
    } = this.props;
    const { cancelled, isNextButtonEnabled } = this.state;

    if (!isFeatureFlagsLoaded) return null;

    const { application: { enabled: isApplicationEnabled } } = featureFlagsData;
    if (!isApplicationEnabled) return (<Redirect to="page_not_found" />);

    return (
      <HackerApplication
        hackerApplication={hackerApplication}
        activeIndex={activeIndex}
        lastValidIndex={lastValidIndex}
        count={3}
        onPageChange={this.onPageChange}
        onPageNext={this.onPageNext}
        onPageBack={this.onPageBack}
        onHackerApplicationChange={this.onHackerApplicationChange}
        cancelHackerApplication={this.alertThenCancel}
        cancelled={cancelled}
        isNextButtonEnabled={isNextButtonEnabled}
        updateNextButtonState={this.updateNextButtonState}
        submitApplication={this.submitApplication}
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
  } = state;

  const featureFlags = getFromFirestore(firestore, 'feature_flags');

  return {
    hackerApplication,
    activeIndex,
    lastValidIndex,
    featureFlags,
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
  featureFlags: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(HackerApplicationContainer));
