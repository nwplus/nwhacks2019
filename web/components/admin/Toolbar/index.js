import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import { Select } from '../../input/select';
import filtersolid from '../../../assets/filter-solid.svg';
import { Checkbox, CheckboxGroup } from '../../input/buttons/CheckboxGroup';

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
          <button onClick={this.onOpenModal} alt="my image">
            <img src={filtersolid} alt="filter button" />s
          </button>
          <Modal open={open} onClose={this.onCloseModal} center>
            <h2>HI</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
              hendrerit risus, sed porttitor quam.
            </p>
            <CheckboxGroup
              name="interested-role-checkbox"
              label="How do you wish to contribute at nwHacks? Your choice will not affect your application and you can always change your mind."
              className="dir-row margin-ends-s"
            >
              <Checkbox
                label="Developer"
                value="developer"
                // checked={isDeveloper}
                className="margin-left-none"
                // onChange={(e) => {
                //   this.updateApplication({ isDeveloper: e.target.checked });
                // }}
              />

              <Checkbox
                label="Designer"
                value="designer"
                // checked={isDesigner}
                className="margin-left-none"
                // onChange={(e) => {
                //   this.updateApplication({ isDesigner: e.target.checked });
                // }}
              />
              <Checkbox
                label="Hardware/Robotics"
                value="hardware"
                // checked={isHardware}
                className="margin-left-none"
                // onChange={(e) => {
                //   this.updateApplication({ isHardware: e.target.checked });
                // }}
              />
              <Checkbox
                label="Other"
                value="other"
                // checked={isOther}
                className="margin-left-none"
                // onChange={(e) => {
                //   this.updateApplication({ isOther: e.target.checked });
                // }}
              />
            </CheckboxGroup>
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
