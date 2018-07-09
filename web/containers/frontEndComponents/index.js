import React from 'react';

import { SecondaryButton } from './button';

const SecondaryButtonCallback = () => console.log('Secondary Button clicked!');

const FrontEndComponents = () => (
  <div>
    <p>Front end components!</p>
    <SecondaryButton text='Secondary' onClick={SecondaryButtonCallback} />
  </div>
);

export default FrontEndComponents;
