import React from 'react';
import PropTypes from 'prop-types';

import mountains from '../../assets/mountains.svg';

const getMountains = () => <img alt="Nice mountains" src={mountains} />

const Home = ({ signedIn }) => {
  if (signedIn) {
    return (
      <div>
        SIGNED IN HOMEPAGE
        {getMountains()}
      </div>
    );
  }
  return (
    <div>
      {getMountains()}
    </div>
  );
};

Home.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};

export default Home;
