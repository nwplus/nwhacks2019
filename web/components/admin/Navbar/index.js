import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { SecondaryButton } from '../../input/buttons';
import logo from '../../../assets/logo.svg';

const AdminNavbar = ({ pages, activeIndex }) => (
  <div>
    <nav className="fill-width flex">
      <div className="flex ai-center jc-start margin-sides-l">
        <div className="flex ai-center">
          <img alt="nwHacks" src={logo} />
        </div>
      </div>
      <div className="flex jc-end fill-width pad-right-s">
        {
          pages.map(({ label, route }, index) => (
            <Link
              key={`admin-navbar-${index}`} // eslint-disable-line react/no-array-index-key
              to={route}
              className={`flex ai-center margin-sides-l tab
                  ${activeIndex === index ? 'active' : ''}
                `}
              >
              {label}
            </Link>
          )).concat([
            <Link
              to="/admin/logout"
              key="admin-logout"
              className="flex ai-center jc-start margin-left-l"
              >
              <SecondaryButton text="Logout" />
            </Link>,
          ])
        }
      </div>
    </nav>
    <div className="pad-nav">
      { React.createElement(pages[activeIndex].component) }
    </div>
  </div>
);

AdminNavbar.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
  })),
  activeIndex: PropTypes.number.isRequired,
};

export {
  AdminNavbar,
};
