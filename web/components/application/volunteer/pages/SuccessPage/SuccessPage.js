import React from 'react';
import { Link } from 'react-router-dom';
import { SecondaryButton } from '../../../../input/buttons';

import mountain from '../../../../../assets/circle-mountain.svg';
import praise from '../../../../../assets/emoji/praise.svg';

const VolunteerSuccessPage = () => (
  <div className="pad-nav fill-min-height flex dir-col ai-center jc-center pad-sides-l">
    <img alt="Success!" className="pad-ends-s" max-height="25%" src={mountain} />
    <br />
    <h2 className="text-align-center">Thanks for applying! <img className="emoji" alt="🙌" src={praise} /></h2>
    <p className="text-align-center" style={{ maxWidth: 680 }}>Thanks for applying to volunteer
      in nwHacks 2019! Stay tuned as your application gets assessed.
      Expect to hear back from us soon.
    </p>
    <br />
    <Link to="/" className="pad-bottom-l">
      <SecondaryButton text="<- Take me back home" />
    </Link>
  </div>
);

export default VolunteerSuccessPage;
