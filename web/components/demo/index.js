import React from 'react';

import { SecondaryButton, PrimaryButton, ProgressGroup } from '../input/buttons';

const ButtonCallback = e => console.log(`${e.currentTarget.textContent} button clicked!`);

const FrontEndComponents = () => (
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
        activeIndex={1}
        steps={[
          { text: '1', onClick: ButtonCallback },
          { text: '2', onClick: ButtonCallback },
          { text: '3', onClick: ButtonCallback, disabled: true },
          { text: '4', onClick: ButtonCallback, disabled: true },
        ]} />
    </div>
  </div>
);

export default FrontEndComponents;
