import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navbar.sass';

const Navbar = ({ signedIn, home }) => {
  let button = (<Link to="/dashboard">My application</Link>);

  if (!signedIn) {
    button = (<Link to="/login">Sign in</Link>);
  } else if (!home) {
    button = (<Link to="/logout">Sign out</Link>)
  }

  return (
    <nav>
      <div><Link to="/">nwHacks logo</Link></div>
      <div>{ button }</div>
    </nav>
  );
};

Navbar.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  home: PropTypes.bool.isRequired,
};

export default Navbar;
