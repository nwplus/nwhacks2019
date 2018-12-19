import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../../assets/logo.svg';

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }

  changeTab = index => this.setState({ tabIndex: index });

  render() {
    const { pages } = this.props;
    const { tabIndex } = this.state;
    return (
      <div>
        <nav className="fill-width flex">
          <div className="flex ai-center jc-start margin-sides-l scale-margin-sides-tablet">
            <div className="flex ai-center">
              <img alt="nwHacks" src={logo} />
            </div>
          </div>
          <div className="flex jc-end fill-width pad-right-s">
            {
              pages.map(({ label }, index) => (
                <a
                  key={`admin-navbar-${index}`} // eslint-disable-line react/no-array-index-key
                  onClick={() => this.changeTab(index)}
                  className={`flex ai-center margin-sides-l scale-margin-sides-tablet
                      ${tabIndex === index ? 'active-tab' : 'inactive-tab'}
                    `}
                  >
                  {label}
                </a>
              ))
            }
          </div>
        </nav>
        <div className="pad-nav">
          { React.createElement(pages[tabIndex].component) }
        </div>
      </div>
    );
  }
}

AdminNavbar.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
  })),
};

export {
  AdminNavbar,
};
