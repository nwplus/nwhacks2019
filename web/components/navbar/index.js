import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DISPLAY_TYPE } from '../../containers/navbar/DisplayTypes';
import { BUTTON_TYPE } from '../../containers/navbar/ButtonTypes';
import { SecondaryButton } from '../input/buttons';

import logo from '../../assets/logo.svg';

const getLogo = () => (
  <Link to="/"><img alt="nwHacks" src={logo} /></Link>
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
  const logoDiv = (
    <div className="flex ai-center jc-start margin-sides">
      <div className="flex ai-center">{getLogo()}</div>
    </div>
  );
  const button = getButton(buttonType);
  const links = [
    <Link to="/">About</Link>,
    <Link to="/">Stories</Link>,
    <Link to="/">FAQ</Link>,
    <Link to="/">Sponsors</Link>,
    <Link to="/">2018</Link>,
    button,
  ];

  let inner;
  let key = 0;
  switch (displayType) {
    case DISPLAY_TYPE.ONLY_LOGO:
      inner = logoDiv;
      break;
    case DISPLAY_TYPE.LOGO_AND_BUTTON:
      inner = (
        <React.Fragment>
          {logoDiv}
          <div className="flex jc-end margin-horizontal-divs fill-width">
            <div className="flex ai-center">{button}</div>
          </div>
        </React.Fragment>
      );
      break;
    default:
      inner = (
        <React.Fragment>
          {logoDiv}
          <div className="flex jc-end margin-horizontal-divs fill-width">
            {links.map(l => <div key={key += 1} className="flex ai-center margin-sides-large">{l}</div>)}
          </div>
        </React.Fragment>
      );
  }
  return <nav className="fill-width shadow flex">{inner}</nav>;
};

Navbar.propTypes = {
  displayType: PropTypes.symbol,
  buttonType: PropTypes.symbol,
};

export default Navbar;
