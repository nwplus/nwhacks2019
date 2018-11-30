import React from 'react';
import { PrimaryButton } from '../../input/buttons';
import Axios from 'axios';
import { withFirebase } from 'react-redux-firebase';

class AdminTasks extends React.Component {
  backfill = () => {
    if (window.confirm('Are you sure you want to backfill?')) {
      const { firebase } = this.props;

      Axios.post(
        firebase.nwUtils.getFunctionUrl('backfillShortAndLongInfo')
      ).then((res) => {
        if (res.status === 200) {
          console.log('Got: ', res.data);
        } else {
          console.log('uh oh');
        }
      }).catch(() => {
        console.log('uh oh');
      });
    }
  }

  render() {
    return (
      <div
        className="pad-ends-xxl margin-sides-xxl"
        >
        <PrimaryButton
          text="Backfill short info"
          onClick={this.backfill}
          />
      </div>
    );
  }
};

export default withFirebase(AdminTasks);
