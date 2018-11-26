import React from 'react';
import PropTypes from 'prop-types';

class Toolbar extends React.Component {
  render() {
    const { applicantType, switchApplicantType, className } = this.props;
    return (
      <div className={`toolbar pad-sides-s pad-top-s fill-width ${className}`}>
        <i>TODO: Toolbar component</i> <br />
        Collection: {applicantType}
        <button type="button" onClick={() => switchApplicantType('hacker')}>Hacker</button>
        <button type="button" onClick={() => switchApplicantType('mentor')}>Mentor</button>
        <button type="button" onClick={() => switchApplicantType('volunteer')}>Volunteer</button>
      </div>
    );
  }
}

Toolbar.propTypes = {
  // 'hacker', 'mentor', 'volunteer'
  applicantType: PropTypes.string,
  // handler for switching between applicant types
  switchApplicantType: PropTypes.func,
  // additional styles
  className: PropTypes.string,
};

export default Toolbar;
