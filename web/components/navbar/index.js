import React from 'react';
import { Link } from 'react-router-dom';

import { DISPLAY_TYPE } from '../../containers/navbar/DisplayTypes';
import { BUTTON_TYPE } from '../../containers/navbar/ButtonTypes';

const getButton = (buttonType) => {
  switch (buttonType) {
    case BUTTON_TYPE.SIGN_IN:
      return (<Link to="/login">Sign in</Link>);
    case BUTTON_TYPE.SIGN_OUT:
      return (<Link to="/logout">Sign out</Link>);
    case BUTTON_TYPE.DASHBOARD:
      return (<Link to="/dashboard">My application</Link>);
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
            <div><Link to="/">nwHacks logo</Link></div>
          </div>
        </nav>
      );
    case DISPLAY_TYPE.LOGO_AND_BUTTON:
      return (
        <nav>
          <div>
            <div><Link to="/">nwHacks logo</Link></div>
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
            <div><Link to="/">nwHacks logo</Link></div>
          </div>
          <div>
            <div><Link to="/">Link 1</Link></div>
            <div><Link to="/">Link 2</Link></div>
            <div><Link to="/">Link 3</Link></div>
            <div>{getButton(buttonType)}</div>
          </div>
        </nav>
      );
  }
};

export default Navbar;
