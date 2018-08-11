import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { addHackerApplication } from '../../actions';
import { initialState } from '../../reducers/entities/application/hacker';

import AfterLogin from '../../components/auth/Login/AfterLogin';

export class AfterLoginContainer extends React.Component {
  componentWillUnmount() {
    const { hackerApplication } = this.props;
    const { isLoaded } = hackerApplication;
    const { storeHackerApplication } = this.props;

    if (isLoaded) {
      storeHackerApplication(hackerApplication.data || initialState);
    }
  }

  render() {
    const { hackerApplication: { isLoaded } } = this.props;

    return (<AfterLogin isLoaded={isLoaded} />);
  }
}

const mapStateToProps = (state) => {
  const { firebase: { auth: { uid } } } = state;
  const {
    firestore: {
      data: {
        hackerApplication,
      },
      status: {
        requesting,
      },
    },
  } = state;

  const data = hackerApplication;

  return {
    hackerApplication: {
      isLoaded: !requesting[`applications_hacker/${uid}`],
      data,
    },
  };
};

AfterLoginContainer.propTypes = {
  hackerApplication: PropTypes.object.isRequired,
  storeHackerApplication: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeHackerApplication: (application) => {
      dispatch(addHackerApplication(application));
    },
  };
};

export default compose(
  firebaseConnect(),
  firestoreConnect((props) => {
    const { firebase } = props;
    const auth = firebase.auth();
    const { currentUser: { uid } } = auth;
    return [
      {
        collection: 'applications_hacker',
        doc: uid,
        storeAs: 'hackerApplication',
      },
    ];
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(AfterLoginContainer);
