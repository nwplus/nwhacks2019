import React from 'react';

import { SecondaryButton, PrimaryButton } from '../input/buttons';

const ButtonCallback = e => console.log(`${e.currentTarget.textContent} button clicked!`);

const FrontEndComponents = () => (
  <div>
    <p>Front end components!</p>
    <br />
    <div>
      <PrimaryButton text="Primary" onClick={ButtonCallback} />
      &nbsp;
      <SecondaryButton text="Secondary" onClick={ButtonCallback} />
    </div>
  </div>
);

export default FrontEndComponents;
