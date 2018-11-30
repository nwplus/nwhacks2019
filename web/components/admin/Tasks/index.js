import React from 'react';
import { PrimaryButton } from '../../input/buttons';
import Axios from 'axios';
import { withFirebase } from 'react-redux-firebase';

class AdminTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBackfillShortInfoEnabled: true
    };
  }

  backfillShortInfo = () => {
    if (window.confirm('Are you sure you want to backfill?')) {
      const { firebase } = this.props;
      this.setState({ isBackfillShortInfoEnabled: false });

      Axios.post(
        firebase.nwUtils.getFunctionUrl('backfillShortInfo')
      ).then((res) => {
        if (res.status === 200) {
          console.log('Got: ', res.data);
        } else {
          console.log('uh oh');
        }
      }).catch(() => {
        console.log('uh oh');
      }).finally(() => {
        this.setState({ isBackfillShortInfoEnabled: true });
      });
    }
  }

  render() {
    const { isBackfillShortInfoEnabled } = this.state;
    return (
      <div
        className="pad-ends-xxl margin-sides-xxl"
        >
        <PrimaryButton
          text="Backfill short info"
          onClick={this.backfillShortInfo}
          disabled={!isBackfillShortInfoEnabled}
          />
      </div>
    );
  }
};

export default withFirebase(AdminTasks);
