import React from 'react';
import { Link } from 'react-router-dom';
import { DISPLAY_TYPE } from '../../containers/navbar/DisplayTypes';
import { BUTTON_TYPE } from '../../containers/navbar/ButtonTypes';
import { SecondaryButton } from '../input/buttons';

import logo from '../../assets/logo.svg';

const getLogo = () => (
  <Link to="/"><img alt="" src={logo} /></Link>
);

const getButton = (buttonType) => {
  switch (buttonType) {
    case BUTTON_TYPE.SIGN_IN:
      return (<Link to="/login"><SecondaryButton text="Sign in" /></Link>);
    case BUTTON_TYPE.SIGN_OUT:
      return (<Link to="/logout"><SecondaryButton text="Sign out" /></Link>);
    case BUTTON_TYPE.DASHBOARD:
      return (<Link to="/dashboard"><SecondaryButton text="My application" /></Link>);
    default:
      return (<div />);
  }
};

const Navbar = ({ displayType, buttonType }) => {
  switch (displayType) {
    case DISPLAY_TYPE.ONLY_LOGO:
      return (
        <nav>
          <div>
            <div>{getLogo()}</div>
          </div>
        </nav>
      );
    case DISPLAY_TYPE.LOGO_AND_BUTTON:
      return (
        <nav>
          <div>
            <div>{getLogo()}</div>
          </div>
          <div>
            <div>{getButton(buttonType)}</div>
          </div>
        </nav>
      );
    default:
      return (
        <nav>
          <div>
            <div>{getLogo()}</div>
          </div>
          <div>
            <div><Link to="/">About</Link></div>
            <div><Link to="/">FAQ</Link></div>
            <div><Link to="/">Sponsors</Link></div>
            <div><Link to="/">2018</Link></div>
            <div>{getButton(buttonType)}</div>
          </div>
        </nav>
      );
  }
};

export default Navbar;
