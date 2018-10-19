import React from 'react';
import { Link } from 'react-router-dom';

import mountain from '../../assets/circle-mountain.svg';

const NotFound = () => (
  <div className="pad-nav fill-height flex dir-col ai-center jc-center margin-sides-l">
    <img alt="oops!" className="pad-bottom-s" width="25%" src={mountain} />
    <br />
    <h1 className="text-align-center">Oops!</h1>
    <br />
    <h1 className="text-align-center">We could not find the page you were looking for.</h1>
    <br />
    <p className="text-align-center">
      Click <Link to="/">here</Link> to return home.
    </p>
  </div>
);

export default NotFound;
