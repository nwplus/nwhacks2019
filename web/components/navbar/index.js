import React from 'react';

const Navbar = ({ signedIn }) => {
  if (signedIn) {
    return (<div>Signed in</div>);
  } else {
    return (<div>Not signed in</div>);
  }
}

export default Navbar;
