import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '../../input/select';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.collectionSelectLabels = {
      hacker: { value: 'hacker', label: 'Hacker' },
      mentor: { value: 'mentor', label: 'Mentor' },
      volunteer: { value: 'volunteer', label: 'Volunteer' },
    };
    this.sortSelectLabels = {
      lastName: { value: 'lastName', label: 'Last Name' },
      firstName: { value: 'firstName', label: 'First Name' },
      email: { value: 'email', label: 'Email' },
      score: { value: 'score', label: 'Score' },
      timestamp: { value: 'timestamp', label: 'Timestamp' },
    };
  }

  render() {
    const { applicantType, switchApplicantType, className,
      switchSortType, sortType, reverseSort, reverse } = this.props;
    return (
      <div className={`toolbar flex fill-width ${className}`}>
        <Select
          onChange={option => switchApplicantType(option.value)}
          label="Form:"
          name="collection-input"
          value={this.collectionSelectLabels[applicantType]}
          options={Object.values(this.collectionSelectLabels)} />
        <Select
          className="margin-left-s"
          onChange={option => switchSortType(option.value)}
          label="Sort:"
          name="sort-input"
          value={this.sortSelectLabels[sortType]}
          options={Object.values(this.sortSelectLabels)} />
        <button onClick={reverseSort}>{!reverse ? 'reverse' : 'unreverse'}</button>
      </div>
    );
  }
}

Toolbar.defaultProps = {
  className: '',
};

Toolbar.propTypes = {
  // 'hacker', 'mentor', 'volunteer'
  applicantType: PropTypes.string,
  // handler for switching between applicant types
  switchApplicantType: PropTypes.func,
  // additional styles
  className: PropTypes.string,
  // handler for switching sort type
  switchSortType: PropTypes.func,
  // type to sort by
  sortType: PropTypes.string,
  // reverse the sort
  reverseSort: PropTypes.func,
  // check whether its reversed
  reverse: PropTypes.bool,
};

export default Toolbar;
