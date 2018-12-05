import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { withFirebase } from 'react-redux-firebase';
import { PrimaryButton } from '../../../input/buttons';

class BackfillShortInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonEnabled: true,
      didSucceed: false,
      didFail: false,
    };
  }

  backfillShortInfo = () => {
    if (window.confirm('Are you sure you want to backfill?')) {
      const { firebase } = this.props;
      this.setState({ isButtonEnabled: false });

      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => Axios.post(
        firebase.nwUtils.getFunctionUrl('backfillShortInfo'),
        idToken,
        { headers: { 'Content-Type': 'text/plain' } }
      )).then((res) => {
        if (res.status === 200) {
          this.setState({
            didSucceed: true,
            didFail: false,
            message: res.data,
            error: null,
          });
        } else {
          this.setState({
            didSucceed: false,
            didFail: true,
            error: res.data,
          });
        }
      }).catch((err) => {
        this.setState({
          didSucceed: false,
          didFail: true,
          error: JSON.stringify(err.response.data),
        });
      })
        .finally(() => {
          this.setState({ isButtonEnabled: true });
        });
    }
  }

  render() {
    const {
      isButtonEnabled,
      didSucceed,
      didFail,
      error,
      message,
    } = this.state;

    const displayMessage = () => {
      if (didSucceed) {
        return (<p>Success! Wrote {message} docs to hacker_short_info collection!</p>);
      } if (didFail) {
        return (<p>{error}</p>);
      }
      return null;
    };

    return (
      <div>
        <PrimaryButton
          text="Backfill short info"
          onClick={this.backfillShortInfo}
          disabled={!isButtonEnabled}
          />
        <div>
          { displayMessage() }
        </div>
      </div>
    );
  }
}

BackfillShortInfo.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export default withFirebase(BackfillShortInfo);
