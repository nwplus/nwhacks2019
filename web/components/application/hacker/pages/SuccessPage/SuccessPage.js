import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { ProgressGroup, SecondaryButton, PrimaryButton, ButtonGroup } from '../../../../input/buttons';

import mountain from '../../../../../assets/circle-mountain.svg';
import praise from '../../../../../assets/emoji/praise.svg';

const SuccessPage = () => (
  <div className="pad-nav flex dir-col ai-center jc-center margin-sides-l">
    
    <img alt="Success!" className="pad-ends-s scale-width-mobile scale-height-mobile" width="20%" src={mountain} />
    <br />
    <h2 className="text-align-center">Thanks for applying! <img className="emoji" alt="🙌" src={praise} /></h2>
    <p className="text-align-center" style={{maxWidth: 680}}>Thanks for applying to participate in nwHacks 2019! Stay tuned as your application gets assessed. Expect to hear back from us by the end of December.</p>
    <br />
    <Link to="/" className="pad-bottom-l">
        <SecondaryButton
            text="<- Take me back home"
        />
    </Link>
  </div>
);

export default SuccessPage;
