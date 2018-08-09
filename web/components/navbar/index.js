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

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    const { displayType, buttonType } = props;
    this.state = {
      displayType,
      buttonType,
      hidden: false,
      transparent: true,
      lastY: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    // Calculate scroll direction
    const { lastY } = this.state;
    const scrollingDown = (window.scrollY - lastY) >= 0;

    // Calculate position
    const offset = window.pageYOffset || document.documentElement.scrollTop;
    const atTop = offset < 96;

    // Calculate transparency
    const transparent = scrollingDown ? offset < 256 : atTop;

    // Update state
    this.setState({
      transparent,
      hidden: (!atTop && scrollingDown),
      lastY: window.scrollY,
    });
  }

  render() {
    const { displayType, buttonType, hidden, transparent } = this.state;
    const button = getButton(buttonType);
    const links = [
      <Link to="/"><b>About</b></Link>,
      <Link to="/"><b>Stories</b></Link>,
      <Link to="/"><b>FAQ</b></Link>,
      <Link to="/"><b>Sponsors</b></Link>,
      <Link to="/"><b>2018</b></Link>,
      button,
    ];

    let linksDiv;
    let key = 0;
    switch (displayType) {
      case DISPLAY_TYPE.ONLY_LOGO:
        break;
      case DISPLAY_TYPE.LOGO_AND_BUTTON:
        linksDiv = <div className="flex ai-center">{button}</div>;
        break;
      default:
        linksDiv = links.map(l => (
          <div
            key={key += 1}
            className="flex ai-center margin-sides-large">
            {l}
          </div>
        ));
    }

    return (
      <nav className={`fill-width flex ${hidden ? 'hide' : ''} ${transparent ? 'transparent' : 'shadow'}`}>
        <div className="flex ai-center jc-start margin-sides">
          <div className="flex ai-center">{getLogo()}</div>
        </div>
        <div className="flex jc-end margin-horizontal-divs fill-width">
          {linksDiv}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  displayType: PropTypes.symbol,
  buttonType: PropTypes.symbol,
};

export default Navbar;
