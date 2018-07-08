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

  const right = () => {
    if (home) return (
      <div>
        <div><Link to="/">Link 1</Link></div>
        <div><Link to="/">Link 2</Link></div>
        <div><Link to="/">Link 3</Link></div>
        <div>{button}</div>
      </div>
    )
    return (
      <div>
        <div>{button}</div>
      </div>
    )
  };

  return (
    <nav>
      <div>
        <div><Link to="/">nwHacks logo</Link></div>
      </div>
      { right() }
    </nav>
  );
};

Navbar.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  home: PropTypes.bool.isRequired,
};

export default Navbar;
