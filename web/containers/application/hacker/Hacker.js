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

import PageOne from '../../../components/application/hacker/pages/PageOne';
import PageTwo from '../../../components/application/hacker/pages/PageTwo';

export class HackerApplicationContainer extends React.Component {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFirebase(HackerApplicationContainer));
