import React from 'react';
import { PrimaryButton } from '../../../input/buttons';
import Axios from 'axios';
import { withFirebase } from 'react-redux-firebase';

class BackfillShortInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonEnabled: true,
      didSucceed: false,
      didFail: false,
      error: null,
    };
  }

  backfillShortInfo = () => {
    if (window.confirm('Are you sure you want to backfill?')) {
      const { firebase } = this.props;
      this.setState({ isButtonEnabled: false });

      Axios.post(
        firebase.nwUtils.getFunctionUrl('backfillShortInfo')
      ).then((res) => {
        if (res.status === 200) {
          this.setState({
            didSucceed: true,
            didFail: false,
            error: null
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
      }).finally(() => {
        this.setState({ isButtonEnabled: true });
      });
    }
  }

  render() {
    const {
      isButtonEnabled,
      didSucceed,
      didFail,
      error
    } = this.state;
    return (
      <div>
        <PrimaryButton
          text="Backfill short info"
          onClick={this.backfillShortInfo}
          disabled={!isButtonEnabled}
          />
        <div>
          {
            didSucceed ?
              <p>Success!</p>
              :
              didFail ?
                <p>{error}</p>
                :
                null
          }
        </div>
      </div>
    );
  }
};

export default withFirebase(BackfillShortInfo);
