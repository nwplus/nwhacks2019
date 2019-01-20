import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { withFirebase } from 'react-redux-firebase';
import { PrimaryButton } from '../../../input/buttons';
import { TextInput } from '../../../input/text';

class ImportMentors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonEnabled: true,
      didSucceed: false,
      didFail: false,
    };
  }

  importMentors = (url) => {
    if (window.confirm('Are you sure you want to import mentors?')) {
      const { firebase } = this.props;
      this.setState({ isButtonEnabled: false });

      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => Axios.post(
        firebase.nwUtils.getFunctionUrl('importMentors'),
        { csvUrl: url },
        {
          headers: {
            'Content-Type': 'text/plain',
            Authorization: idToken,
          },
        }
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
      url,
    } = this.state;

    const displayMessage = () => {
      if (didSucceed) {
        return (<p>Success! Wrote {message} docs to mentors collection!</p>);
      } if (didFail) {
        return (<p>{error}</p>);
      }
      return null;
    };

    return (
      <div className="margin-top-xxl flex">
        <TextInput
          placeholder="Url to csv"
          value={url}
          onChange={newUrl => this.setState({ url: newUrl })}
          />
        <PrimaryButton
          text="Import mentors"
          onClick={() => this.importMentors(url)}
          disabled={!isButtonEnabled}
          />
        <div>
          { displayMessage() }
        </div>
      </div>
    );
  }
}

ImportMentors.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export default withFirebase(ImportMentors);
