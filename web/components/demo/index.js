import React from 'react';

import { SecondaryButton, PrimaryButton, ProgressGroup } from '../input/buttons';

const ButtonCallback = e => console.log(`${e.currentTarget.textContent} button clicked!`);

class FrontEndComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 3,
    };
  }

  switchProgress = index => this.setState({ active: index })

  render() {
    const { active } = this.state;
    return (
      <div>
        <p>Buttons</p>
        <br />
        <div>
          <PrimaryButton text="Primary" onClick={ButtonCallback} />
          &nbsp;
          <SecondaryButton text="Secondary" onClick={ButtonCallback} />
        </div>
        <br />
        <div>
          <PrimaryButton text="Primary" onClick={ButtonCallback} disabled />
          &nbsp;
          <SecondaryButton text="Secondary" onClick={ButtonCallback} disabled />
        </div>
        <br />
        <div>
          <ProgressGroup
            count={10}
            onClick={this.switchProgress}
            activeIndex={active}
            lastValidIndex={7}
          />
        </div>
      </div>
    );
  }
}

export default FrontEndComponents;
