import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { DISPLAY_TYPE } from '../../containers/navbar/DisplayTypes';
import { BUTTON_TYPE } from '../../containers/navbar/ButtonTypes';
import { SecondaryButton } from '../frontEndComponents/button';
import './Navbar.sass';

const getLogo = () => (
  <Link to="/"><img src="../../assets/logo.png" /></Link>
);

const Navbar = ({ displayType, buttonType, history }) => {
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
            <div><Link to="/">Link 1</Link></div>
            <div><Link to="/">Link 2</Link></div>
            <div><Link to="/">Link 3</Link></div>
            <div>{getButton(buttonType)}</div>
          </div>
        </nav>
      );
  }
};

export default withRouter(Navbar);
