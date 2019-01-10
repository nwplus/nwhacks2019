import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { TextInput } from '../../input/text';
import { Select } from '../../input/select';
import { SecondaryButton, PrimaryButton } from '../../input/buttons';
import { Checkbox, CheckboxGroup } from '../../input/buttons/CheckboxGroup';

import { tShirtSizes } from '../tShirtSizes';
import { dietRestrictions } from '../dietRestrictions';

import praise from '../../../assets/emoji/praise.svg';
import sparkle from '../../../assets/emoji/sparkle.svg';
import celebrate from '../../../assets/emoji/celebrate.svg';

import rsvpSuccessGraphic from '../../../assets/rsvpSuccess.svg';

class volunteerRSVP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      isIDValid: true,
      isSubmitted: false,
      isSubmitting: false,
      submitFailed: false,
      emergencyContactName: '',
      emergencyContactNumber: '',
      tShirtSize: '',
      dietRestriction: '',
      jan16orientation: false,
      jan17orientation: false,
      neitherOrientation: false,
      wouldLikeToSee: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { firebase } = this.props;

    Axios.post(
      firebase.nwUtils.getFunctionUrl('checkValidID'),
      { id, applicantType: 'volunteer' },
      { headers: { 'Content-Type': 'text/plain' } }
    ).then((res) => {
      if (res.status === 200) {
        const { accepted, rsvped, firstName } = res.data;

        if (!accepted) {
          console.log('Did not find valid ID');
          this.setState({ isIDValid: false });
        } else if (rsvped) {
          console.log('already RSVPed');
          this.setState({ isSubmitted: true });
        } else {
          console.log('Found ID: ' + firstName);
          this.setState({ firstName });
        }
      }
    });
  }

  render() {
    const { isIDValid, isSubmitted, isSubmitting, submitFailed } = this.state;

    if (!isIDValid) return (<Redirect to="/page_not_found" />);
    if (isSubmitted) {
      return (
        <div className="pad-nav fill-min-height flex dir-col ai-center jc-center pad-sides-l">
          <img alt="Success!" className="pad-ends-s" max-height="25%" src={rsvpSuccessGraphic} />
          <br />
          <h2 className="text-align-center">Thanks for confirming your attendance! <img className="emoji" alt="✨" src={sparkle} /></h2>
          <p className="text-align-center" style={{ maxWidth: 680 }}>You’ve successfully secured your spot.
            We’ll see you bright and early on January 26th. We’re so excited to have you at nwHacks!
          </p>
          <br />
          <Link to="/" className="pad-bottom-l">
            <SecondaryButton text="<- Take me back home" />
          </Link>
        </div>
      );
    }

    const { firebase } = this.props;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const {
      firstName,
      emergencyContactName,
      emergencyContactNumber,
      tShirtSize,
      dietRestriction,
      jan16orientation,
      jan17orientation,
      neitherOrientation,
      wouldLikeToSee,
    } = this.state;

    return (
      <div className="pad-nav application fill-width flex jc-center">
        <div className="pad-top-mega pad-bottom-tera">
          <h2>Hi{firstName ? ' ' + firstName : null}, please RSVP <img className="emoji" alt="🙌" src={praise} /></h2>
          <p>Congrats, we choose you! <img className="emoji" alt="🎉" src={celebrate} /> Please complete this form by the
            deadline mentioned in your acceptance email so we can get straight to
            scheduling you for nwHacks 2019. If we don’t hear from you by
            the deadline, your spot will be given to someone else and you
            will be moved to our waitlist.
          </p>
          <TextInput
            label="What is the name of your emergency contact?"
            name="emergencyContactName"
            className="margin-top-mega margin-bottom-xxl margin-ends-giga"
            placeholder="Enter emergency contact name"
            onChange={newEmergencyContactName => this.setState({
              emergencyContactName: newEmergencyContactName })}
            value={emergencyContactName}
          />
          <TextInput
            label="What is the number of your emergency contact?"
            name="emergencyContactNumber"
            className="margin-top-mega margin-bottom-xxl margin-ends-giga"
            placeholder="123-456-7890"
            onChange={newEmergencyContactNumber => this.setState({
              emergencyContactNumber: newEmergencyContactNumber })}
            value={emergencyContactNumber}
          />
          <Select
            options={tShirtSizes}
            name="t-shirt-size"
            label="What is your t-shirt size? (note: these are unisex clothing sizes)"
            className="margin-top-mega margin-bottom-xxl"
            onChange={({ value: newTShirtSize }) => this.setState({
              tShirtSize: newTShirtSize })}
            value={tShirtSize}
          />
          <Select
            options={dietRestrictions}
            name="dietRestrictions"
            label="Do you have any dietary restrictions or allergies?"
            placeholder="Enter an option or choose from the dropdown"
            className="margin-top-mega margin-bottom-giga"
            onChange={({ value: newDietRestriction }) => this.setState({
              dietRestriction: newDietRestriction })}
            value={dietRestriction}
            isSearchable
            allowNewOption
          />
          <CheckboxGroup
            name="orientationTimes"
            label={(
              <div> In order to volunteer for nwHacks 2019, it is required that you attend one
                orientation session. Please check all the times you can attend:
              </div>
)}>
            <Checkbox
              label={(<div>January 16th 6-7pm</div>)}
              value="jan16orientation"
              checked={jan16orientation}
              onChange={e => this.setState({ jan16orientation: e.target.checked })}
              isControlled
              disabled={neitherOrientation}
            />
            <Checkbox
              label={(<div>January 17th 6-7pm</div>)}
              value="jan17orientation"
              checked={jan17orientation}
              onChange={e => this.setState({ jan17orientation: e.target.checked })}
              isControlled
              disabled={neitherOrientation}
            />
            <Checkbox
              label={(<div>Neither</div>)}
              value="neitherOrientation"
              checked={neitherOrientation}
              onChange={(e) => {
                if (e.target.checked) {
                  this.setState({
                    neitherOrientation: e.target.checked,
                    jan16orientation: false,
                    jan17orientation: false,
                  });
                } else {
                  this.setState({
                    neitherOrientation: e.target.checked,
                  });
                }
              }}
            />
          </CheckboxGroup>
          <TextInput
            label="Is there anything you would like to see at nwHacks? (optional)"
            name="ideas"
            className="margin-ends-giga"
            placeholder="Enter ideas here"
            onChange={newIdea => this.setState({ wouldLikeToSee: newIdea })}
            value={wouldLikeToSee}
          />
          <PrimaryButton
            disabled={
              isSubmitting
              || emergencyContactName === ''
              || emergencyContactNumber === ''
              || tShirtSize === ''
              || dietRestriction === ''
              || (!jan16orientation && !jan17orientation && !neitherOrientation)}
            text={isSubmitting ? 'Submitting...' : 'Confirm my attendance'}
            onClick={() => {
              this.setState({ isSubmitting: true });
              Axios.post(
                firebase.nwUtils.getFunctionUrl('submitRSVP'),
                { id,
                  applicantType: 'volunteer',
                  data: {
                    emergencyContactName,
                    emergencyContactNumber,
                    tShirtSize,
                    dietRestriction,
                    jan16orientation,
                    jan17orientation,
                    neitherOrientation,
                    wouldLikeToSee,
                  },
                },
                { headers: { 'Content-Type': 'text/plain' } }
              ).then((res) => {
                if (res.status === 200) {
                  this.setState({ isSubmitted: true, submitFailed: false });
                  console.log('Submitted RSVP!');
                } else {
                  this.setState({ submitFailed: true, isSubmitting: false });
                }
              }).catch((e) => {
                console.log(e);
                this.setState({ submitFailed: true, isSubmitting: false });
              });
            }}
          />
          {submitFailed ? (<p>Failed to submit application, please try again!</p>) : null}
        </div>
      </div>
    );
  }
}

volunteerRSVP.propTypes = {
  firebase: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withFirebase(volunteerRSVP);
