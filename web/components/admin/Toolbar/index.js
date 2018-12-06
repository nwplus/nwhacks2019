import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import { Select } from '../../input/select';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.collectionSelectLabels = {
      hacker: { value: 'hacker', label: 'Hacker' },
      mentor: { value: 'mentor', label: 'Mentor' },
      volunteer: { value: 'volunteer', label: 'Volunteer' },
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };


  render() {
    const { applicantType, switchApplicantType, className } = this.props;
    const icons = {
      filter: 'M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z',
      facebook: 'M608 192h160v-192h-160c-123.514 0-224 100.486-224 224v96h-128v192h128v512h192v-512h160l32-192h-192v-96c0-17.346 14.654-32 32-32z',
    };
    const { open } = this.state;
    return (
      <div className={`toolbar fill-width ${className}`}>
        <Select
          onChange={option => switchApplicantType(option.value)}
          label="Form:"
          name="collection-input"
          value={this.collectionSelectLabels[applicantType]}
          options={Object.values(this.collectionSelectLabels)} />
        <div>
          <button onClick={this.onOpenModal}>
            {/* <img src="../../../assets/filter-solid.svg" alt="filter button" /> */}
            {/* <svg width="50" height="50" viewBox="0 0 1024 1024"> */}
            <svg width="22" height="22" viewBox="0 0 1024 1024">
              <path d={icons.filter} />
            </svg>
          </button>
          <Modal open={open} onClose={this.onCloseModal} center>
            <h2>HI</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
              hendrerit risus, sed porttitor quam.
            </p>
          </Modal>

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
};

export default Toolbar;
