import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '../../input/select';
import sortArrow from '../../../assets/sort-arrow.svg';

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
      switchSortType, sortType, switchSortDirection, sortDirection } = this.props;
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
          label="Sort By:"
          name="sort-input"
          value={this.sortSelectLabels[sortType]}
          options={Object.values(this.sortSelectLabels)} />
        <div
          className="pad-left-s sortArrowDiv"
          role="button"
          onClick={switchSortDirection}
          tabIndex={0}>
          <img src={sortArrow} alt="sort arrow" className={`sortArrow ${sortDirection === 'asc' ? '' : 'flip-vertical'}`} />
        </div>

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
  // Switch sort direction
  switchSortDirection: PropTypes.func,
  // Check sort direction
  sortDirection: PropTypes.string,
};

export default Toolbar;
